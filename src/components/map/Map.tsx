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
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { isEmpty } from 'lodash'
import { MaterialIcons } from '@expo/vector-icons'

// loading
import LottieView from 'lottie-react-native'

// Maps
import lightMap from '../../../assets/maps/light.json'
import darkMap from '../../../assets/maps/dark.json'
import theme from '../../theme/theme'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import { MapOverlay } from './Overlay/MapOverlay'
import { BackArrow } from './Overlay/BackArrow'

interface Props extends MapViewProps {}

export const Maps: FC<Props> = ({ ...props }) => {
  const [location, setLocation] = useState<LocationObjectCoords>(
    {} as LocationObjectCoords
  )
  const { height, width } = useWindowDimensions()
  const scheme = useColorScheme()

  const { baseContainer, colors } = useBaseContainer()

  /**
   * Traer permisos y coordenadas del usuario
   * @url https://docs.expo.dev/versions/latest/sdk/location/
   */
  useEffect(() => {
    ;(async () => {
      let {
        status: _status,
        granted,
        canAskAgain,
        expires,
      } = await requestForegroundPermissionsAsync()

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
    return (
      <View
        style={{
          width: width + 10,
          height: height,
        }}>
        <LottieView
          autoPlay
          speed={0.6}
          resizeMode='cover'
          style={{
            width: width * 0.5,
            height: height * 0.5,
            marginTop: height * 0.1,
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
      <StatusBar
        animated={true}
        backgroundColor='#61dafb'
        showHideTransition={'slide'}
        hidden={true}
      />
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
          // image={{ uri: 'https://i.imgur.com/MK4NUzI.png' }}

          coordinate={{
            longitude: location.longitude,
            latitude: location.latitude,
          }}
          onTouchEnd={() => {
            console.log('asda')
            Alert.alert('Hola')
          }}>
          <MaterialIcons name='person-pin' size={35} color={colors.primary} />
        </Marker>
      </MapView>
      <MapOverlay />
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
})
