const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const subscribed = async (req, res, next) => {
    
    const user = req.user;
    let subscribed = false;

    console.log(`Checking if user ${user._id} is subscribed`);

    if(user.isAdmin){
        next();
    }

    try{
        const customer = await stripe.customers.retrieve(user.customerId);
        const subscriptions = customer.subscriptions.data;

        subscriptions.forEach((subscription) => {
            //console.log(subscription);
            console.log('Subscription id is: ', subscription.plan.id);
            console.log('Subscription status is: ', subscription.status);

            if(subscription.plan.id === process.env.MONTHLY_PLAN_ID || subscription.plan.id === process.env.YEARLY_PLAN_ID && subscription.status === 'active'){
                
                subscribed = true;
            }
        });

        if(subscribed){
            console.log(`User ${user._id} is subscribed`);
            next();
        }
        else{
            console.log(`User ${user._id} is not subscribed`);
            throw 'User is not subscribed';
        }
    }
    catch(e){
        console.log(`User ${user._id} is not subscribed`);
        console.log(e);
        res.status(402).send();
    }
}

module.exports = {subscribed};