const express = require("express");
const router = express.Router();

const {Walkthrough} = require('./../models/walkthrough');

const { authenticate } = require('./../middleware/authenticate');


router.get("/walkthrough", (req, res) => {

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

router.post("/walkthrough", authenticate, (req, res) => {

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

module.exports = router;