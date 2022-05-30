import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { Button } from '@react-native-material/core'
import { Business } from '../../../interfaces/user.interface'
import theme from '../../../theme/theme'
import { useNavigation, useTheme } from '@react-navigation/native'
import { DELAY } from '../../../constants/animations'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface Props {
  business: Business
}

type businessDetails = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

const BookAppointmentButton: FC<Props> = ({ business }) => {
  const { colors } = useTheme()
  const navigation = useNavigation<businessDetails>()

  const [isLoading, setIsLoading] = useState(false)

  const handlePress = () => {
    navigation.navigate('AppointmentFormScreen', { business })
  }

  return (
    // <Animatable.View animation='bounceInUp' delay={DELAY + 1800}>
    <Animatable.View useNativeDriver animation='bounceInUp' delay={0}>
      <Button
        pressableContainerStyle={{
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
        }}
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
