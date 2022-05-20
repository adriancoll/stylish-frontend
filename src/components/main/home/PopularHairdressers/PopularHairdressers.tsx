import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Pressable,
  useColorScheme,
  FlatList,
} from 'react-native'
import React, { FC } from 'react'
import theme from '../../../../theme/theme'
import { BaseInfoContainer } from '../BaseInfoContainer/BaseInfoContainer'
import { PopularHairdressBox } from './PopularHairdressBox'

interface Props {}

export const PopularHairdressers: FC<Props> = () => {
  return (
    <BaseInfoContainer title='Peluquerías Populares'>
      <FlatList
        centerContent
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.flatList]}
        contentContainerStyle={[styles.flatListContent]}
        bounces
        pagingEnabled
        data={[
          {
            title: 'Peluqueria 1',
            image: 'https://i.pravatar.cc/300?img',
            rating: 4.5,
            subtitle: 'Ciudad de México',
          },
          {
            title: 'Peluqueria 1',
            image: 'https://i.pravatar.cc/300?img',
            rating: 4.5,
            subtitle: 'Ciudad de México',
          },
          {
            title: 'Peluqueria 1',
            image: 'https://i.pravatar.cc/300?img',
            rating: 4.5,
            subtitle: 'Ciudad de México',
          },
        ]}
        horizontal
        renderItem={({ item, index }) => (
          <PopularHairdressBox key={index} {...item} />
        )}
      />
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
  flatList: {},
  flatListContent: {},
})
