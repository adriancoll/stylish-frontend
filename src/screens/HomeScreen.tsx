import { RootState } from '@store'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { UserState } from 'store/features/user/userSlice'

export default function HomeScreen() {
  const { user } = useSelector<RootState, UserState>((state) => state.user)
  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>
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
