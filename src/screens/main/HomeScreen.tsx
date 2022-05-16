import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Maps } from '../../components/map/Map'
import CustomButton, { ButtonTypes } from '../../components/ui/CustomButton'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigator = useNavigation<authScreenProp>()

  return (
    <View style={styles.container}>
      <Text>
        La home
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.fonts.bold
  }
})
