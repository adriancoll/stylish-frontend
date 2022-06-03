import { useEffect, useState } from 'react'
import { getData, storeData } from '../utils/asyncStorage'
import Geocoder from 'react-native-geocoding'
import { Alert } from 'react-native'
import { GOOGLE_API_TOKEN } from '../utils/constants'

type Location = {
  lat: number
  lng: number
}


/**
 * Gets the data from the business latitude and longitude through the Geocoding Google API, and stores it on AsyncStorage just for the current session.
 * To prevent many requests to the API, the data is stored on AsyncStorage for the current session.
 * @see https://developers.google.com/maps/documentation/geocoding/start
 * @param param0
 * @returns
 */
export const useBusinessLocationGeocode = ({ lat, lng }: Location) => {
  const [location, setLocation] = useState<Geocoder.GeocoderResponse>()

  const checkIfIsStored = async () => {
    Geocoder.init(GOOGLE_API_TOKEN)

    console.log('[info] Buscando en Geocoding API!')
    Geocoder.from({ lat, lng })
      .then(async (json) => {
        console.log('[info] Dirección encontrada!')
        setLocation(json)
        return json
      })
      .catch((error) =>
        Alert.alert('Error', `${JSON.stringify(lat)} = ${JSON.stringify(error)}`)
      )
  }

  useEffect(() => {
    checkIfIsStored()
  }, [])

  return location
}
