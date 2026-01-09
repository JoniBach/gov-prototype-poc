import { Page, expect } from '@playwright/test';

export async function testBackLink(page: Page, config: any) {
	await expect(page.locator('h2:has-text("BackLink")')).toBeVisible();
}

export default testBackLink;
