import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Image from 'next/image'

import theme from '../../styles/theme'

interface DonateOrcasoundProps {
  donateOrcasoundImage: string
  donateOrcasoundTitle: string
  donateOrcasoundMessage?: string
  donateVolunteersImage: string
  donateVolunteersTitle: string
  donateVolunteersMessage?: string
}

const DonateContainer = styled(Box)(({ theme }) => ({
  margin: '2vw 0',
  flex: 1,
  borderRadius: '15px',
  padding: '2vw',
  border: '1px solid black',
  boxShadow: '0 4px 8px 0 rgba(185, 210, 225, 1)',
  display: 'flex',
  flexDirection: 'column',
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  borderRadius: '1em',
  overflow: 'hidden',
  margin: '0 10px',
}))

const DonateOrcasound = (props: DonateOrcasoundProps) => {
  return (
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
            alt="Picture of Donate to Orcasound"
            quality={100}
            layout="responsive"
            objectFit="contain"
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
              // width is not necessary here since the Box is already centering the button
            }}
          >
            Donate
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
            alt="Picture of Donate to Volunteers"
            quality={100}
            layout="responsive"
            objectFit="contain"
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
            sx={{
              backgroundColor: '#1B2B7B',
              borderRadius: '20px',
              margin: '10px',
              width: 'fit-content',
            }}
          >
            {' '}
            Support
          </Button>
        </Box>
      </DonateContainer>
    </Box>
  )
}

export default DonateOrcasound
