import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import theme from '../../../theme/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const BackArrow = () => {
  const { colors } = useTheme()
  const { goBack } = useNavigation()

  const handlePress = () => goBack();

  return (
    <View style={[styles.container]}>
      <Pressable onPress={handlePress} >
        <AntDesign name='back' size={30} color={colors.border} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
})
