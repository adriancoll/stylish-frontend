import axios from 'axios'
import {
  Business,
  StoreBusinessPayload,
} from '../interfaces/business.interface'

const prefix = '/business'

const getAllRoute = `${prefix}/all`
const getPopularRoute = `${prefix}/popular/all`
const geMyRoute = `${prefix}`
const createRoute = `${prefix}`
const setFeedbackRoute = `${prefix}/%s/feedback`

// BASE APPOINTMENTS CALLS

/**
 * Returns all given business filtered by popularity or not
 * @param {boolean} Sort total-feedback, stars
 * @returns Business[]
 */
const getAllBusiness = async (popular = false) => {
  const res = await axios.post<BaseResponse<Business[]>>(
    popular ? getPopularRoute : getAllRoute
  )
  return res.data
}

/**
 * Returns all given business filtered by popularity or not
 * @param {StoreBusinessPayload} Sort total-feedback, stars
 * @returns Business[]
 */
const updateBusiness = async (uid: string, payload: FormData | StoreBusinessPayload) => {
  const res = await axios.post<BaseResponse<{ business: Business }>>(
    `/business/${uid}`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  console.log(payload)
  return res.data
}

export const BusinessAPI = {
  getAllBusiness,
  updateBusiness,
}
