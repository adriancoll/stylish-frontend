import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { getData } from './asyncStorage'

const onRequest = async (config: AxiosRequestConfig) => {
  const token = await getData('token')
  if (token) {
    config.headers['x-token'] = token
    console.info(`[request] [${config.method} => ${config.headers['x-token']}]`)
    return config
  }
  console.info(`[request] [${config.method} => ${config.baseURL}${config.url}]`)
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${error.message}]`)
  return Promise.reject(error)
}

const onResponse = (
  response: AxiosResponse<BaseResponse<any>>
): AxiosResponse => {
  console.info(`[response] [${response.data.message}]`)
  return response
}

const onResponseError = (
  error: AxiosError<BaseResponse<any>>
): Promise<AxiosError> => {
  const message = error.isAxiosError
    ? error.response?.data.message
    : error.message

  console.error(`[response error] [${typeof message}]`)

  return Promise.reject(message)
}

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
