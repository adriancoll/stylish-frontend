import { store } from '../..'
import { BusinessAPI } from '../../../api/business'
import {
  Business,
  StoreBusinessFeedback,
  StoreBusinessPayload,
} from '../../../interfaces/business.interface'
import { setUser } from '../user/userSlice'
import {
  setAllBusiness,
  setPopularBusiness,
  updateGeneralBusiness,
} from './businessSlice'

export const getBusiness = () => {
  return new Promise<Business[]>(async (resolve, reject) => {
    try {
      const data = await BusinessAPI.getAllBusiness()

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      store.dispatch(setAllBusiness(data.results))
      resolve(data.results)
    } catch (error) {
      reject(error)
    }
  })
}

export const getPopularBusiness = () => {
  return new Promise<Business[]>(async (resolve, reject) => {
    try {
      const data = await BusinessAPI.getAllBusiness(true)

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }
      store.dispatch(setPopularBusiness(data.results))
      resolve(data.results)
    } catch (error) {
      reject(error)
    }
  })
}

export const updateBusiness = (
  uid: string,
  payload: FormData | StoreBusinessPayload,
  isImage = false
) => {
  return new Promise<Business>(async (resolve, reject) => {
    try {
      const data = isImage
        ? await BusinessAPI.updateBusinessImage(uid, payload as FormData)
        : await BusinessAPI.updateBusiness(uid, payload as StoreBusinessPayload)

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      // Update both, myBusiness and general businesses
      store.dispatch(updateGeneralBusiness(data.results.business))
      store.dispatch(setUser(data.results.business.user))
      console.log(data.results.business.user)

      resolve(data.results.business)
    } catch (error) {
      reject(error)
    }
  })
}

export const createBusiness = (payload: FormData | StoreBusinessPayload) => {
  return new Promise<Business>(async (resolve, reject) => {
    try {
      const data = await BusinessAPI.storeBusiness(payload)

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      // Update both, myBusiness and general businesses
      store.dispatch(updateGeneralBusiness(data.results.business))

      resolve(data.results.business)
    } catch (error) {
      reject(error)
    }
  })
}

export const storeFeedbackAction = (
  uid: string,
  payload: StoreBusinessFeedback
) => {
  return new Promise<Business>(async (resolve, reject) => {
    try {
      const data = await BusinessAPI.storeFeedback(uid, payload)
      await getPopularBusiness()

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      // Update both, myBusiness and general businesses
      store.dispatch(updateGeneralBusiness(data.results.business))

      resolve(data.results.business)
    } catch (error) {
      reject(error)
    }
  })
}
