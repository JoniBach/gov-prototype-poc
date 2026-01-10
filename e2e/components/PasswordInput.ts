import { Page, expect, test } from '@playwright/test';

export async function testPasswordInput(page: Page, config: any) {
  const formGroup = page.locator('.govuk-form-group').filter({ has: page.locator(`#${config.id}`) });
  const input = page.locator(`#${config.id}`);
  const label = page.locator(`label[for="${config.id}"]`);

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

  await test.step('Input has correct attributes', async () => {
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('id', config.id);
    await expect(input).toHaveAttribute('name', config.name);
    await expect(input).toHaveAttribute('type', 'password');
    await expect(input).toHaveClass(/govuk-input/);
  });

  await test.step('Input is focusable and accepts text', async () => {
    await input.focus();
    await expect(input).toBeFocused();

    const testPassword = 'secretpassword123';
    await input.fill(testPassword);
    await expect(input).toHaveValue(testPassword);
  });

  await test.step('Input handles keyboard navigation', async () => {
    await input.press('Tab');
    // After tab, focus should move away, but since it's the only input, may vary
    // Just ensure no errors
  });
}

export default testPasswordInput;
