import React from "react";
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {StripeProvider} from 'react-stripe-elements';

import ShareAddux from './../components/ShareAddux';

import ProtectedRouter from './ProtectedRouter';

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