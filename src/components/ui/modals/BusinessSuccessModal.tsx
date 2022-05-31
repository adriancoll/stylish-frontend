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
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackActions, useNavigation } from '@react-navigation/native'
import { capitalize } from 'lodash'

interface Props {
  isVisible: boolean
  animationInTiming?: number
  name: string
  toggleModal : () => void
}


type authScreenProp = NativeStackNavigationProp<RootStackParamList, 'AppointmentFormScreen'>

const { width, height } = Dimensions.get('screen')

export const BusinessSuccessModal: FC<Props> = ({
  isVisible,
  toggleModal,
  animationInTiming = 1500,
  name,
  ...otherProps
}) => {
  const { colors } = useBaseContainer()
  const navigator = useNavigation<authScreenProp>()

  return (
    <Modal
      {...otherProps}
      isVisible={isVisible}
      deviceWidth={width}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      swipeDirection={['down']}
      customBackdrop={
        <View
          style={{
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            autoPlay
            speed={0.6}
            resizeMode='cover'
            style={{
              width,
              height: height * 0.3,
            }}
            source={require(`../../../../assets/lotties/conffeti.json`)}
          />
        </View>
      }
      deviceHeight={height}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: theme.spacing.lg,
      }}
      animationOut={'bounceOutUp'}
      animationIn={'tada'}
      animationInTiming={animationInTiming}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={[styles.modal, { backgroundColor: colors.background }]}>
        <LottieView
          autoPlay
          imageAssetsFolder='lotties'
          resizeMode='cover'
          loop={false}
          onAnimationFinish={() => {
            setTimeout(() => {
              toggleModal()
              navigator.dispatch(StackActions.replace('Main'))
            }, 3000)
          }}
          style={{
            height: height * 0.3,
          }}
          source={require(`../../../../assets/lotties/conffeti-success.json`)}
        />

        <Text style={[styles.title, { color: colors.text }]}>
          ¡Negocio creado!
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Tu negocio, {capitalize(name)}, ha sido creado correctamente.
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
