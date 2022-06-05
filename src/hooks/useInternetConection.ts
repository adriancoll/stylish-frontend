import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'

/**
 * @see https://blog.logrocket.com/managing-network-connection-status-in-react-native/
 * @returns {boolean}
 */
export const useInternetConnection = () => {
  const [isOffline, setOfflineStatus] = useState(false)

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable)
      setOfflineStatus(offline)
    })

    return () => removeNetInfoSubscription()
  }, [])

  return isOffline
}
