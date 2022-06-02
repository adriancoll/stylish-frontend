import { useEffect, useState } from 'react'
import { getData, storeData } from '../utils/asyncStorage'
import Geocoder from 'react-native-geocoding'
import { Alert } from 'react-native'

type Location = {
  lat: number
  lng: number
}

export const GOOGLE_API_TOKEN = 'AIzaSyAqqyvFETFg3P3T6bvW3Adt8yO_RlG5-N4'

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
    const isStored = await getData('geocoding')

    if (isStored) {
      console.log('[info] Localización recuperada de async store!')
      setLocation(isStored)
      return
    }

    Geocoder.init(GOOGLE_API_TOKEN)

    console.log('[info] Buscando de google maps API!')
    Geocoder.from({ lat: parseFloat(`${lat}`), lng: parseFloat(`${lng}`) })
      .then(async (json) => {
        console.log('[info] Dirección encontrada, guardando en async store!')
        await storeData('geocoding', json)
        setLocation(json)
        return json
      })
      .catch((error) =>
        Alert.alert('Error', `${JSON.stringify(lat)} = ${error.message}`)
      )
  }

  useEffect(() => {
    checkIfIsStored()
  }, [])

  return location
}
