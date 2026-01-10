import { Page, test } from '@playwright/test';

import journeysIndex from "../../static/journeys/index.json" with { type: "json" };
import { components, componentConfigs } from '../componentUtils';
import passportApplication001 from "../../static/journeys/passport-application-001.json" with { type: "json" };

// Map of journey ID -> journey JSON
const journeys: Record<string, any> = {
    "passport-application-001": passportApplication001,
};

/**
 * Visit the journey URL and run all component tests for all pages
 */
async function testJourney(page: Page, journey: any) {
    const fullJourney = journeys[journey.id];

    if (!fullJourney) {
        throw new Error(`Journey JSON not found for ID: ${journey.id}`);
    }

    for (const [index, pageDef] of fullJourney.entries()) {
        // Go to the specific page
        await page.goto(`/journey/${journey.id}?page=${index}`);

        // Optional: log current page
        console.log(`Testing page: ${pageDef.title}`);

        for (const componentDef of pageDef.components) {
            const { component, id, config } = componentDef;
            const testComponent = components[component];

            if (!testComponent) {
                test.skip(`No test registered for component "${component}" (${id})`);
                continue;
            }

            // Use journey config first, fall back to mock component config
            const componentConfig = config ?? componentConfigs[component];

            if (!componentConfig) {
                throw new Error(`No config found for component "${component}" (${id})`);
                }

            await testComponent(page, componentConfig);
        }
    }
}

/**
 * Generate Playwright tests dynamically from journeysIndex
 */
for (const journey of journeysIndex) {
    test.describe(`${journey.id} Journey`, () => {
        test(`should render and function correctly`, async ({ page }) => {
            await testJourney(page, journey);
        });
    });
}
