import { Box, Button, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'

import audio from '../../public/audio/frequency.mp3'
import frequency1 from '../../public/images/frequency2.png'
import LearnBanner from '../../public/images/learn.jpg'
import OrcaSound from '../../public/images/learn/orcasound.png'
import organization1 from '../../public/images/partner1.png'
import organization2 from '../../public/images/partner2.png'
import roundorca from '../../public/images/roundorca.png'
import salishsea from '../../public/images/salishsea.png'
import TopBanner from '../components/TopBanner'
import learnStyles from '../styles/Learn.module.css'

export const learn = () => {
  return (
    <div className={learnStyles.learn}>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={LearnBanner}
        pageTitle={`Learn`}
        pageDesc={`You’ll hear a lot of different sounds on the hydrophones. Select the jump links below or scroll down to learn about the marine acoustic landscape. `}
        scrollToId={`learn`}
      />
      <div id="learn" />
      <section aria-labelledby="salish" className={learnStyles.salishSection}>
        <h1 id="salish" className={learnStyles.salishHeading}>
          {' '}
          Sounds Of The Salish Sea
        </h1>
        <p className={learnStyles.salishBodyText}>
          Explore common sounds of the Salish Sea by selecting the animals and
          other objects in this anoramic soundscape of the inlandwaters of
          Washington State(USA) and British Columbia(Canada)
        </p>
        <Image
          className={learnStyles.salishImg}
          src={salishsea}
          alt="Sounds Of The Salish Sea"
          height={700}
          width={1300}
          layout="responsive"
        />
      </section>
      <div className={learnStyles.orca}>
        <Image
          src={roundorca}
          alt="OrcaImage"
          width={400}
          height={350}
          layout="intrinsic"
          quality={65}
        />
      </div>
      <h2 className={learnStyles.calls}>3 Common Calls</h2>
      <div>
        <div className={learnStyles.gallery}>
          <Image src={frequency1} alt="J pod's call - Frequency and Time" />
          <h6>{`J pod's Favorite call:501`}</h6>
          <p>{`More description goes here`}</p>
          <div>
            <ReactAudioPlayer
              className={learnStyles.audio}
              src={audio}
              autoPlay={false}
              controls
            />
          </div>
        </div>

        <div className={learnStyles.image}>
          <Image src={frequency1} alt="K pod's call - Frequency and Time" />
          <h6>{`K pod's Favorite call:516`}</h6>
          <p>{`More description goes here`}</p>
          <div>
            <ReactAudioPlayer
              className={learnStyles.audio}
              src={audio}
              autoPlay={false}
              controls
            />
          </div>
        </div>

        <div className={learnStyles.gallery2}>
          <Image src={frequency1} alt="L pod's cal - Frequency and Time" />
          <h6>{`L pod's Favorite call:519`}</h6>
          <p>{`More description goes here`}</p>
          <div>
            <ReactAudioPlayer
              className={learnStyles.audio}
              src={audio}
              autoPlay={false}
              controls
              alt="l pod favorite call"
            />
          </div>
        </div>
      </div>
      <div className={learnStyles.property}>
        <h2 className={learnStyles.exhibits}>Exhibits</h2>
        <p className={learnStyles.exhibit}>
          {`Learn About the Marine acoustic landscape and the hydrophone network`}
          <br></br>
          {`by exploring these Orcasound Exhibit screens designed for
          educational organizations in the Pudget Sound regions`}
        </p>
      </div>

      <div className={learnStyles.callCatalog}>
        <Typography variant="h1" fontSize="44px" align="left" mt={5} mb={3}>
          Southern Resident Killer Whale Call Catalog
        </Typography>
        <Typography variant="p" fontSize="20px" align="left">
          Now that you’ve familiarized youself with the 3 most common calls,
          dive in to the call catalog to learn the vocalizations you will hear
          when listening to the livestreaming hydrophones during orca events.
        </Typography>
        <Box
          sx={{
            borderRadius: '33px',
            bgcolor: '#ffff',
            my: '50px',
            py: '50px',
            px: '90px',
            textAlign: 'center',
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 12 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Image src={OrcaSound} alt="Orca Call" />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              mt: 10,
              py: 2,
              px: 5,
            }}
          >
            Access Call Catalog
          </Button>
        </Box>
      </div>

      <div className={learnStyles.org}>
        <Image src={organization1} alt="Seattle aquarium exhibit" />
        <a href="https://killerwhaletales.org/">
          <Image src={organization2} alt="Marine Science Center Logo" />
        </a>
      </div>
    </div>
  )
}

export default learn
