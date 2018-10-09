require('./config/config.js');

const _ = require("lodash");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
const {ObjectID} = require("mongodb");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const {mongoose} = require('./db/mongoose');
const {authenticate} = require('./middleware/authenticate');
const {subscribed} = require('./middleware/subscribed');
const {User} = require('./models/user');
const {Addux} = require('./models/addux');
const {Comment} = require('./models/comment');
const {Walkthrough} = require('./models/walkthrough');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(publicPath));

const transporter = nodemailer.createTransport(
    {
        host:'secure46.webhostinghub.com',
        port:465,
        secure:true,
        auth: {
            user:'jon@thisisjonpelc.com',
            pass: process.env.EMAIL_PASSWORD
        }
    }
);

transporter.verify(function(error, success) {
    if (error) {
        console.log('Server is not ready to take our email messages:', error);   
    } else {
         console.log('Server is ready to take our email messages!');
    }
 });


app.get("/walkthrough", (req, res) => {

    console.log('Received GET /walkthrough');

    Walkthrough.findOne({}, {}, {sort: {'createdAt': -1}})
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

    if(!req.user.isAdmin){
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

    Comment.findOneAndUpdate({_id: id}, updates)
    .then((comment) => {

        if(!comment){
            return res.status(404).send();
        }

        res.send(comment);

    })
    .catch((e) => {
        console.log('Error: ', e);
        res.status(400).send(e);    
    });
});

app.post("/addux", authenticate, (req, res) => {

    console.log('Received POST /addux');

    const addux = new Addux({
        name: req.body.name,
        _creator:req.user._id,
        goals_1: "",
        goals_2: "",
        goals_3: ""
    });

    const comments = [];

    for(let i = 0; i < 7; i++){
        //let comment = new Comment();
        comments.push({text:""});
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
                res.send({addux});
            })
            .catch((e) => {
                 res.status(400).send(e);
            });
        })
        .catch((e) => {
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

    Addux.find({_creator: req.user._id})
    .populate('objective_comments')
    .populate('goals_comments')
    .populate('projects_comments')
    .populate('timelines_comments')
    .populate('projectOwner_comments')
    .populate('resources_comments')
    .populate('progress_comments')
    .exec()
    .then((adduxes) => {

        res.send({adduxes});
      }, (e) => {
        console.log('Error: ', e);
        res.status(400).send(e);
      });
});

app.get("/addux/:id", (req, res) => {
    
    console.log('Received GET /addux/' + req.params.id);
    
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
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
        if(!addux){
            return res.status(404).send();
        }

        res.send({addux});
    })
    .catch((e) => {
        console.log('Error: ', e);
        res.status(400).send();
    });

});

app.patch("/addux/:id", authenticate, (req, res) => {
    
    console.log('PATCH /addux/' + req.params.id);
    
    const id = req.params.id;
    const updates = req.body;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Addux.findOneAndUpdate({_id:id, _creator:req.user._id}, updates).then((addux) => {

        if(!addux){
            return res.status(404).send();
        }

        res.send(addux);
    })
    .catch((e) => {
        console.log('Error: ', e);
        res.status(400).send(e);
    })

});

app.delete("/addux/:id", authenticate, (req, res) => {
    
    console.log('DELETE /addux/' + req.params.id);

    const id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Addux.findOne({_id:id, _creator:req.user._id}).then((addux) => {
        if(!addux){
            return res.status(404).send();
        }

        addux.remove().then((removedAddux) =>{
            
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

    try{
        const email = req.body.email;
        const passwordReset = crypto.randomBytes(32).toString('hex');
        const resetExpire = moment().add(4, 'h').unix();

        const user = await User.findOneAndUpdate({email}, {passwordReset, resetExpire});
        
        if(!user){
            res.status(404).send();
        }

        messageText = `Hi ${user.firstName}!  A password reset was requested for your Addux account.  Please visit https://${req.headers.host}/reset/${passwordReset} to create a new password. This link will expire in 4 hours`;

        const message = {
            from: 'jon@thisisjonpelc.com',
            to: user.email,
            subject: 'Addux Password Reset',
            message: messageText,
            html: `<p>${messageText}</p>`
        }

        transporter.sendMail(message, (err, info) => {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.send(info);
            }
        });
    }
    catch(e){
        console.log('Error: ', e);
        res.status(400).send(e);
    }
});

app.post('/users/reset/:token', async (req, res) => {

    console.log("POST /users/reset/" + req.params.token);

    try{
        const resetToken = req.params.token;
        const password = req.body.password;

        const user = await User.findOneAndUpdate({passwordReset: resetToken, resetExpire: {$gt: moment().unix()}}, {password, passwordReset: "", resetExpire: 0});
        
        if(!user){
            res.status(404).send();
        }

        res.send(user);
    }
    catch(e){
        console.log('Error: ', e);
        res.status(400).send();
    }

});

app.post('/users/subscribe', authenticate, async (req, res) => {

    console.log('POST /users/subscribe');

    const user = req.user;

    console.log(req.body);

    try{
        const card = await stripe.customers.createSource(user.customerId, {source: req.body.token});
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
    catch(e){
        console.log('Error: ', e);
        res.status(400).send(e);
    }
});

app.post("/users", async (req, res) => {
    
    console.log('POST /users');

    try{
        var body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'company']);
        var user = new User(body);
        user.lastLogin = moment().unix();

        await user.save();
        const customer = await stripe.customers.create({
            description: `Customer for id ${user._id}; ${user.firstName} ${user.lastName}`,
            email: user.email
        });
        
        user.customerId = customer.id;
        
        const token = await user.generateAuthToken();

        //TODO: Remove User's tokens and password before sending back

        res.header("x-auth", token).send(user);
    }
    catch(e){
        console.log('Error: ', e);
        await user.remove();
        res.status(400).send(e);
    }
});

app.post("/users/login", async (req, res) => {

    console.log('POST /users/login');

    try{
      const body = _.pick(req.body, ["email", "password"]);
      const user = await User.findByCredentials(body.email, body.password);
      const token = await user.generateAuthToken();
      
      //TODO: Remove User's tokens and password before sending back


      res.header("x-auth", token).send(user);
    }
    catch(e){
        console.log('Error: ', e);
      res.status(400).send(e);
    }
});

app.patch("/users/:id", authenticate, (req, res) =>{
    
    console.log('PATCH /users/' + req.params.id);

    const id = req.params.id;
    const updates = req.body;

    if(updates.hasOwnProperty("isAdmin")){
        delete updates.isAdmin;
    }

    if(id === req.user._id.toString()){
        User.findOneAndUpdate({_id: req.user._id}, updates).then((user) => {
            
            if(!user){
                return res.status(404).send();
            }

            res.send(req.user);
        })
        .catch((e) => {
            console.log('Error: ', e);
            res.status(400).send(e);
        });
    }
    else{
        res.status(403).send();
    }
});

app.delete("/users/me/token", authenticate, async (req, res) => {

    console.log('DELETE /users/me/token');

    try{
      await req.user.removeToken(req.Token);
      res.status(200).send();
    }
    catch(e){
        console.log('Error: ', e);
      res.status(400).send();
    }
  });

app.get("/users/me/token", authenticate, async (req, res) => {

    console.log('GET /users/me/token');

    try{
      const token = await req.user.generateAuthToken(req.token);
      res.header("x-auth", token).send(req.user);
    }
    catch(e){
      console.log('Error: ', e);
      res.status(400).send();
    }
  });


app.get('/users/me/customer', authenticate, async (req, res) => {

    console.log('GET /users/me/customer');

    const user = req.user;

    try{
        const customer = await stripe.customers.retrieve(user.customerId);

        res.send(customer);
    }
    catch(e){
        console.log('Error: ', e);
        res.status(400).send(e);
    }

});

app.post('/users/me/card', authenticate, async (req, res) => {

    console.log('POST /users/me/card');

    const user = req.user;

    try{
        const customer = await stripe.customers.update(user.customerId, {
            source: req.body.token
        });

        res.send(customer);
    }
    catch(err){
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

module.exports = {app}