export default (state = {}, action) => {
    switch(action.type) {
        case "LOGIN":
            return action.user;
        case "LOGOUT":
            return {};
        case "UPDATE_TOKEN":
            return {
                ...state,
                token: action.token
            }
        case 'UPDATE_USER':
            return {
                ...state,
                ...action.updates
            }
        default:
            return state;
    }
}