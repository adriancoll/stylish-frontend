import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ServiceType } from '../../../interfaces/service_type.interface'
import { Business } from '../../../interfaces/user.interface'

export interface ServiceTypesState {
  serviceTypes: ServiceType[]
}

//** @var {User} Just a mock for testing */
const initialState = {
  serviceTypes: [],
} as ServiceTypesState

const serviceTypesSlice = createSlice({
  name: 'serviceTypes',
  initialState,
  reducers: {
    setAllServiceTypes: (state, action: PayloadAction<ServiceType[]>) => {
      state.serviceTypes = action.payload
    }
  },
})

export const {
  setAllServiceTypes
} = serviceTypesSlice.actions
export default serviceTypesSlice.reducer