import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native'
import React, { FC, SetStateAction } from 'react'
import Modal from 'react-native-modal'
import theme from '../../../theme/theme'
import { useBaseContainer } from '../../../hooks/useBaseContainer'
import LottieView from 'lottie-react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackActions, useNavigation } from '@react-navigation/native'
import { capitalize } from 'lodash'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { Button, Stack } from '@react-native-material/core'

const Backdrop = () => {
  const { colors } = useBaseContainer()
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: colors.background,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <LottieView
        autoPlay
        speed={0.6}
        resizeMode='cover'
        source={require(`../../../../assets/lotties/confetti.json`)}
      />
    </View>
  )
}

interface Props {
  isVisible: boolean
  animationInTiming?: number
  name: string
  username: string
  toggleModal: () => void
  confirmCallback: () => void
  closeCallback: () => void
  setStars: React.Dispatch<SetStateAction<number>>
}

type authScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppointmentFormScreen'
>

const { width, height } = Dimensions.get('screen')

export const FeedbackModal: FC<Props> = ({
  isVisible,
  toggleModal,
  animationInTiming = 1500,
  name,
  confirmCallback,
  closeCallback,
  username,
  setStars,
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
      swipeDirection={['down', 'left', 'right', 'up']}
      customBackdrop={<Backdrop />}
      deviceHeight={height}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: theme.spacing.lg,
      }}
      animationOut={'bounceOutUp'}
      animationIn={'pulse'}
      animationInTiming={animationInTiming}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={[styles.modal, { backgroundColor: colors.background }]}>
        <LottieView
          autoPlay
          imageAssetsFolder='lotties'
          resizeMode='cover'
          loop
          style={{
            height: height * 0.2,
          }}
          source={require(`../../../../assets/lotties/rating.json`)}
        />

        <Text style={[styles.title, { color: colors.text }]}>
          Déjanos tu opinión
        </Text>

        <Text style={[styles.subtitle, { color: colors.text }]}>
          ¿Qué tal ha ido en {capitalize(name)}?
        </Text>

        <AirbnbRating
          count={5}
          reviewColor={colors.primary}
          selectedColor={colors.primary}
          reviews={['Horrible', 'Mejorable', 'Normal', 'Bien', 'Perfecto']}
          defaultRating={3}
          onFinishRating={(number) => {
            setStars(number)
          }}
          size={20}
        />

        <Stack mt={30} spacing={theme.spacing.md} direction='row'>
          <Button
            title='Cerrar'
            onPress={closeCallback}
            variant='text'
            titleStyle={{ color: theme.colors.primary }}
          />
          <Button
            title='Completar'
            onPress={confirmCallback}
            variant='contained'
            style={[{ backgroundColor: theme.colors.primary }]}
          />
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
    fontSize: theme.fontSizes.lg,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.xl,
  },
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.subHeading,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
})
