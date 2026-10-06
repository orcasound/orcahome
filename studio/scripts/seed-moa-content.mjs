/**
 * Seed the MOA singleton (issue #451) from the website's bundled fallback,
 * `src/data/moaContent.json`.
 *
 * Uses createIfNotExists, so it never overwrites a document an editor has
 * already changed. Logos are not copied; upload them in the Studio.
 *
 * Run by a Sanity admin after the schema is deployed.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/seed-moa-content.mjs --with-user-token          # dry run (default)
 *   npx sanity exec scripts/seed-moa-content.mjs --with-user-token -- --commit   # write
 */
import fs from 'node:fs'

import {getCliClient} from 'sanity/cli'

import {buildMoaDocument} from './moa-seed-utils.mjs'

const commit = process.argv.includes('--commit')

async function run() {
  const json = JSON.parse(
    fs.readFileSync(new URL('../../src/data/moaContent.json', import.meta.url), 'utf8'),
  )
  const doc = buildMoaDocument(json)

  if (!commit) {
    console.log('── DRY RUN (no writes) ──')
    console.log(JSON.stringify(doc, null, 2))
    console.log('\nRe-run with `-- --commit` to create the document if it does not exist.')
    return
  }

  console.log('── WRITING (--commit) ──')
  const client = getCliClient({apiVersion: '2023-01-01'})
  const result = await client.createIfNotExists(doc)
  console.log(`moaContent document ready (rev ${result._rev}).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
