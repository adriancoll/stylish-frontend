import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { refreshToken } from '../api/auth'
import { getData } from '../utils/asyncStorage'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

export const useTokenValidation = () => {
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
          return
        }
        
        navigator.navigate('Main')
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
