import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/main/ProfileScreen'
import theme from '../theme/theme'
import { Pressable, StyleSheet, View } from 'react-native'
import { CustomTabBarIcon } from '../components/ui/navigation/CustomTabBarIcon'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useTheme } from '@react-navigation/native'
import AppointmentsScreen from '../screens/main/AppointmentsScreen'
import HomeScreen from '../screens/main/HomeScreen'
import MapScreen from '../screens/main/MapScreen'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
const { Screen, Navigator, Group } =
  createBottomTabNavigator<RootStackParamList>()

const ICON_SIZE = 30

type mainScreenProps = NativeStackNavigationProp<RootStackParamList, 'Main'>

export const MainNavigation = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation<mainScreenProps>()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.container,
          ...styles.shadow,
        },
      }}>
      <Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              name='Inicio'
              Icon={
                <AntDesign
                  name='home'
                  size={ICON_SIZE}
                  color={
                    focused ? theme.colors.primary : theme.colors.text_muted
                  }
                />
              }
            />
          ),
        }}
      />
      <Screen
        name='Map'
        component={MapScreen}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name='map-o'
              size={ICON_SIZE}
              color={theme.colors.white}
              style={{
                transform: [{ rotate: focused ? '10deg' : '0deg' }],
              }}
            />
          ),
          tabBarButton: ({ children, ...props }) => (
            <Pressable {...props} style={styles.mainButton}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: theme.colors.primary,
                }}>
                {children}
              </View>
            </Pressable>
          ),
        }}
      />

      <Screen
        name='Appointments'
        component={AppointmentsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              name='Reservas'
              Icon={
                <AntDesign
                  name='calendar'
                  size={ICON_SIZE}
                  color={
                    focused ? theme.colors.primary : theme.colors.text_muted
                  }
                />
              }
            />
          ),
        }}
      />
    </Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: theme.borderRadius.md,
    height: 80,
  },
  shadow: {
    shadowColor: theme.colors['primary-light'],
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  mainButton: {
    top: -30,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
