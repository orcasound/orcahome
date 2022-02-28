import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import orca from '../../public/images/orca2.png'
import AboutCard from '../components/About/AbouCard'
import Items from '../components/About/db.json'
import aboutStyles from '../styles/About.module.css'

export default function About() {
  const mobileActive = useMediaQuery('(max-width:600px)')
  const [seeMore, setseeMore] = useState(mobileActive)

  return (
    <Box>
      <Head>
        <title>About us - Orcasound</title>
      </Head>
      <Image
        className={aboutStyles.landingImage}
        src={orca}
        alt="About Us"
        width={1400}
        height={500}
      />
      <h2 className={aboutStyles.landingText}> What is Orcasound</h2>

      <p className={aboutStyles.landingPa}>
        Orcasound is a software & hardware Web app to <br></br>
        listen to whales, save orcas and advance <br></br>
        bioacustics(AI Technology)
      </p>

      <Box m={3}>
        <Container>
          <Typography mt={9} align="justify" variant="body1">
            Orcasound is a cooperative effort of many dedicated individuals and
            great organizations. Here are our recent projects — created by
            volunteers, stewards, citizen scientists, hackers, and generous
            funders — all working together for the orcas.
          </Typography>

          <Typography
            mt={8}
            mb={5}
            variant="h4"
            sx={{
              fontFamily: 'Mukta',
              fontWeight: '600',
            }}
          >
            Our Projects
          </Typography>

          <Box>
            <Grid
              container
              justifyContent="center"
              spacing={mobileActive ? 0 : 5}
            >
              {Items.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    {/* There are two conditions 
                    1) for mobile
                      a) showing default only two projects  -> (mobileActive && index < 2)
                      b) if user wants to see more Projects -> (seeMore)
                    2) for Desktop, show all projects       -> (!mobileActive) */}
                    {((mobileActive && index < 2) ||
                      seeMore ||
                      !mobileActive) && (
                      <AboutCard
                        item={item}
                        mobileActive={mobileActive}
                        seeMore={seeMore}
                      />
                    )}
                  </Grid>
                )
              })}
            </Grid>
          </Box>

          {mobileActive && <Mobile setseeMore={setseeMore} seeMore={seeMore} />}

          <Box mx={{ xs: 1, sm: 10, md: 20, lg: 40 }} my={13}>
            <Typography
              mt={1}
              mx={1}
              align="center"
              variant="h5"
              sx={{
                fontFamily: 'Mukta',
                fontWeight: '600',
              }}
            >
              We Welcome Your Participation!
            </Typography>

            <Box my={3}>
              <Typography
                mx={1}
                mt={3}
                align="justify"
                variant="body1"
                gutterBottom
              >
                You can join us anytime as a volunteer to our open-source
                software & hardware projects.
              </Typography>
              <Typography
                mx={1}
                mt={3}
                align="justify"
                variant="body1"
                gutterBottom
              >
                If you'd like to host a hydrophone, do research, or incorporate
                Orcasound into the educational or outreach efforts of your
                organization,please reach out!
              </Typography>
            </Box>

            <Box
              my={3}
              mt={4}
              mx={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#002984',
                  alignContent: 'center',
                  borderRadius: '30px',
                  '&:hover': {
                    backgroundColor: '#002984',
                    color: 'white',
                  },
                }}
                href="#contained-buttons"
              >
                GET INVOLVED
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

function Mobile({ setseeMore, seeMore }) {
  return (
    <Typography
      mt={1}
      gutterBottom
      onClick={() => setseeMore(!seeMore)}
      align="center"
      sx={{
        textDecorationLine: 'underline',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      {seeMore ? 'Show less...' : 'See more...'}
    </Typography>
  )
}
