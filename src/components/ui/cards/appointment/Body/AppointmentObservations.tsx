import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import theme from '../../../../../theme/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
interface Props {
  observations: string
  showAll: boolean
}

const AppointmentObservations: FC<Props> = ({ showAll, observations }) => {
  const { colors } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.md,
      }}>
      <Text
        style={{
          color: colors.text,
          fontFamily: theme.fonts.regular,
        }}
        numberOfLines={showAll ? 0 : 1}>
        {observations}
      </Text>
    </View>
  )
}

export default AppointmentObservations

const styles = StyleSheet.create({})
