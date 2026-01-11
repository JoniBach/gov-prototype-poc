import { Page, expect, test } from '@playwright/test';

export async function testCheckboxes(page: Page, config: any) {
  const formGroup = page.locator('.govuk-form-group').filter({ hasText: config.fieldset.legend.text }).nth(0);
  const fieldset = formGroup.locator('fieldset.govuk-fieldset');
  const legend = fieldset.locator('.govuk-fieldset__legend');
  const hint = config.hint ? page.locator(`#${config.name}-hint`) : null;

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

  await test.step('Hint text is present', async () => {
    if (config.hint && hint) {
      await expect(hint).toBeVisible();
      await expect(hint).toContainText(config.hint);
      await expect(hint).toHaveClass(/govuk-hint/);
    }
  });

  await test.step('Checkboxes are present and correct', async () => {
    for (const item of config.items) {
      const checkbox = page.getByRole('checkbox', { name: item.text });
      await expect(checkbox).toBeVisible();
      await expect(checkbox).toHaveAttribute('value', item.value);
      if (item.checked) {
        await expect(checkbox).toBeChecked();
      } else {
        await expect(checkbox).not.toBeChecked();
      }
    }
  });

  await test.step('Checkboxes are focusable and interactive', async () => {
    for (const item of config.items) {
      const checkbox = page.getByRole('checkbox', { name: item.text });
      await checkbox.focus();
      await expect(checkbox).toBeFocused();
      // Toggle if not checked
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
      }
    }
  });
}

export default testCheckboxes;
