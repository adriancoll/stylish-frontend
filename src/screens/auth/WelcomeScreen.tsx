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
import { useBaseContainer } from '../../hooks/useBaseContainer'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>
export default function WelcomeScreen() {
  const navigator = useNavigation<authScreenProp>()

  const goToRegister = () => navigator.navigate('Register')
  const goToLogin = () => navigator.navigate('Login')

  const { baseContainer, colors } = useBaseContainer()
  const { isLoading, isValid } = useTokenValidation()

  if (isLoading) {
    return <FullScreenLoader />
  }
  
  return (
    <SafeAreaView
      style={[baseContainer, {backgroundColor: colors.background }]}>
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
      <View>
        <CustomButton
          type={ButtonTypes.WHITE}
          onPress={goToRegister}
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
  textContainer: {
    marginHorizontal: 30,
    marginVertical: 40,
  },
  smallText: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.thin,
    textAlign: 'center',
  },
})
