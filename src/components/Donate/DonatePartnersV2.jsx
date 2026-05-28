import { Box, Button, Container, Typography } from '@mui/material'

import partners from '../../data/donatePartnersV2.json'

const PARTNERS_COPY_MAX_WIDTH = '1160px'
const PARTNERS_GRID_MAX_WIDTH = '1245px'

const DonatePartnersV2 = () => {
  return (
    <>
      {/* Heading */}
      <Box component="section">
        <Container maxWidth="xl">
          <Box
            sx={{
              width: '100%',
              maxWidth: PARTNERS_COPY_MAX_WIDTH,
              mx: 'auto',
              pt: { xs: '40px', md: '56px', lg: '88px' },
              mb: { xs: '40px', md: '56px', lg: '88px' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Mukta, sans-serif',
                fontWeight: 600,
                fontSize: { xs: '34px', sm: '44px', md: '56.34px' },
                lineHeight: '100%',
                textTransform: 'capitalize',
                textAlign: 'center',
                color: '#0B1D5A',
                maxWidth: '750px',
                mx: 'auto',
                mb: { xs: '28px', md: '56px' },
              }}
            >
              Support Our Network Partners
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Mukta, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '26px', sm: '34px', md: '42.26px' },
                lineHeight: { xs: '112%', md: '100%' },
                textTransform: 'capitalize',
                color: '#000000',
                mb: { xs: '14px', md: '42px' },
              }}
            >
              Your way of contributing is through these organizations directly
              to Orcasound is non-profit.
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Mukta, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '26px', sm: '34px', md: '42.26px' },
                lineHeight: { xs: '112%', md: '100%' },
                textTransform: 'capitalize',
                color: '#000000',
              }}
            >
              Going through these organization you can make a donation and
              support marine life around you
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Cards grid with full-width background */}
      <Box
        sx={{
          backgroundImage: 'url(/images/orca-from-above.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: '64px', lg: '120px' },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              width: '100%',
              maxWidth: PARTNERS_GRID_MAX_WIDTH,
              mx: 'auto',
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                lg: 'repeat(2, minmax(0, 1fr))',
              },
              columnGap: { xs: '24px', lg: 'clamp(48px, 8.5vw, 125px)' },
              rowGap: { xs: '24px', lg: '152px' },
              justifyContent: 'center',
            }}
          >
            {partners.map((partner, index) => (
              <Box
                key={index}
                sx={{
                  width: '100%',
                  height: { xs: 'auto', lg: '406px' },
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #000000',
                  borderRadius: 0,
                  boxShadow: 'none',
                  px: { xs: 3, sm: 4, lg: '28px' },
                  pt: { xs: 3, lg: '46px' },
                  pb: { xs: 3, lg: '30px' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    width: '100%',
                    maxWidth: '488px',
                    fontFamily: 'Mukta, sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '22px', lg: '26.48px' },
                    lineHeight: '100%',
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    color: '#080D26',
                  }}
                >
                  {partner.name}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    justifyContent: 'center',
                    gap: { xs: 2.5, lg: 'clamp(16px, 1.6vw, 24px)' },
                    width: '100%',
                    mt: { xs: 3, lg: '22px' },
                    mb: { xs: 3, lg: '18px' },
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '242px' },
                      height: { xs: '120px', lg: '187px' },
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={partner.icon}
                      alt={partner.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      width: { xs: '100%', sm: '231px' },
                      fontFamily: 'Mukta, sans-serif',
                      fontWeight: 600,
                      fontSize: { xs: '15px', lg: '14.61px' },
                      lineHeight: '24px',
                      color: '#000000',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 8,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {partner.description}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  href={partner.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: '#1B2B7B',
                    borderRadius: '9.13px',
                    width: '146.14px',
                    height: '30.14px',
                    minHeight: '30.14px',
                    px: 0,
                    py: 0,
                    fontFamily: 'Mukta, sans-serif',
                    fontWeight: 600,
                    fontSize: '14.61px',
                    lineHeight: '24px',
                    textTransform: 'none',
                    boxShadow: 'none',
                  }}
                >
                  Support
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default DonatePartnersV2
