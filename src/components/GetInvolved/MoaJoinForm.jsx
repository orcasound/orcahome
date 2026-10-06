import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'

import { pushToDataLayer } from '../../utils/gtm'
import { submitMoaForm } from '../../utils/moa/submission/index.mjs'
import { MOA_FIELD_LIMITS, validateJoin } from '../../utils/moa/validation.mjs'
import { MoaSubmissionErrorAlert } from './MoaFormDialog'

// Focus order for the first invalid field after a failed submit.
const FIELD_ORDER = [
  'name',
  'email',
  'organization',
  'nodesAndRoles',
  'website',
  'agree',
]

const DEFAULT_HELPER = {
  nodesAndRoles:
    'For example: host a hydrophone node, education/outreach, research, tech support.',
}

const MoaJoinForm = ({ values, onChange, onSubmitted, moa, onReadFullMoa }) => {
  const [errors, setErrors] = useState({})
  const [summaryCount, setSummaryCount] = useState(0)
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const organizationRef = useRef(null)
  const nodesAndRolesRef = useRef(null)
  const websiteRef = useRef(null)
  const agreeRef = useRef(null)

  // After the first submit attempt, keep per-field errors and the summary
  // count in sync as the visitor fixes them; the summary hides at zero. Focus
  // only moves on submit. The alert text changes (and is re-announced) only
  // when the count changes, not on every keystroke.
  const revalidate = (next) => {
    if (!attempted) return
    const nextErrors = validateJoin(next).errors
    setErrors(nextErrors)
    setSummaryCount(Object.keys(nextErrors).length)
  }

  const setField = (key, value) => {
    onChange(key, value)
    revalidate({ ...values, [key]: value })
  }

  const handleBlur = () => revalidate(values)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const { values: clean, errors: nextErrors } = validateJoin(values)
    const count = Object.keys(nextErrors).length
    setErrors(nextErrors)
    setSummaryCount(count)
    setAttempted(true)
    if (count > 0) {
      const first = FIELD_ORDER.find((key) => nextErrors[key])
      const refs = {
        name: nameRef,
        email: emailRef,
        organization: organizationRef,
        nodesAndRoles: nodesAndRolesRef,
        website: websiteRef,
        agree: agreeRef,
      }
      refs[first]?.current?.focus()
      return
    }

    setSubmitting(true)
    setSubmitError(false)
    try {
      const result = await submitMoaForm({
        type: 'join',
        fields: clean,
        moa: {
          title: moa.title,
          subtitle: moa.subtitle,
          agreementStatement: moa.agreementStatement,
        },
        submittedAt: new Date().toISOString(),
      })
      pushToDataLayer('moa_form_submit', {
        form: 'join',
        handler: result.mode,
        page: 'get_involved',
      })
      if (result.ok) {
        onSubmitted(result)
      } else {
        console.error('[moa] submission failed', result.mode)
        setSubmitError(true)
      }
    } catch (err) {
      console.error('[moa] submission failed', err?.message)
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const textFieldProps = (key, extra = {}) => ({
    id: `moa-join-${extra.idSuffix || key}`,
    value: values[key],
    onChange: (e) => setField(key, e.target.value),
    onBlur: handleBlur,
    error: !!errors[key],
    helperText: errors[key] || DEFAULT_HELPER[key],
    inputProps: { maxLength: MOA_FIELD_LIMITS[key] },
    fullWidth: true,
    margin: 'normal',
  })

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Typography component="p" sx={{ mb: 2 }}>
        Fields marked * are required.
      </Typography>
      {summaryCount > 0 && (
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          Please fix {summaryCount} field(s) below.
        </Alert>
      )}
      {submitError && <MoaSubmissionErrorAlert />}

      <TextField
        {...textFieldProps('name')}
        inputRef={nameRef}
        label="Your name"
        autoComplete="name"
        required
      />
      <TextField
        {...textFieldProps('email')}
        inputRef={emailRef}
        label="Email (not shown publicly)"
        type="email"
        autoComplete="email"
        required
      />
      <TextField
        {...textFieldProps('organization')}
        inputRef={organizationRef}
        label="Organization (leave blank if joining as an individual)"
        autoComplete="organization"
      />
      <FormControlLabel
        sx={{ mt: 1 }}
        control={
          <Checkbox
            id="moa-join-is501c3"
            checked={values.is501c3}
            onChange={(e) => setField('is501c3', e.target.checked)}
          />
        }
        label="My organization is a 501(c)(3) nonprofit"
      />
      <TextField
        {...textFieldProps('nodesAndRoles', { idSuffix: 'nodes' })}
        inputRef={nodesAndRolesRef}
        label="Node(s) and/or role(s)"
        multiline
        rows={3}
        required
      />
      <TextField
        {...textFieldProps('website')}
        inputRef={websiteRef}
        label="Website"
        type="url"
        autoComplete="url"
      />

      <FormControl error={!!errors.agree} required sx={{ mt: 2 }}>
        <FormControlLabel
          required
          control={
            <Checkbox
              id="moa-join-agree"
              inputRef={agreeRef}
              checked={values.agree}
              onChange={(e) => setField('agree', e.target.checked)}
              onBlur={handleBlur}
              inputProps={{
                'aria-describedby': errors.agree
                  ? 'moa-join-agree-error'
                  : undefined,
                'aria-invalid': !!errors.agree,
              }}
            />
          }
          label={moa.agreementStatement}
        />
        {errors.agree && (
          <FormHelperText id="moa-join-agree-error">
            {errors.agree}
          </FormHelperText>
        )}
      </FormControl>
      <Box>
        <Button variant="text" type="button" onClick={onReadFullMoa}>
          Read the full MOA
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" type="submit">
          {submitting ? 'Preparing…' : 'Submit application'}
        </Button>
      </Box>
    </Box>
  )
}

export default MoaJoinForm
