import { Box, Typography } from '@mui/material'
import { Paper } from '@mui/material'
import Image from 'next/image'

const AboutCard = ({ item, mobileActive }) => {
  return (
    <Box mb={mobileActive ? 4 : 0} mx={{ xs: 1, sm: 0 }}>
      <Paper square elevation={3}>
        <Box>
          <Image
            width={700}
            height={500}
            alt={item.title}
            src={item.path}
            layout="responsive"
            sx={{
              userSelect: 'none',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#080d26',
            color: 'white',
            height: '100px',
            width: '100%',
          }}
        >
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            align="center"
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: '500',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20',
              width: '100%',
            }}
          >
            {item.title}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default AboutCard
