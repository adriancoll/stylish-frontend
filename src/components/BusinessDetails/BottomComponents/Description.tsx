import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { BaseSectionStyles, Section } from './Section'
import * as Animatable from 'react-native-animatable'
import { DELAY } from '../../../constants/animations'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'

interface Props {
  name: string | undefined
  description: string | undefined
}

const Description: FC<Props> = ({ name, description }) => {
  const { colors } = useTheme()

  return (
    <View>
      <Section>
        <Animatable.Text
          animation={'fadeInUp'}
          delay={DELAY + 100}
          style={[BaseSectionStyles.title, { color: colors.text }]}>
          {name ? `Sobre ${name}` : ''}
        </Animatable.Text>
        <Animatable.Text
          numberOfLines={4}
          animation={'fadeInUp'}
          delay={DELAY + 200}
          style={[BaseSectionStyles.text, { color: colors.text }]}>
          {description}
        </Animatable.Text>
      </Section>
    </View>
  )
}

export default Description
