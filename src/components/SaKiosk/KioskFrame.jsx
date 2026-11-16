import { Box, Container, Typography } from '@mui/material'

import { KIOSK_HEADLINE, KIOSK_INTRO, KIOSK_QUERY } from '../../data/saKiosk'
import Link from '../Link'
import KioskMap from './KioskMap'

// The layout every kiosk screen shares, top to bottom as on the old page: a
// short archive note, the kiosk's two intro lines, the question heading, the
// screen's own content, then the map with the site buttons. Fonts, colors,
// links, and buttons come from the site theme.
export default function KioskFrame({ activeLocation, children }) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic', mb: 3 }}
      >
        This is the listening kiosk Orcasound ran at the Seattle Aquarium, kept
        here as an archive. Its live streams have ended, but the recordings
        still play. To listen live today, visit{' '}
        <Link href="https://live.orcasound.net">live.orcasound.net</Link>.
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 1 }}>
        {KIOSK_HEADLINE}
      </Typography>
      <Typography variant="body1" paragraph>
        {KIOSK_INTRO}
      </Typography>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ my: 3 }}>
          {KIOSK_QUERY}
        </Typography>

        {children}

        <KioskMap activeLocation={activeLocation} />
      </Box>
    </Container>
  )
}
