import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'
import { JumpingTransition } from 'react-native-reanimated'
import { DELAY } from '../../../constants/animations'
import { FontAwesome } from '@expo/vector-icons'
interface Props {
  business_uri: string
  user_uri: string
}

const { width, height } = Dimensions.get('screen')

const AppointmentFormHead: FC<Props> = ({ business_uri, user_uri }) => {
  const { colors } = useTheme()

  return (
    <Animatable.View
      animation={'fadeInDown'}
      useNativeDriver
      delay={700}
      style={[styles.container]}>
      <LottieView
        autoPlay
        speed={0.6}
        resizeMode='cover'
        style={{
          width: width * 0.7,
          height: 180,
          alignSelf: 'center',
        }}
        source={require(`../../../../assets/lotties/configure-appointment.json`)}
      />
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
    borderRadius: 1000,
  },
})
