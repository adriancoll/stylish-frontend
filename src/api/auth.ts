import axios from 'axios'
import { LoginResponse, RefreshTokenResponse } from '../interfaces/user.interface'
import { storeData } from '../utils/asyncStorage'

const loginRoute = '/auth/login'
const checkTokenRoute = '/auth/refresh'

const loginAttempt = async (email: string, password: string) => {
  const res = await axios.post<BaseResponse<LoginResponse>>(loginRoute, {
    email,
    password,
  })
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
    return false
  }
}

export { loginAttempt, refreshToken }
