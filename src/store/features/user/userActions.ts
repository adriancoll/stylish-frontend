import { store } from '../..'
import { loginAttempt } from '../../../api/auth'
import { storeData } from '../../../utils/asyncStorage'
import { loginUser } from './userSlice'

export const login = async (email: string, password: string) => {
  try {
    const data = await loginAttempt(email, password)

    if (data.error) {
      console.error(data.message, data.errors)
      throw new Error(data.message)
    }

    storeData('token', data.results.token);
    store.dispatch(loginUser(data.results))
  } catch (error) {
    console.error(error)
  }
}
