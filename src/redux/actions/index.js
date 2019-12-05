import { USER_LOG_IN, USER_LOG_OUT } from './types'

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
