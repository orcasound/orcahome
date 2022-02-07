import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import Image from 'next/image'

import orcas from '../../public/images/orca-breach.jpg'
import homeStyles from '../styles/Home.module.css'

export const index = () => {
  return (
    <div className={homeStyles.home}>
      <Head>
        <title>Orcasound liste live for orcas</title>
        <meta
          name="keywords"
          content="orcasound allows your to listen to live southern killer resident whales live through our hydrophones"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Image
        className={homeStyles.landingImage}
        src={orcas}
        width={1400}
        height={600}
      />

      <h2 className={homeStyles.landingText}> Listen to Orcas Live</h2>
      <br></br>
      <h2 className={homeStyles.landingIntro}> What is Orcasound</h2>
      <br></br>

      <p className={homeStyles.paragraph}>
        Orcasound Connets your Headphones to live hydrophones (underwater
        microphones), your ears to the ocean sound. <br></br>
        Orcasound helps us explore and conserve marine life around the
        globe.Starting with studying and saving the Southern Resident of the
        Pacific Northwest. <br></br>
        At Orcasound you can listen for whales or learn more about marine
        bioacustics.
      </p>

      <div className={homeStyles.card}>
        <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="140"
            image="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2020/10/Screen-Shot-2020-10-20-at-1.40.28-PM.png?resize=660%2C725&ssl=1"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orcasound App
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="140"
            image="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2020/10/Screen-Shot-2020-10-20-at-1.40.28-PM.png?resize=660%2C725&ssl=1"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Hydrophone Location
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Orcasound is a cooperative hydrophne network and an open-source
              software & hardware project.
              <br></br>
              <br></br>
              We Welcome your participation. If you'd like to host a hydrophone,
              do research or incorporate Orcasound into the educational or
              research efforts of your organization , you can join us as a
              member of the network.
              <br></br>
            </Typography>
          </CardContent>
          <CardActions>
            <div className={homeStyles.button}>
              <br></br>
              <Button variant="outline-primary"> LEARN</Button>
              <Button variant="outline-primary"> GET INVOLVED!</Button>
            </div>
          </CardActions>
        </Card>
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
    </div>
  )
}

export default index
