/**
 * Repoint links on the Donate and Hacker Hall of Fame pages from the old
 * WordPress site (orcasound.net) to the same pages on this site.
 *
 * Only exact matches in OLD_TO_NEW are changed. Drafts are updated too, so an
 * open draft does not bring an old link back when it is published.
 *
 * Run after the donatePage schema change (relative button link) is deployed.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/repoint-old-site-links.mjs --with-user-token              # dry run
 *   npx sanity exec scripts/repoint-old-site-links.mjs --with-user-token -- --commit  # write
 */
import {getCliClient} from 'sanity/cli'

const OLD_TO_NEW = {
  'https://www.orcasound.net/hacker-hall-of-fame/': '/hacker-hall-of-fame',
  'https://www.orcasound.net/join/': '/getinvolved',
  'https://www.orcasound.net/portfolio/orcasound-app/': '/projects/orcasound-app',
  'https://www.orcasound.net/2018/04/27/orcasounds-new-live-audio-solution-from-hydrophone-to-headphone-with-a-raspberry-pi-computer-and-hls-dash-streaming-software/':
    '/blog/orcasounds-new-live-audio-solution-from-hydrophone-to-headphone-with-a-raspberry-pi-computer-and-hls-dash-streaming-software',
}
const DOC_IDS = ['donatePage', 'hackerHallOfFamePage']

const commit = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2023-01-01'})

// Collect {path, from, to} for every string value that is an old link.
function findLinks(value, path, found) {
  if (typeof value === 'string') {
    if (OLD_TO_NEW[value]) found.push({path, from: value, to: OLD_TO_NEW[value]})
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const segment =
        item && typeof item === 'object' && item._key ? `[_key=="${item._key}"]` : `[${i}]`
      findLinks(item, `${path}${segment}`, found)
    })
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      findLinks(child, path ? `${path}.${key}` : key, found)
    }
  }
}

async function run() {
  console.log(commit ? '── WRITING (--commit) ──' : '── DRY RUN (no writes) ──')
  const ids = DOC_IDS.flatMap((id) => [id, `drafts.${id}`])
  const docs = (await client.getDocuments(ids)).filter(Boolean)
  const tx = client.transaction()
  let changes = 0

  for (const doc of docs) {
    const found = []
    findLinks(doc, '', found)
    if (found.length === 0) {
      console.log(`  ${doc._id}: no old links`)
      continue
    }
    const set = {}
    for (const {path, from, to} of found) {
      console.log(`  ${doc._id} ${path}\n    ${from}\n    → ${to}`)
      set[path] = to
    }
    tx.patch(doc._id, (p) => p.set(set))
    changes += found.length
  }

  console.log(`\n${changes} link(s) to change.`)
  if (commit && changes > 0) {
    await tx.commit()
    console.log('Committed.')
  } else if (changes > 0) {
    console.log('Dry run only. Add -- --commit to write.')
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
