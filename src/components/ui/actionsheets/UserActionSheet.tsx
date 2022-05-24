import {
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import React, { MutableRefObject, useRef, useState } from 'react'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import { USER_ACTIONSHEET } from '../../../constants/actionsheets'
import theme from '../../../theme/theme'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { StackActions, useNavigation, useTheme } from '@react-navigation/native'
import { Avatar, Pressable } from '@react-native-material/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { UserState } from '../../../store/features/user/userSlice'
import { clearAllData, deleteData } from '../../../utils/asyncStorage'

const { width } = Dimensions.get('screen')

const UserActionSheet = () => {
  const navigator = useNavigation()
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'
  const thisSheet = useRef<any>()

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  const handleLogout = async () => {
    thisSheet.current.hide()
    
    await clearAllData()

    navigator.dispatch(StackActions.replace('Welcome'))
  }

  return (
    <ActionSheet
      bounceOnOpen
      ref={thisSheet}
      indicatorColor={theme.colors.primary}
      gestureEnabled
      defaultOverlayOpacity={0.3}
      indicatorStyle={styles.indicator}
      id={USER_ACTIONSHEET}
      containerStyle={{
        ...styles.container,
        backgroundColor: isDark ? theme.colors.black : theme.colors.white,
      }}>
      <Pressable>
        <View style={[styles.item]}>
          <View style={[styles.iconContainer]}>
            <Avatar
              image={{ uri: user.image }}
              label={user.name}
              style={[styles.icon]}
            />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Mi Perfil</Text>
        </View>
      </Pressable>

      <Pressable onPress={handleLogout}>
        <View style={[styles.item, styles.logout]}>
          <View style={[styles.iconContainer]}>
            <MaterialIcons
              name='logout'
              size={theme.iconSize.md}
              color={theme.colors.error}
              style={[styles.icon]}
            />
          </View>
          <Text style={[styles.title, { color: 'lightcoral' }]}>
            Cerrar sesión
          </Text>
        </View>
      </Pressable>
    </ActionSheet>
  )
}

export default UserActionSheet

const styles = StyleSheet.create({
  container: {},
  indicator: {},
  item: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.bold,
    flex: 1,
  },
  icon: {
    marginRight: theme.spacing.lg,
  },
  iconContainer: {
    width: width * 0.2,
    height: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.sm,
  },
  logout: {
    borderRadius: theme.borderRadius.md,
  },
})
