import { useTheme } from '@react-navigation/native'
import theme from '../theme/theme'


export const useBaseContainer = (hasPadding = true) => {
  const { colors } = useTheme()

  const baseContainer = [
    hasPadding ? { ...theme.baseContainer } : { flex: 1 },
    {
      backgroundColor: colors.background,
    },
  ]

  return {
    colors,
    baseContainer,
  }
}
