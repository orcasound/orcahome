import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

export default function WaveformPlayer({
  audioSrc,
  waveformSrc,
  shouldPlay,
  isMuted,
  onReady,
  onPlaybackStarted,
  onPlaybackPaused,
  onPlaybackTimeChange,
  onFinish,
  onError,
}) {
  const containerRef = useRef(null)
  const waveSurferRef = useRef(null)
  const shouldPlayRef = useRef(shouldPlay)
  const isMutedRef = useRef(isMuted)
  const callbacksRef = useRef({
    onReady,
    onPlaybackStarted,
    onPlaybackPaused,
    onPlaybackTimeChange,
    onFinish,
    onError,
  })
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    shouldPlayRef.current = shouldPlay
  }, [shouldPlay])

  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  useEffect(() => {
    callbacksRef.current = {
      onReady,
      onPlaybackStarted,
      onPlaybackPaused,
      onPlaybackTimeChange,
      onFinish,
      onError,
    }
  }, [
    onError,
    onFinish,
    onPlaybackPaused,
    onPlaybackStarted,
    onPlaybackTimeChange,
    onReady,
  ])

  useEffect(() => {
    let isCancelled = false
    let subscriptions = []

    import('wavesurfer.js')
      .then(({ default: WaveSurfer }) => {
        if (isCancelled || !containerRef.current) return

        const waveSurfer = WaveSurfer.create({
          container: containerRef.current,
          url: audioSrc,
          height: 64,
          waveColor: '#9a9a9a',
          progressColor: '#000',
          cursorColor: '#000',
          cursorWidth: 2,
          barWidth: 2.5,
          barGap: 1.5,
          barRadius: 1,
          fillParent: true,
          interact: true,
          dragToSeek: true,
          normalize: true,
        })

        waveSurferRef.current = waveSurfer
        waveSurfer.setMuted(isMutedRef.current)
        callbacksRef.current.onReady(waveSurfer)

        subscriptions = [
          waveSurfer.on('ready', () => {
            if (isCancelled) return
            setIsReady(true)
            setHasError(false)
            if (shouldPlayRef.current) {
              waveSurfer.play().catch(() => {
                if (!isCancelled) callbacksRef.current.onError()
              })
            }
          }),
          waveSurfer.on('play', () => {
            if (!isCancelled) callbacksRef.current.onPlaybackStarted()
          }),
          waveSurfer.on('pause', () => {
            if (!isCancelled) callbacksRef.current.onPlaybackPaused()
          }),
          waveSurfer.on('finish', () => {
            if (!isCancelled) callbacksRef.current.onFinish()
          }),
          waveSurfer.on('timeupdate', (currentTime) => {
            if (!isCancelled)
              callbacksRef.current.onPlaybackTimeChange(currentTime)
          }),
          waveSurfer.on('seeking', (currentTime) => {
            if (!isCancelled)
              callbacksRef.current.onPlaybackTimeChange(currentTime)
          }),
          waveSurfer.on('error', () => {
            if (isCancelled) return
            setHasError(true)
            callbacksRef.current.onError()
          }),
        ]
      })
      .catch(() => {
        if (isCancelled) return
        setHasError(true)
        callbacksRef.current.onError()
      })

    return () => {
      isCancelled = true
      subscriptions.forEach((unsubscribe) => unsubscribe())
      if (waveSurferRef.current) {
        waveSurferRef.current.stop()
        waveSurferRef.current.destroy()
        waveSurferRef.current = null
      }
      callbacksRef.current.onReady(null)
    }
  }, [audioSrc])

  useEffect(() => {
    if (!waveSurferRef.current || !isReady || hasError) return

    waveSurferRef.current.setMuted(isMuted)
  }, [hasError, isMuted, isReady])

  useEffect(() => {
    if (!waveSurferRef.current || !isReady || hasError) return

    if (shouldPlay) {
      waveSurferRef.current.play().catch(() => {
        callbacksRef.current.onError()
      })
    } else {
      waveSurferRef.current.pause()
    }
  }, [hasError, isReady, shouldPlay])

  return (
    <Box
      onClick={(event) => event.stopPropagation()}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        component="img"
        src={waveformSrc}
        alt=""
        aria-hidden="true"
        sx={{
          display: isReady && !hasError ? 'none' : 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      <Box
        ref={containerRef}
        aria-hidden={hasError ? 'true' : undefined}
        sx={{
          display: hasError ? 'none' : 'block',
          position: isReady ? 'static' : 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      />
    </Box>
  )
}
