import { DarkTheme, DefaultTheme } from '@react-navigation/native'

const theme = {
  colors: {
    primary: '#C664BE',
    ['primary-light']: '#DEA3FF',
    accent: '#E1372D',
    secondary: '#fafafa',
    white: '#fafafa',
    background: '#D0D4E3', // background color
    black: '#444053', // text color
    grey: '#736E7F', // text color
    input_light: '#fafafa',
    background_dark_light: '#444053',
    input_dark: '#171717',
    text_muted: '#A2A8B4',
    success: 'lightgreen',
    error: 'red',
    warning: 'orange',
    info: 'blue',
  },
  fontSizes: {
    sm: 10,
    body: 14,
    subHeading: 16,
    heading: 26,
  },
  fonts: {
    regular: 'gilroy-regular',
    bold: 'gilroy-bold',
    extrabold: 'gilroy-extra-bold',
    thin: 'gilroy-regular',
  },
  fontWeights: {
    bold: '900',
    normal: '400',
  },
  baseContainer: {
    flex: 1,
  },
  spacing: {
    sm: 5,
    md: 10,
    lg: 20,
    xl: 30,
  },
  borderRadius: {
    sm: 5,
    md: 10,
    lg: 20,
    xl: 30,
    full: 50,
  },
  loaderSize: {
    sm: 20,
    md: 40,
    lg: 60,
    xl: 80,
  },
  iconSize: {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 38,
    xl: 42,
  },
}

export const darkTheme = {
  ...DarkTheme,
  ...theme,
  colors: {
    ...DarkTheme.colors,
    ...theme.colors,
    background: '#171717',
    border: '#B8B8B8',
    text: theme.colors.white,
  },
}

export const lightTheme = {
  ...DefaultTheme,
  ...theme,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors,
    background: theme.colors.background,
    border: 'darkgrey',
    text: theme.colors.black,
  },
}

export default theme
