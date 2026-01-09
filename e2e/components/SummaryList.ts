import { Page, expect } from '@playwright/test';

export async function testSummaryList(page: Page, config: any) {
	await expect(page.locator('h2:has-text("SummaryList")')).toBeVisible();
}

export default testSummaryList;
