import { configurationSchema, HighLevelMultiPageSchema, JourneyIndexSchema, MultiPageSchema } from '../components/schema.ts';
import { useOpenAI } from './openai.ts';
import { addUniqueObjectToJson, createJson, fetchJsonFile, getObjectById, removeObjectsByKeys } from './files.ts';
import _ from 'lodash';

async function generateJourneyIndex(description) {
  const indexResponse = await useOpenAI({
    model: 'gpt-4o-mini',
    system: "You are a service designer defining the purpose, goals, and high-level requirements for a GOV.UK service based on the input description.",
    user: `Create a service blueprint for: ${description}`,
    schema: JourneyIndexSchema,
  })

  const journeyIndex = indexResponse;
  addUniqueObjectToJson('static/journeys/index.json', journeyIndex);
  console.log("Index Response:", journeyIndex)

  return journeyIndex
}

async function filterOutUnwantedComponents(array) {

  const unwantedComponents = [
    "GOVUKFooter",
    'GOVUKHeader',
  ]

  const filteredArray = removeObjectsByKeys(array, 'component', unwantedComponents)

  return filteredArray
}

async function generateHighLevelJourney(journeyId: string) {
  console.log("Generating high level journey")
  const content = getObjectById('static/journeys/index.json', journeyId);
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
  })

  const postProcessed = await filterOutUnwantedComponents(response.pages)

  console.log('postProcessed - ', postProcessed)
  console.log(`Generated ${response.pages.length} pages for journey: ${journeyId}`);

  createJson(`static/journeys/${journeyId}.json`, postProcessed)
  return postProcessed

}

async function generateComponentConfig(component: { component: string; id: string }) {
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

async function generateLowLevelPage(page) {
  console.log(`Generating configs for page: ${page.title}`);

  // Generate all component configs in parallel
  const componentPromises = page.components.map(async (component) => {
    const config = await generateComponentConfig(component);
    return {
      component: component.component,
      id: component.id,
      config: config.config,
    };
  });

  const components = await Promise.all(componentPromises);

  return {
    title: page.title,
    components: components,
  };
}

async function generateLowLevelJourney(journeyId) {
  const highLevelJourney = fetchJsonFile(`static/journeys/${journeyId}.json`);

  console.log(`Generating ${highLevelJourney.length} pages in parallel...`);

  let count = highLevelJourney.length;

  // Generate all pages in parallel with progress tracking
  const pagePromises = highLevelJourney.map(async (page, index) => {
    const result = await generateLowLevelPage(page);
    console.log(`✓ Completed page ${index + 1}/${highLevelJourney.length}: ${page.title}`);
    count--;
    console.log(`Remaining pages: ${count}`);
    return result;
  });

  const lowLevelJourney = await Promise.all(pagePromises);


  createJson(`static/journeys/${journeyId}.json`, lowLevelJourney);

  console.log('finished: ', journeyId);

  return lowLevelJourney
}

async function generatePrototype(description: string) {
  try {
    const journeyIndex = await generateJourneyIndex(description);
    if (journeyIndex?.id) console.log('Journey successfully generated'); else console.log('No journey index generated');
    const highLevelJourney = await generateHighLevelJourney(journeyIndex.id)
    if (highLevelJourney) console.log('High level journey successfully generated'); else console.log('No high level journey generated');
    const lowLevelJourney = await generateLowLevelJourney(journeyIndex.id)
    if (lowLevelJourney) console.log('Low level journey successfully generated'); else console.log('No low level journey generated');
    return journeyIndex

    // const journeyIndex = getObjectById('static/journeys/index.json', "passport-application");
    // await generateLowLevelJourney(journeyIndex.id)
    // return journeyIndex

  } catch (error) {
    // Better error handling
    if (error instanceof Error) {
      console.error('Error generating prototype:', error.message);

      // Check if it's an API error
      if ('status' in error) {
        console.error('API Status:', (error as any).status);
      }
    }
    throw error;
  }
}

// At the bottom of the file:
const journey = await generatePrototype('passport application');
console.log('Generated journey:');
console.log(JSON.stringify(journey, null, 2));