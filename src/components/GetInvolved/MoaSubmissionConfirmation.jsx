import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

// Post-submit view. Always shows the copyable summary, because a mailto link
// cannot tell whether an email app actually opened.
const MoaSubmissionConfirmation = ({ result, type, onDone }) => {
  const headingRef = useRef(null)
  const [copyStatus, setCopyStatus] = useState('')

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('unavailable')
      await navigator.clipboard.writeText(result.summary)
      setCopyStatus('Copied.')
    } catch {
      setCopyStatus("Copy didn't work. Select the text above and copy it.")
    }
  }

  const isConsole = result.mode === 'console'
  const recipientLink = result.recipient ? (
    <Link
      href={`mailto:${result.recipient}`}
      sx={{ textDecoration: 'underline', color: '#1B2B7B' }}
    >
      {result.recipient}
    </Link>
  ) : null

  return (
    <Box role="status">
      <Typography
        component="h3"
        tabIndex={-1}
        ref={headingRef}
        sx={{ fontSize: '20px', fontWeight: 600, mb: 2, outline: 'none' }}
      >
        {isConsole
          ? 'Submission recorded (development mode)'
          : 'Finish in your email app'}
      </Typography>
      {isConsole ? (
        <Typography component="p" sx={{ mb: 2 }}>
          Nothing was sent. The submission was logged to the browser console.
        </Typography>
      ) : (
        <Typography component="p" sx={{ mb: 2 }}>
          We opened an email to {result.recipient} with your details. Send it to
          finish. If no email opened, copy the details below and email them to{' '}
          {recipientLink}.
        </Typography>
      )}
      {type === 'join' && !isConsole ? (
        <Typography component="p" sx={{ mb: 2 }}>
          Orcasound leadership reviews each application before adding new
          members.
        </Typography>
      ) : null}
      <TextField
        id={`moa-${type}-summary`}
        label="Your details"
        value={result.summary}
        multiline
        minRows={4}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" type="button" onClick={handleCopy}>
          Copy details
        </Button>
        <Button variant="contained" type="button" onClick={onDone}>
          Done
        </Button>
      </Box>
      {copyStatus ? (
        <Typography component="p" role="status" sx={{ mt: 2 }}>
          {copyStatus}
        </Typography>
      ) : null}
    </Box>
  )
}

export default MoaSubmissionConfirmation
