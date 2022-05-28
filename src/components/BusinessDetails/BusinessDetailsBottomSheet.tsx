import { StyleSheet, Dimensions, useColorScheme, View } from 'react-native'
import React, { FC } from 'react'
import * as Animatable from 'react-native-animatable'
import theme from '../../theme/theme'
import { Business } from '../../interfaces/user.interface'
import { useTheme } from '@react-navigation/native'
import { DELAY } from '../../constants/animations'
import Description from './BottomComponents/Description'
import Reviews from './BottomComponents/Reviews'
import Location from './BottomComponents/Location'
import BookAppointmentButton from './BottomComponents/BookAppointmentButton'
import { transform } from 'lodash'
import { ScrollView } from 'react-native-gesture-handler'
import { Services } from './BottomComponents/Services'

const { width, height } = Dimensions.get('screen')

interface Props {
  business?: Business
}

const BusinessDetailsBottomSheet: FC<Props> = ({ business }) => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'

  return (
    <Animatable.View
      animation={'fadeInUpBig'}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        },
      ]}>
      {business && (
        <Animatable.View>
          <ScrollView
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
          <BookAppointmentButton business={business} />
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
    height: height * 0.75,
  },
  scrollView: {
    height: '60%',
  },
})
