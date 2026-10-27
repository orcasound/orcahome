/**
 * Fill in missing blog authors from the old WordPress site (orcasound.net).
 *
 * backfill-authors.mjs found authors via author-name tags; posts that never had
 * such a tag (mostly 2010–2012) ended up with an empty `authors` list. WordPress
 * still records which account published each post, and the old site shows that
 * account as the byline, so this script copies it over.
 *
 * Only posts with NO authors are touched; posts that already have authors
 * (including co-authored ones, which WordPress can't represent) are left alone.
 *
 * WordPress blocks its /users endpoint, so user ids are mapped to our author
 * documents by hand. Verified 2026-10-12: id 2 is the account linked as
 * orcasound.net/author/scottveirs on these posts' pages. Unknown ids are
 * reported and skipped.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/backfill-authors-from-wordpress.mjs --with-user-token              # dry run
 *   npx sanity exec scripts/backfill-authors-from-wordpress.mjs --with-user-token -- --commit  # write
 */
import {getCliClient} from 'sanity/cli'

const WP_USER_TO_AUTHOR = {
  2: 'scottveirs',
}
const WP_API = 'https://www.orcasound.net/wp-json/wp/v2/posts'

const commit = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2023-01-01'})

async function wpAuthorsBySlug(slugs) {
  const out = {}
  for (let i = 0; i < slugs.length; i += 10) {
    const batch = slugs.slice(i, i + 10)
    const url = `${WP_API}?per_page=20&_fields=slug,author&slug=${batch.map(encodeURIComponent).join(',')}`
    const res = await fetch(url, {headers: {'User-Agent': 'orcahome-author-backfill'}})
    if (!res.ok) throw new Error(`WordPress API ${res.status} for ${url}`)
    for (const post of await res.json()) out[post.slug] = post.author
  }
  return out
}

async function run() {
  console.log(commit ? '── WRITING (--commit) ──' : '── DRY RUN (no writes) ──')
  const posts = await client.fetch(
    `*[_type == "blogPost" && !(_id in path("drafts.**")) && count(coalesce(authors, [])) == 0]
      | order(publishedAt asc){_id, _rev, "slug": slug.current, publishedAt}`,
  )
  console.log(`Posts with no author: ${posts.length}`)
  if (!posts.length) return

  const wp = await wpAuthorsBySlug(posts.map((p) => p.slug))
  const authorIds = new Set(await client.fetch(`*[_type == "author"]._id`))
  const tx = client.transaction()
  const perAuthor = {}
  const skipped = []

  for (const post of posts) {
    const wpUser = wp[post.slug]
    const authorSlug = WP_USER_TO_AUTHOR[wpUser]
    const authorId = authorSlug && `author-${authorSlug}`
    if (!authorId || !authorIds.has(authorId)) {
      skipped.push(`${post.slug} (WordPress user ${wpUser ?? 'not found'})`)
      continue
    }
    perAuthor[authorId] = (perAuthor[authorId] || 0) + 1
    console.log(`  ${String(post.publishedAt).slice(0, 10)}  ${post.slug} -> ${authorId}`)
    tx.patch(post._id, (p) =>
      p
        .ifRevisionId(post._rev)
        .setIfMissing({authors: []})
        .append('authors', [{_type: 'reference', _ref: authorId, _key: authorSlug}]),
    )
  }

  console.log(`\nWill set: ${JSON.stringify(perAuthor)}`)
  if (skipped.length) console.log(`Skipped (${skipped.length}):\n  ${skipped.join('\n  ')}`)
  const count = Object.values(perAuthor).reduce((a, b) => a + b, 0)
  if (!count) return console.log('\nNothing to change.')
  if (!commit) return console.log(`\n${count} post(s). Re-run with -- --commit to apply.`)
  await tx.commit()
  console.log(`\nUpdated ${count} post(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
