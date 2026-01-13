import { Page, test } from '@playwright/test';

import journeysIndex from "../../static/journeys/index.json" with { type: "json" };
import { components, componentConfigs } from '../componentUtils';
import { journeys } from './journeys';

// Filter journeys if JOURNEY_ID is set
let filteredJourneys = journeysIndex;
if (process.env.JOURNEY_ID) {
  const journey = journeysIndex.find(j => j.id === process.env.JOURNEY_ID);
  if (!journey) {
    console.error(`Journey ${process.env.JOURNEY_ID} not found`);
    process.exit(1);
  }
  filteredJourneys = [journey];
}

// Test statistics
let currentJourneyIndex = 0;
const totalJourneys = filteredJourneys.length;
let totalPagesTested = 0;
let totalComponentsTested = 0;
let totalComponentsSkipped = 0;
let totalErrors = 0;

// Global progress display variables
let currentJourney = 0;
let currentPage = 0;
let currentComponent = 0;
let currentComponentName = '';
let journeyTotalPages = 0;
let journeyTotalComponents = 0;
let globalTotalComponents = 0;
let globalCurrentComponent = 0;
let issues: string[] = [];
let positionSaved = false;

/**
 * Generate an ASCII progress bar
 */
function progressBar(percent: number): string {
    const width = 10;
    const filled = Math.round((percent / 100) * width);
    const bar = '='.repeat(filled) + '_'.repeat(width - filled);
    return `<${bar}>`;
}

/**
 * Render the progress display, overwriting previous output
 */
function renderProgress() {
    if (positionSaved) {
        // Move cursor up 7 lines to overwrite the previous display
        process.stderr.write('\x1b[7A');
    } else {
        positionSaved = true;
    }

    process.stderr.write('testing\n');
    process.stderr.write(`Journey:          ${currentJourney}/${totalJourneys}  ${progressBar((currentJourney / totalJourneys) * 100)}\n`);
    process.stderr.write(`Page:             ${currentPage}/${journeyTotalPages} ${progressBar(journeyTotalPages > 0 ? (currentPage / journeyTotalPages) * 100 : 0)}\n`);
    process.stderr.write(`Component:        ${currentComponentName.padEnd(12)} ${currentComponent}/${journeyTotalComponents} ${progressBar(journeyTotalComponents > 0 ? (currentComponent / journeyTotalComponents) * 100 : 0)}\n`);
    process.stderr.write(`journey progress: ${journeyTotalPages > 0 ? Math.round((currentPage / journeyTotalPages) * 100) : 0}% ${progressBar(journeyTotalPages > 0 ? Math.round((currentPage / journeyTotalPages) * 100) : 0)}\n`);
    process.stderr.write(`full progress:    ${globalTotalComponents > 0 ? Math.round((globalCurrentComponent / globalTotalComponents) * 100) : 0}% ${progressBar(globalTotalComponents > 0 ? Math.round((globalCurrentComponent / globalTotalComponents) * 100) : 0)}\n\n`);

    if (issues.length > 0) {
        process.stderr.write('issues:\n');
        issues.forEach(issue => process.stderr.write(issue + '\n'));
    }
}

/**
 * Visit the journey URL and run all component tests for all pages
 */
async function testJourney(page: Page, journey: any) {
    const fullJourney = journeys[journey.id];

    if (!fullJourney) {
        throw new Error(`Journey JSON not found for ID: ${journey.id}`);
    }

    const totalPages = fullJourney.length;
    const totalComponents = fullJourney.reduce((sum: number, p: any) => 
        sum + p.components.length, 0
    );

    // Initialize journey progress
    currentJourney++;
    currentPage = 0;
    currentComponent = 0;
    journeyTotalPages = totalPages;
    journeyTotalComponents = totalComponents;

    // Calculate global total components across all journeys
    globalTotalComponents = filteredJourneys.reduce((sum, j) => {
        const jData = journeys[j.id];
        return sum + jData.reduce((pSum: number, p: any) => pSum + p.components.length, 0);
    }, 0);

    // Initial render
    renderProgress();

    let totalProcessedComponents = 0;

    for (const [index, pageDef] of fullJourney.entries()) {
            const pageNumber = index + 1;
            
            // Update page progress
            currentPage = pageNumber;

            // Go to the specific page
            await page.goto(`/journey/${journey.id}?page=${index}`);

            // Update progress for testing this page
            renderProgress();

            let pageComponentsPassed = 0;
            let pageComponentsSkipped = 0;

            for (const componentDef of pageDef.components) {
                const { component, id, config } = componentDef;
                const testComponent = components[component as keyof typeof components];

                currentComponentName = component;

                if (!testComponent) {
                    pageComponentsSkipped++;
                    totalComponentsSkipped++;
                    currentComponent++;
                    globalCurrentComponent++;
                    renderProgress();
                    continue;
                }

                // Use journey config first, fall back to mock component config
                const componentConfig = config ?? componentConfigs[component as keyof typeof componentConfigs];

                if (!componentConfig) {
                    issues.push(`journey ${currentJourney} - page ${pageNumber} - component ${component} (${id}): no config`);
                    totalErrors++;
                    renderProgress();
                    throw new Error(`No config found for component "${component}" (${id})`);
                }

                try {
                    await testComponent(page, componentConfig);
                    pageComponentsPassed++;
                    totalComponentsTested++;
                    currentComponent++;
                    globalCurrentComponent++;
                    renderProgress();
                } catch (error) {
                    issues.push(`journey ${currentJourney} - page ${pageNumber} - component ${component} (${id}): ${error instanceof Error ? error.message : error}`);
                    totalErrors++;
                    currentComponent++;
                    globalCurrentComponent++;
                    renderProgress();
                    throw error;
                }
            }

            totalPagesTested++;
        }

}

/**
 * Generate Playwright tests dynamically from journeysIndex
 */

// Display header before all tests
test.beforeAll(() => {
    // Initial progress display
    renderProgress();
});

for (const journey of filteredJourneys) {
    test.describe(`${journey.id} Journey`, () => {
        test(`should render and function correctly`, async ({ page }) => {
            currentJourneyIndex++;
            
            await testJourney(page, journey);
        });
    });
}

// Display summary after all tests
test.afterAll(() => {
    // Clear screen and show final results
    process.stderr.write('\x1b[2J\x1b[H');
    process.stderr.write('testing complete\n');
    
    process.stderr.write(`Journeys:    ${totalJourneys} tested\n`);
    process.stderr.write(`Pages:       ${totalPagesTested} tested\n`);
    process.stderr.write(`Components:  ${totalComponentsTested} tested${totalComponentsSkipped > 0 ? `, ${totalComponentsSkipped} skipped` : ''}\n`);
    
    if (totalErrors > 0) {
        process.stderr.write(`Errors:      ${totalErrors} failed\n`);
    }
    
    process.stderr.write('\n');
    
    // Success/failure message
    if (totalErrors === 0) {
        process.stderr.write('All tests passed! 🎉\n');
    } else {
        process.stderr.write('Some tests failed ❌\n');
    }
});