import { Dimensions, StyleSheet, useColorScheme, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import theme from '../../../../theme/theme'
import { Appointment } from '../../../../interfaces/appointment.interfaces'
import { Divider } from '@react-native-material/core'
import { AppointmentCardBody } from './Body/AppointmentCardBody'
import { AppointmentCardFooter } from './Footer/AppointmentCardFooter'
import { AppointmentCardHead } from './Head/AppointmentCardHead'
import moment from 'moment'

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const { width } = Dimensions.get('screen')

interface AppointmentCardProps {
  appointment: Appointment
}

export const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'

  const startDate = moment(appointment.date).format('L')
  const startTime = moment(appointment.date).format('hh:mm a')
  const fromNow = moment(appointment.date).fromNow()

  const opacity = useSharedValue(0)
  const scale = useSharedValue(0)
  const transalateY = useSharedValue(100)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      scale: scale.value,
      transform: [{ translateY: transalateY.value  }]
    }
  })

  useEffect(() => {
    opacity.value = withDelay(500, withTiming(1, { duration: 1000 }))
    transalateY.value = withDelay(500, withTiming(0))
    scale.value = withDelay(600, withTiming(1))
  }, [appointment])

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        },
      ]}>
      <AppointmentCardHead
        name={appointment.business.name}
        timeFromNow={fromNow}
        uri={appointment.business.image}
        colors={colors}
        subtitle={appointment.service_type.name}
      />
      <Divider style={[styles.divider]} color={colors.border} />
      <AppointmentCardBody
        status={appointment.status}
        date={startDate}
        time={startTime}
      />
      <AppointmentCardFooter />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  // MAIN CONTAINER
  container: {
    width: width - theme.spacing.md * 4,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },

  // DIVIDER
  divider: {
    marginVertical: theme.spacing.md,
  },
})
