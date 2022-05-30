import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Appointment, MyAppointments, StoreAppointment } from '../../../interfaces/appointment.interfaces'

export interface AppointmentsState {
  appointments: MyAppointments
  nextAppointment: Appointment | null
}

const initialState = {
  appointments: {} as MyAppointments,
  nextAppointment: {} as Appointment,
} as AppointmentsState

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setMyAppointments: (state, action: PayloadAction<MyAppointments>) => {
      state.appointments = action.payload
    },
    setNextAppointment: (state, action: PayloadAction<Appointment | null>) => {
      state.nextAppointment = action.payload
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.PENDING_CONFIRM.push(action.payload)
    },
  },
})

export const {
  setMyAppointments,
  setNextAppointment,
  addAppointment
} = appointmentSlice.actions
export default appointmentSlice.reducer
