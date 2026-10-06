import { Box } from '@mui/material'

// Scoped accessibility styles for the MOA section and its dialogs (#451). The
// global theme is left unchanged.

const FOCUS = { outline: '3px solid #1B2B7B', outlineOffset: '2px' }
const ERROR = '#B71C1C' // about 6.6:1 on white

// Visible focus for every MUI control and native link/button in scope.
export const moaFocusRing = {
  '& .MuiButtonBase-root.Mui-focusVisible, & .MuiSelect-select:focus-visible, & a:focus-visible, & button:focus-visible':
    FOCUS,
  // Checkbox/Radio: the focus-visible class sits on the ButtonBase span
  // wrapping the hidden input.
  '& .MuiCheckbox-root.Mui-focusVisible, & .MuiRadio-root.Mui-focusVisible':
    FOCUS,
  // Text inputs: thicken the existing border to 2px #1B2B7B (no outline).
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1B2B7B',
    borderWidth: '2px',
  },
}

// The select's listbox is portaled to document.body, outside the dialog
// Paper, so it needs its own focus rule (passed through MenuProps).
export const moaMenuFocusRing = {
  '& .MuiMenuItem-root.Mui-focusVisible': {
    outline: '3px solid #1B2B7B',
    outlineOffset: '-3px',
  },
}

// WCAG 1.4.3 for error text/asterisks and 1.4.11 for input boundaries.
export const moaFormContrast = {
  '& .MuiFormHelperText-root.Mui-error, & .MuiFormLabel-root.Mui-error, & .MuiFormLabel-asterisk.Mui-error, & .MuiFormControlLabel-asterisk.Mui-error':
    { color: ERROR },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 0, 0, 0.6)' }, // about 5.7:1
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: ERROR,
  },
  '& .MuiCheckbox-root, & .MuiRadio-root': { color: 'rgba(0, 0, 0, 0.6)' }, // unchecked box/ring about 5.7:1
}

// WCAG 2.2 2.4.11: keep focused controls clear of the sticky nav. 150px
// matches StickyNav's offset={-150}.
export const moaFocusScrollMargin = {
  '& a, & button, & input, & textarea, & [tabindex]': {
    scrollMarginTop: '150px',
  },
}

const visuallyHiddenSx = {
  position: 'absolute',
  // Strings: in sx, a bare number <= 1 means a percentage.
  width: '1px',
  height: '1px',
  p: 0,
  m: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

export const VisuallyHidden = ({ children }) => (
  <Box component="span" sx={visuallyHiddenSx}>
    {children}
  </Box>
)
