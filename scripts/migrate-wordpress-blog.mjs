/**
 * One-time migration: WordPress blog -> Sanity (issue #397).
 *
 * Pulls every post from the orcasound.net WordPress REST API, converts the HTML
 * body to Portable Text, uploads the featured image and any inline images to
 * Sanity, and writes each post as a `blogPost` document. The original slug is
 * preserved so existing /blog/<slug> links keep working.
 *
 * Usage:
 *   1. Deploy the blogPost schema first:  (in studio/)  npx sanity deploy
 *   2. Create a Sanity API token with write access (Editor).
 *   3. Run:
 *        SANITY_WRITE_TOKEN=xxxxx node scripts/migrate-wordpress-blog.mjs
 *
 *   Dry run (no token needed — fetches + converts, writes nothing, uploads
 *   nothing, so inline body images are skipped):
 *        DRY_RUN=1 node scripts/migrate-wordpress-blog.mjs
 *
 * Re-running is safe: each document uses a deterministic id (blogPost-<slug>)
 * and is created-or-replaced.
 *
 * Requires dev dependencies: @sanity/block-tools, @sanity/schema, jsdom.
 */

import crypto from 'node:crypto'

import { htmlToBlocks } from '@sanity/block-tools'
import { createClient } from '@sanity/client'
import { Schema } from '@sanity/schema'
import { JSDOM } from 'jsdom'

// Deterministic, valid Sanity document id. Slugs can exceed Sanity's 128-char
// id limit, so long ones are truncated + suffixed with a short stable hash.
// The slug field itself (the URL) is kept intact.
const docId = (slug) => {
  const id = `blogPost-${slug}`
  if (id.length <= 120) return id
  const hash = crypto.createHash('sha1').update(slug).digest('hex').slice(0, 8)
  return `blogPost-${slug.slice(0, 100)}-${hash}`
}

const WP_API = 'https://www.orcasound.net/wp-json/wp/v2/posts'
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tncpl9l7'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_WRITE_TOKEN
const DRY_RUN = Boolean(process.env.DRY_RUN)

if (!DRY_RUN && !TOKEN) {
  console.error(
    'Missing SANITY_WRITE_TOKEN. Set it to a write-enabled Sanity token, or run with DRY_RUN=1.'
  )
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

// Compile the block content type so block-tools knows how to shape the body.
const blockContentType = Schema.compile({
  name: 'blog',
  types: [
    {
      name: 'blogPost',
      type: 'document',
      fields: [
        {
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image' }],
        },
      ],
    },
  ],
})
  .get('blogPost')
  .fields.find((f) => f.name === 'body').type

const parseHtml = (html) => new JSDOM(html).window.document

const decodeEntities = (html) =>
  new JSDOM(`<!doctype html><body>${html || ''}`).window.document.body
    .textContent || ''

const stripHtml = (html) => decodeEntities(html).replace(/\s+/g, ' ').trim()

async function fetchAllPosts() {
  const posts = []
  let page = 1
  for (;;) {
    const url = `${WP_API}?per_page=100&page=${page}&_embed=1`
    const res = await fetch(url)
    if (res.status === 400) break // past the last page
    if (!res.ok) throw new Error(`WP fetch failed: ${res.status} ${url}`)
    const batch = await res.json()
    if (!Array.isArray(batch) || batch.length === 0) break
    posts.push(...batch)
    const totalPages = Number(res.headers.get('x-wp-totalpages') || '1')
    if (page >= totalPages) break
    page += 1
  }
  return posts
}

// Upload an image URL to Sanity once; cache by URL so repeated srcs reuse it.
const assetCache = new Map()
async function uploadImage(url) {
  if (!url) return null
  if (assetCache.has(url)) return assetCache.get(url)
  if (DRY_RUN) {
    assetCache.set(url, null)
    return null
  }
  try {
    // Time out slow/hanging image URLs so one bad image can't stall the run.
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
    if (!res.ok) throw new Error(`${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const filename = decodeURIComponent(
      url.split('/').pop().split('?')[0] || 'image'
    )
    const asset = await client.assets.upload('image', buffer, { filename })
    assetCache.set(url, asset._id)
    return asset._id
  } catch (err) {
    console.warn(`  ! image upload failed (${url}): ${err.message}`)
    assetCache.set(url, null)
    return null
  }
}

function imageRule(imageMap) {
  return {
    deserialize(el, next, block) {
      if (!el.tagName || el.tagName.toLowerCase() !== 'img') return undefined
      const src = el.getAttribute('src')
      const assetId = imageMap.get(src)
      if (!assetId) return undefined
      return block({
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: el.getAttribute('alt') || undefined,
      })
    },
  }
}

async function migratePost(post) {
  const slug = post.slug
  const title = stripHtml(post.title?.rendered)
  const contentHtml = post.content?.rendered || ''

  // Pre-upload every inline body image so the (synchronous) block-tools rule
  // can look up an already-uploaded asset id.
  const doc = parseHtml(contentHtml)
  const imageMap = new Map()
  const imgEls = Array.from(doc.querySelectorAll('img'))
  for (const img of imgEls) {
    const src = img.getAttribute('src')
    if (src) imageMap.set(src, await uploadImage(src))
  }

  const body = htmlToBlocks(contentHtml, blockContentType, {
    parseHtml,
    rules: [imageRule(imageMap)],
  })

  const featuredUrl =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  const featuredAssetId = await uploadImage(featuredUrl)

  const tags = Array.from(
    new Set(
      (post._embedded?.['wp:term'] || [])
        .flat()
        .map((t) => t?.name)
        .filter(Boolean)
    )
  )

  const document = {
    _id: docId(slug),
    _type: 'blogPost',
    title,
    slug: { _type: 'slug', current: slug },
    publishedAt: post.date_gmt ? `${post.date_gmt}Z` : post.date,
    excerpt: stripHtml(post.excerpt?.rendered),
    tags,
    body,
    ...(featuredAssetId
      ? {
          featuredImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: featuredAssetId },
            alt: title,
          },
        }
      : {}),
  }

  if (DRY_RUN) {
    console.log(
      `  [dry-run] ${slug} — ${body.length} blocks, ${
        tags.length
      } tags, featured:${Boolean(featuredUrl)}`
    )
    return
  }

  await client.createOrReplace(document)
  console.log(`  ✓ ${slug} — ${body.length} blocks, ${tags.length} tags`)
}

async function main() {
  console.log(
    `${
      DRY_RUN ? '[DRY RUN] ' : ''
    }Migrating WordPress blog -> Sanity (${PROJECT_ID}/${DATASET})`
  )
  const all = await fetchAllPosts()
  const limit = Number(process.env.LIMIT) || 0
  const posts = limit > 0 ? all.slice(0, limit) : all
  console.log(
    `Fetched ${all.length} posts from WordPress${
      limit > 0 ? `, migrating first ${posts.length} (LIMIT=${limit})` : ''
    }.\n`
  )

  // Skip posts already migrated (safe to re-run / resume) unless FORCE=1.
  let existing = new Set()
  if (!DRY_RUN && !process.env.FORCE) {
    try {
      const ids = await client.fetch(`*[_type == "blogPost"].slug.current`)
      existing = new Set(ids || [])
    } catch {
      existing = new Set()
    }
  }

  let ok = 0
  let failed = 0
  let skipped = 0
  for (const post of posts) {
    if (existing.has(post.slug)) {
      skipped += 1
      continue
    }
    try {
      await migratePost(post)
      ok += 1
    } catch (err) {
      failed += 1
      console.error(`  ✗ ${post.slug}: ${err.message}`)
    }
  }

  console.log(
    `\nDone. ${ok} migrated, ${skipped} skipped (already present), ${failed} failed, ${posts.length} total.`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
