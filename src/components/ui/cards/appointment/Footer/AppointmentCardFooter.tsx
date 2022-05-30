import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Button } from '@react-native-material/core'
import theme from '../../../../../theme/theme'
import {
  Appointment,
  AppointmentStatus,
} from '../../../../../interfaces/appointment.interfaces'
import { AppointmentsAPI } from '../../../../../api/appointments'
import { cancelAppointment } from '../../../../../store/features/appointments/appointmentActions'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store'
import { UserState } from '../../../../../store/features/user/userSlice'

interface Props {
  loading?: boolean
  appointment: Appointment
  isBusinessOwner: boolean
}

export const AppointmentCardFooter: FC<Props> = ({
  loading = false,
  appointment,
  isBusinessOwner
}) => {
  const { colors } = useTheme()
  const [isFetching, setIsFetching] = useState(false)



  const handlePress = async () => {
    setIsFetching(true)

    await cancelAppointment(appointment.uid)

    setTimeout(() => {
      setIsFetching(false)
    }, 1000)
  }

  const buttonsLoading = loading || isFetching

  return (
    <View style={[styles.container]}>
      <Button
        variant='text'
        loading={buttonsLoading}
        disabled={buttonsLoading}
        color={colors.text}
        title={() => (
          <Text style={[styles.button, { color: theme.colors.text_muted }]}>
            Cancelar
          </Text>
        )}
        onPress={handlePress}
      />
      {isBusinessOwner && (
        <Button
          variant='contained'
          color={colors.text}
          title={() => (
            <Text style={[styles.button, { color: theme.colors.text_muted }]}>
              Confirmar
            </Text>
          )}
          onPress={handlePress}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
  },
})
