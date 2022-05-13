import { useTheme } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import theme from '../../theme/theme'

type Props = {
  align?: 'left' | 'center' | 'right'
  children: JSX.Element | string
  color?: string
  fontSize?: number
  fontWeight?: 'bold' | 'normal'
  style?: any
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.body,
    colorPrimary: { color: theme.colors.primary },
    colorSecondary: { color: theme.colors.secondary },
    colorWhite: { color: theme.colors.white },
    fontFamily: 'system-ui, sans-serif',
    textAlignLeft: {
      textAlign: 'left',
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    textAlignRight: {
      textAlign: 'right',
    },
  },
})

export default function StyledText({
  align,
  children,
  color,
  fontSize,
  fontWeight,
  style,
  ...restOfProps
}: Props) {
  const { colors } = useTheme()

  const textStyles = [
    styles.text,
    align === 'left' && styles.text.textAlignLeft,
    align === 'center' && styles.text.textAlignCenter,
    align === 'right' && styles.text.textAlignRight,
    { color: colors.text },
    ...style,
  ]

  return (
    <Text {...restOfProps} style={textStyles}>
      {children}
    </Text>
  )
}
