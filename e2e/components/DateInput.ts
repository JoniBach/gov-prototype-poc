import { Page, expect, test } from '@playwright/test';

export async function testDateInput(page: Page, config: any) {
  const actualConfig = Array.isArray(config) ? config[0] : config;
  const formGroup = page.locator('.govuk-form-group').filter({ hasText: actualConfig.fieldset.legend.text }).nth(0);
  const fieldset = page.locator('fieldset.govuk-fieldset').filter({ has: page.locator(`#${actualConfig.id}`) });
  const legend = fieldset.locator('.govuk-fieldset__legend');
  const heading = fieldset.locator('.govuk-fieldset__heading');
  const hint = actualConfig.hint ? page.locator(`#${actualConfig.id}-hint`) : null;
  const dateInput = page.locator(`#${actualConfig.id}`);
  const dayInput = page.locator(`#${actualConfig.id}-day`);
  const monthInput = page.locator(`#${actualConfig.id}-month`);
  const yearInput = page.locator(`#${actualConfig.id}-year`);

  await test.step('Form group is present', async () => {
    await expect(formGroup).toBeAttached();
  });

  await test.step('Fieldset is correct', async () => {
    await expect(fieldset).toBeVisible();
    await expect(fieldset).toHaveAttribute('role', 'group');
    if (actualConfig.hint) {
      await expect(fieldset).toHaveAttribute('aria-describedby', `${actualConfig.id}-hint`);
    }
  });

  await test.step('Legend is correct', async () => {
    await expect(legend).toBeVisible();
    await expect(legend).toContainText(actualConfig.fieldset.legend.text);
    if (actualConfig.fieldset.legend.classes && actualConfig.fieldset.legend.classes !== "null") {
      await expect(legend).toHaveClass(new RegExp(actualConfig.fieldset.legend.classes));
    }
  });

  await test.step('Heading is correct', async () => {
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(actualConfig.fieldset.legend.text);
    await expect(heading).toHaveClass(/govuk-fieldset__heading/);
  });

  await test.step('Hint text is present', async () => {
    if (actualConfig.hint) {
      const hint = page.locator(`#${actualConfig.id}-hint`);
      await expect(hint).toBeVisible();
      await expect(hint).toContainText(actualConfig.hint);
      await expect(hint).toHaveClass(/govuk-hint/);
    }
  });

  await test.step('Date input container is present', async () => {
    await expect(dateInput).toBeVisible();
    await expect(dateInput).toHaveClass(/govuk-date-input/);
    await expect(dateInput).toHaveAttribute('id', actualConfig.id);
  });

  await test.step('Day input has correct attributes', async () => {
    await expect(dayInput).toBeVisible();
    await expect(dayInput).toHaveAttribute('id', `${actualConfig.id}-day`);
    await expect(dayInput).toHaveAttribute('name', `${actualConfig.name}-day`);
    await expect(dayInput).toHaveAttribute('type', 'text');
    await expect(dayInput).toHaveAttribute('inputmode', 'numeric');
    await expect(dayInput).toHaveClass(/govuk-input/);
    await expect(dayInput).toHaveClass(/govuk-date-input__input/);
    await expect(dayInput).toHaveClass(/govuk-input--width-2/);
  });

  await test.step('Month input has correct attributes', async () => {
    await expect(monthInput).toBeVisible();
    await expect(monthInput).toHaveAttribute('id', `${actualConfig.id}-month`);
    await expect(monthInput).toHaveAttribute('name', `${actualConfig.name}-month`);
    await expect(monthInput).toHaveAttribute('type', 'text');
    await expect(monthInput).toHaveAttribute('inputmode', 'numeric');
    await expect(monthInput).toHaveClass(/govuk-input/);
    await expect(monthInput).toHaveClass(/govuk-date-input__input/);
    await expect(monthInput).toHaveClass(/govuk-input--width-2/);
  });

  await test.step('Year input has correct attributes', async () => {
    await expect(yearInput).toBeVisible();
    await expect(yearInput).toHaveAttribute('id', `${actualConfig.id}-year`);
    await expect(yearInput).toHaveAttribute('name', `${actualConfig.name}-year`);
    await expect(yearInput).toHaveAttribute('type', 'text');
    await expect(yearInput).toHaveAttribute('inputmode', 'numeric');
    await expect(yearInput).toHaveClass(/govuk-input/);
    await expect(yearInput).toHaveClass(/govuk-date-input__input/);
    await expect(yearInput).toHaveClass(/govuk-input--width-4/);
  });

  await test.step('Day input is focusable and accepts input', async () => {
    await dayInput.focus();
    await expect(dayInput).toBeFocused();
    await dayInput.fill('27');
    await expect(dayInput).toHaveValue('27');
  });

  await test.step('Month input is focusable and accepts input', async () => {
    await monthInput.focus();
    await expect(monthInput).toBeFocused();
    await monthInput.fill('03');
    await expect(monthInput).toHaveValue('03');
  });

  await test.step('Year input is focusable and accepts input', async () => {
    await yearInput.focus();
    await expect(yearInput).toBeFocused();
    await yearInput.fill('2007');
    await expect(yearInput).toHaveValue('2007');
  });

  await test.step('Date inputs handle keyboard navigation', async () => {
    await dayInput.press('Tab');
    await expect(monthInput).toBeFocused();
    await monthInput.press('Tab');
    await expect(yearInput).toBeFocused();
    await yearInput.press('Tab');
    // After tab, focus should move away
  });
}

export default testDateInput;
