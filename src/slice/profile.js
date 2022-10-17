import {createSlice} from '@reduxjs/toolkit'

const initialState = true

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		change: (state) => {
			return !state
		}
	}
})

export const {change} = profileSlice.actions

export const profileReducers = profileSlice.reducer