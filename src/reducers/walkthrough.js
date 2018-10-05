const walkthroughReducerDefaultState = {};

const walkthroughReducer = (state = walkthroughReducer, action) => {
    switch(action.type){
        case "INITIALIZE_APP":
        case "SET_WALKTHROUGH":
            return action.walkthrough;
        default:
            return state;
    }
}

export default walkthroughReducer;