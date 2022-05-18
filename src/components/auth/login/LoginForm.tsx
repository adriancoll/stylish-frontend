import React, { FC, useEffect, useState } from 'react'
import { Alert, Button, Modal, StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomButton, { ButtonTypes } from '../../ui/CustomButton'

import { useForm } from 'react-hook-form'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { login } from '../../../store/features/user/userActions'
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import LoginSchema from '../../../schemas/LoginSchema'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { LoginGoogleButton } from './GoogleButton'

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
        navigator.navigate('Main')
      })
      .catch((err) => {
        Alert.alert('Error', JSON.stringify(err))
      })
  }

  useEffect(() => {
    setValue('email', params?.email)
  }, [params])

  return (
    <View style={styles.root}>
      <Modal animationType='slide' transparent={false} visible={showModal}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <Text
            style={{
              color: Colors.text,
            }}>
            Modal is open!
          </Text>
          <Button
            title='Click To Close Modal'
            onPress={() => {
              setShowModal(!showModal)
            }}
          />
        </View>
      </Modal>

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
          marginVertical: theme.spacing.md,
        }}>
        <CustomButton
          bgColor={theme.colors.primary}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          title='Iniciar sesión'
        />
        {/* <LoginGoogleButton /> */}
      </View>
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
