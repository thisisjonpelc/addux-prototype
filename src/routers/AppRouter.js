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

import PublicRoute from "./PublicRoute";
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const redirectJsx = (
    <Redirect to="/" />
);

const AppRouter = (props) => {

    // console.log(props);

    // props.dispatch({
    //     type: 'ON_INIT'
    // });
    
    return (
        <StripeProvider apiKey='pk_test_qgZDzGYlsNzbuloTnIPK3KEc'>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={AdduxWrapper} exact={true} />
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

export default AppRouter;