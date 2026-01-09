import { Page, expect } from '@playwright/test';

export async function testErrorMessage(page: Page, config: any) {
	await expect(page.locator('h2:has-text("ErrorMessage")')).toBeVisible();
}

export default testErrorMessage;
