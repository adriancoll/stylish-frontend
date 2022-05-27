/**
 * BASE REQUEST QUERY PARAMETERS BASED ON STYLISH BACKEND
 * REQUEST STRUCTURE, IN SUCCESS / ERRORS AND VALIDATION REQUESTS
 */


declare module 'redux-persist/es/persistStore'
declare module 'redux-persist/integration/react'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type BackendValidationError = {
  msg: string
  param: string
  location: string
}

interface BaseResponse<T> {
  error: boolean
  code: number
  message: string
  results: T
  errors: BackendValidationError[]
}

interface BaseErrorResponse {
  error: boolean
  code: number
  message: string
  errors: BackendValidationError[]
}

// Screens for react-navigation
type RootStackParamList = {
  // Auth
  Welcome: undefined
  Login: { email: string } | undefined
  Register: undefined

  // Main
  Main: undefined
  BusinessDetails: { business: Business } | undefined

  Home: undefined
  Appointments: undefined
  Map: undefined
  Test: undefined
  Profile: { user: User } | undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
