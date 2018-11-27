require('./config/config.js');

const _ = require("lodash");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
const { ObjectID } = require("mongodb");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const { mongoose } = require('./db/mongoose');
const { authenticate } = require('./middleware/authenticate');
const { subscribed } = require('./middleware/subscribed');
const redirect = require('./middleware/ssl-redirect');
const { User } = require('./models/user');
const { Addux } = require('./models/addux');
const { Comment } = require('./models/comment');
const { Walkthrough } = require('./models/walkthrough');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT;

app.use(redirect());
app.use(bodyParser.json());
app.use(express.static(publicPath));

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }
);

transporter.verify(function (error, success) {
    if (error) {
        console.log('Server is not ready to take our email messages:', error);
    } else {
        console.log('Server is ready to take our email messages!');
    }
});

app.get("/walkthrough", (req, res) => {

    console.log('Received GET /walkthrough');

    Walkthrough.findOne({}, {}, { sort: { 'createdAt': -1 } })
        .then((walkthrough) => {
            res.send(walkthrough);
        })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        });
});

app.post("/walkthrough", authenticate, (req, res) => {

    console.log('Received POST /walkthrough');

    if (!req.user.isAdmin) {
        return res.status(403).send();
    }

    const walkthroughData = req.body;
    walkthroughData.createdAt = moment().unix();

    const walkthrough = new Walkthrough(walkthroughData);

    walkthrough.save().then((doc) => {
        res.send(doc);
    })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        });

});

app.patch("/comments/:id", (req, res) => {

    console.log('Received PATCH /comments/' + req.params.id);

    const id = req.params.id;
    const updates = req.body;

    Comment.findOneAndUpdate({ _id: id }, updates)
        .then((comment) => {

            if (!comment) {
                return res.status(404).send();
            }

            res.send(comment);

        })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        });
});

app.post("/addux", authenticate, subscribed, (req, res) => {

    console.log('Received POST /addux');

    const addux = new Addux({
        name: req.body.name,
        _creator: req.user._id,
        goals_1: "",
        goals_2: "",
        goals_3: ""
    });

    const comments = [];

    for (let i = 0; i < 7; i++) {
        //let comment = new Comment();
        comments.push({ text: "" });
    }

    Comment.insertMany(comments).then((comments) => {

        addux.objective_comments = comments[0]._id;
        addux.goals_comments = comments[1]._id;
        addux.projects_comments = comments[2]._id;
        addux.timelines_comments = comments[3]._id;
        addux.projectOwner_comments = comments[4]._id;
        addux.resources_comments = comments[5]._id;
        addux.progress_comments = comments[6]._id;

        addux.save()
            .then((addux) => {

                addux
                    .populate('objective_comments')
                    .populate('goals_comments')
                    .populate('projects_comments')
                    .populate('timelines_comments')
                    .populate('projectOwner_comments')
                    .populate('resources_comments')
                    .populate('progress_comments')
                    .execPopulate()
                    .then((addux) => {
                        res.send({ addux });
                    })
                    .catch((e) => {
                        res.status(400).send(e);
                    });
            })
            .catch((e) => {
                console.log('Error', e);
                res.status(400).send(e);
            });
    })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        });
});

app.get("/addux", authenticate, subscribed, (req, res) => {

    console.log('Received GET /addux');

    Addux.find({ _creator: req.user._id })
        .populate('objective_comments')
        .populate('goals_comments')
        .populate('projects_comments')
        .populate('timelines_comments')
        .populate('projectOwner_comments')
        .populate('resources_comments')
        .populate('progress_comments')
        .exec()
        .then((adduxes) => {

            res.send({ adduxes });
        }, (e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        })
        .catch((e) => {
            console.log(e);
        });
});

app.get("/addux/:id", (req, res) => {

    console.log('Received GET /addux/' + req.params.id);

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Addux.findOne({
        _id: id,
    })
        .populate('objective_comments')
        .populate('goals_comments')
        .populate('projects_comments')
        .populate('timelines_comments')
        .populate('projectOwner_comments')
        .populate('resources_comments')
        .populate('progress_comments')
        .exec()
        .then((addux) => {
            if (!addux) {
                return res.status(404).send();
            }

            res.send({ addux });
        })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send();
        });

});

app.patch("/addux/:id", authenticate, subscribed, (req, res) => {

    console.log('PATCH /addux/' + req.params.id);

    const id = req.params.id;
    const updates = req.body;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Addux.findOneAndUpdate({ _id: id, _creator: req.user._id }, updates).then((addux) => {

        if (!addux) {
            return res.status(404).send();
        }

        res.send(addux);
    })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        })

});

app.delete("/addux/:id", authenticate, subscribed, (req, res) => {

    console.log('DELETE /addux/' + req.params.id);

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Addux.findOne({ _id: id, _creator: req.user._id }).then((addux) => {
        if (!addux) {
            return res.status(404).send();
        }

        addux.remove().then((removedAddux) => {

            res.send(removedAddux);
        });
    })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        });

});

app.post('/users/reset', async (req, res) => {

    console.log('POST /users/reset');

    try {
        const email = req.body.email;
        const passwordReset = crypto.randomBytes(32).toString('hex');
        const resetExpire = moment().add(4, 'h').unix();

        const user = await User.findOneAndUpdate({ email }, { passwordReset, resetExpire });

        if (user) {
            messageText = `Hi ${user.firstName}!  A password reset was requested for your Addux account.  Please visit https://${req.headers.host}/reset/${passwordReset} to create a new password. This link will expire in 4 hours`;

            const message = {
                from: process.env.EMAIL_USERNAME,
                to: user.email,
                subject: 'Addux Password Reset',
                message: messageText,
                html: `<p>${messageText}</p>`
            }

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Could not send email!');
                    res.status(400).send(err);
                }
                else {
                    console.log('Message sent!');
                    res.send(info);
                }
            });
        }
        else {
            res.status(404).send();
        }

    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send(e);
    }
});

app.post('/users/reset/:token', async (req, res) => {

    console.log("POST /users/reset/" + req.params.token);

    try {
        const resetToken = req.params.token;
        const password = req.body.password;

        const user = await User.findOneAndUpdate({ passwordReset: resetToken, resetExpire: { $gt: moment().unix() } }, { password, passwordReset: "", resetExpire: 0 });

        if (!user) {
            res.status(404).send();
        }
        else{
            res.send(user);
        }
    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send();
    }

});

app.post('/users/subscribe', authenticate, async (req, res) => {

    console.log('POST /users/subscribe');

    const user = req.user;

    console.log(req.body);

    try {
        const card = await stripe.customers.createSource(user.customerId, { source: req.body.token });
        console.log(card);

        const subscription = await stripe.subscriptions.create({
            customer: user.customerId,
            items: [
                {
                    plan: process.env[`${req.body.plan}_PLAN_ID`]
                }
            ]
        });

        res.send(subscription);
    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send(e);
    }
});

app.patch('/users/subscribe', authenticate, subscribed, async (req, res) => {

    const user = req.user;

    console.log('Plan to change to: ', req.body.plan);

    try {
        const customer = await stripe.customers.retrieve(
            user.customerId
        );

        const subscription = await stripe.subscriptions.retrieve(customer.subscriptions.data[0].id);

        const trial_end = subscription.trial_end ? subscription.trial_end : subscription.current_period_end;
        const bonusPlan = subscription.items.data[0].plan.id === process.env.MONTHLY_BONUS_PLAN_ID || subscription.items.data[0].plan.id === process.env.ANNUAL_BONUS_PLAN_ID;

        let newPlan;

        if (bonusPlan) {
            newPlan = `${req.body.plan}_BONUS_PLAN_ID`;
        }
        else {
            newPlan = `${req.body.plan}_PLAN_ID`;
        }

        await stripe.subscriptions.update(
            subscription.id,
            {
                trial_end: trial_end,
                prorate: false,
                cancel_at_period_end: false,
                items: [{
                    id: subscription.items.data[0].id,
                    plan: process.env[newPlan]
                }]
            }
        );

        const result = await stripe.customers.retrieve(
            user.customerId
        );

        res.send(result);
    }
    catch (error) {
        console.log('Error:', error);
        res.status(400).send(e);
    }

});

app.delete('/users/subscribe', authenticate, subscribed, async (req, res) => {

    console.log('Setting subscription to cancel');

    const user = req.user;

    try {
        const customer = await stripe.customers.retrieve(
            user.customerId
        );

        console.log(customer);

        const subscription = customer.subscriptions.data[0];

        console.log(subscription);

        if (!subscription.cancel_at_period_end) {
            console.log('The sub wasn\'t set to cancel');
            await stripe.subscriptions.update(
                subscription.id,
                {
                    cancel_at_period_end: true
                }
            );

            const result = await stripe.customers.retrieve(
                user.customerId
            )

            res.send(result);
        }

    }
    catch (error) {
        console.log('Error:', error);
        res.status(400).send(e);
    }

});

app.post("/users", async (req, res) => {

    console.log('POST /users');
    let addux;
    console.log('SENT DATA:', req.body);

    try {
        const customer = await stripe.customers.create({
            description: `${req.body.firstName} ${req.body.lastName}`,
            email: req.body.email,
            source: req.body.token
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    plan: process.env[`${req.body.plan}_LAUNCH_PLAN_ID`]
                }
            ]
        });

        var body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'company']);
        console.log(body);
        body.masterUser = true;
        body.lastLogin = moment().unix();
        body.customerId = customer.id;
        var user = new User(body);

        await user.save();

        const token = await user.generateAuthToken();

        addux = new Addux({
            name: 'My first addux',
            _creator: user._id,
        });

        const comments = [];

        for (let i = 0; i < 7; i++) {
            //let comment = new Comment();
            comments.push({ text: "" });
        }

        const insertedComments = await Comment.insertMany(comments);

        addux.objective_comments = insertedComments[0]._id;
        addux.goals_comments = insertedComments[1]._id;
        addux.projects_comments = insertedComments[2]._id;
        addux.timelines_comments = insertedComments[3]._id;
        addux.projectOwner_comments = insertedComments[4]._id;
        addux.resources_comments = insertedComments[5]._id;
        addux.progress_comments = insertedComments[6]._id;

        addux.save();

        //TODO: Remove User's tokens and password before sending back

        //const messageText = `Hi ${user.firstName}!  A password reset was requested for your Addux account.  Please visit https://${req.headers.host}/reset/${passwordReset} to create a new password. This link will expire in 4 hours`;
        const messageText = [];

        messageText[0] = `Dear ${user.firstName},`;
        messageText[1] = `Welcome to addux Online!`;
        messageText[2] = `Let the work of strategy begin!`;
        messageText[3] = `Before you get started, save this email - it has your login details and weekly meeting links.  Here's your login information for addux Online`;
        messageText[4] = `https://adduxapp.com/login`;
        messageText[5] = `Login: ${user.email}`;
        messageText[6] = `Password: ${body.password}`
        messageText[7] = `Once you login, be sure to watch the Tutorial Video and the videos for each section.  This will give you what you need to get started`;
        messageText[8] = `As part of your purchase you get a free 1-hour strategy consulation call. Please click here to schedule`;
        messageText[9] = `Additionally you will have 2 recurring weekly calls:`;
        messageText[10] = `- 1 addux Software Training Call each Tuesday at 3:00pm CST (https://zoom.us/j/367489239 - Meeting ID 367-489-239)`;
        messageText[11] = `- 1 Coaching Call each Thursday at 3:00pm CST. (https://zoom.us/j/222369494 - Meeting ID 222-369-494)`;
        messageText[12] = `You will also be receiving 2 emails for accessing your addux Online Course from Kajabi.`;
        messageText[13] = `Once again, welcome to addux Online...`;
        messageText[14] = `Best Regards,`;
        messageText[15] = `Carey`;
        messageText[16] = `P.S. If you have any problems whatsoever, just send an email to Customer Support.  They'll take care of you right away: contact@adduxonline.com`;

        const message = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'addux Online - Welcome and Login Details',
            message: messageText.join('\n'),
            html: `<p>${messageText.join('</p><p>')}</p>`
        }

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Could not send email!');
                res.status(400).send(err);
            }
            else {
                console.log('Message sent!');
                res.send(info);
            }
        });

        const cleanUser = _.pick(user, ['isAdmin', '_id', 'email', 'firstName', 'lastName', 'company', 'masterUser']);

        res.header("x-auth", token).send(cleanUser);
    }
    catch (e) {
        //console.log('IN THE CATCH BLOCK');
        console.log('Error: ', e);
        //await user.remove();
        //await addux.remove();
        res.status(400).send(e);
    }
});

app.patch('/users/subordinate', async (req, res) => {

    console.log('Adding subordinate user');

    try {
        const body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'company', 'customerId', 'isAdmin']);
        console.log(body);
        const user = new User(body);
        user.lastLogin = moment().unix();

        await user.save();

        const token = user.generateAuthToken();

        const addux = new Addux({
            name: 'My first addux',
            _creator: user._id,
        });

        const comments = [];

        for (let i = 0; i < 7; i++) {
            //let comment = new Comment();
            comments.push({ text: "" });
        }

        const insertedComments = await Comment.insertMany(comments);

        addux.objective_comments = insertedComments[0]._id;
        addux.goals_comments = insertedComments[1]._id;
        addux.projects_comments = insertedComments[2]._id;
        addux.timelines_comments = insertedComments[3]._id;
        addux.projectOwner_comments = insertedComments[4]._id;
        addux.resources_comments = insertedComments[5]._id;
        addux.progress_comments = insertedComments[6]._id;

        addux.save();

        //TODO: Remove User's tokens and password before sending back
        const cleanUser = _.pick(user, ['isAdmin', '_id', 'email', 'firstName', 'lastName', 'company', 'masterUser']);

        res.header("x-auth", token).send(cleanUser);
    }
    catch (error) {
        console.log('Error: ', error);
        await user.remove();
        await addux.remove();
        res.status(400).send(error);
    }

});

app.post("/users/login", async (req, res) => {

    console.log('POST /users/login');
    //console.log(req);

    try {
        const body = _.pick(req.body, ["email", "password"]);
        let user;
        let token;
        let cleanUser;

        if (!body.email || !body.password) {
            console.log('No email or password attempting to login through token');
            const loginToken = req.header('x-auth');
            console.log('Login Token: ', loginToken);
            user = await User.findByToken(loginToken);

            //console.log('USER: ', user);

            if (!user) {
                console.log('No user found');
                res.status(404).send();
            }
            else {
                token = await user.generateAuthToken(loginToken);

                cleanUser = _.pick(user, ['isAdmin', '_id', 'email', 'firstName', 'lastName', 'company', 'masterUser'])

                res.header('x-auth', token).send(cleanUser);
            }

        }
        else {
            console.log('Logging in with credentials');
            user = await User.findByCredentials(body.email, body.password);
            token = await user.generateAuthToken();

            cleanUser = _.pick(user, ['isAdmin', '_id', 'email', 'firstName', 'lastName', 'company', 'masterUser'])

            res.header('x-auth', token).send(cleanUser);
        }
    }
    catch (e) {
        console.log('Error: ', e);
        console.log(e);
        res.status(400).send(e);
    }
});

app.patch("/users/:id", authenticate, (req, res) => {

    console.log('PATCH /users/' + req.params.id);

    const id = req.params.id;
    const updates = req.body;

    if (id === req.user._id.toString()) {
        User.findOneAndUpdate({ _id: req.user._id }, updates).then((user) => {

            if (!user) {
                return res.status(404).send();
            }

            res.send(req.user);
        })
            .catch((e) => {
                console.log('Error: ', e);
                res.status(400).send(e);
            });
    }
    else {
        res.status(403).send();
    }
});

app.delete("/users/me/token", authenticate, async (req, res) => {

    console.log('DELETE /users/me/token');

    try {
        await req.user.removeToken(req.Token);
        res.status(200).send();
    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send();
    }
});

app.get("/users/me/token", authenticate, async (req, res) => {

    console.log('GET /users/me/token');

    try {
        const token = await req.user.generateAuthToken(req.token);
        res.header("x-auth", token).send(req.user);
    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send();
    }
});


app.get('/users/me/customer', authenticate, async (req, res) => {

    console.log('GET /users/me/customer');

    const user = req.user;

    try {
        const customer = await stripe.customers.retrieve(user.customerId);

        res.send(customer);
    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send(e);
    }

});

app.post('/users/me/card', authenticate, async (req, res) => {

    console.log('POST /users/me/card');

    const user = req.user;

    try {
        const customer = await stripe.customers.update(user.customerId, {
            source: req.body.token
        });

        res.send(customer);
    }
    catch (err) {
        console.log('Error: ', err);
        res.status(400).send(e);
    }
});

app.get("/users/me", authenticate, subscribed, (req, res) => {

    console.log('GET /users/me');

    res.send(req.user);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

module.exports = { app }