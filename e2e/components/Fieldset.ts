import { Page, expect } from '@playwright/test';

export async function testFieldset(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Fieldset")')).toBeVisible();
}

export default testFieldset;
