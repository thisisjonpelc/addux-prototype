const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const subscribed = async (req, res, next) => {
    
    const user = req.user;
    let subscribed = false;

    console.log(`Checking if user ${user._id} is subscribed`);

    if(user.isAdmin){
        console.log(`User ${user._id} is an Admin`);
        next();
    }
    else{
        try{
            const customer = await stripe.customers.retrieve(user.customerId);
            const subscriptions = customer.subscriptions.data;
    
            //console.log('Customer: ', customer);

            //console.log('Subscriptions: ', subscriptions);

            subscriptions.forEach((subscription) => {
                if((subscription.plan.id === process.env.INDIVIDUAL_PLAN_ID || subscription.plan.id === process.env.ENTERPRISE_PLAN_ID || subscription.plan.id === process.env.INDIVIDUAL_LAUNCH_PLAN_ID || subscription.plan.id === process.env.ENTERPRISE_LAUNCH_PLAN_ID) && (subscription.status === 'active' || subscription.status === 'trialing')){
                    subscribed = true;
                }
            });
    
            if(subscribed){
                console.log(`User ${user._id} is subscribed`);
                req.customer = customer;
                next();
            }
            else{
                //console.log(`User ${user._id} is not subscribed`);
                throw `User ${user._id} is not subscribed`;
            }
        }
        catch(e){
            console.log(e);
            res.status(402).send();
        }
    }
}

module.exports = {subscribed};