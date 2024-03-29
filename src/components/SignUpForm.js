import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

import { login } from "./../actions/auth";
import { history } from "./../routers/AppRouter";
import {validatePassword} from './../utils/utils';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            password: '',
            passwordConfirm: '',
            passwordValidationError: '',
            checked: false,
            error: '',
            waiting: false
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

    onPasswordConfirmChange = (e) => {
        const passwordConfirm = e.target.value;
        this.setState(() => ({passwordConfirm}));
    }

    onPasswordBlur = (e) => {
        const password = e.target.value;

        if(!validatePassword(password)){
            this.setState(() => ({
                passwordValidationError: 'Passwords must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number, and special character.'
            }));
        }
        else{
            if(this.state.passwordValidationError){
                this.setState(() => ({
                    passwordValidationError: ''
                }));
            }
        }
    }

    onCheckChange = (e) => {
        this.setState((prevState) => ({checked: !prevState.checked}));
    }

    onSubmit = (e) => {

        e.preventDefault();

        if (!this.state.email || !this.state.password || !this.state.firstName || !this.state.lastName || !this.state.passwordConfirm) {
            this.setState(() => ({ error: "Please complete all required fields!" }));
        }
        else if(this.state.password !== this.state.passwordConfirm){
            this.setState(() => ({error: 'Passwords do not match!'}));
        }
        else if(this.state.passwordValidationError){
            this.setState(() => ({error: 'Stronger password required!'}))
        }
        else if(!this.state.checked){
            this.setState(() => ({error: 'You must agree to the Terms and Conditions and Privacy Policy!'}));
        }
        else {

            this.setState({
                error: '',
                waiting: true
            });


            this.props.stripe.createToken()
                .then((token) => {

                    if (token.error) {
                        this.setState(() => ({ error: token.error.message, waiting: false }));
                    }
                    else {
                        
                        let planId;

                        switch(this.props.plan){

                            case 'COACHING-Q':
                                planId='COACHING_QUARTERLY'
                                break;    
                            case 'COACHING-A':
                                planId='COACHING_ANNUAL';
                                break;
                            case 'INDIVIDUAL':
                                planId='INDIVIDUAL_LAUNCH';
                                break;
                            case 'ENTERPRISE':
                                planId='ENTERPRISE_LAUNCH';
                                break;
                            case 'IC':
                                planId='INDIVIDUAL_COACHING'
                                break;
                            case 'CORP':
                                planId='CORPORATE_COACHING';
                                break;
                            default:
                                planId=this.props.plan;
                        }

                        axios.post('/users',
                            {
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                company: this.state.company,
                                password: this.state.password,
                                email: this.state.email,
                                token: token.token.id,
                                plan: planId
                            })
                            .then((response) => {
                                this.props.login({
                                    ...response.data,
                                    token: response.headers['x-auth']
                                });
                                history.push('/');
                            })
                            .catch((err) => {
                                //this.setState(() => ())
                                this.setState(() => ({ error: 'That email address is already in use.', waiting: false }));
                            });
                    }
                })
                .catch((err) => {
                    this.setState(() => ({ error: 'Sorry! We couldn\'t sign you up right now.  Please try again later.', waiting: false }));
                });
        }
    }

    render() {

        let planName = '';

        switch(this.props.plan){

            case 'COACHING-Q':
                planName='COACHING QUARTERLY'
                break;    
            case 'COACHING-A':
                planName='COACHING ANNUAL';
                break;
            case 'INDIVIDUAL':
                planName='INDIVIDUAL';
                break;
            case 'ENTERPRISE':
                planName='ENTERPRISE';
                break;
            case 'IC':
                planName='INDVIDUAL COACHING'
                break;
            case 'CORP':
                planName='CORPORATE COACHING'
                break;
            default:
                planName=this.props.plan;
        }


        return (
            <form className='signup-page__form form' onSubmit={this.onSubmit}>
                {
                    (this.props.plan ==='INDIVIDUAL' || this.props.plan === 'ENTERPRISE')
                    ?
                    (<Link className='signup-page__back' to='/offer/eg187'>Go Back</Link>)
                    :
                    (<a className='signup-page__back' href='https://www.adduxonline.com/addux-online'>Go Back</a>)
                }
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
                        onBlur={this.onPasswordBlur}
                    />
                </div>
                <div className='form__form-group'>
                    <input
                        className='form__input'
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.passwordConfirm}
                        onChange={this.onPasswordConfirmChange}
                    />
                </div>
                {this.state.passwordValidationError && <p className='alert alert--failure'>{this.state.passwordValidationError}</p>}
                <div className='form__form-group'>
                    <CardElement className='form__input' />
                </div>
                <div className='signup-page__description'>
                    <p>You have selected the {planName} plan at:</p>
                    {this.props.plan === 'INDIVIDUAL' && (<p className='signup-page__price signup-page__price--red'><span className='signup-page__price--strike'>$397</span>$297 per year</p>)}
                    {this.props.plan === 'ENTERPRISE' && (<p className='signup-page__price signup-page__price--red'><span className='signup-page__price--strike'>$2997</span>$1997 per year</p>)}
                    {this.props.plan === 'COACHING-A' && (<p className='signup-page__price'>$2997 per year</p>)}
                    {this.props.plan === 'COACHING-Q' && (<p className='signup-page__price'>$350 per month billed quarterly</p>)}
                    {this.props.plan === 'IC' && (<p className='signup-page__price'>$297 per month</p>)}
                    {this.props.plan === 'CORP' && (<p className='signup-page__price'>$397 per month</p>)}
                </div>
                <div className='signup-page__agreement'>
                    <input  className='signup-page__checkbox' onChange={this.onCheckChange} type='checkbox' checked={this.state.checked} />
                    <label>
                        I agree to the addux Online <a className='app-link app-link--bold' href='https://www.cypressresources.com/terms' target='_blank'>Terms and Conditions</a> and <a className='app-link app-link--bold' href='https://www.cypressresources.com/privacy-policy' target='_blank'>Privacy Policy</a>
                    </label>
                </div>
                {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                <button className='btn btn--full-width' disabled={this.state.waiting}>{this.state.waiting ? (<img className='btn__loading' src='/img/loading.gif' />) : ('Sign Up')}</button>
                <Link className='app-link' to='/'>Already have an account?</Link>
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