import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import Image from 'next/image'

import orca from '../../public/images/about/heroimage.png'
import ScrollDownIcon from '../components/About/ScrollDownIcon'
import aboutStyles from '../styles/About.module.css'

const LandingScreen = styled('div')(({ theme }) => ({
  color: 'white',
  position: 'relative',
}))

const LandingImage = styled('div')(({ theme }) => ({
  width: '100%',
  objectFit: 'cover',
  userSelect: 'none',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
const Landingtitle = styled('h2')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  bottom: '50%',
  left: '50%',
  right: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  [theme.breakpoints.down(1000)]: {
    position: 'absolute',
    top: 0,
    bottom: '10%',
  },
  [theme.breakpoints.down(700)]: {
    position: 'absolute',
    top: 0,
    bottom: '30%',
  },
}))
const Landingdesc = styled('div')(({ theme }) => ({
  position: 'absolute',
  background: '#080d26',
  width: '35%',
  padding: '10px',
  bottom: '4%',
  left: '5%',
  fontWeight: 500,
  fontStyle: 'normal',

  [theme.breakpoints.down(1000)]: {
    width: '40%',
    fontSize: '2vw',
  },
  [theme.breakpoints.down(500)]: {
    width: '100%',
    fontSize: '4vw',
    position: 'relative',
    left: 0,
    bottom: 6,
  },
}))

const ScrollDown = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '3%',
  left: '50%',
  right: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.5s ease-in-out',

  '&:hover': {
    transform: 'translateY(5px)',
  },
  [theme.breakpoints.down(700)]: {
    display: 'none',
  },
}))

export const About = () => {
  return (
    <div className={aboutStyles.about}>
      <Head>
        <title>Orcasound</title>
      </Head>
      <LandingScreen>
        <LandingImage>
          <Image
            src={orca}
            alt="About us Landing image"
            height={650}
            width={1550}
          />
        </LandingImage>
        <Landingtitle>
          <Typography
            variant="h3"
            sx={{
              fontSize: '10vw',
              fontFamily: 'Montserrat',
            }}
          >
            About
          </Typography>
        </Landingtitle>

        <Landingdesc
          sx={{
            fontFamily: 'Mukta',
            fontSize: '1.5vw',
          }}
        >
          {`Orcasound is a software & hardware Web app to listen to whales, save
          orcas and advance bioacustics(AI Technology)`}
        </Landingdesc>

        <ScrollDown>
          <ScrollDownIcon />
        </ScrollDown>
      </LandingScreen>
      {/* <Image
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
      </p> */}

      <p className={aboutStyles.introduction} id="page">
        Orcasound is a coperative effort of many dedicated individuals and great
        organizations.Here are our recent projects-- created by
        volunteers,stewards,citizens,scientist,hackers and generous funders--
        all working together for the orcas
      </p>

      <h2 className={aboutStyles.projects}>Our Projects</h2>
      <div className={aboutStyles.card}>
        {/* <CardColumns>
          <Card>
            <Card.Img
              variant="top"
              src=" https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title>Orcasound App</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />

            <Card.Body>
              <Card.Title>Port Townsend Hydrophone</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title>Bush Point Hydrophone</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title>Ocean Listening Exhibit</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title>Google summer of code</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title>Blog</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title> 2017 Orca Behavior Study</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title>Sailish Sea Vessel Research</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
            />
            <Card.Body>
              <Card.Title>Salish Sea Vessel Research</Card.Title>
            </Card.Body>
          </Card>
        </CardColumns> */}
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
