import { Page, expect } from '@playwright/test';

export async function testAccordion(page: Page, config: any) {
	const accordion = page.locator(`[data-module="govuk-accordion"]#${config.id}`);
	await expect(accordion).toBeVisible();

	// Check that all sections are present
	const sections = accordion.locator('.govuk-accordion__section');
	await expect(sections).toHaveCount(config.sections.length);

	// Check section headings
	for (let i = 0; i < config.sections.length; i++) {
		await expect(sections.nth(i).locator('.govuk-accordion__section-button')).toContainText(config.sections[i].heading);
	}

	// Test expand and collapse
	const firstSection = sections.nth(0);
	const firstButton = firstSection.locator('.govuk-accordion__section-button');
	const firstContent = firstSection.locator('.govuk-accordion__section-content');

	// Check initial state - sections collapsed
	await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
	await expect(firstContent).not.toBeVisible();

	// Click to expand first section
	await firstButton.click();
	await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
	await expect(firstContent).toBeVisible();

	// Click to collapse first section
	await firstButton.click();
	await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
	await expect(firstContent).not.toBeVisible();

	// Test second section if exists
	if (config.sections.length > 1) {
		const secondSection = sections.nth(1);
		const secondButton = secondSection.locator('.govuk-accordion__section-button');
		const secondContent = secondSection.locator('.govuk-accordion__section-content');

		// Initially collapsed
		await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
		await expect(secondContent).not.toBeVisible();

		// Click to expand
		await secondButton.click();
		await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
		await expect(secondContent).toBeVisible();

		// Click to collapse
		await secondButton.click();
		await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
		await expect(secondContent).not.toBeVisible();
	}

	// Test content display
	await firstButton.click();
	await expect(firstContent).toContainText(config.sections[0].content);
	await firstButton.click(); // collapse
}

export default testAccordion