import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import CustomButton, { ButtonTypes } from '../../components/ui/CustomButton'
import { useTokenValidation } from '../../hooks/useTokenValidation'
import theme from '../../theme/theme'
import { FullScreenLoader } from '../../components/ui/FullScreenSpinner'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { ImageChanging } from '../../components/auth/welcome/ImageChanging'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>
export default function WelcomeScreen() {
  const { isLoading } = useTokenValidation()
  const navigator = useNavigation<authScreenProp>()

  const goToRegister = () => navigator.navigate('Register')
  const goToLogin = () => navigator.navigate('Login')

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageChanging />

      <View style={styles.textContainer}>
        <Text
          style={{
            fontSize: theme.fontSizes.heading,
            fontFamily: theme.fonts.bold,
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: theme.spacing.md,
          }}>
          Encuentra el mejor servicio de estética
        </Text>
        <Text
          style={{
            fontSize: theme.fontSizes.subHeading,
            fontFamily: theme.fonts.thin,
            textAlign: 'center',
          }}>
          Encuentra estética en todo el país
        </Text>
      </View>
      <View style={{}}>
        <CustomButton
          type={ButtonTypes.WHITE}
          onPress={goToRegister}
          customStyle={{
            padding: theme.spacing.sm,
          }}
          title='¡Regístrate!'
        />
        <CustomButton
          type={ButtonTypes.WHITE}
          onPress={goToLogin}
          title='Iniciar sesión'
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { ...theme.baseContainer, padding: 0 },
  textContainer: {
    marginHorizontal: 30,
    marginVertical: 50,
  },
})
