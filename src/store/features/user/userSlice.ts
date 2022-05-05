import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store'
import { User } from 'interfaces/user.interface'

export interface UserState {
  user: User
}

const initialState = { user: {
  name          : 'asdasd',
  phoneNumber   : 'string',
  email         : 'asd@asd.asd',
  image         : 'string',
  role          : 'BUSINESS_ROLE',
  status        : true,
  google        : true,
  uid           : 'asdasd'
} } as UserState

const usertSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = usertSlice.actions
export default usertSlice.reducer
