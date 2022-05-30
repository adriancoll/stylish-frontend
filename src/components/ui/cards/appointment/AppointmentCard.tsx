import { Dimensions, StyleSheet, useColorScheme, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import theme from '../../../../theme/theme'
import {
  Appointment,
  AppointmentStatus,
} from '../../../../interfaces/appointment.interfaces'
import { Divider } from '@react-native-material/core'
import { AppointmentCardBody } from './Body/AppointmentCardBody'
import { AppointmentCardFooter } from './Footer/AppointmentCardFooter'
import { AppointmentCardHead } from './Head/AppointmentCardHead'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { UserState } from '../../../../store/features/user/userSlice'
import { ConfirmModal } from '../../modals/ConfirmModal'

const { width } = Dimensions.get('screen')

interface AppointmentCardProps {
  appointment: Appointment
  index?: number
}

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Main'>

export const AppointmentCard: FC<AppointmentCardProps> = ({
  appointment,
  index = 0,
}) => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'


  const navigator = useNavigation<authScreenProp>()
  const goToProfile = () => {
    if (isBusinessOwner) return
    navigator.push('BusinessDetails', { business: appointment.business })
  }

  const startDate = moment(appointment.date).format('L')
  const startTime = moment(appointment.date).format('hh:mm a')
  const fromNow = moment(appointment.date).fromNow()

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  const showFooter =
    appointment.status === AppointmentStatus.PENDING_CONFIRM ||
    appointment.status === AppointmentStatus.CONFIRMED

  const isBusinessOwner = user.uid === appointment.business.user.uid


  return (
    <Animatable.View
      animation={'fadeInLeft'}
      duration={500}
      useNativeDriver
      delay={index * 100}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        },
      ]}>

      <TouchableOpacity onPress={goToProfile}>
        <AppointmentCardHead
          isBusinessOwner={isBusinessOwner}
          uid={appointment.business.uid}
          name={appointment.business.name}
          timeFromNow={fromNow}
          uri={
            isBusinessOwner
              ? appointment.user.image
              : appointment.business.image
          }
          colors={colors}
          subtitle={appointment.service_type.name}
        />
        <Divider style={[styles.divider]} color={colors.border} />
        <AppointmentCardBody
          status={appointment.status}
          date={startDate}
          time={startTime}
        />
      </TouchableOpacity>
      {showFooter && (
        <AppointmentCardFooter
          isBusinessOwner={isBusinessOwner}
          appointment={appointment}
        />
      )}
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  // MAIN CONTAINER
  container: {
    width: width - theme.spacing.md * 4,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },

  // DIVIDER
  divider: {
    marginVertical: theme.spacing.md,
  },
})
