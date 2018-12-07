import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import StripePanel from './StripePanel';
import SubscriptionPanel from './SubscriptionPanel';

import {history} from './../routers/AppRouter';

import {updateUser, logout} from './../actions/auth';

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            stripeData: 'WAITING',
            formError: '',
            formStatus: '',
            firstName: props.auth.firstName,
            lastName: props.auth.lastName,
            company: props.auth.company,
            email: props.auth.email,
            password: '',
            customer: {}
        }
    }

    firstNameChange = (e) => {
        const firstName = e.target.value;

        this.setState(() => ({firstName}));
    }

    lastNameChange = (e) => {
        const lastName = e.target.value;

        this.setState(() => ({lastName}));
    }
    
    companyChange = (e) => {
        const company = e.target.value;

        this.setState(() => ({company}));
    }
    
    emailChange = (e) => {
        const email = e.target.value;

        this.setState(() => ({email}));
    }
    
    passwordChange = (e) => {
        const password = e.target.value;

        this.setState(() => ({password}));
    }

    closePage = () => {
        
        this.setState(() => ({
            formStatus:'',
            formError:''
        }));
        
        this.props.changeUserActive();
    }

    updateCustomer = (customer) => {
        this.setState(() => ({
            customer
        }));
    }

    onUserInfoSubmit = (e) => {
        e.preventDefault();

        const updates = {};
        
        if(this.state.email && this.state.firstName && this.state.lastName){

            updates.email = this.state.email;
            updates.firstName = this.state.firstName;
            updates.lastName = this.state.lastName;

            if(this.state.company){
                updates.company = this.state.company;
            }

            if(this.state.password){
                updates.password = this.state.password;
            }

            axios.patch(
                `/users/${this.props.auth._id}`,
                updates,
                {
                    headers: {
                        'x-auth': this.props.auth.token
                    }
                }
            )
            .then((response) => {
                this.setState(() => ({
                    formError: '',
                    formStatus: 'User updated succesfully!'
                }));
                this.props.updateUser(updates);
            })
            .catch((e) => {

                if(e.response.status === 401){
                    console.log('Token has expired');
                    this.props.logout();
                    history.push('/login');
                }
                else{
                    this.setState(() => ({
                        formStatus: '',
                        formError: e.message
                    }));
                }
            });

        }
        else{
            this.setState(() => ({formError: 'First Name, Last Name, and Email are required', formStatus: ''}));
        }

    }

    onCancelClick = () => {
        axios.delete(
            '/users/subscribe',
            {
                headers:{
                    'x-auth': this.props.auth.token
                }
            }
        )
        .then((response) => {
            console.log(response);

            this.setState(() => ({
                customer:response.data
            }));
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onContinueClick = () => {
        axios.patch(
            '/users/subscribe',
            {},
            {
                headers:{
                    'x-auth':this.props.auth.token
                }
            }
        )
        .then((response) => {
            console.log(response);

            this.setState(() => ({
                customer:response.data
            }));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {

        if(!this.props.auth.isAdmin){
            axios.get(
                '/users/me/customer',
                {
                    headers: {
                        'x-auth': this.props.auth.token
                    }
                }
            )
            .then((response) => {
                this.setState(() => ({
                    stripeData:'RECEIVED',
                    customer: response.data
                }));
            })
            .catch((e) => {
    
            })
        }
    }

    render() {
        return (         
            
                <div className='user-panel'>
                    <div className='user-panel__info'>
                        <h1 className='primary-heading'>User Info</h1>
                        {this.state.formError && <p className='alert alert--failure'>{this.state.formError}</p>}
                        {this.state.formStatus && <p  className='alert alert--success'>{this.state.formStatus}</p>}
                        <form className='form' onSubmit={this.onUserInfoSubmit}>
                            <div className='form__form-group'>
                                <label htmlFor='firstName'>First Name</label>
                                <input className='form__input' type='text' id='firstName' value={this.state.firstName} onChange={this.firstNameChange} />
                            </div>
                            <div className='form__form-group'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input className='form__input' type='text' id='lastName' value={this.state.lastName} onChange={this.lastNameChange} />
                            </div>
                            <div className='form__form-group'>
                                <label htmlFor='company'>Company</label>
                                <input className='form__input' type='text' id='company' placeholder='Optional' value={this.state.company} onChange={this.companyChange} />
                            </div>
                            <div className='form__form-group'>
                                <label htmlFor='email'>Email</label>
                                <input className='form__input' type='email' id='email' value={this.state.email} onChange={this.emailChange} />
                            </div>
                            <div className='form__form-group'>
                                <label htmlFor='password'>Password</label>
                                <input className='form__input' type='password' id='password' placeholder='Enter New Password' value={this.state.password} onChange={this.passwordChange} />
                            </div>
                            <button className='btn btn--full-width'>Update User Info</button>
                        </form>
                    </div>
                    {
                        (!this.props.auth.isAdmin && this.props.auth.masterUser)
                        &&
                        (
                            <div>
                            <div className='user-panel__subscription'>
                                <h2 className='secondary-heading'>Subscription Info</h2>
                                {(this.props.auth.isAdmin ? 
                                    (<p>This is an Admin account.  There is no subscription information to display</p>)
                                    :
                                    (<div>
                                        {this.state.stripeData==='WAITING' && <p>Waiting for subscription info</p>}
                                        {this.state.stripeData==='RECEIVED' && <SubscriptionPanel onPlanClick={this.onPlanClick} onContinueClick={this.onContinueClick} onCancelClick={this.onCancelClick} customer={this.state.customer} token={this.props.auth.token}/>}
                                        {this.state.stripeData==='ERROR' && <p>Unable to receive Data</p>}
                                    </div>)
                                )}
                            </div>
                            <div className='user-panel__payment'>
                                <h2 className='secondary-heading'>Payment Info</h2>
                                {(this.props.auth.isAdmin ? 
                                    (<p>This is an Admin account.  There is no payment information to display</p>)
                                    :
                                    (<div>
                                        {this.state.stripeData==='WAITING' && <p>Waiting for payment info</p>}
                                        {this.state.stripeData==='RECEIVED' && <StripePanel customer={this.state.customer} token={this.props.auth.token} updateCustomer={this.updateCustomer}/>}
                                        {this.state.stripeData==='ERROR' && <p>Unable to receive Data</p>}
                                    </div>)
                                )}
                            </div>
                            </div>
                        )
                    }
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (updates) => dispatch(updateUser(updates)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);