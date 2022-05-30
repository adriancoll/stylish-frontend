import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  LoginResponse,
  User,
  USER_ROLES,
} from '../../../interfaces/user.interface'

export interface UserState {
  user: User
  token: string
  isBusiness: boolean
}

//** @var {User} Just a mock for testing */
const initialState = { user: {}, token: '' } as UserState

const usertSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user
      state.isBusiness = action.payload.user.role === USER_ROLES.BUSINESS_ROLE
      state.token = action.payload.token
    },
    setUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload)
      state.user = action.payload
    },
  },
})

export const { loginUser, setUser } = usertSlice.actions
export default usertSlice.reducer
