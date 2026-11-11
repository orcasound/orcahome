import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('home page has the expected title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Orcasound | listen live for orcas')
  await page.screenshot({
    path: 'test-results/home-page.png',
    fullPage: true,
  })
})
test('home page smoke + a11y check', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Orcasound | listen live for orcas')

  const results = await new AxeBuilder({ page }).analyze()

  expect.soft(results.violations).toEqual([])
})
