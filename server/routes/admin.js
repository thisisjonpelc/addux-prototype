const express = require("express");
const router = express.Router();
const _ = require("lodash");
const crypto = require('crypto');
const moment = require('moment');
//const csv = require('express-csv');
const fs = require('fs');
const path = require('path');
const Json2csvParser = require('json2csv').Parser;

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
        messageText[4] = `https://www.adduxapp.com`;
        messageText[5] = `Login: ${user.email}`;
        messageText[6] = `Password: ${body.password}`
        messageText[7] = `Once you login, be sure to watch the Tutorial Video and the videos for each section. This will give you what you need to get started`;
        messageText[8] = `Additionally you will have 1 recurring weekly call:`;
        messageText[10] = `- Coaching Call each Thursday at 3:00pm CST. (https://zoom.us/j/222369494 - Meeting ID 222-369-494)`;
        messageText[11] = `You will also be receiving 2 emails for accessing your addux Online Course from Kajabi.`;
        messageText[12] = `Once again, welcome to addux Online...`;
        messageText[13] = `Best Regards,`;
        messageText[14] = `Carey`;
        messageText[15] = `P.S. If you have any problems whatsoever, just send an email to Customer Support.  They'll take care of you right away: contact@adduxonline.com`;

        const plainText = messageText.join('\n');

        //messageText[8] = `As part of your purchase you get a free strategy consulation call. Please <a href='https://adduxlaunch.com/call'>click here</a> to schedule`

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

router.get('/addux/csv/:id', async (req, res) => {
    
    const id = req.params.id;

    try{
        const addux = await Addux.findOne({ _id: id});
        //console.log(addux);
        //res.send(addux);

        const fields = ['Objective', 'Goals', 'Projects', 'Timelines', 'Project Owner', 'Resources Required', 'Progress Updates', 'Progress Status'];
        const rows = [
            {
                "Objective":"",
                "Goals":"",
                "Projects":addux.projects_1,
                "Timelines":addux.timelines_1,
                "Project Owner":addux.projectOwner_1,
                "Resources Required":addux.resources_1,
                "Progress Updates":addux.progress_1,
                "Progress Status": addux.progress_1_status
            },
            {
                "Objective":"",
                "Goals":"",
                "Projects":addux.projects_2,
                "Timelines":addux.timelines_2,
                "Project Owner":addux.projectOwner_2,
                "Resources Required":addux.resources_2,
                "Progress Updates":addux.progress_2,
                "Progress Status": addux.progress_2_status
            },
            {
                "Objective":"",
                "Goals":"",
                "Projects":addux.projects_3,
                "Timelines":addux.timelines_3,
                "Project Owner":addux.projectOwner_3,
                "Resources Required":addux.resources_3,
                "Progress Updates":addux.progress_3,
                "Progress Status": addux.progress_3_status
            },
            {
                "Objective":"",
                "Goals":"",
                "Projects":addux.projects_4,
                "Timelines":addux.timelines_4,
                "Project Owner":addux.projectOwner_4,
                "Resources Required":addux.resources_4,
                "Progress Updates":addux.progress_4,
                "Progress Status": addux.progress_4_status
            },
            {
                "Objective":"",
                "Goals":addux.goals_1,
                "Projects":addux.projects_5,
                "Timelines":addux.timelines_5,
                "Project Owner":addux.projectOwner_5,
                "Resources Required":addux.resources_5,
                "Progress Updates":addux.progress_5,
                "Progress Status": addux.progress_5_status
            },
            {
                "Objective":addux.objective,
                "Goals":addux.goals_2,
                "Projects":addux.projects_6,
                "Timelines":addux.timelines_6,
                "Project Owner":addux.projectOwner_6,
                "Resources Required":addux.resources_6,
                "Progress Updates":addux.progress_6,
                "Progress Status": addux.progress_6_status
            },
            {
                "Objective":"",
                "Goals":addux.goals_3,
                "Projects":addux.projects_7,
                "Timelines":addux.timelines_7,
                "Project Owner":addux.projectOwner_7,
                "Resources Required":addux.resources_7,
                "Progress Updates":addux.progress_7,
                "Progress Status": addux.progress_7_status
            },
            {
                "Objective":"",
                "Goals":"",
                "Projects":addux.projects_8,
                "Timelines":addux.timelines_8,
                "Project Owner":addux.projectOwner_8,
                "Resources Required":addux.resources_8,
                "Progress Updates":addux.progress_8,
                "Progress Status": addux.progress_8_status
            },
            {
                "Objective":"",
                "Goals":"",
                "Projects":addux.projects_9,
                "Timelines":addux.timelines_9,
                "Project Owner":addux.projectOwner_9,
                "Resources Required":addux.resources_9,
                "Progress Updates":addux.progress_9,
                "Progress Status": addux.progress_9_status
            }
        ];
 
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(rows);
        //const file = `${path.join(__dirname, '..', '/tmp')}/test.csv`;
        const file = `/tmp/${addux.name}`;

        //console.log(csv);
        fs.writeFile(file, csv, 'utf8', (err) => {
            if(err){
                console.log('Could not save file!');
                console.log(err);
                res.status(400).send(err);
            }
            else{
                console.log('File was saved!');
                res.download(file);
            }
        });
    }
    catch(error){
        console.log('Error: ', error);
        res.status(400).send(error);
    }
});

module.exports = router;