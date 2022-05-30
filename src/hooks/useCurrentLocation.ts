import {
  getCurrentPositionAsync,
  LocationObjectCoords,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationObjectCoords>(
    {} as LocationObjectCoords
  )

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

  return location
}
