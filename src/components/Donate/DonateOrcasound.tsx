import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Image from 'next/image'

interface DonateOrcasoundProps {
  donateOrcasoundImage: string
  donateOrcasoundMessage?: string
  donateVolunteersImage: string
  donateVolunteersMessage?: string
}

const DonateContainer = styled(Box)(({ theme }) => ({
  margin: '2vw',
  padding: '3vw',
  border: 'solid black',
  width: '45vw',
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  borderRadius: '1em',
  overflow: 'hidden',
}))

const DonateOrcasound = (props: DonateOrcasoundProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <DonateContainer>
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
          Donate Now
        </Button>
      </DonateContainer>
      <DonateContainer>
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
          Donate Now
        </Button>
      </DonateContainer>
    </Box>
  )
}

export default DonateOrcasound
