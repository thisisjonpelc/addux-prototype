import React from 'react';
import axios from 'axios';

class ResetPasswordPage extends React.Component{
    constructor(props){
        super(props);

        console.log(props);

        this.state = {
            password: "",
            error: "",
            result:"",
        }
    }

    onPasswordChange = (e) => {
        const password = e.target.value;

        this.setState(() => ({password}));
    }

    onPasswordSubmit = (e) => {
        e.preventDefault();

        if(!this.state.password){
            this.setState(() => ({result:"", error: "Please enter a password"}));
        }
        else{
            axios.post(`/users/reset/${this.props.match.params.token}`, {password: this.state.password})
            .then((response) => {
                this.setState(() => ({error: "", result: `Your password has been reset`}))
            })
            .catch((e) => {
                if(e.response.status === 404){
                    this.setState(() => ({result:"", error: "Your reset time has expired. Please request a new reset email."}));
                }
                else{
                    this.setState(() => ({result:"", error: "Unable to reset password at this time"}));
                }
            });
        }
    }

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                {this.state.result && <p>{this.state.result}</p>}
                <form onSubmit={this.onPasswordSubmit}>  
                    <input type='password' placeholder='Enter Your New Password' value={this.state.email} onChange={this.onPasswordChange} />
                    <button>Change Your Password</button>
                </form>
            </div>
        )
    }
}

export default ResetPasswordPage;