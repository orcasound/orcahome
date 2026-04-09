declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export const pushToDataLayer = (
  event: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}
