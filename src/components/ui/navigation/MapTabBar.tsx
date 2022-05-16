import { FontAwesome } from '@expo/vector-icons'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
import { Children, FC } from 'react'
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../../../theme/theme'

interface Props {
    onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
}

export const MapTabBar: FC<Props> = ({ children, onPress }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    top: -30,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
  },
})
