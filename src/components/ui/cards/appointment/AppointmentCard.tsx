import { StyleSheet, useColorScheme, View } from 'react-native'
import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import theme from '../../../../theme/theme'
import { Appointment } from '../../../../interfaces/appointment.interfaces'
import { Divider } from '@react-native-material/core'
import { AppointmentCardBody } from './Body/AppointmentCardBody'
import { AppointmentCardFooter } from './Footer/AppointmentCardFooter'
import { AppointmentCardHead } from './Head/AppointmentCardHead'
import moment from 'moment'

interface AppointmentCardProps {
  appointment: Appointment
}

export const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'

  const startDate = moment(appointment.date).format('L')
  const startTime = moment(appointment.date).format('hh:mm a')
  const fromNow = moment(appointment.date).fromNow()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        },
      ]}>
      <AppointmentCardHead
        name={appointment.business.name}
        timeFromNow={fromNow}
        uri={appointment.business.image}
        colors={colors}
        subtitle={appointment.service_type.name}
      />
      <Divider style={[styles.divider]} color={colors.border} />
      <AppointmentCardBody status={appointment.status} date={startDate} time={startTime} />
      <AppointmentCardFooter />
    </View>
  )
}

const styles = StyleSheet.create({
  // MAIN CONTAINER
  container: {
    width: '100%',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },

  // DIVIDER
  divider: {
    marginVertical: theme.spacing.md,
  },
})
