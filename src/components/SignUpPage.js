import React from "react";
import {connect} from "react-redux";
import axios from 'axios';
import {Link} from 'react-router-dom';

import {login} from "./../actions/auth";
import {history} from "./../routers/AppRouter";


class SignUpPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            company:"",
            email:"",
            password:"",
            error:""
        }
    };

    onFirstNameChange = (e) => {
        const firstName = e.target.value;
        this.setState(() => ({firstName}));
    }

    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({lastName}));
    }

    onCompanyChange = (e) => {
        const company = e.target.value;
        this.setState(() => ({company}));
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

        console.log("SUBMITTED SIGN UP!");

        e.preventDefault();

        if(!this.state.email || !this.state.password || !this.state.firstName || !this.state.lastName){
            this.setState(() => ({error: "Please complete all required fields!"}));
        }   
        else{
            console.log("SENDING POST REQUEST");
            axios.post('/users/', {
                email:this.state.email,
                password:this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                company:this.state.company
            })
            .then((response) => {
                console.log("SIGN UP SUCCESS!");
                console.log(response);
                this.props.login({
                    ...response.data,
                    token: response.headers['x-auth']
                });
                //history.push("/");
            })
            .catch((error) => {
                console.log("LOGIN FAIL!");
                console.log(error);
                
                this.setState(() => ({error: "Could not register user"}));
            });
        }
    }

    render() {
        return(

            <div className='home-page'>
                <div className="bg-video">
                    <video className="bg-video__content" autoPlay muted loop>
                        <source src="img/white-board.mp4" type="video/mp4" />
                        <source src="img/white-board.webm" type="video/webm" />
                        Your browser is not supported!
                    </video>
                </div>
                <div className='home-page__form'>
                    
                    <h1 className='home-page__heading'>Welcome to <img src='img/addux-logo.png'/>!</h1>
                    <h1 className='home-page__sub-heading'>Where we help you map the future of your business!</h1>

                    {this.state.error && <Alert color='danger'>{this.state.error}</Alert>}
                    <form className='form' onSubmit={this.onSubmit}>
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
                        <button className='btn btn--full-width'>Sign up!</button>
                    </form>
                    <Link className='app-link' to='/login'>Already have an account?</Link>
                </div>
            </div>
        );
    };
}


const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user))
});

export default connect(undefined, mapDispatchToProps)(SignUpPage);