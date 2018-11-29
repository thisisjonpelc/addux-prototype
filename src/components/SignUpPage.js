import React from "react";
import { connect } from "react-redux";
import { Elements, injectStripe } from 'react-stripe-elements';
import {Redirect} from 'react-router-dom';

import SignUpForm from './SignUpForm';
import SalesHeader from './SalesHeader';

import { login } from "./../actions/auth";
import { history } from "./../routers/AppRouter";

const SignUpPage = (props) => {

    if(props.match.params.plan !== 'enterprise' && props.match.params.plan !== 'individual'){
       return (
            <Redirect to='/' />
       ); 
    }

    return (
        <div className='signup-page' >
            <SalesHeader />
            <Elements>
                <SignUpForm plan={props.match.params.plan.toUpperCase()} />
            </Elements>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user))
});

export default connect(undefined, mapDispatchToProps)(SignUpPage);