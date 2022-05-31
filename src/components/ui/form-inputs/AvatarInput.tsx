import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, SetStateAction, useCallback, useState } from 'react'
import { Control } from 'react-hook-form'
import { Avatar } from '@react-native-material/core'
import theme from '../../../theme/theme'
import { Ionicons } from '@expo/vector-icons'
import TouchableScale from 'react-native-touchable-scale'
import { useTheme } from '@react-navigation/native'
import { SetState } from 'immer/dist/internal'
import * as DocumentPicker from 'expo-document-picker'

const { width, height } = Dimensions.get('window')

export type ImageFile = {
  type: string
  filename: string
  localUri: string
}

interface Props {
  uri: string
  label: string
  setImage: React.Dispatch<SetStateAction<any>>
}

const AvatarInput: FC<Props> = ({ uri, label, setImage }) => {
  const { colors } = useTheme()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
    })

    if (result.type === 'success') {
      setImage({
        type: result.mimeType,
        name: result.name,
        uri: result.uri,
      })
    }
  }

  return (
    <TouchableScale onPress={pickImage}>
      <Avatar image={{ uri }} size={130} label={label} style={[styles.icon]} />
      <View style={[styles.camera]}>
        <Ionicons name='camera-sharp' color={theme.colors.primary} size={24} />
      </View>
    </TouchableScale>
  )
}

export default AvatarInput

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
  },
  camera: {
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255, 156, 213, 0.2)',
    borderRadius: theme.borderRadius.full,
    position: 'absolute',
    right: width / 4,
    bottom: 10,
  },
})
