import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import Image from 'next/image'

import orcas from '../../public/images/homepage.png'
import arrow from '../../public/images/Arrow.png'
import vector from '../../public/images/vector.png'
import homeStyles from '../styles/Home.module.css'


const styles = ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});


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
          <div>
            <h1 className={homeStyles.landingText}>LISTEN TO ORCAS LIVE!</h1>{' '}
          </div>
          <div className={homeStyles.landingArrow}>
            <Image src={arrow} width="30px" height="30px" />
          </div>
        </div>
      </div>

    

    <div className={homeStyles.home}>
      <body>
      
      <Box component={Grid} item sx={{ml:2, mt:{xs:-18, sm:-15}, mb:{xs:3, sm:8}}} >
            <Typography variant= 'h1' fontFamily={"Mukta"} fontSize = '44px' fontWeight={'600'} mb={{ xs: 3, sm: 4 }} mr={{xs: 10}} mt={{xs:3}}>
            What is Orcasound
            <br></br>
            </Typography>
            <Typography variant="body1" fontFamily={'Montserrat'} fontSize = '20px' fontWeight={'600'} lineHeight = '140%'>
            Orcasound connects your headphones to live hydrophones (underwater
            microphones), your ears to an ocean of sound.
            <br></br>
            <br></br>
            Orcasound help us explore and conserve marine life around the globe,
            starting with studying and saving the southern resident killer
            whales of the Pacific Northwest. At Orcasound you can listen for
            whales or learn more about marine bioacoustics.
              </Typography>
        </Box>

      <Grid container spacing = {5} sx={{}}>
        <Box component={Grid} item display={{ xs: "block", sm: "none" }} sx={{ml:2, fontFamily: 'Montserrat'}}>
            <Typography variant= 'h1' fontFamily={"Mukta"} fontSize = '44px' fontWeight={'600'} mr={{xs: 10}}>
                Hydrophone Location
            </Typography>
            <Typography variant="body" fontSize = '20px' fontWeight={'600'}>
              <br></br>
                Orcasound is a cooperative hydrophne network and an
                open-source software & hardware project.
              </Typography>
        </Box>

          <Grid item xs={12} sm={6} sx={{fontFamily: 'Montserrat'}}>
          <Card style={{ border: "none", boxShadow: "none" }}>
            <CardMedia
              component="img"
              height={'width'}
              image="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2020/10/Screen-Shot-2020-10-20-at-1.40.28-PM.png?resize=770%2C725&ssl=1"
            />
            <CardContent sx={{fontSize:'20px'}}>
              <Typography gutterBottom component="p" textAlign= "center" fontFamily= 'Montserrat' fontSize = '18px' fontWeight={'400'} fontStyle = {'normal'}>
              Current Orcasound hydrophone locations
              </Typography>
            </CardContent>
          </Card>
          </Grid>

          <Box component={Grid} item display={{ xs: "block", sm: "none" }} sx={{ml:2}}>
                <Typography fontFamily = 'Montserrat' fontSize = '20px' fontWeight={'600'} mb={{ xs: 3 }} mt={{ xs: -5 }}>
                  We Welcome your participation. If you'd like to host a
                  hydrophone, do research or incorporate Orcasound into the
                  educational or research efforts of your organization , you
                  can join us as a member of the network.
                </Typography>
                <Button variant="contained"
                  className={homeStyles.button}

             > LEARN</Button>
                  <Button variant="contained"
                  className={homeStyles.button}
               > GET INVOLVED</Button>
          </Box>
          
          <Box component={Grid} item sm={6} display={{ xs: "none", sm: "block" }}>
              <Typography variant= 'h1' fontFamily={"Mukta"} fontSize = '44px' fontWeight={'600'} >
                  Hydrophone Location
              </Typography>
              <Typography variant="body" fontFamily = 'Montserrat' fontSize = '20px' fontWeight={'600'}>
                <br></br>
                  Orcasound is a cooperative hydrophne network and an
                  open-source software & hardware project.
                  <br></br>
                  <br></br>
                </Typography>
                <Typography fontFamily = 'Montserrat' fontSize = '20px' fontWeight={'600'} mb={5}>
                  We Welcome your participation. If you'd like to host a
                  hydrophone, do research or incorporate Orcasound into the
                  educational or research efforts of your organization , you
                  can join us as a member of the network.
                </Typography>
                <Button variant="contained"
                  className={homeStyles.button}
             > LEARN</Button>
                  <Button variant="contained"
                  className={homeStyles.button}
               > GET INVOLVED</Button>
          </Box>
          
      </Grid>

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
