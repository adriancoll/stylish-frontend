import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { AppointmentTabs } from '../../navigation/AppointmentTabs'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Appointments'
>

export default function AppointmentsScreen() {
  const navigator = useNavigation<authScreenProp>()
  const { baseContainer, colors } = useBaseContainer(false)

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <AppointmentTabs />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.bold,
  },
})
