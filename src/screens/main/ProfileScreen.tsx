import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Maps } from '../../components/map/Map'
import CustomButton, { ButtonTypes } from '../../components/ui/CustomButton'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>

export default function ProfileScreen() {
  const navigator = useNavigation<authScreenProp>()
  const { baseContainer, colors } = useBaseContainer()

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <SafeAreaView style={[baseContainer]}>
      <Text style={[{ color: colors.text }]}>
        Perfil, {user.name} {user.email}
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.baseContainer,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.fonts.bold,
  },
})
