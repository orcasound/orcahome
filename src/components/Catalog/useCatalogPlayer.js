import { useCallback, useEffect, useRef, useState } from 'react'

import { pushToDataLayer } from '../../utils/gtm'

export default function useCatalogPlayer() {
  const [activeCallId, setActiveCallId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const waveSurferRef = useRef(null)

  const handlePlayPause = useCallback(
    (call) => {
      if (!call.audio) return

      if (activeCallId === call.id) {
        if (isPlaying) {
          waveSurferRef.current?.pause()
          setIsPlaying(false)
        } else {
          setIsPlaying(true)
          waveSurferRef.current?.play().catch(() => {
            setIsPlaying(false)
          })
        }
        return
      }

      waveSurferRef.current?.stop()
      waveSurferRef.current = null
      setActiveCallId(call.id)
      setIsPlaying(true)
      setPlaybackTime(0)
    },
    [activeCallId, isPlaying]
  )

  const handleStop = useCallback(() => {
    waveSurferRef.current?.stop()
    waveSurferRef.current = null
    setActiveCallId(null)
    setIsPlaying(false)
    setPlaybackTime(0)
  }, [])

  const handleToggleMute = useCallback(() => {
    setIsMuted((currentMuted) => {
      const nextMuted = !currentMuted
      waveSurferRef.current?.setMuted(nextMuted)
      return nextMuted
    })
  }, [])

  const registerWaveSurfer = (call, waveSurfer) => {
    if (activeCallId === call.id) {
      waveSurferRef.current = waveSurfer
      waveSurfer?.setMuted(isMuted)
    }
  }

  const reportPlaybackStarted = (call) => {
    if (activeCallId !== call.id) return
    setIsPlaying(true)
    pushToDataLayer('audio_play', {
      call_name: call.id,
      section: 'call_catalog',
    })
  }

  const reportPlaybackPaused = (call) => {
    if (activeCallId === call.id) setIsPlaying(false)
  }

  const reportPlaybackTime = (call, time) => {
    if (activeCallId === call.id) setPlaybackTime(time)
  }

  const reportPlaybackError = (call) => {
    if (activeCallId === call.id) handleStop()
  }

  useEffect(() => {
    return () => {
      waveSurferRef.current?.stop()
      waveSurferRef.current = null
    }
  }, [])

  return {
    activeCallId,
    isPlaying,
    playbackTime,
    isMuted,
    handlePlayPause,
    handleStop,
    handleToggleMute,
    registerWaveSurfer,
    reportPlaybackStarted,
    reportPlaybackPaused,
    reportPlaybackTime,
    reportPlaybackError,
  }
}
