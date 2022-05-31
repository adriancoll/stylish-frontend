import { StyleSheet, Text } from 'react-native'
import React, { FC, useState } from 'react'
import { ActivityIndicator, Button } from '@react-native-material/core'
import theme from '../../../../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import { Appointment } from '../../../../../../interfaces/appointment.interfaces'
import { completeAppointmentAction } from '../../../../../../store/features/appointments/appointmentActions'
import Tooltip from 'react-native-walkthrough-tooltip'
import * as Animatable from 'react-native-animatable'

interface Props {
  uid: string
  disabled: boolean
}

const CompleteAppointmentButton: FC<Props> = ({ uid, disabled }) => {
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [isTooltipVisible, setisTooltipVisible] = useState(false)

  const confirmAppointment = async () => {
    setIsLoading(true)

    await completeAppointmentAction(uid)

    setIsLoading(false)
  }

  const hideTooltip = () => setisTooltipVisible(false)
  const showTooltip = () => setisTooltipVisible(true)

  if (disabled) {
    return (
      <Tooltip
        isVisible={isTooltipVisible}
        useInteractionManager
        useReactNativeModal
        contentStyle={{
          backgroundColor: colors.background,
        }}
        content={
          <Animatable.Text
            animation='fadeIn'
            style={[styles.button, { color: colors.text}]}>
            ¡No puedes confirmar hasta que no haya llegado la hora de la cita!
          </Animatable.Text>
        }
        placement='top'
        onClose={hideTooltip}>
        <Button
          variant='outlined'
          loading={isLoading}
          color={theme.colors.text_muted}
          onPress={showTooltip}
          loadingIndicator={<ActivityIndicator color={theme.colors.white} />}
          title={() => (
            <Text style={[styles.button, { color: theme.colors.white }]}>
              Completar
            </Text>
          )}
        />
      </Tooltip>
    )
  }

  return (
    <Button
      variant='outlined'
      disabled={disabled}
      loading={isLoading}
      color={colors.text}
      onPress={confirmAppointment}
      loadingIndicator={<ActivityIndicator color={theme.colors.white} />}
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
