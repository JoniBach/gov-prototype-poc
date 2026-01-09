import { Page, expect } from '@playwright/test';

export async function testTaskList(page: Page, config: any) {
	await expect(page.locator('h2:has-text("TaskList")')).toBeVisible();
}

export default testTaskList;
