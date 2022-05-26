import { store } from '../..'
import { BusinessAPI } from '../../../api/business'
import { ServiceTypesAPI } from '../../../api/servicetype'
import { ServiceType } from '../../../interfaces/service_type.interface'
import { Business } from '../../../interfaces/user.interface'
import { setAllServiceTypes } from './serviceTypesSlice'

export const getAllServiceTypesBusiness = () => {
  return new Promise<ServiceType[]>(async (resolve, reject) => {
    try {
      const data = await ServiceTypesAPI.getAll()

      if (data.error) {
        reject(data.error)
        throw new Error(data.message)
      }

      store.dispatch(setAllServiceTypes(data.results))
      resolve(data.results)
    } catch (error) {
      reject(error)
    }
  })
}

