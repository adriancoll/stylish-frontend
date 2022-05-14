import { store } from '../..'
import { loginAttempt, registerUserAttempt } from '../../../api/auth'
import { RegisterUserPayload } from '../../../interfaces/user.interface'
import { storeData } from '../../../utils/asyncStorage'
import { loginUser } from './userSlice'

export const login = (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await loginAttempt(email, password)

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      storeData('token', data.results.token)
      store.dispatch(loginUser(data.results))
      resolve(data.results.user)
    } catch (error) {
      reject(error)
    }
  })
}


export const registerUser = (payload: RegisterUserPayload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await registerUserAttempt(payload)

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      resolve(data.results.user.email)
    } catch (error) {
      reject(error)
    }
  })
}
