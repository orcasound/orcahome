import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { Link as ScrollElement } from 'react-scroll'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import logo4 from '../../public/images/getinvolved/CWR_logo.png'
import logo6 from '../../public/images/getinvolved/deepgreen.png'
import logo2 from '../../public/images/getinvolved/folks.png'
import hackathon from '../../public/images/getinvolved/hackathon.png'
import hydrophonestand from '../../public/images/getinvolved/hydrophone-stand.png'
import livediy from '../../public/images/getinvolved/live-diy.png'
import lonhydrophone from '../../public/images/getinvolved/lon-hydrophone.png'
import logo8 from '../../public/images/getinvolved/OI.png'
import logo18 from '../../public/images/getinvolved/orca-behavior-institute.svg'
import logo12 from '../../public/images/getinvolved/orca-conservancy.png'
import logo13 from '../../public/images/getinvolved/orca-network.png'
import logo9 from '../../public/images/getinvolved/pacman.png'
import logo14 from '../../public/images/getinvolved/Port-Townsend-Marine-Science-Center.jpg'
import logo17 from '../../public/images/getinvolved/project-seawolf.jpg'
import roadmap from '../../public/images/getinvolved/roadmap.png'
import logo15 from '../../public/images/getinvolved/sound-action.png'
import topbanner from '../../public/images/getinvolved/srkw2-25.jpg'
import logo1 from '../../public/images/getinvolved/twt.png'
import valhacking from '../../public/images/getinvolved/val-hacking.png'
import logo16 from '../../public/images/getinvolved/VashonNatureCenter-logo.png'
import logo11 from '../../public/images/getinvolved/ws_logo.png'
import TechStackList from '../components/GetInvolved/TechStackList'
import StickyNav from '../components/StickyNav'
import TopBanner from '../components/TopBanner'
import { pushToDataLayer } from '../utils/gtm'
import ActionButton from './../components/ActionButton'

const GETINVOLVED_SECTIONS = [
  {
    id: 'volunteer',
    name: 'Volunteer',
    renderKey: 'volunteer',
  },
  {
    id: 'for_developers',
    name: 'Developers',
    renderKey: 'forDevelopers',
    margin: '30px 25px',
  },
  {
    id: 'donate',
    name: 'Support',
    renderKey: 'donate',
  },
]

// 1. Define the mapping
const SECTION_COMPONENTS = {
  volunteer: () => <VolunteerContent />,
  forDevelopers: () => <DevelopersContent />,
  donate: () => <SupportContent />,
}

const VolunteerContent = () => (
  <>
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
        <Image
          alt="Val hacking node code."
          src={valhacking}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Image
          alt="Binaural hydrophone stand."
          src={hydrophonestand}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Image
        alt="Lon does hydrophone wizardly!"
        src={lonhydrophone}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <Image
        alt="The live-streaming DIY solution."
        src={livediy}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
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
  </>
)
const DevelopersContent = () => (
  <>
    <Typography variant="body1">
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
        Orcasound Web App
      </Typography>
      <Box sx={{ maxWidth: '600px', margin: 'auto' }}>
        <Image
          alt="DemocracyLab Hackathon"
          src={hackathon}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          margin: '20px 0',
          textAlign: 'center',
        }}
      >
        DemocracyLab Hackathon
      </Typography>
    </Box>
    <Typography variant="body1" sx={{ margin: '50px 0 0px' }}>
      {`Our crowning jewel is the Orcasound web app — a suite of new cloud- and browser-based ways 
          for citizen scientists and artificial intelligence to listen for whales in real-time. 
          As of April, 2020, this is the Orcasound tech stack:`}
    </Typography>
    <TechStackList />
    <Box maxWidth="md" mx="auto">
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
                  onClick={() => {
                    zoomIn()
                    pushToDataLayer('roadmap_interaction', {
                      action: 'zoom_in',
                    })
                  }}
                >
                  Zoom in
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RemoveIcon />}
                  sx={{ m: 1 }}
                  onClick={() => {
                    zoomOut()
                    pushToDataLayer('roadmap_interaction', {
                      action: 'zoom_out',
                    })
                  }}
                >
                  {' '}
                  Zoom out
                </Button>
                <Button
                  variant="outlined"
                  sx={{ m: 1 }}
                  startIcon={<RestartAltIcon />}
                  onClick={() => {
                    resetTransform()
                    pushToDataLayer('roadmap_interaction', {
                      action: 'reset',
                    })
                  }}
                >
                  Reset
                </Button>
              </Box>
              <TransformComponent>
                <Image
                  src={roadmap}
                  alt="roadmap"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
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
          launched November 1, 2018; green features are being beta-tested since
          November 2019; red features are in development or requested. Click to
          view expanded image.
        </Typography>
      </Box>
    </Box>

    <Box
      sx={{
        my: '70px',
        px: '50px',
        textAlign: 'center',
        lineHeight: '28px',
      }}
    >
      <Typography variant="p" fontSize="20px" paragraph={true} align="justify">
        If you’re based in the Pacific Northwest, you can work with Orcasound
        in-person at a hackathon (see the{' '}
        <Link
          href="https://www.democracylab.org/projects/81"
          style={{ textDecoration: 'underline', color: '#1B2B7B' }}
          onClick={() =>
            pushToDataLayer('external_link_click', {
              link_text: 'Orcasound project at DemocracyLab',
              destination: 'https://www.democracylab.org/projects/81',
            })
          }
        >
          Orcasound project at DemocracyLab
        </Link>
        ). No matter where you are, you can find out how to volunteer with us by
        going to our{' '}
        <Link
          href="https://github.com/orcasound"
          style={{ textDecoration: 'underline', color: '#1B2B7B' }}
          onClick={() =>
            pushToDataLayer('external_link_click', {
              link_text: 'GitHub repositories',
              destination: 'https://github.com/orcasound',
            })
          }
        >
          GitHub page
        </Link>{' '}
        and subscribe to the{' '}
        <Link
          href="http://lists.orcasound.net/listinfo.cgi/dev-orcasound.net"
          style={{ textDecoration: 'underline', color: '#1B2B7B' }}
          onClick={() =>
            pushToDataLayer('external_link_click', {
              link_text: 'Orcasound dev email distribution list',
              destination:
                'http://lists.orcasound.net/listinfo.cgi/dev-orcasound.net',
            })
          }
        >
          Orcasound dev email distribution list
        </Link>{' '}
        to find a place to contribute your talents. We hope you will share your
        expertise and innovations with us, and maybe even earn your way into the{' '}
        <Link
          href="/hacker-hall-of-fame"
          style={{ textDecoration: 'underline', color: '#1B2B7B' }}
          onClick={() =>
            pushToDataLayer('jump_link_click', {
              link_text: 'Orcasound Hacker Hall of Fame',
              page: 'get_involved',
            })
          }
        >
          Orcasound Hacker Hall of Fame!
        </Link>
      </Typography>
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
        Memorandum Of Agreement
      </Typography>
      <Typography variant="p" fontSize="20px" paragraph={true} align="justify">
        The real-time audio streams, citizen science projects, educational
        materials, and outreach projects of Orcasound are brought to you by the
        current network members, listed below, who have e-signed the{' '}
        <Link
          color="#1B2B7B"
          href="https://docs.google.com/document/d/1OdKOICgPNHy7CkaHjzWMztH_zNir4UlbZbOdKtyRwI0/edit?usp=sharing"
          onClick={() =>
            pushToDataLayer('external_link_click', {
              link_text: '2016-2020 Memorandum of Agreements (MOA)',
              destination:
                'https://docs.google.com/document/d/1OdKOICgPNHy7CkaHjzWMztH_zNir4UlbZbOdKtyRwI0/edit?usp=sharing',
            })
          }
        >
          2021-2025 Memorandum of Agreement (MOA)
        </Link>
        . Any organization or individual is welcome to join the network (for
        free!), either as the host of a hydrophone node, a researcher or citizen
        scientist, an educator/activist, or a general volunteer.
      </Typography>
      <Typography variant="p" fontSize="20px" paragraph={true} align="justify">
        If you&apos;re an individual wanting to volunteer, collaborate, or
        donate, check out the many ways you can support Orcasound. Everyone can
        listen for whales, and learn the diverse sounds of the Salish Sea.
      </Typography>
      <Typography variant="p" fontSize="20px" paragraph={true} align="justify">
        If you&apos;re an organization wanting to join the network as the host
        of a new hydrophone node, an educational/outreach node, or both — just
        read the history, mission, and vision of the network, e-sign the MOA,
        and then email{' '}
        <Link
          href="mailto:info@orcasound.net"
          style={{ textDecoration: 'none', color: '#1B2B7B' }}
          onClick={() =>
            pushToDataLayer('external_link_click', {
              link_text: 'info@orcasound.net',
              destination: 'mailto:info@orcasound.net',
            })
          }
        >
          info@orcasound.net
        </Link>{' '}
        to begin collaborating. There are no membership fees — just benefits,
        roles, and responsibilities.
      </Typography>
    </Box>
  </>
)
const SupportContent = () => (
  <>
    <Typography variant="p" fontSize="20px" paragraph={true} align="justify">
      Help us and our{' '}
      <Typography variant="soft" color="#1B2B7B">
        Orcasound network members
      </Typography>
      {''} by making charitable contribution to our partners, many of whom are
      501(c)3 organizations Check out the link below to help strengthen and grow
      our network, while supporting our on-going conservation, research, and
      educational efforts.
    </Typography>
    <Typography variant="p" fontSize="20px" paragraph={true} align="justify">
      You can also directly support the many dedicated volunteers who help
      Orcasound keep running and improve over time. Take a look at our Hacker
      hall of fame and our Github repositories and consider sponsoring the work
      of our most-dedicated contributors.
    </Typography>
    <ActionButton
      link="/donate"
      text="SUPPORT NOW"
      onClick={() =>
        pushToDataLayer('cta_click', {
          cta_text: 'Donate Now',
          section: 'donate',
          page: 'get_involved',
        })
      }
    />
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '50px',
      }}
    >
      <Box
        component="a"
        href="https://thewhaletrail.org/connect/donate/"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'The Whale Trail',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo1}
          alt="The Whaletrail"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://folkssji.org/donate/"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'F.O.L.K.S',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo2}
          alt="Friends of Lime Kiln Society"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://www.whaleresearch.com/supportcwr"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Center for Whale Research',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo4}
          alt="Center for Whale Research"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://www.deepgreenwilderness.com/donate"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Deep Green Wilderness',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo6}
          alt="Deep Green Wilderness"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://oceansinitiative.org/get-involved/"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Oceans Initiative',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo8}
          alt="Oceans Initiative"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://pacmam.org/wp/donate/"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'PacMAN',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo9}
          alt="Pacmam"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://www.whalescout.org/"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Whale Scout',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo11}
          alt="Whale Scout"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://www.orcaconservancy.org/donate"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Orca Conservancy',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo12}
          alt="Orca Conservancy"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://www.orcanetwork.org/donate"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Orca Network',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo13}
          alt="Orca Network"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://ptmsc.org/donate/"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Port Townsend Marine Science Center',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo14}
          alt="Port Townsend Marine Science Center"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://crm.bloomerang.co/HostedDonation?ApiKey=pub_d0480152-d37a-11ea-b90d-0a908e1cc508&WidgetId=808960"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Sound Action',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo15}
          alt="Sound Action"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box
        component="a"
        href="https://vashonnaturecenter.org/donate/"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Vashon Nature Center',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo16}
          alt="Vashon Nature Center"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>

      <Box
        component="a"
        href="https://www.orcabehaviorinstitute.org/donate"
        sx={{
          margin: '15px',
          width: '200px',
          height: '180px',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Orca Behavior Institute',
            page: 'get_involved',
          })
        }
      >
        <Image
          src={logo18}
          alt="Orca Behavior Institute"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>

      <Box
        component="a"
        href="https://www.projectseawolf.org/How_to_Help.html"
        sx={{
          margin: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
        }}
        onClick={() =>
          pushToDataLayer('partner_click', {
            partner_name: 'Project SeaWolf',
            page: 'get_involved',
          })
        }
      >
        <Box
          sx={{
            width: '200px',
            height: '150px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src={logo17}
            alt="Project SeaWolf"
            fill
            sizes="100vw"
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Typography
          variant="p"
          fontSize="20px"
          paragraph={true}
          align="center"
          color="#1B2B7B"
          sx={{
            textDecoration: 'underline',
            fontWeight: '600',
            mt: '10px',
          }}
        >
          Project SeaWolf
        </Typography>
      </Box>
    </Box>
  </>
)

export const GetInvolved = () => {
  const navLinks = GETINVOLVED_SECTIONS.map((section) => ({
    name: section.name,
    id: section.id,
    renderKey: section.renderKey,
  }))

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
          especially for the Southern Resident Killer Whales that call the
          Salish Sea home. Check out the ways you can help below!`}
      />

      <StickyNav
        navLinks={navLinks}
        onLinkClick={(link) => {
          pushToDataLayer('jump_link_click', {
            link_text: link.name,
            page: 'get_involved',
          })
        }}
      />

      <Container maxWidth="lg">
        {GETINVOLVED_SECTIONS.map((section) => {
          const ContentComponent = SECTION_COMPONENTS[section.renderKey]
          return (
            <Box
              key={section.id}
              id={section.id}
              component="section"
              sx={{
                margin: section.margin || '15px 25px',
                scrollMarginTop: '80px', // Match this to the height of your StickyNav
              }}
            >
              <Typography
                variant="h4"
                sx={{ margin: '40px 0px', fontWeight: '500' }}
              >
                {section.name}
              </Typography>
              {ContentComponent ? <ContentComponent /> : null}
            </Box>
          )
        })}
      </Container>
    </div>
  )
}

export default GetInvolved
