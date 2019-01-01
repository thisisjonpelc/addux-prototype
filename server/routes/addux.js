const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");

const {Addux} = require('./../models/addux');
const {Comment} = require('./../models/comment');

const { authenticate } = require('./../middleware/authenticate');
const {subscribed} = require('./../middleware/subscribed');

router.post("/addux", authenticate, subscribed, (req, res) => {

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

router.get("/addux", authenticate, subscribed, (req, res) => {

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

router.get("/addux/:id", (req, res) => {

    console.log('Received GET /addux/' + req.params.id);

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Addux.findOne({
        _id: id
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

router.patch("/addux/:id", authenticate, subscribed, (req, res) => {

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

router.delete("/addux/:id", authenticate, subscribed, (req, res) => {

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

module.exports = router;