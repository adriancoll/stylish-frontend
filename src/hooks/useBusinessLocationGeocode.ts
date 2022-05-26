import { useEffect, useState } from 'react'
import { getData, storeData } from '../utils/asyncStorage'
import Geocoder from 'react-native-geocoding'

type Location = {
  lat: number
  lng: number
}

export const useBusinessLocationGeocode = ({ lat, lng }: Location) => {
  const [location, setLocation] = useState<Geocoder.GeocoderResponse>()
  const checkIfIsStored = async () => {
    const isStored = await getData('geocoding')

    if (isStored) {
        console.log('recuperado de async store')
      return isStored
    }

    Geocoder.init('AIzaSyBwprPGiEeqwP86aoBiSZtHmSGcROJwutM') // use a valid API key

    Geocoder.from({ lat, lng })
      .then((json) => {
        storeData('geocoding', json)
        return json
      })
      .catch((error) => console.warn(error))
  }

  useEffect(() => {
    checkIfIsStored().then((location) => setLocation(location))
  }, [])

  return location
}
