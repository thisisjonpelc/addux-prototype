const express = require("express");
const router = express.Router();
const _ = require("lodash");
const crypto = require('crypto');
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const {Addux} = require('./../models/addux');
const {User} = require('./../models/user');
const {Comment} = require('./../models/comment');
const transporter = require('./../utilities/email');

const { authenticate } = require('./../middleware/authenticate');
const {subscribed} = require('./../middleware/subscribed');

router.post('/users/reset', async (req, res) => {

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

router.post('/users/reset/:token', async (req, res) => {

    console.log("POST /users/reset/" + req.params.token);

    try {
        const resetToken = req.params.token;
        const password = req.body.password;

        const user = await User.findOneAndUpdate({ passwordReset: resetToken, resetExpire: { $gt: moment().unix() } }, { password, passwordReset: "", resetExpire: 0 });

        if (!user) {
            res.status(404).send();
        }
        else {
            res.send(user);
        }
    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send();
    }

});

router.post('/users/subscribe', authenticate, async (req, res) => {

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

router.patch('/users/subscribe', authenticate, subscribed, async (req, res) => {

    const user = req.user;

    //console.log('Plan to change to: ', req.body.plan);

    try {
        const customer = req.customer;

        //const subscription = await stripe.subscriptions.retrieve(customer.subscriptions.data[0].id);

        //const trial_end = subscription.trial_end ? subscription.trial_end : subscription.current_period_end;
        //const bonusPlan = subscription.items.data[0].plan.id === process.env.MONTHLY_BONUS_PLAN_ID || subscription.items.data[0].plan.id === process.env.ANNUAL_BONUS_PLAN_ID;

        // let newPlan;

        // if (bonusPlan) {
        //     newPlan = `${req.body.plan}_BONUS_PLAN_ID`;
        // }
        // else {
        //     newPlan = `${req.body.plan}_PLAN_ID`;
        // }

        await stripe.subscriptions.update(
            customer.subscriptions.data[0].id,
            {
                cancel_at_period_end: false,
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

router.delete('/users/subscribe', authenticate, subscribed, async (req, res) => {

    console.log('Setting subscription to cancel');

    const user = req.user;

    try {
        const customer = req.customer;

        //console.log(customer);

        const subscription = customer.subscriptions.data[0];

        //console.log(subscription);

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
            );

            res.send(result);
        }

    }
    catch (error) {
        console.log('Error:', error);
        res.status(400).send(e);
    }

});

router.post("/users", async (req, res) => {

    console.log('POST /users');
    let addux;
    console.log('SENT DATA:', req.body);
    let customerCreated = false;
    let userCreated = false;
    let adduxCreated = false;
    let customer;
    let user;

    try {
        customer = await stripe.customers.create({
            description: `${req.body.firstName} ${req.body.lastName}`,
            email: req.body.email,
            source: req.body.token
        });

        customerCreated = true;

        var body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'company']);
        console.log(body);
        body.masterUser = true;
        body.lastLogin = moment().unix();
        body.customerId = customer.id;
        user = new User(body);

        await user.save();

        userCreated = true;

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

        adduxCreated = true;

        //TODO: Remove User's tokens and password before sending back

        //const messageText = `Hi ${user.firstName}!  A password reset was requested for your Addux account.  Please visit https://${req.headers.host}/reset/${passwordReset} to create a new password. This link will expire in 4 hours`;
        const messageText = [];

        messageText[0] = `Dear ${user.firstName},`;
        messageText[1] = `Welcome to addux Online!`;
        messageText[2] = `Let the work of strategy begin!`;
        messageText[3] = `Before you get started, save this email - it has your login details and weekly meeting links.  Here's your login information for addux Online`;
        messageText[4] = `https://www.adduxapp.com`;
        messageText[5] = `Login: ${user.email}`;
        messageText[6] = `Password: ${body.password}`
        messageText[7] = `Once you login, be sure to watch the Tutorial Video and the videos for each section.  This will give you what you need to get started`;
        messageText[8] = `As part of your purchase you get a free strategy consulation call. Please go to https://adduxlaunch.com/call to schedule`;
        messageText[9] = `Additionally you will have 2 recurring weekly calls:`;
        messageText[10] = `- 1 addux Software Training Call each Tuesday at 3:00pm CST (https://zoom.us/j/367489239 - Meeting ID 367-489-239)`;
        messageText[11] = `- 1 Coaching Call each Thursday at 3:00pm CST. (https://zoom.us/j/222369494 - Meeting ID 222-369-494)`;
        messageText[12] = `You will also be receiving 2 emails for accessing your addux Online Course from Kajabi.`;
        messageText[13] = `Once again, welcome to addux Online...`;
        messageText[14] = `Best Regards,`;
        messageText[15] = `Carey`;
        messageText[16] = `P.S. If you have any problems whatsoever, just send an email to Customer Support.  They'll take care of you right away: contact@adduxonline.com`;

        const plainText = messageText.join('\n');

        messageText[8] = `As part of your purchase you get a free strategy consulation call. Please <a href='https://adduxlaunch.com/call'>click here</a> to schedule`

        const htmlContent = `<p>${messageText.join('</p><p>')}</p>`;

        const cleanUser = _.pick(user, ['isAdmin', '_id', 'email', 'firstName', 'lastName', 'company', 'masterUser']);

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    plan: process.env[`${req.body.plan}_PLAN_ID`]
                }
            ]
        });

        const message = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'addux Online - Welcome and Login Details',
            message: plainText,
            html: htmlContent
        }

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Could not send email!');
                //res.status(400).send(err);
            }
            else {
                console.log('Message sent!');
                //res.send(info);
            }
        });

        const newUserMessageText = `New user: ${user.firstName} ${user.lastName} with email ${user.email} just signed up for addux Online as a master (${req.body.plan}) user.`;

        const newUserMessage = {
            from: process.env.EMAIL_USERNAME,
            to: process.env.EMAIL_NOTIFICATION_ON_SIGNUP,
            subject:'New addux Online user',
            message:newUserMessageText,
            html:`<p>${newUserMessageText}</p>`
        }

        transporter.sendMail(newUserMessage, (err, info) => {
            if(err){
                console.log('Could not send new user notification email');
            }
            else{
                console.log('New user notification email sent');
            }
        });

        res.header("x-auth", token).send(cleanUser);
    }
    catch (e) {
        console.log('IN THE CATCH BLOCK');
        console.log('Error: ', e);
        try {
            if (customerCreated) {
                console.log('Removing Customer');
                await stripe.customers.del(
                    customer.id
                );
            }

            if (userCreated) {
                console.log('Removing User');
                await user.remove();
            }

            if (adduxCreated) {
                console.log('Removing Addux');
                await addux.remove();
            }
        }
        catch (e2) {
            console.log('Error in removing failed user registration data', e2);
        }

        res.status(400).send(e);
    }
});

router.post("/users/login", async (req, res) => {

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
            //console.log('Login Token: ', loginToken);
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
        //console.log(e);
        res.status(400).send(e);
    }
});

router.patch("/users/:id", authenticate, (req, res) => {

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

router.get("/users/me", authenticate, subscribed, (req, res) => {

    console.log('GET /users/me');

    res.send(req.user);
});

module.exports = router;