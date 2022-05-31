import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react'
import Modal from 'react-native-modal'
import theme from '../../../theme/theme'
import { useBaseContainer } from '../../../hooks/useBaseContainer'
import LottieView from 'lottie-react-native'
import { Button, Stack } from '@react-native-material/core'

interface Props {
  isVisible: boolean
  animationInTiming?: number
  subtitle: string
  title: string
  confirmCallback: () => void
  closeCallback?: () => void
  toggleModal: () => void
}

const { width, height } = Dimensions.get('screen')

export const ConfirmModal: FC<Props> = ({
  isVisible,
  animationInTiming = 1500,
  title = '¿Estás seguro/a?',
  subtitle = '',
  confirmCallback,
  closeCallback,
  toggleModal,
  ...otherProps
}) => {
  const { colors } = useBaseContainer()

  return (
    <Modal
      {...otherProps}
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      swipeDirection={['down']}
      deviceWidth={width}
      deviceHeight={height}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: theme.spacing.lg,
      }}
      animationOut={'zoomOutDown'}
      animationIn={'zoomInUp'}
      animationInTiming={animationInTiming}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={[styles.modal, { backgroundColor: colors.background }]}>
        <LottieView
          autoPlay
          speed={0.7}
          resizeMode='cover'
          style={{
            height: height * 0.3,
          }}
          source={require(`../../../../assets/lotties/warning.json`)}
        />
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          {subtitle}
        </Text>
        <Stack spacing={theme.spacing.md} direction='row' >
          <Button title='Cerrar' onPress={toggleModal} variant='text' titleStyle={{ color: theme.colors.primary }} style={[styles.button]} />
          <Button title='Confirmar' variant='contained' onPress={confirmCallback}  style={[styles.button, { backgroundColor: theme.colors.primary }]} />
        </Stack>
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
    marginBottom: theme.spacing.lg,
  },
  button: {
    alignSelf: 'center',
  }
})
