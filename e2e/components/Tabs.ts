import { Page, expect } from '@playwright/test';

export async function testTabs(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Tabs")')).toBeVisible();
}

export default testTabs;
