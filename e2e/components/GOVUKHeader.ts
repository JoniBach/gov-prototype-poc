import { Page, expect } from '@playwright/test';

export async function testGOVUKHeader(page: Page, config: any) {
	await expect(page.locator('h2:has-text("GOVUKHeader")')).toBeVisible();
}

export default testGOVUKHeader;
