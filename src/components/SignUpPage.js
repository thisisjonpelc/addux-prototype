import React from "react";
import {connect} from "react-redux";
import axios from 'axios';

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
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                    />
                    <input 
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                    />
                    <input 
                        type="text"
                        placeholder="Company(Optional)"
                        value={this.state.company}
                        onChange={this.onCompanyChange}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={this.state.email}
                        onChange = {this.onEmailChange}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange = {this.onPasswordChange}
                    />
                    <button>Sign up!</button>
                </form>
            </div>
        );
    };
}


const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user))
});

export default connect(undefined, mapDispatchToProps)(SignUpPage);