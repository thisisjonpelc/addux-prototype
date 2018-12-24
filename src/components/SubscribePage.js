import React from 'react';
import {connect} from 'react-redux';
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import {subscribe, unsubscribe} from './../actions/subscription';
import {logout} from './../actions/auth';

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
                    'x-auth': this.props.auth.token
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

                return(
                    <div className='subscribe-page'>
                        <div className='subscribe-page__box'>
                            <h1 className='subscribe-page__primary'>The subscription associated with your account has expired</h1>
                            
                            <button className='btn subscribe-page__logout' onClick={this.props.logout}>Logout</button>
                            
                            <p className='subscribe-page__tertiary'>If you believe this is a mistake or you wish to resubscribe please send an email to: <a className='app-link app-link--bold' href='mailto:contact@adduxonline.com'>contact@adduxonline.com</a></p>
                        </div>
                    </div>
                );

                // if(this.props.auth.masterUser){
                //     return (
                //         <Elements>
                //             <CardForm token={this.props.token}/>
                //         </Elements>
                //     );
                // }
                // else{
                //     return (
                //         <p>The subscription associated with your account has ended.</p>
                //     );
                // }
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
        unsubscribe: () => dispatch(unsubscribe()),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribePage);