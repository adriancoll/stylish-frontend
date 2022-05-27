import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import theme from '../../theme/theme'

import { EditProfileForm } from '../../components/main/Profile/EditProfileForm'
import { User } from '../../interfaces/user.interface'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import { useSelector } from 'react-redux'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>

export default function ProfileScreen() {
  const { baseContainer, colors } = useBaseContainer()

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <SafeAreaView style={[baseContainer]}>
      <EditProfileForm user={user} />
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
  avatar: {
    marginBottom: theme.spacing.sm,
    width: theme.iconSize.xl * 2,
    height: theme.iconSize.xl * 2,
    borderRadius: 100,
  },
})
