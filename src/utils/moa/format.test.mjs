import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

import { formatMoaDate } from './format.mjs'

test('formats an ISO date as a short US date', () => {
  assert.equal(formatMoaDate('2016-03-04'), 'Mar 4, 2016')
  assert.equal(formatMoaDate('2024-09-30'), 'Sep 30, 2024')
})

test('returns an empty string for invalid input', () => {
  for (const bad of [
    '2023-02-30',
    '2016-3-4',
    '',
    undefined,
    null,
    42,
    'x2016-03-04',
  ]) {
    assert.equal(formatMoaDate(bad), '', String(bad))
  }
})

for (const TZ of ['America/Los_Angeles', 'Asia/Tokyo']) {
  test(`is time zone independent (${TZ})`, () => {
    const r = spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        "import {formatMoaDate} from './src/utils/moa/format.mjs'; process.stdout.write(formatMoaDate('2016-03-04'))",
      ],
      { env: { ...process.env, TZ }, encoding: 'utf8' }
    )
    assert.equal(r.status, 0, r.stderr)
    assert.equal(r.stdout, 'Mar 4, 2016')
  })
}
