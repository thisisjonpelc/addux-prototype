import React from "react";
import {connect} from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {StripeProvider} from 'react-stripe-elements';
import axios from 'axios';

import AdduxApp from "../components/AdduxApp";
import AdduxWrapper from "../components/AdduxWrapper";
import LoginPage from "../components/LoginPage";
import SubscribePage from './../components/SubscribePage';
import ResetRequestPage from './../components/ResetRequestPage';
import ResetPasswordPage from './../components/ResetPasswordPage';
import ShareAddux from './../components/ShareAddux';
import LoadingPage from './../components/LoadingPage';

import {login} from './../actions/auth';

import PublicRoute from "./PublicRoute";
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

class AppRouter extends React.Component {
    constructor(props){
        super(props);

        console.log(props);

        this.state = {
            tokenExists: (typeof localStorage !== 'undefined') && (localStorage.getItem('AUTH_TOKEN') !== null),
            attemptedLogin: false
        }
    }
    
     componentDidMount(){
         if(this.state.tokenExists){

            try{
                const token = localStorage.getItem('AUTH_TOKEN');

                console.log('Found token:', token);

                axios.post('/users/login',
                {},
                {
                    headers: {
                        'x-auth': token
                    }
                }
                ).
                then((response) => {
                    console.log("LOGIN SUCCESS!");
                    console.log(response);
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
                    console.log("LOGIN FAIL!");
                    console.log(err);
                    try{
                        localStorage.removeItem('AUTH_TOKEN');
                    }
                    catch(error){
                        console.log('Could not remove expired token');
                    }
                    this.setState(() => {
                        return {
                            attemptedLogin:true
                        }
                    });
                });
            }
            catch(err){
                console.log('Could not retrieve token.', err);
            }
         }
         else{
             console.log('No token stored locally');
         }
    }

    render(){

        console.log('Token exists?', this.state.tokenExists);

        if(this.state.tokenExists && !this.state.attemptedLogin){
                return (
                    <LoadingPage />
                );
        }
        else{
            return (
                <StripeProvider apiKey='pk_test_qgZDzGYlsNzbuloTnIPK3KEc'>
                    <Router history={history}>
                        <Switch>
                            <Route path="/" component={AdduxWrapper} exact={true} />
                            <Route path='/share/:id' render={(props) => <ShareAddux {...props} showComments={false} />} />
                            <Route path='/comment/:id' render={(props) => <ShareAddux {...props} showComments={true} />} />
                            <PrivateRoute path="/subscribe" component={SubscribePage} />
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

export default connect(null, mapDispatchToProps)(AppRouter);