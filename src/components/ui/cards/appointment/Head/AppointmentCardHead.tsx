import { Avatar } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import theme from '../../../../../theme/theme'

interface AppointmentHeadCardProps {
  colors: any
  name: string
  subtitle: string
  uri: string
  timeFromNow?: string
}

export const AppointmentCardHead: FC<AppointmentHeadCardProps> = ({
  colors,
  name,
  subtitle,
  uri,
  timeFromNow = '',
}) => {
  return (
    <View style={[styles.headContainer]}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
          {timeFromNow ? `${timeFromNow} - ${name}` : name}
        </Text>
        <Text numberOfLines={1} style={[styles.subtitle]}>
          {subtitle}
        </Text>
      </View>
      <Avatar
        image={{
          uri,
        }}
      />
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
})
