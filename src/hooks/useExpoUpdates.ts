import { AppState } from 'react-native'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as Updates from 'expo-updates'

/** @var Number - Delay for timeout to check for updates */
const DEFAULT_TIMEOUT = 2000

const checkForUpdates = async (
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync()
      setShowModal(true)
    }
  } catch (e) {
    alert('Ha habido un error al comprobar las actualizaciones')
    console.log('Ha habido un error ', e)
  }
}

const useExpoUpdates = () => {
  const [isShowUpdatesModal, setShowModal] = useState(false)

  const showUpdatesModalAction = () => setShowModal(true)
  const hideUpdatesModalAction = () => setShowModal(false)
  const toggleUpdatesModalAction = () => setShowModal((last) => !last)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      // Every time appstate changes call checkForUpdates in DEFAULT_TIMEOUT
      const subscription = AppState.addEventListener(
        'change',
        handleAppStateChange
      )
      setTimeout(() => checkForUpdates(setShowModal), DEFAULT_TIMEOUT)
    }
  }, [])

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      setTimeout(() => checkForUpdates(setShowModal), DEFAULT_TIMEOUT)
    }
  }

  return {
    isShowUpdatesModal,
    toggleUpdatesModalAction,
    showUpdatesModalAction,
    hideUpdatesModalAction,
  }
}

export default useExpoUpdates
