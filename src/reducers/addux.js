const adduxReducerDefaultState = {};

const adduxReducer = (state = adduxReducerDefaultState, action) => {
    
    let newState = {};

    switch(action.type){

        case "INITIALIZE_APP":
        case "SET_ADDUXES":
            newState = {}
        
            action.adduxes.forEach(function(element) {
                newState[element._id] = element;
            });

            if(action.adduxes.length > 0){
                newState.active = action.adduxes[0]._id;
            }

            return newState;
        case "SET_ACTIVE":
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

           if(!(Object.keys(newState).length === 0 && newState.constructor === Object)){
                newState[action.adduxId][action.commentId].text=action.text;
           }
           else{

           }

           return newState;

        case "ADD_ADDUX":
           newState = {
               ...state,
               active: action.addux._id
           };

           newState[action.addux._id] = action.addux;

           return newState;
        case 'DELETE_ADDUX':

           newState = {};
           id = action.id;
           let newActive = '';

           for(let key in state){
                if(key !== id & key!=='active'){
                    newState[key] = state[key];
                    
                    if(!newActive){
                        newActive = key;
                    }
                }
           }

           if(!(Object.keys(newState).length === 0 && newState.constructor === Object)){
                if(state.active === id){
                    newState.active = newActive;
                }
                else{
                    newState.active = state.active;
                }
           }

           return newState;
        default:
            return state;
    }
}

export default adduxReducer;