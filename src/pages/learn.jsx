import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Head from 'next/head'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'
import { Link as ScrollLink } from 'react-scroll'

import audio from '../../public/audio/frequency.mp3'
import frequency1 from '../../public/images/frequency2.png'
import LearnBanner from '../../public/images/learn.jpg'
import organization1 from '../../public/images/partner1.png'
import organization2 from '../../public/images/partner2.png'
import salishsea from '../../public/images/salishsea.png'
import CallCatalogGrid from '../components/Learn/CallCatalogGrid'
import TopBanner from '../components/TopBanner'

const NavLink = styled(ScrollLink)(() => ({
  display: 'block',
  padding: '12px 24px',
  backgroundColor: '#1e3a8a',
  color: 'white',
  borderRadius: '8px',
  fontWeight: 500,
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#1d4ed8',
  },
}))

const CallCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '24px',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    marginBottom: '24px',
  },
}))

export const learn = () => {
  const navLinks = [
    { name: 'Sounds of the Salish Sea', id: 'salish-sea' },
    { name: '3 Common Calls', id: 'common-calls' },
    { name: 'Exhibits', id: 'exhibits' },
    { name: 'Southern Resident Killer Whale Call Catalog', id: 'call-catalog' },
  ]

  return (
    <div>
      <Head>
        <title>Orcasound | Learn</title>
      </Head>
      <TopBanner
        bannerImg={LearnBanner}
        pageTitle={`Learn`}
        pageDesc={`You'll hear a lot of different sounds on the hydrophones. Select the jump links below or scroll down to learn about the marine acoustic landscape.`}
        scrollToId={`learn`}
      />
      <div id="learn" />

      {/* Content Container */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Jump Links Navigation */}
        <Box component="nav" sx={{ my: 6 }}>
          <Box
            component="ul"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: 'wrap',
              gap: 1.5,
              justifyContent: 'center',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {navLinks.map((link) => (
              <Box component="li" key={link.id}>
                <NavLink to={link.id} smooth={true} spy={true} offset={-80}>
                  {link.name}
                </NavLink>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Sounds of the Salish Sea Section */}
        <Box component="section" id="salish-sea" sx={{ my: 8 }}>
          <Typography variant="h3" component="h1" fontWeight="600" mb={3}>
            Sounds Of The Salish Sea
          </Typography>
          <Typography
            variant="body1"
            fontSize="18px"
            mb={4}
            color="text.secondary"
          >
            Explore common sounds of the Salish Sea by selecting the animals and
            other objects in this panoramic soundscape of the inland waters of
            Washington State (USA) and British Columbia (Canada)
          </Typography>

          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Image
              src={salishsea}
              alt="Sounds Of The Salish Sea"
              width={800}
              height={450}
              layout="intrinsic"
              quality={65}
            />
          </Box>

          {/* <Box sx={{ maxWidth: 400, mx: 'auto', my: 10, borderRadius: '50%', overflow: 'hidden' }}>
            <Image
              src={roundorca}
              alt="OrcaImage"
              width={400}
              height={350}
              layout="intrinsic"
              quality={65}
            />
          </Box> */}
        </Box>

        {/* 3 Common Calls Section */}
        <Box component="section" id="common-calls" sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" fontWeight="600" mb={4}>
            3 Common Calls
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {/* J Pod Call */}
            <CallCard>
              <Box mb={2}>
                <Image
                  src={frequency1}
                  alt="J pod's call - Frequency and Time"
                />
              </Box>
              <Typography variant="h6" fontWeight="600" mb={1}>
                J pod&apos;s Favorite call: 501
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                More description goes here
              </Typography>
              <ReactAudioPlayer
                src={audio}
                autoPlay={false}
                controls
                style={{ width: '100%' }}
              />
            </CallCard>

            {/* K Pod Call */}
            <CallCard>
              <Box mb={2}>
                <Image
                  src={frequency1}
                  alt="K pod's call - Frequency and Time"
                />
              </Box>
              <Typography variant="h6" fontWeight="600" mb={1}>
                K pod&apos;s Favorite call: 516
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                More description goes here
              </Typography>
              <ReactAudioPlayer
                src={audio}
                autoPlay={false}
                controls
                style={{ width: '100%' }}
              />
            </CallCard>

            {/* L Pod Call */}
            <CallCard>
              <Box mb={2}>
                <Image
                  src={frequency1}
                  alt="L pod's call - Frequency and Time"
                />
              </Box>
              <Typography variant="h6" fontWeight="600" mb={1}>
                L pod&apos;s Favorite call: 519
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                More description goes here
              </Typography>
              <ReactAudioPlayer
                src={audio}
                autoPlay={false}
                controls
                style={{ width: '100%' }}
              />
            </CallCard>
          </Box>
        </Box>

        {/* Exhibits Section */}
        <Box component="section" id="exhibits" sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" fontWeight="600" mb={3}>
            Exhibits
          </Typography>
          <Typography
            variant="body1"
            fontSize="18px"
            color="text.secondary"
            mb={2}
          >
            For another tour of the sounds that are most commonly heard in the
            Salish Sea,{' '}
            <a href="http://orcasound.net/sakiosk/node/os/index.php?os-listen">
              visit the listening station at the Seattle Aquarium
            </a>{' '}
            and click on &quot;More recordings.&quot;
          </Typography>
          <Typography variant="body1" fontSize="18px" color="text.secondary">
            For a challenge beyond the three favorite calls of the SRKWs, learn
            a bunch more of the calls made by the southern resident killer
            whales (developed by educators at NOAA, the Port Townsend Marine
            Science Center, and Killer Whale Tales).
          </Typography>
        </Box>
      </Container>

      {/* Call Catalog Section */}
      <Box
        component="section"
        id="call-catalog"
        sx={{
          bgcolor: '#090f2e',
          color: 'white',
          px: { xs: 2, sm: 3, lg: 4 },
          py: 8,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            fontWeight="600"
            mt={3}
            mb={3}
          >
            Southern Resident Killer Whale Call Catalog
          </Typography>
          <Typography variant="body1" fontSize="20px" mb={4}>
            Now that you&apos;ve familiarized yourself with the 3 most common
            calls, dive in to the call catalog to learn the vocalizations you
            will hear when listening to the livestreaming hydrophones during
            orca events.
          </Typography>

          <CallCatalogGrid />
        </Container>
      </Box>

      {/* Organization Logos */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            my: 10,
          }}
        >
          <Image src={organization1} alt="Seattle aquarium exhibit" />
          <a
            href="https://killerwhaletales.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={organization2} alt="Marine Science Center Logo" />
          </a>
        </Box>
      </Container>
    </div>
  )
}

export default learn
