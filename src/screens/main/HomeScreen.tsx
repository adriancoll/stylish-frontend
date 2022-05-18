import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigator = useNavigation<authScreenProp>()
  const { baseContainer, colors } = useBaseContainer()

  return (
    <SafeAreaView style={[baseContainer]}>
      <Text style={[{ color: colors.text}]}>
        La home
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.baseContainer,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.fonts.bold
  }
})
