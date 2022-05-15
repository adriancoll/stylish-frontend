import axios from 'axios'
import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterUserPayload,
  User,
} from '../interfaces/user.interface'
import { clearAllData, storeData } from '../utils/asyncStorage'

const loginRoute = '/auth/login'
const checkTokenRoute = '/auth/refresh'

const loginAttempt = async (email: string, password: string) => {
  const res = await axios.post<BaseResponse<LoginResponse>>(loginRoute, {
    email,
    password,
  })
  return res.data
}

const registerUserAttempt = async (payload: RegisterUserPayload) => {
  let payload2 = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    phone_number: payload.phone_number,
  }
  console.log(payload)
  const res = await axios.post<BaseResponse<{ user: User }>>('/user', payload2)
  return res.data
}

const refreshToken = async () => {
  try {
    const res = await axios.post<BaseResponse<RefreshTokenResponse>>(
      checkTokenRoute
    )
    await storeData('token', res.data.results.new)
    return true
  } catch (ex) {
    await clearAllData()
    return false
  }
}

export { loginAttempt, refreshToken, registerUserAttempt }
