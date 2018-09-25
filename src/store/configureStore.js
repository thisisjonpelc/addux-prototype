import {createStore, combineReducers, applyMiddleware, compose} from "redux";

import adduxReducer from "../reducers/addux";
import authReducer from "../reducers/auth";
import dataReducer from "../reducers/data";
import walkthroughReducer from '../reducers/walkthrough';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export default () => {

    const store = createStore(
        combineReducers({
            addux: adduxReducer,
            auth: authReducer,
            data: dataReducer,
            walkthrough: walkthroughReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};