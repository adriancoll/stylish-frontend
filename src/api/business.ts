import axios from 'axios'
import { Appointment } from '../interfaces/appointment.interfaces'
import { Business } from '../interfaces/user.interface'

const prefix = '/business'

const getAllRoute = `${prefix}/all`
const getPopularRoute = `${prefix}/popular/all`
const geMyRoute = `${prefix}`
const createRoute = `${prefix}`
const updateRoute = `${prefix}/%s`
const setFeedbackRoute = `${prefix}/%s/feedback`

// BASE APPOINTMENTS CALLS


/**
 * Returns all given business filtered by popularity or not
 * @param {boolean} Sort total-feedback, stars
 * @returns Business[]
 */
const getAllBusiness = async (popular = false) => {
  const res = await axios.post<BaseResponse<Business[]>>(popular ? getPopularRoute : getAllRoute) 
  return res.data
}

  

export const BusinessAPI = {
  getAllBusiness,
}
