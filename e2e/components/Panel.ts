import { Page, expect } from '@playwright/test';

export async function testPanel(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Panel")')).toBeVisible();
}

export default testPanel;
