import { Page, expect } from '@playwright/test';

export async function testTag(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Tag")')).toBeVisible();
}

export default testTag;
