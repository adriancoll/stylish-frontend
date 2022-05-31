import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import {
  Avatar,
  Chip,
  Pressable,
  ThemeContext,
} from '@react-native-material/core'
import theme from '../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import { SheetManager } from 'react-native-actions-sheet'
import { USER_ACTIONSHEET } from '../../../constants/actionsheets'
import UserActionSheet from '../../ui/actionsheets/UserActionSheet'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { BusinessState } from '../../../store/features/business/businessSlice'
import { Ionicons } from '@expo/vector-icons'
import { DELAY } from '../../../constants/animations'
import * as Animated from 'react-native-animatable'
import FloatingNote from '../../ui/floating-note/FloatingNote'
import { useFloatingNoteReminder } from '../../../hooks/useFloatingNoteReminder'

interface Props {
  name: string
  uri: string
  isBusiness: boolean
}

const HomeHeader: FC<Props> = ({ name, uri, isBusiness = false }) => {

  const { colors } = useTheme()

  const { myBusiness } = useSelector<RootState, BusinessState>(
    (state) => state.business
  )

  const handleLongPress = () => SheetManager.show(USER_ACTIONSHEET)

  return (
    <View style={styles.container}>
      <UserActionSheet />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Hola, {name.split(' ')[0]}
          </Text>
          <Animated.Text
            iterationCount={2}
            easing='linear'
            animation='swing'
            delay={DELAY}
            style={[
              styles.welcomeText,
              { color: colors.text, marginLeft: theme.spacing.md },
            ]}>
            👋
          </Animated.Text>
        </View>

        {isBusiness && (
          <Animated.View
            animation={'bounceIn'}
            delay={DELAY}
            style={{ flexDirection: 'row', opacity: 0.2 }}>
            <Ionicons
              style={{ marginRight: theme.spacing.sm }}
              name='business'
              size={theme.iconSize.xs}
              color={colors.primary}
            />
            <Text style={[styles.subtitle]}>Cuenta de empresa</Text>
          </Animated.View>
        )}
      </View>
      <Pressable
        pressEffect='none'
        onPress={handleLongPress}
        onLongPress={handleLongPress}>
        <Avatar label={name} image={{ uri }} />

        {isBusiness && myBusiness && (
          <Avatar
            size={theme.iconSize.md}
            style={[styles.businessAvatar]}
            label={myBusiness?.name}
            image={{ uri: myBusiness?.image }}
          />
        )}
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
  subtitle: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text_muted,
    marginBottom: theme.spacing.sm,
  },
  businessAvatar: {
    position: 'absolute',
    left: -theme.spacing.md,
    bottom: -theme.spacing.md,
  },
})

export default HomeHeader
