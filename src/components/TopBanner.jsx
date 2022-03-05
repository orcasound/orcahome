import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, IconButton, Slide, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Link as ScrollElement } from 'react-scroll'

const TopScreen = styled(Box)(({ theme, isDonate }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: isDonate ? '88vh' : '90vh',
  [theme.breakpoints.down('sm')]: {
    height: '68vh',
  },
}))

const TitleScreen = styled(Box)(({ theme, isDonate }) => ({
  position: 'relative',
  minHeight: isDonate ? '88vh' : '85vh',
  maxHeight: isDonate ? '88vh' : '85vh',
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
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const PageDesc = styled(Box)(({ theme, isDonate }) => ({
  position: 'absolute',
  bottom: '0',
  left: isDonate ? '0' : '10px',
  backgroundColor: isDonate ? '#000000' : '#080d26',
  width: '40vw',
  maxWidth: isDonate ? '600px' : '450px',
  margin: isDonate ? '0' : '10px 25px',
  padding: '20px',
  letterSpacing: '0.75px',
  [theme.breakpoints.down('sm')]: {
    left: '0',
    margin: '0',
    width: '100%',
    maxWidth: '100vw',
  },
}))

const TopBanner = ({ bannerImg, pageTitle, pageDesc, isDonate }) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <TopScreen isDonate={isDonate}>
      <Image
        alt={pageTitle}
        src={bannerImg}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <Slide
        in={checked}
        direction="up"
        {...(checked ? { timeout: 1000 } : {})}
      >
        <TitleScreen isDonate={isDonate}>
          <Typography
            variant="h1"
            sx={{ fontSize: '10vw', marginBottom: '2vw', fontWeight: '500' }}
          >
            {pageTitle}
          </Typography>
          <ScrollElement to="scroll-link" smooth={true} spy={true}>
            <ScrollDownButton>
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
          {pageDesc ? (
            <PageDesc isDonate={isDonate}>{pageDesc}</PageDesc>
          ) : null}
        </TitleScreen>
      </Slide>
    </TopScreen>
  )
}

export default TopBanner
