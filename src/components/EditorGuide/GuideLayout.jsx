import { Box, Container, Typography } from '@mui/material'

import Link from '../Link'

// Frame for the editor guide pages: a readable ~720px column, a way back to
// the guide home, and a short help line at the bottom.
const GuideLayout = ({ children, backToHome = false }) => (
  <Container
    maxWidth={false}
    sx={{ maxWidth: 768, py: { xs: 5, md: 8 }, overflowWrap: 'break-word' }}
  >
    <Typography
      variant="overline"
      color="text.secondary"
      component="p"
      sx={{ mb: 1 }}
    >
      Orcasound editor guide
    </Typography>
    {backToHome && (
      <Box sx={{ mb: 3 }}>
        <Link href="/editor-guide" variant="body2">
          &larr; All guides
        </Link>
      </Box>
    )}
    {children}
  </Container>
)

export default GuideLayout
