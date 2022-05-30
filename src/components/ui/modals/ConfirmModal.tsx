import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import React, { FC } from 'react'
import Modal from 'react-native-modal'
import theme from '../../../theme/theme'
import { useBaseContainer } from '../../../hooks/useBaseContainer'
import LottieView from 'lottie-react-native'

interface Props {
  isVisible: boolean
  animationInTiming?: number
  subtitle: string
  title: string
  confirmCallback : () => void,
  closeCallback : () => void,
}

const { width, height } = Dimensions.get('screen')

export const ConfirmModal: FC<Props> = ({
  isVisible,
  animationInTiming = 1500,
  title = '¿Estás seguro/a?',
  subtitle = '',
  confirmCallback,
  closeCallback,
  ...otherProps
}) => {
  const { colors } = useBaseContainer()

  return (
    <Modal
      {...otherProps}
      isVisible={isVisible}
      statusBarTranslucent
      deviceWidth={width}
      deviceHeight={height}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: theme.spacing.lg
      }}
      animationOut={'bounceOutUp'}
      animationIn={'bounceIn'}
      animationInTiming={animationInTiming}
      supportedOrientations={['portrait', 'landscape']}>
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            {subtitle}
          </Text>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.heading,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.subHeading,
    textAlign: 'center',
  },
})
