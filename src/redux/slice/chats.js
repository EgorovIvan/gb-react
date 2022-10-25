import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {db} from "../../services/firebase";
import {child, get, ref, set, update } from "firebase/database";

export const getChatsThunk = createAsyncThunk(
    'getChatsThunk',
    async () => {
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
            console.log(e.code, e.message)
        }
    }
)

export const addChatThunk = createAsyncThunk(
	'addChatsThunk',
	async (chat) => {
		try{
			const res = await set(ref(db, `chats/` + chat.id), {
				id: chat.id,
				name: chat.name,
			})
			return res
		} catch(e){
			console.log(e.code, e.message)
		}
	}
)

export const addMessageThunk = createAsyncThunk(
    'addMessageThunk',
    async ({userId, newMessage, messageId}) => {
        try {
            const dbRef = ref(db)
            const updates = {}
            updates['/chats/' + userId + '/messages/' + messageId] = newMessage
            return update(dbRef, updates);
        }catch (e) {
            console.log(e.code, e.message)
        }
    }
)


const chatSlice = createSlice({
    name: 'chats',
    initialState: [],
    reducers: {
        removeChat: (state, action) => {
            return state.filter(item => item.id !== action.payload.id)
        },
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

export const {removeChat} = chatSlice.actions

export const chatReducers = chatSlice.reducer