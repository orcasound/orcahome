declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export const pushToDataLayer = (
  event: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  }
}
