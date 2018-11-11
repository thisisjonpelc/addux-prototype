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
import TestPage from './../components/TestPage';

import ProtectedRouter from './ProtectedRouter';

import {login} from './../actions/auth';

import PublicRoute from "./PublicRoute";
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => {

    return (
        <StripeProvider apiKey='pk_test_qgZDzGYlsNzbuloTnIPK3KEc'>
            <Router history={history}>
                <Switch>
                    <Route path='/share/:id' render={(props) => <ShareAddux {...props} showComments={false} />} />
                    <Route path='/comment/:id' render={(props) => <ShareAddux {...props} showComments={true} />} />
                    <Route path='/' component={ProtectedRouter} />
                </Switch>
            </Router>
        </StripeProvider>
    );

}

export default AppRouter;