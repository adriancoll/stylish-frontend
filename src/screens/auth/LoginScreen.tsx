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
import { CreateAccountText } from '../../components/auth/login/CreateAccountText'
import { LoginForm } from '../../components/auth/login/LoginForm'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
  const navigator = useNavigation<authScreenProp>()
  const goToRegister = () => navigator.navigate('Register')

  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
        justifyContent: 'space-between',
        marginVertical: theme.spacing.md,
        flex: 1,
      }}>
      <View>
        <Text style={{ ...styles.title, color: colors.text }}>
          ¡Hola de nuevo!
        </Text>
        <Text style={{ ...styles.subtitle, color: colors.text }}>
          ¡Bienvenido/a, te hemos echado de menos!
        </Text>
        <LoginForm />
      </View>
      <CreateAccountText />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create<any>({
  container: theme.baseContainer,
  title: {
    textAlign: 'center',
    fontSize: theme.fontSizes.heading + 5,
    fontFamily: theme.fonts.bold,
    marginVertical: theme.spacing.lg,
  },
  subtitle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.thin,
    width: '60%',
    marginBottom: theme.spacing.lg,
  },
})
