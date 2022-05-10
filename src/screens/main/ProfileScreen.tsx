import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import CustomButton, { ButtonTypes } from '../../components/ui/CustomButton'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>

export default function ProfileScreen() {
  const navigator = useNavigation<authScreenProp>()

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <View style={styles.container}>
      {/*  aqui va una img */}
      <Text>Bienvenido a Stylish, {user.name}</Text>
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
  rowButtons: {
    justifyContent: 'space-between',
  },
})
