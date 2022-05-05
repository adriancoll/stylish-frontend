import { RootState } from '@store'
import { StatusBar } from 'expo-status-bar'
import { useAppDispatch } from 'hooks/redux'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, UserState } from '../store/features/user/userSlice'

export default function HomeScreen() {
  const { user } = useSelector<RootState, UserState>((state) => state.user)
  const dispatch = useDispatch()

  const handlePress = () => {
    dispatch(
      setUser({
        name: 'asdasd',
        phoneNumber: 'string',
        email: 'test@asd.asd',
        image: 'string',
        role: 'BUSINESS_ROLE',
        status: true,
        google: true,
        uid: 'asdasd',
      })
    )
  }

  return (
    <View style={styles.container}>
      <Text onPress={handlePress}>{user.email}</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
