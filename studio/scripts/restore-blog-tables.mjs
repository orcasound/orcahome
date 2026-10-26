/**
 * Restore data tables flattened by the WordPress blog migration (#467).
 *
 * htmlToBlocks has no table support, so each WordPress <table> became one
 * paragraph with all the cell text run together. This reads every table from
 * the original WordPress posts, finds that flattened paragraph in the Sanity
 * post, and replaces it with a `dataTable` block.
 *
 * Layout tables (image + audio clip grids) are skipped; they already render as
 * a grid (#442).
 *
 * Run from studio/, Node 24:
 *   npx sanity exec scripts/restore-blog-tables.mjs --with-user-token                 # dry run
 *   npx sanity exec scripts/restore-blog-tables.mjs --with-user-token -- --commit     # write
 *
 * The dry run writes a report to /tmp/blog-tables-report.json with each post's
 * current body and _rev (the rollback record) and the proposed table blocks.
 * Commit refuses posts with an open draft, and every patch is revision-guarded,
 * so a post edited since the dry run is left alone. Re-running is safe: a post
 * whose table was already restored no longer has the flattened paragraph.
 */
/* global fetch, AbortSignal */
import console from 'node:console'
import crypto from 'node:crypto'
import {writeFile} from 'node:fs/promises'
import process from 'node:process'

import {JSDOM} from 'jsdom'
import {getCliClient} from 'sanity/cli'

const WP_API = 'https://www.orcasound.net/wp-json/wp/v2/posts'
const REPORT = '/tmp/blog-tables-report.json'

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
// Flattening keeps the characters but not the spacing between cells, so match
// on the text with all whitespace removed.
const squash = (text) => (text || '').replace(/\s+/g, '')
const blockText = (block) => (block.children || []).map((span) => span.text || '').join('')
const key = (value) => crypto.createHash('sha1').update(value).digest('hex').slice(0, 12)

async function fetchPosts() {
  const posts = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${WP_API}?per_page=100&page=${page}&_fields=slug,content`, {
      signal: AbortSignal.timeout(60000),
    })
    if (res.status === 400) break
    if (!res.ok) throw new Error(`WordPress API ${res.status}`)
    const batch = await res.json()
    posts.push(...batch)
    if (page >= Number(res.headers.get('x-wp-totalpages') || '1')) break
  }
  return posts
}

const isLayoutTable = (table) =>
  table.querySelector('img, audio, a[href$=".mp3"], a[href$=".wav"], a[href$=".ogg"]') !== null

// First row is a header when it is marked up as one: <thead>, all <th>, or
// most of its non-empty cells in bold (bold is often split across several
// <b>/<strong> tags, and one header cell may have been left plain).
const boldText = (cell) =>
  normalize([...cell.querySelectorAll('strong, b')].map((el) => el.textContent).join(' '))
function hasHeaderRow(table, firstRow) {
  if (table.querySelector('thead')) return true
  const cells = [...firstRow.children]
  if (cells.every((cell) => cell.tagName === 'TH')) return true
  const filled = cells.filter((cell) => normalize(cell.textContent))
  const bold = filled.filter((cell) => squash(boldText(cell)) === squash(cell.textContent))
  return filled.length > 0 && bold.length * 2 > filled.length
}

function toDataTable(table) {
  const rows = [...table.querySelectorAll('tr')]
  return {
    _type: 'dataTable',
    _key: key(table.outerHTML),
    headerRow: rows.length > 1 && hasHeaderRow(table, rows[0]),
    rows: rows.map((row, i) => ({
      _type: 'tableRow',
      _key: `row${i}`,
      cells: [...row.children].map((cell) => normalize(cell.textContent)),
    })),
  }
}

// Index in `text` just after its first `count` non-whitespace characters.
function afterNonSpace(text, count) {
  let seen = 0
  for (let i = 0; i < text.length; i++) {
    if (!/\s/.test(text[i])) seen++
    if (seen === count) return i + 1
  }
  return text.length
}

// Characters [from, to) of the block's text must all be in unlinked,
// unformatted spans, so they can become a plain paragraph without losing marks.
function plainRange(block, from, to) {
  let pos = 0
  for (const span of block.children || []) {
    const end = pos + (span.text || '').length
    if (end > from && pos < to && (span.marks || []).length) return false
    pos = end
  }
  return true
}

// The table text plus a neighbouring sentence (an image caption before it, or
// the table's own caption after it) flattened into one paragraph.
function gluedMatches(body, target) {
  const found = []
  body.forEach((block, index) => {
    if (block._type !== 'block') return
    const text = blockText(block)
    const flat = squash(text)
    if (flat.length === target.length) return
    if (flat.endsWith(target)) {
      const cut = afterNonSpace(text, flat.length - target.length)
      if (plainRange(block, 0, cut)) found.push({block, index, before: normalize(text.slice(0, cut))})
    } else if (flat.startsWith(target)) {
      const cut = afterNonSpace(text, target.length)
      if (plainRange(block, cut, text.length)) found.push({block, index, after: normalize(text.slice(cut))})
    }
  })
  return found
}

const paragraph = (text, _key) => ({
  _type: 'block',
  _key,
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: `${_key}-s`, text, marks: []}],
})

async function main() {
  const wpPosts = await fetchPosts()
  const sanityPosts = await client.fetch(
    `*[_type == "blogPost" && !(_id in path("drafts.**"))]{_id, _rev, "slug": slug.current, body}`,
  )
  const drafts = new Set(await client.fetch(`*[_id in path("drafts.**") && _type == "blogPost"]._id`))
  const bySlug = new Map(sanityPosts.map((post) => [post.slug, post]))

  const report = {version: 1, createdAt: new Date().toISOString(), posts: [], errors: []}
  for (const wp of wpPosts) {
    const doc = new JSDOM(wp.content?.rendered || '').window.document
    const tables = [...doc.querySelectorAll('table')].filter((table) => !isLayoutTable(table))
    if (!tables.length) continue

    const post = bySlug.get(wp.slug)
    if (!post) {
      report.errors.push(`${wp.slug}: not in Sanity`)
      continue
    }
    if (drafts.has(`drafts.${post._id}`)) {
      report.errors.push(`${wp.slug}: has an open draft, skipped`)
      continue
    }

    const body = post.body || []
    const replacements = []
    for (const table of tables) {
      const target = squash(table.textContent)
      let matches = body
        .map((block, index) => ({block, index}))
        .filter(({block}) => block._type === 'block' && squash(blockText(block)) === target)
      if (matches.length === 0) matches = gluedMatches(body, target)
      if (matches.length === 0) {
        // Already restored on an earlier run?
        const restored = body.some((block) => block._type === 'dataTable' && block._key === key(table.outerHTML))
        if (!restored) report.errors.push(`${wp.slug}: flattened text not found for table "${normalize(table.textContent).slice(0, 60)}"`)
        continue
      }
      if (matches.length > 1) {
        report.errors.push(`${wp.slug}: flattened text found ${matches.length} times, skipped`)
        continue
      }
      const {block, index, before, after} = matches[0]
      replacements.push({
        blockKey: block._key,
        index,
        table: toDataTable(table),
        // A sentence that was glued to the table text goes back to its own paragraph.
        before: before && paragraph(before, `${block._key}-before`),
        after: after && paragraph(after, `${block._key}-after`),
      })
    }
    if (replacements.length) {
      report.posts.push({_id: post._id, _rev: post._rev, slug: wp.slug, originalBody: body, replacements})
    }
  }

  await writeFile(REPORT, JSON.stringify(report, null, 2))
  const total = report.posts.reduce((n, post) => n + post.replacements.length, 0)
  console.log(`${commit ? '' : '[DRY RUN] '}${total} tables in ${report.posts.length} posts\n`)
  for (const post of report.posts) {
    console.log(post.slug)
    for (const {index, table, before, after} of post.replacements) {
      const cols = Math.max(...table.rows.map((row) => row.cells.length))
      console.log(
        `  block #${index} -> ${table.rows.length}x${cols} table, header row: ${table.headerRow}` +
          `\n    first row: ${table.rows[0].cells.join(' | ').slice(0, 100)}` +
          (before ? `\n    split off before: "${before.children[0].text}"` : '') +
          (after ? `\n    split off after: "${after.children[0].text}"` : ''),
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
    tx.patch(post._id, (patch) => {
      let p = patch.ifRevisionId(post._rev)
      for (const {blockKey, table, before, after} of post.replacements) {
        const blocks = [before, table, after].filter(Boolean)
        p = p.insert('replace', `body[_key=="${blockKey}"]`, blocks)
      }
      return p
    })
  }
  await tx.commit()
  console.log(`Wrote ${total} tables to ${report.posts.length} posts.`)
}

await main()
