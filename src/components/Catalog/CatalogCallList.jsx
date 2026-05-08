import DownloadIcon from '@mui/icons-material/Download'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import useSound from 'use-sound'

import SO1 from '../../../public/audio/FO-S01.mp3'
import SO2 from '../../../public/audio/FO-S02.mp3'
import SO3 from '../../../public/audio/FO-S03.mp3'
import SO4 from '../../../public/audio/FO-S04.mp3'
import SO5 from '../../../public/audio/FO-S05.mp3'
import SO6 from '../../../public/audio/FO-S06.mp3'
import SO16 from '../../../public/audio/FO-S16.mp3'
import CallS03 from '../../../public/images/learn/Call-S03.png'
import FOS16 from '../../../public/images/learn/Call-S16.png'
import FOS01 from '../../../public/images/learn/FO-S01.png'
import FOS02 from '../../../public/images/learn/FO-S02.png'
import FOS03 from '../../../public/images/learn/FO-S03.png'
import FOS04 from '../../../public/images/learn/FO-S04.png'
import FOS05 from '../../../public/images/learn/FO-S05.png'
import FOS06 from '../../../public/images/learn/FO-S06.png'
import { pushToDataLayer } from '../../utils/gtm'

const CALLS = [
  {
    id: 'S01',
    nickname: 'Commonly used by J pod',
    pod: 'J',
    audioIndex: 0,
    spectrogram: FOS01,
  },
  {
    id: 'S02',
    nickname: 'Commonly used by J pod',
    pod: 'J',
    audioIndex: 1,
    spectrogram: FOS02,
  },
  {
    id: 'S03',
    nickname: 'Commonly used by J pod',
    pod: 'J',
    audioIndex: 2,
    spectrogram: FOS03,
  },
  {
    id: 'S04',
    nickname: 'Goose Honk',
    pod: null,
    audioIndex: 3,
    spectrogram: FOS04,
  },
  {
    id: 'S05',
    nickname: 'Commonly used by J pod',
    pod: 'J',
    audioIndex: 4,
    spectrogram: FOS05,
  },
  {
    id: 'S06',
    nickname: 'Commonly used by J pod',
    pod: 'J',
    audioIndex: 5,
    spectrogram: FOS06,
  },
  {
    id: 'S07',
    nickname: 'Oh well darn',
    pod: null,
    audioIndex: null,
    spectrogram: null,
  },
  {
    id: 'S09',
    nickname: 'Figaro',
    pod: null,
    audioIndex: null,
    spectrogram: null,
  },
  {
    id: 'S10',
    nickname: 'Excitement call',
    pod: null,
    audioIndex: null,
    spectrogram: null,
  },
  {
    id: 'S13',
    nickname: 'Donkey',
    pod: null,
    audioIndex: null,
    spectrogram: null,
  },
  {
    id: 'S14',
    nickname: 'Commonly used by J pod',
    pod: 'J',
    audioIndex: null,
    spectrogram: null,
  },
  {
    id: 'S16',
    nickname: 'Commonly used by K pod',
    pod: 'K',
    audioIndex: 6,
    spectrogram: FOS16,
  },
]

const AUDIO_DOWNLOAD_PATHS = [
  '/audio/FO-S01.mp3',
  '/audio/FO-S02.mp3',
  '/audio/FO-S03.mp3',
  '/audio/FO-S04.mp3',
  '/audio/FO-S05.mp3',
  '/audio/FO-S06.mp3',
  '/audio/FO-S16.mp3',
]

const PLAYER_ICON_SIZES = {
  playButton: { width: 27, height: 26, icon: 30, pauseIcon: 24 },
  toggleButton: { width: 34, height: 34, icon: 34 },
  volumeButton: { width: 24, height: 24, icon: 20 },
  downloadButton: { width: 24, height: 24, icon: 20 },
}

export { CALLS }

export default function CatalogCallList() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

  const [playS01, { stop: stopS01 }] = useSound(SO1, {
    onend: () => setCurrentlyPlaying(null),
  })
  const [playS02, { stop: stopS02 }] = useSound(SO2, {
    onend: () => setCurrentlyPlaying(null),
  })
  const [playS03, { stop: stopS03 }] = useSound(SO3, {
    onend: () => setCurrentlyPlaying(null),
  })
  const [playS04, { stop: stopS04 }] = useSound(SO4, {
    onend: () => setCurrentlyPlaying(null),
  })
  const [playS05, { stop: stopS05 }] = useSound(SO5, {
    onend: () => setCurrentlyPlaying(null),
  })
  const [playS06, { stop: stopS06 }] = useSound(SO6, {
    onend: () => setCurrentlyPlaying(null),
  })
  const [playS16, { stop: stopS16 }] = useSound(SO16, {
    onend: () => setCurrentlyPlaying(null),
  })

  const playFns = [
    playS01,
    playS02,
    playS03,
    playS04,
    playS05,
    playS06,
    playS16,
  ]
  const stopFns = [
    stopS01,
    stopS02,
    stopS03,
    stopS04,
    stopS05,
    stopS06,
    stopS16,
  ]

  function handlePlay(call) {
    if (call.audioIndex === null) return

    if (currentlyPlaying !== null) {
      const prev = CALLS.find((c) => c.id === currentlyPlaying)
      if (prev?.audioIndex !== null) stopFns[prev.audioIndex]()
    }

    setCurrentlyPlaying(call.id)
    playFns[call.audioIndex]()
    pushToDataLayer('audio_play', {
      call_name: call.id,
      section: 'call_catalog',
    })
  }

  function handleStop(call) {
    stopFns[call.audioIndex]()
    setCurrentlyPlaying(null)
  }

  const filteredCalls = CALLS

  return (
    <Box>
      <Divider sx={{ borderColor: '#000' }} />
      {filteredCalls.map((call) => (
        <CallRow
          key={call.id}
          call={call}
          isPlaying={currentlyPlaying === call.id}
          onPlay={() => handlePlay(call)}
          onStop={() => handleStop(call)}
          downloadPath={
            call.audioIndex !== null
              ? AUDIO_DOWNLOAD_PATHS[call.audioIndex]
              : null
          }
        />
      ))}
    </Box>
  )
}

function CallRow({ call, isPlaying, onPlay, onStop, downloadPath }) {
  const hasAudio = call.audioIndex !== null
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Box
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
              bgcolor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            {call.spectrogram ? (
              <Image
                src={call.spectrogram}
                alt={`Spectrogram for ${call.id}`}
                width={75}
                height={75}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Typography
                sx={{ fontSize: '11px', color: '#999', textAlign: 'center' }}
              >
                {call.id}
              </Typography>
            )}
          </Box>

          {/* Play / Pause button */}
          <IconButton
            onClick={isPlaying ? onStop : onPlay}
            disabled={!hasAudio}
            aria-label={`${isPlaying ? 'Pause' : 'Play'} ${call.id}`}
            sx={{
              bgcolor: '#fff',
              borderRadius: '2px',
              width: PLAYER_ICON_SIZES.playButton.width,
              height: PLAYER_ICON_SIZES.playButton.height,
              padding: 0,
              flexShrink: 0,
              ml: { xs: 1.25, md: '37px' },
              '&.Mui-disabled': { bgcolor: '#ccc' },
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

          {/* Call ID + nickname */}
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
                {call.id}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Montserrat',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: '#000',
                }}
              >
                {call.nickname}
              </Typography>
            </Box>
          </Box>

          {/* Expand toggle */}
          <IconButton
            onClick={() => setExpanded(!expanded)}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${call.id}`}
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
            0:00/0:12
          </Typography>

          {/* Spectrogram / waveform strip from the Figma audio row */}
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
              src="/images/learn/audio-waveform.svg"
              alt=""
              aria-hidden="true"
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            />
          </Box>

          {/* Volume */}
          <IconButton
            disabled={!hasAudio}
            aria-label={`Volume for ${call.id}`}
            sx={{
              width: PLAYER_ICON_SIZES.volumeButton.width,
              height: PLAYER_ICON_SIZES.volumeButton.height,
              p: 0,
              flexShrink: 0,
              ml: { xs: 1.25, md: '33px' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
          >
            <VolumeUpIcon
              sx={{
                color: '#000',
                fontSize: PLAYER_ICON_SIZES.volumeButton.icon,
              }}
            />
          </IconButton>

          {/* Download */}
          <IconButton
            component="a"
            href={downloadPath ?? '#'}
            download={downloadPath ? `${call.id}.mp3` : undefined}
            disabled={!hasAudio}
            aria-label={`Download ${call.id}`}
            sx={{
              width: PLAYER_ICON_SIZES.downloadButton.width,
              height: PLAYER_ICON_SIZES.downloadButton.height,
              p: 0,
              flexShrink: 0,
              ml: { xs: 1.25, md: '16px' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
            onClick={() =>
              hasAudio &&
              pushToDataLayer('download_click', {
                call_name: call.id,
                section: 'call_catalog',
              })
            }
          >
            <DownloadIcon
              sx={{
                color: '#000',
                fontSize: PLAYER_ICON_SIZES.downloadButton.icon,
              }}
            />
          </IconButton>
        </Box>
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
              src={FOS03}
              alt="Modern spectrogram placeholder"
              maxWidth={432}
            />
            <SpectrogramPanel
              src={CallS03}
              alt="Ford catalog spectrogram placeholder"
              maxWidth={434}
            />
          </Box>
        </Box>
      )}
      <Divider sx={{ borderColor: '#000' }} />
    </>
  )
}

function SpectrogramPanel({ src, alt, maxWidth }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: maxWidth },
        maxWidth,
        aspectRatio: `${src.width} / ${src.height}`,
        overflow: 'hidden',
      }}
    >
      <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </Box>
  )
}
