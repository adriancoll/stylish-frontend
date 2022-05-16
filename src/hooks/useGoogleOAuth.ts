import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession()

export const useGoogleOAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'todo',
    iosClientId: 'todo',
    androidClientId: '577661903302-84bigi7u4jsfjng99im6ejkvugg1s8c1.apps.googleusercontent.com',
    webClientId: 'todo',
  })

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      console.log(authentication)
    }
  }, [response])

  return [request, response, promptAsync]
}
