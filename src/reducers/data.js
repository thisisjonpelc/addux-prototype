const dataReducerDefaultState = {
    status: "WAITING"
};

export default (state = dataReducerDefaultState, action) => {
    switch(action.type) {
        //case "INITIALIZE_APP":
        case "DATA_RECEIVED":
            return {
                status: "RECIEVED"
            }
        case "DATA_ERROR":
            return{
                status: "ERROR"
            }
        case "DATA_RESET":
            return{
                status: "WAITING"
            }
        default:
            return state;
    }
}