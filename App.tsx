import { persistor, store } from './src/store'
import { Provider } from 'react-redux'
import { API_URL } from './src/utils/constants'
import axios from 'axios'
import { setupInterceptorsTo } from './src/utils/axiosConfig'
import { useColorScheme } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { useFonts } from '@use-expo/font'
import { FullScreenLoader } from './src/components/ui/FullScreenLoader'
import { MainNavigation } from './src/navigation/Main'
import { darkTheme, lightTheme } from './src/theme/theme'

// Setup Axios interceptors and stylish backend uri
axios.defaults.baseURL = API_URL
setupInterceptorsTo(axios)

export default function App() {
  const scheme = useColorScheme()

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
      <PersistGate loading={null} persistor={persistor} theme={scheme === "dark" ? darkTheme : lightTheme }>
        <MainNavigation />
      </PersistGate>
    </Provider>
  )
}
