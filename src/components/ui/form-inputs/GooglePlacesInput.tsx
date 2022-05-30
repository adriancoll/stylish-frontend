import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { StyledInput } from './StyledInput'
import { GOOGLE_API_TOKEN } from '../../../hooks/useBusinessLocationGeocode'



const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Dirección...'
      onPress={(data, details = null) => {
        console.log(data, details)
      }}
      query={{
        key: GOOGLE_API_TOKEN,
        language: 'es',
      }}
      textInputProps={{
        InputComp: StyledInput,
        leftIcon: { type: 'font-awesome', name: 'chevron-left' },
        errorStyle: { color: 'red' },
      }}
    />
  )
}

export default GooglePlacesInput
