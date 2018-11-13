import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

import {history} from './../routers/AppRouter';

class CardForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            error: '',
        }
    }

    onCardSubmit = (e) => {
        e.preventDefault();

        const subDropdown = e.target.children[0];
        const planValue = subDropdown[subDropdown.selectedIndex].value;

        this.props.stripe.createToken()
        .then((response) => {
            
            if(response.error){
                this.setState(() => ({error: response.error.message}));
            }
            else{

                axios.post('/users/subscribe', {
                    token:response.token.id,
                    plan: planValue
                },
                {
                    headers: {
                        'x-auth': this.props.token
                    }
                })
                .then((response) => {
                    history.push('/');
                    this.setState(() => ({error: ''}));
                })
                .catch((err) => {
                    this.setState(() => ({error: 'Unable to subscribe you at this time'}))
                })
            }
        });
        
    }

    render(){
        return (
            <div>
                <p>This is the description of the monthly plan</p>
                <p>This is the description of the annual plan</p>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onCardSubmit}>
                    <select name='plans'>
                        <option value="MONTHLY">Monthly plan</option>
                        <option value="YEARLY">Yearly plan</option>
                    </select>
                    <CardElement />
                    <button>Submit</button>
                </form>
            </div>        
        )
    }

}

export default injectStripe(CardForm);