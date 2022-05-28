import { Image, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Marker } from 'react-native-maps'
import { Business } from '../../../interfaces/user.interface'
import theme from '../../../theme/theme'
import { Entypo } from '@expo/vector-icons'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SharedElement } from 'react-navigation-shared-element'

interface MarkerProps {
  business: Business
}

type mapScreenProp = NativeStackNavigationProp<RootStackParamList, 'Map'>

const BusinessMarker: FC<MarkerProps> = ({ business }) => {
  const { colors } = useTheme()
  const navigator = useNavigation<mapScreenProp>()

  return (
    <>
      <Marker
        style={{ margin: theme.spacing.xl }}
        onPress={() => {
          navigator.navigate('BusinessDetails', { business })
        }}
        coordinate={{
          latitude: business.latitude,
          longitude: business.longitude,
        }}>
        <Entypo name='location-pin' size={64} color={theme.colors.primary} />
        <SharedElement  style={styles.avatar} id={`business.${business.uid}.image`}>
          <Image source={{ uri: business.image }} style={styles.avatar} />
        </SharedElement>
      </Marker>
    </>
  )
}

export default BusinessMarker

const styles = StyleSheet.create({
  avatar: {
    borderRadius: theme.borderRadius.full,
    width: 23,
    height: 23,
    position: 'absolute',
    left: '50%',
    top: 7,
    transform: [{ translateX: -23 / 2 }],
  },
})
