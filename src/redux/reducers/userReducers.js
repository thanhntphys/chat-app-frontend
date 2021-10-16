import * as type from '../types'

const initialState = {
    isLoggedIn: false,
    name: '',
    room: '',
}

export const userLoginReducers = (state = initialState, action) => {
    switch (action.type) {
        case type.USERS_LOGGIN:
            return {
                ...state,
                isLoggedIn: true,
                name: action.payload.name,
                room: action.payload.room
            }
        case type.USERS_LOGGOUT:
            return {
                ...state,
                isLoggedIn: false,
                name: '',
                room: ''
            }
        default:
            return state;
    }
}