import assert from 'node:assert/strict'
import test from 'node:test'

import {
  audioBlock,
  bodyClips,
  clipId,
  digest,
  insertionAnchor,
  sourceClips,
} from './blog-audio-utils.mjs'

const base = 'https://www.orcasound.net/blog/example/'
const parse = (html) =>
  sourceClips(
    `<article class="entry-content">${html}</article>
  <aside><audio src="/sidebar.mp3"></audio></aside>`,
    base,
  )
const block = (key, text) => ({_type: 'block', _key: key, children: [{text}]})

test('snapshot comparison ignores JSON property order but preserves block order', () => {
  assert.equal(digest([{a: 1, b: {x: 2, y: 3}}]), digest([{b: {y: 3, x: 2}, a: 1}]))
  assert.notEqual(digest([1, 2]), digest([2, 1]))
})

test('audio identity ignores format and cache-busters, but not distinct filenames', () => {
  assert.equal(clipId(`${base}clip.mp3?_=1`), clipId(`${base}clip.ogg`))
  assert.notEqual(clipId(`${base}clip.mp3`), clipId(`${base}other.mp3`))
  assert.equal(clipId('javascript:alert(1)'), null)
})

test('exclude global sidebar audio, ignore malformed unrelated links', () => {
  const clips = parse(
    '<p>Listen here.</p><a href="http://[invalid">Bad link</a><audio src="/clip.mp3"></audio>',
  )
  assert.equal(clips.length, 1)
  assert.equal(clips[0].id, 'clip')
  assert.deepEqual(clips[0].precedingText, ['Listen here.'])
})

test('one WP player is one recording even with typo or renamed alternate source', () => {
  const clips = parse(
    '<audio><source src="/22018-clip.mp3"><source src="/2018-clip.ogg"></audio><a href="/2018-clip.mp3">Download</a>',
  )
  assert.equal(clips.length, 1)
  assert.deepEqual(clips[0].ids, ['22018-clip', '2018-clip'])
  const existing = bodyClips([{markDefs: [{href: `${base}2018-clip.mp3`}]}])
  assert.equal(clips.filter((clip) => !clip.ids.some((id) => existing.has(id))).length, 0)
})

test('distinct players stay distinct and repeated formats deduplicate', () => {
  const clips = parse(
    '<audio src="/one.mp3"></audio><audio src="/two.ogg"></audio><audio src="/one.ogg"></audio>',
  )
  assert.equal(clips.length, 2)
  assert.equal(clips[0].urls.length, 2)
})

test('only anchor to unambiguous existing text, never invent placement', () => {
  const body = [block('intro', 'Introduction'), block('a', 'Listen'), block('b', 'Listen')]
  assert.equal(insertionAnchor(body, {precedingText: ['Introduction', 'Listen']}), 'intro')
  assert.equal(insertionAnchor(body, {precedingText: ['Listen']}), null)
  assert.equal(insertionAnchor(body, {precedingText: ['Missing paragraph']}), null)
})

test('restored link uses the verified source and is recognized on rerun', () => {
  const clips = parse('<audio><source src="/typo.mp3"><source src="/clip.ogg"></audio>')
  clips[0].media = {ok: true, url: 'https://www.orcasound.net/clip.ogg'}
  const restored = audioBlock(clips[0])
  assert.equal(restored.markDefs[0].href, clips[0].media.url)
  assert.deepEqual(audioBlock(clips[0]), restored)
  assert.equal(
    clips.filter((clip) => !clip.ids.some((id) => bodyClips([restored]).has(id))).length,
    0,
  )
})
