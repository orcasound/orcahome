import InfoIcon from '@mui/icons-material/Info'
import { Box, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PortableText } from '@portabletext/react'
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
import { TOOLTIPS } from '../components/Catalog/constants'
import CallCatalogGrid from '../components/Learn/CallCatalogGrid'
import StickyNav from '../components/StickyNav'
import TopBanner from '../components/TopBanner'
import { ORCASOUND_YOUTUBE_URL } from '../constants/links'
import { getClient } from '../sanity/client'
import { LEARN_PAGE_QUERY } from '../sanity/queries'
import { pushToDataLayer } from '../utils/gtm'

const audioS01 = '/audio/FO-S01.mp3'
const audioS16 = '/audio/FO-S16.mp3'
const audioS19 = '/audio/FO-S19.mp3'

// Serializer for the "3 Common Calls" closing sentence when it comes from
// Sanity as rich text — keeps the centered styling, link colour, and analytics.
const closingComponents = {
  block: {
    normal: ({ children }) => (
      <Typography
        variant="body1"
        fontSize="18px"
        mt={4}
        color="text.secondary"
        textAlign="center"
      >
        {children}
      </Typography>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isInternal = href.startsWith('/')
      return (
        <Link
          href={href}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
          sx={{
            color: '#1e3a8a',
            textDecoration: 'underline',
            fontWeight: 600,
          }}
          onClick={(event) =>
            pushToDataLayer(
              isInternal ? 'jump_link_click' : 'external_link_click',
              {
                link_text: event.currentTarget.textContent,
                destination: href,
                page: 'learn',
              }
            )
          }
        >
          {children}
        </Link>
      )
    },
  },
}

// Current hard-coded copy, used as a per-field fallback whenever Sanity has no
// value for a field (or Sanity is unreachable).
const DEFAULTS = {
  heroTitle: 'Learn',
  heroDescription: `You'll hear a lot of different sounds on the hydrophones. Select the jump links below or scroll down to learn about the marine acoustic landscape.`,
  salishSeaIntro: `Explore common sounds of the Salish Sea by selecting the animals and other objects in this panoramic soundscape of the inland waters of Washington State (USA) and British Columbia (Canada)`,
  salishSeaLink: 'https://orcasound.net/ed/booth/local.html?learn',
  commonCallsIntro: `Conveniently, a few calls are used almost exclusively by each Southern Resident Killer Whale pod. This means that by memorizing just 3 calls, you can tell with great certainty that you are hearing a particular pod!`,
  callCatalogIntro: `Now that you've familiarized yourself with the 3 most common calls, dive in to the call catalog to learn the vocalizations you will hear when listening to the livestreaming hydrophones during orca events.`,
}

// Built-in call cards, used verbatim when Sanity has no `calls`.
const DEFAULT_CALLS = [
  {
    callName: 'S01',
    title: "J Pod's Favorite Call: S01",
    alt: "J Pod's call S01 - Frequency and Time",
    spectrogram: { src: callS01 },
    audioSrc: audioS01,
    description: `J pod is the most local of the pods, commonly visiting Seattle about once a month throughout the year, and is famous for J2/Granny who may have been the oldest female orca living to be about 100 years old.`,
  },
  {
    callName: 'S16',
    title: "K Pod's Favorite Call: S16",
    alt: "K Pod's call S16 - Frequency and Time",
    spectrogram: { src: callS16 },
    audioSrc: audioS16,
    description: `K pod is the smallest pod with less than ~20 members since an annual census began in the 1970s, but they have the cutest call which most listeners think sounds like a kitten mewing.`,
  },
  {
    callName: 'S19',
    title: "L Pod's Favorite Call: S19",
    alt: "L Pod's call S19 - Frequency and Time",
    spectrogram: { src: callS19 },
    audioSrc: audioS19,
    description: `L pod travels the furthest each year, often foraging as far south as San Francisco in wintertime, and is the largest pod with more than 30 members now (and almost 60 in 1993).`,
  },
]

// Built-in exhibits, used verbatim when Sanity has no `exhibits`.
const DEFAULT_EXHIBITS = [
  {
    image: { src: organization1 },
    alt: 'Seattle Aquarium exhibit',
    text: `For another tour of the sounds that are most commonly heard in the Salish Sea, visit the listening station at the Seattle Aquarium in Washington State.`,
  },
  {
    image: { src: organization2 },
    alt: 'Marine Science Center exhibit',
    text: `For a challenge beyond the three favorite calls of the SRKWs, learn a bunch more of the calls made by the Southern Resident Killer Whales (developed by educators at NOAA, the Port Townsend Marine Science Center, and Killer Whale Tales) at the Marine Science Center in Port Townsend in Washington State.`,
  },
]

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

// 1. Define the mapping. Wrapped in arrows so the object can reference the
// component consts declared further down, and to thread `content` through.
const SECTION_COMPONENTS = {
  salishSea: (props) => <SalishSeaContent {...props} />,
  commonCalls: (props) => <CommonCallsContent {...props} />,
  callCatalog: (props) => <CallCatalogContent {...props} />,
  exhibits: (props) => <ExhibitsContent {...props} />,
}

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

const SalishSeaContent = ({ content }) => (
  <>
    {/* Sounds of the Salish Sea Section */}
    <Typography variant="body1" fontSize="18px" mb={4} color="text.secondary">
      {content.salishSeaIntro}
    </Typography>

    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <a href={content.salishSeaLink} target="_blank" rel="noopener noreferrer">
        <Image
          src={content.salishSeaImage.src}
          width={content.salishSeaImage.width}
          height={content.salishSeaImage.height}
          alt="Sounds Of The Salish Sea"
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
const CommonCallsContent = ({ content }) => (
  <>
    <Typography variant="body1" fontSize="18px" mb={4} color="text.secondary">
      {content.commonCallsIntro}
    </Typography>

    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'action.hover',
          padding: '8px 16px',
          borderRadius: '8px',
        }}
      >
        <InfoIcon color="primary" fontSize="small" />
        {TOOLTIPS.SPECTROGRAM}
      </Typography>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {content.calls.map((call, index) => (
        <CallCard key={index}>
          {call.spectrogram?.src && (
            <Box mb={2}>
              <Image
                src={call.spectrogram.src}
                width={call.spectrogram.width}
                height={call.spectrogram.height}
                alt={call.alt || call.title}
                title={TOOLTIPS.SPECTROGRAM}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          )}
          <Typography variant="h6" fontWeight="600" mb={1}>
            {call.title}
          </Typography>
          {call.audioSrc && (
            <ReactAudioPlayer
              title={`Audio player for ${call.title}`}
              src={call.audioSrc}
              autoPlay={false}
              controls
              style={{ width: '100%' }}
              onPlay={() =>
                pushToDataLayer('audio_play', {
                  call_name: call.callName,
                  section: '3_common_calls',
                })
              }
            />
          )}
          <Typography
            variant="body1"
            color="text.secondary"
            mt={2}
            textAlign="left"
          >
            {call.description}
          </Typography>
        </CallCard>
      ))}
    </Box>

    {content.commonCallsClosing ? (
      <PortableText
        value={content.commonCallsClosing}
        components={closingComponents}
      />
    ) : (
      <Typography
        variant="body1"
        fontSize="18px"
        mt={4}
        color="text.secondary"
        textAlign="center"
      >
        To learn about different pods, please visit the{' '}
        <a
          href={ORCASOUND_YOUTUBE_URL}
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
    )}
  </>
)
const CallCatalogContent = ({ content }) => (
  <>
    <Typography variant="body1" fontSize="20px" mb={4}>
      {content.callCatalogIntro}
    </Typography>

    <CallCatalogGrid />
  </>
)
const ExhibitsContent = ({ content }) => (
  <>
    {content.exhibits.map((exhibit, index) => (
      <Box key={index} sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          <Image
            src={exhibit.image.src}
            width={exhibit.image.width}
            height={exhibit.image.height}
            alt={exhibit.alt || 'Exhibit'}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Box>
        <Typography variant="body1" fontSize="18px" color="text.secondary">
          {exhibit.text}
        </Typography>
      </Box>
    ))}
  </>
)

// Resolve a Sanity image (remote CDN url + asset dimensions) or fall back to a
// bundled static import (which carries its own intrinsic dimensions).
const resolveImage = (url, width, height, fallback) =>
  url ? { src: url, width, height } : { src: fallback }

export const learn = ({ learnPage }) => {
  const source = learnPage
  // Per-field fallback: Sanity value when present, otherwise the hard-coded copy.
  const content = {
    heroTitle: source?.heroTitle || DEFAULTS.heroTitle,
    heroDescription: source?.heroDescription || DEFAULTS.heroDescription,
    heroImage: source?.heroImageUrl || LearnBanner,
    salishSeaIntro: source?.salishSeaIntro || DEFAULTS.salishSeaIntro,
    salishSeaImage: source?.salishSeaImageUrl
      ? {
          src: source.salishSeaImageUrl,
          width: source.salishSeaImageWidth,
          height: source.salishSeaImageHeight,
        }
      : { src: salishsea, width: 800, height: 450 },
    salishSeaLink: source?.salishSeaLink || DEFAULTS.salishSeaLink,
    commonCallsIntro: source?.commonCallsIntro || DEFAULTS.commonCallsIntro,
    commonCallsClosing: source?.commonCallsClosing?.length
      ? source.commonCallsClosing
      : null,
    calls: source?.calls?.length
      ? source.calls.map((call) => ({
          callName: call.title,
          title: call.title,
          alt: call.title,
          description: call.description,
          spectrogram: resolveImage(
            call.spectrogramUrl,
            call.spectrogramWidth,
            call.spectrogramHeight,
            null
          ),
          audioSrc: call.audioUrl || null,
        }))
      : DEFAULT_CALLS,
    callCatalogIntro: source?.callCatalogIntro || DEFAULTS.callCatalogIntro,
    exhibits: source?.exhibits?.length
      ? source.exhibits.map((exhibit) => ({
          image: resolveImage(
            exhibit.imageUrl,
            exhibit.imageWidth,
            exhibit.imageHeight,
            null
          ),
          alt: 'Exhibit',
          text: exhibit.text,
        }))
      : DEFAULT_EXHIBITS,
  }

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
        bannerImg={content.heroImage}
        pageTitle={content.heroTitle}
        pageDesc={content.heroDescription}
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
              {ContentComponent ? <ContentComponent content={content} /> : null}
            </Box>
          </Box>
        )
      })}
    </div>
  )
}

export default learn

// Fetch the Learn content from Sanity at build time (revalidated for ISR). If
// Sanity is unreachable or unconfigured, fall back to null and the component
// renders its built-in DEFAULTS.
export async function getStaticProps() {
  let learnPage = null
  try {
    learnPage = await getClient(false).fetch(LEARN_PAGE_QUERY)
  } catch {
    learnPage = null
  }
  return { props: { learnPage }, revalidate: 60 }
}
