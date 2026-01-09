import { Page, expect } from '@playwright/test';

export async function testGOVUKFooter(page: Page, config: any) {
	await expect(page.locator('h2:has-text("GOVUKFooter")')).toBeVisible();
}

export default testGOVUKFooter;
