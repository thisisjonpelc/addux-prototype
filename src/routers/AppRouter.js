import React from "react";
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import AdduxApp from "../components/AdduxApp";
import AdduxWrapper from "../components/AdduxWrapper";
import LoginPage from "../components/LoginPage";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const redirectJsx = (
    <Redirect to="/" />
);

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" component={AdduxWrapper} exact={true} />
            <PublicRoute path="/login" component={LoginPage} />
            <Redirect to="/" />
        </Switch>
    </Router>
);

export default AppRouter;