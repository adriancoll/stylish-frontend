import { StyleSheet, Text } from 'react-native'
import React, { FC, useState } from 'react'
import { ActivityIndicator, Button } from '@react-native-material/core'
import theme from '../../../../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import { Appointment } from '../../../../../../interfaces/appointment.interfaces'
import { completeAppointmentAction, confirmAppointmentAction } from '../../../../../../store/features/appointments/appointmentActions'

interface Props {
    uid: string
    disabled: boolean
}

const CompleteAppointmentButton: FC<Props> = ({ uid, disabled }) => {
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const confirmAppointment = async () => {
    setIsLoading(true)

    await completeAppointmentAction(uid)

    setIsLoading(false)
  }

  return (
    <Button
      variant='outlined'
      disabled={disabled}
      loading={isLoading}
      color={colors.text}
      onPress={confirmAppointment}
      loadingIndicator={<ActivityIndicator color={theme.colors.white}   />}
      title={() => (
        <Text style={[styles.button, { color: theme.colors.white }]}>
          Completar
        </Text>
      )}
    />
  )
}

export default CompleteAppointmentButton

const styles = StyleSheet.create({
  button: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
  },
})
