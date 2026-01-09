import { Page, test, expect } from '@playwright/test';
// @ts-ignore
import journeysIndex from '../../static/journeys/index.json' with { type: 'json' };
// @ts-ignore
import passportApplicationService from '../../static/journeys/passport-application-service.json' with { type: 'json' };

const journeyData: Record<string, any[]> = {
  'passport-application-service': passportApplicationService,
};

for (const journey of journeysIndex) {
  test.describe(`${journey.name} Journey`, () => {
    const pages = journeyData[journey.id];
    pages.forEach((journeyPage, index) => {
      test(`Page ${index + 1}: ${journeyPage.title}`, async ({ page }) => {
        await page.goto(`/journey/${journey.id}`);
        await page.waitForSelector('#phase-banner-start');
        for (let i = 0; i < index; i++) {
          const prevPage = pages[i];
          const buttonComp = prevPage.components.find((c: any) => c.component === 'Button');
          if (buttonComp) {
            await page.click(`button:has-text("${buttonComp.config.text}")`);
          }
        }
        for (const component of journeyPage.components) {
          await expect(page.locator(`#${component.id}`)).toBeVisible();
        }
      });
    });
  });
}