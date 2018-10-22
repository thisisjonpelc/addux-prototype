const adduxReducerDefaultState = {};

const adduxReducer = (state = adduxReducerDefaultState, action) => {
    
    let newState = {};

    switch(action.type){

        case "INITIALIZE_APP":
        case "SET_ADDUXES":    
            console.log("GOT NEW ADDUXES!");    
            console.log(action);

            newState = {}
        
            action.adduxes.forEach(function(element) {
                newState[element._id] = element;
            });

            if(action.adduxes.length > 0){
                newState.active = action.adduxes[0]._id;
            }

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

           if(!(Object.keys(newState).length === 0 && newState.constructor === Object)){
                newState[action.adduxId][action.commentId].text=action.text;
           }
           else{
               console.log('STATE IS EMPTY!');
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
           console.log('Deleting addux: ', action.id);
           newState = {};
           id = action.id;
           let newActive = '';

           for(let key in state){
                if(key !== id & key!=='active'){
                    console.log(key, ' is not being deleted');
                    newState[key] = state[key];
                    
                    if(!newActive){
                        console.log(key, ' is the potential new active addux');
                        newActive = key;
                    }
                }
           }

           if(!(Object.keys(newState).length === 0 && newState.constructor === Object)){
                console.log('Adduxes do remain');
                if(state.active === id){
                    console.log('The active addux was the one deleted.  Setting new active addux to: ', newActive);
                    newState.active = newActive;
                }
                else{
                    newState.active = state.active;
                }
           }

           console.log('The old state was:', state);
           console.log('The new state is:', newState);

           return newState;
        default:
            return state;
    }
}

export default adduxReducer;