import { useEffect, useState } from 'react'
import * as Updates from 'expo-updates'
import { Alert } from 'react-native'

/**
 * @description Search on-air-updates in expo-updates library
 * @void
 */
export const useExpoUpdate = () => {
  const checkUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        Alert.alert(
          'Update available',
          'Update available, do you want to update now?',
          [
            { text: 'Cancel', onPress: () => {}, style: 'cancel' },
            {
              text: 'OK',
              onPress: async () => {
                const { isNew } = await Updates.fetchUpdateAsync()
                if (isNew) {
                  await Updates.reloadAsync()
                }
              },
            },
          ]
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkUpdates()
  }, [])
}
