import { Page, expect } from '@playwright/test';

export async function testExitThisPage(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Exit this page")')).toBeVisible();
}

export default testExitThisPage;
