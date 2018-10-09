import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import StripePanel from './StripePanel';

import {updateUser} from './../actions/auth';

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        //console.log(props);
        //console.log(props.walkthrough);

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

        console.log('Submiting User Info');

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

            console.log('updates:', updates);

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
                console.log(response);
                this.setState(() => ({
                    formError: '',
                    formStatus: 'User updated succesfully!'
                }));
                this.props.updateUser(updates);
            })
            .catch((e) => {
                this.setState(() => ({
                    formStatus: '',
                    formError: e.message
                }));
            });

        }
        else{
            this.setState(() => ({formError: 'First Name, Last Name, and Email are required'}));
        }

    }

    componentDidMount() {

        axios.get(
            '/users/me/customer',
            {
                headers: {
                    'x-auth': this.props.auth.token
                }
            }
        )
        .then((response) => {
            console.log(response);
            this.setState(() => ({
                stripeData:'RECEIVED',
                customer: response.data
            }));
        })
        .catch((e) => {
            console.log(e);
        })
    }

    render() {
        return (         
            <div className={`app-overlay ${this.props.hidden && 'hidden'}`}>
                <svg onClick={this.closePage} className='app-overlay__close'>
                    <use href='img/sprite.svg#icon-close'></use>    
                </svg> 
                
                <div>
                    <h1>User Info</h1>
                    {this.state.formError && <p>{this.state.formError}</p>}
                    {this.state.formStatus && <p>{this.state.formStatus}</p>}
                    <form onSubmit={this.onUserInfoSubmit}>
                        <div>
                            <label htmlFor='firstName'>First Name</label>
                            <input type='text' id='firstName' value={this.state.firstName} onChange={this.firstNameChange} />
                        </div>
                        <div>
                            <label htmlFor='lastName'>Last Name</label>
                            <input type='text' id='lastName' value={this.state.lastName} onChange={this.lastNameChange} />
                        </div>
                        <div>
                            <label htmlFor='company'>Company</label>
                            <input type='text' id='company' placeholder='Optional' value={this.state.company} onChange={this.companyChange} />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' value={this.state.email} onChange={this.emailChange} />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' placeholder='Enter New Password' value={this.state.password} onChange={this.passwordChange} />
                        </div>
                        <button>Update User Info</button>
                    </form>
                </div>
                <div>
                    <h1>Subscription Info</h1>
                    {this.state.stripeData==='WAITING' && <p>Waiting for subscription info</p>}
                    {this.state.stripeData==='RECEIVED' && <StripePanel customer={this.state.customer} token={this.props.auth.token} updateCustomer={this.updateCustomer}/>}
                    {this.state.stripeData==='ERROR' && <p>Unable to receive Data</p>}
                </div>
                 
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (updates) => dispatch(updateUser(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);