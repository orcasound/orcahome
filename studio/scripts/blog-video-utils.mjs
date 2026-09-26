import {URL} from 'node:url'
import {JSDOM} from 'jsdom'

import {digest, insertionAnchor} from './blog-audio-utils.mjs'

export {digest, insertionAnchor}

const normalize = (text) => (text || '').replace(/\s+/g, ' ').trim()

// A stable id per video: the YouTube/Vimeo video id for embeds, or the file
// name stem for self-hosted videos. Used to dedupe and to detect what a Sanity
// body already contains so re-runs don't re-insert.
export const videoId = (href) => {
  try {
    const url = new URL(href)
    if (!['https:', 'http:'].includes(url.protocol)) return null
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      const embed = url.pathname.match(/\/embed\/([\w-]+)/)
      if (embed) return `yt:${embed[1]}`
      const v = url.searchParams.get('v')
      if (v) return `yt:${v}`
      return null
    }
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `yt:${id}` : null
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean).pop()
      return /^\d+$/.test(id) ? `vimeo:${id}` : null
    }
    if (host === 'media.king5.com') {
      const m = url.pathname.match(/\/embeds\/video\/([^/]+)/)
      return m ? `king5:${m[1]}` : null
    }
    const name = decodeURIComponent(url.pathname.split('/').pop() || '')
    return /\.(mp4|webm|mov|m4v)$/i.test(name)
      ? name.replace(/\.(mp4|webm|mov|m4v)$/i, '')
      : null
  } catch {
    return null
  }
}

export const isEmbed = (href) => /^(yt|vimeo|king5):/.test(videoId(href) || '')

export const bodyVideos = (body) =>
  new Set(
    (body || []).flatMap((block) =>
      (block.markDefs || []).map((mark) => videoId(mark.href)).filter(Boolean),
    ),
  )

// Pull the self-hosted <video> files and YouTube/Vimeo iframe embeds out of a
// WordPress article's .entry-content, with the surrounding text used to anchor
// the insertion point (mirrors blog-audio-utils.sourceClips).
export function sourceVideos(html, url) {
  const dom = new JSDOM(html, {url})
  const doc = dom.window.document
  const content = doc.querySelector('.entry-content')
  if (!content) throw new Error(`No article .entry-content: ${url}`)
  const clips = []
  const textNodes = [
    ...content.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,blockquote'),
  ]
  const collect = (el, raw) => {
    if (!raw) return
    let href
    try {
      href = new URL(raw, url).href
    } catch {
      return
    }
    const id = videoId(href)
    if (!id) return
    let clip = clips.find((item) => item.ids.includes(id))
    if (!clip) {
      const context = textNodes
        .filter(
          (node) =>
            !node.contains(el) &&
            Boolean(
              node.compareDocumentPosition(el) &
                dom.window.Node.DOCUMENT_POSITION_FOLLOWING,
            ),
        )
        .map((node) => normalize(node.textContent))
        .filter(Boolean)
      clip = {id, ids: [], urls: [], embed: isEmbed(href), precedingText: context.slice(-8)}
      clips.push(clip)
    }
    clip.ids = [...new Set([...clip.ids, id])]
    clip.urls = [...new Set([...clip.urls, href])]
  }
  for (const v of content.querySelectorAll('video[src]'))
    collect(v, v.getAttribute('src'))
  for (const s of content.querySelectorAll('video source[src]'))
    collect(s.closest('video') || s, s.getAttribute('src'))
  for (const i of content.querySelectorAll('iframe[src]'))
    collect(i, i.getAttribute('src'))
  dom.window.close()
  return clips
}

export function videoBlock(clip) {
  const key = `restoredVideo${digest(clip.id).slice(0, 16)}`
  const href = clip.media.url
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [{_type: 'link', _key: `${key}link`, href}],
    children: [{_type: 'span', _key: `${key}span`, text: href, marks: [`${key}link`]}],
  }
}
