import { NavigationContainer } from '@react-navigation/native'
import { store } from './src/store'
import { Provider } from 'react-redux'
import WelcomeScreen from './src/screens/auth/WelcomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from './src/utils/constants'
import axios from 'axios'
import { setupInterceptorsTo } from './src/utils/axiosConfig'
import LoginScreen from './src/screens/auth/LoginScreen'

axios.defaults.baseURL = API_URL

setupInterceptorsTo(axios)

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{
            headerShown: false
          }} name='Welcome' component={WelcomeScreen} />
          <Stack.Screen options={{
            headerShown: false
          }} name='Login' component={LoginScreen} />
          {/* <Stack.Screen name='Register' component={RegisterScreen} /> */}
          {/* <Stack.Screen name='Home' component={HomeScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
