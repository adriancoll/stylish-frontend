import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FC } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import theme from '../../../theme/theme'

interface Props {}

type authScreenProp = NativeStackNavigationProp<RootStackParamList, any>

export const CreateAccountText: FC<Props> = () => {
  const { colors } = useTheme()
  const navigator = useNavigation<authScreenProp>()

  const goToRegister = () => navigator.navigate('Register')

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: theme.spacing.md,
      }}>
      <Text style={styles.signUpText}>¿No tienes una cuenta? </Text>
      <TouchableHighlight onPress={goToRegister}>
        <Text
          style={{
            ...styles.signUpText,
            color: colors.text,
            fontFamily: theme.fonts.bold,
          }}>
          Crea una ahora
        </Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create<any>({
  signUpText: {
    color: 'grey',
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.thin,
  },
})
