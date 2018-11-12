const subscriptionReducerDefaultState = {
    subscribed: null
};

export default (state = subscriptionReducerDefaultState, action) => {
        
    switch(action.type) {
        case "INITIALIZE_APP":
        case 'SUBSCRIBE':
            console.log('Received subscribe action');

            return {
                subscribed: true
            }
        case 'UNSUBSCRIBE':
            console.log('Received unsubscribe action');

            return{
                subscribed: false
            }
        default:
            return state;
    }
}