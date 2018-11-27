import React from "react";
import { connect } from "react-redux";
import { Elements, injectStripe } from 'react-stripe-elements';
import { Link } from 'react-router-dom';

import SignUpForm from './SignUpForm';

import { login } from "./../actions/auth";
import { history } from "./../routers/AppRouter";

const SignUpPage = (props) => {

    return (
        <div className='signup-page' >
            <header className='sales-header'>
                <img src='/img/addux-logo.png' className='sales-header__logo' />
                <p className='sales-header__text'>Launch Special Ends - 12.14</p>
            </header>
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