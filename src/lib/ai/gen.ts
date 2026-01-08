import OpenAI from 'openai';
import { configurationSchema, ConfigurationSchemaEnum, HighLevelMultiPageSchema, JourneyIndexSchema, MultiPageSchema } from '../components/schema.ts';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { zodTextFormat } from "openai/helpers/zod";
import { useOpenAI } from './openai.ts';
import { addObjectToJson, createJson, fetchJsonFile, getObjectById } from './files.ts';
import z from 'zod';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function generateJourneyIndex(description) {
  const indexResponse = await useOpenAI({
    model: 'gpt-4o-mini',
    system: "You are a helpful assistant that generates GOV.UK style form journeys using the Design System components.",
    user: `Create a journey for: ${description}`,
    schema: JourneyIndexSchema,
  })

  const journeyIndex = indexResponse;
  addObjectToJson('static/journeys/index.json', journeyIndex);
  console.log("Index Response:", journeyIndex)

  return journeyIndex
}

async function generateHighLevelJourney(journeyId: string) {
  const content = getObjectById('static/journeys/index.json', journeyId);
  const response = await useOpenAI({
    model: 'gpt-5.1',
    system: "You are a qualified GOV uk content designer that generates GOV.UK style form journeys using the Design System components.",
    user: JSON.stringify(content),
    schema: HighLevelMultiPageSchema,
  })


  createJson(`static/journeys/${journeyId}.json`, response.pages)
return response

}

async function generateLowLevelPage(page) {

  const componentList = page.components.map(({ component }) => component)
  const ComponentTypeEnum = z.enum(componentList)

  const ComponentListSchemas = _.pick(configurationSchema, componentList)
  const ConfigurationSchemaEnum = z.object(ComponentListSchemas);

  const ComponentSchema = z.object({
    component: ComponentTypeEnum,
    config: ConfigurationSchemaEnum,
    id: z.string(),
  });

  const ComponentsSchema = z.array(ComponentSchema)
  const PageSchema = z.object({
    title: z.string(),
    components: ComponentsSchema,
  });

  // console.log('generateLowLevelPage page: ', page)
  // console.log('generateLowLevelPage componentList: ', componentList)

  const response = await useOpenAI({
    model: 'gpt-4o-mini',
    system: "You are a qualified GOV UK interaction designerthat generates content for pages for GOV.UK style form journeys using the Design System components. You fill out empty configuration objects ",
    user: JSON.stringify(page),
    schema: PageSchema,
  })

  console.log(console.log(JSON.stringify(response, null, 2))
  )

  return response


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