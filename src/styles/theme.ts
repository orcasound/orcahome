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
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    accents: {
      accent1: '#007bff',
    },
  },
})

export default theme
