import { Page, test } from '@playwright/test';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import ora from 'ora';

import journeysIndex from "../../static/journeys/index.json" with { type: "json" };
import { components, componentConfigs } from '../componentUtils';
import { journeys } from './journeys';

// Test statistics
let currentJourneyIndex = 0;
const totalJourneys = journeysIndex.length;
let totalPagesTested = 0;
let totalComponentsTested = 0;
let totalComponentsSkipped = 0;
let totalErrors = 0;

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

    console.log(chalk.cyan(`\n━━━ Testing: ${chalk.bold(journey.id)} ━━━`));
    console.log(chalk.gray(`   ${totalPages} pages • ${totalComponents} components\n`));

    // Create single progress bar that updates with current status
    const progressBar = new cliProgress.SingleBar({
        clearOnComplete: false,
        hideCursor: true,
        format: '   {bar} | {percentage}% | Page {currentPage}/{totalPages} | {pageName}',
        barCompleteChar: '█',
        barIncompleteChar: '░',
    }, cliProgress.Presets.shades_classic);

    progressBar.start(totalPages, 0, { 
        currentPage: 0,
        totalPages: totalPages,
        pageName: 'Starting...'
    });

    try {
        let totalProcessedComponents = 0;

        for (const [index, pageDef] of fullJourney.entries()) {
            const pageNumber = index + 1;
            
            // Update to show we're loading this page
            progressBar.update(index, { 
                currentPage: pageNumber,
                totalPages: totalPages,
                pageName: `Loading: ${pageDef.title}`
            });

            // Go to the specific page
            await page.goto(`/journey/${journey.id}?page=${index}`);

            // Update to show we're testing this page
            progressBar.update(index, { 
                currentPage: pageNumber,
                totalPages: totalPages,
                pageName: `Testing: ${pageDef.title}`
            });

            let pageComponentsPassed = 0;
            let pageComponentsSkipped = 0;

            for (const componentDef of pageDef.components) {
                const { component, id, config } = componentDef;
                const testComponent = components[component];

                if (!testComponent) {
                    pageComponentsSkipped++;
                    totalComponentsSkipped++;
                    totalProcessedComponents++;
                    continue;
                }

                // Use journey config first, fall back to mock component config
                const componentConfig = config ?? componentConfigs[component];

                if (!componentConfig) {
                    progressBar.stop();
                    throw new Error(`No config found for component "${component}" (${id})`);
                }

                try {
                    await testComponent(page, componentConfig);
                    pageComponentsPassed++;
                    totalComponentsTested++;
                    totalProcessedComponents++;
                } catch (error) {
                    progressBar.stop();
                    console.error(chalk.red(`\n   ✗ Failed: ${component} (${id})`));
                    console.error(chalk.red(`     ${error instanceof Error ? error.message : error}`));
                    totalErrors++;
                    throw error;
                }
            }

            // Move progress bar forward
            progressBar.increment(1, { 
                currentPage: pageNumber,
                totalPages: totalPages,
                pageName: `✓ ${pageDef.title} (${pageComponentsPassed} tested${pageComponentsSkipped > 0 ? `, ${pageComponentsSkipped} skipped` : ''})`
            });
            
            totalPagesTested++;
        }

        progressBar.stop();
        
        console.log(chalk.green(`\n   ✓ Complete: ${totalPages} pages • ${totalProcessedComponents} components\n`));

    } catch (error) {
        progressBar.stop();
        throw error;
    }
}

/**
 * Generate Playwright tests dynamically from journeysIndex
 */

// Display header before all tests
test.beforeAll(() => {
    console.log(chalk.cyan('\n╔════════════════════════════════════════╗'));
    console.log(chalk.cyan('║  ') + chalk.cyan.bold('Playwright E2E Test Suite') + chalk.cyan('         ║'));
    console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));
    
    console.log(chalk.bold('  Test Plan:'));
    console.log(chalk.gray('  ───────────────────────────────────────'));
    
    journeysIndex.forEach((journey, index) => {
        const journeyData = journeys[journey.id];
        const pageCount = journeyData?.length || 0;
        const componentCount = journeyData?.reduce((sum: number, p: any) => 
            sum + p.components.length, 0) || 0;
        
        const prefix = index === journeysIndex.length - 1 ? '  └─' : '  ├─';
        console.log(chalk.gray(`${prefix} ${chalk.white(journey.id)}`));
        console.log(chalk.gray(`     ${pageCount} pages • ${componentCount} components`));
    });
    
    console.log(chalk.gray('  ───────────────────────────────────────'));
    console.log(chalk.gray(`  Total: ${chalk.white(totalJourneys)} journey(s)\n`));
});

for (const journey of journeysIndex) {
    test.describe(`${journey.id} Journey`, () => {
        test(`should render and function correctly`, async ({ page }) => {
            currentJourneyIndex++;
            
            console.log(chalk.blue(`\n[${currentJourneyIndex}/${totalJourneys}] `) + chalk.bold(journey.id));
            
            if (journey.title) {
                console.log(chalk.gray(`   ${journey.title}`));
            }
            
            await testJourney(page, journey);
        });
    });
}

// Display summary after all tests
test.afterAll(() => {
    console.log(chalk.cyan('\n╔════════════════════════════════════════╗'));
    console.log(chalk.cyan('║  ') + chalk.green.bold('✓ Test Suite Complete!') + chalk.cyan('             ║'));
    console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));
    
    console.log(chalk.bold('  Final Results:'));
    console.log(chalk.gray('  ───────────────────────────────────────'));
    console.log(`  ${chalk.bold('Journeys:')}    ${chalk.green(totalJourneys)} tested`);
    console.log(`  ${chalk.bold('Pages:')}       ${chalk.green(totalPagesTested)} tested`);
    console.log(`  ${chalk.bold('Components:')}  ${chalk.green(totalComponentsTested)} tested${totalComponentsSkipped > 0 ? `, ${chalk.yellow(totalComponentsSkipped)} skipped` : ''}`);
    
    if (totalErrors > 0) {
        console.log(`  ${chalk.bold('Errors:')}      ${chalk.red(totalErrors)} failed`);
    }
    
    console.log(chalk.gray('  ───────────────────────────────────────\n'));
    
    // Success/failure message
    if (totalErrors === 0) {
        console.log(chalk.green.bold('  All tests passed! 🎉\n'));
    } else {
        console.log(chalk.red.bold('  Some tests failed ❌\n'));
    }
});