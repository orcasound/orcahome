/**
 * Clean Zotpress citation junk from migrated blog posts (issue #428).
 * Some posts imported the WordPress Zotpress plugin's raw data blob as body
 * text. Each affected block is "<junk JSON> <readable citation>"; we keep only
 * the readable citation (everything after the last "%7D" of the URL-encoded
 * JSON) and drop the junk. A block that is pure junk with no citation left is
 * removed entirely. Targets only blocks containing "plugins/zotpress".
 * One-off, idempotent; already run against production.
 *
 *   npx sanity exec scripts/clean-zotpress.mjs --with-user-token           # dry
 *   npx sanity exec scripts/clean-zotpress.mjs --with-user-token -- --commit
 */
import {randomBytes} from 'crypto'
import {getCliClient} from 'sanity/cli'

const commit = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2023-01-01'})
const key = () => randomBytes(6).toString('hex')

const posts = await client.fetch(
  `*[_type=="blogPost" && pt::text(body) match "*plugins/zotpress*"]{_id, title, body}`
)
console.log(commit ? '── WRITING ──' : '── DRY RUN ──', `\n${posts.length} posts\n`)

for (const p of posts) {
  let touched = 0
  const newBody = (p.body || []).flatMap((b) => {
    if (b._type !== 'block') return [b]
    const text = (b.children || []).map((c) => c.text || '').join('')
    if (!/plugins\/zotpress/.test(text)) return [b]
    const idx = text.lastIndexOf('%7D')
    const clean = idx >= 0 ? text.slice(idx + 3).trim() : ''
    touched += 1
    if (!clean || /zotpress|chicago-author-date|%22/.test(clean)) return []
    return [{...b, markDefs: [], children: [{_type: 'span', _key: key(), text: clean, marks: []}]}]
  })
  if (commit && touched) {
    await client.patch(p._id).set({body: newBody}).commit()
  }
}
console.log(`\n${commit ? 'Done.' : 'Dry run — add -- --commit to apply.'}`)
