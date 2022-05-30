import React, { FC, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_TOKEN } from '../../../hooks/useBusinessLocationGeocode'
import { Entypo } from '@expo/vector-icons'
import { Control, Controller } from 'react-hook-form'
import { StyleSheet, Text } from 'react-native'
import theme from '../../../theme/theme'
import { useCurrentLocation } from '../../../hooks/useCurrentLocation'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useTheme } from '@react-navigation/native'
import { color } from 'react-native-reanimated'
import { View } from 'react-native-animatable'

const DEBOUNCE = 300

interface Props {
  control: Control<any>
  name: string
  label: string
}

const GooglePlacesInput: FC<Props> = ({ control, name, label }) => {
  const location = useCurrentLocation()
  const { colors } = useTheme()

  useEffect(() => {}, [location])

  return (
    <View style={{ marginVertical: theme.spacing.sm }}>
      <Text style={{ ...styles.label, color: colors.text }}>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field }, fieldState: { error }, formState: {  } }) => (
          <GooglePlacesAutocomplete
            fetchDetails
            renderLeftButton={() => (
              <Entypo
                style={{ justifyContent: 'center', alignSelf: 'center' }}
                name='address'
                size={24}
                color={error ? theme.colors.error : colors.border}
              />
            )}
            predefinedPlaces={[
              {
                description: 'Dirección actual',
                geometry: {
                  location: { lat: location.latitude, lng: location.longitude },
                },
              },
            ]}
            debounce={DEBOUNCE}
            placeholder='Dirección de la empresa'
            textInputProps={{
              errorStyle: { color: 'red' },
              placeholderTextColor: theme.colors.text_muted,
            }}
            styles={{
              container: { flex: 0, backgroundColor: colors.background },
              textInput: {
                backgroundColor: colors.background,
                color: colors.text,
              },
              description: {
                fontWeight: 'bold',
              },
              listView: {
                backgroundColor: colors.background,
                borderRadius: theme.borderRadius.md,
              },
              textInputContainer: {
                marginVertical: theme.spacing.sm,
                borderWidth: 1,
                borderColor: error ? 'red' : colors.border,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                marginBottom: theme.spacing.md,
              },
            }}
            query={{
              key: GOOGLE_API_TOKEN,
              language: 'es',
            }}
            onPress={(_data, details = null) => {
              if (details) {
                const { lat, lng } = details?.geometry.location
                onChange({
                  latitude: lat,
                  longitude: lng,
                })
              }
            }}
          />
        )}
      />
    </View>
  )
}

export default GooglePlacesInput

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',

    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
    fontFamily: theme.fonts.thin,
  },
  label: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular,
  },
})
