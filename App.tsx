import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native'
import { persistor, store } from './src/store'
import { Provider } from 'react-redux'
import WelcomeScreen from './src/screens/auth/WelcomeScreen'
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { API_URL } from './src/utils/constants'
import axios from 'axios'
import { setupInterceptorsTo } from './src/utils/axiosConfig'
import LoginScreen from './src/screens/auth/LoginScreen'
import { useColorScheme } from 'react-native'
import ProfileScreen from './src/screens/main/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.baseURL = API_URL

setupInterceptorsTo(axios)

const Stack = createNativeStackNavigator()

AsyncStorage.getAllKeys().then((keys) => console.log(keys))

export default function App() {
  const scheme = useColorScheme()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name='Welcome'
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name='Login'
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name='Profile'
              component={ProfileScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
