import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
  GestureResponderEvent,
  Linking,
  Platform,
} from 'react-native'
import React, { FC, useEffect } from 'react'
import { SharedElement } from 'react-navigation-shared-element'
import { Business } from '../../interfaces/user.interface'
import theme from '../../theme/theme'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useTheme } from '@react-navigation/native'
import { Chip, Pressable } from '@react-native-material/core'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TouchableScale from 'react-native-touchable-scale'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const { width, height } = Dimensions.get('screen')

interface Props {
  children?: JSX.Element | JSX.Element[]
  business: Business
}

interface BaseButtonProps {
  icon: JSX.Element
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined
}

const BaseButton: FC<BaseButtonProps> = ({ icon, onPress }) => (
  <TouchableScale
    onPress={onPress}
    style={{
      borderRadius: width,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.iconBackground,
    }}>
    {icon}
  </TouchableScale>
)

const BusinessDetailsHead: FC<Props> = ({ children, business }) => {
  const isDark = useColorScheme() === 'dark'
  const { colors } = useTheme()

  const opacity = useSharedValue(0)
  const scale = useSharedValue(0)
  const transalateY = useSharedValue(100)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: transalateY.value }, { scale: scale.value }],
    }
  })

  useEffect(() => {
    opacity.value = withDelay(350, withTiming(1, { duration: 700 }))
    transalateY.value = withDelay(350, withTiming(0))
    scale.value = withDelay(400, withSpring(1))
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'transparent',
        },
      ]}>
      <SharedElement id={`business.${business.uid}.image`}>
        <Image
          source={{
            uri: business.image,
          }}
          style={[styles.avatar]}
        />
      </SharedElement>

      

      <SharedElement id={`business.${business.uid}.name`}>
        <Text style={[styles.text, { color: isDark ? colors.text : theme.colors.white }]}>
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

      <Animated.View style={[styles.buttons, animatedStyle]}>
        <BaseButton
          icon={
            <MaterialIcons
              name='phone'
              size={theme.iconSize.sm}
              color={ isDark ? colors.text : theme.colors.white }
            />
          }
          onPress={() => {
            let phoneNumber = ''

            if (Platform.OS === 'android') {
              phoneNumber = `tel:${business.user.phoneNumber}`
            } else {
              phoneNumber = `telprompt:${business.user.phoneNumber}`
            }

            Linking.openURL(phoneNumber)
          }}
        />
        <BaseButton
          icon={
            <MaterialIcons
              name='alternate-email'
              size={theme.iconSize.sm}
              color={ isDark ? colors.text : theme.colors.white }
            />
          }
          onPress={() => {
            Linking.openURL(`mailto:${business.user.email}`)
          }}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    flexDirection: 'column',
    alignItems: 'center',
    height: height * 0.35,
    margin: 0,
    width,
  },
  avatar: {
    width: theme.iconSize.xl * 2.2,
    height: theme.iconSize.xl * 2.2,
    borderRadius: 100,
    marginBottom: theme.spacing.md,
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.regular,
    textTransform: 'capitalize',
    marginVertical: theme.spacing.sm,
  },
  subHeading: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
    color: theme.colors.text_muted,
    marginLeft: theme.spacing.sm,
  },
  backChevron: {
    position: 'absolute',
    top: 15,
    left: 15,
    elevation: 10,
  },
  buttons: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.4,
    marginTop: theme.spacing.lg,
  },
  chip: {
    position: 'absolute',
    top: -35,
    left: -35,
    marginTop: theme.spacing.md,
    backgroundColor: 'rgba(250, 200, 27,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BusinessDetailsHead
