import { NOTIFICATION_SHOW } from '../actions/types'

let initialState = {}

export default function(state = initialState, action) {
   switch (action.type) {
      case NOTIFICATION_SHOW: {
         const newState = action.notification
         return newState
      }

      default: {
         return state
      }
   }
}
