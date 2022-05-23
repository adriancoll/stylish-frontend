import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native';
import theme from '../../theme/theme';

export const IconInfo: FC<{ icon: JSX.Element; text: string }> = ({
  icon,
  text,
}) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {icon}
      <Text
        style={{
          color: colors.text,
          fontFamily: theme.fonts.regular,
          marginLeft: theme.spacing.sm,
        }}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})
