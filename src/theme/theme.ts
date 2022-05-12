import { DarkTheme, DefaultTheme } from '@react-navigation/native'

const theme = {
  colors: {
    primary: "#C664BE",
    ["primary-light"]: "#DEA3FF",
    accent: "#E1372D",
    secondary: "#fafafa",
    white: "#fafafa",
    background: "#D0D4E3", // background color
    black: "#444053", // text color
    grey: "#736E7F", // text color
    // background: '#BCC5D2',	// background color
  },
  fontSizes: {
    body: 14,
    subHeading: 16,
    heading: 26,
  },
  fonts: {
    regular: "gilroy-regular",
    bold: "gilroy-bold",
    thin: "gilroy-regular",
  },
  fotnSizes: {
    heading: 20,
    subHeading: 16,
    body: 14,
  },
  fontWeights: {
    bold: "900",
    normal: "400",
  },
  baseContainer: {
    flex: 1,
    backgroundColor: "#D0D4E3",
    paddingHorizontal: 20,
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
  },
};

export const darkTheme = {
  ...DarkTheme,
  ...theme,
  colors: {
    ...DarkTheme.colors,
    ...theme.colors,
    primary: ''
  }
};


export const lightTheme = {
  ...DefaultTheme,
  ...theme,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors,
    primary: ''
  }
};

export default theme;
