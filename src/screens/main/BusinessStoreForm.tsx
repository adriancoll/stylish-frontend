import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import theme from '../../theme/theme'

import { EditProfileForm } from '../../components/main/Profile/EditProfileForm'
import { User } from '../../interfaces/user.interface'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import { useSelector } from 'react-redux'
import GooglePlacesInput from '../../components/ui/form-inputs/GooglePlacesInput'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'BusinessStoreForm'>

export default function BusinessStoreForm() {
  const { baseContainer, colors } = useBaseContainer()

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return <SafeAreaView style={[baseContainer]}>
    <GooglePlacesInput />
  </SafeAreaView>
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
