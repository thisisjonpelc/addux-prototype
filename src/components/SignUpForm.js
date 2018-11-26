import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { CardElement , injectStripe} from 'react-stripe-elements';
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
            error: ''
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
        e.preventDefault();

        this.props.stripe.createToken()
            .then((token) => {
                
                if(token.error){
                    this.setState(() => ({error: token.error.message, status:''}));
                }
                else{
                    axios.post('/users',
                        {
                            firstName:this.state.firstName,
                            lastName:this.state.lastName,
                            company:this.state.lastName,
                            password:this.state.password,
                            email:this.state.email,
                            token:token.token.id,
                            plan: this.props.plan
                        })
                        .then((response) => {
                            this.props.login({
                                ...response.data,
                                token: response.headers['x-auth']
                            });
                            history.push('/');
                        });
                }
            })
            .catch((err) => {
                this.setState(() => ({error: 'Sorry! We couldn\'t sign you up right now.  Please try again later.'}));
            })
    }

    render() {
        return (
            <form className='signup-page__form form' onSubmit={this.onSubmit}>
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

                </div>
                <button className='btn btn--full-width'>Sign up!</button>
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