import CloseIcon from '@mui/icons-material/Close'
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { resolveMoaRecipient } from '../../utils/moa/submission/mailtoHandler.mjs'
import { moaFocusRing, moaFormContrast } from './moaStyles'

// Shown in either form when the submission handler throws or returns
// ok: false. The address comes from the same resolver the mailto handler
// uses, so it always matches the configured recipient.
export const MoaSubmissionErrorAlert = () => {
  const recipient = resolveMoaRecipient()
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      Something went wrong preparing your submission. Please email{' '}
      <Link
        href={`mailto:${recipient}`}
        sx={{ textDecoration: 'underline', color: '#1B2B7B' }}
      >
        {recipient}
      </Link>
      .
    </Alert>
  )
}

// Shared modal shell for the MOA join and change-request forms. MUI Dialog
// provides the focus trap, Escape to close, aria-modal, and focus return.
const MoaFormDialog = ({
  open,
  onClose,
  title,
  titleId,
  confirmation,
  pendingFocusRef,
  onExited,
  children,
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      // Portaled outside the section, so the scoped a11y styles go on Paper.
      // MUI 5 sets neither aria-modal nor focus on the role="dialog" Paper
      // (its FocusTrap focuses the surrounding container), so add both.
      PaperProps={{
        'aria-modal': true,
        tabIndex: -1,
        sx: { ...moaFocusRing, ...moaFormContrast, '&:focus': { outline: 0 } },
      }}
      TransitionProps={{
        // Runs before FocusTrap's open effect; the trap keeps focus that is
        // already inside the modal, so the dialog itself receives focus.
        onEntering: (node) => node.querySelector('[role="dialog"]')?.focus(),
        // Runs after MUI's FocusTrap has restored focus to the trigger, so a
        // pending redirect (from "Read the full MOA") wins.
        onExited: () => {
          const id = pendingFocusRef?.current
          if (pendingFocusRef) pendingFocusRef.current = null
          if (id) {
            const el = document.getElementById(id)
            el?.scrollIntoView({ block: 'start' })
            el?.focus()
          }
          onExited?.()
        },
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          px: 3,
          pt: 3,
        }}
      >
        <Typography
          component="h2"
          id={titleId}
          sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3 }}
        >
          {title}
        </Typography>
        <IconButton aria-label="Close" onClick={onClose} sx={{ mt: -0.5 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 2 }}>{confirmation ?? children}</DialogContent>
    </Dialog>
  )
}

export default MoaFormDialog
