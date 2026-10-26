import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import BeWhaleWiseLogo from '../../public/images/subscribe/be-whale-wise-logo.png'
import { getSiteChrome } from '../sanity/siteChrome'
import { pushToDataLayer } from '../utils/gtm'

// Temporary sign-up page for sound notifications (#466 section 1): the same
// text and the same embedded Google Form as orcasound.net/subscribe, so the
// nav's "Notify Me" no longer depends on the WordPress server. Signups keep
// going to the same form. Replace with the designed page when #258 / #284 land.
const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf_eEsqhRxe0PTnpjmAM4w4VplBlGUX1EdkTScn_Sm7Vg9CMQ/viewform?embedded=true'

const ExternalLink = ({ href, children }) => (
  <MuiLink
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() =>
      pushToDataLayer('external_link_click', {
        link_text: typeof children === 'string' ? children : href,
        destination: href,
      })
    }
  >
    {children}
  </MuiLink>
)

export default function Subscribe() {
  return (
    <>
      <Head>
        <title>Get notified | Orcasound</title>
        <meta
          name="description"
          content="Sign up to be notified when Orcasound detects orcas or other interesting underwater sounds."
        />
      </Head>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Get notified
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>
            Get notified when Orcasound detects interesting underwater sounds
          </strong>
          . If orcas or other sounds are heard on our hydrophones, we&apos;ll
          send you a notification. Detections come from humans (you!) and/or
          machines we&apos;re training to listen with us. Notifications come
          with a link to the live stream and a conservation action you can
          complete for the whales while you listen to them. If you miss an
          amazing live event, we include links to recordings and analysis,
          including blog posts by experts about the astounding array of sounds
          we hear in orca habitat.
        </Typography>

        <Box
          sx={{
            float: { sm: 'right' },
            ml: { sm: 3 },
            mb: 2,
            width: 221,
            maxWidth: '60%',
          }}
        >
          <ExternalLink href="https://www.bewhalewise.org/">
            <Image
              src={BeWhaleWiseLogo}
              alt="Be Whale Wise"
              style={{ width: '100%', height: 'auto' }}
            />
          </ExternalLink>
        </Box>

        <Typography variant="body1" paragraph>
          <strong>
            Re-connect with nature and listen for whales, whenever the orcas
            come calling.
          </strong>{' '}
          Please sign up for notifications and help us measure our conservation
          effect using the form below. Also, please remember to{' '}
          <ExternalLink href="https://www.bewhalewise.org/">
            Be Whale Wise
          </ExternalLink>{' '}
          (including following all local and Federal laws) if you&apos;re
          heading out to sea. You can also get notified by following Orcasound
          on social networks:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 4 }}>
          <Typography component="li" variant="body1">
            <ExternalLink href="https://www.facebook.com/OrcasoundApp/">
              Orcasound on Facebook
            </ExternalLink>
          </Typography>
          <Typography component="li" variant="body1">
            <ExternalLink href="https://www.instagram.com/orcasoundapp/">
              Orcasound on Instagram
            </ExternalLink>
          </Typography>
        </Box>

        <Box
          component="iframe"
          src={FORM_URL}
          title="Orcasound notification sign-up form"
          loading="lazy"
          sx={{
            clear: 'both',
            display: 'block',
            width: '100%',
            // Tall enough for the whole form (measured 2026-10-26: ~4,650px
            // on phones, ~3,330px on desktop) so it doesn't scroll inside
            // the frame. If the form gets longer, it scrolls inside again.
            height: { xs: 4750, sm: 3450 },
            border: 0,
          }}
        >
          Loading…
        </Box>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: { siteChrome: await getSiteChrome() }, revalidate: 60 }
}
