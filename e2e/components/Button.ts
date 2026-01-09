import { Page, expect } from '@playwright/test';

export async function testButton(page: Page, config: any) {
	await expect(page.locator('h2:has-text("Button")')).toBeVisible();
}

export default testButton;
