import {applyMiddleware, compose, createStore} from 'redux';

import {profileReducer} from "./reducers/profile";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(profileReducer, composeEnhancers(applyMiddleware()));

export default store
