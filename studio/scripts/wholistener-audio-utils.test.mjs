import assert from 'node:assert/strict'
import test from 'node:test'
import {
  WHOLISTENER_S3_BASE,
  rewriteWholistenerUrl,
  rewriteWholistenerBody,
} from './wholistener-audio-utils.mjs'

for (const origin of [
  'http://orcasound.net',
  'https://orcasound.net',
  'http://www.orcasound.net',
  'https://www.orcasound.net',
]) {
  test(`rewrites ${origin} and preserves the complete suffix`, () => {
    assert.equal(
      rewriteWholistenerUrl(`${origin}/wholistener/2010/Calls%20A.MP3?_=123&download=1#t=4`),
      `${WHOLISTENER_S3_BASE}2010/Calls%20A.MP3?_=123&download=1#t=4`,
    )
  })
}

test('leaves unrelated and already migrated URLs untouched', () => {
  for (const url of [
    'https://www.orcasound.net/wp-content/uploads/clip.mp3',
    'https://www.orcasound.net/wholistener-other/clip.mp3',
    'https://www.orcasound.net/wholistener',
    'https://not-orcasound.net/wholistener/clip.mp3',
    'https://www.orcasound.net.example.com/wholistener/clip.mp3',
    'https://example.org/wholistener/clip.mp3',
    '/wholistener/clip.mp3',
    `${WHOLISTENER_S3_BASE}clip.mp3`,
  ])
    assert.equal(rewriteWholistenerUrl(url), url)
})

test('recurses into links, restored spans and custom audio sources without mutating the input', () => {
  const oldUrl = 'https://www.orcasound.net/wholistener/clip.mp3'
  const other = 'https://www.orcasound.net/wp-content/uploads/other.mp3'
  const original = [
    {
      _type: 'block',
      _key: 'text',
      markDefs: [{href: oldUrl}],
      children: [{text: oldUrl, marks: ['audio']}],
    },
    {
      _type: 'audio',
      _key: 'custom',
      sources: [{url: oldUrl}, {src: other}],
      caption: `Listen: ${oldUrl} and ${oldUrl}`,
      count: 3,
      optional: null,
    },
  ]
  const snapshot = structuredClone(original)
  const result = rewriteWholistenerBody(original)
  assert.deepEqual(original, snapshot)
  assert.equal(result.changes.length, 5)
  assert.equal(result.body[0].markDefs[0].href, `${WHOLISTENER_S3_BASE}clip.mp3`)
  assert.equal(result.body[0].children[0].text, `${WHOLISTENER_S3_BASE}clip.mp3`)
  assert.equal(result.body[1].sources[0].url, `${WHOLISTENER_S3_BASE}clip.mp3`)
  assert.equal(result.body[1].sources[1].src, other)
  assert.equal(result.body[1].count, 3)
  assert.equal(result.body[1].optional, null)
  assert.deepEqual(result.body[0].children[0].marks, ['audio'])
  assert.equal(result.changes[0].path, 'body[0].markDefs[0].href')
  assert.deepEqual(rewriteWholistenerBody(result.body), {body: result.body, changes: []})
})

test('preserves empty bodies and matches case-insensitive origins', () => {
  assert.deepEqual(rewriteWholistenerBody(null), {body: null, changes: []})
  assert.deepEqual(rewriteWholistenerBody([]), {body: [], changes: []})
  assert.equal(
    rewriteWholistenerUrl('HTTPS://WWW.ORCASOUND.NET/wholistener/Clip.mp3'),
    `${WHOLISTENER_S3_BASE}Clip.mp3`,
  )
})
