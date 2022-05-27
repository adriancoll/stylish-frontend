import { useEffect, useState } from 'react'
import { getData, storeData } from '../utils/asyncStorage'
import Geocoder from 'react-native-geocoding'

type Location = {
  lat: number
  lng: number
}

const GOOGLE_API_TOKEN = 'AIzaSyBwprPGiEeqwP86aoBiSZtHmSGcROJwutM'

export const useBusinessLocationGeocode = ({ lat, lng }: Location) => {
  const [location, setLocation] = useState<Geocoder.GeocoderResponse>()

  const checkIfIsStored = async () => {
    const isStored = await getData('geocoding')

    if (isStored) {
      console.log('[info] Localización recuperada de async store!')
      setLocation(isStored)
      return;
    }

    Geocoder.init(GOOGLE_API_TOKEN)

    console.log('[info] Buscando de google maps API!')
    Geocoder.from({ lat, lng })
      .then(async (json) => {
        console.log('[info] Dirección encontrada, guardando en async store!')
        await storeData('geocoding', json)
        setLocation(json)
        return json
      })
      .catch((error) => console.warn(error))
  }

  useEffect(() => {
    checkIfIsStored()
  }, [])

  return location
}
