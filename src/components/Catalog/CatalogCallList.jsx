import DownloadIcon from '@mui/icons-material/Download'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Box, Divider, IconButton, Pagination, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { pushToDataLayer } from '../../utils/gtm'
import { CALLS } from './callsData'
import { POD_KEY } from './constants'

export { CALLS }

const PAGE_SIZE = 15

const PLAYER_ICON_SIZES = {
  playButton: { width: 27, height: 26, icon: 30, pauseIcon: 24 },
  toggleButton: { width: 34, height: 34, icon: 34 },
  volumeButton: { width: 24, height: 24, icon: 20 },
  downloadButton: { width: 24, height: 24, icon: 20 },
}

function clearAudioHandlers(audio) {
  audio.ontimeupdate = null
  audio.onended = null
}

export default function CatalogCallList({ activePod }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)
  const [expandedId, setExpandedId] = useState(null)
  const [page, setPage] = useState(1)

  const handlePlay = useCallback(
    (call) => {
      if (!call.audio) return

      if (audioRef.current) {
        audioRef.current.pause()
        clearAudioHandlers(audioRef.current)
        audioRef.current.currentTime = 0
      }

      const audio = new Audio(call.audio)
      audio.muted = isMuted
      audioRef.current = audio
      audio.ontimeupdate = () => {
        if (audioRef.current === audio) setPlaybackTime(audio.currentTime)
      }
      audio.onended = () => {
        if (audioRef.current !== audio) return
        clearAudioHandlers(audio)
        audioRef.current = null
        setCurrentlyPlaying(null)
        setPlaybackTime(0)
      }

      setPlaybackTime(0)
      audio
        .play()
        .then(() => {
          if (audioRef.current !== audio) return
          setCurrentlyPlaying(call.id)
          pushToDataLayer('audio_play', {
            call_name: call.id,
            section: 'call_catalog',
          })
        })
        .catch(() => {
          if (audioRef.current !== audio) return
          clearAudioHandlers(audio)
          audioRef.current = null
          setCurrentlyPlaying(null)
          setPlaybackTime(0)
        })
    },
    [isMuted]
  )

  const handleStop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      clearAudioHandlers(audioRef.current)
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setCurrentlyPlaying(null)
    setPlaybackTime(0)
  }, [])

  const handleToggleMute = useCallback(() => {
    setIsMuted((currentMuted) => {
      const nextMuted = !currentMuted
      if (audioRef.current) {
        audioRef.current.muted = nextMuted
      }
      return nextMuted
    })
  }, [])

  const handleToggle = useCallback(
    (callId) => {
      if (expandedId === callId) {
        if (currentlyPlaying === callId) handleStop()
        setExpandedId(null)
      } else {
        if (currentlyPlaying !== null) handleStop()
        setExpandedId(callId)
      }
    },
    [expandedId, currentlyPlaying, handleStop]
  )

  const filteredCalls = useMemo(() => {
    const podKey = POD_KEY[activePod]
    return CALLS.filter((call) => !podKey || call.pods.includes(podKey))
  }, [activePod])

  const pageCount = Math.ceil(filteredCalls.length / PAGE_SIZE)

  const pagedCalls = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredCalls.slice(start, start + PAGE_SIZE)
  }, [filteredCalls, page])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        clearAudioHandlers(audioRef.current)
        audioRef.current = null
      }
    }
  }, [])

  return (
    <Box>
      <Divider sx={{ borderColor: '#000' }} />
      {pagedCalls.map((call) => (
        <CallRow
          key={call.id}
          call={call}
          isPlaying={currentlyPlaying === call.id}
          expanded={expandedId === call.id}
          playbackTime={currentlyPlaying === call.id ? playbackTime : 0}
          isMuted={isMuted}
          onToggle={() => handleToggle(call.id)}
          onPlay={() => handlePlay(call)}
          onStop={handleStop}
          onToggleMute={handleToggleMute}
          downloadPath={call.audio}
        />
      ))}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => {
              setPage(value)
              handleStop()
              setExpandedId(null)
            }}
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  )
}

function CallRow({
  call,
  isPlaying,
  expanded,
  playbackTime,
  isMuted,
  onToggle,
  onPlay,
  onStop,
  onToggleMute,
  downloadPath,
}) {
  const hasAudio = !!call.audio
  const callLabel = call.label ?? call.id
  const thumbnailSrc = call.colorSpec
  const waveformSrc = call.waveform
  const duration = call.duration ?? 0

  return (
    <>
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          gap: { xs: 1.25, md: 2 },
          minHeight: '100px',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          pl: { md: '33px' },
          pr: { md: '31px' },
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: { xs: '1 1 100%', md: '0 0 auto' },
            flexShrink: 0,
          }}
        >
          {/* Spectrogram thumbnail */}
          <Box
            sx={{
              width: 75,
              height: 75,
              flexShrink: 0,
              background: thumbnailSrc ? '#f0f0f0' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1,
              overflow: 'hidden',
              border: 'none',
              boxSizing: 'border-box',
            }}
          >
            {thumbnailSrc ? (
              <Image
                src={thumbnailSrc}
                alt={`Spectrogram for ${callLabel}`}
                width={75}
                height={75}
                style={{
                  objectFit: 'cover',
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            ) : null}
          </Box>

          {/* Play / Pause button */}
          {hasAudio && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                if (isPlaying) {
                  onStop()
                } else {
                  onPlay()
                }
              }}
              aria-label={`${isPlaying ? 'Pause' : 'Play'} ${callLabel}`}
              sx={{
                bgcolor: '#fff',
                borderRadius: '2px',
                width: PLAYER_ICON_SIZES.playButton.width,
                height: PLAYER_ICON_SIZES.playButton.height,
                padding: 0,
                flexShrink: 0,
                ml: { xs: 1.25, md: '37px' },
              }}
            >
              {isPlaying ? (
                <PauseIcon
                  sx={{
                    color: '#000',
                    fontSize: PLAYER_ICON_SIZES.playButton.pauseIcon,
                  }}
                />
              ) : (
                <PlayArrowIcon
                  sx={{
                    color: '#000',
                    fontSize: PLAYER_ICON_SIZES.playButton.icon,
                  }}
                />
              )}
            </IconButton>
          )}
          {!hasAudio && (
            <Box
              aria-hidden="true"
              sx={{
                width: PLAYER_ICON_SIZES.playButton.width,
                height: PLAYER_ICON_SIZES.playButton.height,
                flexShrink: 0,
                ml: { xs: 1.25, md: '37px' },
              }}
            />
          )}

          {/* Call ID */}
          <Box
            sx={{
              width: { xs: 'auto', md: 260 },
              minWidth: { xs: 150, md: 0 },
              ml: { xs: 1.25, md: '34px' },
              flexShrink: 0,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  fontSize: '22px',
                  lineHeight: 1.2,
                }}
              >
                {callLabel}
              </Typography>
            </Box>
          </Box>

          {/* Expand toggle */}
          <IconButton
            onClick={(event) => {
              event.stopPropagation()
              onToggle()
            }}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${callLabel}`}
            sx={{
              width: PLAYER_ICON_SIZES.toggleButton.width,
              height: PLAYER_ICON_SIZES.toggleButton.height,
              p: 0,
              flexShrink: 0,
              ml: { xs: 1.25, md: '12px' },
            }}
          >
            <ExpandMoreOutlinedIcon
              sx={{
                color: '#000',
                fontSize: PLAYER_ICON_SIZES.toggleButton.icon,
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 160ms ease',
              }}
            />
          </IconButton>
        </Box>

        {hasAudio && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: { xs: '1 1 100%', md: '0 0 auto' },
              flexShrink: 0,
              ml: { md: 'auto' },
            }}
          >
            {/* Timestamp */}
            <Typography
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 400,
                fontSize: { xs: '14px', md: '18px' },
                lineHeight: 1,
                width: { xs: 'auto', md: 96 },
                textAlign: { xs: 'left', md: 'right' },
                flexShrink: 0,
              }}
            >
              {formatPlaybackTime(playbackTime)}/{formatDuration(duration)}
            </Typography>

            {/* Waveform strip from the audio file */}
            <Box
              sx={{
                width: { xs: 'min(48vw, 220px)', md: 295 },
                height: 64,
                flexShrink: 0,
                ml: { xs: 1.25, md: '27px' },
              }}
            >
              <Box
                component="img"
                src={waveformSrc}
                alt=""
                aria-hidden="true"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                onToggleMute()
              }}
              aria-label={`${isMuted ? 'Unmute' : 'Mute'} ${callLabel}`}
              sx={{
                width: PLAYER_ICON_SIZES.volumeButton.width,
                height: PLAYER_ICON_SIZES.volumeButton.height,
                p: 0,
                flexShrink: 0,
                ml: { xs: 1.25, md: '33px' },
              }}
            >
              {isMuted ? (
                <VolumeOffIcon
                  sx={{
                    color: '#000',
                    fontSize: PLAYER_ICON_SIZES.volumeButton.icon,
                  }}
                />
              ) : (
                <VolumeUpIcon
                  sx={{
                    color: '#000',
                    fontSize: PLAYER_ICON_SIZES.volumeButton.icon,
                  }}
                />
              )}
            </IconButton>

            {/* Download */}
            <IconButton
              component="a"
              href={downloadPath}
              download={`${callLabel}.mp3`}
              aria-label={`Download ${callLabel}`}
              sx={{
                width: PLAYER_ICON_SIZES.downloadButton.width,
                height: PLAYER_ICON_SIZES.downloadButton.height,
                p: 0,
                flexShrink: 0,
                ml: { xs: 1.25, md: '16px' },
              }}
              onClick={(event) => {
                event.stopPropagation()
                pushToDataLayer('download_click', {
                  call_name: call.id,
                  section: 'call_catalog',
                })
              }}
            >
              <DownloadIcon
                sx={{
                  color: '#000',
                  fontSize: PLAYER_ICON_SIZES.downloadButton.icon,
                }}
              />
            </IconButton>
          </Box>
        )}
      </Box>
      {expanded && (
        <Box
          sx={{
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 0 },
            pl: { md: '145px' },
            pb: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: '66px' },
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: { xs: '100%', md: 'fit-content' },
              maxWidth: '100%',
            }}
          >
            <SpectrogramPanel
              src={call.colorSpec}
              alt={`Color spectrogram for ${callLabel}`}
              maxWidth={432}
            />
            <SpectrogramPanel
              src={call.bwSpec}
              alt={`Ford catalog spectrogram for ${callLabel}`}
              maxWidth={434}
            />
          </Box>
        </Box>
      )}
      <Divider sx={{ borderColor: '#000' }} />
    </>
  )
}

function formatWholeSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function formatPlaybackTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'

  return formatWholeSeconds(Math.floor(seconds))
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'

  return formatWholeSeconds(Math.ceil(seconds))
}

function SpectrogramPanel({ src, alt, maxWidth }) {
  return (
    <Box
      aria-hidden={src ? undefined : 'true'}
      sx={{
        width: { xs: '100%', sm: maxWidth },
        maxWidth,
        overflow: 'hidden',
        visibility: src ? 'visible' : 'hidden',
      }}
    >
      {src && (
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{ width: '100%', height: 'auto', display: 'block' }}
        />
      )}
    </Box>
  )
}
