import React, { FC, useEffect, useState } from 'react'
import MapView, {
  CalloutSubview,
  MapViewProps,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
import {
  Alert,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
} from 'react-native'
import {
  getCurrentPositionAsync,
  LocationObjectCoords,
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { isEmpty } from 'lodash'
import { FullScreenLoader } from '../ui/FullScreenLoader'

// Maps
import lightMap from '../../../assets/maps/light.json' // eslint-disable-line
import darkMap from '../../../assets/maps/dark.json' // eslint-disable-line

interface Props extends MapViewProps {}

export const Maps: FC<Props> = ({ ...props }) => {
  const [location, setLocation] = useState<LocationObjectCoords>(
    {} as LocationObjectCoords
  )
  const { height, width } = useWindowDimensions()
  const scheme = useColorScheme()

  /**
   * Traer permisos y coordenadas del usuario
   * @url https://docs.expo.dev/versions/latest/sdk/location/
   */
  useEffect(() => {
    ;(async () => {
      let { status, granted, canAskAgain, expires } =
        await requestForegroundPermissionsAsync()

      if (!granted) {
        if (!canAskAgain) {
          Alert.alert(
            'Error',
            'Debes permitir la localización para ver el mapa'
          )
          return
        }
        await requestForegroundPermissionsAsync()
      }

      let { coords, timestamp: _timestamp } = await getCurrentPositionAsync({})
      setLocation(coords)
    })()
  }, [])

  if (isEmpty(location)) {
    return <FullScreenLoader />
  }

  console.log(scheme)
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      customMapStyle={scheme === 'dark' ? darkMap : lightMap}
      initialRegion={{
        longitude: location.longitude,
        latitude: location.latitude,
        latitudeDelta: 0.9,
        longitudeDelta: 0.4,
      }}
      {...props}>
      <Marker
        image={{ uri: 'https://i.imgur.com/MK4NUzI.png' }}
        coordinate={{
          longitude: location.longitude,
          latitude: location.latitude,
        }}
        onTouchEnd={() => {
          Alert.alert('Hola')
        }}></Marker>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
})
