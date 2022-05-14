import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { LoginAccountText } from '../../components/auth/register/LoginAccountText'
import { RegisterForm } from '../../components/auth/register/RegisterForm'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

export default function RegisterScreen() {
  const navigator = useNavigation<authScreenProp>()

  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
        justifyContent: 'space-between',
        marginVertical: theme.spacing.md,
        flex: 1
      }}>
      <View>
        <Text style={{ ...styles.title, color: colors.text }}></Text>
        <Text style={{ ...styles.subtitle, color: colors.text }}>
          ¡Bienvenido/a, te hemos echado de menos!
        </Text>
        <RegisterForm />
      </View>
      <LoginAccountText />
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
