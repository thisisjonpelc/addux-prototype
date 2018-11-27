import React from "react";
import {connect} from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {StripeProvider} from 'react-stripe-elements';
import axios from 'axios';

import AdduxWrapper from "../components/AdduxWrapper";
import LoginPage from "../components/LoginPage";
import SubscribePage from './../components/SubscribePage';
import ResetRequestPage from './../components/ResetRequestPage';
import ResetPasswordPage from './../components/ResetPasswordPage';
import LoadingPage from './../components/LoadingPage';
import ShareAddux from './../components/ShareAddux';
import TestPage from './../components/TestPage';

import {login} from './../actions/auth';

import PublicRoute from "./PublicRoute";
import PrivateRoute from './PrivateRoute';
import SignUpPage from "../components/SignUpPage";

export const history = createHistory();

class ProtectedRouter extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tokenExists: (typeof localStorage !== 'undefined') && (localStorage.getItem('AUTH_TOKEN') !== null),
            attemptedLogin: false
        }
    }
    
     componentDidMount(){

        if(window.location.href.indexOf('share') === -1 && window.location.href.indexOf('comment') === -1){

            if(this.state.tokenExists){

                try{
                    const token = localStorage.getItem('AUTH_TOKEN');
    
                    axios.post('/users/login',
                    {},
                    {
                        headers: {
                            'x-auth': token
                        }
                    }
                    ).
                    then((response) => {
                        this.props.login(
                            {
                                ...response.data,
                                token: response.headers['x-auth']
                            }
                        );
                        this.setState(() => {
                            return {
                                attemptedLogin: true
                            }
                        });
                        history.push("/");
                    })
                    .catch((err) => {
                        try{
                            localStorage.removeItem('AUTH_TOKEN');
                        }
                        catch(error){
                            console.log('Unable to remove local token');    
                        }

                        this.setState(() => {
                            return {
                                attemptedLogin:true
                            }
                        });
                    });
                }
                catch(err){
    
                }
             }
        }
        else{
            console.log('Attepting to show share screen');
        }
    }

    render(){

        console.log(window.location.href);
        console.log(window.location.href.indexOf('share'));

        if(this.state.tokenExists && !this.state.attemptedLogin && window.location.href.indexOf('share') === -1 && window.location.href.indexOf('comment') === -1){
                return (
                    <LoadingPage />
                );
        }
        else{
            return (
                <StripeProvider apiKey='pk_live_XdEnT31AcX7OJP8LwWT7Gnot'>
                    <Router history={history}>
                        <Switch>
                            <Route path="/" component={AdduxWrapper} exact={true} />
                            <Route path='/share/:id' render={(props) => <ShareAddux {...props} showComments={false} />} />
                            <Route path='/comment/:id' render={(props) => <ShareAddux {...props} showComments={true} />} />
                            <PrivateRoute path="/subscribe" component={SubscribePage} />
                            <PublicRoute path='/signup/:plan' component={SignUpPage} />
                            <PublicRoute path="/login" component={LoginPage} />
                            <PublicRoute path='/reset' component={ResetRequestPage} exact={true} />
                            <PublicRoute path='/reset/:token' component={ResetPasswordPage} />
                            <Redirect to="/" />
                        </Switch>
                    </Router>
                </StripeProvider>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(ProtectedRouter);