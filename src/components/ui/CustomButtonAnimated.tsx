import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { FC, useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import TouchableScale from 'react-native-touchable-scale'
import theme from '../../theme/theme'
import { useTheme } from '@react-navigation/native'
import Animated from 'react-native-reanimated'

interface Props {
  isLoading: boolean
  isSuccess: boolean
  isValid: boolean
  disabled: boolean
  onPress: () => void

  title: string
  successText?: string
  loadingText?: string
  disabledText?: string
}

const CustomButtonAnimated = React.forwardRef<Animatable.View & View, Props>(
  (
    {
      isLoading,
      isSuccess,
      isValid,
      onPress,
      disabled,
      title,
      successText = '¡Guardado correctamente!',
      loadingText = 'Guardando...',
      disabledText = 'Completa los campos requeridos',
    }: Props,
    ref: React.ForwardedRef<Animatable.View & View>
  ): JSX.Element => {
    const { colors } = useTheme()
    const getBackgroundColor = () => {
      if (isSuccess) return theme.colors.success
      if (isValid) return colors.primary

      return theme.colors.grey
    }

    return (
      <Animatable.View
        ref={ref}
        style={{
          marginVertical: theme.spacing.md,
        }}>
        <TouchableScale disabled={disabled} onPress={onPress}>
          <Animatable.View
            transition={['backgroundColor']}
            style={[
              styles.button,
              {
                flexDirection: 'row',
                opacity: isLoading || !isValid || disabled ? 0.5 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: getBackgroundColor(),
              },
            ]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: theme.spacing.md,
              }}>
              {isLoading && (
                <ActivityIndicator size='small' color={colors.text} />
              )}
              {isSuccess && (
                <AntDesign name='check' size={24} color={colors.text} />
              )}
            </View>

            <Text style={[styles.text, { color: colors.text }]}>
              {isSuccess
                ? successText
                : isLoading
                ? loadingText
                : isValid
                ? title
                : disabledText}
            </Text>
          </Animatable.View>
        </TouchableScale>
      </Animatable.View>
    )
  }
)

export default CustomButtonAnimated

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  button: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
  },
})
