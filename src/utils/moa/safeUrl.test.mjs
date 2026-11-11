import assert from 'node:assert/strict'
import test from 'node:test'

import { safeHttpUrl, safeLinkHref } from './safeUrl.mjs'

test('safeLinkHref rejects javascript: in any case, with whitespace or control chars', () => {
  for (const href of [
    'javascript:alert(1)',
    'JAVASCRIPT:alert(1)',
    '  JavaScript:alert(1)',
    '\u0001\u0000javascript:alert(1)',
    'java\tscript:alert(1)',
    'java\nscr\ript:alert(1)',
    ' \t JAVA\tSCRIPT:alert(1) ',
  ]) {
    assert.equal(safeLinkHref(href), undefined, JSON.stringify(href))
  }
})

test('safeLinkHref rejects protocol-relative, data:, and other schemes', () => {
  for (const href of [
    '//evil.example',
    ' //evil.example',
    '/\\evil.example',
    '/\t/evil.example',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'ftp://example.org',
    'relative/path',
    '',
    '   ',
    undefined,
    null,
    42,
  ]) {
    assert.equal(safeLinkHref(href), undefined, JSON.stringify(href))
  }
})

test('safeLinkHref allows https, mailto, same-site paths, and anchors', () => {
  assert.equal(
    safeLinkHref('https://www.orcasound.net/'),
    'https://www.orcasound.net/'
  )
  assert.equal(
    safeLinkHref(' http://example.org/a?b=1 '),
    'http://example.org/a?b=1'
  )
  assert.equal(
    safeLinkHref('mailto:info@example.org'),
    'mailto:info@example.org'
  )
  assert.equal(safeLinkHref('/getinvolved'), '/getinvolved')
  assert.equal(safeLinkHref('/'), '/')
  assert.equal(safeLinkHref('#moa'), '#moa')
})

test('safeHttpUrl keeps only absolute http(s) URLs', () => {
  assert.equal(safeHttpUrl('https://example.org'), 'https://example.org/')
  assert.equal(safeHttpUrl('mailto:info@example.org'), undefined)
  assert.equal(safeHttpUrl('javascript:alert(1)'), undefined)
  assert.equal(safeHttpUrl('/path'), undefined)
  assert.equal(safeHttpUrl('//example.org'), undefined)
  assert.equal(safeHttpUrl(''), undefined)
})
