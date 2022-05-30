import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Appointment } from '../../../interfaces/appointment.interfaces'
import { AppointmentCard } from '../../ui/cards/appointment/AppointmentCard'
import { ScrollView } from 'react-native-gesture-handler'

interface Props {
  appointments: Appointment[]
}

const AppointmentList: FC<Props> = ({ appointments }) => {
  return (
    <ScrollView  showsVerticalScrollIndicator={false}>
      {appointments.map((appointment, index) => (
        <AppointmentCard
          appointment={appointment}
          index={index}
          key={appointment.uid}
        />
      ))}
    </ScrollView>
  )
}

export default AppointmentList

const styles = StyleSheet.create({
})
