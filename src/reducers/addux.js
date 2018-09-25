const adduxReducerDefaultState = {};

const adduxReducer = (state = adduxReducerDefaultState, action) => {
    
    switch(action.type){
        case "SET_ADDUXES":
            
            console.log("GOT NEW ADDUXES!");    
            console.log(action);

            let newState = {}
        
            action.adduxes.forEach(function(element) {
                newState[element._id] = element;
            });

            return newState;
        case "SET_ACTIVE":
            console.log("SETTING A NEW ACTIVE ADDUX");
            return {
                ...state,
                active: action.id
            }
        case "EDIT_ADDUX":
           let id = action.activeAddux;
           let newAddux = {
               ...state[id],
               ...action.updates
           }

           newState = {
               ...state,
           }

           newState[id] = newAddux;
        
           return newState;
        case "EDIT_COMMENT":
           newState = {
               ...state
           };

           newState[action.adduxId][action.commentId].text=action.text;

           return newState;

        case "ADD_ADDUX":
           newState = {
               ...state
           };

           newState[action.addux._id] = action.addux;

           return newState;

        default:
            return state;
    }
}

export default adduxReducer;