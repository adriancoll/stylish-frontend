import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Dimensions, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import BusinessDetailsBottomSheet from '../../components/BusinessDetails/BusinessDetailsBottomSheet'
import HomeHeader from '../../components/main/home/HomeHeader'
import NextAppointmentBox from '../../components/main/home/NextAppointment/NextAppointmentBox'
import { PopularHairdressers } from '../../components/main/home/PopularHairdressers/PopularHairdressers'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { RootState } from '../../store'
import { getNextAppointment } from '../../store/features/appointments/appointmentActions'
import { getPopularBusiness } from '../../store/features/business/businessActions'
import { UserState } from '../../store/features/user/userSlice'
import theme from '../../theme/theme'
import { SharedElement } from 'react-navigation-shared-element'
import { useFloatingNoteReminder } from '../../hooks/useFloatingNoteReminder'
import FloatingNote from '../../components/ui/floating-note/FloatingNote'
import { USER_ROLES } from '../../interfaces/user.interface'

const { height } = Dimensions.get('window')
type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigator = useNavigation<authScreenProp>()

  const { show, setShow } = useFloatingNoteReminder()

  const { baseContainer, colors } = useBaseContainer()
  const { user, isBusiness } = useSelector<RootState, UserState>(
    (state) => state.user
  )

  const isAdmin = user.role === USER_ROLES.ADMIN_ROLE

  const handleRefresh = async () => {
    await Promise.all([getPopularBusiness(), getNextAppointment()])
  }

  const hide = () => {
    setShow(false)
  }

  return (
    <>
      <SafeAreaView
        style={[
          baseContainer,
          { paddingTop: show ? height * 0.08 : theme.spacing.lg },
        ]}>
        {show && <FloatingNote hide={hide} />}
        <HomeHeader
          isBusiness={isBusiness}
          isAdmin={isAdmin}
          uri={user.image}
          name={user.name}
        />
        <NextAppointmentBox />
        <PopularHairdressers />
      </SafeAreaView>
    </>
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
