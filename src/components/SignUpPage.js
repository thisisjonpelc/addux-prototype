import React from "react";
import { connect } from "react-redux";
import { Elements, injectStripe } from 'react-stripe-elements';
import { Link } from 'react-router-dom';

import SignUpForm from './SignUpForm';

import { login } from "./../actions/auth";
import { history } from "./../routers/AppRouter";

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            firstName: "",
            lastName: "",
            company: "",
            email: "",
            password: "",
            error: ""
        }
    };

    onFirstNameChange = (e) => {
        const firstName = e.target.value;
        this.setState(() => ({ firstName }));
    }

    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({ lastName }));
    }

    onCompanyChange = (e) => {
        const company = e.target.value;
        this.setState(() => ({ company }));
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }

    onSubmit = (e) => {

        e.preventDefault();

        if (!this.state.email || !this.state.password || !this.state.firstName || !this.state.lastName) {
            this.setState(() => ({ error: "Please complete all required fields!" }));
        }
        else {
            axios.post('/users/', {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                company: this.state.company
            })
                .then((response) => {
                    this.props.login({
                        ...response.data,
                        token: response.headers['x-auth']
                    });
                    //history.push("/");
                })
                .catch((error) => {
                    this.setState(() => ({ error: "Could not register user" }));
                });
        }
    }

    render() {
        return (
            <div className='signup-page'>
                <header className='sales-header'>
                    <img src='/img/addux-logo.png' className='sales-header__logo' />
                    <p className='sales-header__text'>Launch Special Ends - 12.14</p>
                </header>
                <Elements>
                    <SignUpForm plan={this.props.match.params.plan.toUpperCase()}/>
                </Elements>
            </div>
        );
    };
}


const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user))
});

export default connect(undefined, mapDispatchToProps)(SignUpPage);