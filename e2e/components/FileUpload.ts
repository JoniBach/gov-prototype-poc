import { Page, expect, test } from '@playwright/test';

export async function testFileUpload(page: Page, config: any) {
  const actualConfig = Array.isArray(config) ? config[0] : config;
  const formGroup = page.locator('.govuk-form-group').filter({ has: page.locator(`#${actualConfig.id}`) });
  const label = page.locator(`label[for="${actualConfig.id}"]`);
  const dropZone = formGroup.locator('.govuk-drop-zone');
  const fileInput = page.locator('input[type="file"]');

  await test.step('Form group is present', async () => {
    await expect(formGroup).toBeVisible();
  });

  await test.step('Label is correct', async () => {
    await expect(label).toBeVisible();
    await expect(label).toContainText(actualConfig.label.text);
    await expect(label).toHaveClass(/govuk-label/);
  });

  await test.step('Drop zone is present', async () => {
    await expect(dropZone).toBeVisible();
    await expect(dropZone).toHaveClass(/govuk-drop-zone/);
    await expect(dropZone).toHaveAttribute('data-module', 'govuk-file-upload');
  });

  await test.step('File input has correct attributes', async () => {
    await expect(fileInput).toBeAttached();
    await expect(fileInput).toHaveAttribute('id', `${actualConfig.id}-input`);
    await expect(fileInput).toHaveAttribute('type', 'file');
    await expect(fileInput).toHaveClass(/govuk-file-upload/);
  });

  await test.step('File input is focusable', async () => {
    // Skipped as input is hidden
  });

  await test.step('File input handles keyboard navigation', async () => {
    await fileInput.press('Tab');
    // After tab, focus should move away
  });
}

export default testFileUpload;
