import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { Button } from '@react-native-material/core'
import { Business } from '../../../interfaces/user.interface'
import TouchableScale from 'react-native-touchable-scale'
import theme from '../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import { DELAY } from '../../../constants/animations'

interface Props {
  business: Business
}

const BookAppointmentButton: FC<Props> = ({ business }) => {
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(false)

  const handlePress = () => {
    console.log('hola')
    setIsLoading(true)
  }

  return (
    <Animatable.View animation='bounceInUp' delay={DELAY + 1800}>
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
