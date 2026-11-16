import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { IMAGE_BASE_PATH } from '../../data/saKiosk'

// The top of a site or recording screen: the picture on the left, then the
// status label (LIVE / RECORDED on the old kiosk), any player passed as
// `children`, and the text.
export default function KioskPanel({
  image,
  imageAlt,
  status,
  paragraphs,
  children,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'flex-start' },
        gap: 3,
        mb: 4,
        textAlign: 'left',
      }}
    >
      <Box sx={{ flexShrink: 0, width: 200, maxWidth: '100%' }}>
        <Image
          src={`${IMAGE_BASE_PATH}${image}`}
          alt={imageAlt}
          width={200}
          height={200}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </Box>

      <Box>
        <Typography
          variant="overline"
          component="p"
          color="text.secondary"
          sx={{ fontWeight: 600, lineHeight: 1.5, mb: 1 }}
        >
          {status}
        </Typography>
        {children}
        {paragraphs.map((paragraph) => (
          <Typography key={paragraph} variant="body1" paragraph>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
