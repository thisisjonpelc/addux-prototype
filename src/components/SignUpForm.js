import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

import { login } from "./../actions/auth";
import { history } from "./../routers/AppRouter";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            password: '',
            error: '',
            waiting: false
        }
    }

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
        console.log('Submitting new user data!');

        e.preventDefault();

        if (!this.state.email || !this.state.password || !this.state.firstName || !this.state.lastName) {
            this.setState(() => ({ error: "Please complete all required fields!" }));
        }
        else {

            this.setState({
                error: '',
                waiting: true
            });


            this.props.stripe.createToken()
                .then((token) => {

                    if (token.error) {
                        this.setState(() => ({ error: token.error.message, waiting: false }));
                    }
                    else {
                        axios.post('/users',
                            {
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                company: this.state.company,
                                password: this.state.password,
                                email: this.state.email,
                                token: token.token.id,
                                plan: this.props.plan
                            })
                            .then((response) => {
                                this.props.login({
                                    ...response.data,
                                    token: response.headers['x-auth']
                                });
                                history.push('/');
                            })
                            .catch((err) => {
                                //this.setState(() => ())
                                this.setState(() => ({ error: 'That email address is already in use.', waiting: false }));
                            });
                    }
                })
                .catch((err) => {
                    this.setState(() => ({ error: 'Sorry! We couldn\'t sign you up right now.  Please try again later.', waiting: false }));
                });
        }
    }

    render() {
        return (
            <form className='signup-page__form form' onSubmit={this.onSubmit}>
                <Link className='signup-page__back' to='/'>Go Back</Link>
                <div className='form__form-group'>
                    <input
                        className='form__input'
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                    />
                </div>
                <div className='form__form-group'>
                    <input
                        className='form__input'
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                    />
                </div>
                <div className='form__form-group'>
                    <input
                        className='form__input'
                        type="text"
                        placeholder="Company(Optional)"
                        value={this.state.company}
                        onChange={this.onCompanyChange}
                    />
                </div>
                <div className='form__form-group'>
                    <input
                        className='form__input'
                        type="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                </div>
                <div className='form__form-group'>
                    <input
                        className='form__input'
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                </div>
                <div className='form__form-group'>
                    <CardElement className='form__input' />
                </div>
                <div className='signup-page__description'>
                    <p>You have selected the {this.props.plan} plan at:</p>
                    {this.props.plan === 'INDIVIDUAL' 
                        ? 
                        (<p className='signup-page__price'><span className='signup-page__price--strike'>$397</span>$297 per year</p>) 
                        : 
                        (<p className='signup-page__price'><span className='signup-page__price--strike'>$2997</span>$1997 per year</p>)
                    }
                </div>
                {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                <button className='btn btn--full-width' disabled={this.state.waiting}>{this.state.waiting ? (<img className='btn__loading' src='/img/loading.gif' />) : ('Sign Up')}</button>
                <Link className='app-link' to='/login'>Already have an account?</Link>
            </form>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(injectStripe(SignUpForm));