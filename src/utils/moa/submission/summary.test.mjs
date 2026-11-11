import assert from 'node:assert/strict'
import test from 'node:test'

import { buildSubject, buildSubmissionSummary } from './summary.mjs'

const moa = {
  title: 'Orcasound Memorandum of Agreement',
  subtitle: 'For Member Organizations & Individuals (1/2021-12/2025)',
  agreementStatement: 'I agree.',
}
const submittedAt = '2026-01-02T03:04:05.000Z'

const join = (fields) => ({ type: 'join', fields, moa, submittedAt })
const change = (fields) => ({ type: 'change', fields, moa, submittedAt })

test('subjects for both types', () => {
  assert.equal(
    buildSubject(join({ name: 'Ada', organization: 'Org' })),
    'MOA membership application: Org'
  )
  assert.equal(
    buildSubject(join({ name: 'Ada', organization: '' })),
    'MOA membership application: Ada'
  )
  assert.equal(
    buildSubject(change({ memberOrganization: 'Orca Network' })),
    'MOA member listing change request: Orca Network'
  )
})

test('join summary lists every field, booleans, missing values, MOA, agreement, and timestamp', () => {
  const text = buildSubmissionSummary(
    join({
      name: 'Ada',
      email: 'ada@example.org',
      organization: '',
      is501c3: true,
      nodesAndRoles: 'Research',
      website: '',
    })
  )
  assert.equal(
    text,
    [
      'Your name: Ada',
      'Email: ada@example.org',
      'Organization: (not provided)',
      '501(c)(3) nonprofit: Yes',
      'Node(s) and/or role(s): Research',
      'Website: (not provided)',
      `MOA: ${moa.title} (${moa.subtitle})`,
      'Agreed to: "I agree."',
      `Submitted: ${submittedAt}`,
    ].join('\n')
  )
  assert.match(
    buildSubmissionSummary(join({ is501c3: false })),
    /501\(c\)\(3\) nonprofit: No/
  )
})

test('change summary has no agreement line and shows the change label', () => {
  const text = buildSubmissionSummary(
    change({
      name: 'Ada',
      email: 'ada@example.org',
      memberOrganization: 'Orca Network',
      changeType: 'remove',
      details: 'Please remove',
    })
  )
  assert.doesNotMatch(text, /Agreed to/)
  assert.match(text, /Change requested: Remove our listing/)
  assert.match(text, /Member listing: Orca Network/)
  assert.match(text, new RegExp(`Submitted: ${submittedAt}`))
})
