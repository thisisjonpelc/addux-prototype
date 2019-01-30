const walkthroughReducerDefaultState = {};

const walkthroughReducer = (state = walkthroughReducerDefaultState, action) => {
    switch(action.type){
        case "INITIALIZE_APP":
        case "SET_WALKTHROUGH":
            return action.walkthrough;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}

export default walkthroughReducer;