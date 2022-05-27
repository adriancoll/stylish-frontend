import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse, User } from '../../../interfaces/user.interface'

export interface UserState {
  user: User
  token: string
}

//** @var {User} Just a mock for testing */
const initialState = { user: {}, token: '' } as UserState

const usertSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload)
      state.user = action.payload
    }
  },
})

export const { loginUser, setUser } = usertSlice.actions
export default usertSlice.reducer
