/**
 * Backfill blog authors (issue #410).
 *
 * The WordPress import dropped author names into each post's `tags` array
 * (scottveirs, valveirs, …) alongside real topic tags. This script:
 *   1. creates one `author` document per person (with a proper display name),
 *   2. sets each post's `authors` reference list from the author-name tags it
 *      carries (posts can have several — some are co-authored), and
 *   3. removes those author-name tags from `tags`, leaving only topics.
 *
 * Safe to re-run: once a post's author-name tags are removed it is skipped.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/backfill-authors.mjs --with-user-token          # dry run (default)
 *   npx sanity exec scripts/backfill-authors.mjs --with-user-token -- --commit   # write
 */
import {getCliClient} from 'sanity/cli'

// WordPress author-tag slug -> display name. 16 confirmed against the Hacker
// Hall of Fame list + post bylines; 2 pending Brendan's confirmation (see #410)
// but wired now — their display name is just a doc edit away once confirmed:
//   - diegoroderiguez: Roderiguez vs Rodriguez spelling
//   - lagoyena: surname unknown (posts signed "–Laurel")
const AUTHORS = {
  scottveirs: 'Scott Veirs',
  valveirs: 'Val Veirs',
  isabelamacchiavellit: 'Isabella Macchiavello',
  dhananjaypurohit: 'Dhananjay Purohit',
  dmitryvolodin: 'Dmitry Volodin',
  josegiraldo: 'Jose Giraldo',
  kunalmehta: 'Kunal Mehta',
  ambra: 'Ambra Jin',
  devdoot: 'Devdoot Chatterjee',
  benjamin: 'Benjamin Chew',
  karan: 'Karan Mishra',
  brendan: 'Brendan Thatcher',
  laurabogaard: 'Laura Bogaard',
  nataliemastick: 'Natalie Mastick',
  robwilliams: 'Rob Williams',
  erinashe: 'Erin Ashe',
  diegoroderiguez: 'Diego Roderiguez', // pending #410
  lagoyena: 'Laurel', // pending #410 (surname)
}

const AUTHOR_SLUGS = new Set(Object.keys(AUTHORS))
const docId = (slug) => `author-${slug}`
const commit = process.argv.includes('--commit')

const client = getCliClient({apiVersion: '2023-01-01'})

async function run() {
  console.log(commit ? '── WRITING (--commit) ──' : '── DRY RUN (no writes) ──')

  // 1. Author documents.
  console.log(`\nAuthors (${AUTHOR_SLUGS.size}):`)
  for (const [slug, name] of Object.entries(AUTHORS)) {
    console.log(`  ${docId(slug).padEnd(28)} ${name}`)
    if (commit) {
      await client.createIfNotExists({
        _id: docId(slug),
        _type: 'author',
        name,
        slug: {_type: 'slug', current: slug},
      })
    }
  }

  // 2 + 3. Walk every post; move author-name tags into `authors`.
  const posts = await client.fetch(
    `*[_type == "blogPost"]{_id, title, tags, "authorRefs": authors[]._ref}`
  )
  let changed = 0
  console.log(`\nPosts scanned: ${posts.length}`)
  for (const post of posts) {
    const tags = Array.isArray(post.tags) ? post.tags : []
    const found = tags.filter((t) => AUTHOR_SLUGS.has(t))
    if (found.length === 0) continue // nothing to move (or already done)

    const newTags = tags.filter((t) => !AUTHOR_SLUGS.has(t))
    const authorRefs = found.map((slug) => ({
      _type: 'reference',
      _ref: docId(slug),
      _key: slug,
    }))
    changed += 1
    console.log(
      `  • ${(post.title || post._id).slice(0, 55)}\n` +
        `      authors: ${found.map((s) => AUTHORS[s]).join(', ')}\n` +
        `      tags:    ${tags.length} -> ${newTags.length}`
    )
    if (commit) {
      await client
        .patch(post._id)
        .set({authors: authorRefs, tags: newTags})
        .commit()
    }
  }

  console.log(`\n${commit ? 'Updated' : 'Would update'} ${changed} posts.`)
  if (!commit) console.log('Re-run with `-- --commit` to apply.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
