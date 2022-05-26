import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import theme from '../../../theme/theme'
import { Divider } from '@react-native-material/core'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const { width } = Dimensions.get('window')

export const Section: FC<Props> = ({ children }) => (
  <>
    <View>{children}</View>
    <Divider
      inset={width * 0.3}
      style={[styles.section]}
      color={theme.colors.iconBackground}
    />
  </>
)

const styles = StyleSheet.create({
  section: {
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
})

export const BaseSectionStyles = StyleSheet.create({
  title: {
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.md,
  },
  text: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.regular,
    textTransform: 'capitalize',
  },
})
