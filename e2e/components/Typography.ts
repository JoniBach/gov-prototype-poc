import { Page, expect } from '@playwright/test';

export async function testTypography(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Typography")')).toBeVisible();
}

export default testTypography;
