import { store } from '@store'
import { API_AUTH } from 'api/auth'
import { setUser } from './userSlice'

export const login = async (email: string, password: string) => {
  try {
    const data = await API_AUTH.login(email, password)

    if (data.error) {
      console.error(data.message, data.errors)
      throw new Error(data.message)
    }

    let user = data.results.user

    store.dispatch(setUser(user))
  } catch (error) {
    console.error(error)
  }
}
