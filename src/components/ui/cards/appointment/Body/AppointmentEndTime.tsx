import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import theme from '../../../../../theme/theme'
import moment, { Moment } from 'moment'
import * as Animatable from 'react-native-animatable'

interface Props {
    endDate: string | Date | Moment
}

const AppointmentEndTime: FC<Props> = ({ endDate }) => {
  return (
    <Animatable.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.md,
      }}>
      <MaterialCommunityIcons
        name='timer-outline'
        size={24}
        color={theme.colors.text_muted}
      />
      <Text
        style={{
          color: theme.colors.text_muted,
          fontFamily: theme.fonts.regular,
        }}>
        Hora de salida{' '}
        <Text style={{ fontFamily: theme.fonts.bold }}>
          {moment(endDate).format('HH:MM')}
        </Text>{' '}
        aproximadamente
      </Text>
    </Animatable.View>
  )
}

export default AppointmentEndTime

const styles = StyleSheet.create({})
