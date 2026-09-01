import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, IconButton, Slide, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Image from 'next/image'
import { Link as ScrollElement } from 'react-scroll'

import { pushToDataLayer } from '../utils/gtm'

const TopScreen = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: '90vh',
  [theme.breakpoints.down('sm')]: {
    height: '68vh',
  },
}))

const TitleScreen = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '85vh',
  maxHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  paddingBottom: '100px',
  [theme.breakpoints.down('sm')]: {
    minHeight: '68vh',
    maxHeight: '68vh',
    paddingBottom: '200px',
  },
  '@media (max-height: 500px)': {
    minHeight: '100%',
    maxHeight: '100%',
    justifyContent: 'center',
    paddingBottom: '0',
  },
}))

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '15px',
  transition: 'all 0.5s ease-in-out',
  '&:hover': {
    transform: 'translateY(5px)',
  },
  //[theme.breakpoints.down('sm')]: {
  //display: 'none',
  //},
  '@media (max-width: 800px)': {
    position: 'relative',
  },
}))

const PageDesc = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '10px',
  backgroundColor: '#080d26',
  width: '40vw',
  maxWidth: '450px',
  margin: '10px 25px',
  padding: '20px',
  letterSpacing: '0.75px',
  [theme.breakpoints.down('sm')]: {
    left: '0',
    margin: '0',
    width: '100%',
    maxWidth: '100vw',
  },
  '@media (max-height: 500px)': {
    position: 'relative',
    bottom: 'auto',
    left: 'auto',
    margin: '20px auto 0',
    width: '80%',
    maxWidth: '450px',
  },
}))

const TopBanner = ({
  bannerImg,
  pageTitle,
  pageDesc,
  scrollToId,
  imageFilter,
  scrollButtonBottom = 0,
}) => {
  return (
    <TopScreen>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: imageFilter || 'none',
          zIndex: 0,
        }}
      >
        <Image
          alt={pageTitle ?? ''}
          src={bannerImg}
          loading="eager"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      {/* TODO: this doesn't seem to be handling the animation, it works without this tag, investigate */}
      <Slide in={true} direction="up" timeout={1000}>
        <TitleScreen>
          <Typography
            variant="h1"
            sx={{
              fontSize: '10vw',
              marginBottom: '2vw',
              fontWeight: '500',
              textAlign: 'center',
              width: '100vw',
            }}
          >
            {pageTitle}
          </Typography>
          <ScrollElement to={scrollToId} smooth={true} spy={true}>
            <ScrollDownButton
              sx={{ bottom: scrollButtonBottom }}
              onClick={() =>
                pushToDataLayer('scroll_arrow_click', {
                  page: pageTitle?.toLowerCase().replace(/ /g, '_'),
                })
              }
            >
              <ExpandMoreIcon sx={{ fontSize: '5vw', color: '#ffffff' }} />
              <ExpandMoreIcon
                sx={{
                  fontSize: '5vw',
                  color: '#ffffff',
                  transform: 'translateY(-3.5vw)',
                }}
              />
            </ScrollDownButton>
          </ScrollElement>
          {pageDesc && <PageDesc>{pageDesc}</PageDesc>}
        </TitleScreen>
      </Slide>
    </TopScreen>
  )
}

export default TopBanner
