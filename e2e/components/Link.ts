import { Page } from '@playwright/test';

export async function testLink(page: Page, config: any) {
	// Placeholder for link testing
}

export async function useLink(page: Page, config: any) {
	const link = page.getByRole('link', { name: config.name });
	await link.click();
}

export default testLink;
