import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import HomeHeader from '../../components/main/home/HomeHeader'
import NextAppointmentBox from '../../components/main/home/NextAppointment/NextAppointmentBox'
import { PopularHairdressers } from '../../components/main/home/PopularHairdressers/PopularHairdressers'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { RootState } from '../../store'
import { getNextAppointment } from '../../store/features/appointments/appointmentActions'
import { getPopularBusiness } from '../../store/features/business/businessActions'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'

type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigator = useNavigation<authScreenProp>()

  const { baseContainer, colors } = useBaseContainer()
  const { user } = useSelector<RootState, UserState>((state) => state.user)

  const handleRefresh = async () => {
    await Promise.all([getPopularBusiness(), getNextAppointment()])
  }

  return (
    <SafeAreaView style={[baseContainer]}>
      <HomeHeader name={user.name} />
      <NextAppointmentBox />
      <PopularHairdressers />
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
  welcomeText: {
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.bold,
    textTransform: 'capitalize',
  },
})
