import 'react-native-gesture-handler'

import { persistor, store } from './src/store'
import { Provider } from 'react-redux'
import { API_URL } from './src/utils/constants'
import axios from 'axios'
import { setupInterceptorsTo } from './src/utils/axiosConfig'
import { useColorScheme } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { useFonts } from '@use-expo/font'
import { FullScreenLoader } from './src/components/ui/FullScreenLoader'
import { darkTheme, lightTheme } from './src/theme/theme'
import { AuthNavigation } from './src/navigation/Auth'

// change moment locale globally in root
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

// Setup Axios interceptors and stylish backend uri
axios.defaults.baseURL = API_URL
setupInterceptorsTo(axios)

// auto updates

export default function App() {
  const isDark = useColorScheme() === 'dark'

  const [isLoaded] = useFonts({
    'gilroy-light': require('./assets/fonts/Gilroy-Light.otf'),
    'gilroy-regular': require('./assets/fonts/Gilroy-Regular.ttf'),
    'gilroy-bold': require('./assets/fonts/Gilroy-Bold.ttf'),
    'gilroy-extra-bold': require('./assets/fonts/Gilroy-ExtraBold.otf'),
  })

  if (!isLoaded) {
    return <FullScreenLoader />
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        theme={isDark ? darkTheme : lightTheme}>
        <AuthNavigation />
      </PersistGate>
    </Provider>
  )
}
