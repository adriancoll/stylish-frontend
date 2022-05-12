import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { persistor, store } from './src/store'
import { Provider } from 'react-redux'
import WelcomeScreen from './src/screens/auth/WelcomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from './src/utils/constants'
import axios from 'axios'
import { setupInterceptorsTo } from './src/utils/axiosConfig'
import LoginScreen from './src/screens/auth/LoginScreen'
import { useColorScheme } from 'react-native'
import ProfileScreen from './src/screens/main/ProfileScreen'
import { PersistGate } from 'redux-persist/integration/react'
import { useFonts } from '@use-expo/font'
import { FullScreenLoader } from './src/components/ui/FullScreenSpinner'
import { MainNavigation } from './src/navigation/Main'

axios.defaults.baseURL = API_URL

setupInterceptorsTo(axios)

const Stack = createNativeStackNavigator()

export default function App() {
  const scheme = useColorScheme()

  const [isLoaded] = useFonts({
    'gilroy-light': require('./assets/fonts/Gilroy-Light.otf'),
    'gilroy-regular': require('./assets/fonts/Gilroy-Regular.ttf'),
    'gilroy-bold': require('./assets/fonts/Gilroy-Bold.ttf'),
    'gilroy-extra-bold': require('./assets/fonts/Gilroy-ExtraBold.otf'),
  })

  if (!isLoaded) {
    return <FullScreenLoader /> 
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  )
}
