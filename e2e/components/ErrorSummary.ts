import { Page, expect } from '@playwright/test';

export async function testErrorSummary(page: Page, config: any) {
	await expect(page.locator('h2:has-text("ErrorSummary")')).toBeVisible();
}

export default testErrorSummary;
