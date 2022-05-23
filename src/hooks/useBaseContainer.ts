import { useTheme } from '@react-navigation/native'
import theme from '../theme/theme'

export const useBaseContainer = (hasPadding = true) => {
  const { colors } = useTheme()

  const baseContainer = [
    { ...theme.baseContainer, padding: hasPadding ? theme.spacing.lg : 0 },
    {
      backgroundColor: colors.background,
    },
  ]

  return {
    colors,
    baseContainer,
  }
}
