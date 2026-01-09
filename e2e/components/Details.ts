import { Page, expect } from '@playwright/test';

export async function testDetails(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Details")')).toBeVisible();
}

export default testDetails;
