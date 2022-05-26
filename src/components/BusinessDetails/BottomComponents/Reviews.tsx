import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { BaseSectionStyles, Section } from './Section'
import * as Animatable from 'react-native-animatable'
import { DELAY } from '../../../constants/animations'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'
import { Chip } from '@react-native-material/core'
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons'

interface ReviewProps {
  delay: number
  title: string
  children: JSX.Element | JSX.Element[]
}

const ReviewItem: FC<ReviewProps> = ({ delay, title, children }) => {
  const { colors } = useTheme()

  return (
    <Animatable.View
      animation={'fadeInUp'}
      delay={delay}
      style={[styles.reviewItem]}>
      <Text style={[styles.reviewText, { color: colors.text }]}>{title}</Text>
      {children}
    </Animatable.View>
  )
}

interface Props {
  users: number | undefined
  rating: number | undefined
  stars: number | undefined
  uid: string | undefined
}

const Reviews: FC<Props> = ({ users, rating, stars, uid }) => {
  const { colors } = useTheme()

  return (
    <Section>
      <Animatable.Text
        animation={'fadeInUp'}
        delay={DELAY + 300}
        style={[BaseSectionStyles.title, { color: colors.text }]}>
        Opiniones
      </Animatable.Text>

      <Animatable.View style={[styles.container]}>
        <ReviewItem title='Clientes' delay={DELAY + 700}>
          <Chip color={colors.text} style={[styles.chip]} label=''>
            <FontAwesome
              style={{ color: theme.colors.primary, marginRight: 5 }}
              name='users'
              size={theme.iconSize.xs}
              color='black'
            />
            <Text style={[styles.reviewItemText]}>{users}</Text>
          </Chip>
        </ReviewItem>

        <ReviewItem title='Media' delay={DELAY + 1000}>
          <Chip color={colors.text} style={[styles.chip]} label=''>
            <AntDesign
              name='star'
              size={theme.iconSize.xs}
              color='black'
              style={{ color: theme.colors.primary, marginRight: 5 }}
            />
            <Text style={[styles.reviewItemText]}>{rating}</Text>
          </Chip>
        </ReviewItem>

        <ReviewItem title='Estrellas' delay={DELAY + 850}>
          <Chip color={colors.text} style={[styles.chip]} label=''>
            <MaterialCommunityIcons
              style={{ color: theme.colors.primary, marginRight: 5 }}
              name='account-star'
              size={theme.iconSize.xs + 5}
              color='black'
            />
            <Text style={[styles.reviewItemText]}>{stars}</Text>
          </Chip>
        </ReviewItem>
      </Animatable.View>
    </Section>
  )
}

export default Reviews

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
  },
  reviewItemText: {
    color: 'lightgrey',
    fontSize: theme.fontSizes.body,
  },
})
