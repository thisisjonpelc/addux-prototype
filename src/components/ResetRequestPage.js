import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ResetRequestPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            error: "",
            result:"",
        }
    }
    
    onEmailChange = (e) => {
        const email = e.target.value;

        this.setState(() => ({email}));
    }

    onEmailSubmit = (e) => {
        e.preventDefault();

        if(!this.state.email){
            this.setState(() => ({result:"", error: "Please enter your e-mail address"}));
        }
        else{
            axios.post('/users/reset', {email: this.state.email})
            .then((response) => {
                this.setState(() => ({error: "", result: `Password Reset email sent to ${this.state.email}`}))
            })
            .catch((e) => {
                if(e.response.status === 404){
                    this.setState(() => ({result:"", error: "Could not find a user with that e-mail"}));
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
            <form onSubmit={this.onEmailSubmit}>  
                <input type='email' placeholder='Enter your email' value={this.state.email} onChange={this.onEmailChange} />
                <button>Request Password Reset</button>
            </form>
            <Link to='/login'>Login to your account</Link>
            <Link to='/'>Don't have an account?</Link>
            </div>
        )
    }

}

export default ResetRequestPage;