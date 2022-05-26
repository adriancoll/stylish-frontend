import { Appointment } from './appointment.interfaces'
import { ServiceType } from './service_type.interface'

export type roles = 'USER_ROLE' | 'ADMIN_ROLE' | 'BUSINESS_ROLE'
export type token = string

export interface User {
  name                 : string
  phoneNumber          : string
  email                : string
  image                : string
  role                 : roles
  status               : boolean
  google               : boolean
  uid                  : string
}

export interface Business {
  name                 : string
  employees            : number
  image                : string
  serviceTypes?        : ServiceType[]
  user                 : User
  uid                  : string
  total_users_feedback : number
  total_stars          : number
  rating               : number
  description          : string
}

export interface LoginResponse {
  appointments?        : Appointment[]
  business?            : Business
  user                 : User
  token                : token
}

export interface RefreshTokenResponse extends LoginResponse {}

export interface RegisterUserPayload {
  name                 : string
  phone_number         : string
  email                : string
  password             : string
}