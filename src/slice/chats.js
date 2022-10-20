import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {db} from "../services/firebase";
import {child, get, ref, set} from "firebase/database";

export const getChatsThunk = createAsyncThunk(
    'getChatsThunk',
    async function () {
        try {
            const dbRef = ref(db)
            const res = await get(child(dbRef, `chats`))
            if (res.exists()) {
                const chatsData = res.val()
                return chatsData
            } else {
                console.log("No data available")
            }
        } catch (e) {
            console.log(e)
        }
    }
)

export const addChatThunk = createAsyncThunk(
	'addChatsThunk',
	async function (chat) {
		try{
			const res = await set(ref(db, `chats/` + `${chat.id}`), {
				id: chat.id,
				name: chat.name,
				messages: []
			})
			return res
		} catch(e){
			console.log(e)
		}
	}
)

export const addMessageThunk = createAsyncThunk(
    'addMessageThunk',
    async function (chatId, message, messageId) {
        try{
            const res = await set(ref(db, `chats/` + `${chatId}` + `/messages/` + `${messageId}`), {
                author: message.author,
                text: message.text
            })
            return res
        } catch(e){
            console.log(e)
        }
    }
)

const chatSlice = createSlice({
    name: 'chats',
    initialState: [],
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
    },
    extraReducers: {
        [getChatsThunk.fulfilled]: (state, action) => {
            return state = action.payload
        },
        [addChatThunk.fulfilled]: (state, action) => {
            return state = action.payload
        },
        [addMessageThunk.fulfilled]: (state, action) => {
            return state = action.payload
        }
    }
})

export const {addChat, removeChat, addMessage} = chatSlice.actions

export const chatReducers = chatSlice.reducer