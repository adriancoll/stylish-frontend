import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import AppointmentForm from '../../components/main/AppointmentForm/AppointmentForm'
import AppointmentFormHead from '../../components/main/AppointmentForm/AppointmentFormHead'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { Business } from '../../interfaces/user.interface'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'

type AppointmentFormScreen = NativeStackNavigationProp<
  RootStackParamList,
  'AppointmentFormScreen'
>

export default function AppointmentFormScreen() {
  const route = useRoute<any>()

  const business = route?.params?.business as Business

  const { baseContainer, colors } = useBaseContainer()

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <SafeAreaView style={[baseContainer]}>
      <AppointmentFormHead user_uri={user.image} business_uri={business.image} />
      <AppointmentForm business={business} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.baseContainer,
    backgroundColor: theme.colors.background,
  },
  text: {
    fontFamily: theme.fonts.bold,
  },
})
