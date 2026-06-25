import { Box } from '@mui/material'

export default function SpectrogramPanel({ src, alt, title, maxWidth }) {
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
          title={title}
          sx={{ width: '100%', height: 'auto', display: 'block' }}
        />
      )}
    </Box>
  )
}
