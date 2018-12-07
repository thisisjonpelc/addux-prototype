const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { authenticate } = require('./../middleware/authenticate');


router.get('/users/me/customer', authenticate, async (req, res) => {

    console.log('GET /users/me/customer');

    const user = req.user;

    try {
        const customer = await stripe.customers.retrieve(user.customerId);

        res.send(customer);
    }
    catch (e) {
        console.log('Error: ', e);
        res.status(400).send(e);
    }

});

router.post('/users/me/card', authenticate, async (req, res) => {

    console.log('POST /users/me/card');

    const user = req.user;

    try {
        const customer = await stripe.customers.update(user.customerId, {
            source: req.body.token
        });

        res.send(customer);
    }
    catch (err) {
        console.log('Error: ', err);
        res.status(400).send(e);
    }
});

module.exports = router;