import axios from 'axios'
import {
  Appointment,
  MyAppointments,
  StoreAppointment,
} from '../interfaces/appointment.interfaces'

const prefix = '/appointment'

const myAppointmentsRoute = `${prefix}/my`
const nextAppointmentRoute = `${prefix}/next`
const confirmAppointmentRoute = `${prefix}/confirm`
const completeAppointmentRoute = `${prefix}/complete`

// BASE APPOINTMENTS CALLS

const getAllMyAppointments = async () => {
  const res = await axios.post<BaseResponse<{ appointments: MyAppointments }>>(
    myAppointmentsRoute
  )
  return res.data
}

const cancelAppointment = async (uid: string) => {
  const res = await axios.delete(`${prefix}/${uid}`)
  return res.data
}

const completeAppointment = async (uid: string) => {
  const res = await axios.post<BaseResponse<{ appointment: Appointment }>>(
    `${completeAppointmentRoute}/${uid}`
  )
  return res.data
}

const confirmAppointment = async (uid: string) => {
  const res = await axios.post<BaseResponse<{ appointment: Appointment }>>(
    `${confirmAppointmentRoute}/${uid}`
  )
  return res.data
}

const storeAppointment = async (appointment: StoreAppointment) => {
  const res = await axios.post<BaseResponse<{ appointment: Appointment }>>(
    `${prefix}`,
    appointment
  )
  return res.data
}

// NEXT APPOINTMENT API CALLS

const getNextAppointment = async () => {
  const res = await axios.post<BaseResponse<{ appointment: Appointment }>>(
    nextAppointmentRoute
  )

  return res.data
}

export const AppointmentsAPI = {
  getAllMyAppointments,
  getNextAppointment,
  cancelAppointment,
  storeAppointment,
  confirmAppointment,
  completeAppointment,
}
