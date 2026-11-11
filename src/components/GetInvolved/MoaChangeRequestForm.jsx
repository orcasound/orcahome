import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'

import { pushToDataLayer } from '../../utils/gtm'
import { submitMoaForm } from '../../utils/moa/submission/index.mjs'
import { MOA_CHANGE_TYPE_LABELS } from '../../utils/moa/submission/summary.mjs'
import {
  MOA_CHANGE_TYPES,
  MOA_FIELD_LIMITS,
  validateChangeRequest,
} from '../../utils/moa/validation.mjs'
import { MoaSubmissionErrorAlert } from './MoaFormDialog'
import { moaMenuFocusRing } from './moaStyles'

// Focus order for the first invalid field after a failed submit.
const FIELD_ORDER = [
  'name',
  'email',
  'memberOrganization',
  'changeType',
  'details',
]

const MoaChangeRequestForm = ({ values, onChange, onSubmitted, moa }) => {
  const [errors, setErrors] = useState({})
  const [summaryCount, setSummaryCount] = useState(0)
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const memberNames = moa.members.map((m) => m.organization)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  // TextField select: MUI fills inputRef with a handle whose focus()
  // focuses the combobox display.
  const memberOrganizationRef = useRef(null)
  // RadioGroup `actions`: focus() focuses the checked (or first) radio.
  const changeTypeRef = useRef(null)
  const detailsRef = useRef(null)

  // After the first submit attempt, keep per-field errors and the summary
  // count in sync as the visitor fixes them; the summary hides at zero. Focus
  // only moves on submit. The alert text changes (and is re-announced) only
  // when the count changes, not on every keystroke.
  const revalidate = (next) => {
    if (!attempted) return
    const nextErrors = validateChangeRequest(next, memberNames).errors
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
    const { values: clean, errors: nextErrors } = validateChangeRequest(
      values,
      memberNames
    )
    const count = Object.keys(nextErrors).length
    setErrors(nextErrors)
    setSummaryCount(count)
    setAttempted(true)
    if (count > 0) {
      const first = FIELD_ORDER.find((key) => nextErrors[key])
      const refs = {
        name: nameRef,
        email: emailRef,
        memberOrganization: memberOrganizationRef,
        changeType: changeTypeRef,
        details: detailsRef,
      }
      refs[first]?.current?.focus()
      return
    }

    setSubmitting(true)
    setSubmitError(false)
    try {
      const result = await submitMoaForm({
        type: 'change',
        fields: clean,
        moa: {
          title: moa.title,
          subtitle: moa.subtitle,
          agreementStatement: moa.agreementStatement,
        },
        submittedAt: new Date().toISOString(),
      })
      pushToDataLayer('moa_form_submit', {
        form: 'change',
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

  const textFieldProps = (key, idSuffix = key) => ({
    id: `moa-change-${idSuffix}`,
    value: values[key],
    onChange: (e) => setField(key, e.target.value),
    onBlur: handleBlur,
    error: !!errors[key],
    helperText: errors[key],
    fullWidth: true,
    margin: 'normal',
    required: true,
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
        inputProps={{ maxLength: MOA_FIELD_LIMITS.name }}
      />
      <TextField
        {...textFieldProps('email')}
        inputRef={emailRef}
        label="Email"
        type="email"
        autoComplete="email"
        inputProps={{ maxLength: MOA_FIELD_LIMITS.email }}
      />
      <TextField
        {...textFieldProps('memberOrganization', 'member')}
        inputRef={memberOrganizationRef}
        select
        label="Which member listing?"
        SelectProps={{
          // The listbox is portaled outside the dialog Paper, so the focus
          // ring has to be applied to the menu itself.
          MenuProps: { PaperProps: { sx: moaMenuFocusRing } },
          // MUI puts aria-invalid only on its hidden native input; the
          // combobox is what assistive tech reads.
          SelectDisplayProps: {
            'aria-invalid': errors.memberOrganization ? 'true' : 'false',
          },
        }}
      >
        {memberNames.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <FormControl
        component="fieldset"
        error={!!errors.changeType}
        required
        margin="normal"
        fullWidth
      >
        <FormLabel component="legend" id="moa-change-type-label">
          What would you like to change?
        </FormLabel>
        <RadioGroup
          id="moa-change-type"
          name="moa-change-type"
          value={values.changeType}
          onChange={(e) => setField('changeType', e.target.value)}
          onBlur={handleBlur}
          actions={changeTypeRef}
          aria-labelledby="moa-change-type-label"
          aria-describedby={
            errors.changeType ? 'moa-change-type-error' : undefined
          }
          aria-invalid={errors.changeType ? true : undefined}
        >
          {MOA_CHANGE_TYPES.map((type) => (
            <FormControlLabel
              key={type}
              value={type}
              control={<Radio />}
              label={MOA_CHANGE_TYPE_LABELS[type]}
            />
          ))}
        </RadioGroup>
        {errors.changeType && (
          <FormHelperText id="moa-change-type-error">
            {errors.changeType}
          </FormHelperText>
        )}
      </FormControl>

      <TextField
        {...textFieldProps('details')}
        inputRef={detailsRef}
        label="Details"
        multiline
        rows={4}
        inputProps={{ maxLength: MOA_FIELD_LIMITS.details }}
      />

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" type="submit">
          {submitting ? 'Preparing…' : 'Submit change request'}
        </Button>
      </Box>
    </Box>
  )
}

export default MoaChangeRequestForm
