
export const profileReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_DATA_OF_USER' :
            return !state
        default:
            return state;
    }
}