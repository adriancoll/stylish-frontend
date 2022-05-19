import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Pressable,
  useColorScheme,
} from 'react-native'
import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import theme from '../../../../theme/theme'
import { BaseInfoContainer } from '../BaseInfoContainer/BaseInfoContainer'
import { Avatar, Chip, Surface } from '@react-native-material/core'
import { AntDesign } from '@expo/vector-icons'
import { PopularHairdressBox } from './PopularHairdressBox'

interface Props {}

export const PopularHairdressers: FC<Props> = () => {
  return (
    <BaseInfoContainer title='Peluquerías Populares'>
      <ScrollView
        centerContent
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollView]}
        contentContainerStyle={[styles.scrollViewContent]}
        bounces
        pagingEnabled
        horizontal>
        <PopularHairdressBox title='Azarache' subtitle='Quart de poblet' rating={4.5} image='https://www.bing.com/th?id=AMMS_d285a1f71240c09ffc3deed2ad587d1d&w=236&h=183&c=8&rs=1&o=5&pid=3.1&rm=2' />
        <PopularHairdressBox title='Azarache' subtitle='Quart de poblet' rating={4.5} image='https://www.bing.com/th?id=AMMS_d285a1f71240c09ffc3deed2ad587d1d&w=236&h=183&c=8&rs=1&o=5&pid=3.1&rm=2' />
        <PopularHairdressBox title='Azarache' subtitle='Quart de poblet' rating={4.5} image='https://www.bing.com/th?id=AMMS_d285a1f71240c09ffc3deed2ad587d1d&w=236&h=183&c=8&rs=1&o=5&pid=3.1&rm=2' />
        <PopularHairdressBox title='Azarache' subtitle='Quart de poblet' rating={4.5} image='https://www.bing.com/th?id=AMMS_d285a1f71240c09ffc3deed2ad587d1d&w=236&h=183&c=8&rs=1&o=5&pid=3.1&rm=2' />
      </ScrollView>
    </BaseInfoContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  scrollView: {
  },
  scrollViewContent: {
    marginRight: theme.spacing.sm,
  },
})
