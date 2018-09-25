export default (state = {}, action) => {
    switch(action.type) {
        case "LOGIN":
            console.log("RECIEVED A LOGIN ACTION!");
            return action.user;
        case "LOGOUT":
            return {};
        case "UPDATE_TOKEN":
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}