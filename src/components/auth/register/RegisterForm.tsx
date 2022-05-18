import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View, Text } from 'react-native'
import { RegisterUserPayload, User } from '../../../interfaces/user.interface'
import { getSchema } from '../../../schemas/RegisterUserSchema'
import { registerUser } from '../../../store/features/user/userActions'
import theme from '../../../theme/theme'
import CustomButton, { ButtonTypes } from '../../ui/CustomButton'
import { CustomPhoneInput } from '../../ui/form-inputs/CustomPhoneInput'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { StyledModal } from '../../ui/modal/StyledModal'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

interface Props {}

const RegisterSuccessfullModal = () => {
  const { colors } = useTheme()

  return (
    <Text
      style={{
        color: colors.text,
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSizes.subHeading
      }}>
      ¡Ahora formas parte del club Stylish!
    </Text>
  )
}

export const RegisterForm: FC<Props> = () => {
  const { colors } = useTheme()
  const [region, setRegion] = useState('ES')
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState<string>('')

  const { navigate } = useNavigation<authScreenProp>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<RegisterUserPayload>({
    mode: 'onChange',
    resolver: yupResolver(getSchema(region)),
  })

  const onSubmit = async (data: RegisterUserPayload) => {
    const email = await registerUser(data)
    reset()
    setEmail(email)
    setIsSuccess(true)
  }

  const goToLogin = () => navigate('Login', { email: email as string })

  return (
    <View style={styles.container}>
      <StyledModal
        title='Cuenta creada 🥳'
        animationIn={'tada'}
        confirmText='Iniciar sesión'
        callback={goToLogin}
        closeModal={setIsSuccess}
        isVisible={isSuccess}>
        <RegisterSuccessfullModal />
      </StyledModal>

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
          bgColor={theme.colors['primary-light']}
          disabled={!isValid}
          disabledText={'¡Completa todos los campos!'}
          onPress={handleSubmit(onSubmit)}
          title='¡Crear cuenta!'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
