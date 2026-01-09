import { Page, expect } from '@playwright/test';

export async function testPhaseBanner(page: Page, config: any) {
	await expect(page.locator('h2:has-text("PhaseBanner")')).toBeVisible();
}

export default testPhaseBanner;
