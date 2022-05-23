import { store } from '../..'
import { BusinessAPI } from '../../../api/business'
import { Business } from '../../../interfaces/user.interface'
import { setAllBusiness, setPopularBusiness } from './businessSlice'

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
