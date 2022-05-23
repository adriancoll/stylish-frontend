import {
  Text,
  useColorScheme,
  useWindowDimensions,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
  View,
} from 'react-native'
import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import { Avatar, Chip, Pressable, Surface } from '@react-native-material/core'
import { Business } from '../../../../interfaces/user.interface'
import theme from '../../../../theme/theme'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

const { width, height } = Dimensions.get('screen')

interface Props {
  customStyle?: StyleProp<ViewStyle>
  business: Business
}

export const PopularHairdressBox: FC<Props> = ({ customStyle, business }) => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'
  const { width, height } = useWindowDimensions()

  return (
    <Pressable
      onPress={() => {
        console.log('Pressed', business.name)
      }}
      pressEffectColor={theme.colors['primary-light']}
      style={[
        customStyle,
        styles.box,
        {
          backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        },
      ]}>
      <>
        <Avatar
          size={84}
          image={{
            uri: business.image,
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
          {business.name}
        </Text>

        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <FontAwesome5 name='users' size={12} color={colors.border} />
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={[styles.subHeading]}>
            {business.employees} empleados
          </Text>
        </View>

        <Chip color={colors.text} style={[styles.chip]} label=''>
          <AntDesign
            name='star'
            size={16}
            color='black'
            style={{ color: 'rgba(255, 173, 27,0.9)', marginRight: 2 }}
          />
          <Text style={{ color: colors.text }}>{business.rating}</Text>
        </Chip>
      </>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.regular,
    textTransform: 'capitalize',
  },
  subHeading: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
    color: theme.colors.text_muted,
    marginLeft: theme.spacing.sm,
  },
  box: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.md) / 2,

    alignItems: 'center',
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
    marginLeft: 0,
    marginRight: theme.spacing.sm * 2,
    borderRadius: theme.borderRadius.md,

    shadowColor: 'darkgrey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  chip: {
    marginTop: theme.spacing.md,
    backgroundColor: 'rgba(250, 200, 27,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
