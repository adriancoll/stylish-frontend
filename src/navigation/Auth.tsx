import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useColorScheme } from 'react-native'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'
import ProfileScreen from '../screens/main/ProfileScreen'
import { darkTheme, lightTheme } from '../theme/theme'
import { MainNavigation } from './Main'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AuthNavigation = () => {
  const scheme = useColorScheme()

  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <Stack.Navigator>
        <Stack.Group>
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
            name='Register'
            component={RegisterScreen}
          />
        </Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='Profile'
          component={MainNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
