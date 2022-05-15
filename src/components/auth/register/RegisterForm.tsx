import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View, Text } from 'react-native'
import { RegisterUserPayload } from '../../../interfaces/user.interface'
import { getSchema } from '../../../schemas/RegisterUserSchema'
import { registerUser } from '../../../store/features/user/userActions'
import theme from '../../../theme/theme'
import CustomButton, { ButtonTypes } from '../../ui/CustomButton'
import { CustomPhoneInput } from '../../ui/form-inputs/CustomPhoneInput'
import { StyledInput } from '../../ui/form-inputs/StyledInput'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

export const RegisterForm = () => {
  const { colors } = useTheme()
  const [region, setRegion] = useState('ES')

  const { navigate } = useNavigation<authScreenProp>()

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<RegisterUserPayload>({
    mode: 'onSubmit',
    resolver: yupResolver(getSchema(region)),
  })

  const onSubmit = async (data: RegisterUserPayload) => {
    try {
      const email = await registerUser(data)
      navigate('Login', { email: email as string })
    } catch (error) {
    }
  }

  return (
    <View style={styles.container}>
      <StyledInput
        label='Nombre y apellidos'
        control={control}
        name='name'
        placeholder='Introduce tu nombre y apellidos'
      />
      <StyledInput
        keyboardType='email-address'
        label='Email'
        control={control}
        name='email'
        placeholder='Introduce tu dirección de correo'
      />
      <StyledInput
        label='Contraseña'
        control={control}
        name='password'
        placeholder='Minimo 6 caracteres'
        secureTextEntry
      />
      <CustomPhoneInput
        placeholder='Introduce tu número de teléfono'
        control={control}
        setRegion={setRegion}
        label='Número de teléfono'
        name='phone_number'
      />
      <View
        style={{
          marginVertical: theme.spacing.md,
        }}>
        <CustomButton
          type={ButtonTypes.PRIMARY}
          bgColor={theme.colors.accent}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          title='Crear cuenta'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
