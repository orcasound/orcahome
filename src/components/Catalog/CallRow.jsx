import DownloadIcon from '@mui/icons-material/Download'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import Image from 'next/image'

import { pushToDataLayer } from '../../utils/gtm'
import { TOOLTIPS } from './constants'
import { formatDuration, formatPlaybackTime } from './formatTime'
import SpectrogramPanel from './SpectrogramPanel'
import StaticWaveform from './StaticWaveform'
import WaveformPlayer from './WaveformPlayer'

const PLAYER_ICON_SIZES = {
  playButton: { width: 27, height: 26, icon: 30, pauseIcon: 24 },
  toggleButton: { width: 34, height: 34, icon: 34 },
  volumeButton: { width: 24, height: 24, icon: 20 },
  downloadButton: { width: 24, height: 24, icon: 20 },
}

export default function CallRow({
  call,
  isActive,
  isPlaying,
  expanded,
  playbackTime,
  isMuted,
  onToggle,
  onPlayPause,
  onStop,
  onWaveSurferReady,
  onPlaybackStarted,
  onPlaybackPaused,
  onPlaybackTimeChange,
  onPlaybackError,
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
                title={TOOLTIPS.SPECTROGRAM}
                width={75}
                height={75}
                style={{
                  objectFit: 'cover',
                }}
              />
            ) : null}
          </Box>

          {/* Play / Pause button */}
          {hasAudio && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                onPlayPause()
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
                fontSize: { xs: '16px', md: '18px' },
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
                component={isActive ? WaveformPlayer : StaticWaveform}
                audioSrc={call.audio}
                waveformSrc={waveformSrc}
                isActive={isActive}
                shouldPlay={isPlaying}
                isMuted={isMuted}
                onReady={onWaveSurferReady}
                onPlaybackStarted={onPlaybackStarted}
                onPlaybackPaused={onPlaybackPaused}
                onPlaybackTimeChange={onPlaybackTimeChange}
                onFinish={onStop}
                onError={onPlaybackError}
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
              title={TOOLTIPS.SPECTROGRAM}
              maxWidth={432}
            />
            <SpectrogramPanel
              src={call.bwSpec}
              alt={`Ford catalog spectrogram for ${callLabel}`}
              title={TOOLTIPS.SPECTROGRAM}
              maxWidth={434}
            />
          </Box>
        </Box>
      )}
      <Divider sx={{ borderColor: '#000' }} />
    </>
  )
}
