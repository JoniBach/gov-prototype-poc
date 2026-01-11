import { Page, expect, test } from '@playwright/test';

export async function testRadios(page: Page, config: any) {
  const formGroup = page.locator('.govuk-form-group').filter({ hasText: config.fieldset.legend.text });
  const fieldset = formGroup.locator('fieldset.govuk-fieldset');
  const legend = fieldset.locator('.govuk-fieldset__legend');
  const radios = fieldset.locator('.govuk-radios');

  await test.step('Form group is present', async () => {
    await expect(formGroup).toBeVisible();
  });

  await test.step('Fieldset is correct', async () => {
    await expect(fieldset).toBeVisible();
  });

  await test.step('Legend is correct', async () => {
    await expect(legend).toBeVisible();
    await expect(legend).toContainText(config.fieldset.legend.text);
    if (config.fieldset.legend.classes) {
      await expect(legend).toHaveClass(new RegExp(config.fieldset.legend.classes));
    }
  });

  await test.step('Radios container is present', async () => {
    await expect(radios).toBeVisible();
  });

  await test.step('Correct number of radios', async () => {
    const inputs = radios.locator('input[type="radio"]');
    await expect(inputs).toHaveCount(config.items.length);
  });

  await test.step('Radios are present and correct', async () => {
    for (const item of config.items) {
      const radio = radios.locator(`input[value="${item.value}"]`);
      await expect(radio).toBeVisible();
      await expect(radio).toHaveAttribute('value', item.value);
      if (item.checked) {
        await expect(radio).toBeChecked();
      } else {
        await expect(radio).not.toBeChecked();
      }
    }
  });

  await test.step('Radios are focusable and interactive', async () => {
    for (const item of config.items) {
      const radio = radios.locator(`input[value="${item.value}"]`);
      await radio.focus();
      await expect(radio).toBeFocused();
      // Select if not checked
      if (!(await radio.isChecked())) {
        await radio.check();
        await expect(radio).toBeChecked();
      }
    }
  });
}

export default testRadios;
