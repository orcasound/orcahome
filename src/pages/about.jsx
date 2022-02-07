import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import Image from 'next/image'

import orca from '../../public/images/orca2.png'
import aboutStyles from '../styles/About.module.css'

export const About = () => {
  return (
    <div className={aboutStyles.about}>
      <Head>
        <title>Orcasound</title>
      </Head>
      <Image
        className={aboutStyles.landingImage}
        src={orca}
        width={1400}
        height={500}
      />
      <h2 className={aboutStyles.landingText}> What is Orcasound</h2>

      <p className={aboutStyles.landingPa}>
        Orcasound is a software & hardware Web app to <br></br>
        listen to whales, save orcas and advance <br></br>
        bioacustics(AI Technology)
      </p>

      <p className={aboutStyles.introduction}>
        Orcasound is a coperative effort of many dedicated individuals and great
        organizations.Here are our recent projects-- created by
        volunteers,stewards,citizens,scientist,hackers and generous funders--
        all working together for the orcas
      </p>

      <h2 className={aboutStyles.projects}>Our Projects</h2>
      <div className={aboutStyles.card}>
        <Card sx={{ maxWidth: 345, mb: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orcasound App
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orcasound App
            </Typography>
          </CardContent>
        </Card>
      </div>
      <h2 className={aboutStyles.particiation}>
        <strong>We Welcome Your Participation</strong>
      </h2>
      <p className={aboutStyles.join}>
        You can join us anytime as a volunteer to our open-source software &
        hardware projects.
        <br></br>
        <br></br>
        If you'd like to host a hydrophone, do research, or incorporate
        Orcasound into the educational or outreach efforts of your
        organization,please reach out!
      </p>
      <div className={aboutStyles.button}>
        <Button variant="outline-primary"> GET INVOLVED!</Button>
      </div>
    </div>
  )
}

export default About
