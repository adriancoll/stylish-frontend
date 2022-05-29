import axios from 'axios'
import { Appointment, StoreAppointment } from '../interfaces/appointment.interfaces'

const prefix = '/appointment'

const myAppointmentsRoute = `${prefix}/my`
const nextAppointmentRoute = `${prefix}/next`
const confirmAppointmentRoute = `${prefix}/confirm`

// BASE APPOINTMENTS CALLS

const getAllMyAppointments = async () => {
  const res = await axios.post<BaseResponse<Appointment[]>>(myAppointmentsRoute)
  return res.data
}

const cancelAppointment = async (uid: string) => {
  const res = await axios.delete(`${prefix}/${uid}`)
  return res.data
}

const confirmAppointment = async (uid: string) => {
  const res = await axios.post(`${confirmAppointment}/${uid}`)
  return res.data
}

const storeAppointment = async (appointment: StoreAppointment) => {
  const res = await axios.post<BaseResponse<{ appontment: Appointment}>>(`${prefix}`, appointment)
  return res.data
}

// NEXT APPOINTMENT API CALLS

const getNextAppointment = async () => {
  const res = await axios.post<
    BaseResponse<{ appointment: Appointment }>
  >(nextAppointmentRoute)
  
  return res.data
}

export const AppointmentsAPI = {
  getAllMyAppointments,
  getNextAppointment,
  cancelAppointment,
  storeAppointment,
  confirmAppointment,
}
