import {chatReducers} from "../slice/chats";
import {exchangeReducers} from "../slice/exchange";
import {profileReducers} from '../slice/profile'
import {userReducers} from '../slice/user'
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'

const middleware = getDefaultMiddleware({
	immutableCheck: false,
	serializableCheck: false,
	thunk: true,
});

const reducers = combineReducers({
	chatReducers: chatReducers,
	exchangeReducers: exchangeReducers,
	profileReducers: profileReducers,
	userReducers: userReducers
})

export const store = configureStore({
	reducer: reducers,
	middleware,
	devTools: process.env.NODE_ENV !== 'production',
})

