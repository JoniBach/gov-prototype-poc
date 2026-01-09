import { Page, expect } from '@playwright/test';

export async function testServiceNavigation(page: Page, config: any) {
	await expect(page.locator('h2:has-text("ServiceNavigation")')).toBeVisible();
}

export default testServiceNavigation;
