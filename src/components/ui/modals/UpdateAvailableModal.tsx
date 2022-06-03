import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react'
import Modal from 'react-native-modal'
import theme from '../../../theme/theme'
import { useBaseContainer } from '../../../hooks/useBaseContainer'
import LottieView from 'lottie-react-native'
import { Button, Stack } from '@react-native-material/core'
import * as Updates from 'expo-updates'

interface Props {
  isVisible: boolean
  toggleModal: () => void
}

const { width, height } = Dimensions.get('screen')

export const UpdateAvailableModal: FC<Props> = ({
  isVisible,
  toggleModal,
  ...otherProps
}) => {
  const { colors } = useBaseContainer()

  const updateApp = async () => {
    await Updates.reloadAsync()
  }

  return (
    <Modal
      {...otherProps}
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      swipeDirection={['down', 'up', 'left', 'right']}
      deviceWidth={width}
      deviceHeight={height}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: theme.spacing.lg,
      }}
      animationOut={'zoomOutDown'}
      animationIn={'zoomInUp'}
      animationInTiming={1500}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={[styles.modal, { backgroundColor: colors.background }]}>
        <LottieView
          autoPlay
          speed={0.7}
          resizeMode='cover'
          style={{
            height: height * 0.3,
          }}
          source={require(`../../../../assets/lotties/update-available.json`)}
        />
        <Text style={[styles.title, { color: colors.text }]}>¡Actualización disponible!</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Si aceptas, la aplicación se reiniciará para actualizarla, si no, se actualizará automáticamente la próxima vez que inicies la aplicación.
        </Text>
        <Stack spacing={theme.spacing.md} direction='row' >
          <Button title='Cerrar' onPress={toggleModal} variant='text' titleStyle={{ color: theme.colors.primary }} style={[styles.button]} />
          <Button title='Actualizar' variant='contained' onPress={updateApp}  style={[styles.button, { backgroundColor: theme.colors.primary }]} />
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
