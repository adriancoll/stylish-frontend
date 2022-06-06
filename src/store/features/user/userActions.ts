import { store } from '../..'
import { loginAttempt, registerUserAttempt } from '../../../api/auth'
import { editUserAttempt } from '../../../api/user'
import {
  Appointment,
  MyAppointments,
} from '../../../interfaces/appointment.interfaces'
import {
  RegisterUserPayload,
  User,
} from '../../../interfaces/user.interface'
import {
  clearAllData,
  deleteData,
  storeData,
} from '../../../utils/asyncStorage'
import { setMyAppointments } from '../appointments/appointmentSlice'
import { setMyBusiness } from '../business/businessSlice'
import { loginUser, setUser } from './userSlice'

export const login = (email: string, password: string) => {
  return new Promise<User>(async (resolve, reject) => {
    try {
      const data = await loginAttempt(email, password)

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      storeData('token', data.results.token)

      if (data.results.business) {
        store.dispatch(setMyBusiness(data.results.business))
      }

      store.dispatch(loginUser(data.results))
      store.dispatch(
        setMyAppointments(data.results.appointments as MyAppointments)
      )

      resolve(data.results.user)
    } catch (error) {
      reject(error)
    }
  })
}

export const registerUser = (payload: RegisterUserPayload) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const data = await registerUserAttempt(payload)
      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      const { email } = data.results.user

      deleteData('token')
      store.dispatch(setUser(data.results.user))
      resolve(email)
    } catch (error) {
      reject(error)
    }
  })
}

export const editUser = (uid: string, payload: FormData) => {
  return new Promise<BaseResponse<{ user: User }>>(async (resolve, reject) => {
    try {
      const data = await editUserAttempt(uid, payload)
      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      const { user } = data.results
      store.dispatch(setUser(data.results.user))

      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const logout = (payload: RegisterUserPayload) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await clearAllData()
      resolve(true)
    } catch (error) {
      reject(false)
    }
  })
}
