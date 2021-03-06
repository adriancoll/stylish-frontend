import { StyleSheet, Dimensions, useColorScheme, View } from 'react-native'
import React, { FC } from 'react'
import * as Animatable from 'react-native-animatable'
import theme from '../../theme/theme'
import { Business } from '../../interfaces/business.interface'
import { useTheme } from '@react-navigation/native'
import Description from './BottomComponents/Description'
import Reviews from './BottomComponents/Reviews'
import Location from './BottomComponents/Location'
import BookAppointmentButton from './BottomComponents/BookAppointmentButton'
import { isEmpty } from 'lodash'
import { ScrollView } from 'react-native-gesture-handler'
import { Services } from './BottomComponents/Services'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserState } from '../../store/features/user/userSlice'
import { useTokenValidation } from '../../hooks/useTokenValidation'

const { width, height } = Dimensions.get('screen')

interface Props {
  business?: Business
}

const BusinessDetailsBottomSheet: FC<Props> = ({ business }) => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'

  const { isBusiness, user } = useSelector<RootState, UserState>(
    (state) => state.user
  )

  const { isLoading, isValid } = useTokenValidation(false)


  return (
    <Animatable.View
      useNativeDriver
      animation={'fadeInUpBig'}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? theme.colors.black : colors.background,
          height: isBusiness ? height : height * 0.75,
        },
      ]}>
      {business && (
        <Animatable.View useNativeDriver>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: theme.spacing.lg,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 20,
            }}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <Description
              name={business?.name}
              description={business?.description}
            />
            <Services business={business} />
            <Reviews
              users={business?.total_users_feedback}
              rating={business?.rating}
              stars={business?.total_stars}
              uid={business?.uid}
            />
            <Location lat={business.latitude} lng={business.longitude} />
          </ScrollView>
          {!isBusiness && <BookAppointmentButton disabled={isEmpty(user) || isLoading || !isValid} business={business} />}
        </Animatable.View>
      )}
    </Animatable.View>
  )
}

export default BusinessDetailsBottomSheet

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    width,
    padding: theme.spacing.lg,
  },
  scrollView: {
    height: '60%',
  },
})
