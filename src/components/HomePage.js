import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom';

import { login, updateToken } from "../actions/auth";

import { history } from "../routers/AppRouter";


class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        }
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

        if (!this.state.email || !this.state.password) {
            this.setState(() => ({ error: "Please enter your email and password!" }));
        }
        else {
            this.setState(() => ({ error: '' }));

            axios.post('/users/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then((response) => {
                    this.props.login(
                        {
                            ...response.data,
                            token: response.headers['x-auth']
                        }
                    );
                    history.push("/");
                })
                .catch((error) => {

                    this.setState(() => ({ error: "Could not find a user with those credentials" }));

                });
        }
    }

    // <div className='center-form-page'>
    //     <div className='center-form-page__form'>
    //         <img className='center-form-page__logo' src='/img/addux-logo.png' />
    //         {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
    //         <form className='form' onSubmit={this.onSubmit}>
    //             <div className='form__form-group'>
    //                 <input
    //                     className='form__input'
    //                     type="email" 
    //                     placeholder="Email"
    //                     autoFocus
    //                     value={this.state.email}
    //                     onChange = {this.onEmailChange}
    //                 />
    //             </div>
    //             <div className='form__form-group'>
    //                 <input
    //                     className='form__input' 
    //                     type="password" 
    //                     placeholder="Password"
    //                     value={this.state.password}
    //                     onChange = {this.onPasswordChange}
    //                 />
    //             </div>

    //             <button className='btn btn--full-width'>Log in!</button>
    //         </form>
    //         <Link className='app-link center-form-page__link' to='/'>Don't have an account?</Link>
    //         <p className='center-form-page__or'> or </p>
    //         <Link className='app-link center-form-page__link' to='/reset'>Forgot your password?</Link>
    //     </div>
    // </div>

    render() {
        return (
            <div className='home-page'>
                
                    <div className='bg-video'>
                        <video className='bg-video__video' autoPlay muted loop>
                            <source src='/img/White-Board.mp4' type='video/mp4' />
                            <source src='/img/White-Board.webm' type='video/webm' />
                        </video>
                        <div className='bg-video__image'>

                        </div>
                    </div>
                

                <div className='home-page__form'>
                    <img className='home-page__logo' src='/img/addux-logo.png' />
                    {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                    <form className='form' onSubmit={this.onSubmit}>
                        <div className='form__form-group'>
                            <input
                                className='form__input'
                                type="email"
                                placeholder="Email"
                                autoFocus
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

                        <button className='btn btn--full-width'>Login</button>
                    </form>
                    <Link className='app-link center-form-page__link' to='/offer/2018'>Don't have an account?</Link>
                    <p className='center-form-page__or'> or </p>
                    <Link className='app-link center-form-page__link' to='/reset'>Forgot Your Password?</Link>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    updateToken: (token) => dispatch(updateToken(token))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);