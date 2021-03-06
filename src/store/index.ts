import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistCombineReducers,
} from 'reduxjs-toolkit-persist'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1'
import userReducer from './features/user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import persistStore from 'redux-persist/es/persistStore'
import appointmentReducer from './features/appointments/appointmentSlice'
import businessReducer from './features/business/businessSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
}

const _persistedReducer = persistCombineReducers(persistConfig, {
  user: userReducer,
  appointments: appointmentReducer,
  business: businessReducer,
})

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      /* ignore persistance actions */
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

// export const store = createStore(_persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
