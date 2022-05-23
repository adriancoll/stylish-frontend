import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Button } from '@react-native-material/core'
import theme from '../../../../../theme/theme'

interface Props {
  loading?: boolean
}

export const AppointmentCardFooter: FC<Props> = ({ loading = false }) => {
  const { colors } = useTheme()
  const [isFetching, setIsFetching] = useState(false)

  const handlePress = () => {
    setIsFetching(true)

    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  }

  const buttonsLoading = loading || isFetching

  return (
    <View style={[styles.container]}>
      <Button
        variant='text'
        loading={buttonsLoading}
        disabled={buttonsLoading}
        color={colors.text}
        title={() => (<Text style={[styles.button, { color: theme.colors.text_muted}]}>Cancelar</Text>)}
        onPress={handlePress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
  },
})
