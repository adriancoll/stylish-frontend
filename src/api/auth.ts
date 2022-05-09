import axios from 'axios'
import { LoginResponse } from '../interfaces/user.interface'

const loginRoute = '/auth/login'

const loginAttempt = async (email: string, password: string) => {
  const res = await axios.post<BaseResponse<LoginResponse>>(loginRoute, {
    email,
    password,
  })
  return res.data
}

export { loginAttempt }
