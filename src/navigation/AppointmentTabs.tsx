import {
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
  RefreshControl,
  Dimensions,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { AppointmentsState } from '../store/features/appointments/appointmentSlice'
import {
  getMyAppointments,
  getNextAppointment,
} from '../store/features/appointments/appointmentActions'
import {
  AppointmentStatus,
  AppointmentStatusTypes,
} from '../interfaces/appointment.interfaces'
import Tabs from '../components/main/AppointmentTabs/Tabs'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import { AppointmentCard } from '../components/ui/cards/appointment/AppointmentCard'
import { FullScreenLoader } from '../components/ui/FullScreenLoader'
import { getPopularBusiness } from '../store/features/business/businessActions'
import theme from '../theme/theme'
import { useTheme } from '@react-navigation/native'
import AnimatedLottieView from 'lottie-react-native'
import AppointmentList from '../components/main/AppointmentTabs/AppointmentList'
import EmptyAppointmentList from '../components/main/AppointmentTabs/EmptyAppointmentList'

export type AppointmentTab = {
  key: AppointmentStatusTypes
  label: string
  active: boolean
}

export const AppointmentTabs = () => {
  const [selectedTab, setSelectedTab] = useState<AppointmentTab>(
    {} as AppointmentTab
  )
  const [tabs, setTabs] = useState<AppointmentTab[]>([
    {
      key: 'PENDING_CONFIRM',
      label: 'Pendientes',
      active: true,
    },
    {
      key: 'CONFIRMED',
      label: 'Confirmadas',
      active: false,
    },
    {
      key: 'CANCELED',
      label: 'Canceladas',
      active: false,
    },
    {
      key: 'COMPLETED',
      label: 'Completadas',
      active: false,
    },
    {
      key: 'TIMEOUT',
      label: 'Vencidas',
      active: false,
    },
  ])

  const { colors } = useTheme()

  useEffect(() => {
    setSelectedTab(tabs.filter((item) => item.active)[0])
  }, [tabs])

  const { appointments } = useSelector<RootState, AppointmentsState>(
    (state) => state.appointments
  )

  if (!appointments || !appointments[selectedTab.key])
  {
    return <FullScreenLoader />
  }

  return (
    <View style={styles.container}>
      <Tabs tabs={tabs} setTab={setTabs} />

      {appointments[selectedTab.key].length > 0 ? (
        <AppointmentList appointments={appointments[selectedTab.key]} />
      ) : (
        <EmptyAppointmentList label={selectedTab.label} />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})
