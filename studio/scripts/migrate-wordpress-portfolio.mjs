/**
 * One-time migration: WordPress portfolio pages (orcasound.net/portfolio/<slug>,
 * the Jetpack "portfolio" post type) -> Sanity `project` documents, shown at
 * /projects/<slug>.
 *
 * Unlike the blog migration (#397), media is converted in the same pass so it
 * doesn't need a restore afterwards (#428): every WordPress audio player,
 * YouTube embed, audio playlist, and Google Photos album becomes a link in its
 * own paragraph, which the page renders as a player / embed / link. Links to
 * other portfolio pages and to blog posts already on Sanity are rewritten to
 * /projects/<slug> and /blog/<slug>.
 *
 * WordPress layout blocks are kept: galleries become `gallery` blocks,
 * <details> becomes a `collapsible` block, and single images keep their
 * alignment, display width (as a size option), and caption. Comment threads are
 * archived read-only on `comments`, like the blog's (#428).
 *
 * Run from studio/, Node 24. Two phases:
 *
 *   1. Projects (safe any time; nothing on the live site links to them yet):
 *        npx sanity exec scripts/migrate-wordpress-portfolio.mjs --with-user-token                      # dry run
 *        npx sanity exec scripts/migrate-wordpress-portfolio.mjs --with-user-token -- --commit          # write
 *      Uploads images, creates any missing authors, and creates-or-replaces
 *      one `project-<slug>` document per page (re-running is safe).
 *
 *   2. Repoint (only AFTER the /projects pages are deployed, or the live menu
 *      and About cards would link to a 404):
 *        npx sanity exec scripts/migrate-wordpress-portfolio.mjs --with-user-token -- --repoint           # dry run
 *        npx sanity exec scripts/migrate-wordpress-portfolio.mjs --with-user-token -- --repoint --commit  # write
 *      Points the About page project cards at /projects/<slug> and adds
 *      "Projects" to the top menu after "About Us". The previous values are
 *      saved to /tmp first.
 *
 * The dry run writes the converted documents to /tmp/portfolio-migration.json
 * for inspection.
 */
/* global fetch, AbortSignal */
import console from 'node:console'
import crypto from 'node:crypto'
import {writeFile} from 'node:fs/promises'
import process from 'node:process'
import {URL} from 'node:url'

import {htmlToBlocks} from '@sanity/block-tools'
import {Schema} from '@sanity/schema'
import {JSDOM} from 'jsdom'
import {getCliClient} from 'sanity/cli'

const WP_API = 'https://www.orcasound.net/wp-json/wp/v2/jetpack-portfolio'
// Placeholder page, not a real project.
const SKIP_SLUGS = new Set(['test-audio-portfolio'])
const OUT = '/tmp/portfolio-migration.json'

const args = process.argv.slice(2)
const commit = args.includes('--commit')
const repoint = args.includes('--repoint')
if (args.some((arg) => !['--commit', '--repoint'].includes(arg))) {
  throw new Error('Usage: [--repoint] [--commit]')
}

const client = getCliClient({apiVersion: '2023-01-01'}).withConfig({useCdn: false})
const config = client.config()
if (config.projectId !== 'tncpl9l7' || config.dataset !== 'production') {
  throw new Error('Expected tncpl9l7/production')
}

const blockContentType = Schema.compile({
  name: 'portfolio',
  types: [
    {
      name: 'project',
      type: 'document',
      fields: [
        {
          name: 'body',
          type: 'array',
          of: [{type: 'block'}, {type: 'image'}, {type: 'gallery'}, {type: 'collapsible'}],
        },
      ],
    },
    {
      name: 'gallery',
      type: 'object',
      fields: [
        {name: 'images', type: 'array', of: [{type: 'image'}]},
        {name: 'columns', type: 'number'},
      ],
    },
    {
      name: 'collapsible',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'body', type: 'array', of: [{type: 'block'}, {type: 'image'}]},
      ],
    },
  ],
})
  .get('project')
  .fields.find((f) => f.name === 'body').type

const parseHtml = (html) => new JSDOM(html).window.document
const normalize = (text) => (text || '').replace(/\s+/g, ' ').trim()
const decode = (html) => normalize(parseHtml(`<!doctype html><body>${html || ''}`).body.textContent)
const blockText = (b) => normalize((b.children || []).map((c) => c.text || '').join(''))
const key = (value) => crypto.createHash('sha1').update(value).digest('hex').slice(0, 12)

async function request(url) {
  let error
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {signal: AbortSignal.timeout(30000)})
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`)
      return res
    } catch (err) {
      error = err
    }
  }
  throw error
}

// --- HTML clean-up before htmlToBlocks -------------------------------------

const absolute = (src) => (src?.startsWith('//') ? `https:${src}` : src)

// A paragraph holding one bare link. The page renders a bare media URL as a
// player (audio) or an embed (YouTube), and anything else as a plain link.
function linkParagraph(doc, href, text = href) {
  const p = doc.createElement('p')
  const a = doc.createElement('a')
  a.setAttribute('href', href)
  a.textContent = text
  p.appendChild(a)
  return p
}

function replaceWith(el, nodes) {
  for (const node of nodes) el.parentNode.insertBefore(node, el)
  el.remove()
}

const isVideoEmbed = (src) => /(?:youtube(?:-nocookie)?\.com|youtu\.be|vimeo\.com)/i.test(src)

// Turn embeds htmlToBlocks would drop into link paragraphs; rewrite internal
// links. Returns the cleaned HTML and a log of what was converted.
function prepareHtml(html, {projectSlugs, blogSlugs}) {
  const doc = parseHtml(html)
  const log = []

  doc.querySelectorAll('script, style, meta').forEach((el) => el.remove())

  // Audio players. WordPress nests the .ogg <audio> inside the .mp3 one; one
  // source is enough for every current browser, so keep the first.
  for (const figure of doc.querySelectorAll('figure.wp-block-audio')) {
    const src = figure.querySelector('audio[src], source[src]')?.getAttribute('src')
    const caption = normalize(figure.querySelector('figcaption')?.textContent)
    const nodes = src ? [linkParagraph(doc, src)] : []
    if (caption) {
      const p = doc.createElement('p')
      p.textContent = caption
      nodes.push(p)
    }
    replaceWith(figure, nodes)
    log.push(`audio ${src}`)
  }
  for (const audio of doc.querySelectorAll('audio[src]')) {
    if (audio.closest('.wp-playlist')) continue
    replaceWith(audio, [linkParagraph(doc, audio.getAttribute('src'))])
    log.push(`audio ${audio.getAttribute('src')}`)
  }

  // Audio playlist: keep its track list, one titled link per track.
  for (const playlist of doc.querySelectorAll('.wp-playlist')) {
    const noscript = playlist.querySelector('noscript')
    const list =
      noscript?.querySelector('ol, ul') ||
      parseHtml(noscript?.textContent || '').querySelector('ol, ul')
    const items = [...(list?.querySelectorAll('a[href]') || [])].map((a) => {
      const li = doc.createElement('li')
      li.appendChild(
        linkParagraph(doc, a.getAttribute('href'), normalize(a.textContent)).firstChild,
      )
      return li
    })
    const ol = doc.createElement('ol')
    items.forEach((li) => ol.appendChild(li))
    replaceWith(playlist, items.length ? [ol] : [])
    log.push(`playlist ${items.length} tracks`)
  }

  // Google Photos album widget: 68 hot-linked photos; link to the album.
  for (const album of doc.querySelectorAll('.pa-gallery-player-widget')) {
    const link = album.getAttribute('data-link')
    const title = album.getAttribute('data-title') || 'Photo album'
    replaceWith(album, link ? [linkParagraph(doc, link, `${title} (Google Photos album)`)] : [])
    log.push(`album ${link}`)
  }

  // Iframes: YouTube/Vimeo become an embed; anything else a labelled link.
  for (const iframe of doc.querySelectorAll('iframe')) {
    const src = absolute(iframe.getAttribute('src'))
    const container = iframe.closest('figure.wp-block-embed') || iframe
    if (!src) {
      container.remove()
      continue
    }
    if (isVideoEmbed(src)) {
      const url = new URL(src)
      url.searchParams.delete('feature')
      replaceWith(container, [linkParagraph(doc, url.href)])
      log.push(`video ${url.href}`)
      continue
    }
    let href = src
    let text = iframe.getAttribute('title') || 'Open the embedded content'
    if (/kickstarter\.com/.test(src)) {
      href = src.replace(/\/widget\/.*$/, '')
      text = 'Orcasound on Kickstarter'
    } else if (/umap\.openstreetmap\.fr/.test(src)) {
      text = 'Open the interactive map'
    }
    replaceWith(container, [linkParagraph(doc, href, text)])
    log.push(`iframe -> link ${href}`)
  }

  // Galleries and collapsible <details> become placeholders that a rule turns
  // into `gallery` / `collapsible` blocks once their images are uploaded.
  const placeholders = new Map()
  const placeholder = (el, spec) => {
    const id = `ph${placeholders.size}`
    placeholders.set(id, spec)
    const div = doc.createElement('div')
    div.setAttribute('data-block', id)
    replaceWith(el, [div])
  }
  for (const gallery of doc.querySelectorAll('figure.wp-block-gallery')) {
    const images = [...gallery.querySelectorAll('img[src]')].map((img) => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || undefined,
      caption:
        normalize(img.closest('figure.wp-block-image')?.querySelector('figcaption')?.textContent) ||
        undefined,
    }))
    // WordPress "columns-default" means up to three per row.
    const columns =
      Number(gallery.className.match(/columns-(\d)/)?.[1]) || Math.min(images.length, 3)
    placeholder(gallery, {kind: 'gallery', images, columns: columns >= 3 ? 3 : 2})
    log.push(`gallery ${images.length} images, ${columns >= 3 ? 3 : 2} per row`)
  }
  for (const details of doc.querySelectorAll('details')) {
    const summary = details.querySelector('summary')
    const title = normalize(summary?.textContent) || 'More'
    summary?.remove()
    placeholder(details, {kind: 'collapsible', title, html: details.innerHTML})
    log.push(`collapsible "${title}"`)
  }
  // Single images: keep WordPress's alignment, display width, and caption as
  // data attributes for the image rule; the caption leaves the flow.
  for (const wrapper of doc.querySelectorAll('figure.wp-block-image, div.wp-block-image')) {
    if (wrapper.closest('figure.wp-block-gallery')) continue
    const img = wrapper.querySelector('img[src]')
    if (!img || img.hasAttribute('data-width')) continue
    const classes = [wrapper, ...wrapper.querySelectorAll('figure')]
      .map((el) => el.className)
      .join(' ')
    const align = classes.match(/align(left|right|center)\b/)?.[1]
    const styled = Number(img.getAttribute('style')?.match(/(?:^|;)\s*width:\s*(\d+)px/)?.[1])
    const width = styled || Number(img.getAttribute('width')) || 0
    const caption = normalize(wrapper.querySelector('figcaption')?.textContent)
    img.setAttribute('data-width', String(width))
    if (align) img.setAttribute('data-align', align)
    if (caption) img.setAttribute('data-caption', caption)
    wrapper.querySelectorAll('figcaption').forEach((el) => el.remove())
  }

  // Internal links: portfolio -> /projects, blog permalinks -> /blog when that
  // post is on Sanity. Everything else is left pointing where it did.
  for (const a of doc.querySelectorAll('a[href]')) {
    let url
    try {
      url = new URL(a.getAttribute('href'))
    } catch {
      continue
    }
    if (!/(^|\.)orcasound\.net$/.test(url.hostname)) continue
    const portfolio = url.pathname.match(/^\/portfolio\/([^/]+)\/?$/)
    const post = url.pathname.match(/^\/\d{4}\/\d{2}\/\d{2}\/([^/]+)\/?$/)
    if (portfolio && projectSlugs.has(portfolio[1])) {
      a.setAttribute('href', `/projects/${portfolio[1]}`)
      log.push(`link -> /projects/${portfolio[1]}`)
    } else if (post && blogSlugs.has(post[1])) {
      a.setAttribute('href', `/blog/${post[1]}`)
      log.push(`link -> /blog/${post[1]}`)
    }
  }

  return {html: doc.body.innerHTML, log, placeholders}
}

// --- Images -----------------------------------------------------------------

const assetCache = new Map()
async function uploadImage(url) {
  if (!url) return null
  if (assetCache.has(url)) return assetCache.get(url)
  // Dry run: a stand-in id so the converted body keeps its image blocks.
  if (!commit) {
    assetCache.set(url, `dry-run:${url}`)
    return assetCache.get(url)
  }
  try {
    const res = await request(url)
    const buffer = Buffer.from(await res.arrayBuffer())
    const filename = decodeURIComponent(url.split('/').pop().split('?')[0] || 'image')
    const asset = await client.assets.upload('image', buffer, {filename})
    assetCache.set(url, asset._id)
  } catch (err) {
    console.warn(`  ! image upload failed (${url}): ${err.message}`)
    assetCache.set(url, null)
  }
  return assetCache.get(url)
}

// Width of the text column on the old WordPress portfolio pages.
const WP_COLUMN = 660

// WordPress display width -> our size options (a share of the column).
// Images at (nearly) full width keep the default full-width rendering.
function layoutFor(width, align) {
  const share = width / WP_COLUMN
  if (!width || share >= 0.9) return {}
  const size = share <= 0.45 ? 'small' : share <= 0.55 ? 'medium' : 'large'
  return {alignment: align || 'none', size}
}

const imageRule = (imageMap) => ({
  deserialize(el, next, block) {
    if (el.tagName?.toLowerCase() !== 'img') return undefined
    const assetId = imageMap.get(el.getAttribute('src'))
    if (!assetId) return undefined
    return block({
      _type: 'image',
      asset: {_type: 'reference', _ref: assetId},
      alt: el.getAttribute('alt') || undefined,
      caption: el.getAttribute('data-caption') || undefined,
      ...layoutFor(Number(el.getAttribute('data-width')), el.getAttribute('data-align')),
    })
  },
})

const placeholderRule = (placeholders, imageMap) => ({
  deserialize(el, next, block) {
    const id = el.getAttribute?.('data-block')
    const spec = id && placeholders.get(id)
    if (!spec) return undefined
    if (spec.kind === 'gallery') {
      const images = spec.images
        .filter((img) => imageMap.get(img.src))
        .map((img) => ({
          _type: 'image',
          _key: key(img.src),
          asset: {_type: 'reference', _ref: imageMap.get(img.src)},
          alt: img.alt,
          caption: img.caption,
        }))
      return block({
        _type: 'gallery',
        _key: key(id + images.map((i) => i._key).join()),
        columns: spec.columns,
        images,
      })
    }
    return block({
      _type: 'collapsible',
      _key: key(id + spec.title),
      title: spec.title,
      body: htmlToBlocks(spec.html, blockContentType, {parseHtml, rules: [imageRule(imageMap)]}),
    })
  },
})

// Image URLs anywhere in the page, including inside placeholders.
const imageSources = (html, placeholders) => [
  ...[...parseHtml(html).querySelectorAll('img[src]')].map((img) => img.getAttribute('src')),
  ...[...placeholders.values()].flatMap((spec) =>
    spec.kind === 'gallery'
      ? spec.images.map((img) => img.src)
      : [...parseHtml(spec.html).querySelectorAll('img[src]')].map((img) =>
          img.getAttribute('src'),
        ),
  ),
]

// --- Comments ---------------------------------------------------------------

// The page's WordPress comments as a read-only archive (same shape as the blog's,
// #428): threaded oldest first, with reply depth.
async function fetchComments(postId) {
  const res = await request(
    `https://www.orcasound.net/wp-json/wp/v2/comments?post=${postId}&per_page=100&order=asc`,
  )
  const all = await res.json()
  const children = new Map()
  for (const c of all) children.set(c.parent, [...(children.get(c.parent) || []), c])
  const toText = (html) => {
    const doc = parseHtml(`<!doctype html><body>${(html || '').replace(/<br\s*\/?>/gi, '\n')}`)
    const paragraphs = [...doc.querySelectorAll('p')].map((p) => p.textContent.trim())
    return (paragraphs.length ? paragraphs.join('\n\n') : doc.body.textContent).trim()
  }
  const out = []
  const walk = (parent, depth) => {
    for (const c of children.get(parent) || []) {
      out.push({
        _type: 'comment',
        _key: `wpc${c.id}`,
        author: c.author_name,
        date: `${c.date_gmt}Z`,
        body: toText(c.content?.rendered),
        depth,
        avatar: c.author_avatar_urls?.['96'] || undefined,
      })
      walk(c.id, depth + 1)
    }
  }
  walk(0, 1)
  return out
}

// --- Authors ----------------------------------------------------------------

// WordPress lists co-authors as `author` terms whose slug matches our author
// documents (author-<slug>). The publishing account's display name is only
// embedded for the primary author, which covers the three new people.
function wpAuthors(item) {
  const terms = (item._embedded?.['wp:term'] || []).flat().filter((t) => t?.taxonomy === 'author')
  const primaryName = item._embedded?.author?.[0]?.name
  return terms.map((t, i) => ({slug: t.name, name: i === 0 ? primaryName : undefined}))
}

// A card-length summary: the first real paragraph, cut at a word boundary.
// WordPress's own excerpts are unusable (theme markup, "Latest news: ..."), and
// the paragraph right after an image is its caption, so both are skipped.
function excerptFrom(body) {
  const text = body
    .filter((b, i) => b._type === 'block' && body[i - 1]?._type !== 'image')
    .filter((b) => (!b.style || b.style === 'normal') && !b.listItem)
    .map(blockText)
    .find((t) => t.length >= 60 && !/^https?:\/\//.test(t) && !t.includes(' | '))
  if (!text) return undefined
  if (text.length <= 220) return text
  return `${text.slice(0, 220).replace(/\s+\S*$/, '')}…`
}

// "Introduction | Goals | ..." jump menus link to #anchors that don't survive
// the conversion, so a block whose links are all in-page anchors is dropped.
const isAnchorMenu = (b) =>
  b._type === 'block' &&
  (b.markDefs || []).length > 0 &&
  b.markDefs.every((m) => m.href?.startsWith('#'))

// --- Phases -----------------------------------------------------------------

async function migrateProjects() {
  const items = (await (await request(`${WP_API}?per_page=100&_embed=1`)).json()).filter(
    (item) => item.status === 'publish' && !SKIP_SLUGS.has(item.slug),
  )
  const [blogSlugs, authorDocs] = await Promise.all([
    client.fetch(`*[_type == "blogPost" && defined(slug.current)].slug.current`),
    client.fetch(`*[_type == "author"]{_id, name, "slug": slug.current}`),
  ])
  const projectSlugs = new Set(items.map((item) => item.slug))
  const authorIds = new Map(authorDocs.map((a) => [a.slug, a._id]))
  console.log(
    `${commit ? '' : '[DRY RUN] '}Migrating ${items.length} WordPress portfolio pages -> Sanity projects\n`,
  )

  const newAuthors = new Map()
  const projects = []
  for (const item of items) {
    const {html, log, placeholders} = prepareHtml(item.content?.rendered || '', {
      projectSlugs,
      blogSlugs: new Set(blogSlugs),
    })

    const imageMap = new Map()
    for (const src of imageSources(html, placeholders)) {
      imageMap.set(src, await uploadImage(src))
    }
    const body = htmlToBlocks(html, blockContentType, {
      parseHtml,
      rules: [placeholderRule(placeholders, imageMap), imageRule(imageMap)],
    }).filter((b) => !isAnchorMenu(b))
    const comments = await fetchComments(item.id)

    const authors = []
    for (const {slug, name} of wpAuthors(item)) {
      let id = authorIds.get(slug)
      if (!id) {
        if (!name) {
          console.warn(`  ! ${item.slug}: unknown co-author "${slug}" skipped`)
          continue
        }
        id = `author-${slug}`
        newAuthors.set(id, {_id: id, _type: 'author', name, slug: {_type: 'slug', current: slug}})
        authorIds.set(slug, id)
      }
      authors.push({_type: 'reference', _ref: id, _key: key(id)})
    }

    const title = decode(item.title?.rendered)
    const featuredUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url
    const featuredId = await uploadImage(featuredUrl)
    const categories = (item._embedded?.['wp:term'] || [])
      .flat()
      .filter((t) => t?.taxonomy === 'jetpack-portfolio-type')
      .map((t) => decode(t.name))

    projects.push({
      _id: `project-${item.slug}`,
      _type: 'project',
      title,
      slug: {_type: 'slug', current: item.slug},
      publishedAt: `${item.date_gmt}Z`,
      categories,
      authors,
      excerpt: excerptFrom(body),
      ...(featuredId && {
        featuredImage: {_type: 'image', asset: {_type: 'reference', _ref: featuredId}, alt: title},
      }),
      body,
      comments,
    })
    const images =
      body.filter((b) => b._type === 'image').length +
      body.filter((b) => b._type === 'gallery').reduce((n, g) => n + g.images.length, 0)
    console.log(
      `  ${item.slug}: ${body.length} blocks, ${images}/${imageMap.size} images, ` +
        `${authors.length} authors, [${categories.join(', ')}], featured:${Boolean(featuredId)}, ` +
        `${comments.length} comments` +
        (log.length ? `\n      ${log.join('\n      ')}` : ''),
    )
  }

  console.log(`\nNew authors: ${[...newAuthors.values()].map((a) => a.name).join(', ') || 'none'}`)
  await writeFile(OUT, JSON.stringify({authors: [...newAuthors.values()], projects}, null, 2))
  console.log(`Converted documents written to ${OUT}`)

  if (!commit) {
    console.log('\nDry run only. Re-run with -- --commit to write.')
    return
  }
  const tx = client.transaction()
  for (const author of newAuthors.values()) tx.createIfNotExists(author)
  for (const project of projects) tx.createOrReplace(project)
  await tx.commit()
  console.log(`\nWrote ${newAuthors.size} authors and ${projects.length} projects.`)
}

async function repointLinks() {
  const [about, nav] = await Promise.all([
    client.fetch(`*[_id == "aboutPage"][0]{_id, _rev, projects}`),
    client.fetch(`*[_id == "navigation"][0]{_id, _rev, links}`),
  ])
  const slugs = new Set(await client.fetch(`*[_type == "project"].slug.current`))
  if (!slugs.size) throw new Error('No project documents yet. Run the projects phase first.')

  const cardPatches = {}
  for (const [i, card] of (about?.projects || []).entries()) {
    const slug = card.url?.match(/orcasound\.net\/portfolio\/([^/]+)\/?$/)?.[1]
    if (!slug) continue
    if (!slugs.has(slug)) {
      console.warn(`  ! About card "${card.title}": no project "${slug}", left as is`)
      continue
    }
    cardPatches[`projects[_key=="${card._key}"].url`] = `/projects/${slug}`
    console.log(`  About card ${i + 1} "${card.title}": ${card.url} -> /projects/${slug}`)
  }

  const links = nav?.links || []
  const hasProjects = links.some((l) => l.url === '/projects')
  const after = links.find((l) => l.url === '/about')
  if (hasProjects) console.log('  Top menu already has /projects')
  else console.log(`  Top menu: add "Projects" after "${after?.label || '(end)'}"`)

  if (!commit) {
    console.log('\nDry run only. Re-run with -- --repoint --commit to write.')
    return
  }
  const backup = `/tmp/portfolio-repoint-backup-${Date.now()}.json`
  await writeFile(backup, JSON.stringify({about, nav}, null, 2))
  console.log(`\nPrevious values saved to ${backup}`)

  const tx = client.transaction()
  if (Object.keys(cardPatches).length) {
    tx.patch(about._id, (p) => p.ifRevisionId(about._rev).set(cardPatches))
  }
  if (!hasProjects) {
    const link = {_key: 'projects', _type: 'siteLink', label: 'Projects', url: '/projects'}
    tx.patch(nav._id, (p) => {
      const patch = p.ifRevisionId(nav._rev)
      return after
        ? patch.insert('after', `links[_key=="${after._key}"]`, [link])
        : patch.append('links', [link])
    })
  }
  await tx.commit()
  console.log('Repointed.')
}

await (repoint ? repointLinks() : migrateProjects())
