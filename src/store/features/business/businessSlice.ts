import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Business } from '../../../interfaces/user.interface'

export interface BusinessState {
  business: Business[]
  popularBusiness: Business[]
}

//** @var {User} Just a mock for testing */
const initialState = {
  business: [],
  popularBusiness: [],
} as BusinessState

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setAllBusiness: (state, action: PayloadAction<Business[]>) => {
      state.business = action.payload
    },
    setPopularBusiness: (state, action: PayloadAction<Business[]>) => {
      state.popularBusiness = action.payload
    }

  },
})

export const {
  setAllBusiness,
  setPopularBusiness,

} = businessSlice.actions
export default businessSlice.reducer