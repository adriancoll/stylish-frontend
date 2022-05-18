import React, { FC } from 'react'
import {
  Text,
  StyleSheet,
  ButtonProps,
  TouchableOpacity,
  TextStyle,
  TextStyleAndroid,
  TouchableHighlight,
} from 'react-native'
import theme from '../../theme/theme'

export enum ButtonTypes {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  ACCENT = 'ACCENT',
  TERTIARY = 'TERTIARY',
  WHITE = 'WHITE',
  TRANSPARENT = 'TRANSPARENT',
}

type Props = {
  type?: ButtonTypes
  bgColor?: string
  fgColor?: string
  customStyle?: TextStyle | TextStyleAndroid
  spacing?: number
  disabledText?: string
}

const CustomButton: FC<Props & ButtonProps> = ({
  onPress,
  title,
  type = 'PRIMARY',
  bgColor,
  fgColor,
  customStyle,
  disabled,
  disabledText = '¡Completa todos los campos!',
  spacing = theme.spacing.lg,
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      touchSoundDisabled={false}
      style={[
        styles.container,
        getContainer(type),
        bgColor ? { backgroundColor: bgColor } : {},
        disabled ? { opacity: 0.2 } : {},
        { padding: spacing },
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
          { ...customStyle },
        ]}>
        {disabled ? disabledText : title}
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create<any>({
  container: {
    width: 'auto',

    marginVertical: theme.spacing.md,

    alignItems: 'center',
    borderRadius: 5,
  },

  text: {
    fontWeight: theme.fontWeights.bold as TextStyle['fontWeight'],
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
    color: theme.colors.white,
  },

  container_PRIMARY: {
    backgroundColor: theme.colors.primary,
  },

  container_WHITE: {
    backgroundColor: theme.colors.white,
  },

  text_WHITE: {
    color: theme.colors.black,
  },

  container_SECONDARY: {
    backgroundColor: theme.colors.secondary,
  },

  container_ACCENT: {
    backgroundColor: theme.colors.accent,
  },

  container_TERTIARY: {},

  container_TRANSPARENT: {
    backgroundColor: 'transparent',
  },

  text_SECONDARY: {
    color: theme.colors.secondary,
  },

  text_TERTIARY: {
    color: theme.colors.accent,
  },

  text_TRANSPARENT: {
    color: theme.colors.grey,
  },
})

const getContainer = (container: string) => styles[`container_${container}`]

export default CustomButton
