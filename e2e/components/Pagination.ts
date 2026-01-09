import { Page, expect } from '@playwright/test';

export async function testPagination(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Pagination")')).toBeVisible();
}

export default testPagination;
