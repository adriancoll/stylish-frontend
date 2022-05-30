import moment from 'moment'
import { ServiceType } from './service_type.interface'
import { Business, User } from './user.interface'

export type AppointmentStatusTypes =
  | 'PENDING_CONFIRM'
  | 'CONFIRMED'
  | 'CANCELED'
  | 'COMPLETED'
  | 'TIMEOUT'

export enum AppointmentStatus {
    PENDING_CONFIRM = 'PENDING_CONFIRM',
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED',
    TIMEOUT = 'TIMEOUT',
}

export enum AppointmentStatusTranslation {
  PENDING_CONFIRM = 'Pendiente',
  CONFIRMED = 'Confirmado',
  CANCELED = 'Cancelado',
  COMPLETED = 'Completedo',
  TIMEOUT = 'Vencidos',
}


export interface Appointment {
  business: Business
  user: User
  service_type: ServiceType
  observations: string
  date: Date
  endDate: Date
  status: AppointmentStatusTypes | AppointmentStatus
  createdAt: Date
  updatedAt: Date
  uid: string
}

export type MyAppointments = Record<AppointmentStatusTypes, Appointment[]>

export interface StoreAppointment {
  business?: string
  service_type: string
  date: any
  observations: string
}
