import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { IconInfo } from '../../../IconInfo'
import { Ionicons } from '@expo/vector-icons'
import { AppointmentStatusPill } from './AppointmentStatusPill'
import theme from '../../../../../theme/theme'
import { AppointmentStatus, AppointmentStatusTypes } from '../../../../../interfaces/appointment.interfaces'

const ICON_SIZE = 20

export const AppointmentCardBody: FC<{ date: string; time: string, status: AppointmentStatusTypes | AppointmentStatus }> = ({
  date,
  time,
  status
}) => (
  <View style={[styles.cardBody]}>
    <IconInfo
      text={date}
      icon={<Ionicons name='ios-calendar' size={ICON_SIZE} color='grey' />}
    />
    <IconInfo
      text={time}
      icon={<Ionicons name='ios-time' size={ICON_SIZE} color='grey' />}
    />
    <AppointmentStatusPill status={status} />
  </View>
)

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
})
