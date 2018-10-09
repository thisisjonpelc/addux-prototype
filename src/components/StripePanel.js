import React from 'react';
import {Elements} from 'react-stripe-elements';


import CardPanel from './CardPanel';

const StripePanel = (props) => {
    return (
        <div>
            <Elements>
                <CardPanel card={props.customer.sources.data[0]} token={props.token} updateCustomer={props.updateCustomer}/>
            </Elements>
        </div>
    );
}

export default StripePanel;