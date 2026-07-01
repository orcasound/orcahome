import { Box, Typography } from '@mui/material'
import { Paper } from '@mui/material'
import Image from 'next/image'

const AboutCard = ({ item, mobileActive, onClick }) => {
  return (
    <Box
      component="a"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Learn more about ${item.title}`}
      onClick={onClick}
      sx={{
        textDecoration: 'none',
        display: 'block',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      mb={mobileActive ? 4 : 0}
      mx={{ xs: 1, sm: 0 }}
    >
      <Paper square elevation={3}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '700 / 500',
          }}
        >
          <Image
            fill
            alt={item.title}
            src={item.path}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
            style={{
              objectFit: 'cover',
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
