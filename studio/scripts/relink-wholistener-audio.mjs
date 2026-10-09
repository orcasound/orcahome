/**
 * Read-only audit by default. Run from studio with Node 24:
 *   npx sanity exec scripts/relink-wholistener-audio.mjs --with-user-token
 *   npx sanity exec scripts/relink-wholistener-audio.mjs --with-user-token -- --slug dawn-calls-clicks-at-lime-kiln
 * Add --commit to apply. Backups: /tmp/orcahome-audio-backups/<slug>-<timestamp>.json
 * Only published bodies are patched, with revision guards. Active drafts and
 * posts with any failed HEAD check are skipped and reported with a nonzero exit.
 */
/* global fetch, AbortSignal */
import console from 'node:console'
import {mkdir, writeFile} from 'node:fs/promises'
import process from 'node:process'
import {parseArgs} from 'node:util'
import {getCliClient} from 'sanity/cli'
import {rewriteWholistenerBody} from './wholistener-audio-utils.mjs'

const BACKUP_DIR = '/tmp/orcahome-audio-backups'
const CONCURRENCY = 8

async function headCheck(url) {
  let result
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'manual',
        signal: AbortSignal.timeout(20000),
      })
      result = {status: response.status, ok: response.status === 200}
      if (response.status < 500 && response.status !== 429) return result
    } catch (error) {
      result = {ok: false, error: error.message}
    }
  }
  return result
}

async function main() {
  const {values} = parseArgs({
    options: {commit: {type: 'boolean', default: false}, slug: {type: 'string'}},
  })
  if (values.slug !== undefined && (!values.slug.trim() || values.slug.startsWith('--'))) {
    throw new Error('--slug requires a post slug')
  }
  const client = getCliClient({apiVersion: '2023-01-01'}).withConfig({
    useCdn: false,
    perspective: 'raw',
  })
  const {projectId, dataset} = client.config()
  if (projectId !== 'tncpl9l7' || dataset !== 'production')
    throw new Error('Expected tncpl9l7/production')
  const [posts, draftIds] = await Promise.all([
    client.fetch(
      `*[_type == "blogPost" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))${values.slug ? ' && slug.current == $slug' : ''}]|order(slug.current){_id, _rev, "slug": slug.current, body}`,
      {slug: values.slug || null},
    ),
    client.fetch('*[_type == "blogPost" && _id in path("drafts.**")]._id'),
  ])
  if (values.slug && posts.length === 0) throw new Error(`No published post found: ${values.slug}`)
  const drafts = new Set(draftIds)
  const plans = posts
    .map((post) => ({post, ...rewriteWholistenerBody(post.body)}))
    .filter((plan) => plan.changes.length)
  const urls = [...new Set(plans.flatMap((plan) => plan.changes.map((change) => change.newUrl)))]
  const occurrences = plans.reduce((sum, plan) => sum + plan.changes.length, 0)
  const hrefs = plans.reduce(
    (sum, plan) => sum + plan.changes.filter((change) => /\.href$/.test(change.path)).length,
    0,
  )
  console.log(
    `${values.commit ? 'COMMIT' : 'DRY RUN'}: scanned ${posts.length} published post(s); ${plans.length} affected post(s), ${occurrences} URL occurrence(s), ${hrefs} href link(s), ${urls.length} unique target(s).`,
  )
  for (const {post, changes} of plans) {
    console.log(
      `\n${post.slug || post._id}: ${changes.length} URL occurrence(s)${drafts.has(`drafts.${post._id}`) ? ' — SKIP: unpublished draft exists' : ''}`,
    )
    for (const {path, oldUrl, newUrl} of changes) console.log(`  ${path}: ${oldUrl} → ${newUrl}`)
  }

  const checks = new Map()
  let index = 0
  let checked = 0
  console.log(`\nHEAD-checking ${urls.length} unique target(s), concurrency ${CONCURRENCY}...`)
  await Promise.all(
    Array.from({length: Math.min(CONCURRENCY, urls.length)}, async () => {
      while (index < urls.length) {
        const url = urls[index++]
        const result = await headCheck(url)
        checks.set(url, result)
        checked++
        if (!result.ok) console.error(`HEAD FAILED ${result.status || result.error}: ${url}`)
        if (checked % 50 === 0 || checked === urls.length)
          console.log(`HEAD progress ${checked}/${urls.length}`)
      }
    }),
  )
  const failed = [...checks.values()].filter((result) => !result.ok).length
  console.log(`HEAD results: ${checks.size - failed} HTTP 200; ${failed} failed.`)

  let eligible = 0
  let patched = 0
  let skipped = 0
  for (const {post, body, changes} of plans) {
    if (drafts.has(`drafts.${post._id}`)) {
      console.error(`SKIP ${post.slug}: unpublished draft exists`)
      skipped++
      continue
    }
    if (changes.some((change) => !checks.get(change.newUrl)?.ok)) {
      console.error(`SKIP ${post.slug}: at least one new URL failed HEAD`)
      skipped++
      continue
    }
    eligible++
    if (!values.commit) continue
    try {
      // Recheck after the network audit, in case an editor started a draft.
      const draft = await client.fetch('count(*[_id == $draftId])', {draftId: `drafts.${post._id}`})
      if (draft) throw new Error('unpublished draft appeared during audit')
      await mkdir(BACKUP_DIR, {recursive: true, mode: 0o700})
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = `${BACKUP_DIR}/${encodeURIComponent(post.slug || post._id)}-${timestamp}.json`
      await writeFile(
        backupPath,
        `${JSON.stringify({_id: post._id, _rev: post._rev, slug: post.slug, backedUpAt: new Date().toISOString(), body: post.body}, null, 2)}\n`,
        {mode: 0o600, flag: 'wx'},
      )
      console.log(`Backup: ${backupPath}`)
      await client.patch(post._id).ifRevisionId(post._rev).set({body}).commit()
      patched++
      console.log(`PATCHED ${post.slug}: ${changes.length} URL occurrence(s)`)
    } catch (error) {
      console.error(`SKIP ${post.slug}: ${error.message}`)
      skipped++
    }
  }
  console.log(
    `\nSUMMARY: ${plans.length} affected post(s), ${occurrences} URL occurrence(s), ${hrefs} href link(s), ${urls.length} unique target(s); HEAD ${checks.size - failed} passed / ${failed} failed; ${eligible} eligible post(s), ${patched} patched, ${skipped} skipped.`,
  )
  if (!values.commit)
    console.log(
      'DRY RUN COMPLETE: no Sanity writes and no backups created. Pass --commit to apply.',
    )
  if (failed || skipped) process.exitCode = 1
}

main().catch((error) => {
  // Authenticated transport errors may include request headers; print only the message.
  console.error(error.message)
  process.exitCode = 1
})
