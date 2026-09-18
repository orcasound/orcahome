import { Theme, useMediaQuery } from '@mui/material'

/**
 * Hook to check if client is below the "desktop" (lg) breakpoint. Note this
 * is true for both mobile AND tablet screen sizes, despite the previous name
 * (`useIsMobile`) suggesting otherwise. Useful for conditionally rendering
 * components in a responsive layout.
 * @returns True if client is below desktop screen size or screen size can't be determined
 */
export default function useIsNotDesktop() {
  // Negate media query so that default SSR value for media query (false) shows
  // up as not-desktop. In other words, if the media query fails, assume the
  // client is not desktop and render for mobile/tablet first
  return !useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'))
}
