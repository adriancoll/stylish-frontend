import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Plane } from 'react-native-animated-spinkit'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginForm } from '../../components/auth/login/Form'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
  const navigator = useNavigation<authScreenProp>()

  const goToRegister = () => navigator.navigate('Register')

  return (
    <SafeAreaView>
      <LoginForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {},
})
