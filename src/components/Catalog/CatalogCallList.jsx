import { Box, Divider, Pagination } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import CallRow from './CallRow'
import { CALLS } from './callsData'
import { POD_KEY } from './constants'
import useCatalogPlayer from './useCatalogPlayer'

const PAGE_SIZE = 15

export default function CatalogCallList({ activePod }) {
  const {
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
  } = useCatalogPlayer()
  const [expandedId, setExpandedId] = useState(null)
  const [page, setPage] = useState(1)

  const handleToggle = useCallback(
    (callId) => {
      if (expandedId === callId) {
        if (activeCallId === callId) handleStop()
        setExpandedId(null)
      } else {
        if (activeCallId !== null) handleStop()
        setExpandedId(callId)
      }
    },
    [expandedId, activeCallId, handleStop]
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

  return (
    <Box>
      <Divider sx={{ borderColor: '#000' }} />
      {pagedCalls.map((call) => (
        <CallRow
          key={call.id}
          call={call}
          isActive={activeCallId === call.id}
          isPlaying={activeCallId === call.id && isPlaying}
          expanded={expandedId === call.id}
          playbackTime={activeCallId === call.id ? playbackTime : 0}
          isMuted={isMuted}
          onToggle={() => handleToggle(call.id)}
          onPlayPause={() => handlePlayPause(call)}
          onStop={handleStop}
          onWaveSurferReady={(waveSurfer) =>
            registerWaveSurfer(call, waveSurfer)
          }
          onPlaybackStarted={() => reportPlaybackStarted(call)}
          onPlaybackPaused={() => reportPlaybackPaused(call)}
          onPlaybackTimeChange={(time) => reportPlaybackTime(call, time)}
          onPlaybackError={() => reportPlaybackError(call)}
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
              handleStop()
              setPage(value)
              setExpandedId(null)
            }}
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  )
}
