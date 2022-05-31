import { Pressable } from '@react-native-material/core'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'
import BusinessDetailsHead from '../../components/BusinessDetails/BusinessDetailsHead'
import { Entypo } from '@expo/vector-icons'
import BusinessDetailsBottomSheet from '../../components/BusinessDetails/BusinessDetailsBottomSheet'
import { SharedElement } from 'react-navigation-shared-element'

type businessDetailType = NativeStackNavigationProp<
  RootStackParamList,
  'BusinessDetails'
>

const { width, height } = Dimensions.get('screen')

export default function BusinessDetailsScreen({}) {
  const navigator = useNavigation<businessDetailType>()
  const { colors } = useBaseContainer()
  const route = useRoute<any>()
  const { business } = route.params
  const isDark = useColorScheme() === 'dark'

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('../../../assets/images/details.jpg')}
        blurRadius={10}
        resizeMode='stretch'
        style={styles.img}>

        <Pressable style={[styles.back]} onPress={() => navigator.goBack()}>
          <Entypo name='chevron-thin-left' size={24} color={colors.text} />
        </Pressable>

        <BusinessDetailsHead business={business} />

        <BusinessDetailsBottomSheet business={business} />
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    margin: 0,
  },
  text: {
    fontFamily: theme.fonts.bold,
  },
  img: {
    height,
    width,
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
    zIndex: 1,
  },
})
