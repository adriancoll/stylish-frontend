import { isEmpty } from 'lodash'
import { store } from '../..'
import { AppointmentsAPI } from '../../../api/appointments'
import { Appointment } from '../../../interfaces/appointment.interfaces'
import { setMyAppointments, setNextAppointment } from './appointmentSlice'

export const getAppointments = () => {
  return new Promise<Appointment[]>(async (resolve, reject) => {
    try {
      const data = await AppointmentsAPI.getAllMyAppointments()

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      store.dispatch(setMyAppointments(data.results))
      resolve(data.results)
    } catch (error) {
      reject(error)
    }
  })
}

export const getNextAppointment = () => {
  return new Promise<Appointment>(async (resolve, reject) => {
    try {
      const data = await AppointmentsAPI.getNextAppointment()

      if (data.code !== 200)  {
        return reject(data.message)
      }

      store.dispatch(setNextAppointment(data?.results?.appointment))
      resolve(data.results.appointment)
    } catch (error) {
      reject(error)
    }
  })
}
