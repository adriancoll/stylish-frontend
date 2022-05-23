import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginAccountText } from '../../components/auth/register/LoginAccountText'
import { RegisterForm } from '../../components/auth/register/RegisterForm'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

export default function RegisterScreen() {
  const navigator = useNavigation<authScreenProp>()

  const { baseContainer, colors } = useBaseContainer()

  return (
    <SafeAreaView
      style={[
        baseContainer,
        {
          backgroundColor: colors.background,
          justifyContent: 'space-between',
          marginVertical: theme.spacing.md,
        },
      ]}>
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
