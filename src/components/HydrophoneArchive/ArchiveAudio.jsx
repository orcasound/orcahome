import { Box } from '@mui/material'

import { pushToDataLayer } from '../../utils/gtm'

// One archived recording. `preload="none"` so a long list does not download
// anything until the visitor presses play.
export default function ArchiveAudio({ src, label, section }) {
  return (
    <Box
      component="audio"
      controls
      preload="none"
      src={src}
      aria-label={label}
      onPlay={() =>
        pushToDataLayer('audio_play', { call_name: label, section })
      }
      sx={{ display: 'block', width: '100%', maxWidth: 360 }}
    >
      Your browser cannot play this recording.
    </Box>
  )
}
