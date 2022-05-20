import {
  View,
  Text,
  useColorScheme,
  useWindowDimensions,
  StyleSheet,
} from 'react-native'
import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import { Avatar, Chip, Surface } from '@react-native-material/core'
import theme from '../../../../theme/theme'
import { AntDesign } from '@expo/vector-icons'

interface Props {
  title: string
  subtitle: string
  image: string
  rating: number
}

export const PopularHairdressBox: FC<Props> = ({
  title,
  subtitle,
  image,
  rating,
}) => {
  const { colors } = useTheme()
  const isDarkMode = useColorScheme() === 'dark'
  const { width } = useWindowDimensions()

  return (
    <Surface
      elevation={4}
      style={{
        ...styles.box,
        width: width * 0.4,
        backgroundColor: isDarkMode ? '#444444' : theme.colors.white,
        borderColor: colors.border,
        borderWidth: 1,
      }}
      category='small'>
      <Avatar
        size={84}
        image={{
          uri: image,
        }}
        style={{
          marginBottom: theme.spacing.sm,
        }}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={[
          styles.text,
          {
            color: colors.text,
          },
        ]}>
        {title}
      </Text>

      <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.subHeading]}>
        {subtitle}
      </Text>

      <Chip color={colors.text} style={[styles.chip]} label=''>
        <AntDesign
          name='star'
          size={16}
          color='black'
          style={{ color: 'rgba(255, 173, 27, 0.7)', marginRight: 2 }}
        />
        <Text style={{ color: colors.text }}>{rating}</Text>
      </Chip>
    </Surface>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.regular,
  },
  subHeading: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.subHeading,
    color: theme.colors.text_muted,
  },
  box: {
    alignItems: 'center',
    padding: theme.spacing.md,
    margin: theme.spacing.md,
  },
  chip: {
    marginTop: theme.spacing.md,
    backgroundColor: 'rgba(255, 248, 234, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
