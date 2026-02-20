import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Head from 'next/head'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'
import { Link as ScrollLink } from 'react-scroll'

import audioS01 from '../../public/audio/FO-S01.mp3'
import audioS16 from '../../public/audio/FO-S16.mp3'
import audioS19 from '../../public/audio/FO-S19.mp3'
import LearnBanner from '../../public/images/learn.jpg'
import callS01 from '../../public/images/learn/Call-S01.png'
import callS16 from '../../public/images/learn/Call-S16.png'
import callS19 from '../../public/images/learn/Call-S19.png'
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
            <a
              href="https://orcasound.net/ed/booth/local.html?learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={salishsea}
                alt="Sounds Of The Salish Sea"
                width={800}
                height={450}
                layout="intrinsic"
                quality={65}
              />
            </a>
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
          <Typography variant="h4" component="h2" fontWeight="600" mb={2}>
            3 Common Calls
          </Typography>
          <Typography
            variant="body1"
            fontSize="18px"
            mb={4}
            color="text.secondary"
          >
            Conveniently, a few calls are used almost exclusively by each
            Southern Resident Killer Whale pod. This means that by memorizing
            just 3 calls, you can tell with great certainty that you are hearing
            a particular pod!
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
                  src={callS01}
                  alt="J pod's call S01 - Frequency and Time"
                />
              </Box>
              <Typography variant="h6" fontWeight="600" mb={1}>
                J Pod&apos;s Favorite Call: S01
              </Typography>
              <ReactAudioPlayer
                src={audioS01}
                autoPlay={false}
                controls
                style={{ width: '100%' }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                mt={2}
                textAlign="left"
              >
                J pod is the most local of the pods, commonly visiting Seattle
                about once a month throughout the year, and is famous for
                J2/Granny who may have been the oldest female orca living to be
                about 100 years old.
              </Typography>
            </CallCard>

            {/* K Pod Call */}
            <CallCard>
              <Box mb={2}>
                <Image
                  src={callS16}
                  alt="K pod's call S16 - Frequency and Time"
                />
              </Box>
              <Typography variant="h6" fontWeight="600" mb={1}>
                K Pod&apos;s Favorite Call: S16
              </Typography>
              <ReactAudioPlayer
                src={audioS16}
                autoPlay={false}
                controls
                style={{ width: '100%' }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                mt={2}
                textAlign="left"
              >
                K pod is the smallest pod with less than ~20 members since an
                annual census began in the 1970s, but they have the cutest call
                which most listeners think sounds like a kitten mewing.
              </Typography>
            </CallCard>

            {/* L Pod Call */}
            <CallCard>
              <Box mb={2}>
                <Image
                  src={callS19}
                  alt="L pod's call S19 - Frequency and Time"
                />
              </Box>
              <Typography variant="h6" fontWeight="600" mb={1}>
                L Pod&apos;s Favorite Call: S19
              </Typography>
              <ReactAudioPlayer
                src={audioS19}
                autoPlay={false}
                controls
                style={{ width: '100%' }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                mt={2}
                textAlign="left"
              >
                L pod travels the furthest each year, often foraging as far
                south as San Francisco in wintertime, and is the largest pod
                with more than 30 members now (and almost 60 in 1993).
              </Typography>
            </CallCard>
          </Box>

          <Typography
            variant="body1"
            fontSize="18px"
            mt={4}
            color="text.secondary"
            textAlign="center"
          >
            To learn about different pods, please visit the{' '}
            <a
              href="https://www.youtube.com/@OrcasoundHydrophones"
              target="_blank"
              rel="noopener noreferrer"
            >
              Orcasound Youtube channel
            </a>
            .
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
