import { Page, expect } from '@playwright/test';

export async function testRadios(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Radios")')).toBeVisible();
}

export default testRadios;
