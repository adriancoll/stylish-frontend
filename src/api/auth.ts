import axios from 'axios'
import { LoginResponse } from 'interfaces/user.interface'

const login = async (email: string, password: string) => {
  const res = await axios.post<BaseResponse<LoginResponse>>('/api/login', {
    email,
    password,
  })
  return res.data
}

export const API_AUTH = {
  login,
}
