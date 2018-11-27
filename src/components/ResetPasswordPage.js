import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            error: "",
            result: "",
        }
    }

    onPasswordChange = (e) => {
        const password = e.target.value;

        this.setState(() => ({ password }));
    }

    onPasswordSubmit = (e) => {
        e.preventDefault();

        if (!this.state.password) {
            this.setState(() => ({ result: "", error: "Please enter a password" }));
        }
        else {
            axios.post(`/users/reset/${this.props.match.params.token}`, { password: this.state.password })
                .then((response) => {
                    this.setState(() => ({ error: "", result: `Your password has been reset` }))
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.setState(() => ({ result: "", error: "Your reset token has expired. Please request a new reset email." }));
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
                    <form className='form' onSubmit={this.onPasswordSubmit}>
                        <div className='form__form-group'>
                            <input
                                className='form__input'
                                type='password'
                                placeholder='Enter Your New Password'
                                value={this.state.email}
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        <button className='btn btn--full-width'>Change Your Password</button>

                    </form>
                    <Link className='app-link center-form-page__link' to='/login'>Login to your account</Link>
                    <p className='center-form-page__or'> or </p>
                    <Link className='app-link center-form-page__link' to='/reset'>Request a new password reset</Link>
                </div>
            </div>

        )
    }
}

export default ResetPasswordPage;