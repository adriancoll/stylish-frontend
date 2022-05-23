import { useTheme } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Bounce } from 'react-native-animated-spinkit'
import theme from '../../theme/theme'

export const FullScreenLoader = () => {
  const { colors } = useTheme()
  return (
    <View style={[style.container, { backgroundColor: colors.background }]}>
      <Bounce size={theme.loaderSize.lg} color={theme.colors.primary} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
