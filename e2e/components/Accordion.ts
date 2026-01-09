import { Page, expect, test } from '@playwright/test';

export async function testAccordion(page: Page, config: any) {
  const accordion = page.locator(
    `[data-module="govuk-accordion"]#${config.id}`
  );

  await test.step('Accordion is visible', async () => {
    await expect(accordion).toBeVisible();
  });

  const sections = accordion.locator('.govuk-accordion__section');

  await test.step('All sections are present', async () => {
    await expect(sections).toHaveCount(config.sections.length);
  });

  await test.step('Section headings are correct', async () => {
    for (let i = 0; i < config.sections.length; i++) {
      await expect(
        sections.nth(i).locator('.govuk-accordion__section-button')
      ).toContainText(config.sections[i].heading);
    }
  });
}
export default testAccordion
