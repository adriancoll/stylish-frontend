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

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AuthNavigation = () => {
  const scheme = useColorScheme()

  const { isLoading, isValid } = useTokenValidation()

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            customAnimationOnGesture: true,
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
          }}>
          {!isValid ? (
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
          ) : (
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name='Main'
              component={MainNavigation}
            />
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
