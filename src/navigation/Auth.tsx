import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
import { useTokenValidation } from '../hooks/useTokenValidation'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { useInternetConnection } from '../hooks/useInternetConection'
import { OfflineModal } from '../components/ui/modals/OfflineModal'

const Stack = createNativeStackNavigator<RootStackParamList>()

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
            fullScreenGestureEnabled: true,
            customAnimationOnGesture: true,
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
          }}>
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
            name='Main'
            component={MainNavigation}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
