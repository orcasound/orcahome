import assert from 'node:assert/strict'
import test from 'node:test'

import { consoleHandler } from './consoleHandler.mjs'
import {
  MOA_SUBMISSION_HANDLERS,
  resolveMoaSubmissionHandler,
  submitMoaForm,
} from './index.mjs'
import { mailtoHandler } from './mailtoHandler.mjs'

const makeLogger = () => {
  const warnings = []
  const infos = []
  return {
    warnings,
    infos,
    warn: (m) => warnings.push(m),
    info: (...a) => infos.push(a),
  }
}

test('registry holds mailto and console', () => {
  assert.equal(MOA_SUBMISSION_HANDLERS.mailto, mailtoHandler)
  assert.equal(MOA_SUBMISSION_HANDLERS.console, consoleHandler)
})

test('resolution matrix', () => {
  const cases = [
    [undefined, 'development', 'mailto', 0],
    ['', 'production', 'mailto', 0],
    ['mailto', 'production', 'mailto', 0],
    ['console', 'development', 'console', 0],
    ['console', 'production', 'mailto', 1],
    ['carrier-pigeon', 'development', 'mailto', 1],
    ['toString', 'development', 'mailto', 1],
  ]
  for (const [name, env, expected, warnCount] of cases) {
    const logger = makeLogger()
    const handler = resolveMoaSubmissionHandler(name, env, logger)
    assert.equal(handler.name, expected, `${name}/${env}`)
    assert.equal(logger.warnings.length, warnCount, `${name}/${env} warnings`)
  }
  const logger = makeLogger()
  resolveMoaSubmissionHandler('carrier-pigeon', 'development', logger)
  assert.equal(
    logger.warnings[0],
    '[moa] Unknown NEXT_PUBLIC_MOA_SUBMISSION_HANDLER "carrier-pigeon"; using mailto.'
  )
})

test('submitMoaForm passes the submission and ctx to the handler', async () => {
  const calls = []
  const handler = {
    name: 'fake',
    async submit(submission, ctx) {
      calls.push([submission, ctx])
      return { ok: true, mode: 'fake', summary: '', subject: '' }
    },
  }
  const navigate = () => {}
  const submission = { type: 'join', fields: {} }
  const result = await submitMoaForm(submission, {
    handler,
    navigate,
    recipient: 'a@b.org',
  })
  assert.equal(result.mode, 'fake')
  assert.equal(calls[0][0], submission)
  assert.deepEqual(calls[0][1], { navigate, recipient: 'a@b.org' })
})

test('console handler logs and returns the summary', async () => {
  const logger = makeLogger()
  const result = await consoleHandler.submit(
    {
      type: 'change',
      fields: { memberOrganization: 'Orca Network' },
      moa: { title: 'MOA' },
      submittedAt: 'now',
    },
    { logger }
  )
  assert.equal(result.mode, 'console')
  assert.equal(logger.infos.length, 1)
  assert.match(result.subject, /Orca Network/)
})
