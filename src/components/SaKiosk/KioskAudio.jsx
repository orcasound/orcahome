import { Box } from '@mui/material'

import { pushToDataLayer } from '../../utils/gtm'

// Plays one kiosk recording. The old kiosk started the sound as soon as the
// page opened, so this asks the browser to autoplay too; browsers that block
// autoplay just show the player, and the visitor presses play.
export default function KioskAudio({ src, soundId, title }) {
  return (
    <Box
      component="audio"
      key={src}
      controls
      autoPlay
      preload="auto"
      src={src}
      aria-label={`Recording: ${title}`}
      onPlay={() =>
        pushToDataLayer('audio_play', {
          call_name: soundId,
          section: 'sakiosk',
        })
      }
      sx={{ display: 'block', width: '100%', maxWidth: 360, mb: 2 }}
    >
      Your browser cannot play this recording.
    </Box>
  )
}
