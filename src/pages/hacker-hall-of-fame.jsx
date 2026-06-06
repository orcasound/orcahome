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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'

import hackathon from '../../public/images/getinvolved/hackathon.png'
import hackCollab from '../../public/images/hackerHallOfFame/Hacker_Collab.png'
import hackVal from '../../public/images/hackerHallOfFame/Hacker_Val.png'
import ContributorSection from '../components/HHOF/ContributorSection'
import HackathonImage from '../components/HHOF/HackathonImage'
import HHOFBanner from '../components/HHOF/HHOFBanner'
import IntroParagraph from '../components/HHOF/Intro'
import {
  arcatiaContributors,
  contributors,
  googleContributors,
  individualContributors,
  liveContributors,
  orcaContributors,
  projectManagementContributors,
} from '../data/hackerHallOfFameContributors'
import { pushToDataLayer } from '../utils/gtm'

const HackerHallOfFame = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        phone: 375,
        sm: 500,
        tablet: 768,
        md: 1000,
        lg: 1200,
        xl: 1536,
      },
    },
  })
  const firstParagraph = `We would like to acknowledge the tremendous contributions of time,
            technology, and code that have been made to our open source project.
            Beginning in the fall of 2018, we began participating in hackathons
            in Seattle and at the University of Washington. In summer, 2019, we
            partnered with Microsoft through their amazing hackathon community.
            In 2020, Orcasound became a host organization for Google Summer of
            Code (GSoC).`

  const secondParagraph = (
    <>
      In combination with our{' '}
      <Link href="https://github.com/orcasound" target="_blank" rel="noopener">
        Github repositories{' '}
      </Link>
      , these events have brought many talented programmers, designers,
      engineers, researchers, and “geeks for good” to the project. They have
      made it possible to rapidly develop and refine the{' '}
      <Link
        href="https://www.orcasound.net/portfolio/orcasound-app/"
        target="_blank"
        rel="noopener"
      >
        Orcasound app
      </Link>{' '}
      — a new way to{' '}
      <Link href="https://live.orcasound.net/" target="_blank" rel="noopener">
        listen for whales
      </Link>{' '}
      — based on a{' '}
      <Link
        href="https://www.orcasound.net/2018/04/27/orcasounds-new-live-audio-solution-from-hydrophone-to-headphone-with-a-raspberry-pi-computer-and-hls-dash-streaming-software/"
        target="_blank"
        rel="noopener"
      >
        cutting-edge suite of inexpensive and open source hardware and software
        for live streaming audio data.
      </Link>
    </>
  )

  const thirdParagraph = (
    <>
      So, let’s have a virtual round of applause for the following stand-out
      members of the Orcasound open source community. If you’re inspired by
      their contributions to our{' '}
      <Link href="https://github.com/orcasound" target="_blank" rel="noopener">
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
      , don’t hesitate to support the Founders and Influencers directly! Sing
      their praises on social media and networks; join them in hacking for orca
      conservation; reinforce their volunteerism financially.
    </>
  )

  return (
    <div className="hhof-container">
      {/* Banner for the page */}
      <HHOFBanner />

      {/* First Section for this page- top */}
      <Container maxWidth="md">
        <Stack spacing={2}>
          {/* first paragraph */}
          <IntroParagraph text={firstParagraph} />

          {/*Second paragraph */}
          <IntroParagraph text={secondParagraph} />

          {/*Hackathon image */}
          <HackathonImage />

          {/*Third paragraph after first image */}
          <IntroParagraph text={thirdParagraph} />
        </Stack>

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
      <ThemeProvider theme={theme}>
        <ContributorSection title="" people={contributors} />
      </ThemeProvider>
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

      {/* google participant header */}
      {/* google contributors */}

      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Google Summer of Code (GSoc) Participants"
          people={googleContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/* End of google contributors */}

      {/* Live Listening app & UI team header */}
      {/* Live Listening List */}
      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Live Listening App UI & Development Team"
          people={liveContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/*Arcatia.io Data Cooperative header */}
      {/*Arcatia.io Data Cooperative contributors */}

      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Arcatia.io Data Cooperative"
          people={arcatiaContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/*Project Management Team Header and list*/}
      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Project Management Team"
          people={projectManagementContributors}
        ></ContributorSection>
      </ThemeProvider>

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
              {person.link === '' ? (
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
                  {' '}
                  {person.name}
                </Typography>
              ) : (
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
                  {' '}
                  <Link
                    href={person.link}
                    style={{ textDecoration: 'underline', color: '#1B2B7B' }}
                    onClick={() =>
                      pushToDataLayer('external_link_click', {
                        link_text: person.name,
                        destination: person.link,
                      })
                    }
                  >
                    {person.name}
                  </Link>
                </Typography>
              )}
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
        {individualContributors.map((person, index) => (
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
              {person.link === '' ? (
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
                  {' '}
                  {person.name}
                </Typography>
              ) : (
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
                  {' '}
                  <Link
                    href={person.link}
                    style={{ textDecoration: 'underline', color: '#1B2B7B' }}
                    onClick={() =>
                      pushToDataLayer('external_link_click', {
                        link_text: person.name,
                        destination: person.link,
                      })
                    }
                  >
                    {person.name}
                  </Link>
                </Typography>
              )}
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
            width: '30%',
            '@media (min-width:375px) and (max-width:500px)': {
              width: '90%',
              mb: 6,
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              width: '40%',
              ml: 3,
              mb: 3,
            },
          }}
        >
          <Image
            src={hackCollab}
            alt="Erika facilitating an early discussion of machine learning and the orca data repository"
            width={413}
            height={271}
            style={{
              width: '100%',
              height: 'auto',
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

            width: '30%',
            '@media (min-width:375px) and (max-width:500px)': {
              width: '90%',
            },
            '@media (min-width:768px) and (max-width:1200px)': {
              width: '40%',
              mr: 3,
            },
          }}
        >
          <Image
            src={hackVal}
            alt="Val working on the Orcanode software and hardware."
            width={413}
            height={271}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '20px',
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Val working on the Orcanode software and hardware.
          </Typography>
        </Box>
      </Stack>
    </div>
  )
}

export default HackerHallOfFame
