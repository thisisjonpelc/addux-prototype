const subscriptionReducerDefaultState = {
    subscribed: null
};

export default (state = subscriptionReducerDefaultState, action) => {
    
    console.log(action);
    
    switch(action.type) {
        //case "INITIALIZE_APP":
        case 'SUBSCRIBE':
            return {
                subscribed: true
            }
        case 'UNSUBSCRIBE':
            return{
                subscribed: false
            }
        default:
            return state;
    }
}