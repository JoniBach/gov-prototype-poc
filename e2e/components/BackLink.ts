import { Page, expect } from '@playwright/test';

export async function testBackLink(page: Page, config: any) {
	await expect(page.locator('.govuk-back-link')).toBeVisible();
}

export default testBackLink;
