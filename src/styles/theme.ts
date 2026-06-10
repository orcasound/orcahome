import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import type { CSSProperties } from 'react'

//Augmentation allows for custom color additions to theme (TypeScript specific)
declare module '@mui/material/styles' {
  interface Palette {
    accent1: Palette['primary']
  }
  interface PaletteOptions {
    accent1: PaletteOptions['primary']
  }

  interface Theme {
    layout: {
      hhofContributorRailShift: number
    }
  }

  interface ThemeOptions {
    layout?: {
      hhofContributorRailShift?: number
    }
  }

  interface TypographyVariants {
    fontStyling: CSSProperties
  }

  interface TypographyVariantsOptions {
    fontStyling?: CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fontStyling: true
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1B2B7B',
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
    fontStyling: {
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '140%',
    },
  },
  layout: {
    hhofContributorRailShift: 90,
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
