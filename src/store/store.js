import {chatReducers} from "../slice/chats";
import {profileReducers} from '../slice/profile'
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = getDefaultMiddleware({
	immutableCheck: false,
	serializableCheck: false,
	thunk: true,
});

const reducers = combineReducers({
	chatReducers: chatReducers,
	profileReducers: profileReducers
})

export const store = configureStore({
	reducer: persistReducer(
		{
			key: 'root',
			storage
		},
		reducers
	),
	middleware,
	devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store);
