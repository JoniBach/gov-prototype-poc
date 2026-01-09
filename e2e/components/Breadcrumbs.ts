import { Page, expect } from '@playwright/test';

export async function testBreadcrumbs(page: Page, config: any) {
	await expect(page.locator('.govuk-breadcrumbs')).toBeVisible();
}

export default testBreadcrumbs;
