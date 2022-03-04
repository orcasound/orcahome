import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, IconButton, Slide, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Link as ScrollElement } from 'react-scroll'

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

const PageDesc = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '10px',
  backgroundColor: '#080d26',
  width: '40vw',
  maxWidth: '450px',
  padding: '20px',
  margin: '10px 25px',
  letterSpacing: '0.75px',
  [theme.breakpoints.down('sm')]: {
    left: '0',
    margin: '0',
    width: '100%',
    maxWidth: '100vw',
  },
}))

const TopBanner = ({ bannerImg, pageTitle, pageDesc }) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <TopScreen>
      <Image
        alt="Get Involved"
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
        <TitleScreen>
          <Typography
            variant="h1"
            sx={{ fontSize: '10vw', marginBottom: '2vw', fontWeight: '500' }}
          >
            {pageTitle}
          </Typography>
          <ScrollElement to="invite-links" smooth={true} spy={true}>
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
          {pageDesc ? <PageDesc>{pageDesc}</PageDesc> : null}
        </TitleScreen>
      </Slide>
    </TopScreen>
  )
}

export default TopBanner
