import { Avatar, Chip, Flex, Pressable } from '@react-native-material/core'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'
import { SharedElement } from 'react-navigation-shared-element'
import BusinessDetailsHead from '../../components/BusinessDetails/BusinessDetailsHead'
import { AntDesign, Entypo } from '@expo/vector-icons'
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import TouchableScale from 'react-native-touchable-scale'

type businessDetailType = NativeStackNavigationProp<
  RootStackParamList,
  'BusinessDetails'
>

export default function BusinessDetailsScreen({}) {
  const navigator = useNavigation<businessDetailType>()
  const { colors } = useBaseContainer()
  const route = useRoute<any>()

  const opacity = useSharedValue(0)

  const rStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  })

  useEffect(() => {
    opacity.value = withDelay(350, withTiming(1, { duration: 700 }))
  }, [])

  const { business } = route.params
  const isDark = useColorScheme() === 'dark'

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={isDark ? theme.colors.black : theme.colors.white}
      />

      <Pressable
        style={[styles.back, rStyle]}
        onPress={() => navigator.goBack()}>
        <Entypo name='chevron-thin-left' size={24} color={colors.text} />
      </Pressable>

      <BusinessDetailsHead business={business} />

      {/* <BusinessDetailsBody business={business} />
      <BusinessDetailsFooter business={business} /> */}


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    margin: 0,
  },
  text: {
    fontFamily: theme.fonts.bold,
  },
  chip: {
    marginTop: theme.spacing.md,
    backgroundColor: 'rgba(250, 200, 27,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.lg,
    elevation: 2,
    padding: theme.spacing.sm,
  },
})
