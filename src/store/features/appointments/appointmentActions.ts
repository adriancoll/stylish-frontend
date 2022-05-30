import { isEmpty } from 'lodash'
import { store } from '../..'
import { AppointmentsAPI } from '../../../api/appointments'
import {
  Appointment,
  MyAppointments,
  StoreAppointment,
} from '../../../interfaces/appointment.interfaces'
import {
  addAppointment,
  setMyAppointments,
  setNextAppointment,
} from './appointmentSlice'

export const getMyAppointments = () => {
  return new Promise<MyAppointments>(async (resolve, reject) => {
    try {
      const data = await AppointmentsAPI.getAllMyAppointments()

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      store.dispatch(setMyAppointments(data.results.appointments))
      resolve(data.results.appointments)
    } catch (error) {
      reject(error)
    }
  })
}

export const getNextAppointment = () => {
  return new Promise<Appointment>(async (resolve, reject) => {
    try {
      const data = await AppointmentsAPI.getNextAppointment()

      if (data.code !== 200) {
        store.dispatch(setNextAppointment({} as Appointment))
        return reject(data.message)
      }

      store.dispatch(setNextAppointment(data?.results?.appointment))
      resolve(data.results.appointment)
    } catch (error) {
      reject(error)
    }
  })
}

export const createAppointment = (payload: StoreAppointment) => {
  return new Promise<Appointment>(async (resolve, reject) => {
    try {
      const data = await AppointmentsAPI.storeAppointment(payload)
      store.dispatch(addAppointment(data?.results?.appointment))
      getNextAppointment()
      resolve(data?.results?.appointment)
    } catch (error) {
      reject(error)
    }
  })
}

export const cancelAppointment = (uid: string) => {
  return new Promise<Appointment>(async (resolve, reject) => {
    try {
      const data = await AppointmentsAPI.cancelAppointment(uid)
      await getNextAppointment()
      resolve(data?.results?.appointment)
    } catch (error) {
      reject(error)
    }
  })
}
