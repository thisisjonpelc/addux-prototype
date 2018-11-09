import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom';

import {login, updateToken} from "./../actions/auth";

import {history} from "./../routers/AppRouter";


class LoginPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error:""
        }
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }

    onSubmit = (e) => {

        e.preventDefault();

        if(!this.state.email || !this.state.password){
            this.setState(() => ({error: "Please enter your email and password!"}));
        }
        else{
            axios.post('/users/login', {
                email:this.state.email,
                password:this.state.password
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
                
                this.setState(() => ({error: "Could not find a user with those credentials"}));
            
            });
        }
    }

    render(){
        return(
            <div className='login-page'>
                <div className="bg-video">
                    <video className="bg-video__content" autoPlay muted loop>
                        <source src="img/white-board.mp4" type="video/mp4" />
                        <source src="img/white-board.webm" type="video/webm" />
                        Your browser is not supported!
                    </video>
                </div>
                <div className='login-page__form'>
                    <h1 className='login-page__heading'>It's nice to see you again!</h1>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form className='form' onSubmit={this.onSubmit}>
                        <div className='form__form-group'>
                            <input
                                className='form__input'
                                type="email" 
                                placeholder="Email"
                                autoFocus
                                value={this.state.email}
                                onChange = {this.onEmailChange}
                            />
                        </div>
                        <div className='form__form-group'>
                            <input
                                className='form__input' 
                                type="password" 
                                placeholder="Password"
                                value={this.state.password}
                                onChange = {this.onPasswordChange}
                            />
                        </div>
                        
                        <button className='btn'>Log in!</button>
                    </form>
                    <Link className='app-link' to='/'>Don't have an account?</Link>
                    <Link className='app-link' to='/reset'>Forgot your password?</Link>
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