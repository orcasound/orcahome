// Default MOA submission handler: opens the visitor's email app with the
// details addressed to Orcasound leadership. Stores nothing.

import { EMAIL_RE } from '../validation.mjs'
import { buildSubject, buildSubmissionSummary } from './summary.mjs'

export const DEFAULT_MOA_RECIPIENT = 'info@orcasound.net'
export const MAILTO_MAX_LENGTH = 1900
const SHORT_BODY =
  'Please paste the application details from the Orcasound website here.'

/**
 * The configured recipient, or the default. The env var is referenced
 * literally so Next inlines it into the client bundle.
 */
export function resolveMoaRecipient(
  value = process.env.NEXT_PUBLIC_MOA_SUBMISSION_EMAIL,
  logger = console
) {
  const v = typeof value === 'string' ? value.trim() : ''
  if (!v) return DEFAULT_MOA_RECIPIENT
  if (EMAIL_RE.test(v)) return v
  logger.warn(
    `[moa] Invalid NEXT_PUBLIC_MOA_SUBMISSION_EMAIL; using ${DEFAULT_MOA_RECIPIENT}.`
  )
  return DEFAULT_MOA_RECIPIENT
}

export const mailtoHandler = {
  name: 'mailto',
  async submit(submission, ctx = {}) {
    const recipient = resolveMoaRecipient(
      ctx.recipient ?? process.env.NEXT_PUBLIC_MOA_SUBMISSION_EMAIL,
      ctx.logger ?? console
    )
    const subject = buildSubject(submission)
    const summary = buildSubmissionSummary(submission)
    const prefix = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=`
    let mailtoHref = prefix + encodeURIComponent(summary)
    if (mailtoHref.length > MAILTO_MAX_LENGTH) {
      // Too long for some mail clients; the confirmation view still shows the
      // full summary to copy.
      mailtoHref = prefix + encodeURIComponent(SHORT_BODY)
    }
    const navigate = ctx.navigate ?? ((href) => window.location.assign(href))
    navigate(mailtoHref)
    return { ok: true, mode: 'mailto', summary, subject, recipient, mailtoHref }
  },
}
