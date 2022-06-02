import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginAccountText } from '../../components/auth/register/LoginAccountText'
import { RegisterForm } from '../../components/auth/register/RegisterForm'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import theme from '../../theme/theme'
import * as Animatable from 'react-native-animatable'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

const StyledTitle = () => {
  const letters = 'Stylish'.split('')

  return (
    <Animatable.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {letters.map((letter, index) => (
        <Animatable.Text
          key={index}
          useNativeDriver
          delay={200 * index}
          animation={'fadeIn'}
          duration={3000}
          style={[styles.title, { color: theme.colors.primary, fontSize: 52 }]}>
          {letter}
        </Animatable.Text>
      ))}
    </Animatable.View>
  )
}

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
        <Text style={{ ...styles.title, color: colors.text }}>
          Únete al club <StyledTitle />
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
    fontSize: 48,
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
