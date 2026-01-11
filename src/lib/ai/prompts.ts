import { 
  blacklistSchemaList, 
  configurationSchema, 
  HighLevelMultiPageSchema, 
  JourneyIndexSchema 
} from '../components/schema.ts';
import { useOpenAI } from './openai.ts';
import { 
  addUniqueObjectToJson, 
  createJson, 
  fetchJsonFile, 
  getObjectById, 
  removeObjectsByKeys,
  addJourneyToJourneysMap
} from './files.ts';
import ora from 'ora';
import chalk from 'chalk';
import cliProgress from 'cli-progress';

/**
 * Generate the journey index/blueprint from a description
 */
export async function generateJourneyIndex(description: string) {
  const spinner = ora({
    text: 'Calling AI to generate journey blueprint...',
    color: 'cyan'
  }).start();

  try {
    const indexResponse = await useOpenAI({
      model: 'gpt-4o-mini',
      system: "You are a service designer defining the purpose, goals, and high-level requirements for a GOV.UK service based on the input description.",
      user: `Create a service blueprint for: ${description}`,
      schema: JourneyIndexSchema,
    });

    const journeyIndex = indexResponse;
    
    spinner.text = 'Saving journey index...';
    addUniqueObjectToJson('static/journeys/index.json', journeyIndex);
    
    spinner.succeed(chalk.green(`Journey index created: ${chalk.bold(journeyIndex.id)}`));
    
    return journeyIndex;
  } catch (error) {
    spinner.fail(chalk.red('Failed to generate journey index'));
    throw error;
  }
}

/**
 * Filter out blacklisted components from the array
 */
export async function filterOutUnwantedComponents(array: any[]) {
  const filteredArray = removeObjectsByKeys(array, 'component', blacklistSchemaList);
  const removedCount = array.length - filteredArray.length;
  
  if (removedCount > 0) {
    console.log(chalk.gray(`   Filtered out ${removedCount} blacklisted component(s)`));
  }
  
  return filteredArray;
}

/**
 * Generate high-level journey structure (pages and components)
 */
export async function generateHighLevelJourney(journeyId: string) {
  const spinner = ora({
    text: 'Loading journey index...',
    color: 'cyan'
  }).start();

  try {
    const content = getObjectById('static/journeys/index.json', journeyId);
    
    spinner.text = 'Calling AI to design page flows and layouts...';
    
    const response = await useOpenAI({
      model: 'gpt-5.1',
      system: `You are an interaction designer defining page flows, information hierarchy, and interaction patterns for a GOV.UK service prototype, deciding pages, layouts, and component placements. 
      IMPORTANT OUTPUT RULES (MUST FOLLOW):
      - Every component must have an "id" string.
      - Component "id" values MUST be globally unique across ALL pages.
      - Never reuse an id, even on different pages.
      - Treat component ids as stable identifiers.
      `,
      user: `${JSON.stringify(content)}`,
      schema: HighLevelMultiPageSchema,
    });

    spinner.text = 'Filtering components...';
    const postProcessed = await filterOutUnwantedComponents(response.pages);

    spinner.text = 'Saving high-level journey...';
    createJson(`static/journeys/${journeyId}.json`, postProcessed);
    
    spinner.succeed(chalk.green(`Generated ${chalk.bold(postProcessed.length)} page(s)`));
    
    return postProcessed;
  } catch (error) {
    spinner.fail(chalk.red('Failed to generate high-level journey'));
    throw error;
  }
}

/**
 * Generate configuration for a single component
 */
export async function generateComponentConfig(component: { component: string; id: string }) {
  const componentSchema = configurationSchema[component.component];

  if (!componentSchema) {
    throw new Error(`Unknown component type: ${component.component}`);
  }

  const response = await useOpenAI({
    model: 'gpt-4o-mini',
    system: `You are a UX/UI designer fleshing out configurations for GOV.UK components, including labels, hints, validations, and default values to ensure usability and standards compliance.`,
    user: JSON.stringify(component),
    schema: componentSchema,
  });

  return response;
}

/**
 * Generate all component configs for a single page
 */
export async function generateLowLevelPage(page: any, progressBar?: any, pageIndex?: number, totalPages?: number) {
  // Update progress bar if provided
  if (progressBar) {
    progressBar.update(pageIndex || 0, {
      page: page.title,
      status: 'processing'
    });
  }

  console.log(chalk.gray(`   Processing: ${chalk.white(page.title)}`));

  // Generate all component configs in parallel
  const componentPromises = page.components.map(async (component: any) => {
    const config = await generateComponentConfig(component);
    return {
      component: component.component,
      id: component.id,
      config: config.config,
    };
  });

  const components = await Promise.all(componentPromises);

  console.log(chalk.green(`   ✓ Completed: ${chalk.white(page.title)}`));

  // Update progress bar on completion
  if (progressBar) {
    progressBar.increment(1, {
      page: page.title,
      status: 'complete'
    });
  }

  return {
    title: page.title,
    components: components,
  };
}

/**
 * Generate low-level details for entire journey
 */
export async function generateLowLevelJourney(journeyId: string) {
  const highLevelJourney = fetchJsonFile(`static/journeys/${journeyId}.json`);

  console.log(chalk.cyan(`\n   Processing ${chalk.bold(highLevelJourney.length)} page(s)...\n`));

  // Create progress bar
  const progressBar = new cliProgress.SingleBar({
    format: '   {bar} | {percentage}% | {value}/{total} Pages | Current: {page} | {status}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: false,
    stopOnComplete: true,
  }, cliProgress.Presets.shades_classic);

  progressBar.start(highLevelJourney.length, 0, {
    page: 'Starting...',
    status: 'initializing'
  });

  try {
    // Generate all pages in parallel with progress tracking
    const pagePromises = highLevelJourney.map(async (page: any, index: number) => {
      const result = await generateLowLevelPage(page, progressBar, index, highLevelJourney.length);
      return result;
    });

    const lowLevelJourney = await Promise.all(pagePromises);

    progressBar.stop();
    
    console.log(chalk.green(`   ✓ All pages processed successfully\n`));

    // Save the results
    const saveSpinner = ora('Saving complete journey...').start();
    createJson(`static/journeys/${journeyId}.json`, lowLevelJourney);
    saveSpinner.succeed(chalk.green('Journey saved to disk'));

    // Update the journeys map
    addJourneyToJourneysMap(journeyId);

    return lowLevelJourney;
  } catch (error) {
    progressBar.stop();
    throw error;
  }
}