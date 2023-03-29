import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import Image from 'next/image'

import arrow from '../../public/images/Arrow.png'
import orcas from '../../public/images/homepage.png'
import vector from '../../public/images/Vector.png'

export const index = () => {
  return (
    <>
      <Head>
        <title>Orcasound | listen live for orcas</title>
        <meta
          name="keywords"
          content="orcasound allows your to listen to live southern killer resident whales live through our hydrophones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          width: '100%',
          maxHeight: 'fit-content',
        }}
      >
        <Image src={orcas} alt="orca background image" />

        <Box
          sx={{
            zIndex: '2',
            transform: {
              md: 'translateY(-210%)',
              lg: 'translateY(-180%)',
            },
            display: 'flex',
            justifyContent: 'center',

            visibility: {
              xs: 'hidden',
              sm: 'visible',
            },
          }}
        >
          <Image src={vector} alt="vector" width={40} height={40} />
        </Box>

        <Box
          sx={{
            zIndex: '2',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#000000',
            borderRadius: '20px',
            mx: {
              xs: 'auto',
            },
            padding: {
              xs: '10px',
              md: '15px',
              lg: '20px',
            },
            transform: {
              xs: 'translateY(-250%)',
              sm: 'translateY(-350%)',
              md: 'translateY(-400%)',
              lg: 'translateY(-500%)',
            },
            width: {
              md: 'fit content',
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Mukta',
              fontSize: {
                xs: '24px',
                md: '44px',
              },
              color: 'white',
              fontStyle: 'normal',
              width: {},
              p: {
                xs: '10px 0px 0px 0px',
              },
              fontWeight: {
                xs: '500',
                sm: '600',
              },
            }}
          >
            LISTEN TO ORCAS LIVE!
          </Typography>

          <Box
            sx={{
              ml: {
                xs: '6px',
                md: '10px',
                lg: '15px',
              },
              pt: {
                xs: '10px',
                md: '19px',
                lg: '18px',
              },
            }}
          >
            <Image src={arrow} width="30px" height="30px" alt="arrow down" />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mx: {
            sm: 0,
            md: 3,
            lg: 10,
          },
        }}
      >
        <Box
          component={Grid}
          item
          sx={{ ml: 2, mt: { xs: -18, sm: -15 }, mb: { xs: 3, sm: 8 } }}
        >
          <Typography
            variant="h1"
            fontFamily={'Mukta'}
            fontSize="44px"
            fontWeight={'600'}
            mb={{ xs: 3, sm: 4 }}
            mr={{ xs: 10 }}
            mt={{ xs: 10, md: 5 }}
          >
            What is Orcasound
            <br></br>
          </Typography>
          <Typography
            variant="body1"
            fontFamily={'Montserrat'}
            fontSize="20px"
            fontWeight={'600'}
            lineHeight="140%"
          >
            {`Orcasound connects your headphones to live hydrophones (underwater
            microphones), your ears to an ocean of sound.`}
            <br></br>
            <br></br>
            {`Orcasound help us explore and conserve marine life around the globe,
            starting with studying and saving the southern resident killer
            whales of the Pacific Northwest. At Orcasound you can listen for
            whales or learn more about marine bioacoustics.`}
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ lg: 5, md: 3 }}
          sx={{
            mb: {
              xs: '10%',
              md: '3%',
              lg: '4%',
            },
          }}
        >
          <Box
            component={Grid}
            item
            display={{ xs: 'block', sm: 'none' }}
            sx={{ ml: 2, fontFamily: 'Montserrat' }}
          >
            <Typography
              variant="h1"
              fontFamily={'Mukta'}
              fontSize="44px"
              fontWeight={'600'}
              mr={{ xs: 10 }}
            >
              Hydrophone Location
            </Typography>
            <Typography variant="body" fontSize="20px" fontWeight={'600'}>
              <br></br>
              {`Orcasound is a cooperative hydrophne network and an
                open-source software & hardware project.`}
              <br></br>
              <br></br>
            </Typography>
          </Box>

          <Grid item xs={12} sm={6} sx={{ fontFamily: 'Montserrat' }}>
            <Card style={{ border: 'none', boxShadow: 'none' }}>
              <CardMedia
                component="img"
                height={'width'}
                image="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2020/10/Screen-Shot-2020-10-20-at-1.40.28-PM.png?resize=770%2C725&ssl=1"
              />
              <CardContent sx={{ fontSize: '20px' }}>
                <Typography
                  gutterBottom
                  component="p"
                  textAlign="center"
                  fontFamily="Montserrat"
                  fontSize="18px"
                  fontWeight={'400'}
                  fontStyle={'normal'}
                >
                  Current Orcasound hydrophone locations
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Box
            component={Grid}
            item
            display={{ xs: 'block', sm: 'none' }}
            sx={{ ml: 2 }}
          >
            <Typography
              fontFamily="Montserrat"
              fontSize="20px"
              fontWeight={'600'}
              mb={{ xs: 3 }}
              mt={{ xs: -5 }}
            >
              <br></br>
              {`We Welcome your participation. If you'd like to host a
                  hydrophone, do research or incorporate Orcasound into the
                  educational or research efforts of your organization , you
                  can join us as a member of the network.`}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1B2B7B',
                alignContent: 'center',
                mx: 1.5,
                my: 1,
                fontFamily: 'Montserrat',
                borderRadius: '30px',
                width: '194px',
                height: '40px',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: 0,
                '&:hover': {
                  backgroundColor: '#1B2B7B',
                  color: 'white',
                },
              }}
            >
              {' '}
              LEARN
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1B2B7B',
                alignContent: 'center',
                mx: 1.5,
                my: 1,
                fontFamily: 'Montserrat',
                borderRadius: '30px',
                width: '194px',
                height: '40px',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: 0,
                '&:hover': {
                  backgroundColor: '#1B2B7B',
                  color: 'white',
                },
              }}
            >
              {' '}
              GET INVOLVED
            </Button>
          </Box>

          <Box
            component={Grid}
            item
            sm={6}
            display={{ xs: 'none', sm: 'block' }}
          >
            <Typography
              variant="h1"
              fontFamily={'Mukta'}
              fontSize="44px"
              fontWeight={'600'}
              mt={{ lg: 8 }}
            >
              Hydrophone Location
            </Typography>
            <Typography
              variant="body"
              fontFamily="Montserrat"
              fontSize="20px"
              fontWeight={'600'}
            >
              <br></br>
              {`Orcasound is a cooperative hydrophne network and an
                  open-source software & hardware project.`}
              <br></br>
              <br></br>
            </Typography>
            <Typography
              fontFamily="Montserrat"
              fontSize="20px"
              fontWeight={'600'}
              mb={5}
            >
              {`We welcome your participation. If you'd like to host a
                  hydrophone, do research or incorporate Orcasound into the
                  educational or research efforts of your organization , you
                  can join us as a member of the network.`}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1B2B7B',
                alignContent: 'center',
                mx: 1.5,
                my: 1,
                fontFamily: 'Montserrat',
                borderRadius: '30px',
                width: '194px',
                height: '40px',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: 0,
                '&:hover': {
                  backgroundColor: '#1B2B7B',
                  color: 'white',
                },
              }}
            >
              {' '}
              LEARN
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1B2B7B',
                alignContent: 'center',
                mx: 1.5,
                my: 1,
                fontFamily: 'Montserrat',
                borderRadius: '30px',
                width: '194px',
                height: '40px',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: 0,
                '&:hover': {
                  backgroundColor: '#1B2B7B',
                  color: 'white',
                },
              }}
            >
              {' '}
              GET INVOLVED
            </Button>
          </Box>
        </Grid>

        {/* Netlify badge for open source plan https://www.netlify.com/legal/open-source-policy */}
        {/* <a href="https://netlify.com">
          <Image
            src="https://netlify.com/img/global/badges/netlify-color-accent.svg"
            alt="Deploys by Netlify"
            width="114"
            height="51"
          />
        </a> */}
      </Box>
    </>
  )
}

export default index
