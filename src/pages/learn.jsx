import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Head from 'next/head'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'

import LearnBanner from '../../public/images/learn.jpg'
import callS01 from '../../public/images/learn/Call-S01.png'
import callS16 from '../../public/images/learn/Call-S16.png'
import callS19 from '../../public/images/learn/Call-S19.png'
import organization1 from '../../public/images/partner1.png'
import organization2 from '../../public/images/partner2.png'
import salishsea from '../../public/images/salishsea.png'
import CallCatalogGrid from '../components/Learn/CallCatalogGrid'
import StickyNav from '../components/StickyNav'
import TopBanner from '../components/TopBanner'
import { pushToDataLayer } from '../utils/gtm'

const LEARN_SECTIONS = [
  {
    id: 'salish-sea',
    name: 'Sounds of the Salish Sea',
    renderKey: 'salishSea',
  },
  {
    id: 'common-calls',
    name: '3 Common Calls',
    renderKey: 'commonCalls',
  },
  {
    id: 'call-catalog',
    name: 'Southern Resident Killer Whale Call Catalog',
    renderKey: 'callCatalog',
    fullWidthBg: '#090f2e', // Unique background
    textColor: 'white', // Unique text color
  },
  {
    id: 'exhibits',
    name: 'Exhibits',
    renderKey: 'exhibits',
  },
]

// 1. Define the mapping
const SECTION_COMPONENTS = {
  salishSea: () => <SalishSeaContent />,
  commonCalls: () => <CommonCallsContent />,
  callCatalog: () => <CallCatalogContent />,
  exhibits: () => <ExhibitsContent />,
}

const audioS01 = '/audio/FO-S01.mp3'
const audioS16 = '/audio/FO-S16.mp3'
const audioS19 = '/audio/FO-S19.mp3'

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

const SalishSeaContent = () => (
  <>
    {/* Sounds of the Salish Sea Section */}
    <Typography variant="body1" fontSize="18px" mb={4} color="text.secondary">
      Explore common sounds of the Salish Sea by selecting the animals and other
      objects in this panoramic soundscape of the inland waters of Washington
      State (USA) and British Columbia (Canada)
    </Typography>

    <Box sx={{ textAlign: 'center', mt: 4 }}>
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
          style={{
            maxWidth: '100%',
            height: 'auto',
            width: 'auto',
          }}
        />
      </a>
    </Box>
  </>
)
const CommonCallsContent = () => (
  <>
    <Typography variant="body1" fontSize="18px" mb={4} color="text.secondary">
      Conveniently, a few calls are used almost exclusively by each Southern
      Resident Killer Whale pod. This means that by memorizing just 3 calls, you
      can tell with great certainty that you are hearing a particular pod!
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
            alt="J Pod's call S01 - Frequency and Time"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
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
          onPlay={() =>
            pushToDataLayer('audio_play', {
              call_name: 'S01',
              section: '3_common_calls',
            })
          }
        />
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          textAlign="left"
        >
          J pod is the most local of the pods, commonly visiting Seattle about
          once a month throughout the year, and is famous for J2/Granny who may
          have been the oldest female orca living to be about 100 years old.
        </Typography>
      </CallCard>

      {/* K Pod Call */}
      <CallCard>
        <Box mb={2}>
          <Image
            src={callS16}
            alt="K Pod's call S16 - Frequency and Time"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
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
          onPlay={() =>
            pushToDataLayer('audio_play', {
              call_name: 'S16',
              section: '3_common_calls',
            })
          }
        />
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          textAlign="left"
        >
          K pod is the smallest pod with less than ~20 members since an annual
          census began in the 1970s, but they have the cutest call which most
          listeners think sounds like a kitten mewing.
        </Typography>
      </CallCard>

      {/* L Pod Call */}
      <CallCard>
        <Box mb={2}>
          <Image
            src={callS19}
            alt="L Pod's call S19 - Frequency and Time"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
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
          onPlay={() =>
            pushToDataLayer('audio_play', {
              call_name: 'S19',
              section: '3_common_calls',
            })
          }
        />
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          textAlign="left"
        >
          L pod travels the furthest each year, often foraging as far south as
          San Francisco in wintertime, and is the largest pod with more than 30
          members now (and almost 60 in 1993).
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
        style={{
          color: '#1e3a8a',
          textDecoration: 'underline',
          fontWeight: 600,
        }}
      >
        Orcasound YouTube channel
      </a>
      .
    </Typography>
  </>
)
const CallCatalogContent = () => (
  <>
    <Typography variant="body1" fontSize="20px" mb={4}>
      Now that you&apos;ve familiarized yourself with the 3 most common calls,
      dive in to the call catalog to learn the vocalizations you will hear when
      listening to the livestreaming hydrophones during orca events.
    </Typography>

    <CallCatalogGrid />
  </>
)
const ExhibitsContent = () => (
  <>
    {/* Seattle Aquarium */}
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Box sx={{ mb: 2 }}>
        <Image
          src={organization1}
          alt="Seattle Aquarium exhibit"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Typography variant="body1" fontSize="18px" color="text.secondary">
        For another tour of the sounds that are most commonly heard in the
        Salish Sea, visit the listening station at the Seattle Aquarium in
        Washington State.
      </Typography>
    </Box>

    {/* Marine Science Center */}
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Box sx={{ mb: 2 }}>
        <Image
          src={organization2}
          alt="Marine Science Center exhibit"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Typography variant="body1" fontSize="18px" color="text.secondary">
        For a challenge beyond the three favorite calls of the SRKWs, learn a
        bunch more of the calls made by the Southern Resident Killer Whales
        (developed by educators at NOAA, the Port Townsend Marine Science
        Center, and Killer Whale Tales) at the Marine Science Center in Port
        Townsend in Washington State.
      </Typography>
    </Box>
  </>
)

export const learn = () => {
  const navLinks = LEARN_SECTIONS.map((section) => ({
    name: section.name,
    id: section.id,
    renderKey: section.renderKey,
  }))

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
      <Box id="learn" sx={{ mt: 6 }} />
      <StickyNav
        navLinks={navLinks}
        onLinkClick={(link) => {
          pushToDataLayer('jump_link_click', {
            link_text: link.name,
            page: 'learn',
          })
        }}
      />
      {LEARN_SECTIONS.map((section) => {
        const ContentComponent = SECTION_COMPONENTS[section.renderKey]

        // We can handle specific section styling (like the dark background for the catalog)
        // by checking the renderKey or adding extra properties to LEARN_SECTIONS.
        return (
          <Box
            key={section.id}
            id={section.id}
            component="section"
            sx={{
              my: 8,
              py: section.fullWidthBg ? 8 : 0,
              bgcolor: section.fullWidthBg || 'transparent',
              color: section.textColor || 'inherit',
            }}
          >
            <Box
              sx={{
                maxWidth: 'lg', // This replaces maxWidth="lg"
                mx: 'auto', // This replaces the centering logic
                px: { xs: 2, sm: 3, lg: 4 }, // This replaces Container's default padding
              }}
            >
              <Typography variant="h3" component="h1" fontWeight="600" mb={3}>
                {section.name}
              </Typography>
              {ContentComponent ? <ContentComponent /> : null}
            </Box>
          </Box>
        )
      })}
    </div>
  )
}

export default learn
