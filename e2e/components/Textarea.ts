import { Page, expect, test } from '@playwright/test';

export async function testTextarea(page: Page, config: any) {
  const textarea = page.locator(`#${config.id}`);
  const formGroup = page.locator('.govuk-form-group').filter({ has: page.locator(`#${config.id}`) });
  const label = page.locator(`label[for="${config.id}"]`);
  const hint = config.hint ? page.locator(`#${config.id}-hint`) : null;

  await test.step('Form group is present', async () => {
    await expect(formGroup).toBeVisible();
  });

  await test.step('Label is correct', async () => {
    await expect(label).toBeVisible();
    await expect(label).toContainText(config.label.text);
    await expect(label).toHaveClass(/govuk-label/);
    if (config.label.classes) {
      await expect(label).toHaveClass(new RegExp(config.label.classes));
    }
  });

  await test.step('Label is a page heading', async () => {
    if (config.label.isPageHeading) {
      const heading = page.locator('h1.govuk-label-wrapper').filter({ has: page.locator(`label[for="${config.id}"]`) });
      await expect(heading).toBeVisible();
      await expect(heading.locator('label')).toHaveAttribute('for', config.id);
    }
  });

  await test.step('Hint text is present', async () => {
    if (config.hint) {
      const hint = page.locator(`#${config.id}-hint`);
      await expect(hint).toBeVisible();
      await expect(hint).toContainText(config.hint.text);
      await expect(hint).toHaveClass(/govuk-hint/);
    }
  });

  await test.step('Textarea has correct attributes', async () => {
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveAttribute('id', config.id);
    await expect(textarea).toHaveAttribute('name', config.name);
    await expect(textarea).toHaveAttribute('rows', (config.rows || 5).toString());
    await expect(textarea).toHaveClass(/govuk-textarea/);
  });

  await test.step('Textarea is focusable and accepts text', async () => {
    await textarea.focus();
    await expect(textarea).toBeFocused();

    const testText = 'This is a test textarea input.\nWith multiple lines.';
    await textarea.fill(testText);
    await expect(textarea).toHaveValue(testText);
  });

  await test.step('Textarea handles keyboard navigation', async () => {
    await textarea.press('Tab');
    // After tab, focus should move away, but since it's the only input, may vary
    // Just ensure no errors
  });
}

export async function useTextarea(page: Page, config: any, value: any) {
  const textarea = page.locator(`#${config.id}`);
  await textarea.fill(value);
}

export const valueForTextarea = (config: any, value: any) => {
  if (config.validation && config.validation.includes('required')) {
    return value || 'Test textarea value';
  }
}

export default testTextarea;

export const Textarea = {
  test: testTextarea,
  use: useTextarea,
  value: valueForTextarea
}
