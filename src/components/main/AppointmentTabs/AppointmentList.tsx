import {
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import React, { FC, useState } from 'react'
import { Appointment } from '../../../interfaces/appointment.interfaces'
import { AppointmentCard } from '../../ui/cards/appointment/AppointmentCard'
import { ScrollView } from 'react-native-gesture-handler'
import theme from '../../../theme/theme'
import { getMyAppointments } from '../../../store/features/appointments/appointmentActions'
import { AxiosError } from 'axios'

interface Props {
  appointments: Appointment[]
}

export const handleRefreshTabs = async () => {
  try {
    await getMyAppointments()
  } catch (err) {
    const error = err as AxiosError<BaseErrorResponse>
    if (error.response && error.response.data.error) {
      ToastAndroid.show(error.response?.data.message, ToastAndroid.LONG)
    }
  }
}


const AppointmentList: FC<Props> = ({ appointments }) => {
  const [isLoading, setisLoading] = useState(false)


  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary, theme.colors.grey]}
          refreshing={isLoading}
          onRefresh={handleRefreshTabs}
        />
      }
      showsVerticalScrollIndicator={false}>
      {appointments.map((appointment, index) => (
        <AppointmentCard
          appointment={appointment}
          index={index}
          showAllObservations
          key={appointment.uid}
        />
      ))}
    </ScrollView>
  )
}

export default AppointmentList

const styles = StyleSheet.create({})
