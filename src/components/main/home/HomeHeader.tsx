import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import {
  ActivityIndicator,
  Avatar,
  Divider,
  Pressable,
} from '@react-native-material/core'
import theme from '../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { UserState } from '../../../store/features/user/userSlice'
import { SheetManager } from 'react-native-actions-sheet'
import { USER_ACTIONSHEET } from '../../../constants/actionsheets'
import UserActionSheet from '../../ui/actionsheets/UserActionSheet'

interface Props {
  name: string
  uri: string
}

const HomeHeader: FC<Props> = ({ name, uri }) => {
  const { colors } = useTheme()

  const handleLongPress = () => SheetManager.show(USER_ACTIONSHEET)

  return (
    <View style={styles.container}>
      <UserActionSheet />
      <View>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Hola, {name.split(' ')[0]} 👋
        </Text>
      </View>
      <Pressable pressEffect='none' onPress={handleLongPress} onLongPress={handleLongPress}>
        <Avatar label={name} image={{ uri }} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: theme.fonts.extrabold,
    textTransform: 'capitalize',
    marginBottom: theme.spacing.sm,
  },
})

export default HomeHeader
