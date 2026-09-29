import {JSDOM} from 'jsdom'

import {digest} from './blog-audio-utils.mjs'

export {digest}

const norm = (text) => (text || '').replace(/\s+/g, ' ').trim()

// Parse the WordPress comment threads out of a saved article snapshot into a
// flat, ordered list carrying each comment's reply depth (#428). Read-only
// archive: we keep author, date, text, and depth — no reply UI.
export function sourceComments(html) {
  const doc = new JSDOM(html).window.document
  const list = doc.querySelector('.comment-list, ol.commentlist')
  if (!list) return []
  const comments = []
  // querySelectorAll returns comments in threaded document order (a parent
  // immediately before its nested replies), which is the order we render.
  for (const li of list.querySelectorAll('li.comment, li[id^="comment-"]')) {
    // This comment's own content lives in its direct comment-body; nested
    // replies sit in a separate `ol.children`, so scope to the direct child.
    const scope =
      li.querySelector(':scope > article, :scope > .comment-body') || li
    const author = norm(
      scope.querySelector('.comment-author .fn, cite.fn, .fn, cite')?.textContent,
    )
    const date =
      scope.querySelector('time[datetime]')?.getAttribute('datetime') || null
    const body = norm(scope.querySelector('.comment-content')?.textContent)
    const depth = Number((li.className.match(/depth-(\d+)/) || [])[1] || 1)
    if (!body && !author) continue
    const comment = {author: author || 'Anonymous', body, depth}
    if (date) comment.date = date
    comments.push(comment)
  }
  doc.defaultView.close()
  return comments
}
