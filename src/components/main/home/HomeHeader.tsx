import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { ActivityIndicator, Avatar, Divider } from '@react-native-material/core'
import theme from '../../../theme/theme'
import { useTheme } from '@react-navigation/native'

interface Props {
  name: string
}

const HomeHeader: FC<Props> = ({ name }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Hola, {name} 👋
        </Text>
      </View>
      <Avatar image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: theme.fonts.extrabold,
    textTransform: 'capitalize',
    marginBottom: theme.spacing.sm
  },
})

export default HomeHeader
