import React from 'react';
import moment from 'moment';

const SubscriptionPanel = (props) => {

    const cancelling = props.customer.subscriptions.data[0].cancel_at_period_end;

    return (
        <div className='card-panel'>
            <p className='card-panel__text'>
                <span className='bold'>Your Subscription:</span>

                {` ${props.customer.subscriptions.data[0].items.data[0].plan.nickname} ${(cancelling ? 'ending' : 'renewing')} on ${moment.unix(props.customer.subscriptions.data[0].current_period_end).format('MMM Do YYYY')}`}
            </p>
            {!cancelling && <button className='btn btn--small btn--full-width btn--cancel' onClick={props.onCancelClick}>Cancel Subscription</button>}
            {cancelling && <button className='btn btn--small btn--full-width' onClick={props.onContinueClick}>Continue your subscription</button>}
        </div>
    );
}

export default SubscriptionPanel;
