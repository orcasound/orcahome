import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

//Augmentation allows for custom color additions to theme (TypeScript specific)
declare module '@mui/material/styles' {
  interface Palette {
    accent1: Palette['primary']
  }
  interface PaletteOptions {
    accent1: PaletteOptions['primary']
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#F79234',
    },
    error: {
      main: red.A400,
    },
    accent1: {
      main: '#007bff',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    h1: {
      fontFamily: 'Mukta',

      fontWeight: '600',
    },
    body1: {
      fontFamily: 'Montserrat',

      fontWeight: '600',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#080d26',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 780,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

export default theme
