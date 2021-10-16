import { userLoginReducers } from './userReducers'

import { combineReducers } from "redux"

const rootReducer = combineReducers({
    users: userLoginReducers
})

export default rootReducer