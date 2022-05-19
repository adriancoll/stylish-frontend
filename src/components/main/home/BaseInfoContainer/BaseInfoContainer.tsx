import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import theme from '../../../../theme/theme'
import { useTheme } from '@react-navigation/native'

interface Props {
  title: string
  children: JSX.Element
}

export const BaseInfoContainer: FC<Props> = ({ title, children }) => {
  const { colors } = useTheme()
  return (
    <View>
      <Text style={[{ color: colors.text }, styles.text]}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.md
  },
})
