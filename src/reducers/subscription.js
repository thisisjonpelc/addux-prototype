const subscriptionReducerDefaultState = {
    subscribed: null
};

export default (state = subscriptionReducerDefaultState, action) => {
        
    switch(action.type) {
        case "INITIALIZE_APP":
        case 'SUBSCRIBE':
            return {
                subscribed: true
            }
        case 'UNSUBSCRIBE':

            return{
                subscribed: false
            }
        case 'LOGOUT':
            return {
                subscribed: null
            }
        default:
            return state;
    }
}