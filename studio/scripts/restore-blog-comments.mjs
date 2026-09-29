/**
 * Restore the WordPress comment threads dropped by the migration (#428) as a
 * read-only archive on each post's `comments` field. Run from studio, Node 24:
 *   npx sanity exec scripts/restore-blog-comments.mjs --with-user-token -- --reuse-sources
 *   npx sanity exec scripts/restore-blog-comments.mjs --with-user-token -- --reuse-sources --commit
 *
 * Read-only unless --commit. Reuses the WordPress snapshots downloaded by the
 * audio restore (/tmp/orcahome-blog-audio-sources). Idempotent: a post is only
 * patched when its parsed comments differ from what is stored, and patches are
 * revision-guarded and committed in a single transaction.
 */
/* global fetch, AbortSignal */
import console from 'node:console'
import {readFile, writeFile} from 'node:fs/promises'
import process from 'node:process'

import {getCliClient} from 'sanity/cli'

import {digest, sourceComments} from './blog-comment-utils.mjs'

const args = process.argv.slice(2)
const commit = args.includes('--commit')
const reuse = args.includes('--reuse-sources')
const sourceDir = '/tmp/orcahome-blog-audio-sources'

const client = getCliClient({apiVersion: '2023-01-01'}).withConfig({
  useCdn: false,
  perspective: 'raw',
})
const config = client.config()
if (config.projectId !== 'tncpl9l7' || config.dataset !== 'production') {
  throw new Error('Expected tncpl9l7/production')
}
const query = '*[_type == "blogPost"]{_id, _rev, title, "slug": slug.current, comments}'

async function request(url) {
  let error
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {signal: AbortSignal.timeout(30000)})
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`)
      return response
    } catch (err) {
      error = err
    }
  }
  throw error
}

async function run() {
  const all = await client.fetch(query)
  const byId = new Map(all.map((post) => [post._id, post]))
  const posts = all.filter((post) => !post._id.startsWith('drafts.'))
  let tx = client.transaction()
  let pending = 0
  let totalComments = 0
  const planned = []
  for (const post of posts) {
    if (!post.slug) continue
    if (byId.has(`drafts.${post._id}`)) continue
    let html
    try {
      if (reuse) html = await readFile(`${sourceDir}/${encodeURIComponent(post.slug)}.html`, 'utf8')
      else html = await (await request(`https://www.orcasound.net/blog/${encodeURIComponent(post.slug)}/`)).text()
    } catch {
      continue
    }
    const comments = sourceComments(html)
    if (!comments.length) continue
    // Idempotent: skip when the stored archive already matches.
    if (digest(post.comments || []) === digest(comments)) continue
    planned.push({slug: post.slug, count: comments.length})
    totalComments += comments.length
    pending++
    tx = tx.patch(post._id, (patch) =>
      patch.ifRevisionId(post._rev).set({comments}),
    )
  }
  planned.sort((a, b) => b.count - a.count)
  for (const p of planned)
    console.log(`${commit ? 'Apply' : 'Dry run'}: ${p.slug}: ${p.count} comments`)
  console.log(`\n${pending} posts, ${totalComments} comments total.`)
  if (commit && pending) {
    const result = await tx.commit()
    console.log(`Committed in transaction ${result.transactionId}`)
    const after = await client.fetch(query)
    for (const p of planned) {
      const saved = after.find((post) => post.slug === p.slug)
      if (!saved || (saved.comments || []).length !== p.count)
        throw new Error(`Verification failed: ${p.slug}`)
    }
    console.log('Verified all restored comment archives.')
    if (args.includes('--report'))
      await writeFile('/tmp/orcahome-blog-comments.json', JSON.stringify(planned, null, 2))
  } else if (!commit) {
    console.log('Re-run with --commit to write.')
  }
}

try {
  await run()
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
