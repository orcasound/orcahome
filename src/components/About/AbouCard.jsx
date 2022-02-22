import { Box, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const AboutCard = ({ item, mobileActive, seeMore }) => {
  return (
    <Box mb={mobileActive ? 4 : 0} mx={{ xs: 1, sm: 0 }}>
      <Card
        sx={{
          borderRadius: '0px',
        }}
      >
        <CardMedia
          component="img"
          alt={item.title}
          height={'165'}
          image={item.path}
          sx={{
            userSelect: 'none',
          }}
        />
        <CardContent
          sx={{
            backgroundColor: '#080d26',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            width: '100%',
          }}
        >
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            align="center"
            mt={2}
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
        </CardContent>
      </Card>
    </Box>
  )
}

export default AboutCard
