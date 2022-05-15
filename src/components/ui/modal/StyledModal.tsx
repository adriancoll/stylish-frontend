import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import theme from '../../../theme/theme'
import CustomButton, { ButtonTypes } from '../CustomButton'

interface Props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => any
  isVisible: boolean
  title: string
  confirmText?: string
  animationInTiming?: number
}

export const StyledModal: FC<Props & ModalProps> = ({
  children,
  isVisible,
  callback,
  title,
  animationInTiming = 1500,
  closeModal,
  confirmText = 'Aceptar',
  ...otherProps
}) => {
  const { colors } = useTheme()
  const customStyles = {
    backgroundColor: colors.background,
    color: colors.text,
  }

  return (
    <Modal
      {...otherProps}
      isVisible={isVisible}
      onBackdropPress={() => closeModal(false)}
      onSwipeComplete={() => closeModal(false)}
      swipeDirection={['down']}
      animationOut={'slideOutDown'}
      animationInTiming={animationInTiming}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={[styles.container, customStyles]}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <View style={styles.modalBody}>{children}</View>
        <View style={styles.footer}>
          <CustomButton
            type={ButtonTypes.TRANSPARENT}
            spacing={theme.spacing.md}
            customStyle={styles.button}
            title='Cerrar'
            onPress={() => closeModal(false)}
          />
          <CustomButton
            customStyle={styles.button}
            spacing={theme.spacing.md}
            title={confirmText}
            onPress={() => callback()}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    paddingBottom: theme.spacing.sm,
    fontFamily: theme.fonts.bold,
    borderBottomEndRadius: theme.borderRadius.lg,
    borderColor: 'transparent',
    borderBottomColor: theme.colors.primary,
    borderWidth: 1,
  },
  modalBody: {
    marginVertical: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    fontFamily: theme.fonts.regular,
  },
})
