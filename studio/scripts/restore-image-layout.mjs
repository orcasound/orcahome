/**
 * Restore WordPress "align left / right" image layout in migrated blog posts
 * (#470). The migration kept only the image file, so these images now sit on
 * their own line at full size.
 *
 * For each floated image on the original post, this sets the matching Sanity
 * body image's `alignment` (left/right) and `size` (small/medium, from the
 * share of the old 490px column it used). An image that sat at the start of a
 * paragraph is moved in front of that paragraph's text block, so the text
 * wraps beside it again (htmlToBlocks had put it after the text).
 *
 * A WordPress caption, which the migration turned into the paragraph after the
 * image, moves into the image's `caption` field so it shows under the image.
 *
 * Images are matched by file name (WordPress size suffixes like -300x207
 * removed), since #449 swapped some resized files for their originals.
 *
 * Run from studio/, Node 24:
 *   npx sanity exec scripts/restore-image-layout.mjs --with-user-token                 # dry run
 *   npx sanity exec scripts/restore-image-layout.mjs --with-user-token -- --commit     # write
 *
 * The dry run writes /tmp/image-layout-report.json with each post's current
 * body and _rev (the rollback record) and the new body. Commit skips posts with
 * an open draft and writes each body with one revision-guarded `set`.
 */
/* global fetch, AbortSignal */
import console from 'node:console'
import {writeFile} from 'node:fs/promises'
import process from 'node:process'

import {JSDOM} from 'jsdom'
import {getCliClient} from 'sanity/cli'

const WP_API = 'https://www.orcasound.net/wp-json/wp/v2/posts'
const REPORT = '/tmp/image-layout-report.json'
// Width of the text column on the old WordPress blog theme.
const WP_COLUMN = 490

const args = process.argv.slice(2)
if (args.some((arg) => arg !== '--commit')) throw new Error('Usage: [--commit]')
const commit = args.includes('--commit')

const client = getCliClient({apiVersion: '2023-01-01'}).withConfig({
  useCdn: false,
  perspective: 'raw',
})
const config = client.config()
if (config.projectId !== 'tncpl9l7' || config.dataset !== 'production') {
  throw new Error('Expected tncpl9l7/production')
}

const normalize = (text) => (text || '').replace(/\s+/g, ' ').trim()
const blockText = (block) => normalize((block.children || []).map((s) => s.text || '').join(''))

// "Screen-Shot-2020-07-04-at-9.15.39-AM-300x207.jpg" -> "screen-shot-2020-07-04-at-9.15.39-am"
const stem = (name) =>
  decodeURIComponent(name || '')
    .split('/')
    .pop()
    .split('?')[0]
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, '')
    .replace(/-\d+x\d+$/, '')
    .replace(/-(scaled|rotated)$/, '')

const sizeFor = (width) => (width && width / WP_COLUMN <= 0.45 ? 'small' : 'medium')

async function fetchPosts() {
  const posts = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${WP_API}?per_page=100&page=${page}&_fields=slug,content`, {
      signal: AbortSignal.timeout(60000),
    })
    if (res.status === 400) break
    if (!res.ok) throw new Error(`WordPress API ${res.status}`)
    posts.push(...(await res.json()))
    if (page >= Number(res.headers.get('x-wp-totalpages') || '1')) break
  }
  return posts
}

// Floated images on a WordPress post, in page order.
function floatedImages(html) {
  const doc = new JSDOM(html).window.document
  return [...doc.querySelectorAll('img')].flatMap((img) => {
    const classes = [img, img.parentElement, img.closest('figure')]
      .filter(Boolean)
      .map((el) => el.className || '')
      .join(' ')
    const align = classes.match(/align(left|right)\b/)?.[1]
    if (!align) return []
    const src = img.getAttribute('src') || ''
    const width =
      Number(img.getAttribute('width')) || Number(src.match(/-(\d+)x\d+\.[a-z]+$/i)?.[1]) || 0
    // An image at the start of a paragraph with text: the text should wrap
    // beside it. Only the first image of such a paragraph moves.
    const caption = normalize(
      img.closest('figure')?.querySelector('figcaption, .wp-caption-text')?.textContent,
    )
    const paragraph = img.closest('p')
    const firstInParagraph = paragraph && paragraph.querySelector('img') === img
    const paragraphText = paragraph ? normalize(paragraph.textContent) : ''
    return [
      {
        stem: stem(src),
        alignment: align,
        size: sizeFor(width),
        width,
        leadsText: Boolean(firstInParagraph && paragraphText) ? paragraphText : null,
        caption: caption || null,
      },
    ]
  })
}

async function main() {
  const [wpPosts, sanityPosts, drafts] = await Promise.all([
    fetchPosts(),
    client.fetch(
      `*[_type == "blogPost" && !(_id in path("drafts.**"))]{
        _id, _rev, "slug": slug.current, body,
        "files": body[_type == "image"]{_key, "name": asset->originalFilename}
      }`,
    ),
    client.fetch(`*[_id in path("drafts.**") && _type == "blogPost"]._id`),
  ])
  const bySlug = new Map(sanityPosts.map((post) => [post.slug, post]))
  const draftIds = new Set(drafts)

  const report = {version: 1, createdAt: new Date().toISOString(), posts: [], errors: []}
  for (const wp of wpPosts) {
    const floats = floatedImages(wp.content?.rendered || '')
    if (!floats.length) continue
    const post = bySlug.get(wp.slug)
    if (!post) {
      report.errors.push(`${wp.slug}: not in Sanity`)
      continue
    }
    if (draftIds.has(`drafts.${post._id}`)) {
      report.errors.push(`${wp.slug}: has an open draft, skipped`)
      continue
    }

    const body = post.body.map((block) => ({...block}))
    const changes = []
    const used = new Set()
    for (const float of floats) {
      const file = post.files.find((f) => !used.has(f._key) && stem(f.name) === float.stem)
      if (!file) {
        report.errors.push(`${wp.slug}: no body image matches ${float.stem}`)
        continue
      }
      used.add(file._key)
      let index = body.findIndex((block) => block._key === file._key)
      body[index] = {...body[index], alignment: float.alignment, size: float.size}

      let moved = false
      if (float.leadsText) {
        // Usually the paragraph text sits just before the image; allow a few
        // empty blocks in between.
        for (let i = index - 1; i >= Math.max(0, index - 4); i--) {
          if (body[i]._type !== 'block') break
          const text = blockText(body[i])
          if (!text) continue
          if (float.leadsText.startsWith(text.slice(0, 40))) {
            const [image] = body.splice(index, 1)
            body.splice(i, 0, image)
            index = i
            moved = true
          }
          break
        }
      }
      // The migration turned the caption into the next paragraph; with the
      // image floated it would sit beside the image instead of under it.
      let captionMoved = false
      if (float.caption) {
        let j = index + 1
        while (j < body.length && body[j]._type === 'block' && !blockText(body[j])) j++
        const next = body[j]
        if (next?._type === 'block' && blockText(next) === float.caption) {
          if ((next.markDefs || []).length) {
            report.errors.push(`${wp.slug}: caption "${float.caption}" has a link, left as a paragraph`)
          } else {
            body[index] = {...body[index], caption: float.caption}
            body.splice(j, 1)
            captionMoved = true
          }
        } else {
          report.errors.push(`${wp.slug}: caption "${float.caption}" not found after the image`)
        }
      }
      changes.push({...float, key: file._key, moved, captionMoved})
    }
    if (changes.length) {
      report.posts.push({_id: post._id, _rev: post._rev, slug: wp.slug, originalBody: post.body, body, changes})
    }
  }

  await writeFile(REPORT, JSON.stringify(report, null, 2))
  const total = report.posts.reduce((n, post) => n + post.changes.length, 0)
  console.log(`${commit ? '' : '[DRY RUN] '}${total} images in ${report.posts.length} posts\n`)
  for (const post of report.posts) {
    console.log(post.slug)
    for (const c of post.changes) {
      console.log(
        `  ${c.stem}: ${c.alignment}, ${c.size} (was ${c.width || '?'}px of ${WP_COLUMN})` +
          (c.moved ? ', moved before its paragraph' : '') +
          (c.captionMoved ? `, caption: "${c.caption}"` : ''),
      )
    }
  }
  if (report.errors.length) console.log(`\nProblems:\n  ${report.errors.join('\n  ')}`)
  console.log(`\nReport (with the original bodies, for rollback): ${REPORT}`)

  if (!commit) {
    console.log('Dry run only. Re-run with -- --commit to write.')
    return
  }
  const tx = client.transaction()
  for (const post of report.posts) {
    tx.patch(post._id, (patch) => patch.ifRevisionId(post._rev).set({body: post.body}))
  }
  await tx.commit()
  console.log(`Updated ${total} images in ${report.posts.length} posts.`)
}

await main()
