import { Box, Container, Typography } from '@mui/material'

const CONTENT_MAX_WIDTH = '1033px'

const SupportBanner = () => {
  return (
    <Box
      component="section"
      id="support-content"
      sx={{
        mt: { xs: '-64px', md: '-58px' },
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', maxWidth: CONTENT_MAX_WIDTH, mx: 'auto' }}>
          <Box
            sx={{
              backgroundColor: '#DB1F36',
              borderRadius: '14px',
              minHeight: '116px',
              display: 'flex',
              alignItems: 'center',
              px: { xs: 3, md: '41px' },
              py: { xs: 2.5, md: 0 },
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                fontFamily: 'Mukta, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '18px', sm: '20px', md: '24px' },
                lineHeight: '140%',
                textAlign: { xs: 'left', md: 'justify' },
              }}
            >
              There are many ways to help in the recovering of marine life,
              especially for the Southern Resident Killer Whales that call the
              Salish Sea home. Check out the ways you can help below!
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SupportBanner
