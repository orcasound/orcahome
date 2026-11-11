/** @OnlyCurrentDoc */
/**
 * ReOps: one-way sync from Resend to the "Active" tab (orcahome #269, Phase 3).
 *
 * Resend is the source of truth for the research panel (the "Orcasound Product"
 * segment). Every run copies Resend's data INTO the sheet. It never writes to
 * Resend, never deletes rows, and never touches researcher-only columns.
 *
 * Rules (decided with Vicky, 2026-10-12):
 *   - Status, everyone in the segment: `unsubscribed` mirrors Resend;
 *     `do_not_contact` is set TRUE on unsubscribe and never cleared.
 *   - Other fields, SUBSCRIBED people only (see FIELD_MAP): when Resend has a
 *     value that differs from the sheet, the sheet is overwritten. When Resend
 *     is empty (or "-"), the sheet keeps its value.
 *   - `opt_in_date` on existing rows only comes from the `optin_time` property,
 *     never from `created_at`.
 *   - `recruitment_source` keeps where the person originally came from: it is
 *     only filled when empty. The latest Resend `source` goes into `resend_source`.
 *   - Resend properties without a matching column go into `resend_*` columns,
 *     which the script appends to the right of the existing columns.
 *   - Allowlist: only properties named in FIELD_MAP are copied. Mailchimp PII
 *     and internals (IP addresses, postal address, ids, batch numbers, ...) are
 *     never written to the sheet.
 *   - New subscribed contacts are appended as rows with consent_status
 *     "confirmed" (both sign-up forms require consent).
 *   - If Resend has conflicting duplicate records for one person (one
 *     subscribed, one unsubscribed), that row is left unchanged and reported.
 *   - Timestamps are written as UTC text "yyyy-MM-dd HH:mm:ss", like the legacy
 *     Mailchimp rows.
 *
 * Setup (once): reload the sheet, then ReOps sync > Set Resend API key, and
 * paste the key into the box. The key is a full_access Resend key (Resend has
 * no read-only keys), so it is stored in USER properties: only the person who
 * set it can read it, and it never shows in Project Settings, where every
 * editor of this sheet could see a Script Property. The daily trigger runs as
 * that same person, so it can still read the key.
 * Optional Script Property (not secret): RESEND_SEGMENT_ID, defaults to the
 * "Orcasound Product" segment.
 *
 * Use:
 *   setResendApiKey()    store (or replace) your Resend API key
 *   previewSync()        dry run: logs what would change, changes nothing in Active
 *   runSync()            applies the changes
 *   installDailyTrigger() runs runSync() once a day; removeTriggers() undoes it
 */

const ACTIVE_TAB = 'Active'
const LOG_TAB = 'Sync Log'
const DEFAULT_SEGMENT_ID = 'e110074e-b6ae-4b53-ada5-24061899f851' // "Orcasound Product"
const RESEND_API = 'https://api.resend.com'
const TIME_BUDGET_MS = 270 * 1000 // Apps Script stops at 6 minutes; leave room to write
const REQUIRED_COLUMNS = [
  'participant_id',
  'full_name',
  'email',
  'opt_in_date',
  'consent_status',
  'interest_areas',
  'location_timezone',
  'recruitment_source',
  'unsubscribed',
  'occupation_or_background',
  'communication_preferences',
  'do_not_contact',
  'last_updated',
]

const isEmpty_ = (v) =>
  v === undefined ||
  v === null ||
  String(v).trim() === '' ||
  String(v).trim() === '-'
const clean_ = (v) => (isEmpty_(v) ? '' : String(v).trim())

/**
 * Allowlist of Resend data copied into the sheet. `value(contact, prop)` returns
 * the Resend value ('' when empty). Columns starting with "resend_" are created
 * if missing. Anything not listed here is never copied.
 */
const FIELD_MAP = [
  { column: 'email', value: (c) => clean_(c.email) },
  {
    column: 'full_name',
    value: (c) =>
      [clean_(c.first_name), clean_(c.last_name)].filter(Boolean).join(' '),
  },
  {
    column: 'interest_areas',
    value: (c, p) => [p('role'), p('conservation')].filter(Boolean).join(' | '),
  },
  // Where the person ORIGINALLY came from (e.g. mailchimp_import): only filled when empty.
  {
    column: 'recruitment_source',
    value: (c, p) => p('source'),
    fillOnly: true,
  },
  // The latest form/channel recorded in Resend; follows Resend.
  { column: 'resend_source', value: (c, p) => p('source') },
  {
    column: 'opt_in_date',
    value: (c, p) => (p('optin_time') ? stamp_(p('optin_time')) : ''),
  },
  { column: 'location_timezone', value: (c, p) => p('timezone') },
  {
    column: 'occupation_or_background',
    value: (c, p) => p('what_is_your_occupation'),
  },
  { column: 'communication_preferences', value: (c, p) => p('subscriber') },
  { column: 'resend_region', value: (c, p) => p('region') },
  { column: 'resend_cc', value: (c, p) => p('cc') },
  { column: 'resend_locality', value: (c, p) => p('locality') },
  {
    column: 'resend_what_generation_do_you_belong_to',
    value: (c, p) => p('what_generation_do_you_belong_to'),
  },
  { column: 'resend_prior_exposure', value: (c, p) => p('prior_exposure') },
  {
    column: 'resend_how_often_do_you_visit_the_orcasound_website',
    value: (c, p) => p('how_often_do_you_visit_the_orcasound_website'),
  },
  {
    column: 'resend_why_do_you_go_to_orcasound',
    value: (c, p) => p('why_do_you_go_to_orcasound'),
  },
  {
    column: 'resend_what_conservation_efforts_do_you_pa',
    value: (c, p) => p('what_conservation_efforts_do_you_pa'),
  },
]
const NEW_COLUMNS = FIELD_MAP.map((f) => f.column).filter(
  (c) => c.indexOf('resend_') === 0
)
const STAMP_COLUMNS = ['opt_in_date', 'last_updated']

const LOG_HEADER = [
  'run_at',
  'mode',
  'resend_contacts',
  'resend_subscribed',
  'sheet_rows_before',
  'added',
  'marked_unsubscribed',
  'marked_resubscribed',
  'do_not_contact_set',
  'participant_id_filled',
  'in_sheet_not_in_resend',
  'duplicate_matches',
  'needs_review',
  'field_cells_changed',
  'rows_field_updated',
  'columns_added',
  'details_fetched',
  'incomplete',
  'error',
]

/** Adds a "ReOps sync" menu to the sheet (runs automatically when the sheet opens). */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('ReOps sync')
    .addItem('Set Resend API key', 'setResendApiKey')
    .addItem('Preview sync (no changes)', 'previewSync')
    .addToUi()
}

function setResendApiKey() {
  const ui = SpreadsheetApp.getUi()
  const res = ui.prompt(
    'Resend API key',
    'Paste the Resend API key (starts with re_). It is saved only for your Google account.',
    ui.ButtonSet.OK_CANCEL
  )
  if (res.getSelectedButton() !== ui.Button.OK) return
  const key = res.getResponseText().trim()
  if (!/^re_/.test(key)) {
    ui.alert(
      'That does not look like a Resend API key (it should start with re_). Nothing was saved.'
    )
    return
  }
  PropertiesService.getUserProperties().setProperty('RESEND_API_KEY', key)
  ui.alert('Saved. You can now run previewSync.')
}

function previewSync() {
  return sync_(true)
}

function runSync() {
  return sync_(false)
}

function installDailyTrigger() {
  removeTriggers()
  ScriptApp.newTrigger('runSync').timeBased().everyDays(1).atHour(6).create()
  Logger.log('Daily trigger installed (runSync, around 6 AM script time zone).')
}

function removeTriggers() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'runSync')
    .forEach((t) => ScriptApp.deleteTrigger(t))
}

function nowMs_() {
  return Date.now()
}

function sync_(dryRun) {
  const started = nowMs_()
  const lock = LockService.getScriptLock()
  if (!lock.tryLock(30 * 1000))
    throw new Error('Another sync is still running.')
  const counts = {}
  try {
    const apiKey =
      PropertiesService.getUserProperties().getProperty('RESEND_API_KEY')
    if (!apiKey)
      throw new Error(
        'No Resend API key for your account yet. Run setResendApiKey first.'
      )
    const scriptProps = PropertiesService.getScriptProperties()
    const segmentId =
      scriptProps.getProperty('RESEND_SEGMENT_ID') || DEFAULT_SEGMENT_ID

    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.getSheetByName(ACTIVE_TAB)
    if (!sheet) throw new Error('No "' + ACTIVE_TAB + '" tab found.')
    const values = sheet.getDataRange().getValues()
    const header = values[0].map((h) => String(h).trim())
    REQUIRED_COLUMNS.forEach((name) => {
      if (header.indexOf(name) < 0)
        throw new Error('Active tab is missing the "' + name + '" column.')
    })
    // Columns the script will create (to the right of everything else).
    const missing = NEW_COLUMNS.filter((name) => header.indexOf(name) < 0)
    const fullHeader = header.concat(missing)
    const col = {}
    fullHeader.forEach((h, i) => {
      if (h && col[h] === undefined) col[h] = i
    })
    const rows = values.slice(1).map((r) => r.concat(missing.map(() => '')))

    const contacts = listSegmentContacts_(apiKey, segmentId)
    const plan = planSync_(rows, col, contacts)
    Object.assign(counts, plan.counts, {
      resend_contacts: contacts.length,
      resend_subscribed: contacts.filter((c) => !c.unsubscribed).length,
      sheet_rows_before: rows.length,
      columns_added: missing.length,
    })
    if (plan.dupRows.length) {
      Logger.log(
        'Rows matching more than one Resend record (clean these up in Resend):\n' +
          plan.dupRows.join('\n')
      )
    }

    // Fetch properties: new contacts first, then subscribed existing rows,
    // starting where the last incomplete run stopped.
    const deadline = started + TIME_BUDGET_MS
    const details = {}
    let fetched = 0
    plan.newContacts.forEach((c) => {
      details[c.id] = fetchContact_(apiKey, c.id)
      fetched++
    })
    const queue = plan.fieldRows // [{ i, contact }]
    const cursor = dryRun
      ? 0
      : Number(scriptProps.getProperty('FIELD_SYNC_CURSOR') || 0) %
        Math.max(queue.length, 1)
    let done = 0
    for (; done < queue.length; done++) {
      if (nowMs_() > deadline) break
      const item = queue[(cursor + done) % queue.length]
      details[item.contact.id] = fetchContact_(apiKey, item.contact.id)
      fetched++
    }
    counts.details_fetched = fetched
    counts.incomplete = done < queue.length
    if (counts.incomplete) {
      Logger.log(
        'Time budget reached: ' +
          (queue.length - done) +
          ' rows not refreshed this run; the next run continues from there.'
      )
    }

    const fieldPlan = planFields_(rows, col, queue, details)
    counts.field_cells_changed = fieldPlan.cellsChanged
    counts.rows_field_updated = Object.keys(fieldPlan.updates).length
    counts.dates_to_text = countDateCells_(rows, col)
    Logger.log('Field changes by column: ' + JSON.stringify(fieldPlan.byColumn))
    if (missing.length) {
      Logger.log(
        'New columns' +
          (dryRun ? ' that would be' : '') +
          ' created: ' +
          missing.join(', ') +
          ' (values to fill: ' +
          JSON.stringify(
            newColumnFillCounts_(
              fieldPlan.byColumn,
              missing,
              plan.newContacts,
              details
            )
          ) +
          ')'
      )
    }

    if (!dryRun) {
      const updates = mergeUpdates_(plan.updates, fieldPlan.updates)
      const now = stamp_(new Date())
      assertRowsUnchanged_(sheet, rows, col) // before ANY write
      if (missing.length) {
        sheet
          .getRange(1, header.length + 1, 1, missing.length)
          .setValues([missing])
      }
      if (counts.dates_to_text) normalizeDateCells_(sheet, rows, col)
      applyUpdates_(sheet, rows.length, col, updates, now)
      appendNewRows_(
        sheet,
        fullHeader.length,
        col,
        plan.newContacts,
        details,
        now
      )
      scriptProps.setProperty(
        'FIELD_SYNC_CURSOR',
        String(counts.incomplete ? (cursor + done) % queue.length : 0)
      )
    }
    writeLog_(ss, dryRun ? 'preview' : 'run', counts, '')
    Logger.log(
      (dryRun ? 'PREVIEW (no changes made): ' : 'DONE: ') +
        JSON.stringify(counts)
    )
    return counts
  } catch (err) {
    writeLog_(
      SpreadsheetApp.getActiveSpreadsheet(),
      dryRun ? 'preview' : 'run',
      counts,
      String(err)
    )
    throw err
  } finally {
    lock.releaseLock()
  }
}

/**
 * Pure planning step for membership and status. Matches by Resend id
 * (participant_id) first, then by email, case-insensitive. Several Resend
 * contacts can match one row (e.g. case-variant duplicates). If they disagree
 * (one subscribed, one unsubscribed) the row is left alone and reported.
 * Returns status updates, new contacts, and the subscribed rows whose fields
 * should be refreshed (fieldRows).
 */
function planSync_(rows, col, contacts) {
  const byId = {}
  const byEmail = {}
  rows.forEach((row, i) => {
    const id = String(row[col.participant_id]).trim()
    const email = String(row[col.email]).trim().toLowerCase()
    if (id) byId[id] = i
    if (email) byEmail[email] = i
  })

  const counts = {
    added: 0,
    marked_unsubscribed: 0,
    marked_resubscribed: 0,
    do_not_contact_set: 0,
    participant_id_filled: 0,
    in_sheet_not_in_resend: 0,
    duplicate_matches: 0,
    needs_review: 0,
  }
  const matches = {}
  const newContacts = []
  contacts.forEach((c) => {
    const email = String(c.email || '')
      .trim()
      .toLowerCase()
    let i = byId[c.id]
    if (i === undefined && email) i = byEmail[email]
    if (i === undefined) {
      // Only subscribed people join the sheet; unsubscribed ones are not panel members.
      if (!c.unsubscribed) {
        newContacts.push(c)
        counts.added++
      }
      return
    }
    ;(matches[i] = matches[i] || []).push(c)
  })

  const updates = {}
  const fieldRows = []
  const dupRows = []
  Object.keys(matches).forEach((key) => {
    const i = Number(key)
    const row = rows[i]
    const list = matches[i]
    const anyUnsub = list.some((c) => c.unsubscribed)
    const anySub = list.some((c) => !c.unsubscribed)
    const conflicting = anyUnsub && anySub
    if (conflicting) counts.needs_review++
    if (list.length > 1) {
      counts.duplicate_matches += list.length - 1
      // Row number and record details only; no names or emails in the log.
      dupRows.push(
        (conflicting
          ? 'NEEDS REVIEW (left unchanged) '
          : 'duplicate, same status ') +
          'sheet row ' +
          (i + 2) +
          ': ' +
          list
            .map(
              (c) =>
                (c.unsubscribed ? 'unsubscribed' : 'subscribed') +
                ' record created ' +
                String(c.created_at).slice(0, 10)
            )
            .join(', ')
      )
    }
    if (conflicting) return

    // The record this row follows: the one whose id is in participant_id, else the first.
    const sheetId = String(row[col.participant_id]).trim()
    const contact = list.find((c) => c.id === sheetId) || list[0]
    const change = {}
    if (!sheetId) {
      change.participant_id = contact.id
      counts.participant_id_filled++
    }
    const sheetUnsub = isTrue_(row[col.unsubscribed])
    if (anyUnsub && !sheetUnsub) {
      change.unsubscribed = true
      counts.marked_unsubscribed++
    } else if (!anyUnsub && sheetUnsub) {
      change.unsubscribed = false
      counts.marked_resubscribed++
    }
    if (anyUnsub && !isTrue_(row[col.do_not_contact])) {
      change.do_not_contact = true
      counts.do_not_contact_set++
    }
    if (Object.keys(change).length) updates[i] = change
    if (!anyUnsub) fieldRows.push({ i: i, contact: contact })
  })

  counts.in_sheet_not_in_resend = rows.filter((r, i) => {
    const hasIdentity =
      String(r[col.participant_id]).trim() || String(r[col.email]).trim()
    return hasIdentity && !matches[i]
  }).length

  return { counts, updates, newContacts, dupRows, fieldRows }
}

/** Property reader for one contact's details: returns '' for empty or "-". */
function propReader_(details) {
  return (key) => {
    const p = details && details.properties && details.properties[key]
    return clean_(p && typeof p === 'object' ? p.value : p)
  }
}

/**
 * Pure planning step for field values on existing subscribed rows: Resend's
 * value wins when it is non-empty and different; empty Resend values never
 * clear the sheet. Rows whose details weren't fetched are skipped.
 */
function planFields_(rows, col, fieldRows, details) {
  const updates = {}
  const byColumn = {}
  let cellsChanged = 0
  fieldRows.forEach((item) => {
    const d = details[item.contact.id]
    if (!d) return
    const p = propReader_(d)
    const contact = Object.assign({}, item.contact, d)
    const row = rows[item.i]
    FIELD_MAP.forEach((f) => {
      const want = f.value(contact, p)
      if (!want) return
      const cell = row[col[f.column]]
      const have =
        cell instanceof Date
          ? stamp_(cell)
          : String(cell === undefined || cell === null ? '' : cell).trim()
      if (have === want) return
      if (f.fillOnly && have) return // keep the existing value
      ;(updates[item.i] = updates[item.i] || {})[f.column] = want
      byColumn[f.column] = (byColumn[f.column] || 0) + 1
      cellsChanged++
    })
  })
  return { updates, byColumn, cellsChanged }
}

function newColumnFillCounts_(byColumn, missing, newContacts, details) {
  const out = {}
  missing.forEach((name) => {
    const f = FIELD_MAP.find((x) => x.column === name)
    const fromNew = newContacts.filter((c) =>
      f.value(Object.assign({}, c, details[c.id]), propReader_(details[c.id]))
    ).length
    out[name] = (byColumn[name] || 0) + fromNew
  })
  return out
}

function mergeUpdates_(a, b) {
  const out = {}
  ;[a, b].forEach((m) =>
    Object.keys(m).forEach((i) => {
      out[i] = Object.assign(out[i] || {}, m[i])
    })
  )
  return out
}

function isTrue_(value) {
  return value === true || String(value).trim().toUpperCase() === 'TRUE'
}

/**
 * Timestamps are written as UTC text "yyyy-MM-dd HH:mm:ss", the same form as the
 * existing (Mailchimp-imported) rows, so the column stays one type. That form
 * also sorts chronologically as text.
 */
function stamp_(value) {
  // Already in this form (e.g. Mailchimp's optin_time, which has no time zone):
  // keep as-is. Parsing it would read it as local time and shift it by hours.
  if (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value.trim())
  )
    return value.trim()
  const d = value instanceof Date ? value : new Date(value)
  return isNaN(d.getTime())
    ? String(value || '')
    : Utilities.formatDate(d, 'UTC', 'yyyy-MM-dd HH:mm:ss')
}

function countDateCells_(rows, col) {
  let n = 0
  rows.forEach((r) =>
    STAMP_COLUMNS.forEach((name) => {
      if (r[col[name]] instanceof Date) n++
    })
  )
  return n
}

/**
 * Fetching details can take minutes. If someone inserted, deleted, or sorted
 * rows meanwhile, row indexes no longer point at the same people, so stop
 * before writing anything.
 */
function assertRowsUnchanged_(sheet, rows, col) {
  const n = rows.length
  const now = n
    ? sheet.getRange(2, col.participant_id + 1, n, 1).getValues()
    : []
  const moved =
    sheet.getLastRow() - 1 !== n ||
    now.some(
      (r, i) =>
        String(r[0]).trim() !== String(rows[i][col.participant_id]).trim()
    )
  if (moved) {
    throw new Error(
      'Rows in the Active tab were added, removed, or reordered during the sync. Nothing was written; it will retry next run.'
    )
  }
}

/** Rewrites Date-typed cells in the timestamp columns as UTC text (see stamp_). */
function normalizeDateCells_(sheet, rows, col) {
  STAMP_COLUMNS.forEach((name) => {
    const c = col[name]
    if (!rows.some((r) => r[c] instanceof Date)) return
    const range = sheet.getRange(2, c + 1, rows.length, 1)
    const fresh = range
      .getValues()
      .map((r) => [r[0] instanceof Date ? stamp_(r[0]) : r[0]])
    range.setNumberFormat('@').setValues(fresh)
  })
}

/**
 * Writes only changed cells. Each touched column is re-read just before writing,
 * so edits a researcher made to other cells of that column meanwhile survive.
 */
function applyUpdates_(sheet, rowCount, col, updates, now) {
  const indexes = Object.keys(updates).map(Number)
  if (!indexes.length || !rowCount) return
  indexes.forEach((i) => (updates[i].last_updated = now))
  const columns = {}
  indexes.forEach((i) =>
    Object.keys(updates[i]).forEach((name) => (columns[name] = true))
  )
  Object.keys(columns).forEach((name) => {
    const range = sheet.getRange(2, col[name] + 1, rowCount, 1)
    const fresh = range.getValues()
    indexes.forEach((i) => {
      if (updates[i][name] !== undefined) fresh[i][0] = updates[i][name]
    })
    if (STAMP_COLUMNS.indexOf(name) >= 0) range.setNumberFormat('@')
    range.setValues(fresh)
  })
}

function appendNewRows_(sheet, width, col, newContacts, details, now) {
  if (!newContacts.length) return
  const out = newContacts.map((c) => {
    const d = details[c.id] || {}
    const p = propReader_(d)
    const contact = Object.assign({}, c, d)
    const row = new Array(width).fill('')
    FIELD_MAP.forEach((f) => {
      row[col[f.column]] = f.value(contact, p)
    })
    row[col.participant_id] = c.id
    row[col.opt_in_date] = stamp_(p('optin_time') || c.created_at)
    row[col.consent_status] = 'confirmed'
    row[col.unsubscribed] = false
    row[col.last_updated] = now
    return row
  })
  const start = sheet.getLastRow() + 1
  STAMP_COLUMNS.forEach((name) =>
    sheet.getRange(start, col[name] + 1, out.length, 1).setNumberFormat('@')
  )
  sheet.getRange(start, 1, out.length, width).setValues(out)
}

function listSegmentContacts_(apiKey, segmentId) {
  const all = []
  let after = ''
  for (let page = 0; page < 100; page++) {
    let url =
      RESEND_API +
      '/contacts?limit=100&segment_id=' +
      encodeURIComponent(segmentId)
    if (after) url += '&after=' + encodeURIComponent(after)
    const body = resendGet_(apiKey, url)
    const data = body.data || []
    all.push.apply(all, data)
    const more =
      body.has_more !== undefined ? body.has_more : data.length === 100
    if (!more || !data.length) return all
    after = data[data.length - 1].id
  }
  throw new Error('Stopped after 100 pages of contacts; check pagination.')
}

function fetchContact_(apiKey, id) {
  return resendGet_(apiKey, RESEND_API + '/contacts/' + encodeURIComponent(id))
}

/** GET with a small delay (Resend allows ~2 requests/second) and retry on 429. */
function resendGet_(apiKey, url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    Utilities.sleep(600)
    const res = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: { Authorization: 'Bearer ' + apiKey },
      muteHttpExceptions: true,
    })
    const code = res.getResponseCode()
    if (code === 429) {
      Utilities.sleep(2000 * (attempt + 1))
      continue
    }
    if (code !== 200) {
      throw new Error(
        'Resend API ' +
          code +
          ' for ' +
          url.split('?')[0] +
          ': ' +
          res.getContentText().slice(0, 200)
      )
    }
    return JSON.parse(res.getContentText())
  }
  throw new Error('Resend API kept rate-limiting; try again later.')
}

function writeLog_(ss, mode, counts, error) {
  let log = ss.getSheetByName(LOG_TAB)
  if (!log) {
    log = ss.insertSheet(LOG_TAB)
    log.appendRow(LOG_HEADER)
  }
  log.appendRow(
    LOG_HEADER.map((key) => {
      if (key === 'run_at') return stamp_(new Date())
      if (key === 'mode') return mode
      if (key === 'error') return error
      return counts[key] === undefined ? '' : counts[key]
    })
  )
}
