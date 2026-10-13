import fs from 'fs'
import vm from 'vm'
import assert from 'assert'

const code = fs.readFileSync(
  new URL('./reops_resend_sync.gs', import.meta.url),
  'utf8'
)
const H = [
  'participant_id',
  'full_name',
  'email',
  'opt_in_date',
  'consent_version',
  'consent_status',
  'persona',
  'interest_areas',
  'location_timezone',
  'prior_studies_count',
  'last_invited_date',
  'last_participated_date',
  'recruitment_source',
  'send_flag',
  'unsubscribed',
  'bounced',
  'notes',
  'age_range',
  'general_location',
  'occupation_or_background',
  'accessibility_needs',
  'communication_preferences',
  'demographic_notes',
  'do_not_contact',
  'last_updated',
]
const rowFor = (header) => (o) => header.map((h) => (h in o ? o[h] : ''))
const row = rowFor(H)
const prop = (v) => ({ value: v, type: 'string' })

/**
 * Fake Sheets + Resend. contacts: list-endpoint objects; details: id -> { properties, ...contact fields }.
 * hooks.onFetch(url, tabs) runs on every Resend request (to simulate edits during a run).
 */
function makeEnv(sheetRows, contacts, details = {}, hooks = {}, header = H) {
  const tabs = { Active: [header.slice(), ...sheetRows.map(rowFor(header))] }
  const scriptProps = {}
  const width = () => Math.max(...tabs.Active.map((r) => r.length))
  const sheetObj = (name) => ({
    getDataRange: () => ({
      getValues: () => {
        const w = name === 'Active' ? width() : 0
        return tabs[name].map((r) => {
          const c = r.slice()
          while (c.length < w) c.push('')
          return c
        })
      },
    }),
    getLastRow: () => tabs[name].length,
    getRange: (r, c, nr, nc) => {
      const rng = {
        getValues: () =>
          Array.from({ length: nr }, (_, i) =>
            Array.from({ length: nc }, (_, j) => {
              const rr = tabs[name][r - 1 + i]
              const v = rr ? rr[c - 1 + j] : ''
              return v === undefined ? '' : v
            })
          ),
        setValues: (v) => {
          for (let i = 0; i < nr; i++) {
            tabs[name][r - 1 + i] ??= []
            for (let j = 0; j < nc; j++)
              tabs[name][r - 1 + i][c - 1 + j] = v[i][j]
          }
          return rng
        },
        setNumberFormat: () => rng,
      }
      return rng
    },
    appendRow: (v) => tabs[name].push(v),
  })
  const calls = []
  const logs = []
  const ctx = {
    console,
    Date,
    JSON,
    Object,
    Array,
    String,
    Number,
    Math,
    isNaN,
    encodeURIComponent,
    Logger: { log: (m) => logs.push(String(m)) },
    LockService: {
      getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    },
    PropertiesService: {
      getUserProperties: () => ({
        getProperty: (k) => (k === 'RESEND_API_KEY' ? 'test' : null),
      }),
      getScriptProperties: () => ({
        getProperty: (k) =>
          k === 'RESEND_API_KEY' ? 'LEAKED' : scriptProps[k] ?? null,
        setProperty: (k, v) => {
          scriptProps[k] = v
        },
      }),
    },
    Utilities: {
      sleep: () => {},
      formatDate: (d, tz) => {
        assert.equal(tz, 'UTC')
        return d.toISOString().slice(0, 19).replace('T', ' ')
      },
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSheetByName: (n) => (tabs[n] ? sheetObj(n) : null),
        insertSheet: (n) => {
          tabs[n] = []
          return sheetObj(n)
        },
      }),
    },
    UrlFetchApp: {
      fetch: (url, opts) => {
        calls.push(url)
        assert.equal(opts.method, 'get', 'only GET requests to Resend')
        assert.equal(
          opts.headers.Authorization,
          'Bearer test',
          'key comes from user properties'
        )
        hooks.onFetch?.(url, tabs)
        const u = new URL(url)
        if (u.pathname === '/contacts') {
          const after = u.searchParams.get('after')
          const start = after
            ? contacts.findIndex((c) => c.id === after) + 1
            : 0
          const data = contacts.slice(start, start + 2)
          return {
            getResponseCode: () => 200,
            getContentText: () =>
              JSON.stringify({
                object: 'list',
                has_more: start + 2 < contacts.length,
                data,
              }),
          }
        }
        const id = decodeURIComponent(u.pathname.split('/').pop())
        const base = contacts.find((c) => c.id === id) || {}
        return {
          getResponseCode: () => 200,
          getContentText: () =>
            JSON.stringify({ ...base, properties: {}, ...(details[id] || {}) }),
        }
      },
    },
  }
  vm.createContext(ctx)
  vm.runInContext(code, ctx)
  const A = () => tabs.Active
  const hdr = () => tabs.Active[0]
  const cell = (r, name) => tabs.Active[r][hdr().indexOf(name)]
  return { ctx, tabs, calls, logs, scriptProps, A, hdr, cell }
}
const detailCalls = (env) =>
  env.calls.filter((u) => /\/contacts\/[^?]+$/.test(new URL(u).pathname))

// ---------- Fixture ----------
const sheet = [
  // row 1: subscribed, old answers -> Resend overwrites; researcher columns must survive
  {
    participant_id: 'id-1',
    email: 'A@x.org',
    full_name: 'Ann Old',
    opt_in_date: '2021-03-13 02:01:46',
    consent_status: 'confirmed',
    interest_areas: 'Old role | Old cons',
    notes: 'keep me',
    general_location: 'Seattle (researcher)',
    age_range: '30-39',
    persona: 'P1',
    unsubscribed: 'FALSE',
  },
  // row 2: matched by email, empty id; unsubscribed in Resend -> status only
  {
    participant_id: '',
    email: 'B@X.org',
    consent_status: 'pending re-consent',
    interest_areas: 'keep',
    unsubscribed: '',
  },
  // row 3: resubscribed in Resend; Resend fields empty -> sheet keeps values
  {
    participant_id: 'id-3',
    email: 'c@x.org',
    full_name: 'Cat Sheet',
    occupation_or_background: 'Teacher',
    unsubscribed: true,
    do_not_contact: true,
  },
  // row 4: not in Resend
  { participant_id: 'id-9', email: 'gone@x.org' },
]
const contacts = [
  {
    id: 'id-1',
    email: 'a@x.org',
    first_name: 'Ann',
    last_name: 'New',
    created_at: '2026-07-01T00:00:00Z',
    unsubscribed: false,
  },
  { id: 'id-2', email: 'b@x.org', first_name: 'Bob', unsubscribed: true },
  {
    id: 'id-3',
    email: 'c@x.org',
    first_name: '-',
    last_name: '-',
    created_at: '2026-07-02T00:00:00Z',
    unsubscribed: false,
  },
  {
    id: 'id-4',
    email: 'new@x.org',
    first_name: 'New',
    last_name: 'Person',
    created_at: '2026-09-01T10:00:00Z',
    unsubscribed: false,
  },
  { id: 'id-5', email: 'left@x.org', unsubscribed: true },
]
const PII = {
  optin_ip: prop('1.2.3.4'),
  confirm_ip: prop('5.6.7.8'),
  address: prop('1 Main St'),
  euid: prop('e1'),
  leid: prop('l1'),
  send_batch: prop('4'),
  member_rating: prop('4'),
  tags: prop('persona-x'),
}
const details = {
  'id-1': {
    properties: {
      ...PII,
      role: prop('Educator or student'),
      conservation: prop('Not involved yet'),
      source: prop('reopt_in'),
      locality: prop('I live here'),
      timezone: prop('america/los_angeles'),
      subscriber: prop('research_panel'),
      region: prop('wa'),
      cc: prop('us'),
    },
  },
  'id-2': { properties: { role: prop('SHOULD NOT BE FETCHED') } },
  'id-3': {
    properties: {
      role: prop('-'),
      source: prop(''),
      what_is_your_occupation: prop('-'),
    },
  },
  'id-4': {
    properties: {
      ...PII,
      source: prop('orcasound_web'),
      role: prop('Educator or student'),
      conservation: prop('Not involved yet'),
      locality: prop('I follow from elsewhere'),
      prior_exposure: prop('social_media'),
    },
  },
}

// 1. Preview changes nothing
let env = makeEnv(sheet, contacts, details)
const before = JSON.stringify(env.A())
const p1 = env.ctx.previewSync()
assert.equal(JSON.stringify(env.A()), before, 'preview must not modify Active')
assert.equal(p1.added, 1)
assert.equal(p1.marked_unsubscribed, 1)
assert.equal(p1.marked_resubscribed, 1)
assert.equal(p1.participant_id_filled, 1)
assert.equal(p1.columns_added, 9)
assert.equal(p1.in_sheet_not_in_resend, 1)
assert.ok(p1.field_cells_changed > 0)
assert.ok(
  env.logs.some((m) =>
    m.includes(
      'New columns that would be created: resend_source, resend_region'
    )
  )
)
assert.ok(
  !detailCalls(env).some((u) => u.endsWith('/id-2') || u.endsWith('/id-5')),
  'unsubscribed contacts are status-only: no detail fetch'
)
assert.ok(!env.logs.join('\n').includes('@x.org'), 'logs never contain emails')

// 2. Run
env = makeEnv(sheet, contacts, details)
const r2 = env.ctx.runSync()
const hdr = env.hdr()
assert.deepEqual(
  hdr.slice(0, H.length),
  H,
  'existing columns unchanged, in place'
)
assert.deepEqual(
  hdr.slice(H.length),
  [
    'resend_source',
    'resend_region',
    'resend_cc',
    'resend_locality',
    'resend_what_generation_do_you_belong_to',
    'resend_prior_exposure',
    'resend_how_often_do_you_visit_the_orcasound_website',
    'resend_why_do_you_go_to_orcasound',
    'resend_what_conservation_efforts_do_you_pa',
  ],
  'new columns appended on the right'
)
for (const bad of [
  'optin_ip',
  'confirm_ip',
  'address',
  'euid',
  'leid',
  'send_batch',
  'member_rating',
  'tags',
])
  assert.ok(!hdr.some((h) => String(h).includes(bad)), 'no PII column ' + bad)
const all = JSON.stringify(env.A())
for (const v of ['1.2.3.4', '5.6.7.8', '1 Main St', 'persona-x'])
  assert.ok(!all.includes(v), 'PII value never written: ' + v)

// row 1 overwritten where Resend differs; researcher-only cells kept
assert.equal(env.cell(1, 'email'), 'a@x.org')
assert.equal(env.cell(1, 'full_name'), 'Ann New')
assert.equal(
  env.cell(1, 'interest_areas'),
  'Educator or student | Not involved yet'
)
assert.equal(
  env.cell(1, 'recruitment_source'),
  'reopt_in',
  'filled because it was empty'
)
assert.equal(env.cell(1, 'resend_source'), 'reopt_in')
assert.equal(env.cell(1, 'location_timezone'), 'america/los_angeles')
assert.equal(env.cell(1, 'communication_preferences'), 'research_panel')
assert.equal(env.cell(1, 'resend_locality'), 'I live here')
assert.equal(env.cell(1, 'resend_region'), 'wa')
assert.equal(env.cell(1, 'resend_cc'), 'us')
assert.equal(
  env.cell(1, 'opt_in_date'),
  '2021-03-13 02:01:46',
  'opt_in_date not overwritten from created_at'
)
for (const [k, v] of [
  ['notes', 'keep me'],
  ['general_location', 'Seattle (researcher)'],
  ['age_range', '30-39'],
  ['persona', 'P1'],
  ['consent_status', 'confirmed'],
])
  assert.equal(env.cell(1, k), v, k + ' untouched')
assert.match(
  String(env.cell(1, 'last_updated')),
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
)

// row 2: status only
assert.equal(env.cell(2, 'participant_id'), 'id-2')
assert.equal(env.cell(2, 'unsubscribed'), true)
assert.equal(env.cell(2, 'do_not_contact'), true)
assert.equal(env.cell(2, 'interest_areas'), 'keep')
assert.equal(
  env.cell(2, 'full_name'),
  '',
  'unsubscribed rows get no field sync'
)
assert.equal(env.cell(2, 'consent_status'), 'pending re-consent')

// row 3: Resend empty / "-" keeps sheet values; resubscribed; DNC never cleared
assert.equal(env.cell(3, 'full_name'), 'Cat Sheet')
assert.equal(env.cell(3, 'occupation_or_background'), 'Teacher')
assert.equal(env.cell(3, 'unsubscribed'), false)
assert.equal(env.cell(3, 'do_not_contact'), true)

// row 4 (not in Resend) untouched
assert.equal(env.cell(4, 'last_updated'), '')

// new row
assert.equal(env.A().length, 6)
assert.equal(env.cell(5, 'participant_id'), 'id-4')
assert.equal(env.cell(5, 'full_name'), 'New Person')
assert.equal(
  env.cell(5, 'interest_areas'),
  'Educator or student | Not involved yet'
)
assert.equal(env.cell(5, 'recruitment_source'), 'orcasound_web')
assert.equal(env.cell(5, 'resend_prior_exposure'), 'social_media')
assert.equal(env.cell(5, 'resend_locality'), 'I follow from elsewhere')
assert.equal(env.cell(5, 'opt_in_date'), '2026-09-01 10:00:00')
assert.equal(env.cell(5, 'consent_status'), 'confirmed')
assert.equal(env.cell(5, 'unsubscribed'), false)
assert.ok(
  !env.A().some((r) => r[H.indexOf('email')] === 'left@x.org'),
  'unsubscribed non-members are not added'
)
assert.equal(r2.incomplete, false)
assert.equal(env.scriptProps.FIELD_SYNC_CURSOR, '0')

// 3. Second run is a no-op
const sheet2 = env
  .A()
  .slice(1)
  .map((r) => Object.fromEntries(env.hdr().map((h, i) => [h, r[i]])))
const env3 = makeEnv(sheet2, contacts, details, {}, env.hdr().slice())
const p3 = env3.ctx.previewSync()
assert.equal(
  p3.added +
    p3.marked_unsubscribed +
    p3.marked_resubscribed +
    p3.do_not_contact_set +
    p3.participant_id_filled +
    p3.field_cells_changed +
    p3.columns_added,
  0,
  'second run changes nothing: ' + JSON.stringify(p3)
)

// 4. optin_time present -> opt_in_date overwritten on an existing row
const env4 = makeEnv(
  [
    {
      participant_id: 'id-1',
      email: 'a@x.org',
      opt_in_date: '2020-01-01 00:00:00',
    },
  ],
  [contacts[0]],
  { 'id-1': { properties: { optin_time: prop('2021-03-13 02:01:46') } } }
)
env4.ctx.runSync()
assert.equal(env4.cell(1, 'opt_in_date'), '2021-03-13 02:01:46')

// 5. Rows reordered during the run -> nothing written
const env5 = makeEnv(sheet, contacts, details, {
  onFetch: (url, tabs) => {
    if (url.endsWith('/contacts/id-1')) {
      const t = tabs.Active[1]
      tabs.Active[1] = tabs.Active[3]
      tabs.Active[3] = t
    }
  },
})
const snapshot = () => JSON.stringify(env5.tabs.Active)
let afterSwap
env5.ctx.UrlFetchApp.fetch = ((orig) => (u, o) => {
  const r = orig(u, o)
  if (u.endsWith('/contacts/id-1')) afterSwap = snapshot()
  return r
})(env5.ctx.UrlFetchApp.fetch)
assert.throws(() => env5.ctx.runSync(), /added, removed, or reordered/)
assert.equal(snapshot(), afterSwap, 'no writes after rows moved')
assert.match(
  String(env5.tabs['Sync Log'][1][env5.tabs['Sync Log'][0].indexOf('error')]),
  /reordered/
)

// 6. Time budget: stop fetching, mark incomplete, continue next run from the cursor
const many = Array.from({ length: 6 }, (_, k) => ({
  id: 'm' + k,
  email: 'm' + k + '@x.org',
  first_name: 'M' + k,
  unsubscribed: false,
}))
const manyRows = many.map((c) => ({ participant_id: c.id, email: c.email }))
let env6 = makeEnv(manyRows, many)
let clock = 0
env6.ctx.nowMs_ = () => clock
env6.ctx.UrlFetchApp.fetch = ((orig) => (u, o) => {
  if (/\/contacts\/m/.test(u)) clock += 100 * 1000
  return orig(u, o)
})(env6.ctx.UrlFetchApp.fetch)
const r6 = env6.ctx.runSync()
assert.equal(r6.incomplete, true)
assert.equal(r6.details_fetched, 3)
assert.equal(env6.scriptProps.FIELD_SYNC_CURSOR, '3')
assert.equal(env6.cell(1, 'full_name'), 'M0')
assert.equal(env6.cell(4, 'full_name'), '', 'not reached yet')
const cursor = env6.scriptProps.FIELD_SYNC_CURSOR
env6 = makeEnv(
  env6
    .A()
    .slice(1)
    .map((r) => Object.fromEntries(env6.hdr().map((h, i) => [h, r[i]]))),
  many,
  {},
  {},
  env6.hdr().slice()
)
env6.scriptProps.FIELD_SYNC_CURSOR = cursor
env6.ctx.runSync()
assert.equal(
  env6.cell(4, 'full_name'),
  'M3',
  'next run continues from the cursor'
)

// 7. Conflicting duplicates: row untouched (status and fields), reported without email
const dupSheet = [
  {
    participant_id: 'd-1',
    email: 'dup@x.org',
    full_name: 'Keep',
    unsubscribed: 'FALSE',
  },
]
const dupContacts = [
  {
    id: 'd-1',
    email: 'Dup@x.org',
    first_name: 'Changed',
    unsubscribed: true,
    created_at: '2026-06-25T00:00:00Z',
  },
  {
    id: 'd-2',
    email: 'dup@x.org',
    first_name: 'Changed',
    unsubscribed: false,
    created_at: '2026-07-01T00:00:00Z',
  },
]
const env7 = makeEnv(dupSheet, dupContacts)
const p7 = env7.ctx.previewSync()
assert.equal(p7.needs_review, 1)
assert.equal(p7.marked_unsubscribed, 0)
assert.equal(p7.field_cells_changed, 0)
assert.ok(
  env7.logs.some(
    (m) =>
      m.includes('NEEDS REVIEW') &&
      m.includes('sheet row 2') &&
      !m.includes('dup@x.org')
  )
)

// 8. Same-status duplicates follow the record whose id is in participant_id
const env8 = makeEnv(
  dupSheet,
  dupContacts.map((c) => ({
    ...c,
    unsubscribed: false,
    first_name: c.id === 'd-1' ? 'FromD1' : 'FromD2',
  }))
)
env8.ctx.runSync()
assert.equal(env8.cell(1, 'full_name'), 'FromD1')

// 9. Existing Date cells in timestamp columns become text
const env9 = makeEnv(
  [
    {
      participant_id: 'id-1',
      email: 'a@x.org',
      opt_in_date: new Date('2026-08-26T17:05:00Z'),
      last_updated: new Date('2026-10-12T05:00:00Z'),
    },
  ],
  [{ ...contacts[0], first_name: '', last_name: '' }]
)
const p9 = env9.ctx.previewSync()
assert.equal(p9.dates_to_text, 2)
env9.ctx.runSync()
assert.equal(env9.cell(1, 'opt_in_date'), '2026-08-26 17:05:00')

// 12. recruitment_source keeps the original origin; resend_source shows the latest
const env12 = makeEnv(
  [
    {
      participant_id: 'id-1',
      email: 'a@x.org',
      recruitment_source: 'mailchimp_import',
    },
  ],
  [contacts[0]],
  { 'id-1': { properties: { source: prop('reopt_in') } } }
)
env12.ctx.runSync()
assert.equal(env12.cell(1, 'recruitment_source'), 'mailchimp_import')
assert.equal(env12.cell(1, 'resend_source'), 'reopt_in')

// 11. stamp_ keeps zone-less "yyyy-MM-dd HH:mm:ss" text as-is and converts ISO/Date to UTC
assert.equal(env.ctx.stamp_('2021-03-13 02:01:46'), '2021-03-13 02:01:46')
assert.equal(env.ctx.stamp_('2026-09-01T10:00:00Z'), '2026-09-01 10:00:00')
assert.equal(
  env.ctx.stamp_(new Date('2026-10-12T05:00:00Z')),
  '2026-10-12 05:00:00'
)

// 10. Missing required column aborts and is logged
const env10 = makeEnv([], contacts)
env10.tabs.Active[0] = H.filter((h) => h !== 'communication_preferences')
assert.throws(
  () => env10.ctx.runSync(),
  /missing the "communication_preferences"/
)

console.log('all checks passed')
