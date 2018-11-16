import React from 'react';
import moment from 'moment';

const SubscriptionPanel = (props) => {

    console.log(props.customer);

    const cancelling = props.customer.subscriptions.data[0].cancel_at_period_end;
    const monthly = props.customer.subscriptions.data[0].items.data[0].plan.nickname.indexOf('Monthly') !== -1;

    const onMonthlyClick = () => {
        props.onPlanClick('MONTHLY');
    }

    const onAnnualClick = () => {
        props.onPlanClick('ANNUAL');
    }

    return (
        <p>
            {`Subscription: ${props.customer.subscriptions.data[0].items.data[0].plan.nickname} ${(cancelling ? 'ending':'renewing')} on ${moment.unix(props.customer.subscriptions.data[0].current_period_end).format('MMM Do')}`} 
            {(cancelling || !monthly) && <button onClick={onMonthlyClick}>Switch to Monthly Subscription</button>}
            {(cancelling || monthly) && <button onClick={onAnnualClick}>Switch to Annual Subscription</button>}
            {!cancelling && <button onClick={props.onCancelClick}>Cancel Subscription</button>}
        </p>
    );
}

export default SubscriptionPanel;
