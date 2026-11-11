import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

import {buildMoaDocument} from './moa-seed-utils.mjs'

const json = JSON.parse(
  fs.readFileSync(new URL('../../src/data/moaContent.json', import.meta.url)),
)

test('document id and type are fixed for the singleton', () => {
  const doc = buildMoaDocument(json)
  assert.equal(doc._id, 'moaContent')
  assert.equal(doc._type, 'moaContent')
  assert.equal(doc.title, json.title)
  assert.equal(doc.agreementStatement, json.agreementStatement)
})

test('sections and members get _key and _type; strings stay plain arrays', () => {
  const doc = buildMoaDocument(json)
  assert.equal(doc.sections.length, 3)
  assert.deepEqual(
    doc.sections.map((s) => s._key),
    ['section-01', 'section-02', 'section-03'],
  )
  for (const s of doc.sections) {
    assert.equal(s._type, 'moaSection')
    assert.ok(s.paragraphs.every((p) => typeof p === 'string'))
    assert.ok(s.items.every((p) => typeof p === 'string'))
  }
  assert.equal(doc.members.length, 21)
  assert.equal(doc.members[0]._key, 'member-01')
  assert.equal(doc.members[20]._key, 'member-21')
  for (const m of doc.members) assert.equal(m._type, 'moaMember')
})

test('logoUrl is not copied', () => {
  const doc = buildMoaDocument(json)
  assert.ok(doc.members.every((m) => !('logoUrl' in m)))
  assert.ok(json.members.some((m) => m.logoUrl))
})
