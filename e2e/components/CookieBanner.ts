import { Page, expect } from '@playwright/test';

export async function testCookieBanner(page: Page, config: any) {
	await expect(page.locator('h2:has-text("CookieBanner")')).toBeVisible();
}

export default testCookieBanner;
