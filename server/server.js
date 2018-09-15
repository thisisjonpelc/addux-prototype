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
    //console.log("REQUEST BODY", req.body);
    
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

app.post("/users/login", async (req, res) => {
    try{
      const body = _.pick(req.body, ["email", "password"]);
      const user = await User.findByCredentials(body.email, body.password);
      const token = await user.generateAuthToken();
      //console.log("USER: ", user);
      res.header("x-auth", token).send(user);
    }
    catch(e){
      res.status(400).send();
    }
});

app.patch("/users/:id", authenticate, (req, res) =>{
    
    const id = req.params.id;
    const updates = req.body;

    if(id === req.user._id.toString()){
        //console.log("USER HAS PERMISSION TO UPDATE THIS USER");
        User.findOneAndUpdate({_id: req.user._id}, updates).then((user) => {
            console.log(user);
            res.send(req.user);
        })
        .catch((e) => {
            console.log("ERROR:", e);
        });
    }
    else{
        res.status(403).send();
    }

});

app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

module.exports = {app}