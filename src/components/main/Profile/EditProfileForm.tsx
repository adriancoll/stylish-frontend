import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View, Text, ToastAndroid } from 'react-native'
import { useBaseContainer } from '../../../hooks/useBaseContainer'
import { EditUserPayload, User } from '../../../interfaces/user.interface'
import { getSchema } from '../../../schemas/RegisterUserSchema'
import { editUser, registerUser } from '../../../store/features/user/userActions'
import theme from '../../../theme/theme'
import CustomButton, { ButtonTypes } from '../../ui/CustomButton'
import { CustomPhoneInput } from '../../ui/form-inputs/CustomPhoneInput'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { StyledModal } from '../../ui/modals/StyledModal'
import * as Animatable from 'react-native-animatable'
import { ImagePickerResult } from 'expo-image-picker'
import AvatarInput, { ImageFile } from '../../ui/form-inputs/AvatarInput'
import { getEditUserSchema } from '../../../schemas/UpdateUserSchema'
import { editUserAttempt } from '../../../api/user'
import { isEmpty } from 'lodash'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

interface Props {
  user: User
}

export const EditProfileForm: FC<Props> = ({ user }) => {
  const [region, setRegion] = useState('ES')
  const [isSuccess, setIsSuccess] = useState(false)

  const [image, setImage] = useState<any>(null)

  const buttonRef = useRef<Animatable.View & View>() as React.RefObject<
    Animatable.View & View
  >

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<EditUserPayload>({
    mode: 'onChange',
    resolver: yupResolver(getEditUserSchema(region)),
  })

  useEffect(() => {
    reset(user)
  }, [])

  const onSubmit = async (data: EditUserPayload) => {
    try {
      const formData = new FormData()

      if (image) {
        formData.append('file', image)
      }

      Object.keys(data).forEach((value) => {
        if (data[value]) {
          formData.append(value, data[value])
        }
      })

      const res = await editUser(user.uid, formData)

      console.log(res)

      setIsSuccess(true)
    } catch (error) {
      if (!isEmpty(error?.response?.data?.errors)) {
        error?.response?.data?.errors.forEach((value) => {
          ToastAndroid.show(value.msg, ToastAndroid.SHORT)
        })
      } else {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG)
      }

      if (buttonRef.current && typeof buttonRef.current.shake === 'function') {
        buttonRef.current.shake(1000)
      }
    }
  }

  return (
    <View style={styles.container}>
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
        <CustomButton
          type={ButtonTypes.PRIMARY}
          bgColor={theme.colors['primary-light']}
          disabled={!isValid}
          disabledText={'¡Completa todos los campos!'}
          onPress={handleSubmit(onSubmit)}
          title='Editar cuenta'
        />
      </Animatable.View>
      <Text>{JSON.stringify(watch())}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
