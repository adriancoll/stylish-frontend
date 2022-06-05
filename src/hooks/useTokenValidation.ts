import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native'
import { refreshToken } from '../api/auth'
import { clearAllData, getData } from '../utils/asyncStorage'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

export const useTokenValidation = (redirect = true) => {
  const [token, setToken] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigator = useNavigation<authScreenProp>()

  useEffect(() => {
    const fetchToken = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const oldToken = await getData('token')
        if (!oldToken) {
          setIsLoading(false)
          setIsValid(false)
          return
        }

        const validToken = await refreshToken()

        if (!validToken) {
          setIsLoading(false)
          setIsValid(false)
          ToastAndroid.show('Tu sesión ha caducado.', ToastAndroid.SHORT)
          navigator.dispatch(StackActions.replace('Welcome'))
          return
        }

        if (redirect) {
          navigator.dispatch(StackActions.replace('Main'))
        }

        setToken(token)
        setIsValid(true)
      } catch (error) {
        setError(error as any)
      }

      setIsLoading(false)
    }

    setTimeout(() => {
      fetchToken()
    }, 1000)
  }, [])

  return { token, isValid, isLoading, error }
}
