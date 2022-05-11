import React, { FC } from 'react'
import {
  Text,
  StyleSheet,
  ButtonProps,
  TouchableOpacity,
  TextStyle,
  TextStyleAndroid,
} from 'react-native'
import theme from '../../theme/theme'

export enum ButtonTypes {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  ACCENT = 'ACCENT',
  TERTIARY = 'TERTIARY',
  WHITE = 'WHITE',
}

type Props = {
  type: ButtonTypes
  bgColor?: string
  fgColor?: string
  customStyle?: TextStyle | TextStyleAndroid
}

const CustomButton: FC<Props & ButtonProps> = ({
  onPress,
  title,
  type = 'PRIMARY',
  bgColor,
  fgColor,
  customStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        getContainer(type),
        bgColor ? { backgroundColor: bgColor } : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
          {...customStyle}
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create<any>({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  text: {
    fontWeight: theme.fontWeights.bold as TextStyle['fontWeight'],
    fontFamily: theme.fonts.bold,
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

  text_SECONDARY: {
    color: theme.colors.secondary,
  },

  text_TERTIARY: {
    color: theme.colors.accent,
  },
})

const getContainer = (container: string) => styles[`container_${container}`]

export default CustomButton
