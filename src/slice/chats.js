import {createSlice} from '@reduxjs/toolkit'

const initialState = [
	{
		id: 0,
		name: 'Mark',
		messages: [
			{
				author: 'Mark',
				text: 'Hi'
			},
			{
				author: 'You',
				text: 'Hello'
			}
		]
	},
	{
		id: 1,
		name: 'John',
		messages: [
			{
				author: 'John',
				text: 'What is your name'
			},
			{
				author: 'You',
				text: 'my name is Ivan'
			}
		]
	},
	{
		id: 2,
		name: 'Maria',
		messages: []
	},
	{
		id: 3,
		name: 'Michael',
		messages: []
	}
]

const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		addChat: (state, action) => {
			return [...state, action.payload]
		},
		removeChat: (state, action) => {
			return state.filter(item => item.id !== action.payload.id)
		},
		addMessage: (state, action) => {
			const find = state.find((item) => item.id == action.payload.id)
			find.messages.push(action.payload.data)
			return state
		}
	}
})

export const {addChat, removeChat, addMessage} = chatSlice.actions

export const chatReducers = chatSlice.reducer