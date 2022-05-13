import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import CustomButton, { ButtonTypes } from '../../components/ui/CustomButton'
import { useTokenValidation } from '../../hooks/useTokenValidation'
import theme from '../../theme/theme'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { ImageChanging } from '../../components/auth/welcome/ImageChanging'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>
export default function WelcomeScreen() {
  const { isLoading } = useTokenValidation()
  const navigator = useNavigation<authScreenProp>()

  const goToRegister = () => navigator.navigate('Register')
  const goToLogin = () => navigator.navigate('Login')

  const { colors } = useTheme()

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}>
      <ImageChanging />

      <View
        style={{ ...styles.textContainer, backgroundColor: colors.background }}>
        <Text
          style={{
            fontSize: theme.fontSizes.heading,
            fontFamily: theme.fonts.bold,
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: theme.spacing.md,
            color: colors.text,
          }}>
          Descubre la belleza en tu ciudad
        </Text>
        <Text
          style={{
            ...styles.smallText,
            color: colors.text,
          }}>
          Hay miles de centros esperándote
        </Text>
        <Text
          style={{
            ...styles.smallText,
            color: colors.text,
          }}>
          ¿A qué esperas?
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
  smallText: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.thin,
    textAlign: 'center',
  },
})
