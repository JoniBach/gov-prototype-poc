import { Page, expect, test } from '@playwright/test';

export async function testBreadcrumbs(page: Page, config: any) {
  const breadcrumbs = page.locator('.govuk-breadcrumbs');

  await test.step('Breadcrumbs navigation is visible', async () => {
    await expect(breadcrumbs).toBeVisible();
  });

  await test.step('Has correct ARIA label', async () => {
    await expect(breadcrumbs).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  await test.step('Breadcrumbs is a nav element', async () => {
    const tagName = await breadcrumbs.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('nav');
  });

  await test.step('Has correct list structure', async () => {
    const list = breadcrumbs.locator('ol.govuk-breadcrumbs__list');
    await expect(list).toBeVisible();
    
    const tagName = await list.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('ol');
  });

  const listItems = breadcrumbs.locator('.govuk-breadcrumbs__list-item');

  await test.step('All breadcrumb items are present', async () => {
    await expect(listItems).toHaveCount(config.items.length);
  });

  await test.step('Breadcrumb items have correct text', async () => {
    for (let i = 0; i < config.items.length; i++) {
      const item = listItems.nth(i);
      await expect(item).toContainText(config.items[i].text);
    }
  });

  await test.step('Links are rendered correctly', async () => {
    for (let i = 0; i < config.items.length; i++) {
      const item = listItems.nth(i);
      const expectedItem = config.items[i];

      if (expectedItem.href) {
        // Should have a link
        const link = item.locator('a.govuk-breadcrumbs__link');
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', expectedItem.href);
        await expect(link).toHaveText(expectedItem.text);
      } else {
        // Should not have a link (current page)
        const link = item.locator('a.govuk-breadcrumbs__link');
        await expect(link).toHaveCount(0);
        await expect(item).toHaveText(expectedItem.text);
      }
    }
  });

  await test.step('Current page item (without href) is not a link', async () => {
    const itemsWithoutHref = config.items.filter((item: any) => !item.href);
    
    if (itemsWithoutHref.length > 0) {
      for (let i = 0; i < config.items.length; i++) {
        if (!config.items[i].href) {
          const item = listItems.nth(i);
          const links = item.locator('a');
          await expect(links).toHaveCount(0);
        }
      }
    }
  });

  await test.step('Links are keyboard accessible', async () => {
    const links = breadcrumbs.locator('a.govuk-breadcrumbs__link');
    const linkCount = await links.count();

    if (linkCount > 0) {
      const firstLink = links.first();
      await firstLink.focus();
      await expect(firstLink).toBeFocused();
    }
  });

  await test.step('Links are clickable and have valid hrefs', async () => {
    const links = breadcrumbs.locator('a.govuk-breadcrumbs__link');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      
      // Verify href exists and is not empty
      expect(href).toBeTruthy();
      expect(href).not.toBe('');
      
      // Verify the link is clickable (but don't actually click to avoid navigation)
      await expect(link).toBeEnabled();
    }
  });

  await test.step('Breadcrumbs follow correct order', async () => {
    for (let i = 0; i < config.items.length; i++) {
      const item = listItems.nth(i);
      await expect(item).toContainText(config.items[i].text);
      
      // Verify order by checking that items appear in sequence
      if (i > 0) {
        const previousItem = listItems.nth(i - 1);
        const currentBox = await item.boundingBox();
        const previousBox = await previousItem.boundingBox();
        
        if (currentBox && previousBox) {
          // Current item should be to the right or below the previous item
          expect(
            currentBox.x >= previousBox.x || currentBox.y > previousBox.y
          ).toBeTruthy();
        }
      }
    }
  });

  await test.step('Last item is typically the current page', async () => {
    if (config.items.length > 0) {
      const lastItem = config.items[config.items.length - 1];
      const lastListItem = listItems.last();
      
      await expect(lastListItem).toContainText(lastItem.text);
      
      // Often (but not always) the last item has no href
      if (!lastItem.href) {
        const link = lastListItem.locator('a');
        await expect(link).toHaveCount(0);
      }
    }
  });

  await test.step('Each item is contained in a list item', async () => {
    const count = await listItems.count();
    
    for (let i = 0; i < count; i++) {
      const item = listItems.nth(i);
      const tagName = await item.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('li');
    }
  });
}

export default testBreadcrumbs;