import React, { FC, useEffect, useRef, useState } from 'react'
import { Alert, Button, Modal, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomButton from '../../ui/CustomButton'

import { useForm } from 'react-hook-form'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { login } from '../../../store/features/user/userActions'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import LoginSchema from '../../../schemas/LoginSchema'
import { Snackbar } from '@react-native-material/core'
import * as Animatable from 'react-native-animatable'

interface FormData {
  email: string
  password: string
}

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export const LoginForm: FC = () => {
  const navigator = useNavigation<authScreenProp>()
  const { params } = useRoute<any>()
  const { colors } = useTheme()
  const [showModal, setShowModal] = useState(false)

  const [errors, setErrors] = useState(false)
  const [message, setMessage] = useState('')
  const buttonRef =
    useRef<Animatable.View & View>() as React.RefObject<Animatable.View & View>

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = ({ email, password }: FormData) => {
    login(email, password)
      .then(() => {
        navigator.dispatch(StackActions.replace('Main'))
      })
      .catch((error) => {
        setErrors(true)
        ToastAndroid.show(error?.response?.data?.message || error?.response?.data?.errors[0].msg, ToastAndroid.LONG);

        if (
          buttonRef.current &&
          typeof buttonRef.current.shake === 'function' 
        ) {
          buttonRef.current.shake(1000)
        }
      })
  }


  useEffect(() => {
    setValue('email', params?.email)
  }, [params])

  return (
    <View style={styles.root}>
      <StyledInput
        keyboardType='email-address'
        control={control}
        name='email'
        autoCapitalize = 'none'
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
      <Animatable.View
        ref={buttonRef}
        easing={'ease-in-cubic'}
        style={{
          marginVertical: theme.spacing.md,
        }}>
        <CustomButton
          bgColor={theme.colors.primary}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          title='Iniciar sesión'
        />
        {/* <LoginGoogleButton /> */}
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  modal: {
    flex: 1,
    alignItems: 'center',
    padding: 100,
  },
})
