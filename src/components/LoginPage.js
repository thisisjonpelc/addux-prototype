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

        console.log("SUBMITTED LOGIN!");

        e.preventDefault();

        if(!this.state.email || !this.state.password){
            this.setState(() => ({error: "Please enter your email and password!"}));
        }
        else{
            console.log("SENDING POST REQUEST");
            axios.post('/users/login', {
                email:this.state.email,
                password:this.state.password
            })
            .then((response) => {
                console.log("LOGIN SUCCESS!");
                console.log(response);
                this.props.login(
                    {
                        ...response.data,
                        token: response.headers['x-auth']
                    }
                );
                history.push("/");
            })
            .catch((error) => {
                console.log("LOGIN FAIL!");
                console.log(error);
                
                this.setState(() => ({error: "Could not find a user with those credentials"}));
            
            });
        }
    }

    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email"
                        autoFocus
                        value={this.state.email}
                        onChange = {this.onEmailChange}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange = {this.onPasswordChange}
                    />
                    <button>Log in!</button>
                </form>
                <Link to='/'>Don't have an account?</Link>
                <Link to='/reset'>Forgot your password?</Link>
            </div>
        );
    }
} 

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    updateToken: (token) => dispatch(updateToken(token))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);