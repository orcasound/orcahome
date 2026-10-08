import AxeBuilder from '@axe-core/playwright'
import { expect,test } from '@playwright/test'

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

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

// test('get started link', async ({ page }) => {
//   await page.goto('/');

//   //Orcasound | listen live for orcas

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
