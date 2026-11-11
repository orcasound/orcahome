// Plain-text summary of a MOA form submission, used as the email body and in
// the confirmation view.

export const MOA_CHANGE_TYPE_LABELS = {
  update: 'Update our listing',
  add: 'Add a person or contact',
  remove: 'Remove our listing',
}

// Summary labels follow the form labels, without the inline hints.
const JOIN_FIELDS = [
  ['name', 'Your name'],
  ['email', 'Email'],
  ['organization', 'Organization'],
  ['is501c3', '501(c)(3) nonprofit'],
  ['nodesAndRoles', 'Node(s) and/or role(s)'],
  ['website', 'Website'],
]

const CHANGE_FIELDS = [
  ['name', 'Your name'],
  ['email', 'Email'],
  ['memberOrganization', 'Member listing'],
  ['changeType', 'Change requested'],
  ['details', 'Details'],
]

const formatValue = (key, value) => {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (value === undefined || value === null || value === '') {
    return '(not provided)'
  }
  if (key === 'changeType') return MOA_CHANGE_TYPE_LABELS[value] || value
  return String(value)
}

export function buildSubject(submission) {
  const fields = submission?.fields || {}
  if (submission?.type === 'change') {
    return `MOA member listing change request: ${fields.memberOrganization}`
  }
  return `MOA membership application: ${fields.organization || fields.name}`
}

export function buildSubmissionSummary(submission) {
  const { type, fields = {}, moa = {}, submittedAt } = submission || {}
  const spec = type === 'change' ? CHANGE_FIELDS : JOIN_FIELDS
  const lines = spec.map(
    ([key, label]) => `${label}: ${formatValue(key, fields[key])}`
  )
  lines.push(
    moa.subtitle ? `MOA: ${moa.title} (${moa.subtitle})` : `MOA: ${moa.title}`
  )
  if (type === 'join') lines.push(`Agreed to: "${moa.agreementStatement}"`)
  lines.push(`Submitted: ${submittedAt}`)
  return lines.join('\n')
}
