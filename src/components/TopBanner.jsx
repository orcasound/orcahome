import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { Box, IconButton, Slide } from '@mui/material'
import { styled } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Link as ScrollElement } from 'react-scroll'

const TopScreen = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'clip',
  height: '50vh',
  minHeight: '250px',
  [theme.breakpoints.down('sm')]: {
    height: '26vh',
  },
}))

const TitleScreen = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  marginBottom: '100px',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '20px',
  },
}))

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '10px',
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
  borderRadius: '10px',
  marginBottom: '10%',
  right: '0px',
  backgroundColor: '#1b2b7bcf',
  width: '40vw',
  maxWidth: '450px',
  padding: '1em',
  letterSpacing: '0.75px',
  [theme.breakpoints.down('sm')]: {
    right: '0',
    width: '68vw',
    maxWidth: '70vw',
    maxHeight: '230px',
  },
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  marginLeft: '0',
  marginRight: '0',
  left: 0,
  right: 0,
  width: '100%',
  height: '150%',
  minHeight: '250px',
  top: '-40%',
  [theme.breakpoints.down('sm')]: {
    top: '-60%',
    height: '180%',
  },
}))

const TopBanner = ({ bannerImg, pageTitle, pageDesc, scrollToId }) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <TopScreen>
      <ImageContainer>
        <Image
          alt={pageTitle ?? ''}
          src={bannerImg}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </ImageContainer>
      <Slide
        in={checked}
        direction="up"
        {...(checked ? { timeout: 1000 } : {})}
      >
        <TitleScreen>
          <ScrollElement to={scrollToId} smooth={true} spy={true}>
            <ScrollDownButton>
              <ExpandMoreOutlinedIcon
                sx={{
                  fontSize: '5vw',
                  '& path': {
                    stroke: 'black',
                    strokeWidth: '0.3',
                    fill: 'white',
                  },
                }}
              />
              <ExpandMoreIcon
                sx={{
                  fontSize: '5vw',
                  transform: 'translateY(-3.5vw)',
                  '& path': {
                    stroke: 'black',
                    strokeWidth: '0.3',
                    fill: 'white',
                  },
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
