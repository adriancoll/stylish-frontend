import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { BaseSectionStyles, Section } from './Section'
import { useBusinessLocationGeocode } from '../../../hooks/useBusinessLocationGeocode'
import { useTheme } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import { DELAY } from '../../../constants/animations'
import { LocationCard } from '../../ui/cards/LocationCard/LocationCard'

interface Props {
  lat: number
  lng: number
}

const Location: FC<Props> = ({ lat, lng }) => {
  const { colors } = useTheme()

  const location = useBusinessLocationGeocode({ lat, lng })

  if (!location) (<Text> Cargando </Text>)

  return (
    <Section>
      <Animatable.Text
        animation={'fadeInUp'}
        delay={DELAY + 1000}
        style={[BaseSectionStyles.title, { color: colors.text }]}>
        Dónde encontrarnos
      </Animatable.Text>

      <Animatable.View animation={'fadeInLeft'} delay={DELAY + 1350}>
        <LocationCard
          zip_code={location?.results[0].address_components[6].short_name}
          locality={location?.results[0].address_components[2].short_name}
          city={location?.results[0].address_components[3].long_name}
          street_name={location?.results[0].address_components[1].long_name}
          number={location?.results[0].address_components[0].long_name}
        />
      </Animatable.View>
    </Section>
  )
}

export default Location

const styles = StyleSheet.create({})
