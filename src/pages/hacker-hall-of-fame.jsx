/*
 * File : hacker-hall-of-fame.jsx
 * Desc : Page for the Hacker Hall of Fame contributors page.
 *  */

import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import hackathon from '../../public/images/getinvolved/hackathon.png'
import HackerBanner from '../../public/images/Hacker_HOF.webp'
import hackCollab from '../../public/images/hackerHallOfFame/Hacker_Collab.PNG'
import hackVal from '../../public/images/hackerHallOfFame/Hacker_Val.PNG'
import TopBanner from '../components/TopBanner'

const HackerHallOfFame = () => {
  // all contributor arrays
  // Founders array
  const contributors = [
    {
      name: 'Paul Cretu',
      roles: ['Orcasound site & player (2017+)', 'GSoC mentor (2021)'],
    },
    {
      name: 'Skander Mzali',
      roles: ['Orcasound site (2017-2020)', 'Admin UI (2019)'],
    },
    {
      name: 'Steve Hicks',
      roles: ['Orcanode repository (2018+)', 'GSoC mentor (2020+)'],
    },
    {
      name: 'Brendan Thatcher',
      roles: ['User research & UX team lead (2020+)', 'GSoC mentor (2021)'],
    },
    {
      name: 'Val Veirs',
      roles: [
        'Node engineering and machine learning (2017+)',
        'GSoC mentor (2020+)',
      ],
    },
    {
      name: 'Scott Veirs',
      roles: ['Project management (2017+)', 'GSoC mentor (2020+)'],
    },
    {
      name: 'Mike Castor',
      roles: ['UI v2 implementation (2019-2020)'],
    },
    {
      name: 'Ty Crisafulli',
      roles: [
        '2017 Kickstarter and design guidance (2017+)',
        'GSoC mentor (2021)',
      ],
    },
    {
      name: 'Christian Sarason',
      roles: ['Orcamap repository (2018+)'],
    },
    {
      name: 'Valentina Staneva',
      roles: [
        'Microsoft AI4Earth Innovation Grant lead (2019)',
        'GSoC mentor and administrative lead (2020+)',
        'UW MS Data Science mentor (2022-23)',
      ],
    },
    {
      name: 'Prakruti Gogia',
      roles: [
        'OrcaHello project manager',
        'Pod.Cast creator (Microsoft hackathons, 2019-2021)',
      ],
    },
    {
      name: 'Akash Mahajan',
      roles: [
        'Pod.Cast creator',
        'OrcaHello ML developer (Microsoft, 2019-2020)',
      ],
    },
    {
      name: 'Praful Mathur',
      roles: ['Experiment.com funding (2021)', 'GSoC mentor (2022)'],
    },
    {
      name: 'Michelle Yang',
      roles: ['Microsoft hackathon project manager (2020+)'],
    },
    {
      name: 'Jesse Lopez',
      roles: ['GSoC mentor (2020-2021)'],
    },
    {
      name: 'Liam Reese',
      roles: ['Graphic design (2017+)'],
    },
  ]

  // google contributors
  const googleContributors = [
    {
      name: 'Kunal Mehta',
      country: '(India)',
      roles: ['GSoC contributor (2020)', 'GSoC mentor (2021)'],
    },
    {
      name: 'Diego Roderiguez',
      country: '(Mexico)',
      roles: ['GSoC contributor (2020)'],
    },
    {
      name: 'Isabella Macchiavello',
      country: '(Ecuador)',
      roles: ['GSoC contributor (2021)'],
    },
    {
      name: 'Dmitry Volodin',
      country: '(Russia)',
      roles: ['GSoC contributor (2021)'],
    },
    {
      name: 'Dhananjay Purohit',
      country: '(India)',
      roles: ['GSoC contributor (2021)'],
    },
    {
      name: 'Jose Giraldo',
      country: '(Colombia, Spain)',
      roles: ['GSoC contributor (2021)'],
    },
    {
      name: 'Ambra Jin',
      country: '(Italy, UK, Germany)',
      roles: ['GSoC contributor (2022)'],
    },
    {
      name: 'Devdoot Chatterjee',
      country: '(India)',
      roles: ['GSoC contributor (2022)'],
    },
    {
      name: 'Benjamin Chew',
      country: '(Singapore, USA)',
      roles: ['GSoC contributor (2022)'],
    },
    {
      name: 'Karan Mishra',
      country: '(India)',
      roles: ['GSoC contributor (2022)'],
    },
    {
      name: 'Paul Nguyen Hong Duc',
      country: '(France, Canada)',
      roles: ['GSoC mentor (2022)'],
    },
  ]

  // Live Listening contributors
  const liveContributors = [
    {
      name: 'Zarema Ross',
      roles: ['UX/UI/design project manager (2021+)'],
    },
    {
      name: 'Elena Bukhonok',
      roles: ['UX/UI/design project manager (2020-21)'],
    },
    {
      name: 'Sam St Michael',
      roles: ['Design, branding, social media (2020+)'],
    },
    {
      name: 'James Pedersen',
      roles: ['Full stack developer (2020)'],
    },
    {
      name: 'Michelle Bocklage',
      roles: [],
    },
    {
      name: 'Kristen Gillaspy',
      roles: [],
    },
    {
      name: 'Wei Li',
      roles: [],
    },
    {
      name: 'Catherine Zeng',
      roles: [],
    },
    {
      name: 'Carina Cheng',
      roles: [],
    },
  ]

  // arcatia contributors
  const arcatiaContributors = [
    {
      name: 'Maria Palamar',
      roles: ['Facilitation & user research (2020+)'],
    },
    {
      name: 'Graise Lee Jenni',
      roles: ['Facilitation & user research (2020+)'],
    },
    {
      name: 'Ali Alaydrus',
      roles: ['Development (2020; 2022-3)'],
    },
    {
      name: 'Peter Ince',
      roles: ['Development (2020-22)'],
    },
    {
      name: 'Nick Bryne',
      roles: ['Design & Project Management (2020-21)'],
    },
    {
      name: 'Virgil Zetterlind',
      roles: ['Data Exchange + Mobile App Customization (2019+)'],
    },
  ]

  // project management contributors
  const projectManagementContributors = [
    {
      name: 'Firuze Gokce',
      roles: ['Project Manager, Fundraising (2022-23)'],
    },
    {
      name: 'Heather Gordon',
      roles: ['Project Manager (2021-2)'],
    },
    {
      name: 'Sanjari Jain',
      roles: ['Project Manager (2021)'],
    },
    {
      name: 'Garima Chandra',
      roles: ['Development Project Manager (2021)'],
    },
  ]

  // orca hello contributors
  const orcaContributors = [
    {
      name: 'Prakruti Gogia',
      roles: ['Overall Lead'],
    },
    {
      name: 'Mike Cowan',
      roles: ['Moderation system, Front End'],
    },
    {
      name: 'Claire Goetschel',
      roles: ['Moderation system, Design'],
    },
    {
      name: 'Akash Mahajan',
      roles: ['Annotation System'],
    },
    {
      name: 'Aayush Agrawal',
      roles: ['Machine Learning Development'],
    },
    {
      name: 'Chris Hanke',
      roles: ['Public Relations'],
    },
    {
      name: 'Adele Bai',
      roles: ['Notification System'],
    },
    {
      name: 'Michelle Yang',
      roles: ['Azure Administration+'],
    },
  ]

  // individual contributors array
  const individualContributors = [
    {
      name: 'Erin',
      roles: ['User-centered design of 2019 UI v2 (2019)'],
    },
    {
      name: 'Shawn Vita',
      roles: ['Implementation of 2019 UI v2 (2019)'],
    },
    {
      name: 'Samantha Berk',
      roles: ['Administrative back end (2018-19)'],
    },
    {
      name: 'Nóra Mészáros',
      roles: ['Graphic design (2017-2020)'],
    },
    {
      name: 'Erika Pelaez',
      roles: ['Machine learning (2018)'],
    },
    {
      name: 'Jennifer Rogers',
      roles: ['Machine learning & spectrograms from FLAC files (2018+)'],
    },
    {
      name: 'Ivan Storck',
      roles: ['Orcamap code clean-up & contribution standards (2020-21)'],
    },
    {
      name: 'Joyce Liao',
      roles: ['Orcanode repo & Raspberry Pi testing (2020+)'],
    },
    {
      name: 'Adrian MacDonald',
      roles: ['Content strategy, analytics, conservation impact (2021+)'],
    },
    {
      name: 'Maria Palamar',
      roles: ['Conservation impact (2020+)'],
    },
    {
      name: 'Glenn Block',
      roles: [],
    },
    {
      name: 'Amie Dabu',
      roles: [],
    },
  ]

  return (
    <>
      {/* title of the page Hacker Hall of Fame */}
      <Head>
        <title>Orcasound | Hacker Hall of Fame</title>
      </Head>

      {/* Banner and Banner Text */}
      <Box
        sx={{
          whiteSpace: 'pre-wrap',
          display: 'flex',
        }}
      >
        <TopBanner
          bannerImg={HackerBanner}
          pageTitle={`Hacker\n Hall of Fame`}
          scrollToId={'scroll-link'}
        />
      </Box>

      {/* Container for Thank you Message for contributors */}
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            height: '5em',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#111184',
            color: 'white',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              /*iphone  formatting */
              '@media (min-width:375px) and (max-width:500px)': {
                fontSize: 'medium',
              },
              /*ipad */
              '@media (min-width:768px) and (max-width:1200px)': {
                fontSize: 'x-large',
              },
            }}
          >
            Thank you, Orcasound App Hackers!
          </Typography>
        </Box>
      </Container>

      {/* First Section for this page- top */}
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          pt: 5,
          '@media (min-width:375px) and (max-width:500px)': {
            pt: 15,
          },
          /*iphone  formatting */
          '@media (min-width:768px) and (max-width:1200px)': {
            mt: 10,
          },
        }}
      >
        {/* first paragraph */}
        <Box
          sx={{
            maxHeight: '10em',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '140%',
              /*ipad */
              '@media (min-width:768px) and (max-width:1200px)': {
                fontSize: 'x-large',
                width: '80%',
              },
            }}
          >
            We would like to acknowledge the tremendous contributions of time,
            technology, and code that have been made to our open source project.
            Beginning in the fall of 2018, we began participating in hackathons
            in Seattle and at the University of Washington. In summer, 2019, we
            partnered with Microsoft through their amazing hackathon community.
            In 2020, Orcasound became a host organization for Google Summer of
            Code (GSoC).
          </Typography>
        </Box>

        {/*Second paragraph */}
        <Box
          sx={{
            height: '10em',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '140%',
              mt: 10,
              /*iphone  formatting */
              '@media (min-width:375px) and (max-width:500px)': {
                mt: 60,
              },

              /*ipad */
              '@media (min-width:768px) and (max-width:1200px)': {
                fontSize: 'x-large',
                width: '80%',
                mt: 50,
              },
            }}
          >
            In combination with our{' '}
            <Link
              href="https://github.com/orcasound"
              target="_blank"
              rel="noopener"
            >
              Github repositories
            </Link>
            , these events have brought many talented programmers, designers,
            engineers, researchers, and “geeks for good” to the project. They
            have made it possible to rapidly develop and refine the{' '}
            <Link
              href="https://www.orcasound.net/portfolio/orcasound-app/"
              target="_blank"
              rel="noopener"
            >
              Orcasound app
            </Link>{' '}
            — a new way to{' '}
            <Link
              href="https://live.orcasound.net/"
              target="_blank"
              rel="noopener"
            >
              listen for whales
            </Link>{' '}
            — based on a{' '}
            <Link
              href="https://www.orcasound.net/2018/04/27/orcasounds-new-live-audio-solution-from-hydrophone-to-headphone-with-a-raspberry-pi-computer-and-hls-dash-streaming-software/"
              target="_blank"
              rel="noopener"
            >
              cutting-edge suite of inexpensive and open source hardware and
              software for live streaming audio data.
            </Link>
          </Typography>
        </Box>
        {/*Hackathon image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '25em',
            display: 'flex',
            flexDirection: 'column',

            mt: 10,

            /*iphone  formatting */
            '@media (min-width:375px) and (max-width:500px)': {
              mt: 47,
            },
            /*ipad */
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              mt: 50,
            },
          }}
        >
          <Image
            src={hackathon}
            alt="Orcasound at a democracy lab hackathon in Seattle"
            style={{
              objectFit: 'cover',
              width: '795px',
              height: '444px',
              top: '1331px',
              left: '320px',
              angle: '0 deg',
              opacity: 1,
              borderRadius: '20px',
              mt: 20,
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Orcasound at a democracy lab hackathon in Seattle (photo by Mark
            Frischmuth).
          </Typography>
        </Box>

        {/*Third paragraph after first image */}
        <Box
          sx={{
            maxHeight: '10em',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '140%',

              /*iphone  formatting */
              '@media (min-width:375px) and (max-width:500px)': {
                mt: 5,
              },
              /*ipad */
              '@media (min-width:768px) and (max-width:1200px)': {
                fontSize: 'x-large',
                width: '80%',
                mt: -20,
              },
            }}
          >
            So, let’s have a virtual round of applause for the following
            stand-out members of the Orcasound open source community. If you’re
            inspired by their contributions to our{' '}
            <Link
              href="https://github.com/orcasound"
              target="_blank"
              rel="noopener"
            >
              Github repositories{' '}
            </Link>
            or{' '}
            <Link
              href="https://www.democracylab.org/projects/81"
              target="_blank"
              rel="noopener"
            >
              Democracy Lab hackathons
            </Link>
            , don’t hesitate to support the Founders and Influencers directly!
            Sing their praises on social media and networks; join them in
            hacking for orca conservation; reinforce their volunteerism
            financially.
          </Typography>
        </Box>

        {/*Founders Box */}
        <Box
          id="scroll-link"
          sx={{
            maxHeight: '30em',
            width: '110%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            gap: 1,
            backgroundColor: '#111184',
            borderRadius: '20px',
            boxSizing: 'border-box',
            boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',
            mt: 5,
            mb: 5,

            /*iphone  formatting */
            '@media (min-width:375px) and (max-width:500px)': {
              maxWidth: '100%',
              maxHeight: '45em',
              pb: 3,
              mt: 20,
            },
            /*ipad */
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              height: '80%',
              width: '100%',
              pb: 3,
              mt: 10,
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              /*iphone  formatting */
              '@media (min-width:375px) and (max-width:500px)': {
                mt: 2,
              },
              /*ipad */
              '@media (min-width:768px) and (max-width:1200px)': {
                fontSize: 'x-large',
                pt: 3,
              },
            }}
          >
            Founders
          </Typography>
          <Typography variant="body2">(Long-Term Contributors)</Typography>
          <Typography
            sx={{
              width: '90%',
              marginTop: '1em',
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '140%',
              /*ipad */
              '@media (min-width:768px) and (max-width:1200px)': {
                fontSize: 'x-large',
              },
            }}
          >
            Like{' '}
            <Link
              sx={{ color: 'white', textDecoration: 'underline' }}
              href="https://www.orcasound.net/join/"
              target="_blank"
              rel="noopener"
            >
              Orcasound organizational members
            </Link>
            (who have their own amazing volunteers!), founders can raise funds
            under the auspices of Orcasound to support their own Orcasound
            efforts or the project in general. The also have shown leadership in
            the community and often have administrative access to key parts of
            the Orcasound infrastructure.
          </Typography>
          <Typography
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '140%',
              /*ipad */
              '@media (min-width:768px) and (max-width:1200px)': {
                fontSize: 'x-large',
                display: 'block',
              },
              width: '90%',
              mb: 5,
            }}
          >
            Founders can raise funds under the auspices of Orcasound to support
            their own Orcasound efforts or the project in general.
          </Typography>
        </Box>
      </Container>
      {/*Founders list */}
      <Container
        maxWidth={false}
        sx={{
          width: '100%',

          '@media (min-width:375px) and (max-width:500px)': {
            width: '100%',
          },

          '@media (min-width:768px) and (max-width:1200px)': {
            width: '100%',
          },
        }}
      >
        {contributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'row',

              '@media (min-width:375px) and (max-width:500px)': {
                width: '100%',
                flexDirection: 'column',
              },
              '@media (min-width:768px) and (max-width:1200px)': {
                width: '100%',
                textAlign: 'left',
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '20%',

                m: 'auto',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',
                  textAlign: 'center',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  width: '30%',
                  ml: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '140%',
                  ml: 10,
                  width: '80%',
                  '@media (min-width:375px) and (max-width:500px)': {
                    ml: 0,

                    width: '100%',
                  },
                  '@media (min-width:768px) and (max-width:1200px)': {
                    ml: 1,
                  },
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '60%',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',

                  textAlign: 'center',
                },
              }}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 20,
                    fontSize: '20px',
                    fontWeight: '500',
                    lineHeight: '140%',
                    '@media (min-width:375px) and (max-width:500px)': {
                      fontSize: 'small',
                      mx: 'auto',
                      ml: 0,
                    },
                    '@media (min-width:768px) and (max-width:1200px)': {
                      textAlign: 'left',
                      mx: 'auto',
                      width: '100%',
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}

        {/*End of founder contributors list */}

        {/* Beginning of the influencers list */}

        {/* Influencer's box */}
        <Box
          sx={{
            height: '10em',
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: 'navy',
            borderRadius: '20px',
            boxSizing: 'border-box',
            boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',
            mx: 'auto',
            '@media (min-width:375px) and (max-width:500px)': {
              width: '100%',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              width: '100%',
            },
          }}
        >
          <Typography variant="h4" gutterBottom>
            Influencers
          </Typography>
          <Typography variant="body2">(Major Contributors)</Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              display: {
                xs: 'block',
                sm: 'none',
              },
              '@media (min-width:375px) and (max-width:500px)': {
                fontSize: 'small',
              },
              '@media (min-width:768px) and (max-width:1200px)': {
                display: 'none',
              },
            }}
          >
            Founders can raise funds under the auspices of Orcasound to support
            their own Orcasound efforts or the project in general.
          </Typography>
        </Box>
      </Container>

      {/* google participant header */}
      <Box
        sx={{
          height: '10em',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width:375px) and (max-width:500px)': {
              fontSize: 'medium',
              textAlign: 'center',
              fontWeight: 'bold',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
        >
          Google Summer of Code (GSoc) Participants
        </Typography>
      </Box>

      {/* google contributors */}
      <Container
        maxWidth={false}
        sx={{
          width: '55%',
          '@media (min-width:375px) and (max-width:500px)': {
            width: '100%',
          },
          '@media (min-width:768px) and (max-width:1200px)': {
            width: '100%',
          },
        }}
      >
        {googleContributors.map((person, index) => (
          <Grid
            container
            key={index}
            sx={{
              mb: 3,

              textAlign: {
                xs: 'center',
                sm: 'left',
              },

              '@media (min-width:768px) and (max-width:1200px)': {
                display: 'flex',
                flexDirection: 'row',
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                textAlign: 'left',
                flexDirection: 'row',

                width: '57%',
                '@media (min-width:375px) and (max-width:500px)': {
                  display: 'flex',
                  flexDirection: 'row',
                  fontSize: 'medium',
                  gridGap: '0px',
                  whiteSpace: 'nowrap',
                  justifyContent: 'center',
                  width: '100%',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  textAlign: 'left',
                  width: '60%',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '140%',
                  '@media (min-width:375px) and (max-width:500px)': {
                    mx: 'auto',
                    m: 0,
                    fontSize: 'medium',
                  },
                }}
              >
                {person.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '140%',
                  m: 0,

                  '@media (min-width:375px) and (max-width:500px)': {
                    fontSize: 'medium',
                  },
                }}
              >
                {person.country}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 7 }}
              sx={{
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',
                  alignItems: 'center',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  width: '40%',
                },
              }}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontSize: {
                      xs: 'small',
                      sm: '20px',
                    },
                    fontWeight: 500,
                    lineHeight: '140%',
                    textAlign: {
                      xs: 'center',
                      sm: 'left',
                    },

                    '@media (min-width:768px) and (max-width:1200px)': {
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: '140%',

                      textAlign: 'left',
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Container>
      {/* End of google contributors */}

      {/* Live Listening app & UI team header */}
      <Box
        sx={{
          height: '10em',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width:375px) and (max-width:500px)': {
              fontSize: 'medium',
              textAlign: 'center',
              fontWeight: 'bold',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
        >
          Live Listening App UI & Development Team
        </Typography>
      </Box>

      {/*Live Listening contributors */}
      <Container
        maxWidth={false}
        sx={{
          width: '80%',

          '@media (min-width:375px) and (max-width:500px)': {
            width: '100%',
          },

          '@media (min-width:768px) and (max-width:1200px)': {
            width: '100%',
          },
        }}
      >
        {liveContributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'row',

              '@media (min-width:375px) and (max-width:500px)': {
                width: '100%',
                flexDirection: 'column',
              },
              '@media (min-width:768px) and (max-width:1200px)': {
                width: '100%',
                textAlign: 'left',
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '20%',

                m: 'auto',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',
                  textAlign: 'center',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  width: '30%',
                  ml: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '140%',
                  ml: 10,
                  '@media (min-width:375px) and (max-width:500px)': {
                    ml: 0,
                  },
                  '@media (min-width:768px) and (max-width:1200px)': {
                    ml: 1,
                  },
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '60%',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',

                  textAlign: 'center',
                },
              }}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 20,
                    fontSize: '20px',
                    fontWeight: '500',
                    lineHeight: '140%',
                    '@media (min-width:375px) and (max-width:500px)': {
                      fontSize: 'small',
                      mx: 'auto',
                      ml: 0,
                    },
                    '@media (min-width:768px) and (max-width:1200px)': {
                      textAlign: 'left',
                      mx: 'auto',
                      width: '100%',
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Container>

      {/*Arcatia.io Data Cooperative header */}
      <Box
        sx={{
          height: '10em',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width:375px) and (max-width:500px)': {
              fontSize: 'medium',
              textAlign: 'center',
              fontWeight: 'bold',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
        >
          Arcatia.io Data Cooperative
        </Typography>
        <Typography variant="caption">
          (Sharing Acoustic & Visual Observations)
        </Typography>
      </Box>

      {/*Arcatia.io Data Cooperative contributors */}
      <Container
        maxWidth={false}
        sx={{
          width: '80%',

          '@media (min-width:375px) and (max-width:500px)': {
            width: '100%',
          },

          '@media (min-width:768px) and (max-width:1200px)': {
            width: '100%',
          },
        }}
      >
        {arcatiaContributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'row',

              '@media (min-width:375px) and (max-width:500px)': {
                width: '100%',
                flexDirection: 'column',
              },
              '@media (min-width:768px) and (max-width:1200px)': {
                width: '100%',
                textAlign: 'left',
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '20%',

                m: 'auto',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',
                  textAlign: 'center',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  width: '30%',
                  ml: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '140%',
                  ml: 10,
                  width: '80%',
                  '@media (min-width:375px) and (max-width:500px)': {
                    ml: 0,

                    width: '100%',
                  },
                  '@media (min-width:768px) and (max-width:1200px)': {
                    ml: 1,
                  },
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '60%',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',

                  textAlign: 'center',
                },
              }}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 20,
                    fontSize: '20px',
                    fontWeight: '500',
                    lineHeight: '140%',
                    '@media (min-width:375px) and (max-width:500px)': {
                      fontSize: 'small',
                      mx: 'auto',
                      ml: 0,
                    },
                    '@media (min-width:768px) and (max-width:1200px)': {
                      textAlign: 'left',
                      mx: 'auto',
                      width: '100%',
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Container>

      {/*Project Management Team Header */}
      <Box
        sx={{
          height: '10em',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width:375px) and (max-width:500px)': {
              fontSize: 'medium',
              textAlign: 'center',
              fontWeight: 'bold',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
        >
          Project Management Team
        </Typography>
        <Typography variant="caption">(Initiated 2021)</Typography>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          width: '80%',

          '@media (min-width:375px) and (max-width:500px)': {
            width: '100%',
          },

          '@media (min-width:768px) and (max-width:1200px)': {
            width: '100%',
          },
        }}
      >
        {projectManagementContributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'row',

              '@media (min-width:375px) and (max-width:500px)': {
                width: '100%',
                flexDirection: 'column',
              },
              '@media (min-width:768px) and (max-width:1200px)': {
                width: '100%',
                textAlign: 'left',
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '20%',

                m: 'auto',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',
                  textAlign: 'center',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  width: '30%',
                  ml: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '140%',
                  ml: 10,
                  width: '80%',
                  '@media (min-width:375px) and (max-width:500px)': {
                    ml: 0,

                    width: '100%',
                  },
                  '@media (min-width:768px) and (max-width:1200px)': {
                    ml: 1,
                  },
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '60%',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',

                  textAlign: 'center',
                },
              }}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 20,
                    fontSize: '20px',
                    fontWeight: '500',
                    lineHeight: '140%',
                    '@media (min-width:375px) and (max-width:500px)': {
                      fontSize: 'small',
                      mx: 'auto',
                      ml: 0,
                    },
                    '@media (min-width:768px) and (max-width:1200px)': {
                      textAlign: 'left',
                      mx: 'auto',
                      width: '100%',
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Container>

      {/*Podcast header */}
      <Box
        sx={{
          height: '10em',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width:375px) and (max-width:500px)': {
              fontSize: 'medium',
              textAlign: 'center',
              fontWeight: 'bold',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
        >
          PodCast
        </Typography>
        <Typography variant="caption">(ML-Assisted Annotation Tool)</Typography>
      </Box>

      <Breadcrumbs
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: '500',
          lineHeight: '140%',
          '& .MuiBreadcrumbs-ol': {
            '@media (min-width:375px) and (max-width:500px)': {
              flexDirection: 'column',
            },
            '@media (min-width:768px) and (max-width1200px)': {
              flexDirection: 'row',
            },

            alignItems: {
              xs: 'center',
              sm: 'flex-start',
            },
          },
          textAlign: {
            xs: 'center',
            sm: 'center',
          },
        }}
        separator={
          <Typography
            sx={{
              '@media (min-width:375px) and (max-width:500px)': {
                display: 'none',
              },
            }}
          >
            ●
          </Typography>
        }
        aria-label="breadcrumb"
      >
        <Typography color="text.primary">Prakruti Gogia</Typography>
        <Typography color="text.primary">Akash Mahajan</Typography>
        <Typography color="text.primary">Nithya Govindarajan</Typography>
      </Breadcrumbs>

      {/*OrcaHello header */}
      <Box
        sx={{
          height: '10em',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width:375px) and (max-width:500px)': {
              fontSize: 'medium',
              textAlign: 'center',
              fontWeight: 'bold',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
        >
          OrcaHello
        </Typography>
        <Typography variant="caption">
          (Real-Time Inference System Leads)
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          width: '80%',

          '@media (min-width:375px) and (max-width:500px)': {
            width: '100%',
          },

          '@media (min-width:768px) and (max-width:1200px)': {
            width: '100%',
          },
        }}
      >
        {orcaContributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'row',

              '@media (min-width:375px) and (max-width:500px)': {
                width: '100%',
                flexDirection: 'column',
              },
              '@media (min-width:768px) and (max-width:1200px)': {
                width: '100%',
                textAlign: 'left',
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '20%',

                m: 'auto',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',
                  textAlign: 'center',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  width: '30%',
                  ml: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '140%',
                  ml: 10,
                  width: '80%',
                  '@media (min-width:375px) and (max-width:500px)': {
                    ml: 0,

                    width: '100%',
                  },
                  '@media (min-width:768px) and (max-width:1200px)': {
                    ml: 1,
                  },
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '60%',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',

                  textAlign: 'center',
                },
              }}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 20,
                    fontSize: '20px',
                    fontWeight: '500',
                    lineHeight: '140%',
                    '@media (min-width:375px) and (max-width:500px)': {
                      fontSize: 'small',
                      mx: 'auto',
                      ml: 0,
                    },
                    '@media (min-width:768px) and (max-width:1200px)': {
                      textAlign: 'left',
                      mx: 'auto',
                      width: '100%',
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Container>

      {/*Individual contributors small header */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (min-width:375px) and (max-width:500px)': {
              fontSize: 'medium',
              textAlign: 'center',
              fontWeight: 'bold',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              fontSize: 'x-large',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
        >
          Individual Contributors
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          width: '80%',

          '@media (min-width:375px) and (max-width:500px)': {
            width: '100%',
          },

          '@media (min-width:768px) and (max-width:1200px)': {
            width: '100%',
          },
        }}
      >
        {orcaContributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'row',

              '@media (min-width:375px) and (max-width:500px)': {
                width: '100%',
                flexDirection: 'column',
              },
              '@media (min-width:768px) and (max-width:1200px)': {
                width: '100%',
                textAlign: 'left',
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '20%',

                m: 'auto',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',
                  textAlign: 'center',
                },
                '@media (min-width:768px) and (max-width:1200px)': {
                  width: '30%',
                  ml: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '140%',
                  ml: 10,
                  width: '80%',
                  '@media (min-width:375px) and (max-width:500px)': {
                    ml: 0,

                    width: '100%',
                  },
                  '@media (min-width:768px) and (max-width:1200px)': {
                    ml: 1,
                  },
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                width: '60%',
                '@media (min-width:375px) and (max-width:500px)': {
                  width: '100%',

                  textAlign: 'center',
                },
              }}
            >
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 20,
                    fontSize: '20px',
                    fontWeight: '500',
                    lineHeight: '140%',
                    '@media (min-width:375px) and (max-width:500px)': {
                      fontSize: 'small',
                      mx: 'auto',
                      ml: 0,
                    },
                    '@media (min-width:768px) and (max-width:1200px)': {
                      textAlign: 'left',
                      mx: 'auto',
                      width: '100%',
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Container>

      {/*final pictures above footer */}
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          m: 'auto',
          gap: 10,
          '@media (min-width:375px) and (max-width:500px)': {
            gap: 0,
            m: 0,
          },
          '@media (min-width:768px) and (max-width:1200px)': {
            gap: 5,
            flexDirection: 'row',
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '100%',

            height: '20em',
            '@media (min-width:375px) and (max-width:500px)': {
              width: '90%',
              mb: 6,
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              width: '40%',
              ml: 3,
              height: '21em',

              mb: 3,
            },
          }}
        >
          <Image
            src={hackCollab}
            alt="Erika facilitating an early discussion of machine learning and the orca data repository"
            fill
            style={{
              objectFit: 'cover',
              width: '50%',

              borderRadius: '20px',
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Erika facilitating an early discussion of machine learning and the
            Orcadata repository.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '100%',

            height: '20em',

            '@media (min-width:375px) and (max-width:500px)': {
              width: '90%',
              mt: -8,
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              width: '40%',
              mt: -5,

              mr: 3,
            },
          }}
        >
          <Image
            src={hackVal}
            alt="Val working on the Orcanode software and hardware."
            fill
            style={{
              objectFit: 'cover',
              width: '50%',

              borderRadius: '20px',
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Val working on the Orcanode software and hardware.
          </Typography>
        </Box>
      </Stack>
    </>
  )
}

export default HackerHallOfFame
