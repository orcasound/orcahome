import {createHash} from 'node:crypto'
import {URL} from 'node:url'
import {JSDOM} from 'jsdom'

// Sanity may reorder object properties when storing JSON. Preserve array order
// but sort object keys before comparing snapshots or detecting an applied plan.
const canonical = (value) => {
  if (Array.isArray(value)) return value.map(canonical)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonical(value[key])]),
    )
  }
  return value
}
export const digest = (value) =>
  createHash('sha256')
    .update(JSON.stringify(canonical(value)))
    .digest('hex')
const normalize = (text) => (text || '').replace(/\s+/g, ' ').trim()
const blockText = (block) =>
  normalize((block.children || []).map((span) => span.text || '').join(''))
export const clipId = (href) => {
  try {
    const url = new URL(href)
    if (!['https:', 'http:'].includes(url.protocol)) return null
    const name = decodeURIComponent(url.pathname.split('/').pop())
    return /\.(mp3|ogg|wav|m4a)$/i.test(name) ? name.replace(/\.(mp3|ogg|wav|m4a)$/i, '') : null
  } catch {
    return null
  }
}
export const bodyClips = (body) =>
  new Set(
    (body || []).flatMap((block) =>
      (block.markDefs || []).map((mark) => clipId(mark.href)).filter(Boolean),
    ),
  )

export function sourceClips(html, url) {
  const dom = new JSDOM(html, {url})
  const doc = dom.window.document
  const content = doc.querySelector('.entry-content')
  if (!content) throw new Error(`No article .entry-content: ${url}`)
  const clips = []
  const textNodes = [...content.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,blockquote')]
  for (const el of content.querySelectorAll('audio, a[href]')) {
    if (el.tagName === 'A' && el.closest('audio')) continue
    const inPlayer = el.tagName === 'AUDIO'
    const elements = inPlayer ? [el, ...el.querySelectorAll('source[src],a[href]')] : [el]
    const urls = [
      ...new Set(
        elements.flatMap((item) => {
          const raw = item.getAttribute('src') || item.getAttribute('href')
          if (!raw) return []
          try {
            const href = new URL(raw, url).href
            return clipId(href) ? [href] : []
          } catch {
            return []
          }
        }),
      ),
    ]
    const ids = [...new Set(urls.map(clipId))]
    if (!ids.length) continue
    // Sources in one audio element are alternatives even when WP renamed an
    // upload (-1) or has a typo. Also deduplicate links by filename stem.
    let clip = clips.find((item) => item.ids.some((id) => ids.includes(id)))
    if (!clip) {
      const context = textNodes
        .filter(
          (node) =>
            !node.contains(el) &&
            !node.closest('audio') &&
            Boolean(node.compareDocumentPosition(el) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING),
        )
        .map((node) => normalize(node.textContent))
        .filter(Boolean)
      clip = {id: ids[0], ids: [], urls: [], player: inPlayer, precedingText: context.slice(-8)}
      clips.push(clip)
    }
    clip.player ||= inPlayer
    clip.ids = [...new Set([...clip.ids, ...ids])]
    clip.urls = [...new Set([...clip.urls, ...urls])]
  }
  dom.window.close()
  return clips
}

export function insertionAnchor(body, clip) {
  for (const text of [...clip.precedingText].reverse()) {
    const candidates = body.filter((block) => block._type === 'block' && blockText(block) === text)
    if (candidates.length === 1 && candidates[0]._key) return candidates[0]._key
  }
  return null
}

export function audioBlock(clip) {
  // One block per recording: alternate formats are sources of the same player.
  const key = `restoredAudio${digest(clip.id).slice(0, 16)}`
  const href = clip.media.url
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [{_type: 'link', _key: `${key}link`, href}],
    children: [{_type: 'span', _key: `${key}span`, text: href, marks: [`${key}link`]}],
  }
}
