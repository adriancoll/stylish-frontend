import { StyleSheet, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BaseInfoContainer } from '../BaseInfoContainer/BaseInfoContainer'
import { AppointmentCard } from '../../../ui/cards/appointment/AppointmentCard'
import { getNextAppointment } from '../../../../store/features/appointments/appointmentActions'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { AppointmentsState } from '../../../../store/features/appointments/appointmentSlice'
import { isEmpty } from 'lodash'
import { EmptyView } from './EmptyView'


export default function NextAppointmentBox() {
  const [loading, setLoading] = useState(false)

  const { nextAppointment } = useSelector<RootState, AppointmentsState>(
    (state) => state.appointments
  )

  useEffect(() => {
    getNextAppointment()
      .catch(() => {
        setLoading(false)
      })
      .finally(() => setLoading(false))
  }, [])


  return (
    <BaseInfoContainer title='Próxima cita'>
      {nextAppointment && !isEmpty(nextAppointment) ? (
        <AppointmentCard
          appointment={nextAppointment}
        />
      ) : (
        <EmptyView
          text='¡No tienes reservas!'
          source={require(`../../../../../assets/lotties/no-appointments.json`)}
        />
      )}
    </BaseInfoContainer>
  )
}

const styles = StyleSheet.create({})
