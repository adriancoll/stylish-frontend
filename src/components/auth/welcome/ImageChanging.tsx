import { FC, useEffect, useLayoutEffect, useState } from 'react'
import {
  Image,
  ImageProps,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import theme from '../../../theme/theme'

const images = [
  require('../../../../assets/images/welcome.png'),
  require('../../../../assets/images/welcome-2.png'),
  require('../../../../assets/images/welcome-3.png'),
  require('../../../../assets/images/welcome-4.png'),
  require('../../../../assets/images/welcome-5.png'),
  require('../../../../assets/images/welcome-6.png'),
  require('../../../../assets/images/welcome-7.png'),
]

type Props = {
  delay?: number
}

export const ImageChanging: FC<Props> = ({ delay = 3000 }) => {
  const [image, setImage] = useState<ImageProps>(images[0])
  const [delayState, _] = useState<number>(delay)
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(images[Math.floor(Math.random() * images.length)])
    }, delayState)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <View
        style={[
          styles.container,
          {
            height: height * 0.5,
            padding: width * 0.1,
          },
        ]}>
        <Image
          style={{
            flex: 1,
            resizeMode: 'contain',
          }}
          source={image}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors['primary-light'],
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
