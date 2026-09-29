/**
 * Replace blog body images that were migrated as WordPress's resized copies
 * (e.g. `ottawa-track-regional-300x165.png`) with the full-size originals (#449).
 * Run from studio:
 *   npx sanity exec scripts/replace-wp-resized-images.mjs --with-user-token -- --slug <slug>
 *   npx sanity exec scripts/replace-wp-resized-images.mjs --with-user-token -- --slug <slug> --commit
 *   npx sanity exec scripts/replace-wp-resized-images.mjs --with-user-token -- --all [--commit]
 *
 * Without --commit this is a dry run: it finds each resized copy, locates the
 * original on orcasound.net (the post's WordPress <img src> without the -WxH
 * suffix), and checks it downloads. With --commit it backs up each post, uploads
 * the originals, verifies they're larger than the copies, and repoints the image
 * blocks in one revision-guarded patch per post. Posts with an active draft are
 * skipped. Detection-clip thumbnails (#442) aren't resized copies and are untouched.
 */
/* global fetch, AbortSignal */
import console from 'node:console'
import {Buffer} from 'node:buffer'
import {mkdir, writeFile} from 'node:fs/promises'
import process from 'node:process'

import {getCliClient} from 'sanity/cli'

const args = process.argv.slice(2)
const commit = args.includes('--commit')
const slugs = args.flatMap((arg, i) => (arg === '--slug' && args[i + 1] ? [args[i + 1]] : []))
if (!slugs.length && !args.includes('--all')) throw new Error('Pass --slug <slug> or --all')

const client = getCliClient({apiVersion: '2023-01-01'}).withConfig({
  useCdn: false,
  perspective: 'raw',
})
const config = client.config()
if (config.projectId !== 'tncpl9l7' || config.dataset !== 'production') {
  throw new Error('Expected tncpl9l7/production')
}

const WP_API = 'https://www.orcasound.net/wp-json/wp/v2/posts'
const BACKUP_DIR = '/tmp/orcahome-image-backups'
// WordPress names its generated sizes `<name>-<width>x<height>.<ext>`.
const RESIZED = /^(.+)-(\d+)x(\d+)\.(jpe?g|png|gif|webp)$/i

async function request(url) {
  let error
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {'User-Agent': 'Mozilla/5.0 (orcahome image restore)'},
        signal: AbortSignal.timeout(30000),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`)
      return response
    } catch (err) {
      error = err
    }
  }
  throw error
}

// Map each resized filename used in the WordPress post to its <img src>.
async function wordpressImageSources(slug) {
  const posts = await (await request(`${WP_API}?slug=${encodeURIComponent(slug)}&_fields=content`)).json()
  const html = posts[0]?.content?.rendered || ''
  const sources = new Map()
  for (const [, src] of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) {
    const url = src.replace(/&amp;/g, '&')
    sources.set(decodeURIComponent(url.split('?')[0].split('/').pop()), url)
  }
  return sources
}

const query = `*[_type == "blogPost" && !(_id in path("drafts.**"))${
  slugs.length ? ' && slug.current in $slugs' : ''
}]{
  _id, _rev, "slug": slug.current, body,
  "images": body[_type == "image"]{
    _key,
    "assetId": asset._ref,
    "filename": asset->originalFilename,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`

const posts = await client.fetch(query, {slugs})
const draftIds = new Set(await client.fetch(`*[_id in path("drafts.**")]._id`))
let totalImages = 0
let totalPosts = 0

for (const post of posts) {
  const candidates = (post.images || []).filter((img) => RESIZED.test(img.filename || ''))
  if (!candidates.length) continue
  if (draftIds.has(`drafts.${post._id}`)) {
    console.log(`SKIP ${post.slug}: has an unpublished draft`)
    continue
  }

  const sources = await wordpressImageSources(post.slug)
  const plan = []
  for (const img of candidates) {
    const [, base, , , ext] = img.filename.match(RESIZED)
    const src = sources.get(img.filename)
    if (!src) {
      console.log(`  skip ${img.filename}: not found in the WordPress post`)
      continue
    }
    const originalUrl = src.replace(img.filename, `${base}.${ext}`)
    try {
      const response = await request(originalUrl)
      if (!/^image\//.test(response.headers.get('content-type') || '')) throw new Error('not an image')
      const data = Buffer.from(await response.arrayBuffer())
      plan.push({img, originalUrl, filename: `${base}.${ext}`, data})
    } catch (err) {
      console.log(`  skip ${img.filename}: original unavailable (${err.message})`)
    }
  }
  if (!plan.length) continue

  console.log(`${commit ? 'APPLY' : 'DRY RUN'} ${post.slug}: ${plan.length} image(s)`)
  for (const p of plan) {
    console.log(`  ${p.img.filename} (${p.img.width}x${p.img.height}) -> ${p.filename} (${p.data.length} bytes)`)
  }
  totalPosts++
  totalImages += plan.length
  if (!commit) continue

  await mkdir(BACKUP_DIR, {recursive: true, mode: 0o700})
  const backupPath = `${BACKUP_DIR}/${post.slug}-${post._rev}.json`
  await writeFile(backupPath, JSON.stringify({_id: post._id, _rev: post._rev, body: post.body}, null, 2))
  console.log(`  backup: ${backupPath}`)

  const set = {}
  for (const p of plan) {
    const asset = await client.assets.upload('image', p.data, {filename: p.filename})
    const {width, height} = asset.metadata.dimensions
    if (width <= p.img.width) {
      throw new Error(`${p.filename} (${width}x${height}) isn't larger than the copy; aborting ${post.slug}`)
    }
    console.log(`  uploaded ${p.filename}: ${width}x${height}`)
    set[`body[_key=="${p.img._key}"].asset`] = {_type: 'reference', _ref: asset._id}
  }
  await client.patch(post._id).ifRevisionId(post._rev).set(set).commit()
  console.log(`  patched ${post.slug}`)
}

console.log(
  `${commit ? 'Replaced' : 'Would replace'} ${totalImages} image(s) in ${totalPosts} post(s).${
    commit ? '' : ' No writes (pass --commit to apply).'
  }`,
)
