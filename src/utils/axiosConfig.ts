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
    config.headers = Object.assign({}, config.headers, {
      'x-token': token,
    })
  }
  console.info(
    `[⚙️ - request] [${config.method} => ${config.baseURL}${config.url}]`
  )
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.info(`[😞 - request error] [${error.message}]`)
  return Promise.reject(error)
}

const onResponse = (
  response: AxiosResponse<BaseResponse<any>>
): AxiosResponse => {
  console.info(`[⚡ - response] [${response.data.message}]`)
  return response
}

const onResponseError = (
  error: AxiosError<BaseErrorResponse>
): Promise<AxiosError> => {
  console.info(`[😞 - response error] [${error.message} ${error.response?.data?.errors}]`)
  return Promise.reject(error)
}

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
