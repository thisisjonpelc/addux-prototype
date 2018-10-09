import React from "react";
import {connect} from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {StripeProvider} from 'react-stripe-elements';

import AdduxApp from "../components/AdduxApp";
import AdduxWrapper from "../components/AdduxWrapper";
import LoginPage from "../components/LoginPage";
import SubscribePage from './../components/SubscribePage';
import ResetRequestPage from './../components/ResetRequestPage';
import ResetPasswordPage from './../components/ResetPasswordPage';
import ShareAddux from './../components/ShareAddux';

import PublicRoute from "./PublicRoute";
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

class AppRouter extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            checkAuth: false
        }
    }
    
    // componentDidMount(){
    //     if(!this.state.checkAuth){

    //         if(localStorage.getItem('AUTH_TOKEN')){
    //             console.log('There is an authorization token in local storage');
    //         }



    //     }
    // }

    render(){
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

export default AppRouter;