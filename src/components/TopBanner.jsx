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
  aspectRatio: '2.9',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    minHeight: '26vh',
    aspectRatio: '2.03',
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
}))

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  margin: '0 auto',
  left: 0,
  right: 0,
  height: '15px',
  width: '15px',
  display: 'flex',
  bottom: '0',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
  fontSize: '1.25em',
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
    fontSize: '1em',
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
  top: '-50%',
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
