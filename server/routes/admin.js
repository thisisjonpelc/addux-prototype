const express = require("express");
const router = express.Router();
const _ = require("lodash");
const crypto = require('crypto');
const moment = require('moment');

const {Addux} = require('./../models/addux');
const {User} = require('./../models/user');
const {Comment} = require('./../models/comment');
const transporter = require('./../utilities/email');


router.patch('/users/subordinate', async (req, res) => {

    console.log('Adding subordinate user');
    let userCreated = false;
    let adduxCreated = false;

    try {
        const body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'company', 'customerId', 'isAdmin']);
        console.log(body);
        const user = new User(body);
        user.lastLogin = moment().unix();

        await user.save();
        userCreated = true;
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
        adduxCreated = true;

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

        const newUserMessageText = `New user: ${user.firstName} ${user.lastName} with email ${user.email} just signed up for addux Online as a subordinate user to Stripe customer ${body.customerId}.`;

        const newUserMessage = {
            from: process.env.EMAIL_USERNAME,
            to: process.env.EMAIL_USERNAME,
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

        //TODO: Remove User's tokens and password before sending back
        const cleanUser = _.pick(user, ['isAdmin', '_id', 'email', 'firstName', 'lastName', 'company', 'masterUser']);

        res.header("x-auth", token).send(cleanUser);
    }
    catch (error) {
        console.log('Error: ', error);

        if(userCreated){
            await user.remove();
        }

        if(adduxCreated){
            await addux.remove();            
        }

        res.status(400).send(error);
    }

});

module.exports = router;