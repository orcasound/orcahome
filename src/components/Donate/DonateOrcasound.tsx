import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

import theme from '../../styles/theme'
import { pushToDataLayer } from '../../utils/gtm'

interface DonateOrcasoundProps {
  donateOrcasoundImage: string
  donateOrcasoundTitle: string
  donateOrcasoundMessage?: string
  donateVolunteersImage: string
  donateVolunteersTitle: string
  donateVolunteersMessage?: string
}

const DonateContainer = styled(Box)(({}) => ({
  margin: '2vw 0',
  flex: 1,
  borderRadius: '15px',
  padding: '2vw',
  border: '1px solid black',
  boxShadow: '0 4px 8px 0 rgba(185, 210, 225, 1)',
  display: 'flex',
  flexDirection: 'column',
}))

const ImageContainer = styled(Box)(({}) => ({
  borderRadius: '1em',
  overflow: 'hidden',
  margin: '0 10px',
}))

const DonateOption = styled('a')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '898px',
  maxWidth: '100%',
  height: '135px',
  padding: '0 16px 0 0',
  gap: '16px',
  backgroundColor: '#F7F8F9',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    backgroundColor: '#eef0f2',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 'auto',
    padding: '0 0 16px',
  },
}))

const DonateOptionImage = styled(Box)(({ theme }) => ({
  width: '244px',
  height: '135px',
  flexShrink: 0,
  position: 'relative',
  borderRadius: '4px 0 0 4px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderRadius: '4px 4px 0 0',
  },
}))

const DonateOrcasound = (props: DonateOrcasoundProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDonateClick = () => {
    pushToDataLayer('cta_click', {
      cta_text: 'Support',
      section: 'donate_orcasound',
      page: 'donate',
    })
    setDialogOpen(true)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          /** Uncheck this two lines if donate cards are too large in */
          // margin: '0 auto',  wide screen
          // maxWidth: '1000px',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '2vw',
          flexWrap: 'wrap',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        }}
      >
        <DonateContainer>
          <Typography
            fontSize={'1.5rem'}
            textAlign="center"
            sx={{ marginBottom: '2vw' }}
          >
            {props.donateOrcasoundTitle}
          </Typography>
          <ImageContainer>
            <Image
              src={props.donateOrcasoundImage}
              alt="Support Orcasound"
              quality={100}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </ImageContainer>
          <Typography sx={{ margin: '10px' }}>
            {props.donateOrcasoundMessage}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1B2B7B',
                borderRadius: '20px',
                margin: '10px',
              }}
              onClick={handleDonateClick}
            >
              Support
            </Button>
          </Box>
        </DonateContainer>
        <DonateContainer>
          <Typography
            fontSize={'1.5rem'}
            textAlign="center"
            sx={{ marginBottom: '2vw' }}
          >
            {props.donateVolunteersTitle}
          </Typography>
          <ImageContainer>
            <Image
              src={props.donateVolunteersImage}
              alt="Support Volunteers"
              quality={100}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </ImageContainer>
          <Typography sx={{ margin: '10px' }}>
            {props.donateVolunteersMessage}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            <Button
              variant="contained"
              href="https://www.orcasound.net/hacker-hall-of-fame/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: '#1B2B7B',
                borderRadius: '20px',
                margin: '10px',
                width: 'fit-content',
              }}
              onClick={() =>
                pushToDataLayer('cta_click', {
                  cta_text: 'Support',
                  section: 'donate_orcasound',
                  page: 'donate',
                })
              }
            >
              Support
            </Button>
          </Box>
        </DonateContainer>
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="donate-dialog-title"
        maxWidth={false}
        PaperProps={{
          sx: {
            width: '1018px',
            maxWidth: 'calc(100% - 32px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            p: '60px 61px',
            [theme.breakpoints.down('sm')]: {
              p: '32px 24px',
            },
          },
        }}
      >
        <Box component="header" sx={{ m: 0, p: 0 }}>
          <Typography
            id="donate-dialog-title"
            fontFamily="Montserrat"
            fontWeight={500}
            fontSize="32px"
            lineHeight="140%"
            letterSpacing="-0.02em"
            color="#000"
          >
            Two Ways to Make A Difference
          </Typography>
          <Typography
            fontFamily="Montserrat"
            fontWeight={500}
            fontSize="18px"
            lineHeight="125%"
            letterSpacing="-0.02em"
            color="#8C8C8C"
            mt={1}
          >
            Select your preferred method
          </Typography>
          <IconButton
            aria-label="Close donate dialog"
            onClick={() => setDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 32,
              top: 32,
              width: 32,
              height: 32,
              p: 0,
              color: '#404040',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0, mt: '40px', overflow: 'visible' }}>
          <Typography
            fontFamily="Montserrat"
            fontWeight={500}
            fontSize="24px"
            lineHeight="140%"
            letterSpacing="-0.02em"
            color="#000"
            mb={2}
          >
            Ways to Support
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DonateOption
              href="https://opencollective.com/orcasound"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DonateOptionImage>
                <Image
                  src={props.donateOrcasoundImage}
                  alt="Support Orcasound"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </DonateOptionImage>
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={500}
                  fontSize="18px"
                  lineHeight="125%"
                  color="#111"
                  mb={1}
                >
                  Support through Open Collective
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={500}
                  fontSize="18px"
                  lineHeight="125%"
                  color="#8C8C8C"
                >
                  Open Collective offers transparent financial contributions.
                </Typography>
              </Box>
              <ChevronRightIcon sx={{ color: '#64748B', flexShrink: 0 }} />
            </DonateOption>

            <DonateOption
              href="https://github.com/sponsors/orcasound"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DonateOptionImage>
                <Image
                  src={props.donateVolunteersImage}
                  alt="Support Volunteers"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </DonateOptionImage>
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={500}
                  fontSize="18px"
                  lineHeight="125%"
                  color="#111"
                  mb={1}
                >
                  Support through GitHub
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={500}
                  fontSize="18px"
                  lineHeight="125%"
                  color="#8C8C8C"
                >
                  GitHub sponsorship is geared toward supporting our technology
                  resources.
                </Typography>
              </Box>
              <ChevronRightIcon sx={{ color: '#64748B', flexShrink: 0 }} />
            </DonateOption>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DonateOrcasound
