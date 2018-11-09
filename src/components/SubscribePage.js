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

        this.state ={
            checkedSubStatus: false,
            subscribed: false
        }
    }

    componentDidMount(){

        if(this.props.subscribed === null){
            axios({
                method:'get',
                url:'/users/me',
                headers: {
                    'x-auth': this.props.token
                }
            })
            .then((user) => {                
                this.props.subscribe();
            })
            .catch((e) => {
                if(e.response.status === 402){
                    this.props.unsubscribe();
                }
                else{

                }
            });
        }
    }

    render() {

        if(this.props.subscribed !== null){

            if(this.props.subscribed){
                return <Redirect to='/' />;
            }
            else{
                return (
                            <Elements>
                                <CardForm token={this.props.token}/>
                            </Elements>
                );
            }
        }
        else{
            return <LoadingPage />
        }

    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
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