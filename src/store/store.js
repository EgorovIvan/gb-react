import { compose } from 'redux';

import {chatReducers} from "../slice/chats";
import {profileReducers} from '../slice/profile'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
	chatReducers,
	profileReducers
})
const store = configureStore({
	reducer,
	composeEnhancers
})

export default store
