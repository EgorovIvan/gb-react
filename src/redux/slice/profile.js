import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {child, get, ref, set} from "firebase/database"
import {db} from "../../services/firebase"

export const getProfileDataThunk = createAsyncThunk(
    'getProfileDataThunk',
    async ({profileId}) => {
        try {
            const dbRef = ref(db)
            const res = await get(child(dbRef, `profiles/` + profileId + '/userData'))
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

export const setProfileDataThunk = createAsyncThunk(
    'setProfileDataThunk',
    async ({profileId, profileData}) => {
        try {
            const res = await set(ref(db, 'profiles/' + profileId + '/userData'), {
                name: profileData.name,
                email: profileData.email,
                phoneNumber: profileData.phoneNumber
            })
            return res
        } catch (e) {
            console.log(e.code, e.message)
        }
    }
)

const profileSlice = createSlice({
    name: 'profiles',
    initialState: {
        name: null,
        email: null,
        phoneNumber: null
    },
    reducers: {},
    extraReducers: {
        [getProfileDataThunk.fulfilled]: (state, action) => {
            return state = action.payload
        },
        [setProfileDataThunk.fulfilled]: (state, action) => {
            return state = action.payload
        },
    }
})


export const profileReducers = profileSlice.reducer