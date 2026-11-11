// Development-only handler: logs the submission and sends nothing.

import { buildSubject, buildSubmissionSummary } from './summary.mjs'

export const consoleHandler = {
  name: 'console',
  async submit(submission, ctx = {}) {
    const logger = ctx.logger ?? console
    logger.info('[moa] submission (console handler, nothing sent)', submission)
    return {
      ok: true,
      mode: 'console',
      summary: buildSubmissionSummary(submission),
      subject: buildSubject(submission),
    }
  },
}
