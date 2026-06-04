function formatWholeSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function formatPlaybackTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'

  return formatWholeSeconds(Math.floor(seconds))
}

export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'

  return formatWholeSeconds(Math.ceil(seconds))
}
