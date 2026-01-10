import { Page, expect } from '@playwright/test';

export async function testSelect(page: Page, config: any) {
	const select = page.locator(`#${config.id}`);
	const formGroup = page.locator('.govuk-form-group').filter({ has: page.locator(`#${config.id}`) });
	const label = page.locator(`label[for="${config.id}"]`);

	await expect(formGroup).toBeVisible();

	await expect(label).toBeVisible();
	await expect(label).toContainText(config.label.text);
	await expect(label).toHaveClass(/govuk-label/);

	await expect(select).toBeVisible();
	await expect(select).toHaveAttribute('id', config.id);
	await expect(select).toHaveAttribute('name', config.name);
	await expect(select).toHaveClass(/govuk-select/);

	for (const item of config.items) {
		const option = select.locator(`option[value="${item.value}"]`);
		await expect(option).toBeAttached();
		await expect(option).toContainText(item.text);
	}

	await select.focus();
	await expect(select).toBeFocused();

	if (config.items.length > 0) {
		await select.selectOption(config.items[0].value);
		await expect(select).toHaveValue(config.items[0].value);
	}

	await select.press('Tab');
	// After tab, focus should move away
}

export default testSelect;
