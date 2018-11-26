import React from 'react';
import {connect} from 'react-redux';
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import {subscribe, unsubscribe} from './../actions/subscription';

import CardForm from './CardForm';
import LoadingPage from './LoadingPage';

class SubscribePage extends React.Component{
    constructor(props){
        super(props);

        console.log(props);

        this.state ={
            checkedSubStatus: false,
            subscribed: false
        }
    }

    componentDidMount(){
        console.log('Subscribe Component Mounted.');

        if(this.props.subscribed === null){

            console.log('Sending request for subscription info');

            axios({
                method:'get',
                url:'/users/me',
                headers: {
                    'x-auth': this.props.auth.token
                }
            })
            .then((user) => {
                console.log('Received Response');
                console.log(user);                
                this.props.subscribe();
            })
            .catch((e) => {
                console.log('Error in Response');
                console.log(e);

                if(e.response.status === 402){
                    this.props.unsubscribe();
                }
                else{

                }
            });
        }
    }

    render() {

        //console.log('Rendering Subscription Page');
        //console.log(this.props.subscribed);

        if(this.props.subscribed !== null){

            if(this.props.subscribed){
                return <Redirect to='/' />;
            }
            else{

                if(this.props.auth.masterUser){
                    return (
                        <Elements>
                            <CardForm token={this.props.token}/>
                        </Elements>
                    );
                }
                else{
                    return (
                        <p>The subscription associated with your account has ended.</p>
                    );
                }
            }
        }
        else{
            return <LoadingPage testId={'SubscribePage'}/>
        }

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        subscribed: state.subscription.subscribed
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        subscribe: () => dispatch(subscribe()),
        unsubscribe: () => dispatch(unsubscribe())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribePage);