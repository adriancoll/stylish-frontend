import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomButton, { ButtonTypes } from '../../ui/CustomButton'

import { useForm } from 'react-hook-form'
import { StyledInput } from '../../ui/TextInput'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ser un email válido')
    .required('Debe ingresar un email'),
  password: Yup.string()
    .min(6, 'Debe tener al menos 6 caracteres')
    .required('Debe ingresar una contraseña'),
})

export const LoginForm: FC = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <View style={styles.root}>
      <StyledInput
        keyboardType='email-address'
        control={control}
        name='email'
        placeholder='john@stylish.com'
      />
      <StyledInput
        control={control}
        name='password'
        secureTextEntry
      />
      <CustomButton
        type={ButtonTypes.PRIMARY}
        bgColor='#3B71F3'
        fgColor='#000'
        onPress={handleSubmit(onSubmit)}
        title='Iniciar sesión'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
})
