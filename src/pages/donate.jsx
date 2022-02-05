import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material'
import { Box, Button, IconButton, Slide, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Link as ScrollElement } from 'react-scroll'

import donatebanner from '../../public/images/srkw2-17.jpg'

const TopScreen = styled('div')(({ theme }) => ({
  minHeight: '88vh',
  maxHeight: '88vh',
  maxWidth: '100vw',
  backgroundImage: `url(${donatebanner.src})`,
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.down('sm')]: {
    minHeight: '68vh',
    maxHeight: '68vh',
    maxWidth: '100vw',
  },
}))

const TitleScreen = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: '88vh',
  maxHeight: '88vh',
  maxWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  paddingBottom: '150px',
  [theme.breakpoints.down('sm')]: {
    minHeight: '68vh',
    maxHeight: '68vh',
    maxWidth: '100vw',
  },
}))

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '15px',
  marginBottom: '10px',
  transition: 'all 0.5s ease-in-out',
  '&:hover': {
    transform: 'translateY(5px)',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const PageDesc = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '0',
  backgroundColor: '#000000',
  width: '40vw',
  padding: '15px',
  [theme.breakpoints.down('sm')]: {
    left: '0',
    width: '100%',
    maxWidth: '100vw',
  },
}))

export const Donate = () => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopScreen>
        <Slide
          in={checked}
          direction="up"
          {...(checked ? { timeout: 1000 } : {})}
        >
          <TitleScreen>
            <Typography
              variant="h1"
              sx={{ fontSize: '10vw', marginBottom: '5vw', fontWeight: '500' }}
            >
              Donate
            </Typography>
            <ScrollElement to="donate-ways" smooth={true} spy={true}>
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
            <PageDesc>
              {`There are many ways to help in the recovering of marine life, 
              especially for the Souther Resident Killer Whales that call the Salish Sea home. 
              Check out the ways you can help below!`}
            </PageDesc>
          </TitleScreen>
        </Slide>
      </TopScreen>
      <br />
      <Box
        id="donate-ways"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'max(3vw, 15px)',
        }}
      >
        <Box>
          {`The only way you can donate to Orcasound is through our parner-organizations. 
            Help us and our Orcasound network members by making a charitable contribution to our partners, many of whom are 501(c)3 organizations. 
            Check out the links below to help strengthen and grow our network, while supporting our on-going conservation, research, and educational efforts.`}
        </Box>
        <br />
        <br />
        <Box>
          {`You can also directly support the many dedicated volunteers who help make Orcasound keep running and improve over time. 
           Take a look at our “Hacker Hall of Fame” and/or our Github repositories and consider sponsoring the work of our most-dedicated contributors.`}
        </Box>
        <br />
        <br />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1B2B7B',
            borderRadius: '20px',
            width: 'fit-content',
          }}
        >
          {' '}
          Donate Now
        </Button>
        <br />
      </Box>
    </>
  )
}

export default Donate
