import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppointmentsAPI } from '../../../api/appointments'
import { Appointment, StoreAppointment } from '../../../interfaces/appointment.interfaces'

export interface AppointmentsState {
  appointments: Appointment[]
  nextAppointment: Appointment | null
}


//** @var {User} Just a mock for testing */
const initialState = {
  appointments: [],
  nextAppointment: {} as Appointment,
} as AppointmentsState

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setMyAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload
    },
    cancelAppointment: (state, action: PayloadAction<Appointment>) => {
      // filtramos por el que no tenga id igual al que queremos cancelar
      state.appointments = state.appointments.filter(
        (appointment) => appointment.uid !== action.payload.uid
      )
    },
    storeAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload)
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      // si tiene el mismo id lo modificamos si no dejamos el appointment antiguo
      state.appointments = state.appointments.map((appointment) =>
        appointment.uid === action.payload.uid ? action.payload : appointment
      )
    },
    setNextAppointment: (state, action: PayloadAction<Appointment | null>) => {
      state.nextAppointment = action.payload
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload)
    },
  },
})

export const {
  setMyAppointments,
  cancelAppointment,
  setNextAppointment,
  storeAppointment,
  updateAppointment,
  addAppointment
} = appointmentSlice.actions
export default appointmentSlice.reducer
