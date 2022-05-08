import { RootState } from '@store'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../store/features/user/userSlice'
import { LoginResponse, User } from 'interfaces/user.interface'
import { getData, storeData } from '../utils/asyncStorage'
import { useEffect, useState } from 'react'

export default function HomeScreen() {
  const [token, setToken] = useState()

  const { user } = useSelector<RootState, UserState>((state) => state.user)
  const dispatch = useDispatch()

  const handlePress = () => {
    axios
      .post<BaseResponse<LoginResponse>>('/auth/login', {
        email: 'admin2@gmail.com',
        password: '123123',
      })
      .then(async (res) => {
        await storeData('token', res.data.results.token)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData('token').then((token) => {
      setToken(token)
    })
  }, [])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput secureTextEntry={true} style={styles.textInput} />
      </SafeAreaView>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
})
