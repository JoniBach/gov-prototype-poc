import { Page, expect } from '@playwright/test';

export async function testBreadcrumbs(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Breadcrumbs")')).toBeVisible();
}

export default testBreadcrumbs;
