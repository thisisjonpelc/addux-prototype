import React from "react";
import {connect} from "react-redux";

import AdduxApp from "./AdduxApp";
import SignUpPage from "./SignUpPage";

const AdduxWrapper = ({isAuthenticated}) => {

    console.log("USER IS AUTHENTICATED?", isAuthenticated);

    return (
        isAuthenticated ? (<AdduxApp />) : (<SignUpPage />)
    );

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: '_id' in state.auth
    };
};

export default connect(mapStateToProps)(AdduxWrapper);