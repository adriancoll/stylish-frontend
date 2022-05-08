import { store } from '@store'
import { API_AUTH } from 'api/auth'
import { loginUser } from './userSlice'

export const login = async (email: string, password: string) => {
  try {
    const data = await API_AUTH.login(email, password)

    if (data.error) {
      console.error(data.message, data.errors)
      throw new Error(data.message)
    }

    store.dispatch(loginUser(data.results))
  } catch (error) {
    console.error(error)
  }
}
