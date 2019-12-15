import { USER_LOG_IN, USER_LOG_OUT, NOTIFICATION_SHOW } from './types'

export const logIn = user => {
   return {
      type: USER_LOG_IN,
      user
   }
}

export const logOut = () => {
   return {
      type: USER_LOG_OUT
   }
}

export const showNotification = (type, message, title = 'Thông báo') => {
   return {
      type: NOTIFICATION_SHOW,
      notification: {
         type,
         message,
         title
      }
   }
}
