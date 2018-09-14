require('./config/config.js');

const _ = require("lodash");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const {mongoose} = require('./db/mongoose');
const {authenticate} = require('./middleware/authenticate');
const {User} = require('./models/user');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.post("/users", async (req, res) => {
    try{
        var body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'company']);
        var user = new User(body);
        user.lastLogin = moment().unix();
        
        await user.save();
        const token = await user.generateAuthToken();
        res.header("x-auth", token).send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

module.exports = {app}