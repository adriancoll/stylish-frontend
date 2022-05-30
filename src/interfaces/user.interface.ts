import { Appointment, MyAppointments } from './appointment.interfaces'
import { ServiceType } from './service_type.interface'

export type roles = 'USER_ROLE' | 'ADMIN_ROLE' | 'BUSINESS_ROLE'
export type token = string

export enum USER_ROLES {
  USER_ROLE     = 'USER_ROLE',
  ADMIN_ROLE    = 'ADMIN_ROLE',
  BUSINESS_ROLE = 'BUSINESS_ROLE',
}

export interface User {
  name: string
  phone_number: string
  email: string
  image: string
  role: roles
  status: boolean
  google: boolean
  uid: string
}

export interface Business {
  name: string
  employees: number
  image: string
  service_types: ServiceType[]
  user: User
  uid: string
  total_users_feedback: number
  total_stars: number
  rating: number
  description: string
  latitude: number
  longitude: number
}

export interface LoginResponse {
  appointments?: MyAppointments
  business?: Business
  user: User
  token: token
}

export interface RefreshTokenResponse extends LoginResponse {}

export interface RegisterUserPayload {
  name: string
  phone_number: string
  email: string
  password: string
}

export interface EditUserPayload {
  name?: string
  phone_number?: string
  email?: string
  password?: string
  image?: any
}
