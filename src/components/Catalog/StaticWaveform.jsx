import { Box } from '@mui/material'

export default function StaticWaveform({ waveformSrc }) {
  return (
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
  )
}
