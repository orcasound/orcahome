import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'

import orcaShipsImg from '../../../public/images/about/orca-ships.webp'
import hackathonImg from '../../../public/images/getinvolved/hackathon.png'
import srkw2Img from '../../../public/images/srkw2-10.jpg'

const CONTENT_MAX_WIDTH = '1033px'

const MODAL_OPTIONS = [
  {
    href: 'https://opencollective.com/orcasound',
    img: orcaShipsImg,
    alt: 'Support Orcasound',
    title: 'Support through Open Collective',
    description: 'Open Collective offers transparent financial contributions.',
    external: true,
  },
  {
    href: 'https://github.com/sponsors/orcasound',
    img: hackathonImg,
    alt: 'Support Volunteers',
    title: 'Support through GitHub',
    description:
      'GitHub sponsorship is geared toward supporting our technology resources.',
    external: true,
  },
  {
    href: '/hacker-hall-of-fame',
    img: srkw2Img,
    alt: 'Hacker Hall of Fame',
    title: 'Support our contributors',
    description:
      'Support those who keep the Orcasound website and hydrophone nodes running.',
    external: false,
  },
]

const SupportOrcasound = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Box component="section">
        <Container maxWidth="lg">
          <Box
            sx={{
              width: '100%',
              maxWidth: CONTENT_MAX_WIDTH,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: { xs: '40px', md: '55px' },
              pb: { xs: '72px', md: '113px' },
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: '14px', md: '16px' },
                mb: { xs: '36px', md: '55px' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '16px', sm: '18px', md: '20px' },
                  lineHeight: '140%',
                  textAlign: { xs: 'left', md: 'justify' },
                  letterSpacing: 0,
                  color: '#080D26',
                }}
              >
                The only way you can donate to Orcasound is through our
                partner-organizations. Help us and our{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#1B2B7B',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Orcasound network members
                </Box>{' '}
                by making a charitable contribution to our partners, many of
                whom are 501(c)3 organizations. Check out the links below to
                help strengthen and grow our network, while supporting our
                on-going conservation, research, and educational efforts.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '16px', sm: '18px', md: '20px' },
                  lineHeight: '140%',
                  textAlign: { xs: 'left', md: 'justify' },
                  letterSpacing: 0,
                  color: '#080D26',
                }}
              >
                You can also directly support the many dedicated volunteers who
                help make Orcasound keep running and improve over time. Take a
                look at our &ldquo;Hacker Hall of Fame&rdquo; and/or our Github
                repositories and consider sponsoring the work of our
                most-dedicated contributors.
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                backgroundColor: '#1B2B7B',
                borderRadius: '30px',
                minWidth: '194px',
                height: '40px',
                minHeight: '40px',
                px: 0,
                py: 0,
                fontFamily: 'Mukta, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '40px',
                textTransform: 'none',
                boxShadow: 'none',
              }}
            >
              Support Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: '1018px',
            maxWidth: 'calc(100% - 32px)',
            borderRadius: '16px',
            p: { xs: '32px 24px', md: '60px' },
          },
        }}
      >
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '32px',
              letterSpacing: '-0.02em',
              color: '#000000',
              mb: 1,
            }}
          >
            Three Ways to Make A Difference
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              letterSpacing: '-0.02em',
              color: '#8C8C8C',
            }}
          >
            Select your preferred method
          </Typography>
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '24px',
            letterSpacing: '-0.02em',
            color: '#000000',
            mb: 2,
          }}
        >
          Ways to Support
        </Typography>
        <DialogContent
          sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {MODAL_OPTIONS.map((option) => (
            <Box
              key={option.href}
              component="a"
              href={option.href}
              target={option.external ? '_blank' : undefined}
              rel={option.external ? 'noopener noreferrer' : undefined}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: '100%',
                height: '135px',
                gap: '16px',
                pr: 2,
                backgroundColor: '#F7F8F9',
                border: '1px solid #000000',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { backgroundColor: '#eef0f2' },
              }}
            >
              <Box
                sx={{
                  width: '244px',
                  height: '135px',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <Image
                  src={option.img}
                  alt={option.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={500}
                  fontSize="18px"
                  color="#111111"
                  mb={0.5}
                >
                  {option.title}
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={500}
                  fontSize="18px"
                  color="#8C8C8C"
                >
                  {option.description}
                </Typography>
              </Box>
              <ChevronRightIcon sx={{ color: '#64748B', flexShrink: 0 }} />
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SupportOrcasound
