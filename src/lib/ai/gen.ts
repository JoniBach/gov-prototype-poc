import OpenAI from 'openai';
import { HighLevelMultiPageSchema, JourneyIndexSchema, MultiPageSchema } from '../components/schema.ts';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { zodTextFormat } from "openai/helpers/zod";
import { useOpenAI } from './openai.ts';
import { addObjectToJson, createJson, getObjectById } from './files.ts';

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
}

async function generateHighLevelJourney(journeyId: string) {

  const content = getObjectById('static/journeys/index.json', journeyId);

  const response = await useOpenAI({
    model: 'gpt-4o-mini',
    system: "You are a helpful assistant that generates GOV.UK style form journeys using the Design System components.",
    user: JSON.stringify(content),
    schema: HighLevelMultiPageSchema,
  })

  console.log(content)
  console.log(JSON.stringify(response, null, 2))

  createJson(`static/journeys/${journeyId}.json`, response)
}
async function generatePrototype(description: string) {
  try {
    // generateJourneyIndex(description);
    generateHighLevelJourney('passport-application-journey')


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