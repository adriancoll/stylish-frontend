import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { ActivityIndicator, Button } from '@react-native-material/core'
import { Business } from '../../../interfaces/business.interface'
import theme from '../../../theme/theme'
import { useNavigation, useTheme } from '@react-navigation/native'
import { DELAY } from '../../../constants/animations'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Tooltip from 'react-native-walkthrough-tooltip'

interface Props {
  business: Business
  disabled?: boolean
}

type businessDetails = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

const BookAppointmentButton: FC<Props> = ({ business, disabled = false }) => {
  const { colors } = useTheme()
  const navigation = useNavigation<businessDetails>()
  const [isTooltipVisible, setisTooltipVisible] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const hideTooltip = () => setisTooltipVisible(false)
  const showTooltip = () => setisTooltipVisible(true)

  const handlePress = () => {
    navigation.navigate('AppointmentFormScreen', { business })
  }

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
          <Animatable.Text animation='fadeIn' style={[{ color: colors.text }]}>
            ¡No puedes coger cita hasta que no tengas una cuenta!
          </Animatable.Text>
        }
        placement='top'
        onClose={hideTooltip}>
        <Button
          pressableContainerStyle={{
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
          }}
          loading={isLoading}
          pressEffect='highlight'
          onPress={showTooltip}
          titleStyle={styles.title}
          style={[styles.container, { opacity: isTooltipVisible ? 1 : 0.5 }]}
          title='¡Coger cita!'
        />
      </Tooltip>
    )
  }

  return (
    // <Animatable.View animation='bounceInUp' delay={DELAY + 1800}>
    <Animatable.View useNativeDriver animation='bounceInUp' delay={0}>
      <Button
        pressableContainerStyle={{
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
        }}
        disabled={disabled}
        loading={isLoading}
        pressEffect='highlight'
        onPress={handlePress}
        titleStyle={styles.title}
        style={[styles.container]}
        title='¡Coger cita!'
      />
    </Animatable.View>
  )
}

export default BookAppointmentButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
  },
  title: {
    fontFamily: theme.fonts.extrabold,
    fontSize: 24,
  },
})
