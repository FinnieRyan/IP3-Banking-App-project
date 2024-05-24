// This file sets up the theme for the app
// The theme is used to set the colors, fonts, and sizes for the app
// The theme is then used in the styled components to set the styles for the app
export const theme = {
  colors: {
    primary: '#305C9D',
    secondary: '#293C57',
    link: '#0036C0',
    background: '#EFF3F8',
    white: '#ffffff',
    black: '#000000',
    grey: '#C5C5C5',
    textBlack: '#1D1D1F',
    textGrey: '#5B6876',
    textLight: '#919191',
    textWhite: '#FFFFFF',
    warning: '#E51010',
    alert: '#EFBE41',
    success: '#72B73C',
  },
  fonts: {
    familySans: 'Open Sans',
    weights: {
      light: '200',
      normal: '400',
      medium: '500',
      bold: '600',
      black: '700',
    },
  },
  shadows: {
    cardShadow:
      'box-shadow: 0px 10px 10px 2px rgba(48, 92, 157, 0.05), 0px 2px 5px 0px rgba(48, 92, 157, 0.19), 0px 0px 2px 0px rgba(48, 92, 157, 0.11) inset;',
  },
  sizes: {
    sm: '320px', // small mobile devices
    md: '375px', // medium mobile devices
    lg: '425px', // large mobile devices
    tablet: '768px', // tablets
  },
}
