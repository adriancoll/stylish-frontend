import { store } from '../..'
import { BusinessAPI } from '../../../api/business'
import {
  Business,
  StoreBusinessPayload,
} from '../../../interfaces/business.interface'
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
  payload: FormData | StoreBusinessPayload
) => {
  return new Promise<Business>(async (resolve, reject) => {
    try {
      const data = await BusinessAPI.updateBusiness(uid, payload)
      console.log('errro aqui', data)

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
