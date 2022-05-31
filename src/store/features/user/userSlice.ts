import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistCombineReducers } from 'reduxjs-toolkit-persist'
import {
  LoginResponse,
  User,
  USER_ROLES,
} from '../../../interfaces/user.interface'
import { clearAllData } from '../../../utils/asyncStorage'

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
    logout: (state) => {
      clearAllData()
    }
  },
})

export const { loginUser, setUser, logout } = usertSlice.actions
export default usertSlice.reducer
