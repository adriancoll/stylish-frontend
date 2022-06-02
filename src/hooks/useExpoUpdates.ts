import { Alert, AppState } from 'react-native'
import * as Updates from 'expo-updates'
import { useEffect } from 'react'

/** @var Number delay */
const DEFAULT_TIMEOUT = 4000

const checkForUpdates = async () => {
  try {
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync()
      await new Promise((resolve) =>
        Alert.alert(
          '✨ Hay una actualización pendiente.',
          '🔃 Tu aplicacion va a reiniciarse en unos segundos...',
          [{ text: 'Actualizar', onPress: () => resolve(true) }],
          { cancelable: false }
        )
      )
      await Updates.reloadAsync()
    }
  } catch (e) {
    alert('Ha habido un error al comprobar las actualizaciones')
    console.log('Ha habido un error ', e)
  }
}

const useExpoUpdates = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      AppState.addEventListener('change', handleAppStateChange)
      setTimeout(checkForUpdates, DEFAULT_TIMEOUT)
    }
  }, [])

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      setTimeout(checkForUpdates, DEFAULT_TIMEOUT)
    }
  }
}

export default useExpoUpdates
