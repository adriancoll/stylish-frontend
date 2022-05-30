import { Dimensions, StyleSheet, useColorScheme, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import theme from '../../../../theme/theme'
import { Appointment } from '../../../../interfaces/appointment.interfaces'
import { Divider } from '@react-native-material/core'
import { AppointmentCardBody } from './Body/AppointmentCardBody'
import { AppointmentCardFooter } from './Footer/AppointmentCardFooter'
import { AppointmentCardHead } from './Head/AppointmentCardHead'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
  const goToProfile = () =>
    navigator.push('BusinessDetails', { business: appointment.business })

  const startDate = moment(appointment.date).format('L')
  const startTime = moment(appointment.date).format('hh:mm a')
  const fromNow = moment(appointment.date).fromNow()

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
          uid={appointment.business.uid}
          name={appointment.business.name}
          timeFromNow={fromNow}
          uri={appointment.business.image}
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
      <AppointmentCardFooter />
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
