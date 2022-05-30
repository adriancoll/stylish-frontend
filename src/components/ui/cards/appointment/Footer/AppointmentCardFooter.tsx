import { StyleSheet, Text, View } from 'react-native'
import React, { FC, SetStateAction, useState } from 'react'
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
import { ConfirmModal } from '../../../modals/ConfirmModal'

interface Props {
  loading?: boolean
  appointment: Appointment
  isBusinessOwner: boolean
}

export const AppointmentCardFooter: FC<Props> = ({
  loading = false,
  appointment,
  isBusinessOwner,
}) => {
  const { colors } = useTheme()
  const [isFetching, setIsFetching] = useState(false)

  const buttonsLoading = loading || isFetching

  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const toggleModal = () => setOpenConfirmModal((last) => !last)

  const handleDelete = async () => {
    setIsFetching(true)

    await cancelAppointment(appointment.uid)

    toggleModal()

    setIsFetching(false)
  }

  return (
    <View style={[styles.container]}>
      <ConfirmModal
        isVisible={openConfirmModal}
        subtitle={'Una vez cancelada la cita no habrá vuelta atras.'}
        title='¿Estás seguro/a?'
        toggleModal={toggleModal}
        confirmCallback={handleDelete}
      />
      <Button
        variant='text'
        loading={buttonsLoading}
        disabled={buttonsLoading}
        color={colors.text}
        onPress={toggleModal}
        title={() => (
          <Text style={[styles.button, { color: theme.colors.text_muted }]}>
            Cancelar
          </Text>
        )}
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
          onPress={() => {}}
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
