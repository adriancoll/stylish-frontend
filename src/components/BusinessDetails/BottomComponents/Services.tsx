import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { BaseSectionStyles, Section } from './Section'
import * as Animatable from 'react-native-animatable'
import { DELAY } from '../../../constants/animations'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import { Business } from '../../../interfaces/user.interface'
import { Chip } from '@react-native-material/core'

interface Props {
  business: Business
}

export const Services: FC<Props> = ({ business }) => {
  const { colors } = useTheme()

  return (
    <View>
      <Section>
        <>
          <Animatable.Text
            animation={'fadeInUp'}
            delay={DELAY + 100}
            style={[BaseSectionStyles.title, { color: colors.text }]}>
            Servicios
          </Animatable.Text>
          <FlatList
            horizontal
            key={'services'}
            keyExtractor={(item) => item.uid}
            data={business.service_types}
            renderItem={({ item }) => (
              <Animatable.View
                key={item.uid}
                animation={'fadeInUp'}
                delay={DELAY + 100}>
                <Chip color={colors.text} style={[styles.chip]} label=''>
                  <Text style={[styles.reviewItemText, { color: colors.text }]}>
                    {item.name}
                  </Text>
                </Chip>
              </Animatable.View>
            )}
          />
        </>
      </Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewText: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular,
    marginBottom: theme.spacing.sm,
  },
  reviewItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    backgroundColor: 'rgba(255, 156, 213, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
    textTransform: 'capitalize',
  },
  reviewItemText: {
    fontSize: theme.fontSizes.body,
  },
})
