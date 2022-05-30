import axios from 'axios'
import { Appointment, MyAppointments } from '../interfaces/appointment.interfaces'
import {
  Business,
  LoginResponse,
  RefreshTokenResponse,
  RegisterUserPayload,
  User,
} from '../interfaces/user.interface'
import { store } from '../store'
import { setMyAppointments } from '../store/features/appointments/appointmentSlice'
import { setMyBusiness } from '../store/features/business/businessSlice'
import { loginUser } from '../store/features/user/userSlice'
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
    const { data } = await axios.post<BaseResponse<RefreshTokenResponse>>(
      checkTokenRoute
    )

    await storeData('token', data.results.token)
    
    store.dispatch(loginUser(data.results))
    store.dispatch(setMyBusiness(data.results?.business as Business))
    store.dispatch(setMyAppointments(data.results?.appointments as MyAppointments))

    return true
  } catch (ex) {
    await clearAllData()
    return false
  }
}

export { loginAttempt, refreshToken, registerUserAttempt }
