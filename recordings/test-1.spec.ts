import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.gov.uk/estimate-income-tax');
  await page.getByRole('button', { name: 'Start now' }).click();
  await page.getByRole('textbox', { name: 'Income amount' }).click();
  await page.getByRole('textbox', { name: 'Income amount' }).fill('123456');
  await page.getByRole('radio', { name: 'Yearly' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('radio', { name: 'Yes' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Calculate take-home pay' }).click();
  await page.getByRole('heading', { name: '£81,954 a year' }).click();
  await page.getByText('£123,456.00').click();
  await page.getByText('£842.00').click();
  await page.getByText('£122,614.00').click();
  await page.getByText('£7,540.00').click();
  await page.getByText('£33,962.00').click();
  await page.getByLabel('Yearly').getByText('£0.00').click();
  await page.getByText('£81,954.00').click();
});