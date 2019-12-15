import { combineReducers } from 'redux'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
   user: userReducer,
   notification: notificationReducer
})
