import { Avatar } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import { SharedElement } from 'react-navigation-shared-element'
import theme from '../../../../../theme/theme'

interface AppointmentHeadCardProps {
  colors: any
  name: string
  uid: string
  subtitle: string
  uri: string
  timeFromNow?: string
  isBusinessOwner: boolean
}

export const AppointmentCardHead: FC<AppointmentHeadCardProps> = ({
  colors,
  name,
  subtitle,
  uri,
  uid,
  timeFromNow = '',
  isBusinessOwner
}) => {
  return (
    <View style={[styles.headContainer]}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: colors.text }]}>
            {timeFromNow} -
          </Text>
          <SharedElement id={`business.${uid}.name`}>
            <Text style={[styles.title, { color: colors.text , marginLeft: theme.spacing.sm }]}>{name}</Text>
          </SharedElement>
        </View>
        <Text numberOfLines={1} style={[styles.subtitle]}>
          {subtitle}
        </Text>
      </View>
      <SharedElement id={`business.${uid}.image`}>
        <Image
          style={[styles.image]}
          source={{
            uri,
          }}
        />
      </SharedElement>
    </View>
  )
}

const styles = StyleSheet.create({
  //   HEAD
  headContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
  },
  // TEXTS
  title: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.subHeading,
    marginBottom: theme.spacing.sm,
    textTransform: 'capitalize',
  },
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
    color: theme.colors.text_muted,
    textTransform: 'capitalize',
  },
  image: {
    borderRadius: theme.borderRadius.full,
    width: theme.spacing.xl * 2,
    height: theme.spacing.xl * 2,
  },
})
