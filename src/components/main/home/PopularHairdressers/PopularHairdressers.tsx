import {
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
  View,
} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import theme from '../../../../theme/theme'
import { BaseInfoContainer } from '../BaseInfoContainer/BaseInfoContainer'
import { PopularHairdressBox } from './PopularHairdressBox'
import { getPopularBusiness } from '../../../../store/features/business/businessActions'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { BusinessState } from '../../../../store/features/business/businessSlice'
import { getNextAppointment } from '../../../../store/features/appointments/appointmentActions'
import { Business } from '../../../../interfaces/user.interface'
import SkeletonLoader from 'expo-skeleton-loader'
import { FullScreenLoader } from '../../../ui/FullScreenLoader'
import { Pulse } from 'react-native-animated-spinkit'
import { useTheme } from '@react-navigation/native'
import { SharedElement } from 'react-navigation-shared-element'
import BusinessDetailsBottomSheet from '../../../BusinessDetails/BusinessDetailsBottomSheet'

const { width, height } = Dimensions.get('screen')

interface Props {}

export const PopularHairdressers: FC<Props> = () => {
  const data = [
    {
      key: 1,
      title: 'Peluqueria 1',
      image: 'https://picsum.photos/200',
      rating: 4.5,
      subtitle: 'Ciudad de México',
    },
  ]

  const { popularBusiness } = useSelector<RootState, BusinessState>(
    (state) => state.business
  )

  const { colors } = useTheme()

  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    getPopularBusiness()
      .catch(() => console.error('Error al obtener los datos'))
      .finally(() => setisLoading(false))
  }, [])

  const handleRefresh = async () => {
    await Promise.all([getPopularBusiness(), getNextAppointment()])
    setTimeout(() => {
      setisLoading(false)
    }, 1000)
  }

  return (
    <>
      <BaseInfoContainer title='Peluquerías Populares'>
        {isLoading ? (
          <View style={[styles.loader, { backgroundColor: colors.background }]}>
            <Pulse size={theme.loaderSize.lg} color={theme.colors.primary} />
          </View>
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={[styles.flatList]}
            columnWrapperStyle={[styles.columnWrapper]}
            bounces
            refreshControl={
              <RefreshControl
                colors={['red', 'yellow']}
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
            }
            data={popularBusiness}
            numColumns={2}
            keyExtractor={(business: Business) => business.uid}
            renderItem={({ item, index }) => (
              <PopularHairdressBox index={index} business={item} />
            )}
          />
        )}
      </BaseInfoContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  flatList: {
    height: height * 0.4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.3,
    width: width - theme.spacing.md * 2,
  },
})