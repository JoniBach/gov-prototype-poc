import { Page, expect } from '@playwright/test';

export async function testRadios(page: Page, config: any) {
	// Anchor on this radio group
	const radio = page
		.locator(`input[type="radio"][name="${config.name}"]`)
		.first();

	await expect(radio).toBeVisible();

	// Walk up to form group using CSS traversal
	const formGroup = radio
		.locator('..') // input → div.govuk-radios__item
		.locator('..') // → div.govuk-radios
		.locator('..') // → fieldset
		.locator('..'); // → div.govuk-form-group

	await expect(formGroup).toHaveClass(/govuk-form-group/);

	// Fieldset
	const fieldset = formGroup.locator('fieldset.govuk-fieldset');
	await expect(fieldset).toBeVisible();

	// Legend
	const legendHeading = fieldset.locator('.govuk-fieldset__heading');
	await expect(legendHeading).toHaveText(config.fieldset.legend.text);

	// Radios container
	const radios = fieldset.locator('.govuk-radios');
	await expect(radios).toBeVisible();

	// Correct number of radios
	const inputs = radios.locator('input[type="radio"]');
	await expect(inputs).toHaveCount(config.items.length);

	// Validate each radio
	for (let index = 0; index < config.items.length; index++) {
		const item = config.items[index];

		const expectedId =
			item.id || `${config.name}${index > 0 ? '-' + (index + 1) : ''}`;

		const input = radios.locator(`#${expectedId}`);
		const label = radios.locator(`label[for="${expectedId}"]`);

		await expect(input).toHaveAttribute('name', config.name);
		await expect(input).toHaveAttribute('value', item.value);
		await expect(label).toHaveText(item.text);

		if (item.checked) {
			await expect(input).toBeChecked();
		} else {
			await expect(input).not.toBeChecked();
		}
	}
}

export default testRadios;
