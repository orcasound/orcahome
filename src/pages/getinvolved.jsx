import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, IconButton, Slide,Typography } from '@mui/material'
import { styled } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import { Link as ScrollElement } from 'react-scroll'

import logo3 from '../../public/images/ccollege.png'
import logo5 from '../../public/images/crt.png'
import logo4 from '../../public/images/CWR_logo.png'
import logo6 from '../../public/images/deepgreen.png'
import logo2 from '../../public/images/folks.png'
import hackathon from '../../public/images/hackathon.png'
import logo8 from '../../public/images/OI.png'
import logo9 from '../../public/images/pacman.png'
import roadmap from '../../public/images/roadmap.png'
import topbanner from '../../public/images/srkw2-25.jpg'
import logo1 from '../../public/images/twt.png'
import logo11 from '../../public/images/ws_logo.png'
import getinvolvedStyles from '../styles/getinvolved.module.css'

const TopScreen = styled('div')(({ theme }) => ({
  minHeight: '90vh',
  maxHeight: '90vh',
  maxWidth: '100vw',
  backgroundImage: `url(${topbanner.src})`,
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.down('sm')]: {
    minHeight: '68vh',
    maxHeight: '68vh',
    maxWidth: '100vw',
  },
}))

const TitleScreen = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: '85vh',
  maxHeight: '85vh',
  maxWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  [theme.breakpoints.down('sm')]: {
    minHeight: '68vh',
    maxHeight: '68vh',
    maxWidth: '100vw',
    paddingBottom: '200px',
  },
}))

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '15px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const PageDesc = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '10px',
  backgroundColor: '#080d26',
  width: '40vw',
  maxWidth: '450px',
  padding: '15px',
  margin: '10px 25px',
  [theme.breakpoints.down('sm')]: {
    left: '0',
    margin: '0',
    width: '100%',
    maxWidth: '100vw',
    margin: '0',
  },
}))

const ScrollLink = styled(ScrollElement)({
  fontSize: '20px',
  color: '#1b2b7b',
  textDecoration: 'none !important',
  cursor: 'pointer',
  '&:hover': {
    color: '#080d26',
  },
})

export const Getinvolved = () => {
  const [checked, setChecked] = useState(false)
  const InviteLinks = [
    { name: 'Volunteer', id: 'volunteer' },
    { name: 'For Developers', id: 'for-developers' },
    { name: 'Donate', id: 'donate' },
  ]

  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <>
      <TopScreen>
        <Slide
          in={checked}
          direction="up"
          {...(checked ? { timeout: 1000 } : {})}
        >
          <TitleScreen>
            <Typography
              variant="h1"
              sx={{ fontSize: '10vw', marginBottom: '2vw' }}
            >
              Get Involved
            </Typography>
            <ScrollElement to="invite-links" smooth={true} spy={true}>
              <ScrollDownButton>
                <ExpandMoreIcon sx={{ fontSize: '4vw', color: '#ffffff' }} />
                <ExpandMoreIcon
                  sx={{
                    fontSize: '4vw',
                    color: '#ffffff',
                    transform: 'translateY(-3vw)',
                  }}
                />
              </ScrollDownButton>
            </ScrollElement>
            <PageDesc>
              {`There are many ways to help in the recovering of marine life,
              especially for the Souther Resident Killer Whales that call the
              Salish Sea home. Check out the ways you can help below!`}
            </PageDesc>
          </TitleScreen>
        </Slide>
      </TopScreen>

      <Box
        id="invite-links"
        sx={{
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        {InviteLinks.map((link, i) => (
          <ScrollLink key={i} to={link.id} smooth={true} spy={true}>
            {link.name}
          </ScrollLink>
        ))}
      </Box>

      <div id="volunteer">
        <h2 className={getinvolvedStyles.particiation}>
          <strong>Volunteer</strong>
        </h2>
        <div>
          <div className={getinvolvedStyles.paris}>
            <div className={getinvolvedStyles.rows}>
              <h2>Citizen Scientist</h2>
              <p>
                {`First and foremost, you can volunter as a citizen scientist. Not
                only an you listen for whales to marvel at the symphony of
                ssounds they make.`}
                <br></br>
                {`but also you can listen 'for'
                whales-- helping monitor their habitat and notifying the network
                when you hear them or a noise that could endager them.`}
              </p>
            </div>
          </div>

          <div className={getinvolvedStyles.rows}>
            <h2>In Person</h2>
            <p>
              {`You can also volunteer in-person with any of them current
              Orcasound network members, or with a new organizationin your
              neighborhood that you convince to become a new member`}
              <br></br>
              {`Volunteer opportunities can include helping deploy or fix
              hydrophones, teaching groups how to 'listen for whales,' or
              helping create new educational or outreach projects.`}
            </p>
          </div>

          <br></br>
        </div>
      </div>

      <div className={getinvolvedStyles.space}>
        <div className={getinvolvedStyles.card}>
          <CardColumns>
            <Card>
              <Card.Img
                variant="top"
                src="https://i1.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2018/04/IMG_20180426_120021.jpg?fit=660%2C880&ssl=1"
              />
            </Card>

            <Card>
              <Card.Img
                variant="top"
                src="https://i0.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2017/08/orca-tanker.jpg?resize=1024%2C683&ssl=1"
              />
            </Card>

            <Card bg="primary" text="white" className="text-center p-3">
              <blockquote className="blockquote mb-0 card-body">
                <p>
                  {`There is many ways you can help in the recovery of marine life
                  , especially for the Souther Resident Killer Whales`}
                </p>
                <footer className="blockquote-footer">
                  <small className="text-muted">
                    Listen Live for Orcas in{' '}
                    <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </blockquote>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://i0.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2019/09/Screen-Shot-2019-09-26-at-1.00.03-AM.png?resize=780%2C733"
              />
            </Card>
          </CardColumns>
        </div>
        <div className={getinvolvedStyles.spacing} id="for-developers">
          <div className={getinvolvedStyles.car}>
            <h2> For Developers</h2>
            <p>
              {`A growing team of volunteer developers and talented consultants
              are building and improving Orcasound. Some are developing the new
              open-source software that captures and conveys ocean sounds.
              Others are pioneering the DIY , low cost hydrophone and
              computerhardware that allows humans to listen to marine
              soundscapes in more and more places`}
            </p>
          </div>
        </div>

        <h3 className={getinvolvedStyles.web}>Orcasound Web App</h3>
        <div className={getinvolvedStyles.wrapping}>
          <Image
            className={getinvolvedStyles.hackathon}
            src={hackathon}
            alt="hackathon"
          />
          <p>Democracy Lab Hackathon</p>
        </div>

        <p className={getinvolvedStyles.paragraph}>
          {` Our crown jewel is the Orcasound Web App-- a suite of new cloud and
          browser based ways for citizens scientist and artifical intelligence
          to listen for whales in real time.As of april 2020 this is the
          Orcasound tech Stack`}
        </p>

        <ul className={getinvolvedStyles.list}>
          <li>Orcanode:Linux-based ADC with lie-streaming</li>
          <li>Bush Point & Port Towsend: ffmpeg + s3fs in a bash script</li>
          <li>
            Orcasound Lab: Testing new Python script using ffmpeg+boto+/-redis
          </li>
          <li>Orcasite: front- and back -end of the Orcasound app</li>
          <li>backend is an Elixir app using Phoenix framework.</li>
          <li>the Phoenix app serves as React app </li>
          <li>Public site-- live.orcasound.net</li>
        </ul>
        <div className={getinvolvedStyles.wrapper}>
          <Image
            className={getinvolvedStyles.hackathon}
            src={roadmap}
            alt="roadmap"
          />
          <br></br>
        </div>
        <p className={getinvolvedStyles.textroadmap}>
          {` If you're based in the Pacific Northwest you can work with Orcasound
          in-person at a hackathon (see the Orcasound projects at democracy lab)
          No matter where you are, you can join Orcasound Slack, check out our
          Github repository and Trello boards, subscribe to the Orcasound dev
          email distribution list, and finish a place to contribute your
          talents. We hope you will share your expertise and innovations with
          us, and maybe even earn your way into the Orcasound HacHacker hall of
          Fame`}
        </p>
        <div className={getinvolvedStyles.button}>
          <Button variant="outline-primary">
            LEARN MORE ABOUT VOLUNTEERING!
          </Button>
        </div>
        <h2 className={getinvolvedStyles.memorandum}>
          Memorandum Of Agreements
        </h2>
        <p className={getinvolvedStyles.textmemorandum}>
          {` The real time audio streams, citizen science projects, educational
          material and outreach projects of Orcasound are brought to you by the
          current network member, listed below who have e-signed the 2016-2020
          Memorandum of Agreements(MOA)Any organization or individual is welcome
          to join the network(for free!)either as the host of an hydrophone
          node, a researcher or citizen scientist an educator/activist or
          general volunteer.`}
          <br></br>
          {` If you are an individual wanting to volunteer , collaborate or donate,
          check out the many ways you can support Orcasound.Everyone can listen
          for whales, and learn the diverse sounds of Salish Sea.`}
          <br></br>
          {`If you are an organization wanting to join the network as the host of
          a new hydrophone node, an educational/outreacg node, or both -- just
          read the history, mission and vision of the netowrk e-sign the MOA and
          then email info@orcasound.net to begin collaborating.There are no
          membership fees-- just benefits roles and responsibilities.`}
        </p>
        <h2 className={getinvolvedStyles.donate} id="donate">
          {' '}
          Donate
        </h2>
        <p className={getinvolvedStyles.donatetext}>
          {`Help us and our Orcasound network members by making charitable
          contribution to our partners, many of whom are 501(c)3 organizations
          Check out the link below to help strengthen and grow our network,
          while supporting our on-going conservation, research, and educational
          efforts.`}
          <br></br>
          {`You can also directly support the many dedicated volunteers who help
          Orcasound keep running and improve over time. Take a look at our
          'Hacker hall of fame ' and our Github repositories and consider
          sponsoring the work of our most-dedicated contributors.`}
        </p>
        <div className={getinvolvedStyles.button}>
          <Button variant="outline-primary"> DONATE NOW</Button>
        </div>

        <div className={getinvolvedStyles.logos}>
          <Image src={logo1} width={150} height={150} alt="donate-here" />
          <Image src={logo2} width={150} height={150} alt="donate-here" />
          <Image src={logo3} width={150} height={150} alt="donate-here" />
          <Image src={logo4} width={150} height={150} alt="donate-here" />
          <Image src={logo5} width={150} height={150} alt="donate-here" />
          <Image src={logo6} width={150} height={150} alt="donate-here" />
          <Image src={logo8} width={150} height={150} alt="donate-here" />
          <Image src={logo9} width={150} height={150} alt="donate-here" />
          <Image src={logo11} width={150} height={150} alt="donate-here" />
        </div>
      </div>
    </>
  )
}

export default Getinvolved
