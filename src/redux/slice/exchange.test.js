import { exchangeReducers, apiThunk} from './exchange'
import {expect, describe, it} from '@jest/globals'

describe('exchangeSlice', () => {
    describe('extraReducers', () => {
        const initialState =   {
            currency: [],isLoading: true, isError: null
        }
        it('should set isLoading true while action is pending', () => {
            const action = {type: apiThunk.pending.type}
            const state = exchangeReducers(initialState, action)
            expect(state).toEqual({currency: [], isLoading: true, isError: null})
        })
        it('sets currency when apiThunk is fulfilled', () => {
            const action = { type: apiThunk.fulfilled.type, payload: {name: 'John', id: 24}}
            const state = exchangeReducers(initialState, action)
            expect(state).toEqual({currency:["John", 24], isLoading: false, isError: null})
        })

        it('sets isError false when apiThunk is rejected', () => {
            const action = { type: apiThunk.rejected.type}
            const state = exchangeReducers(initialState, action)
            expect(state).toEqual({ currency: [], isLoading: true, isError: true})
        })
    })
})
