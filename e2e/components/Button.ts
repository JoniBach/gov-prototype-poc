import { Page, expect } from '@playwright/test';

export async function testButton(page: Page, config: any) {
	expect(true).toBe(true);
}

export async function useButton(page: Page, config: any) {
	const button = page.getByRole('button', { name: config.name });
	await button.click();
}

export const valueForButton = (config: any, value: any) => {
  if (config.validation && config.validation.includes('required')) {
    return value || 'Test button text';
  }
}

export default testButton;
