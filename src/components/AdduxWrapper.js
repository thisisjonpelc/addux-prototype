import React from "react";
import {connect} from "react-redux";
import axios from 'axios';

import AdduxApp from "./AdduxApp";
import SignUpPage from "./SignUpPage";
import SalesPage2018 from './SalesPage2018';
import LoginPage from './HomePage';

const AdduxWrapper = (props) => {
        return props.isAuthenticated ? (<AdduxApp />) : (<LoginPage />);
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: '_id' in state.auth
    };
};

export default connect(mapStateToProps)(AdduxWrapper);