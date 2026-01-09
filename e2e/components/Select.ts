import { Page, expect } from '@playwright/test';

export async function testSelect(page: Page, config: any) {
	const select = page.locator(`#${config.id}`);
	const errorMessage = page.locator(`#${config.id}-error`);
	const formGroup = page.locator('.govuk-form-group');

	// Select exists
	await expect(select).toBeVisible();

	// ---- INVALID VALUE ----
	if (config.invalidValue) {
		await select.selectOption(config.invalidValue);

		// Error message should appear
		await expect(errorMessage).toBeVisible();
		await expect(errorMessage).toContainText(config.expectedError);

		// GOV.UK error classes applied
		await expect(formGroup).toHaveClass(/govuk-form-group--error/);
		await expect(select).toHaveClass(/govuk-select--error/);

		// aria-describedby is set
		await expect(select).toHaveAttribute(
			'aria-describedby',
			`${config.id}-error`
		);
	}

	// ---- VALID VALUE ----
	if (config.validValue) {
		await select.selectOption(config.validValue);

		// Error message removed
		await expect(errorMessage).toBeHidden();

		// Error classes removed
		await expect(formGroup).not.toHaveClass(/govuk-form-group--error/);
		await expect(select).not.toHaveClass(/govuk-select--error/);

		// aria-describedby removed
		await expect(select).not.toHaveAttribute('aria-describedby');
	}
}

export default testSelect;
