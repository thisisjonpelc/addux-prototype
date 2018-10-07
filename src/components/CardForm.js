import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';


class CardForm extends React.Component{

    constructor(props){
        super(props);
    }

    onCardSubmit = (e) => {
        console.log('submitting card');

        this.props.stripe.createToken()
        .then((response) => {
            
            console.log(response.token);

            axios.post('/users/subscribe', {
                token:response.token.id
            },
            {
                headers: {
                    'x-auth': this.props.token
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            })
        })
        .catch((e) => {
            console.log(e);
        });
        
    }

    render(){
        return (
            <div>
                <h1>This is the Subscribe Page</h1>
                <div>
                    <CardElement />
                    <button onClick={this.onCardSubmit}>Submit</button>
                </div>
            </div>        
        )
    }

}

export default injectStripe(CardForm);