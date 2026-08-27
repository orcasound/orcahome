import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link as MuiLink,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const initialForm = {
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  conservation: '',
  locality: '',
  generation: '',
  priorExposure: '',
  subscriber: '',
  consent: false,
  website: '',
}

export default function ResearchOptInForm() {
  const router = useRouter()

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateField = (field) => (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/research-panel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const body = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          body?.message || 'Something went wrong. Please try again.'
        )
      }

      await router.push('/research-opt-in-form-conf')
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )

      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Join the Orcasound Research Panel</title>
        <meta name="description" content="Join the Orcasound research panel." />
      </Head>

      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Orcasound
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Thank you for your interest in Orcasound. Please share the following
          details to join the research panel.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField('email')}
            required
            fullWidth
            margin="normal"
            autoComplete="email"
          />

          <TextField
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={updateField('firstName')}
            fullWidth
            margin="normal"
            autoComplete="given-name"
          />

          <TextField
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={updateField('lastName')}
            fullWidth
            margin="normal"
            autoComplete="family-name"
          />

          <TextField
            select
            label="Which best describes you?"
            name="role"
            value={form.role}
            onChange={updateField('role')}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Prefer not to say</MenuItem>
            <MenuItem value="listener">Listener / community member</MenuItem>
            <MenuItem value="educator">Educator</MenuItem>
            <MenuItem value="researcher">Researcher</MenuItem>
            <MenuItem value="developer">Developer / technologist</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            select
            label="Conservation engagement"
            name="conservation"
            value={form.conservation}
            onChange={updateField('conservation')}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Prefer not to say</MenuItem>
            <MenuItem value="new">New to conservation</MenuItem>
            <MenuItem value="interested">Interested in conservation</MenuItem>
            <MenuItem value="volunteer">
              Volunteer or occasional participant
            </MenuItem>
            <MenuItem value="active">Actively involved</MenuItem>
            <MenuItem value="professional">Professional work</MenuItem>
          </TextField>

          <TextField
            select
            label="Location"
            name="locality"
            value={form.locality}
            onChange={updateField('locality')}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Prefer not to say</MenuItem>
            <MenuItem value="North_San_Juan_Channel">
              North San Juan Channel
            </MenuItem>
            <MenuItem value="Orcasound_Lab">Orcasound Lab</MenuItem>
            <MenuItem value="Andrews_Bay">Andrews Bay</MenuItem>
            <MenuItem value="Port_Townsend">Port Townsend</MenuItem>
            <MenuItem value="Bush_Point">Bush Point</MenuItem>
            <MenuItem value="Beach_Camp_at_Sunset_Bay">
              Beach Camp at Sunset Bay
            </MenuItem>
            <MenuItem value="MaST_Center_Aquarium">
              MaST Center Aquarium
            </MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            select
            label="What generation do you belong to?"
            name="generation"
            value={form.generation}
            onChange={updateField('generation')}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Prefer not to say</MenuItem>
            <MenuItem value="gen_z">Gen Z</MenuItem>
            <MenuItem value="millennial">Millennial</MenuItem>
            <MenuItem value="gen_x">Gen X</MenuItem>
            <MenuItem value="boomer">Baby Boomer</MenuItem>
            <MenuItem value="silent">Silent Generation</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            select
            label="How did you first hear about Orcasound?"
            name="priorExposure"
            value={form.priorExposure}
            onChange={updateField('priorExposure')}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Prefer not to say</MenuItem>
            <MenuItem value="orcasound_website">Orcasound website</MenuItem>
            <MenuItem value="social_media">Social media</MenuItem>
            <MenuItem value="friend_or_colleague">Friend or colleague</MenuItem>
            <MenuItem value="school_or_university">
              School or university
            </MenuItem>
            <MenuItem value="community_event">Community event</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            select
            label="Email preference"
            name="subscriber"
            value={form.subscriber}
            onChange={updateField('subscriber')}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Research invitations only</MenuItem>
            <MenuItem value="research_panel">Research invitations</MenuItem>
            <MenuItem value="research_and_product">
              Research and Orcasound product updates
            </MenuItem>
          </TextField>

          <Box
            sx={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
            }}
            aria-hidden="true"
          >
            <TextField
              label="Website"
              name="website"
              value={form.website}
              onChange={updateField('website')}
              tabIndex={-1}
              autoComplete="off"
            />
          </Box>

          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                name="consent"
                checked={form.consent}
                onChange={updateField('consent')}
                required
              />
            }
            label={
              <>
                I agree to join the Orcasound research panel and receive
                occasional research invitations. I understand I can unsubscribe
                at any time. I have read the{' '}
                <MuiLink
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy &amp; Consent Policy
                </MuiLink>
                .
              </>
            }
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !form.consent}
            sx={{ mt: 3, display: 'block' }}
          >
            {loading ? 'Submitting...' : 'Join the research panel'}
          </Button>
        </Box>
      </Container>
    </>
  )
}
