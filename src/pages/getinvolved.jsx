import { Box, Typography, Container } from '@mui/material'
import { styled } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { Link as ScrollElement } from 'react-scroll'

import logo3 from '../../public/images/getinvolved/ccollege.png'
import logo5 from '../../public/images/getinvolved/crt.png'
import logo4 from '../../public/images/getinvolved/CWR_logo.png'
import logo6 from '../../public/images/getinvolved/deepgreen.png'
import logo2 from '../../public/images/getinvolved/folks.png'
import hackathon from '../../public/images/getinvolved/hackathon.png'
import hydrophonestand from '../../public/images/getinvolved/hydrophone-stand.png'
import livediy from '../../public/images/getinvolved/live-diy.png'
import lonhydrophone from '../../public/images/getinvolved/lon-hydrophone.png'
import logo8 from '../../public/images/getinvolved/OI.png'
import logo9 from '../../public/images/getinvolved/pacman.png'
import roadmap from '../../public/images/getinvolved/roadmap.png'
import topbanner from '../../public/images/getinvolved/srkw2-25.jpg'
import logo1 from '../../public/images/getinvolved/twt.png'
import valhacking from '../../public/images/getinvolved/val-hacking.png'
import logo11 from '../../public/images/getinvolved/ws_logo.png'
import TechStackList from '../components/GetInvolved/TechStackList'
import TopBanner from '../components/TopBanner'
import getinvolvedStyles from '../styles/getinvolved.module.css'
import ActionButton from './../components/ActionButton'

export const GetInvolved = () => {
  const ScrollLink = styled(ScrollElement)({
    fontSize: '20px',
    color: '#1b2b7b',
    cursor: 'pointer',
    '&:hover': {
      color: '#080d26',
    },
  })

  const InviteLinks = [
    { name: 'Volunteer', id: 'volunteer' },
    { name: 'For Developers', id: 'for_developers' },
    { name: 'Donate', id: 'donate' },
  ]

  return (
    <div>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={topbanner}
        scrollToId={`scroll-link`}
        pageTitle={`Get Involved`}
        pageDesc={`There are many ways to help in the recovering of marine life,
          especially for the Souther Resident Killer Whales that call the
          Salish Sea home. Check out the ways you can help below!`}
      />

      <Box
        id="scroll-link"
        sx={{
          padding: '20px',
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

      <Box
        id="volunteer"
        sx={{
          margin: '15px 25px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '500' }}>
          Volunteer
        </Typography>
        <Box
          sx={(theme) => ({
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
            },
            marginTop: '30px',
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                marginBottom: '20px',
              },
            })}
          >
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>
              Citizen Scientist
            </Typography>
            <Typography variant="body1">
              {`First and foremost, you can volunteer as a citizen scientist. 
              Not only can you listen for whales to marvel at the symphony of sounds they make, 
              but also you can listen *for* whales — helping to monitor their habitat 
              and notifying the network when you hear them or a noise that could endanger them.`}
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up('sm')]: {
                paddingLeft: '2vw',
              },
            })}
          >
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>
              In Person
            </Typography>
            <Typography variant="body1">
              {`You can also volunteer in-person with any of the current Orcasound network members, 
              or with a new organization in your neighborhood that you convince to become a new member. 
              Volunteer opportunities can include helping deploy or fix hydrophones, teaching groups how to “listen for whales,” 
              or helping create a new educational or outreach project.`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gridGap: '20px',
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: '100%',
            },
            margin: '50px 0 30px',
          })}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '100%',
              gridGap: '20px',
            }}
          >
            <Image alt="Val hacking node code." src={valhacking} />
            <Image alt="Binaural hydrophone stand." src={hydrophonestand} />
          </Box>
          <Image alt="Lon does hydrophone wizardly!" src={lonhydrophone} />
          <Image alt="The live-streaming DIY solution." src={livediy} />
        </Box>
        <Typography variant="body1">
          {`Volunteers are currently helping Orcasound take huge strides forward. 
          Orca Network volunteers recently deployed a new hydrophone node at Bush Point 
          and built an amazing ocean listening exhibit in Langley out of an antique telephone booth. 
          At the Port Townsend Marine Science Center, volunteers are refurbishing hydrophones 
          and installing new computer equipment to bring their node back online. 
          At educational nodes, volunteers teach the public about acoustic ecology 
          and ocean noise pollution using Orcasound recordings, live audio, and other data products.`}
        </Typography>
      </Box>

      <Box
        id="for_developers"
        sx={{
          margin: '50px 25px 20px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '500' }}>
          For Developers
        </Typography>
        <Typography variant="body1" sx={{ margin: '30px 0 50px' }}>
          {`A growing team of volunteer developers and talented consultants are building and improving Orcasound. 
          Some are developing the open-source software that captures and conveys ocean sounds. 
          Others are pioneering the DIY, low-cost hydrophone and computer hardware 
          that allows humans to listen to marine soundscapes in more and more places.`}
        </Typography>
        <Box>
          <Typography
            variant="h6"
            sx={{
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            OrcaSound Web App
          </Typography>
          <Box sx={{ maxWidth: '600px', margin: 'auto' }}>
            <Image
              alt="Democracy Lab Hackathon"
              src={hackathon}
              layout="responsive"
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            Democracy Lab Hackathon
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ margin: '50px 0 0px' }}>
          {`Our crowning jewel is the Orcasound web app — a suite of new cloud- and browser-based ways 
          for citizen scientists and artificial intelligence to listen for whales in real-time. 
          As of April, 2020, this is the Orcasound tech stack:`}
        </Typography>
        <TechStackList />
      </Box>

      <Container maxWidth="md">
        <Box sx={{ lineHeight: 1.3 }}>
          <Image src={roadmap} alt="Current Roadmap" />
          <Typography
            variant="p"
            fontSize="16px"
            align="justify"
            paragraph={true}
            mt="10px"
          >
            From hydrophone to headphone, this is how we intend to deliver an
            ocean of sound! 2020 Roadmap: components above the gray dashed line
            launched November 1, 2018; green features are being beta-tested
            since November 2019; red features are in development or requested.
            Click to view expanded image.
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          py: '50px',
          px: '50px',
          textAlign: 'center',
          lineHeight: 1.8,
          letterSpacing: 0.02,
        }}
      >
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          If you’re based in the Pacific Northwest, you can work with Orcasound
          in-person at a hackathon (see the Orcasound project at DemocracyLab).
          No matter where you are, you can join the Orcasound Slack, check out
          our Github repositories and Trello boards, subscribe to the Orcasound
          dev email distribution list, and find a place to contribute your
          talents. We hope you will share your expertise and innovations with
          us, and maybe even earn your way into the Orcasound Hacker Hall of
          Fame!
        </Typography>
        <ActionButton link="" text="LEARN MORE ABOUT VOLUNTEERING!" />
      </Box>

      <Box
        sx={{
          py: '50px',
          px: '50px',
          lineHeight: 1.8,
          letterSpacing: 0.02,
        }}
      >
        <Typography
          variant="subtitle1"
          fontSize="44px"
          align="left"
          fontWeight="600"
        >
          Memorandum Of Agreements
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          The real time audio streams, citizen science projects, educational
          material and outreach projects of Orcasound are brought to you by the
          current network member, listed below who have e-signed the 2016-2020
          Memorandum of Agreements(MOA)Any organization or individual is welcome
          to join the network(for free!)either as the host of an hydrophone
          node, a researcher or citizen scientist an educator/activist or
          general volunteer.
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          If you are an individual wanting to volunteer , collaborate or donate,
          check out the many ways you can support Orcasound.Everyone can listen
          for whales, and learn the diverse sounds of Salish Sea.
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          If you are an organization wanting to join the network as the host of
          a new hydrophone node, an educational/outreacg node, or both -- just
          read the history, mission and vision of the netowrk e-sign the MOA and
          then email info@orcasound.net to begin collaborating.There are no
          membership fees-- just benefits roles and responsibilities.
        </Typography>
      </Box>

      <Box
        sx={{
          py: '50px',
          px: '50px',
          lineHeight: 1.8,
          letterSpacing: 0.02,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="subtitle1"
          fontSize="44px"
          align="left"
          fontWeight="600"
        >
          Donate
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          Help us and our Orcasound network members by making charitable
          contribution to our partners, many of whom are 501(c)3 organizations
          Check out the link below to help strengthen and grow our network,
          while supporting our on-going conservation, research, and educational
          efforts.
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          You can also directly support the many dedicated volunteers who help
          Orcasound keep running and improve over time. Take a look at our
          Hacker hall of fame and our Github repositories and consider
          sponsoring the work of our most-dedicated contributors.
        </Typography>
        <ActionButton link="" text="DONATE NOW" />
      </Box>

      <div className={getinvolvedStyles.logos}>
        <Image src={logo1} alt="The Whaletrail" />
        <Image src={logo2} alt="Friends of Lime Kiln Society" />
        <Image src={logo3} alt="Colorado College" />
        <Image src={logo4} alt="Center of Whale Research" />
        <Image src={logo5} alt="Cetacean Research Technology" />
        <Image src={logo6} alt="Deep Green Wilderness" />
        <Image src={logo8} alt="Oceans Initiative" />
        <Image src={logo9} alt="Pacman" />
        <Image src={logo11} alt="While Scout" />
      </div>
    </div>
  )
}

export default GetInvolved
