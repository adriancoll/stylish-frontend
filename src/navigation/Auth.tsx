import { NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'
import { darkTheme, lightTheme } from '../theme/theme'
import { MainNavigation } from './Main'
import 'react-native-gesture-handler'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import { useInternetConnection } from '../hooks/useInternetConection'
import { OfflineModal } from '../components/ui/modals/OfflineModal'
import BusinessDetailsScreen from '../screens/BusinessDetails/BusinessDetailsScreen'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import ProfileScreen from '../screens/main/ProfileScreen'
import AppointmentFormScreen from '../screens/main/AppointmentFormScreen'
import BusinessStoreFormScreen from '../screens/main/BusinessUpdateFormScreen'

const Stack = createSharedElementStackNavigator<RootStackParamList>()

export const AuthNavigation = () => {
  const scheme = useColorScheme()

  const isOffline = useInternetConnection()

  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <OfflineModal isVisible={isOffline} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return { cardStyle: { opacity: progress } }
            },
            animationTypeForReplace: 'push',
          }}>
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
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='Main'
            component={MainNavigation}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='BusinessDetails'
            sharedElements={(route, otherRoute, showing) => {
              const { business } = route.params
              const items = ['image', 'name', 'employees'].map(
                (item) => `business.${business.uid}.${item}`
              )

              return items
            }}
            component={BusinessDetailsScreen}
          />
          <Stack.Screen
            options={{
              title: 'Configurar cita',
              headerTitleAlign: 'center',
            }}
            name='AppointmentFormScreen'
            sharedElements={(route, otherRoute, showing) => {
              const { business } = route.params

              const items = ['image', 'name'].map(
                (item) => `appointment.form.${business.uid}.${item}`
              )

              return items
            }}
            component={AppointmentFormScreen}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Mi perfil',
            }}
            name='Profile'
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Mi empresa',
            }}
            name='BusinessStoreForm'
            component={BusinessStoreFormScreen}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
