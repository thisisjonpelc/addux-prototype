const express = require("express");
const router = express.Router();

const {Comment} = require('./../models/comment');

router.patch("/comments/:id", (req, res) => {

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

module.exports = router;