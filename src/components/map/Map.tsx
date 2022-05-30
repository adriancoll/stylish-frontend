import React, { FC, useEffect, useRef, useState } from 'react'
import MapView, {
  CalloutSubview,
  Circle,
  MapViewProps,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
import {
  Alert,
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native'
import {
  getCurrentPositionAsync,
  LocationObjectCoords,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { isEmpty } from 'lodash'
import { MaterialIcons } from '@expo/vector-icons'

// loading
import LottieView from 'lottie-react-native'

// Maps
import lightMap from '../../../assets/maps/light.json'
import darkMap from '../../../assets/maps/dark.json'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { MapOverlay } from './Overlay/MapOverlay'
import { Business } from '../../interfaces/user.interface'
import BusinessMarker from './Markers/BusinessMarker'
import { useCurrentLocation } from '../../hooks/useCurrentLocation'

interface Props extends MapViewProps {
  businesses: Business[]
}

export const Maps: FC<Props> = ({ businesses, ...props }) => {
  const location = useCurrentLocation()

  const { height, width } = useWindowDimensions()
  const scheme = useColorScheme()

  const { baseContainer, colors } = useBaseContainer()

  

  if (isEmpty(location)) {
    return (
      <View
        style={{
          width: width + 10,
          height: height,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          autoPlay
          speed={0.6}
          resizeMode='cover'
          style={{
            width: width * 0.5,
            height: height * 0.5,
            // marginTop: height * 0.1,
            alignSelf: 'center',
          }}
          source={
            scheme === 'dark'
              ? require(`../../../assets/lotties/loading-map-dark.json`)
              : require(`../../../assets/lotties/loading-map-light.json`)
          }
        />
      </View>
    )
  }

  return (
    <>
      <MapView
        style={[StyleSheet.absoluteFillObject, styles.map]}
        userLocationUpdateInterval={2000}
        provider={'google'}
        showsUserLocation
        showsCompass={false}
        loadingEnabled
        customMapStyle={scheme === 'dark' ? darkMap : lightMap}
        initialRegion={{
          longitude: location.longitude,
          latitude: location.latitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.4,
        }}
        region={{
          longitude: location.longitude,
          latitude: location.latitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.4,
        }}
        {...props}>
        {businesses.map((business) => (
          <BusinessMarker business={business} key={business.uid} />
        ))}
      </MapView>
      <MapOverlay />
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    borderRadius: 10,
  },
})
