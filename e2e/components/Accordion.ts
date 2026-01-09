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
      const button = sections.nth(i).locator('.govuk-accordion__section-button');
      await expect(button).toContainText(config.sections[i].heading);
    }
  });

  await test.step('Sections have correct initial expanded state', async () => {
    for (let i = 0; i < config.sections.length; i++) {
      const section = sections.nth(i);
      const button = section.locator('.govuk-accordion__section-button');
      const expectedExpanded = config.sections[i].expanded || false;

      if (expectedExpanded) {
        await expect(section).toHaveClass(/govuk-accordion__section--expanded/);
        await expect(button).toHaveAttribute('aria-expanded', 'true');
      } else {
        await expect(button).toHaveAttribute('aria-expanded', 'false');
      }
    }
  });

  await test.step('Section content has correct aria attributes', async () => {
    for (let i = 0; i < config.sections.length; i++) {
      const button = sections.nth(i).locator('.govuk-accordion__section-button');
      const content = sections.nth(i).locator('.govuk-accordion__section-content');
      
      const contentId = `${config.id}-content-${i + 1}`;

      // Test aria-controls and content id
      await expect(button).toHaveAttribute('aria-controls', contentId);
      await expect(content).toHaveAttribute('id', contentId);
      
      // Only test aria-labelledby if the button has an id
      const buttonId = await button.getAttribute('id');
      if (buttonId) {
        await expect(content).toHaveAttribute('aria-labelledby', buttonId);
      }
    }
  });

  await test.step('Section content is correct', async () => {
    for (let i = 0; i < config.sections.length; i++) {
      const content = sections.nth(i).locator('.govuk-accordion__section-content');
      const expectedContent = config.sections[i].content;
      
      // Check if content contains expected text (strips HTML for comparison)
      const textContent = expectedContent.replace(/<[^>]*>/g, '').trim();
      if (textContent) {
        await expect(content).toContainText(textContent);
      }
    }
  });

  await test.step('Buttons have correct type and aria-label attributes', async () => {
    const buttons = accordion.locator('.govuk-accordion__section-button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      await expect(button).toHaveAttribute('type', 'button');
      await expect(button).toHaveAttribute('aria-label');
    }
  });

  await test.step('Sections can be toggled by clicking', async () => {
    // Test toggling the first section
    const firstSection = sections.first();
    const firstButton = firstSection.locator('.govuk-accordion__section-button');
    const initialExpanded = await firstButton.getAttribute('aria-expanded');

    await firstButton.focus();
    await firstButton.click();
    
    // Wait for the state to change
    await expect(firstButton).toHaveAttribute(
      'aria-expanded',
      initialExpanded === 'true' ? 'false' : 'true'
    );

    // Toggle back
    await firstButton.focus();
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', initialExpanded);
  });

  await test.step('Keyboard navigation works', async () => {
    const firstButton = sections.first().locator('.govuk-accordion__section-button');
    
    // Focus the button
    await firstButton.focus();
    await expect(firstButton).toBeFocused();

    // Get initial state
    const initialState = await firstButton.getAttribute('aria-expanded');
    
    // Test Enter key
    await firstButton.press('Enter');
    await expect(firstButton).toHaveAttribute(
      'aria-expanded',
      initialState === 'true' ? 'false' : 'true'
    );

    // Test Space key (toggle back)
    await firstButton.press('Space');
    await expect(firstButton).toHaveAttribute('aria-expanded', initialState);
  });

  await test.step('Multiple sections can be expanded simultaneously', async () => {
    if (config.sections.length >= 2) {
      const firstButton = sections.nth(0).locator('.govuk-accordion__section-button');
      const secondButton = sections.nth(1).locator('.govuk-accordion__section-button');

      // Ensure both start collapsed
      if ((await firstButton.getAttribute('aria-expanded')) === 'true') {
        await firstButton.click();
      }
      if ((await secondButton.getAttribute('aria-expanded')) === 'true') {
        await secondButton.click();
      }

      // Expand both sections
      await firstButton.click();
      await secondButton.click();

      // Both should be expanded
      await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    }
  });

  await test.step('Content visibility matches aria-expanded state', async () => {
    for (let i = 0; i < Math.min(config.sections.length, 3); i++) {
      const section = sections.nth(i);
      const button = section.locator('.govuk-accordion__section-button');
      const content = section.locator('.govuk-accordion__section-content');

      const isExpanded = (await button.getAttribute('aria-expanded')) === 'true';
      
      if (isExpanded) {
        await expect(content).toBeVisible();
      }
      
      // Toggle and check visibility changes
      await button.click();
      
      if (isExpanded) {
        // Was expanded, now should be collapsed - may still be visible during animation
        await expect(button).toHaveAttribute('aria-expanded', 'false');
      } else {
        // Was collapsed, now should be expanded
        await expect(button).toHaveAttribute('aria-expanded', 'true');
        await expect(content).toBeVisible();
      }
    }
  });
}

export default testAccordion;