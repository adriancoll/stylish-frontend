import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Maps } from '../../components/map/Map'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Map'>

const { width, height } = Dimensions.get('screen')

export default function MapScreen() {
  const navigator = useNavigation<authScreenProp>()
  const { baseContainer, colors } = useBaseContainer(false)

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <View style={[baseContainer, styles.container]}>
      <StatusBar hidden />
      <Maps />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height
  },
  text: {
    fontFamily: theme.fonts.bold,
  },
})
