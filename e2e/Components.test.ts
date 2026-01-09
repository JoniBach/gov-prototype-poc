import { Page, test } from '@playwright/test';
import { components } from './componentUtils';
import { componentConfigs } from './componentUtils';

 async function testComponent(page: Page, componentName: string, config: any) {
	await page.goto('/components');

	for (const [key, value] of Object.entries(components)) {
		if (key === componentName) {
			await value(page, config);
		}
	}
}

const componentList = Object.keys(components);

for (const componentName of componentList) {
	test.describe(`${componentName} Component`, () => {
		test('should render and function correctly', async ({ page }) => {
			await testComponent(page, componentName, componentConfigs[componentName]);
		});
	});
}
