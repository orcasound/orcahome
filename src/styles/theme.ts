import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

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
