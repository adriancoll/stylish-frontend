import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native'
import { Plane } from 'react-native-animated-spinkit'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CreateAccountText } from '../../components/auth/login/Links/CreateAccountText'
import { LoginForm } from '../../components/auth/login/Form'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
  const navigator = useNavigation<authScreenProp>()
  const goToRegister = () => navigator.navigate('Register')

  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}>
      <LoginForm />
      <CreateAccountText />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create<any>({
  container: theme.baseContainer,
})
