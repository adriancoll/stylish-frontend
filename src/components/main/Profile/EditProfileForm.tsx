import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AxiosError } from 'axios'
import { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View, Text, ToastAndroid } from 'react-native'
import { EditUserPayload, User } from '../../../interfaces/user.interface'
import { editUser } from '../../../store/features/user/userActions'
import theme from '../../../theme/theme'
import { CustomPhoneInput } from '../../ui/form-inputs/CustomPhoneInput'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import * as Animatable from 'react-native-animatable'
import AvatarInput from '../../ui/form-inputs/AvatarInput'
import { getEditUserSchema } from '../../../schemas/UpdateUserSchema'
import { isEmpty } from 'lodash'
import TouchableScale from 'react-native-touchable-scale'
import { ActivityIndicator } from '@react-native-material/core'
import { AntDesign } from '@expo/vector-icons'

type profileScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>

interface Props {
  user: User
}

export const EditProfileForm: FC<Props> = ({ user }) => {
  const [region, setRegion] = useState('ES')
  const [isSuccess, setIsSuccess] = useState(false)
  const navigator = useNavigation<profileScreenNavigation>()
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme()

  const [image, setImage] = useState<any>(null)

  const buttonRef = useRef<Animatable.View & View>() as React.RefObject<
    Animatable.View & View
  >

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<EditUserPayload>({
    mode: 'onChange',
    resolver: yupResolver(getEditUserSchema(region)),
  })

  useEffect(() => {
    reset(user)
  }, [])

  const onSubmit = async (data: EditUserPayload) => {
    if (!image && !isDirty) return


    setIsSuccess(false)
    try {
      setIsLoading(true)
      const formData = new FormData()

      if (image) {
        formData.append('file', image)
      }

      // fill form data with form inputs
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      )

      await editUser(user.uid, formData)

      setIsLoading(false)
      setIsSuccess(true)

      setTimeout(() => {
        setIsSuccess(false)
        reset(user)
      }, 2000)
    } catch (err) {
      const error = err as AxiosError<BaseErrorResponse>
      console.log(error)
      setIsLoading(false)

      if (!isEmpty(error?.response?.data?.errors)) {
        error?.response?.data?.errors.forEach((value) => {
          ToastAndroid.show(value.msg, ToastAndroid.SHORT)
        })
      } else {
        ToastAndroid.show(
          error?.response?.data?.message ??
            'Error desconocido, contacta a un administrador.',
          ToastAndroid.LONG
        )
      }

      if (buttonRef.current && typeof buttonRef.current.shake === 'function') {
        buttonRef.current.shake(1000)
      }
    }
  }

  const getBackgroundColor = () => {
    if (isSuccess) return theme.colors.success
    if (isValid) return colors.primary

    return theme.colors.grey
  }

  return (
    <View>
      <AvatarInput
        setImage={setImage}
        uri={image ? image.uri : user.image}
        label={user.name}
      />

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
        autoCapitalize='none'
        name='email'
        placeholder='Introduce tu dirección de correo'
      />
      <StyledInput
        label='Contraseña'
        control={control}
        name='password'
        placeholder='Minimo 6 carácteres (Opcional)'
        secureTextEntry
      />
      <CustomPhoneInput
        placeholder='Introduce tu número de teléfono'
        control={control}
        setRegion={setRegion}
        value={user.phone_number}
        label='Número de teléfono'
        name='phone_number'
      />
      <Animatable.View
        ref={buttonRef}
        style={{
          marginVertical: theme.spacing.md,
        }}>
        <TouchableScale disabled={!isValid} onPress={handleSubmit(onSubmit)}>
          <Animatable.View
            transition={['backgroundColor']}
            style={[
              styles.button,
              {
                flexDirection: 'row',
                opacity: isLoading || !isValid ? 0.5 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: getBackgroundColor(),
              },
            ]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: theme.spacing.md,
              }}>
              {isLoading && (
                <ActivityIndicator size='small' color={colors.text} />
              )}
              {isSuccess && (
                <AntDesign name='check' size={24} color={colors.text} />
              )}
            </View>

            <Text style={[styles.text, { color: colors.text }]}>
              {isSuccess
                ? 'Guardado correctamente'
                : isLoading
                ? 'Guardando...'
                : isValid
                ? 'Guardar cambios'
                : 'Completa los campos requeridos'}
            </Text>
          </Animatable.View>
        </TouchableScale>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  button: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
  },
})
