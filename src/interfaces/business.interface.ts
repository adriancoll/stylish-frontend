import { ServiceType } from './service_type.interface'
import { User } from './user.interface'

export interface Business {
  name                                       : string
  employees                                  : number
  image                                      : string
  service_types                              : ServiceType[]
  user                                       : User
  uid                                        : string
  total_users_feedback                       : number
  total_stars                                : number
  rating                                     : number
  description                                : string
  latitude                                   : number
  longitude                                  : number
}

export interface BusinessResponse {
  business                                   : Business
}

export interface StoreBusinessPayload {
  name                                       : string
  employees                                  : string
  service_types                              : string[]
  user_id?                                   : string
  description                                : string
  address                                    : { longitude: number; latitude: number }
  longitude            ?                     : number
  latitude             ?                     : number
}

export type StoreBusinessFeedback = {stars : number}