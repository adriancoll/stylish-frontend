import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'
import { JumpingTransition } from 'react-native-reanimated'

interface Props {
  business_uri: string
  user_uri: string
}

const { width, height } = Dimensions.get('screen')

const AppointmentFormHead: FC<Props> = ({ business_uri, user_uri }) => {
  const { colors } = useTheme()

  return (
    <Animatable.View animation={'fadeInDown'} style={[styles.container]}>
      <Animatable.Image animation={'bounceInLeft'} style={[styles.icon]} source={{ uri: business_uri }} />
      <LottieView
        autoPlay
        speed={0.6}
        resizeMode='cover'
        style={{
          width: width * 0.5,
          height: 100,
          alignSelf: 'center',
        }}
        source={require(`../../../../assets/lotties/configure-appointment.json`)}
      />
      <Animatable.Image animation={'bounceInRight'} style={[styles.icon]} source={{ uri: user_uri }} />
    </Animatable.View>
  )
}

export default AppointmentFormHead

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  icon: {
    width: 75,
    height: 75,
    elevation: 5,
    borderRadius: 1000,
  },
})
