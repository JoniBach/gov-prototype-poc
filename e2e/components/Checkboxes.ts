import { Page, expect } from '@playwright/test';

export async function testCheckboxes(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Checkboxes")')).toBeVisible();
}

export default testCheckboxes;
