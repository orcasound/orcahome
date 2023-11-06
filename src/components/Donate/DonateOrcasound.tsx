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
  border: 'solid black',
  width: '45vw',
}))

const DonateOrcasound = (props: DonateOrcasoundProps) => {
  return (
    <DonateContainer>
      <Image src={props.donateOrcasoundImage} alt="" />
      <Typography>{props.donateOrcasoundMessage}</Typography>
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
    </DonateContainer>
  )
}

export default DonateOrcasound
