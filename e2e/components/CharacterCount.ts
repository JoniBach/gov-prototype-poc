import { Page, expect } from '@playwright/test';

export async function testCharacterCount(page: Page, config: any) {
	await expect(page.locator(`#${config.id}`)).toBeVisible();
}

export default testCharacterCount;
