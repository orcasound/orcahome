/**
 * Audit WordPress players lost by the original htmlToBlocks migration (#428).
 * Run from studio, using Node 24:
 *   npx sanity exec scripts/restore-blog-audio.mjs --with-user-token -- --report /tmp/blog-audio.json
 *   npx sanity exec scripts/restore-blog-audio.mjs --with-user-token -- --apply /tmp/blog-audio.json
 *   npx sanity exec scripts/restore-blog-audio.mjs --with-user-token -- --apply /tmp/blog-audio.json --commit
 *
 * Audit is read-only. The JSON report includes source evidence, the original
 * bodies/revisions, and proposed bodies. Apply refuses incomplete audits,
 * drafts, changed documents, unverified media, and unanchored insertions.
 * All patches are revision-guarded and committed in a single transaction.
 * Keep the report as a rollback record; do not commit production snapshots.
 */
/* global fetch, AbortSignal */
import console from 'node:console'
import {mkdir, readFile, writeFile} from 'node:fs/promises'
import process from 'node:process'
import {URL} from 'node:url'

import {getCliClient} from 'sanity/cli'
import {digest, bodyClips, sourceClips, insertionAnchor, audioBlock} from './blog-audio-utils.mjs'

const args = process.argv.slice(2)
const option = (name) => {
  const index = args.indexOf(name)
  if (index === -1) return null
  if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${name} needs a path`)
  return args[index + 1]
}
const client = getCliClient({apiVersion: '2023-01-01'}).withConfig({
  useCdn: false,
  perspective: 'raw',
})
const config = client.config()
if (config.projectId !== 'tncpl9l7' || config.dataset !== 'production') {
  throw new Error('Expected tncpl9l7/production')
}
const query = '*[_type == "blogPost"]{_id, _rev, title, "slug": slug.current, body}'
async function request(url, options = {}) {
  let error
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {...options, signal: AbortSignal.timeout(30000)})
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`)
      return response
    } catch (err) {
      error = err
    }
  }
  throw error
}

async function apply(path) {
  const report = JSON.parse(await readFile(path, 'utf8'))
  if (
    report.version !== 1 ||
    report.projectId !== config.projectId ||
    report.dataset !== config.dataset ||
    report.errors.length
  ) {
    throw new Error('Report is incompatible or has audit errors')
  }
  const current = await client.fetch(query)
  const byId = new Map(current.map((post) => [post._id, post]))
  const changes = report.posts.filter((post) => post.missing.length)
  let tx = client.transaction()
  let pending = 0
  for (const post of changes) {
    const actual = byId.get(post._id)
    if (!actual || byId.has(`drafts.${post._id}`))
      throw new Error(`Missing post or active draft: ${post.slug}`)
    if (digest(actual.body) === digest(post.proposedBody)) {
      console.log(`Already applied: ${post.slug}`)
      continue
    }
    if (actual._rev !== post._rev || digest(actual.body) !== digest(post.body))
      throw new Error(`Post changed since audit: ${post.slug}`)
    if (post.missing.some((clip) => !clip.anchor || !clip.media?.ok))
      throw new Error(`Unresolved insertion or media: ${post.slug}`)
    const remaining = post.missing.filter(
      (clip) => !clip.ids.some((id) => bodyClips(post.proposedBody).has(id)),
    )
    if (remaining.length) throw new Error(`Invalid proposed body: ${post.slug}`)
    tx = tx.patch(post._id, (patch) => patch.ifRevisionId(post._rev).set({body: post.proposedBody}))
    pending++
    console.log(
      `${args.includes('--commit') ? 'Apply' : 'Dry run'}: ${post.slug}: +${post.missing.length} recordings`,
    )
  }
  if (args.includes('--commit') && pending) {
    const result = await tx.commit()
    console.log(`Committed ${pending} posts in transaction ${result.transactionId}`)
    const after = await client.fetch(query)
    for (const post of changes) {
      const saved = after.find((item) => item._id === post._id)
      if (!saved || digest(saved.body) !== digest(post.proposedBody))
        throw new Error(`Verification failed: ${post.slug}`)
    }
    console.log('Verified all restored bodies against the report.')
  } else {
    console.log(`${pending} pending posts; no writes.`)
  }
}

async function audit(path) {
  const sourceDir = '/tmp/orcahome-blog-audio-sources'
  await mkdir(sourceDir, {recursive: true, mode: 0o700})
  const all = await client.fetch(query)
  const drafts = new Set(
    all.filter((post) => post._id.startsWith('drafts.')).map((post) => post._id.slice(7)),
  )
  const posts = all.filter((post) => !post._id.startsWith('drafts.'))
  const report = {
    version: 1,
    projectId: config.projectId,
    dataset: config.dataset,
    auditedAt: new Date().toISOString(),
    errors: [],
    posts: [],
  }
  let index = 0
  await Promise.all(
    Array.from({length: 4}, async () => {
      while (index < posts.length) {
        const post = posts[index++]
        try {
          if (!post.slug) throw new Error('Missing slug')
          const url = `https://www.orcasound.net/blog/${encodeURIComponent(post.slug)}/`
          const sourcePath = `${sourceDir}/${encodeURIComponent(post.slug)}.html`
          let html
          if (args.includes('--reuse-sources')) html = await readFile(sourcePath, 'utf8')
          else {
            const response = await request(url)
            // WordPress redirects /blog/<slug>/ to its dated permalink.
            const resolved = new URL(response.url)
            if (
              resolved.hostname !== 'www.orcasound.net' ||
              decodeURIComponent(resolved.pathname.split('/').filter(Boolean).at(-1)) !== post.slug
            )
              throw new Error(`Unexpected redirect to ${response.url}`)
            html = await response.text()
            await writeFile(sourcePath, html, {mode: 0o600})
          }
          const clips = sourceClips(html, url)
          const existing = bodyClips(post.body)
          const missing = clips.filter((clip) => !clip.ids.some((id) => existing.has(id)))
          const body = post.body || []
          const tails = new Map()
          const proposedBody = [...body]
          for (const clip of missing) {
            clip.anchor = insertionAnchor(body, clip)
            clip.mediaChecks = []
            const sources = [
              ...new Set(
                clip.urls.map((href) => {
                  const source = new URL(href)
                  // WP adds a cache-buster to player URLs; it is not an asset ID.
                  source.searchParams.delete('_')
                  if (['orcasound.net', 'www.orcasound.net'].includes(source.hostname))
                    source.protocol = 'https:'
                  return source.href
                }),
              ),
            ].sort((a, b) => Number(!/\.mp3$/i.test(a)) - Number(!/\.mp3$/i.test(b)))
            for (const href of sources) {
              try {
                const media = await request(href, {headers: {Range: 'bytes=0-0'}})
                clip.media = {
                  ok: /^audio\//i.test(media.headers.get('content-type') || ''),
                  status: media.status,
                  type: media.headers.get('content-type'),
                  url: href,
                }
                await media.body?.cancel()
              } catch (err) {
                clip.media = {ok: false, error: err.message, url: href}
              }
              clip.mediaChecks.push(clip.media)
              if (clip.media.ok) break
            }
            if (clip.anchor && clip.media?.ok) {
              const block = audioBlock(clip)
              const after = tails.get(clip.anchor) || clip.anchor
              proposedBody.splice(
                proposedBody.findIndex((item) => item._key === after) + 1,
                0,
                block,
              )
              tails.set(clip.anchor, block._key)
            }
          }
          report.posts.push({
            ...post,
            sourceUrl: url,
            wpClips: clips,
            sanityClips: [...existing],
            missing,
            proposedBody,
            hasDraft: drafts.has(post._id),
          })
          if (missing.length)
            console.log(
              `${post.slug}: WP ${clips.length} / Sanity ${existing.size}; missing ${missing.map((clip) => clip.id).join(', ')}`,
            )
        } catch (err) {
          report.errors.push({slug: post.slug, error: err.message})
          console.error(`${post.slug}: ${err.message}`)
        }
        if (report.posts.length % 25 === 0)
          console.log(`Audited ${report.posts.length}/${posts.length}`)
      }
    }),
  )
  report.posts.sort((a, b) => a.slug.localeCompare(b.slug))
  await writeFile(path, `${JSON.stringify(report, null, 2)}\n`, {mode: 0o600})
  console.log(
    `Report: ${path}; audited ${report.posts.length}/${posts.length}; ${report.errors.length} errors; ${report.posts.filter((post) => post.missing.length).length} posts missing audio`,
  )
  if (report.errors.length) process.exitCode = 1
}

try {
  const applyPath = option('--apply')
  if (applyPath) await apply(applyPath)
  else {
    if (args.includes('--commit')) throw new Error('--commit requires an audited --apply report')
    await audit(option('--report') || '/tmp/orcahome-blog-audio-audit.json')
  }
} catch (error) {
  // Sanity transport errors include authenticated request headers. Never dump
  // the error object or let it become an unhandled rejection.
  console.error(error.message)
  process.exitCode = 1
}
