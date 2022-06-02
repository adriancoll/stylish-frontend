import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'
import theme, { darkTheme, lightTheme } from '../theme/theme'
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
import BusinessStoreFormScreen from '../screens/main/BusinessStoreFormScreen'
import BusinessUpdateFormScreen from '../screens/main/BusinessUpdateFormScreen'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import TouchableScale from 'react-native-touchable-scale'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { UserState } from '../store/features/user/userSlice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { USER_ROLES } from '../interfaces/user.interface'
import MapScreen from '../screens/main/MapScreen'

const Stack = createSharedElementStackNavigator<RootStackParamList>()

export const AuthNavigation = () => {
  const scheme = useColorScheme()
  const { colors } = useTheme()

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
            name='PublicMap'
            component={MapScreen}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              title: 'Mapa',
            }}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Mi perfil',
              animationEnabled: true,
              headerRight: () => {
                type authScreenProp = NativeStackNavigationProp<
                  RootStackParamList,
                  'Profile'
                >
                const navigator = useNavigation<authScreenProp>()

                const { user } = useSelector<RootState, UserState>(
                  (state) => state.user
                )

                if (user.role === USER_ROLES.BUSINESS_ROLE) return <></>

                return (
                  <TouchableScale
                    onPress={() => navigator.navigate('BusinessStoreForm')}
                    style={styles.iconContainer}>
                    <MaterialIcons
                      name='add-business'
                      size={24}
                      color={
                        scheme === 'dark'
                          ? theme.colors.white
                          : theme.colors.input_dark
                      }
                    />
                    <Text
                      style={{
                        fontSize: theme.fontSizes.sm,
                        fontFamily: theme.fonts.thin,
                        color:
                          scheme === 'dark'
                            ? theme.colors.white
                            : theme.colors.input_dark,
                      }}>
                      Pasar a empresa
                    </Text>
                  </TouchableScale>
                )
              },
            }}
            name='Profile'
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Crear empresa',
            }}
            name='BusinessStoreForm'
            component={BusinessStoreFormScreen}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Mi empresa',
            }}
            name='BusinessUpdateForm'
            component={BusinessUpdateFormScreen}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
})
