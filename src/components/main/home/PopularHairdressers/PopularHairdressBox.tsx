import {
  Text,
  useColorScheme,
  useWindowDimensions,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
  View,
  Image,
} from 'react-native'
import React, { FC } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Avatar, Chip, Pressable, Surface } from '@react-native-material/core'
import { Business } from '../../../../interfaces/user.interface'
import theme from '../../../../theme/theme'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SharedElement } from 'react-navigation-shared-element'
import TouchableScale from 'react-native-touchable-scale'

const { width, height } = Dimensions.get('screen')

interface Props {
  customStyle?: StyleProp<ViewStyle>
  business: Business
  index: number
}

type homeScreenType = NativeStackNavigationProp<RootStackParamList, 'Home'>

export const PopularHairdressBox = ({
  customStyle,
  business,
  index,
}: Props) => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'
  const { width, height } = useWindowDimensions()
  const navigator = useNavigation<homeScreenType>()

  return (
    <TouchableScale
      onPress={() => {
        navigator.navigate('BusinessDetails', {
          business,
        })
      }}
      // pressEffectColor={theme.colors['primary-light']}
      style={[
        customStyle,
        styles.box,
        {
          backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        },
      ]}>
      <>
        <SharedElement id={`business.${business.uid}.image`}>
          <Image
            source={{
              uri: business.image,
            }}
            style={[styles.avatar]}
          />
        </SharedElement>
        <SharedElement id={`business.${business.uid}.name`}>
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
        </SharedElement>

        <SharedElement id={`business.${business.uid}.employees`}>
          <View
            style={{
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
        </SharedElement>

        <SharedElement id={`business.${business.uid}.rating`}>
          <Chip color={colors.text} style={[styles.chip]} label=''>
            <AntDesign
              name='star'
              size={16}
              color='black'
              style={{ color: 'rgba(255, 173, 27,0.9)', marginRight: 2 }}
            />
            <Text style={{ color: colors.text }}>{business.rating}</Text>
          </Chip>
        </SharedElement>
      </>
    </TouchableScale>
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
  avatar: {
    marginBottom: theme.spacing.sm,
    width: theme.iconSize.xl * 2,
    height: theme.iconSize.xl * 2,
    borderRadius: 100,
  },
})
