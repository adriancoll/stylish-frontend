import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native'
import React, { FC, useRef } from 'react'
import Modal, { ModalProps } from 'react-native-modal'
import theme from '../../../theme/theme'
import { useBaseContainer } from '../../../hooks/useBaseContainer'
import LottieView from 'lottie-react-native'

interface Props {
  isVisible: boolean
  animationInTiming?: number
  children?: JSX.Element
}

const { width, height } = Dimensions.get('screen')

export const OfflineModal: FC<Props & ModalProps> = ({
  isVisible,
  animationInTiming = 1500,
  ...otherProps
}) => {
  const { colors } = useBaseContainer()

  return (
    <Modal
      {...otherProps}
      isVisible={isVisible}
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
          <LottieView
            autoPlay
            speed={0.6}
            resizeMode='cover'
            style={{
              height: height * 0.3,
            }}
            source={require(`../../../../assets/lotties/no-internet.json`)}
          />

          <Text style={[styles.title, { color: colors.text }]}>
            ¡Te has desconectado de la red!
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Sin una conexión a internet, no podrás acceder a la aplicación.
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
