import { StyleSheet, Text, ToastAndroid } from 'react-native'
import React, { FC, useState } from 'react'
import { ActivityIndicator, Button } from '@react-native-material/core'
import theme from '../../../../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import { Appointment } from '../../../../../../interfaces/appointment.interfaces'
import { confirmAppointmentAction, getNextAppointment } from '../../../../../../store/features/appointments/appointmentActions'
import { AxiosError } from 'axios'

interface Props {
  uid: string
}

const ConfirmAppointmentButton: FC<Props> = ({ uid }) => {
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const confirmAppointment = async () => {
    try {
      setIsLoading(true)
      await confirmAppointmentAction(uid)
      setIsLoading(false)
    } catch (ex) {
      const error = ex as AxiosError<BaseErrorResponse>
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    }
  }

  return (
    <Button
      variant='contained'
      loading={isLoading}
      color={colors.text}
      onPress={confirmAppointment}
      style={styles.buttonSuccess}
      loadingIndicator={<ActivityIndicator color={theme.colors.white} />}
      title={() => (
        <Text style={[styles.button, { color: theme.colors.white }]}>
          Confirmar
        </Text>
      )}
    />
  )
}

export default ConfirmAppointmentButton

const styles = StyleSheet.create({
  buttonSuccess: {
    backgroundColor: theme.colors.primary,
  },
  button: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
  },
})
