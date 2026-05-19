/*
 * File : contributors.jsx
 * Desc : Page for the Hacker Hall of Fame contributors page.
 *  */

import {
  autocompleteClasses,
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

const contributors = () => {
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
        }}
      >
        <TopBanner
          bannerImg={HackerBanner}
          pageTitle={`    Hacker\nHall of Fame`}
          scrollToId={'contributors'}
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
              '@media (min-width:200px) and (max-width:500px)': {
                fontSize: 'medium',
              },
              /*ipad */
              '@media (min-width:768px) and (max-width:899px)': {
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
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            /*iphone  formatting */
            '@media (min-width:200px) and (max-width:500px)': {
              gap: 10,

              width: '100%',
            },
            /*ipad */
            '@media (min-width:768px) and (max-width:899px)': {
              fontSize: 'x-large',
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
              variant="body2"
              sx={{
                /*iphone  formatting */
                '@media (min-width:200px) and (max-width:500px)': {
                  mt: 15,
                },
                /*ipad */
                '@media (min-width:768px) and (max-width:899px)': {
                  fontSize: 'x-large',
                },
              }}
            >
              We would like to acknowledge the tremendous contributions of time,
              technology, and code that have been made to our open source
              project. Beginning in the fall of 2018, we began participating in
              hackathons in Seattle and at the University of Washington. In
              summer, 2019, we partnered with Microsoft through their amazing
              hackathon community. In 2020, Orcasound became a host organization
              for Google Summer of Code (GSoC).
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
              variant="body2"
              sx={{
                /*iphone  formatting */
                '@media (min-width:200px) and (max-width:500px)': {
                  mt: 15,
                },
                /*ipad */
                '@media (min-width:768px) and (max-width:899px)': {
                  fontSize: 'x-large',
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

              /*iphone  formatting */
              '@media (min-width:200px) and (max-width:500px)': {
                pt: 3,
              },
              /*ipad */
              '@media (min-width:768px) and (max-width:899px)': {
                fontSize: 'x-large',
              },
            }}
          >
            <Image
              src={hackathon}
              alt="Orcasound at a democracy lab hackathon in Seattle"
              fill
              style={{
                objectFit: 'cover',
                width: '100%',
                borderRadius: '20px',
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
                /*iphone  formatting */
                '@media (min-width:200px) and (max-width:500px)': {
                  mt: -30,
                  mb: -10,
                },
                /*ipad */
                '@media (min-width:768px) and (max-width:899px)': {
                  fontSize: 'x-large',
                },
              }}
            >
              So, let’s have a virtual round of applause for the following
              stand-out members of the Orcasound open source community. If
              you’re inspired by their contributions to our{' '}
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

              /*iphone  formatting */
              '@media (min-width:200px) and (max-width:500px)': {
                maxWidth: '100%',
                maxHeight: '45em',
              },
              /*ipad */
              '@media (min-width:768px) and (max-width:899px)': {
                fontSize: 'x-large',
              },
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                /*iphone  formatting */
                '@media (min-width:200px) and (max-width:500px)': {
                  mt: 2,
                },
                /*ipad */
                '@media (min-width:768px) and (max-width:899px)': {
                  fontSize: 'x-large',
                },
              }}
            >
              Founders
            </Typography>
            <Typography variant="body2">(Long-Term Contributors)</Typography>
            <Typography variant="body1" sx={{ width: '90%', marginTop: '1em' }}>
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
              efforts or the project in general. The also have shown leadership
              in the community and often have administrative access to key parts
              of the Orcasound infrastructure.
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: { xs: 'none', sm: 'block' }, width: '90%', mb: 5 }}
            >
              Founders can raise funds under the auspices of Orcasound to
              support their own Orcasound efforts or the project in general.
            </Typography>
          </Box>
        </Stack>
        {/*Founders list */}
        {contributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              textAlign: {
                xs: 'center',
                sm: 'left',
              },
            }}
          >
            <Grid item xs={12} sm={5}>
              <Typography
                sx={{
                  fontSize: {
                    xs: '1.3rem',
                    sm: '1rem',
                  },
                  fontWeight: 700,
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontSize: {
                      xs: '1rem',
                      sm: '0.95rem',
                    },
                    '@media (min-width:375px) and (max-width:415px)': {
                      fontSize: 'x-small',
                      textAlign: 'center',
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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: 'navy',
            borderRadius: '20px',
            boxSizing: 'border-box',
            boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',
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
              '@media (min-width:375px) and (max-width:415px)': {
                fontSize: 'small',
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
            '@media (min-width:375px) and (max-width:415px)': {
              fontSize: 'medium',
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
        }}
      >
        {googleContributors.map((person, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            sx={{
              mb: 3,
              '@media (min-width:375px) and (max-width:415px)': {
                width: '100%',
              },
              textAlign: {
                xs: 'center',
                sm: 'left',
              },
            }}
          >
            <Grid item xs={12} sm={5}>
              <Typography
                sx={{
                  fontSize: {
                    xs: '1.3rem',
                    sm: '1rem',
                  },
                  fontWeight: 700,
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 15,
                    fontSize: {
                      xs: '1rem',
                      sm: '0.95rem',
                    },
                    '@media (min-width:375px) and (max-width:415px)': {
                      fontSize: 'small',
                      textAlign: 'center',
                      ml: 0,
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
            '@media (min-width:375px) and (max-width:415px)': {
              fontSize: 'medium',
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
          width: '55%',
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
              '@media (min-width:375px) and (max-width:415px)': {
                width: '100%',
              },
              textAlign: {
                xs: 'center',
                sm: 'left',
              },
            }}
          >
            <Grid item xs={12} sm={5}>
              <Typography
                sx={{
                  fontSize: {
                    xs: '1.3rem',
                    sm: '1rem',
                  },
                  fontWeight: 700,
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 15,
                    fontSize: {
                      xs: '1rem',
                      sm: '0.95rem',
                    },
                    '@media (min-width:375px) and (max-width:415px)': {
                      fontSize: 'small',

                      ml: 0,
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
            '@media (min-width:375px) and (max-width:415px)': {
              fontSize: 'medium',
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
          width: '55%',
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
              '@media (min-width:375px) and (max-width:415px)': {
                width: '100%',
              },
              textAlign: {
                xs: 'center',
                sm: 'left',
              },
            }}
          >
            <Grid item xs={12} sm={5}>
              <Typography
                sx={{
                  fontSize: {
                    xs: '1.3rem',
                    sm: '1rem',
                  },
                  fontWeight: 700,
                }}
              >
                {person.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              {person.roles.map((role, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ml: 15,
                    fontSize: {
                      xs: '1rem',
                      sm: '0.95rem',
                    },
                    '@media (min-width:375px) and (max-width:415px)': {
                      fontSize: 'small',

                      ml: 0,
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
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Project Management Team
        </Typography>
        <Typography variant="caption">(Initiated 2021)</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          minWidth: '50em',
          justifySelf: 'center',
          height: '100%',
        }}
      >
        {/*contributor names */}
        <Stack sx={{ width: '55%', mt: -5 }}>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Firuze Gokce </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Heather Gordon</Typography>
          </Box>

          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Sanjari Jain</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Garima Chandra </Typography>
          </Box>
        </Stack>
        {/*contributor roles */}
        <Stack sx={{ width: '45%', mt: -5 }}>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Project Manager, Fundraising (2022-23)
            </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Project Manager (2021-2)</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Project Manager (2021)</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Development Project Manager (2021)
            </Typography>
          </Box>
        </Stack>
      </Box>

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
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          PodCast
        </Typography>
        <Typography variant="caption">(ML-Assisted Annotation Tool)</Typography>
      </Box>

      <Breadcrumbs
        sx={{ display: 'flex', justifyContent: 'center' }}
        separator="•"
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
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          OrcaHello
        </Typography>
        <Typography variant="caption">
          (Real-Time Inference System Leads)
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          minWidth: '50em',
          justifySelf: 'center',
          height: '100%',
        }}
      >
        {/*contributor names */}
        <Stack sx={{ width: '55%', mt: -5 }}>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Prakruti Gogia </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Mike Cowan</Typography>
          </Box>

          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Claire Goetschel</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Akash Mahajan </Typography>
          </Box>

          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Aayush Agrawal </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Chris Hanke </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Adele Bai </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Michelle Yang </Typography>
          </Box>
        </Stack>
        {/*contributor roles */}
        <Stack sx={{ width: '45%', mt: -5 }}>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Overall Lead</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Moderation system, Front End
            </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Moderation system, Design</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Annotation System</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Machine Learning Development
            </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Public Relations</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Notification System</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Azure Administration+</Typography>
          </Box>
        </Stack>
      </Box>

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
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
        >
          Individual Contributors
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          minWidth: '50em',
          justifySelf: 'center',
          height: '100%',
        }}
      >
        {/*contributor names */}
        <Stack sx={{ width: '55%' }}>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Erin </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Shawn Vita</Typography>
          </Box>

          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Samantha Berk</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Nóra Mészáros </Typography>
          </Box>

          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Erika Pelaez </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Jennifer Rogers </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Ivan Storck </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Joyce Liao </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Adrian MacDonald </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Maria Palamar </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Glenn Block </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Amie Dabu </Typography>
          </Box>
        </Stack>
        {/*contributor roles */}
        <Stack sx={{ width: '45%', mt: -20 }}>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              User-centered design of 2019 UI v2 (2019)
            </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Implementation of 2019 UI v2 (2019)
            </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Administrative back end (2018-19)
            </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Graphic design (2017-2020)</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">Machine learning (2018)</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Machine learning & spectrograms from
            </Typography>
            <Typography variant="body1">FLAC files (2018+)</Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Orcamap code clean-up & contribution{' '}
            </Typography>
            <Typography variant="body1">standards (2020-21) </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Orcanode repo & Raspberry Pi testing{' '}
            </Typography>
            <Typography variant="body1">(2020+) </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Content strategy, analytics, conservation{' '}
            </Typography>
            <Typography variant="body1">impact (2021+) </Typography>
          </Box>
          <Box sx={{ height: '5em' }}>
            <Typography variant="body1">
              Conservation impact (2020+){' '}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/*final pictures above footer */}
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          m: 'auto',
          gap: 10,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '30%',
            height: '25em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Image
            src={hackCollab}
            alt="Erika facilitating an early discussion of machine learning and the orca data repository"
            fill
            style={{
              objectFit: 'cover',
              width: '30%',
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
            position: 'relative',
            width: '30%',
            height: '25em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Image
            src={hackVal}
            alt="Val working on the Orcanode software and hardware."
            fill
            style={{
              objectFit: 'cover',
              width: '30%',
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

export default contributors
