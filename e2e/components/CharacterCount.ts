import { Page, expect, test } from '@playwright/test';

export async function testCharacterCount(page: Page, config: any) {
  const input = page.locator(`#${config.id}`);
  const label = page.locator(`label[for="${config.id}"]`);
  const formGroup = page.locator('.govuk-form-group').filter({ has: page.locator(`#${config.id}`) });
  const hint = config.hint ? page.locator(`#${config.id}-hint`) : null;
  const countMessage = page.locator(`#${config.id}-info`);

  await test.step('Form group is present', async () => {
    await expect(formGroup).toBeVisible();
  });

  await test.step('Label is correct', async () => {
    await expect(label).toBeVisible();
    await expect(label).toContainText(config.label);
    await expect(label).toHaveClass(/govuk-label/);
  });

  await test.step('Hint text is present', async () => {
    if (config.hint && hint) {
      await expect(hint).toBeVisible();
      await expect(hint).toContainText(config.hint);
      await expect(hint).toHaveClass(/govuk-hint/);
    }
  });

  await test.step('Textarea has correct attributes', async () => {
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('id', config.id);
    await expect(input).toHaveAttribute('name', config.name);
    await expect(input).toHaveAttribute('rows', (config.rows || 5).toString());
    await expect(input).toHaveClass(/govuk-textarea/);
  });

  await test.step('Character count is present', async () => {
    await expect(countMessage).toBeVisible();
    await expect(countMessage).toHaveClass(/govuk-character-count__message/);
    // Check it contains character count text
    await expect(countMessage).toContainText('characters');
  });

  await test.step('Textarea is focusable and accepts text', async () => {
    await input.focus();
    await expect(input).toBeFocused();

    const testText = 'This is a test character count input.';
    await input.fill(testText);
    await expect(input).toHaveValue(testText);
  });

  await test.step('Textarea handles keyboard navigation', async () => {
    await input.press('Tab');
    // After tab, focus should move away
  });
}

export default testCharacterCount;
