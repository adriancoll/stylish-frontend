import { StyleSheet, Text, View, Dimensions, RefreshControl, ToastAndroid } from 'react-native'
import React, { FC, useState } from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import * as Animated from 'react-native-animatable'
import { ScrollView } from 'react-native-gesture-handler'
import { AxiosError } from 'axios'
import { getMyAppointments } from '../../../store/features/appointments/appointmentActions'

const { width, height } = Dimensions.get('screen')

interface Props {
  label: string
}

const EmptyAppointmentList: FC<Props> = ({ label }) => {
  const { colors } = useTheme()
  const [isLoading, setisLoading] = useState<boolean>(false)

  const handleRefreshTabs = async () => {
    try {
      setisLoading(true)
      await getMyAppointments();
      setisLoading(false)
    } catch (err) {
      const error = err as AxiosError<BaseErrorResponse>;
      if (error.response && error.response.data.error) {
        ToastAndroid.show(error.response?.data.message, ToastAndroid.LONG);
      }
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary, theme.colors.grey]}
          refreshing={isLoading}
          onRefresh={handleRefreshTabs}
        />
      }
      showsVerticalScrollIndicator={false}>
      <Animated.View
        animation={'fadeInDown'}
        useNativeDriver
        duration={1500}
        style={styles.emptyContainer}>
        <AnimatedLottieView
          source={require('../../../../assets/lotties/empty-appointments-2.json')}
          autoPlay
          loop
          speed={0.5}
          style={{
            height: width,
            alignSelf: 'flex-start',
          }}
          resizeMode='cover'
        />
        <Text style={[styles.text, { color: colors.text, width: width * 0.7 }]}>
          No tienes ninguna reserva en el apartado{' '}
          <Text
            style={[
              styles.text,
              { fontFamily: theme.fonts.bold, color: colors.text },
            ]}>
            {label}
          </Text>
        </Text>
      </Animated.View>
    </ScrollView>
  )
}

export default EmptyAppointmentList

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.lg,
    textAlign: 'center',
  },
})
