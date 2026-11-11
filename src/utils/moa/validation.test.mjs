import assert from 'node:assert/strict'
import test from 'node:test'

import {
  EMAIL_RE,
  MOA_FIELD_LIMITS,
  sanitizeText,
  validateChangeRequest,
  validateJoin,
} from './validation.mjs'

const validJoin = {
  name: 'Ada',
  email: 'ada@example.org',
  organization: '',
  is501c3: false,
  nodesAndRoles: 'Host a hydrophone',
  website: '',
  agree: true,
}

const members = ['Beam Reach', 'Orca Network']
const validChange = {
  name: 'Ada',
  email: 'ada@example.org',
  memberOrganization: 'Orca Network',
  changeType: 'update',
  details: 'New logo',
}

test('sanitizeText follows the documented step order', () => {
  assert.equal(sanitizeText(42), '')
  assert.equal(sanitizeText(undefined), '')
  assert.equal(sanitizeText('a\nb'), 'a b')
  assert.equal(sanitizeText('a\tb'), 'a b')
  assert.equal(sanitizeText('a\r\nb\u0007', { multiline: true }), 'a\nb')
  assert.equal(sanitizeText('a\rb', { multiline: true }), 'a\nb')
  assert.equal(sanitizeText('  x\u0000y\u009F  '), 'xy')
})

test('a valid join has no errors', () => {
  const { errors, values } = validateJoin(validJoin)
  assert.deepEqual(errors, {})
  assert.equal(values.agree, true)
})

test('empty join reports every required field with its message', () => {
  const { errors } = validateJoin({})
  assert.deepEqual(errors, {
    name: 'Enter your name.',
    email: 'Enter your email address.',
    nodesAndRoles: 'Describe the node(s) or role(s) you plan to take on.',
    agree: 'You need to agree to the MOA to apply.',
  })
})

test('length limits', () => {
  const long = (n) => 'x'.repeat(n)
  const { errors } = validateJoin({
    ...validJoin,
    name: long(101),
    organization: long(151),
    nodesAndRoles: long(501),
  })
  assert.equal(errors.name, 'Name must be 100 characters or fewer.')
  assert.equal(
    errors.organization,
    'Organization must be 150 characters or fewer.'
  )
  assert.match(errors.nodesAndRoles, /500 characters or fewer/)
  assert.deepEqual(validateJoin({ ...validJoin, name: long(100) }).errors, {})
  assert.equal(MOA_FIELD_LIMITS.details, 1000)
})

test('email format', () => {
  assert.ok(EMAIL_RE.test('a@b.co'))
  for (const bad of ['a@b', 'a b@c.org', '@c.org']) {
    assert.equal(
      validateJoin({ ...validJoin, email: bad }).errors.email,
      'Enter a valid email address, like name@example.org.'
    )
  }
  const tooLong = `${'a'.repeat(250)}@b.org`
  assert.ok(validateJoin({ ...validJoin, email: tooLong }).errors.email)
})

test('is501c3 and agree are coerced with === true', () => {
  const { values, errors } = validateJoin({
    ...validJoin,
    is501c3: 'true',
    agree: 'true',
  })
  assert.equal(values.is501c3, false)
  assert.equal(errors.agree, 'You need to agree to the MOA to apply.')
})

test('website normalization', () => {
  const ok = (w) => validateJoin({ ...validJoin, website: w })
  assert.equal(ok('example.org').values.website, 'https://example.org')
  assert.equal(ok('http://x.org/a').values.website, 'http://x.org/a')
  const msg = 'Enter a full web address, like https://example.org.'
  assert.equal(ok('javascript:alert(1)').errors.website, msg)
  assert.equal(ok('ftp://x').errors.website, msg)
  assert.equal(ok('https://').errors.website, msg)
  assert.equal(ok('').errors.website, undefined)
})

test('a valid change request has no errors', () => {
  assert.deepEqual(validateChangeRequest(validChange, members).errors, {})
})

test('change request rules and messages', () => {
  const { errors } = validateChangeRequest({}, members)
  assert.deepEqual(errors, {
    name: 'Enter your name.',
    email: 'Enter your email address.',
    memberOrganization: 'Choose the member listing to change.',
    changeType: "Choose what you'd like to change.",
    details: 'Describe the change.',
  })
  assert.equal(
    validateChangeRequest(
      { ...validChange, memberOrganization: 'Not a member' },
      members
    ).errors.memberOrganization,
    'Choose the member listing to change.'
  )
  assert.ok(
    validateChangeRequest({ ...validChange, changeType: 'delete' }, members)
      .errors.changeType
  )
  assert.match(
    validateChangeRequest(
      { ...validChange, details: 'x'.repeat(1001) },
      members
    ).errors.details,
    /1000 characters or fewer/
  )
})

test('multiline details keep newlines', () => {
  const { values } = validateChangeRequest(
    { ...validChange, details: 'line 1\r\nline 2' },
    members
  )
  assert.equal(values.details, 'line 1\nline 2')
})
