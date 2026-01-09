import { Page, expect } from '@playwright/test';

export async function testTable(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Table")')).toBeVisible();
}

export default testTable;
