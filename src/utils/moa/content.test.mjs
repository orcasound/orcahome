import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

import { resolveMoaContent } from './content.mjs'

const fallback = JSON.parse(
  fs.readFileSync(new URL('../../data/moaContent.json', import.meta.url))
)

test('fallback JSON has 21 members in Google Doc order, 3 sections, and an agreement statement', () => {
  assert.equal(fallback.members.length, 21)
  assert.equal(fallback.members[0].organization, 'Beam Reach')
  assert.equal(fallback.members[20].organization, 'The Salish Sea School')
  assert.equal(fallback.sections.length, 3)
  assert.deepEqual(
    fallback.sections.map((s) => s.heading),
    ['Preamble', 'Benefits of membership', 'Member responsibilities']
  )
  assert.ok(fallback.agreementStatement.trim().length > 0)
})

test('null, undefined, and non-object Sanity input return the fallback', () => {
  for (const input of [null, undefined, 'x', 42, []]) {
    const out = resolveMoaContent(input, fallback)
    assert.deepEqual(out, resolveMoaContent(null, fallback))
    assert.equal(out.title, fallback.title)
    assert.equal(out.members.length, 21)
    assert.equal(out.sections.length, 3)
  }
})

test('returns a copy, not the fallback objects themselves', () => {
  const out = resolveMoaContent(null, fallback)
  assert.notEqual(out.members, fallback.members)
  assert.notEqual(out.members[0], fallback.members[0])
  out.members[0].organization = 'changed'
  assert.equal(fallback.members[0].organization, 'Beam Reach')
})

test('strings fall back per field; whitespace-only counts as empty', () => {
  const out = resolveMoaContent(
    { title: '  New title  ', subtitle: '   ', agreementStatement: '' },
    fallback
  )
  assert.equal(out.title, 'New title')
  assert.equal(out.subtitle, fallback.subtitle)
  assert.equal(out.agreementStatement, fallback.agreementStatement)
})

test('empty sections and members arrays fall back', () => {
  const out = resolveMoaContent({ sections: [], members: [] }, fallback)
  assert.equal(out.sections.length, 3)
  assert.equal(out.members.length, 21)
})

test('sections without a heading or content are dropped and empty strings removed', () => {
  const out = resolveMoaContent(
    {
      sections: [
        { heading: 'Kept', paragraphs: ['  one ', '', '  '], items: null },
        { heading: '  ', paragraphs: ['no heading'] },
        { heading: 'No content', paragraphs: [''], items: ['  '] },
        null,
      ],
    },
    fallback
  )
  assert.deepEqual(out.sections, [
    { heading: 'Kept', paragraphs: ['one'], items: [] },
  ])
})

test('falls back when every Sanity section is invalid', () => {
  const out = resolveMoaContent({ sections: [{ heading: '' }] }, fallback)
  assert.equal(out.sections.length, 3)
})

test('members without an organization are dropped; strings are trimmed', () => {
  const out = resolveMoaContent(
    {
      members: [
        {
          organization: '  Org A ',
          nodeAndRole: ' node\nrole ',
          dateJoined: '2020-01-02',
        },
        { organization: '   ', dateJoined: '2020-01-02' },
        { nodeAndRole: 'x' },
      ],
    },
    fallback
  )
  assert.deepEqual(out.members, [
    {
      organization: 'Org A',
      nodeAndRole: 'node\nrole',
      dateJoined: '2020-01-02',
    },
  ])
})

test('falls back when every Sanity member is invalid', () => {
  const out = resolveMoaContent({ members: [{ organization: '' }] }, fallback)
  assert.equal(out.members.length, 21)
})

test('bad dates pass through for the card to handle', () => {
  const out = resolveMoaContent(
    { members: [{ organization: 'A', dateJoined: '2023-02-30' }] },
    fallback
  )
  assert.equal(out.members[0].dateJoined, '2023-02-30')
})

test('member url keeps only http(s) URLs', () => {
  const out = resolveMoaContent(
    {
      members: [
        { organization: 'Script', url: 'javascript:alert(1)' },
        { organization: 'Invalid', url: 'not a url' },
        { organization: 'Ftp', url: 'ftp://x.org' },
        { organization: 'Https', url: 'https://x.org' },
        { organization: 'Http', url: ' http://y.org/path ' },
      ],
    },
    fallback
  )
  const byOrg = Object.fromEntries(out.members.map((m) => [m.organization, m]))
  assert.equal(byOrg.Script.url, undefined)
  assert.equal(byOrg.Invalid.url, undefined)
  assert.equal(byOrg.Ftp.url, undefined)
  assert.equal(byOrg.Https.url, 'https://x.org/')
  assert.equal(byOrg.Http.url, 'http://y.org/path')
})

test('sourceDocUrl falls back unless it is an http(s) URL', () => {
  assert.equal(
    resolveMoaContent({ sourceDocUrl: 'javascript:alert(1)' }, fallback)
      .sourceDocUrl,
    fallback.sourceDocUrl
  )
  assert.equal(
    resolveMoaContent({ sourceDocUrl: 'not a url' }, fallback).sourceDocUrl,
    fallback.sourceDocUrl
  )
  assert.equal(
    resolveMoaContent({ sourceDocUrl: 'https://example.org/moa' }, fallback)
      .sourceDocUrl,
    'https://example.org/moa'
  )
})

test('fallback member URLs and logos survive resolution', () => {
  const out = resolveMoaContent(null, fallback)
  const orcaNetwork = out.members.find((m) => m.organization === 'Orca Network')
  assert.equal(orcaNetwork.url, 'http://www.orcanetwork.org/')
  assert.equal(
    orcaNetwork.logoUrl,
    '/images/donatePartners/Orca-Network-Logo.svg'
  )
  assert.equal(out.sourceDocUrl, fallback.sourceDocUrl)
})
