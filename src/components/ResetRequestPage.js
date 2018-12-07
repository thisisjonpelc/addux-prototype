import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ResetRequestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            error: "",
            result: "",
        }
    }

    onEmailChange = (e) => {
        const email = e.target.value;

        this.setState(() => ({ email }));
    }

    onEmailSubmit = (e) => {
        e.preventDefault();

        if (!this.state.email) {
            this.setState(() => ({ result: "", error: "Please enter your e-mail address" }));
        }
        else {
            axios.post('/users/reset', { email: this.state.email })
                .then((response) => {
                    this.setState(() => ({ error: "", result: `Password Reset email sent to ${this.state.email}` }))
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.setState(() => ({ result: "", error: "Could not find a user with that e-mail" }));
                    }
                    else {
                        this.setState(() => ({ result: "", error: "Unable to reset password at this time" }));
                    }
                });
        }
    }

    render() {

        return (
            <div className='center-form-page'>
                <div className='center-form-page__form'>
                    <img className='center-form-page__logo' src='/img/addux-logo.png' />
                    {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                    {this.state.result && <p className='alert alert--success'>{this.state.result}</p>}
                    <form className='form' onSubmit={this.onEmailSubmit}>
                        <div className='form__form-group'>
                            <input 
                                className='form__input'
                                type='email' 
                                placeholder='Enter your email' 
                                value={this.state.email} 
                                onChange={this.onEmailChange} 
                            />
                        </div>
                        <button className='btn btn--full-width'>Request Password Reset</button>
                    </form>
                    <Link className='app-link center-form-page__link' to='/'>Login to your account</Link>
                    <p className='center-form-page__or'> or </p>
                    <Link className='app-link center-form-page__link' to='/offer/2018'>Don't have an account?</Link>
                </div>
            </div>
        )
    }

}

export default ResetRequestPage;