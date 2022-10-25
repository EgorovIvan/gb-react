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
		isError: null
	},
	reducers: {},
	extraReducers: {
		[apiThunk.pending]: (state) => {
			state.isLoading = true
			state.isError = null
		},
		[apiThunk.fulfilled]: (state, action) => {
			state.currency = Object.values(action.payload)
			state.isLoading = false
			state.isError = null
		},
		[apiThunk.rejected]: (state, action) => {
			state.isError = true
		}
	}
})


export const exchangeReducers = exchangeSlice.reducer
export default exchangeSlice.reducer