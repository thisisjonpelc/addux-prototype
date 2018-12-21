import React from "react";
import { Elements } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';

import SignUpForm from './SignUpForm';
import SalesHeader from './SalesHeader';

const SignUpPage = (props) => {

    if (!(
        props.match.params.plan === 'enterprise' ||
        props.match.params.plan === 'individual' ||
        props.match.params.plan === 'coaching-a' ||
        props.match.params.plan === 'coaching-q' 
    )) {
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



export default SignUpPage;