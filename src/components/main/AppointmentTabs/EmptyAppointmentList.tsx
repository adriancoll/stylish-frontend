import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { FC } from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import * as Animated from 'react-native-animatable'

const { width, height } = Dimensions.get('screen')

interface Props {
  label: string
}

const EmptyAppointmentList: FC<Props> = ({ label }) => {
  const { colors } = useTheme()

  return (
    <Animated.View animation={'fadeInDown'} useNativeDriver duration={1500} style={styles.emptyContainer}>
      <AnimatedLottieView
        source={require('../../../../assets/lotties/empty-appointments-2.json')}
        autoPlay
        loop
        speed={0.5}
        style={{
          height: width,
          alignSelf: 'flex-start',
        }}
        resizeMode='cover'
      />
      <Text style={[styles.text, { color: colors.text, width: width * 0.7 }]}>
        No tienes ninguna reserva en el apartado{' '}
        <Text
          style={[
            styles.text,
            { fontFamily: theme.fonts.bold, color: colors.text },
          ]}>
          {label}
        </Text>
      </Text>
    </Animated.View>
  )
}

export default EmptyAppointmentList

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.lg,
    textAlign: 'center',
  },
})
