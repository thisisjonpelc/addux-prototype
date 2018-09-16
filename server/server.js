require('./config/config.js');

const _ = require("lodash");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
const {ObjectID} = require("mongodb");

const {mongoose} = require('./db/mongoose');
const {authenticate} = require('./middleware/authenticate');
const {User} = require('./models/user');
const {Addux} = require('./models/addux');
const {Comment} = require('./models/comment');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.patch("/comments/:id", (req, res) => {
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
        res.status(400).send(e);    
    });
});

app.post("/addux", authenticate, (req, res) => {
    const addux = new Addux({
        name: req.body.name,
        _creator:req.user._id
    });

    const comments = [];

    for(let i = 0; i < 7; i++){
        //let comment = new Comment();
        comments.push({text:`TEST COMMENT ${i + 1}`});
    }

    Comment.insertMany(comments).then((comments) => {
        console.log("COMMENTS INSERTED!");
        //console.log(comments);

        addux.objective_comments = comments[0]._id;
        addux.goals_comments = comments[1]._id;
        addux.projects_comments = comments[2]._id;
        addux.timelines_comments = comments[3]._id;
        addux.projectOwner_comments = comments[4]._id;
        addux.resources_comments = comments[5]._id;
        addux.progress_comments = comments[6]._id;

        // addux.markModified("objective");
        // addux.markModified("goals");
        // addux.markModified("projects");
        // addux.markModified("timelines");
        // addux.markModified("projectOwner");
        // addux.markModified("expertise");

        addux.save().then((doc) => {
            res.send(doc);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
    })
    .catch((e) => {
        console.log("COULDN'T INSERT COMMENTS!");
        console.log(e);
        
        res.status(400).send(e);
    });
});

app.get("/addux", authenticate, (req, res) => {

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
        res.status(400).send(e);
      });
});

app.get("/addux/:id", (req, res) => {
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
        res.status(400).send();
    });

});

app.patch("/addux/:id", authenticate, (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Addux.findOneAndUpdate({_id:id, _creator:req.user._id}, updates).then((addux) => {

        if(!addux){
            return res.status(404).send();
        }

        //console.log("ADDUX UPDATED!");
        //console.log(addux);
        res.send(addux);
    })
    .catch((e) => {
        res.status(400).send(e);
    })

});

app.delete("/addux/:id", authenticate, (req, res) => {
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
        })
        .catch((e) => {
            res.status(400).send(e);
        });
    });

    // Addux.remove({_id:id, _creator:req.user._id}).then((adduxes) => {
        
    //     console.log("REMOVE RESULTS: ", adduxes);
        
    //     if(!adduxes){
    //         return res.status(404).send();
    //     }

    //     res.send({adduxes});
    // })
    // .catch((e) => {
    //     console.log(e);
    //     res.status(400).send(e);
    // });
});

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

app.post("/users/login", async (req, res) => {
    try{
      const body = _.pick(req.body, ["email", "password"]);
      const user = await User.findByCredentials(body.email, body.password);
      const token = await user.generateAuthToken();
      
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

            if(!user){
                return res.status(404).send();
            }

            console.log(user);
            res.send(req.user);
        })
        .catch((e) => {
            res.status(400).send(e);
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