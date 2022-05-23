import {
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import React, { FC } from 'react'
import theme from '../../../../theme/theme'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
const { width, height } = Dimensions.get('screen')

import AnimatedLottieView, {
  AnimatedLottieViewProps,
} from 'lottie-react-native'
import { Button, Stack } from '@react-native-material/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface Props {
  text: string
}

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export const EmptyView: FC<Props & AnimatedLottieViewProps> = ({
  text,
  source,
}) => {
  const isDark = useColorScheme() === 'dark'
  const { colors } = useTheme()
  const navigator = useNavigation<homeScreenProp>()

  return (
    <Stack
      direction='row'
      spacing={5}
      radius={theme.borderRadius.md}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? theme.colors.black : theme.colors.white,
        },
      ]}>
      <AnimatedLottieView
        autoPlay
        speed={0.3}
        resizeMode='cover'
        style={{
          width: width * 0.4,
        }}
        source={source}
      />
      <View style={[styles.contianerSecondary]}>
        <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
        <Button
          title='Ir al mapa'
          onPress={() => {
            navigator.navigate('Map')
          }}
          color={theme.colors.primary}
          titleStyle={{ color: theme.colors.white }}
          trailing={(props) => (
            <Ionicons color={theme.colors.white} name='ios-arrow-forward' size={22} />
          )}
        />
      </View>
    </Stack>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.sm,
    width: '100%',
  },
  text: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular,
    marginBottom: theme.spacing.md,
  },
  contianerSecondary: {
    justifyContent: 'space-evenly',
  },
})
