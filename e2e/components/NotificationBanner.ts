import { Page, expect } from '@playwright/test';

export async function testNotificationBanner(page: Page, config: any) {
	await expect(page.locator('h2:has-text("NotificationBanner")')).toBeVisible();
}

export default testNotificationBanner;
