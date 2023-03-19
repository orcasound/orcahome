import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'

import audio from '../../public/audio/frequency.mp3'
import frequency1 from '../../public/images/frequency2.png'
import LearnBanner from '../../public/images/learn.jpg'
import organization1 from '../../public/images/partner1.png'
import organization2 from '../../public/images/partner2.png'
import roundorca from '../../public/images/roundorca.png'
import salishsea from '../../public/images/salishsea.png'
import TopBanner from '../components/TopBanner'
import learnStyles from '../styles/Learn.module.css'

export const learn = () => {
  return (
    <>
      <Head>
        <title>Orcasound</title>
      </Head>

      <TopBanner
        bannerImg={LearnBanner}
        pageTitle={`Learn`}
        pageDesc={`You’ll hear a lot of different sounds on the hydrophones. Select the jump links below or scroll down to learn about the marine acoustic landscape. `}
        scrollToId={`learn`}
      />
      <Box m={3} id="learn">
        <Container>
          <ul className={learnStyles.hello}>
            <li>Sounds of the Salish Sea</li>
            <li>3 common calls</li>
            <li>Souther Resident Killer Whale Call Catalog</li>
            <li>Exhibits</li>
          </ul>
          <Box>
            <Typography
              variant="h1"
              fontFamily={'Mukta'}
              fontSize="34px"
              fontWeight={'600'}
              mb={{ xs: 3, sm: 4 }}
              mt={{ xs: 3 }}
            >
              Sounds of the Salish Sea
              <br></br>
            </Typography>
            <Typography
              variant="body1"
              textAlign="justify"
              width={{ md: '100%', xl: '70%', lg: '70%' }}
              sx={{ marginBottom: '20px' }}
            >
              {`Explore common sounds of the Salish Sea by selecting the animals and
            other objects in this anoramic soundscape of the inlandwaters of
            Washington State(USA) and British Columbia(Canada)`}
            </Typography>
            <Image
              alt="Sounds Of The Salish Sea"
              src={salishsea}
              sx={{ objectFit: 'contain' }}
              width={1300}
              height={700}
              layout="intrinsic"
              quality={65}
            />
          </Box>
          <Box mt={'50px'} mb={{ sm: '50px' }}>
            <Box
              display={{ lg: 'flex', sm: 'flex', md: 'flex-direction: row' }}
              sx={{ justifyContent: 'space-between' }}
              height={{ lg: '250px', sm: '300px', md: '250px' }}
            >
              <Box mb={{ md: '50px' }}>
                <Typography
                  variant="h2"
                  fontFamily={'Mukta'}
                  fontSize="34px"
                  fontWeight={'600'}
                  mb={{ xs: 3, sm: 4 }}
                  mt={{ xs: 3 }}
                >
                  3 Common Calls
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="justify"
                  display="inline-block"
                  lineHeight="2"
                  letterSpacing="normal"
                  width={{ lg: '500px', sm: '350px', xs: '320px' }}
                  mb={{ md: '50px' }}
                >
                  {`Conveniently, a few calls are used almost exclusively by each
                  southern resident pod. This means that by memorizing just 3 calls,
                  you can tell with great certainty that you are hearing a particular
                  pod of orcas!`}
                </Typography>
              </Box>
              <Box>
                <Image
                  src={roundorca}
                  alt="OrcaImage"
                  width={500}
                  // width={{ md: '300px', xl: '100px', lg: '300px' }}
                  height={500}
                  layout="intrinsic"
                  quality={65}
                />
              </Box>
            </Box>
            <Box
              display={{ lg: 'flex', sm: 'flex', md: 'flex-direction: row' }}
              position={'relative'}
              pt={{ sm: '50px' }}
            >
              <Box pl={'20px'} marginBottom={'20px'}>
                <Box
                  backgroundColor={'skyblue'}
                  width={'fit-content'}
                  marginBottom={'20px'}
                >
                  <Image
                    // width={'500px'}
                    src={frequency1}
                    alt="J pod's call - Frequency and Time"
                  />
                  <Box pl={'20px'}>
                    <h6>{`J pod's Favorite call:501`}</h6>
                    <p>{`More description goes here`}</p>
                    <div>
                      <ReactAudioPlayer src={audio} autoPlay={false} controls />
                    </div>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  textAlign="justify"
                  display="inline-block"
                  lineHeight="2"
                  letterSpacing="normal"
                  width={{ lg: '500px', sm: '350px', xs: '320px' }}
                >{`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem praesentium, ducimus eaque adipisci quam placeat perspiciatis! Est deserunt quasi, ad inventore consequuntur beatae maxime! In exercitationem debitis corporis iusto sequi.`}</Typography>
              </Box>
              <Box
                pl={'20px'}
                position={{ lg: 'absolute', sm: 'absolute', md: 'absolute' }}
                left={'50%'}
                bottom={'-40%'}
              >
                <Box
                  // position={'absolute'}
                  backgroundColor={'skyblue'}
                  width={'fit-content'}
                  marginBottom={'20px'}
                >
                  <Image
                    // width={'500px'}
                    src={frequency1}
                    alt="K pod's call - Frequency and Time"
                  />
                  <Box pl={'20px'}>
                    <h6>{`K pod's Favorite call:501`}</h6>
                    <p>{`More description goes here`}</p>
                    <div>
                      <ReactAudioPlayer src={audio} autoPlay={false} controls />
                    </div>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  textAlign="justify"
                  display="inline-block"
                  lineHeight="2"
                  letterSpacing="normal"
                  width={{ lg: '500px', sm: '350px', xs: '320px' }}
                >{`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem praesentium, ducimus eaque adipisci quam placeat perspiciatis! Est deserunt quasi, ad inventore consequuntur beatae maxime! In exercitationem debitis corporis iusto sequi.`}</Typography>
              </Box>
            </Box>
            <Box pl={'20px'} left={'50%'} bottom={'-40%'}>
              <Box
                // position={'absolute'}
                backgroundColor={'skyblue'}
                width={'fit-content'}
                marginTop={'40px'}
                marginBottom={'20px'}
              >
                <Image
                  // width={'500px'}
                  minWidth={'300px'}
                  src={frequency1}
                  alt="K pod's call - Frequency and Time"
                />
                <Box pl={'20px'}>
                  <h6>{`K pod's Favorite call:501`}</h6>
                  <p>{`More description goes here`}</p>
                  <div>
                    <ReactAudioPlayer src={audio} autoPlay={false} controls />
                  </div>
                </Box>
              </Box>
              <Typography
                variant="body1"
                textAlign="justify"
                display="inline-block"
                lineHeight="2"
                letterSpacing="normal"
                width={{ lg: '500px', sm: '350px', xs: '320px' }}
              >{`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem praesentium, ducimus eaque adipisci quam placeat perspiciatis! Est deserunt quasi, ad inventore consequuntur beatae maxime! In exercitationem debitis corporis iusto sequi.`}</Typography>
            </Box>
          </Box>

          <div className={learnStyles.property}>
            <h2>Exhibits</h2>
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
      </Box>
    </>
  )
}

export default learn
