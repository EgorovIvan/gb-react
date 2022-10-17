import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const apiThunk = createAsyncThunk(
	'apiThunk',
	async function () {
		const res = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
		const result = await res.data.Valute
		await setTimeout(() => {
		
		}, 5000)
		return result
	}
)

const exchangeSlice = createSlice({
	name: 'exchange',
	initialState: {
		currency: [],
		isLoading: false,
		err: null
	},
	reducers: {},
	extraReducers: {
		[apiThunk.pending]: (state, action) => {
			state.isLoading = true
			state.err = null
		},
		[apiThunk.fulfilled]: (state, action) => {
			state.currency = Object.values(action.payload)
			state.isLoading = false
			state.err = null
		},
		[apiThunk.pending]: (state, action) => {
			state.err = true
		}
	}
})

export const {} = exchangeSlice.actions

export const exchangeReducers = exchangeSlice.reducer