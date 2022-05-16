import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import theme from '../../../theme/theme'

interface Props {
  focused: boolean
  name: string
  Icon: JSX.Element
}

export const CustomTabBarIcon: FC<Props> = ({
  focused,
  name,
  Icon = <AntDesign name='question' size={25} color='white' />,
}) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      {Icon}
      <Text
        style={[
          styles.text,
          { color: focused ? theme.colors.primary : theme.colors.text_muted },
        ]}>
        {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: theme.fonts.regular,
    textAlign: 'center',
  },
})
