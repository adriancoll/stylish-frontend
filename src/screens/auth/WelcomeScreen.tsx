import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton, { ButtonTypes } from '../../components/ui/CustomButton'
import { useTokenValidation } from '../../hooks/useTokenValidation'
import theme from '../../theme/theme'
import { Plane } from 'react-native-animated-spinkit'
import { FullScreenLoader } from '../../components/ui/FullScreenSpinner'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>
export default function WelcomeScreen() {
  const { isLoading } = useTokenValidation()
  const navigator = useNavigation<authScreenProp>()

  const goToRegister = () => navigator.navigate('Register')
  const goToLogin = () => navigator.navigate('Login')

  if (isLoading) {
    return (
      <FullScreenLoader />
    )
  }

  return (
    <View style={styles.container}>
      {/*  aqui va una img */}
      <Text>Bienvenido a Stylish</Text>
      <View style={styles.rowButtons}>
        <CustomButton
          type={ButtonTypes.SECONDARY}
          onPress={goToRegister}
          title='Regístrate'
        />
        <CustomButton
          type={ButtonTypes.SECONDARY}
          bgColor={theme.colors.primary}
          onPress={goToLogin}
          title='Iniciar sesión'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowButtons: {
    justifyContent: 'space-between',
  },
})
