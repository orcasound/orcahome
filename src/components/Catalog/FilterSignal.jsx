import { Box, Typography } from '@mui/material'

import { CALLS } from './callsData'
import { POD_KEY } from './constants'

// Presentation-level active-filter signal for the Call Catalog (#359, design
// from #276). Shows a pill for the active pod plus a live "Showing N calls"
// count above the results, so users can see which filter is applied. It only
// reflects state — it does not touch the filter buttons' own visual states.

const countForPod = (activePod) => {
  const podKey = POD_KEY[activePod]
  if (!podKey) return CALLS.length
  return CALLS.filter((call) => call.pods.includes(podKey)).length
}

export default function FilterSignal({ activePod }) {
  const isAllCalls = !POD_KEY[activePod]
  const count = countForPod(activePod)

  return (
    <Box
      // key remount fades the signal in on each filter change
      key={activePod}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '14px',
        mt: '36px',
        mb: '12px',
        animation: 'catalogFilterSignalFade 180ms ease',
        '@keyframes catalogFilterSignalFade': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '64px',
          height: '37px',
          padding: '0 22px',
          borderRadius: '10px',
          fontFamily: 'Montserrat',
          fontWeight: 500,
          fontSize: '16px',
          backgroundColor: isAllCalls ? '#C4C6D1' : '#1B2B7B',
          color: isAllCalls ? '#000000' : '#FFFFFF',
        }}
      >
        {activePod}
      </Box>

      <Typography
        sx={{
          fontFamily: 'Mukta',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '28px',
          color: '#000000',
        }}
      >
        Showing {count} {count === 1 ? 'call' : 'calls'}
      </Typography>
    </Box>
  )
}
