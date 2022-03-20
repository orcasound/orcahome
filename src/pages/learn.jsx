import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Head from 'next/head'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'

import audio from '../../public/audio/frequency.mp3'
import frequency1 from '../../public/images/frequency2.png'
import LearnBanner from '../../public/images/learn.jpg'
import organization1 from '../../public/images/partner1.png'
import organization2 from '../../public/images/partner2.png'
import salishsea from '../../public/images/salishsea.png'
import roundorca from '../../public/images/srkw2-3.jpg'
import ActionButton from '../components/ActionButton'
import TopBanner from '../components/TopBanner'
import learnStyles from '../styles/Learn.module.css'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0px 100px',
  [theme.breakpoints.down('sm')]: {
    padding: '0px 10px',
  },
}))

const Intro = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '32px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const IntroCallContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '5vh',
  width: '80vw',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    maxWidth: 'none',
    marginTop: '0',
  },
}))

const IntroCallDesc = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '30vw',
  marginTop: '20vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    maxWidth: 'none',
    marginTop: '0',
  },
}))

const CallExampleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80vw',
  justifyContent: 'space-around',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))
const CallExampleLeftWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '500px',
  [theme.breakpoints.down('sm')]: {},
}))

const CallExampleRightWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '500px',
  marginTop: '40vh',
  [theme.breakpoints.down('sm')]: {
    marginTop: '0',
  },
}))
const CallExampleContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '6vh',
  [theme.breakpoints.down('sm')]: {},
}))

const CallExampleContentWrap = styled(Box)(({ theme }) => ({
  backgroundColor: '#CAE9FF',
  maxWidth: '530px',
  padding: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {},
}))

export const learn = () => {
  return (
    <div>
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
      <Container>
        <Intro>
          <ActionButton link="" text="Sounds of the Salish Sea" />
          <ActionButton link="" text="3 common calls" />
          <ActionButton
            link=""
            text="Souther Resident Killer Whale Call Catalog"
          />
          <ActionButton link="" text="Exhibits" />
        </Intro>

        <h1> Sounds Of The Salish Sea</h1>
        <p>
          Explore common sounds of the Salish Sea by selecting the animals and
          other objects in this <br />
          panoramic soundscape of the inland waters of Washington State (USA)
          and British Columbia <br />
          (Canada).
        </p>
        <Image
          src={salishsea}
          alt="Sounds Of The Salish Sea"
          width={1234}
          height={701}
          layout="intrinsic"
          quality={65}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <IntroCallContainer>
            <IntroCallDesc>
              <h2>3 Common Calls</h2>
              <p>
                Conveniently, a few calls are used almost exclusively by each
                southern resident pod. This means that by memorizing just 3
                calls, you can tell with great certainty that you are hearing a
                particular pod of orcas!{' '}
              </p>
            </IntroCallDesc>
            <Box sx={{ borderRadius: '50%', overflow: 'hidden' }}>
              <Image
                src={roundorca}
                alt="OrcaImage"
                width={450}
                height={450}
                layout="intrinsic"
                quality={65}
                objectFit="cover"
              />
            </Box>
          </IntroCallContainer>

          <CallExampleContainer>
            <CallExampleLeftWrap>
              <CallExampleContentContainer>
                <CallExampleContentWrap>
                  <Image
                    src={frequency1}
                    width={530}
                    height={350}
                    alt="J pod's call - Frequency and Time"
                  />
                  <h2>{`J pod's Favorite call:501`}</h2>
                  <p>{`More description goes here`}</p>
                  <div>
                    <ReactAudioPlayer
                      className={learnStyles.audio}
                      src={audio}
                      autoPlay={false}
                      controls
                    />
                  </div>
                </CallExampleContentWrap>
                <p>
                  J pod is the most local of the pods, commonly visiting Seattle
                  about once a month throughout the year, and is famous for
                  J2/Granny who may have been the oldest female orca living to
                  be about 100 years old.
                </p>
              </CallExampleContentContainer>

              <CallExampleContentContainer>
                <CallExampleContentWrap>
                  <Image
                    src={frequency1}
                    width={530}
                    height={350}
                    alt="K pod's call - Frequency and Time"
                  />
                  <h2>{`K pod's Favorite call:516`}</h2>
                  <p>{`More description goes here`}</p>
                  <div>
                    <ReactAudioPlayer
                      className={learnStyles.audio}
                      src={audio}
                      autoPlay={false}
                      controls
                    />
                  </div>
                </CallExampleContentWrap>
                <p>
                  L pod travels the furthest each year, often foraging as far
                  south as San Francisco in wintertime, and is the largest pod
                  with more than 30 members now (and almost 60 in 1993).
                </p>
              </CallExampleContentContainer>
            </CallExampleLeftWrap>
            <CallExampleRightWrap>
              <CallExampleContentWrap>
                <Image
                  src={frequency1}
                  alt="L pod's cal - Frequency and Time"
                  width={530}
                  height={350}
                />
                <h2>{`L pod's Favorite call:519`}</h2>
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
              </CallExampleContentWrap>
              <p>
                K pod is the smallest pod with less than ~20 members since an
                annual census began in the 1970s, but they have the cutest call
                which most listeners think sounds like a kitten mewing.
              </p>
            </CallExampleRightWrap>
          </CallExampleContainer>
        </Box>
        <div className={learnStyles.property}>
          <h2 className={learnStyles.exhibits}>Exhibits</h2>
          <p className={learnStyles.exhibit}>
            {`Learn About the Marine acoustic landscape and the hydrophone network`}
            <br></br>
            {`by exploring these Orcasound Exhibit screens designed for
          educational organizations in the Pudget Sound regions`}
          </p>
        </div>
        <div className={learnStyles.org}>
          <Image src={organization1} alt="Seattle aquarium exhibit" />
          <a href="https://killerwhaletales.org/">
            <Image src={organization2} alt="Marine Science Center Logo" />
          </a>
        </div>
      </Container>
    </div>
  )
}

export default learn
