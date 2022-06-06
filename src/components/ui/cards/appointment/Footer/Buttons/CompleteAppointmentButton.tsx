import { StyleSheet, Text, ToastAndroid } from 'react-native'
import React, { FC, useState } from 'react'
import { ActivityIndicator, Button } from '@react-native-material/core'
import theme from '../../../../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import { Appointment } from '../../../../../../interfaces/appointment.interfaces'
import {
  completeAppointmentAction,
  getNextAppointment,
} from '../../../../../../store/features/appointments/appointmentActions'
import Tooltip from 'react-native-walkthrough-tooltip'
import * as Animatable from 'react-native-animatable'
import { FeedbackModal } from '../../../../modals/FeedbackModal'
import { getPopularBusiness, storeFeedbackAction } from '../../../../../../store/features/business/businessActions'

interface Props {
  disabled: boolean
  appointment: Appointment
}

const CompleteAppointmentButton: FC<Props> = ({ disabled, appointment }) => {
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [isTooltipVisible, setisTooltipVisible] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [stars, setStars] = useState<number>(0)

  const confirmAppointment = async () => {
    try {
      setIsLoading(true)
      await completeAppointmentAction(appointment.uid)
      await storeFeedbackAction(appointment.business.uid, {
        stars,
      })
      ToastAndroid.show(
        '¡Se ha completado la reserva, gracias por tu opinión!',
        ToastAndroid.SHORT
      )
    } catch (ex) {
      console.log(ex)
    }
  }

  const forceCloseModal = async () => {
    try {
      setIsLoading(true)
      await completeAppointmentAction(appointment.uid)
      ToastAndroid.show(
        '¡Se ha completado la reserva, gracias!',
        ToastAndroid.SHORT
      )
    } catch (ex) {
      console.log(ex)
    }
  }

  const openFeedback = () => setShowFeedbackModal(true)
  const toggleModal = () => setShowFeedbackModal((last) => !last)

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
            style={[styles.button, { color: colors.text }]}>
            ¡No puedes completar hasta que no haya llegado la hora de la cita!
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
    <>
      <FeedbackModal
        confirmCallback={confirmAppointment}
        closeCallback={forceCloseModal}
        setStars={setStars}
        isVisible={showFeedbackModal}
        name={appointment.business.name}
        username={appointment.user.name}
        toggleModal={toggleModal}
      />
      <Button
        variant='outlined'
        disabled={disabled || isLoading}
        loading={isLoading}
        color={colors.text}
        onPress={openFeedback}
        loadingIndicator={<ActivityIndicator color={theme.colors.white} />}
        title={() => (
          <Text style={[styles.button, { color: theme.colors.white }]}>
            Completar
          </Text>
        )}
      />
    </>
  )
}

export default CompleteAppointmentButton

const styles = StyleSheet.create({
  button: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
  },
})
