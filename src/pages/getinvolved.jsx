import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { Link as ScrollElement } from 'react-scroll'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

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
import logo12 from '../../public/images/getinvolved/orca-conservancy.png'
import logo13 from '../../public/images/getinvolved/orca-network.png'
import logo9 from '../../public/images/getinvolved/pacman.png'
import logo14 from '../../public/images/getinvolved/Port-Townsend-Marine-Science-Center.jpg'
import roadmap from '../../public/images/getinvolved/roadmap.png'
import logo15 from '../../public/images/getinvolved/sound-action.png'
import topbanner from '../../public/images/getinvolved/srkw2-25.jpg'
import logo1 from '../../public/images/getinvolved/twt.png'
import valhacking from '../../public/images/getinvolved/val-hacking.png'
import logo16 from '../../public/images/getinvolved/VashonNatureCenter-logo.png'
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
        <Box px={{ xs: '50px', md: '20px' }}>
          <Typography
            variant="p"
            fontSize="30px"
            align="justify"
            paragraph={true}
            my="40px"
            textAlign="center"
            lineHeight="30px"
          >
            Current Roadmap
          </Typography>
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <Box
                  sx={{
                    my: '20px',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{ m: 1 }}
                    onClick={() => zoomIn()}
                  >
                    Zoom in
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RemoveIcon />}
                    sx={{ m: 1 }}
                    onClick={() => zoomOut()}
                  >
                    {' '}
                    Zoom out
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ m: 1 }}
                    startIcon={<RestartAltIcon />}
                    onClick={() => resetTransform()}
                  >
                    Reset
                  </Button>
                </Box>
                <TransformComponent>
                  <Image src={roadmap} alt="roadmap" />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
          <Typography
            variant="p"
            fontSize="16px"
            align="justify"
            paragraph={true}
            mt="40px"
            lineHeight="19.5px"
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
          my: '70px',
          px: '50px',
          textAlign: 'center',
          lineHeight: '28px',
        }}
      >
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          If you’re based in the Pacific Northwest, you can work with Orcasound
          in-person at a hackathon (see the{' '}
          <Link
            href="https://www.democracylab.org/projects/81"
            style={{ textDecoration: 'none', color: '#1B2B7B' }}
          >
            Orcasound project at DemocracyLab
          </Link>
          ). No matter where you are, you can join the{' '}
          <Link
            href="https://orcasound.slack.com/"
            style={{ textDecoration: 'none', color: '#1B2B7B' }}
          >
            Orcasound Slack
          </Link>
          , check out our{' '}
          <Link
            href="https://github.com/orgs/orcasound/repositories"
            style={{ textDecoration: 'none', color: '#1B2B7B' }}
          >
            Github repositories
          </Link>{' '}
          and{' '}
          <Link
            href="https://trello.com/w/hydrophonenetwork/home"
            style={{ textDecoration: 'none', color: '#1B2B7B' }}
          >
            Trello boards
          </Link>
          , subscribe to the{' '}
          <Link
            href="http://lists.orcasound.net/listinfo.cgi/dev-orcasound.net"
            style={{ textDecoration: 'none', color: '#1B2B7B' }}
          >
            Orcasound dev email distribution list
          </Link>
          , and find a place to contribute your talents. We hope you will share
          your expertise and innovations with us, and maybe even earn your way
          into the{' '}
          <Link
            href="https://www.orcasound.net/hacker-hall-of-fame/"
            style={{ textDecoration: 'none', color: '#1B2B7B' }}
          >
            Orcasound Hacker Hall of Fame!
          </Link>
        </Typography>
        <ActionButton
          link="https://www.orcasound.net/support/"
          text="LEARN MORE ABOUT VOLUNTEERING!"
        />
      </Box>

      <Box
        sx={{
          my: '150px',
          px: '50px',
          lineHeight: '28px',
        }}
      >
        <Typography
          variant="subtitle1"
          fontSize="44px"
          align="left"
          fontWeight="600"
          mb="40px"
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
          current network member, listed below who have e-signed the{' '}
          <Link
            color="#1B2B7B"
            href="https://docs.google.com/document/d/1OdKOICgPNHy7CkaHjzWMztH_zNir4UlbZbOdKtyRwI0/edit?usp=sharing"
          >
            2016-2020 Memorandum of Agreements(MOA)
          </Link>
          . Any organization or individual is welcome to join the network (for
          free!) either as the host of an hydrophone node, a researcher or
          citizen scientist an educator/activist or general volunteer.
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          If you are an individual wanting to volunteer, collaborate or donate,
          check out the many ways you can support Orcasound. Everyone can listen
          for whales, and learn the diverse sounds of Salish Sea.
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          If you are an organization wanting to join the network as the host of
          a new hydrophone node, an educational/outreach node, or both -- just
          read the history, mission and vision of the network e-sign the MOA and
          then email{' '}
          <Link
            href="mailto:info@orcasound.net"
            style={{ textDecoration: 'none', color: '#1B2B7B' }}
          >
            info@orcasound.net
          </Link>{' '}
          to begin collaborating. There are no membership fees-- just benefits
          roles and responsibilities.
        </Typography>
      </Box>

      <Box
        id="donate"
        sx={{
          my: '100px',
          px: '50px',
          letterSpacing: 0.02,
          textAlign: 'center',
          lineHeight: '28px',
        }}
      >
        <Typography
          variant="subtitle1"
          fontSize="44px"
          align="left"
          fontWeight="600"
          mb="40px"
        >
          Donate
        </Typography>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="justify"
        >
          Help us and our{' '}
          <Typography variant="soft" color="#1B2B7B">
            Orcasound network members
          </Typography>
          {''} by making charitable contribution to our partners, many of whom
          are 501(c)3 organizations Check out the link below to help strengthen
          and grow our network, while supporting our on-going conservation,
          research, and educational efforts.
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
        <a href="https://thewhaletrail.org/connect/donate/">
          <Image src={logo1} alt="The Whaletrail" />
        </a>
        <a href="https://folkssji.org/donate/">
          <Image src={logo2} alt="Friends of Lime Kiln Society" />
        </a>
        <a href="https://www.whaleresearch.com/supportcwr">
          <Image src={logo4} alt="Center of Whale Research" />
        </a>
        <a href="https://www.deepgreenwilderness.com/donate">
          <Image src={logo6} alt="Deep Green Wilderness" />
        </a>
        <a href="https://oceansinitiative.org/get-involved/">
          <Image src={logo8} alt="Oceans Initiative" />
        </a>
        <a href="https://pacmam.org/wp/donate/">
          <Image src={logo9} alt="Pacmam" />
        </a>
        <a href="https://www.whalescout.org/">
          <Image src={logo11} alt="Whale Scout" />
        </a>
        <a href="https://www.orcaconservancy.org/donate">
          <Image src={logo12} alt="Orca Conservancy" />
        </a>
        <a href="https://www.orcanetwork.org/donate">
          <Image src={logo13} alt="Orca Network" />
        </a>
        <a href="https://ptmsc.org/donate/">
          <Image src={logo14} alt="Port Townsend Marine Science Center" />
        </a>
        <a href="https://soundaction.org/">
          <Image src={logo15} alt="Sound Action" />
        </a>
        <a href="https://vashonnaturecenter.org/donate/">
          <Image src={logo16} alt="Vashon Nature Center" />
        </a>

        <a href="https://orcabehaviorinstitute.org/">
          <Typography
            variant="p"
            fontSize="20px"
            paragraph={true}
            align="justify"
            color="#1B2B7B"
            sx={{
              textDecoration: 'underline',
              fontWeight: '600',
              mt: '20px',
            }}
          >
            Orca Behavior Institute
          </Typography>
        </a>

        <a href="https://www.projectseawolf.org/projectseawolforg/How_to_Help.html">
          <Typography
            variant="p"
            fontSize="20px"
            paragraph={true}
            align="justify"
            color="#1B2B7B"
            sx={{
              textDecoration: 'underline',
              fontWeight: '600',
              mt: '20px',
            }}
          >
            Project SeaWolf
          </Typography>
        </a>
      </div>
    </div>
  )
}

export default GetInvolved
