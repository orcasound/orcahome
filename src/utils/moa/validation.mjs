// Client-side validation for the MOA join and change-request forms. Shared so
// a future server-side handler can re-run the same rules.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MOA_FIELD_LIMITS = {
  name: 100,
  email: 254,
  organization: 150,
  nodesAndRoles: 500,
  website: 300,
  details: 1000,
}

export const MOA_CHANGE_TYPES = ['update', 'add', 'remove']

const CONTROL_CHARS_RE = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g

/**
 * Normalize user text. Steps run in this order: non-string to '', CRLF/CR to
 * LF, (single-line only) newlines and tabs to spaces, strip control
 * characters, trim.
 */
export function sanitizeText(value, { multiline = false } = {}) {
  if (typeof value !== 'string') return ''
  let v = value.replace(/\r\n?/g, '\n')
  if (!multiline) v = v.replace(/[\n\t]/g, ' ')
  v = v.replace(CONTROL_CHARS_RE, '')
  return v.trim()
}

const SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i

// Returns the normalized https?:// URL, or null when it is not a web address.
const normalizeWebsite = (v) => {
  const withScheme = SCHEME_RE.test(v) ? v : `https://${v}`
  try {
    const u = new URL(withScheme)
    return u.protocol === 'http:' || u.protocol === 'https:' ? withScheme : null
  } catch {
    return null
  }
}

const requireText = (errors, key, value, max, emptyMsg, longMsg) => {
  if (!value) errors[key] = emptyMsg
  else if (value.length > max) errors[key] = longMsg
}

const checkEmail = (errors, email) => {
  if (!email) errors.email = 'Enter your email address.'
  else if (email.length > MOA_FIELD_LIMITS.email || !EMAIL_RE.test(email)) {
    errors.email = 'Enter a valid email address, like name@example.org.'
  }
}

const checkName = (errors, name) =>
  requireText(
    errors,
    'name',
    name,
    MOA_FIELD_LIMITS.name,
    'Enter your name.',
    'Name must be 100 characters or fewer.'
  )

/** @returns {{ values: object, errors: Record<string, string> }} */
export function validateJoin(input = {}) {
  const values = {
    name: sanitizeText(input.name),
    email: sanitizeText(input.email),
    organization: sanitizeText(input.organization),
    is501c3: input.is501c3 === true,
    nodesAndRoles: sanitizeText(input.nodesAndRoles, { multiline: true }),
    website: sanitizeText(input.website),
    agree: input.agree === true,
  }
  const errors = {}

  checkName(errors, values.name)
  checkEmail(errors, values.email)
  if (values.organization.length > MOA_FIELD_LIMITS.organization) {
    errors.organization = 'Organization must be 150 characters or fewer.'
  }
  requireText(
    errors,
    'nodesAndRoles',
    values.nodesAndRoles,
    MOA_FIELD_LIMITS.nodesAndRoles,
    'Describe the node(s) or role(s) you plan to take on.',
    'Node(s) and/or role(s) must be 500 characters or fewer.'
  )
  if (values.website) {
    const normalized =
      values.website.length <= MOA_FIELD_LIMITS.website
        ? normalizeWebsite(values.website)
        : null
    if (normalized) values.website = normalized
    else errors.website = 'Enter a full web address, like https://example.org.'
  }
  if (!values.agree) errors.agree = 'You need to agree to the MOA to apply.'

  return { values, errors }
}

/** @returns {{ values: object, errors: Record<string, string> }} */
export function validateChangeRequest(input = {}, memberNames = []) {
  const values = {
    name: sanitizeText(input.name),
    email: sanitizeText(input.email),
    memberOrganization: sanitizeText(input.memberOrganization),
    changeType: sanitizeText(input.changeType),
    details: sanitizeText(input.details, { multiline: true }),
  }
  const errors = {}

  checkName(errors, values.name)
  checkEmail(errors, values.email)
  if (
    !values.memberOrganization ||
    !memberNames.includes(values.memberOrganization)
  ) {
    errors.memberOrganization = 'Choose the member listing to change.'
  }
  if (!MOA_CHANGE_TYPES.includes(values.changeType)) {
    errors.changeType = "Choose what you'd like to change."
  }
  requireText(
    errors,
    'details',
    values.details,
    MOA_FIELD_LIMITS.details,
    'Describe the change.',
    'Details must be 1000 characters or fewer.'
  )

  return { values, errors }
}
