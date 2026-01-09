import { Page, expect } from '@playwright/test';

export async function testSkipLink(page: Page, config: any) {
	await expect(page.locator('h2:has-text("SkipLink")')).toBeVisible();
}

export default testSkipLink;
