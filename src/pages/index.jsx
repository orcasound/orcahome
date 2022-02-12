import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from '@mui/material/styles';
import Head from 'next/head'
import Image from 'next/image'

import orcas from '../../public/images/homepage.png'
import arrow from '../../public/images/Arrow.png'
import vector from '../../public/images/vector.png'
import homeStyles from '../styles/Home.module.css'

const StyledTypography = styled(Typography)({
  color: 'white',
  marginRight: '32px',
  '&:hover': {
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
  },
})


export const index = () => {
  return (
    <>
      <Head>
        <title>Orcasound | listen live for orcas</title>
        <meta
          name="keywords"
          content="orcasound allows your to listen to live southern killer resident whales live through our hydrophones"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Mukta:wght@500;600&display=swap"
        />
      </Head>


      <div className={homeStyles.landing}>
        <Image className={homeStyles.landingImage} src={orcas} />
        <div className={homeStyles.vector}>
          <Image src={vector} />
        </div>
        <div className={homeStyles.flex}>
          <span>
            <h1 className={homeStyles.landingText}>LISTEN TO ORCAS LIVE!</h1>{' '}
          </span>
          <span className={homeStyles.landingArrow}>
            <Image src={arrow} width="30px" height="30px" />
          </span>
        </div>
      </div>

      <div className={homeStyles.home}>
      <body>
      <h2 className={homeStyles.landingIntro}> What is Orcasound</h2>
      <br></br>
      <p className={homeStyles.paragraph}>
      Orcasound connects your headphones to live hydrophones (underwater
            microphones), your ears to an ocean of sound.
            <br></br>
            <br></br>
            Orcasound help us explore and conserve marine life around the globe,
            starting with studying and saving the southern resident killer
            whales of the Pacific Northwest. At Orcasound you can listen for
            whales or learn more about marine bioacoustics.
      </p>

      <div className={homeStyles.card}>
        <Grid>
        <Card sx={{ maxWidth: 527, marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="527"
            image="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2020/10/Screen-Shot-2020-10-20-at-1.40.28-PM.png?resize=660%2C725&ssl=1"
          />
          <CardContent sx={{fontFamily: 'Montserrat',fontSize:'20px' }}>
            <Typography gutterBottom variant="h5" component="div">
            Current Orcasound hydrophone locations
            </Typography>
          </CardContent>
        </Card>
        <Card
              md={{ order: 2 }}
              xs={{ order: 1 }}
            >
              <CardContent>
              <Typography variant="h1">
                  Hydrophone Location
              </Typography>
              <Typography variant="body">
                <br></br>
                  Orcasound is a cooperative hydrophne network and an
                  open-source software & hardware project.
                </Typography>
              </CardContent>
        </Card>
        <Card
          md={{ order: 3 }}
          xs={{ order: 3 }}
        >
            <CardContent>
              <Typography>
                We Welcome your participation. If you'd like to host a
                hydrophone, do research or incorporate Orcasound into the
                educational or research efforts of your organization , you
                can join us as a member of the network.
              </Typography>
              </CardContent>
              <CardActions>
                <br></br>
                <Button>
                  {' '}
                  LEARN
                </Button>{' '}
                <Button>
                  {' '}
                  GET INVOLVED!
                </Button>{' '}
            </CardActions>
        </Card>
        </Grid>
      </div>
      {/* Netlify badge for open source plan https://www.netlify.com/legal/open-source-policy */}
      <a href="https://netlify.com">
        <Image
          src="https://netlify.com/img/global/badges/netlify-color-accent.svg"
          alt="Deploys by Netlify"
          width="114"
          height="51"
        />
      </a>
      </body>
    </div>
    </>
  )
}

export default index
