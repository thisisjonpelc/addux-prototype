import React from "react";
import {connect} from "react-redux";
import axios from 'axios';

import AdduxApp from "./AdduxApp";
import SignUpPage from "./SignUpPage";
import LoadingPage from './LoadingPage';

import {login} from './../actions/auth';

const AdduxWrapper = (props) => {
        return props.isAuthenticated ? (<AdduxApp />) : (<SignUpPage />);
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: '_id' in state.auth
    };
};

export default connect(mapStateToProps)(AdduxWrapper);