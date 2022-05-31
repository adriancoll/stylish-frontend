import { StyleSheet, Text, Dimensions, View } from 'react-native'
import React, { FC, SetStateAction, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation, useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TouchableScale from 'react-native-touchable-scale'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const { width, height } = Dimensions.get('window')

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

interface Props {
  hide: () => void
}

const FloatingNote: FC<Props> = ({ hide }) => {
  const { colors } = useTheme()

  const containerRef = useRef<Animatable.View & View>() as React.RefObject<
    Animatable.View & View
  >

  const handleClose = () => {
    if (
      containerRef.current &&
      typeof containerRef.current.bounceOutUp === 'function'
    ) {
      containerRef.current.bounceOutUp(1000).finally(() => {
        hide()
      })
    }
  }

  const navigator = useNavigation<homeScreenProp>()
  const goToRegister = () => {
    hide()
    navigator.navigate('BusinessStoreForm')
  }

  return (
    <Animatable.View
      ref={containerRef}
      style={[StyleSheet.absoluteFillObject, styles.container]}
      animation='bounceInDown'>
      <TouchableScale onPress={goToRegister}>
        <Text style={[{ color: colors.text }, styles.text]}>
          Crear cuenta de empresa
        </Text>
      </TouchableScale>
      <TouchableOpacity style={[styles.close]} onPress={handleClose}>
        <FontAwesome5 name='times' size={24} color={colors.text} />
      </TouchableOpacity>
    </Animatable.View>
  )
}

export default FloatingNote

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    top: 0,
    left: 0,
    width: width,
    height: height * 0.1,
    borderBottomLeftRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.bold,
  },
  close: {},
})
