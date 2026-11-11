/**
 * Correct two blog author names and one Hacker Hall of Fame name (issue #410).
 *
 * Brendan confirmed (2026-09-30):
 *   - diegoroderiguez -> "Diego Rodriguez" (the WordPress slug is misspelled;
 *     the Hall of Fame spelling should match)
 *   - lagoyena -> "Laurel Yruretagoyena"
 *
 * Only display names change. Author slugs (and so /blog/author/<slug> URLs)
 * stay as they are.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/fix-author-names-410.mjs --with-user-token              # dry run
 *   npx sanity exec scripts/fix-author-names-410.mjs --with-user-token -- --commit  # write
 */
import {getCliClient} from 'sanity/cli'

const AUTHOR_NAMES = {
  'author-diegoroderiguez': {from: 'Diego Roderiguez', to: 'Diego Rodriguez'},
  'author-lagoyena': {from: 'Laurel', to: 'Laurel Yruretagoyena'},
}
const HHOF_ID = 'hackerHallOfFamePage'
const HHOF_NAME = {from: 'Diego Roderiguez', to: 'Diego Rodriguez'}

const commit = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2023-01-01'})

async function run() {
  console.log(commit ? '── WRITING (--commit) ──' : '── DRY RUN (no writes) ──')
  const tx = client.transaction()
  let changes = 0

  for (const [id, {from, to}] of Object.entries(AUTHOR_NAMES)) {
    const doc = await client.getDocument(id)
    if (!doc) {
      console.log(`  ${id}: NOT FOUND, skipped`)
      continue
    }
    if (doc.name === to) {
      console.log(`  ${id}: already "${to}"`)
      continue
    }
    if (doc.name !== from) {
      console.log(`  ${id}: unexpected name "${doc.name}", skipped`)
      continue
    }
    console.log(`  ${id}: "${from}" -> "${to}"`)
    tx.patch(id, (p) => p.ifRevisionId(doc._rev).set({name: to}))
    changes++
  }

  // Hall of Fame contributors live in several lists (flat and grouped) inside
  // the page singleton, so walk the whole document for keyed items.
  const page = await client.getDocument(HHOF_ID)
  const paths = []
  const walk = (value, path) => {
    if (Array.isArray(value)) {
      value.forEach((item) => walk(item, item?._key ? `${path}[_key=="${item._key}"]` : null))
    } else if (value && typeof value === 'object' && path) {
      if (value.name === HHOF_NAME.from) paths.push(`${path}.name`)
      for (const [k, v] of Object.entries(value)) if (Array.isArray(v)) walk(v, `${path}.${k}`)
    }
  }
  for (const [k, v] of Object.entries(page ?? {})) if (Array.isArray(v)) walk(v, k)
  for (const path of paths) console.log(`  ${HHOF_ID} ${path}: "${HHOF_NAME.from}" -> "${HHOF_NAME.to}"`)
  if (paths.length) {
    tx.patch(HHOF_ID, (p) =>
      p.ifRevisionId(page._rev).set(Object.fromEntries(paths.map((path) => [path, HHOF_NAME.to]))),
    )
    changes += paths.length
  } else {
    console.log(`  ${HHOF_ID}: no "${HHOF_NAME.from}" found`)
  }

  // A leftover draft would bring the old name back if someone publishes it,
  // so fix it the same way (same _keys as the published document).
  const draft = await client.getDocument(`drafts.${HHOF_ID}`)
  if (draft && paths.length) {
    console.log(`  drafts.${HHOF_ID}: same ${paths.length} path(s)`)
    tx.patch(`drafts.${HHOF_ID}`, (p) =>
      p.ifRevisionId(draft._rev).set(Object.fromEntries(paths.map((path) => [path, HHOF_NAME.to]))),
    )
    changes += paths.length
  }

  if (!changes) return console.log('\nNothing to change.')
  if (!commit) return console.log(`\n${changes} change(s). Re-run with -- --commit to apply.`)
  await tx.commit()
  console.log(`\nApplied ${changes} change(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
