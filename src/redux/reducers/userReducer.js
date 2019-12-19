import { USER_LOG_IN, USER_LOG_OUT } from '../actions/types'
import { isEmptyObj } from '../../utils'

let initialState = {}

export default function(state = initialState, action) {
   switch (action.type) {
      case USER_LOG_IN: {
         const newState = action.user
         return newState
      }

      case USER_LOG_OUT: {
         const newState = {}
         return newState
      }

      default: {
         return state
      }
   }
}
