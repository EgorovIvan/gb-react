import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { auth } from '../services/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

export const createUserThunk = createAsyncThunk(
	'addUserThunk',
	async ({email, pass}) => {
		try{
			const userCredit = await createUserWithEmailAndPassword(auth, email, pass)
			console.log(userCredit.user)
			const userData =  {
				email:userCredit.user.email,
				id:userCredit.user.uid,
				token:userCredit.user.accessToken
			}
			return userData
		}catch(e){
			console.log(e.code, e.message)
		}
	}
)

export const loginThunk = createAsyncThunk(
	'loginThunk',
	async ({email, pass}) => {
		try{
			const userCredit = await signInWithEmailAndPassword(auth, email, pass)
			const userData =  {
				email:userCredit.user.email,
				id:userCredit.user.uid,
				token:userCredit.user.accessToken
			}
			return userData
		}catch(e){
			console.log(e.code, e.message)
		}
	}
)

const userSlice = createSlice({
	name:'user',
	initialState:{
		email:null,
		id:null,
		token:null,
	},
	reducers:{
		addUser: (state,action) => {
			return state = action.payload
		},
		removeUser: (state) => {
			state.email = null
			state.id = null
			state.token = null
		}
	},
	extraReducers:{
		[createUserThunk.fulfilled]: (state,action) => {
			state.email = action.payload.email
			state.id = action.payload.id
			state.token = action.payload.token
		},
		[loginThunk.fulfilled]: (state,action) => {
			state.email = action.payload.email
			state.id = action.payload.id
			state.token = action.payload.token
		}
	}
})

export const {addUser, removeUser} = userSlice.actions
export const userReducers = userSlice.reducer