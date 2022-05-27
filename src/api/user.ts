import axios from 'axios'
import { Appointment } from '../interfaces/appointment.interfaces'
import {
  User,
} from '../interfaces/user.interface'


const editUserAttempt = async (uid: string, payload: FormData) => {
  const res = await axios.post<BaseResponse<{ user: User }>>(
    `/user/${uid}`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return res.data
}

export {  editUserAttempt }
