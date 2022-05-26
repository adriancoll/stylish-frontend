import axios from 'axios'
import { ServiceType } from '../interfaces/service_type.interface'

const prefix = '/service/type'
const getAllRoute = `${prefix}/all`

const getAll = async () => {
  const res = await axios.post<BaseResponse<ServiceType[]>>(getAllRoute)
  return res.data
}

export const ServiceTypesAPI = { getAll }
