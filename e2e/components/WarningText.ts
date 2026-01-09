import { Page, expect } from '@playwright/test';

export async function testWarningText(page: Page, config: any) {
	await expect(page.locator('h2:has-text("WarningText")')).toBeVisible();
}

export default testWarningText;
