import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/main/ProfileScreen'
import theme from '../theme/theme'
import { StyleSheet, View } from 'react-native'
import { CustomTabBarIcon } from '../components/ui/navigation/CustomTabBarIcon'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import AppointmentsScreen from '../screens/main/AppointmentsScreen'
import HomeScreen from '../screens/main/HomeScreen'
import MapScreen from '../screens/main/MapScreen'
import { MapTabBar } from '../components/ui/navigation/MapTabBar'
const { Screen, Navigator, Group } = createBottomTabNavigator()

const ICON_SIZE = 25

export const MainNavigation = () => {
  const { colors } = useTheme()

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
      <Screen
        name='Map'
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name='map-o' size={30} color={theme.colors.white} />
          ),
          tabBarButton: ({ children, onPress }) => <MapTabBar onPress={onPress} />,
        }}
      />
      <Screen
        name='Profile'
        component={ProfileScreen}
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
      <Screen
        name='Test'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              name='PERFIL'
              Icon={
                <AntDesign
                  name='user'
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
})
