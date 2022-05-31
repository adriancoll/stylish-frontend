import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Business } from '../../../interfaces/business.interface'

export interface BusinessState {
  myBusiness: Business
  businesses: Business[]
  popularBusiness: Business[]
}

//** @var {User} Just a mock for testing */
const initialState = {
  myBusiness: {} as Business,
  businesses: [],
  popularBusiness: [],
} as BusinessState

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setMyBusiness: (state, action: PayloadAction<Business>) => {
      state.myBusiness = action.payload
    },
    setAllBusiness: (state, action: PayloadAction<Business[]>) => {
      state.businesses = action.payload
    },
    setPopularBusiness: (state, action: PayloadAction<Business[]>) => {
      state.popularBusiness = action.payload
    },
    updateGeneralBusiness: (state, action: PayloadAction<Business>) => {
      state.businesses = state.businesses.map((business) =>
        business.uid === action.payload.uid ? action.payload : business
      )
      state.popularBusiness = state.popularBusiness.map((business) =>
        business.uid === action.payload.uid ? action.payload : business
      )
      state.myBusiness = action.payload
    }

  },
})

export const {
  setAllBusiness,
  setPopularBusiness,
  setMyBusiness,
  updateGeneralBusiness,
} = businessSlice.actions
export default businessSlice.reducer