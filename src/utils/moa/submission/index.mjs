/**
 * Pluggable delivery for the MOA join and change-request forms.
 *
 * The handler is chosen at build time by NEXT_PUBLIC_MOA_SUBMISSION_HANDLER:
 * `mailto` (default) or `console` (development only). Adding a handler means
 * one new file and one registry entry; the forms never change.
 *
 * Future `api` handler (not built; storage is a leadership decision). It would
 * POST JSON to a new src/pages/api/moa-submission.js. That route is a public,
 * unauthenticated endpoint, so it must:
 *   (1) accept only POST and return 405 otherwise, like api/research-panel.js;
 *   (2) cap the body with
 *       `export const config = { api: { bodyParser: { sizeLimit: '10kb' } } }`;
 *   (3) re-run validateJoin / validateChangeRequest server-side from
 *       ../validation.mjs and reject with 400 and field messages, never
 *       trusting the client;
 *   (4) sanitize with sanitizeText and escape on output wherever the storage
 *       target renders HTML;
 *   (5) include a honeypot field (pattern from research-opt-in-form.jsx:
 *       aria-hidden, tabIndex={-1}, visually off-screen) named so it collides
 *       with no real field, e.g. `company_url_confirm`, plus per-IP rate
 *       limiting or a CAPTCHA such as Cloudflare Turnstile;
 *   (6) keep storage credentials in server-only env vars;
 *   (7) log failures at error level without field values;
 *   (8) return generic 502/500 messages.
 *
 * @typedef {'join' | 'change'} MoaSubmissionType
 * @typedef {{ type: MoaSubmissionType, fields: object, moa: { title: string, subtitle: string, agreementStatement: string }, submittedAt: string }} MoaSubmission
 * @typedef {{ ok: true, mode: string, summary: string, subject: string, recipient?: string, mailtoHref?: string }
 *         | { ok: false, mode: string, errorMessage: string }} MoaSubmissionResult
 * @typedef {{ navigate?: (href: string) => void, logger?: Console, recipient?: string }} MoaSubmissionContext
 * @typedef {{ name: string, submit(submission: MoaSubmission, ctx: MoaSubmissionContext): Promise<MoaSubmissionResult> }} MoaSubmissionHandler
 */

import { consoleHandler } from './consoleHandler.mjs'
import { mailtoHandler } from './mailtoHandler.mjs'

export const MOA_SUBMISSION_HANDLERS = {
  mailto: mailtoHandler,
  console: consoleHandler,
}

/** @returns {MoaSubmissionHandler} */
export function resolveMoaSubmissionHandler(
  name = process.env.NEXT_PUBLIC_MOA_SUBMISSION_HANDLER,
  nodeEnv = process.env.NODE_ENV,
  logger = console
) {
  const key = typeof name === 'string' ? name.trim() : ''
  if (!key) return mailtoHandler
  if (!Object.prototype.hasOwnProperty.call(MOA_SUBMISSION_HANDLERS, key)) {
    logger.warn(
      `[moa] Unknown NEXT_PUBLIC_MOA_SUBMISSION_HANDLER "${key}"; using mailto.`
    )
    return mailtoHandler
  }
  if (key === 'console' && nodeEnv === 'production') {
    logger.warn(
      '[moa] NEXT_PUBLIC_MOA_SUBMISSION_HANDLER "console" is not allowed in production; using mailto.'
    )
    return mailtoHandler
  }
  return MOA_SUBMISSION_HANDLERS[key]
}

/**
 * @param {MoaSubmission} submission
 * @param {MoaSubmissionContext & { handler?: MoaSubmissionHandler }} [options]
 * @returns {Promise<MoaSubmissionResult>}
 */
export async function submitMoaForm(
  submission,
  { handler = resolveMoaSubmissionHandler(), ...ctx } = {}
) {
  return handler.submit(submission, ctx)
}
