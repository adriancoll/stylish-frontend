import { NavigationContainer } from '@react-navigation/native'
import { store } from './src/store'
import { Provider } from 'react-redux'
import HomeScreen from './src/screens/HomeScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { API_URL } from './src/utils/constants'
import axios from 'axios'
import { setupInterceptorsTo } from './src/utils/axiosConfig'

axios.defaults.baseURL = API_URL

setupInterceptorsTo(axios)

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              tabBarLabel: 'Home',
            }}
            name='Home'
            component={HomeScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
