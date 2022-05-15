import React, { FC, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomButton, { ButtonTypes } from '../../ui/CustomButton'

import { useForm } from 'react-hook-form'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { login } from '../../../store/features/user/userActions'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import LoginSchema from '../../../schemas/LoginSchema'



interface FormData {
  email: string
  password: string
}

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>
type params = NativeStackScreenProps<RootStackParamList, 'Login', 'Login'>;

export const LoginForm: FC = () => {
  const navigator = useNavigation<authScreenProp>()
  const { params } = useRoute();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = ({ email, password }: FormData) => {
    login(email, password)
      .then(() => {
        navigator.navigate('Profile')
      })
      .catch((err) => {
        Alert.alert('Error', JSON.stringify(err))
      })
  }

  // useEffect(() => {
  //   if (!email) return

  //   setValue('email', email)
  
  // }, [email])
  

  return (
    <View style={styles.root}>
      <StyledInput
        keyboardType='email-address'
        control={control}
        name='email'
        placeholder='john@stylish.com'
        label='Email'
      />
      <StyledInput
        label='Contraseña'
        control={control}
        name='password'
        placeholder='Introduce tu contraseña'
        secureTextEntry
      />
      <View
      style={{
        marginVertical: theme.spacing.md
      }}
        >
        <CustomButton
          type={ButtonTypes.PRIMARY}
          bgColor={theme.colors.accent}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          title='Iniciar sesión'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
})
