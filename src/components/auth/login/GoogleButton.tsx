import React, { FC } from 'react'
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native'
import { useGoogleOAuth } from '../../../hooks/useGoogleOAuth'
import CustomButton from '../../ui/CustomButton'

interface Props {}

export const LoginGoogleButton: FC<Props> = () => {
  const [request, response, promptAsync] = useGoogleOAuth()

  const login = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    promptAsync()
  }

  return <CustomButton disabled={!request} title='Iniciar sesion con google' onPress={login} />
}
