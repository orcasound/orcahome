import { Box, Button, Container, Typography } from '@mui/material'
import Head from 'next/head'

export default function ResearchOptInConfirmation() {
  return (
    <>
      <Head>
        <title>Thanks for joining the Orcasound research panel</title>

        <meta
          name="description"
          content="Your Orcasound research panel signup was received."
        />
      </Head>

      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Box textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            Thanks for joining
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            Your Orcasound research panel opt-in has been received. We may
            contact you occasionally with invitations to participate in
            Orcasound research opportunities.
          </Typography>

          <Button href="/" variant="contained">
            Return to Orcasound
          </Button>
        </Box>
      </Container>
    </>
  )
}
