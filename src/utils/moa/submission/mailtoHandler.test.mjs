import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_MOA_RECIPIENT,
  MAILTO_MAX_LENGTH,
  mailtoHandler,
  resolveMoaRecipient,
} from './mailtoHandler.mjs'

const makeLogger = () => {
  const warnings = []
  return { warnings, warn: (m) => warnings.push(m), info() {} }
}

const submission = (fields = {}) => ({
  type: 'join',
  fields: {
    name: 'Ada & Co? #1',
    email: 'ada@example.org',
    organization: 'Órca Ñetwork',
    is501c3: false,
    nodesAndRoles: 'line 1\nline 2',
    website: '',
    ...fields,
  },
  moa: { title: 'MOA', subtitle: 'Term', agreementStatement: 'I agree.' },
  submittedAt: '2026-01-02T03:04:05.000Z',
})

test('resolveMoaRecipient: unset and empty use the default silently', () => {
  const logger = makeLogger()
  assert.equal(resolveMoaRecipient(undefined, logger), DEFAULT_MOA_RECIPIENT)
  assert.equal(resolveMoaRecipient('', logger), DEFAULT_MOA_RECIPIENT)
  assert.equal(resolveMoaRecipient('   ', logger), DEFAULT_MOA_RECIPIENT)
  assert.deepEqual(logger.warnings, [])
})

test('resolveMoaRecipient: valid value is trimmed; invalid warns and falls back', () => {
  const logger = makeLogger()
  assert.equal(
    resolveMoaRecipient(' admin@orcasound.net ', logger),
    'admin@orcasound.net'
  )
  assert.deepEqual(logger.warnings, [])
  assert.equal(
    resolveMoaRecipient('not-an-email', logger),
    DEFAULT_MOA_RECIPIENT
  )
  assert.deepEqual(logger.warnings, [
    '[moa] Invalid NEXT_PUBLIC_MOA_SUBMISSION_EMAIL; using info@orcasound.net.',
  ])
})

test('submit encodes subject and body and navigates once', async () => {
  const hrefs = []
  const result = await mailtoHandler.submit(submission(), {
    navigate: (h) => hrefs.push(h),
    logger: makeLogger(),
  })
  assert.equal(hrefs.length, 1)
  assert.equal(result.ok, true)
  assert.equal(result.mode, 'mailto')
  assert.equal(result.recipient, DEFAULT_MOA_RECIPIENT)
  assert.equal(result.mailtoHref, hrefs[0])
  const href = hrefs[0]
  assert.ok(href.startsWith('mailto:info@orcasound.net?subject='))
  const url = new URL(href)
  assert.equal(url.searchParams.get('subject'), result.subject)
  assert.equal(url.searchParams.get('body'), result.summary)
  // Reserved and non-ASCII characters are percent-encoded.
  const query = href.slice(href.indexOf('?') + 1)
  assert.equal(query.split('&').length, 2)
  assert.ok(!query.includes('#'))
  assert.ok(query.includes('%0A'))
  assert.ok(query.includes('%C3%93'))
  assert.ok(result.summary.includes('Ada & Co? #1'))
})

test('submit honors ctx.recipient', async () => {
  const result = await mailtoHandler.submit(submission(), {
    navigate() {},
    recipient: 'leadership@example.org',
    logger: makeLogger(),
  })
  assert.ok(result.mailtoHref.startsWith('mailto:leadership@example.org?'))
  assert.equal(result.recipient, 'leadership@example.org')
})

test('a long body is replaced but the full summary is returned', async () => {
  const hrefs = []
  const result = await mailtoHandler.submit(
    submission({ nodesAndRoles: 'x'.repeat(2000) }),
    { navigate: (h) => hrefs.push(h), logger: makeLogger() }
  )
  assert.ok(hrefs[0].length <= MAILTO_MAX_LENGTH)
  assert.equal(
    new URL(hrefs[0]).searchParams.get('body'),
    'Please paste the application details from the Orcasound website here.'
  )
  assert.ok(result.summary.includes('x'.repeat(2000)))
})

test('the threshold is 1900 characters', async () => {
  // Find a field length that lands the full href exactly at the limit.
  const hrefFor = async (n) => {
    let href
    await mailtoHandler.submit(submission({ nodesAndRoles: 'y'.repeat(n) }), {
      navigate: (h) => (href = h),
      logger: makeLogger(),
    })
    return href
  }
  // Each 'y' adds one character to the encoded href.
  const base = (await hrefFor(1)).length - 1
  const atLimit = await hrefFor(MAILTO_MAX_LENGTH - base)
  assert.equal(atLimit.length, MAILTO_MAX_LENGTH)
  assert.ok(atLimit.includes('y'.repeat(10)))
  const overLimit = await hrefFor(MAILTO_MAX_LENGTH - base + 1)
  assert.ok(!overLimit.includes('y'.repeat(10)))
})
