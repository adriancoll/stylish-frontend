import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Entypo } from '@expo/vector-icons'
import theme from '../../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import TouchableScale from 'react-native-touchable-scale'

interface Props {
  street_name: string | undefined
  city: string | undefined
  locality: string | undefined
  number: string | undefined
  zip_code: string | undefined
}

export const LocationCard: FC<Props> = ({ street_name, city, locality, number, zip_code }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container]}>
      <TouchableScale activeScale={0.2} style={[styles.icon]}>
        <Entypo
          name='location-pin'
          size={theme.iconSize.md}
          color={colors.primary}
        />
      </TouchableScale>

      <View style={[styles.address]}>
        <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
        {zip_code}, {city}, {locality}
        </Text>
        <Text numberOfLines={1} style={[styles.subtitle]}>{street_name}, {number}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255, 156, 213, 0.2)',
    borderRadius: 100,
    marginRight: theme.spacing.md
  },

  address: {
    paddingRight: theme.spacing.md,
    flexDirection: 'column',
  },
  title: {
    marginRight: theme.spacing.lg,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text_muted,
  },
})
