import OpenAI from 'openai';
import { JourneyIndexSchema, MultiPageSchema } from '../components/schema.ts';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { zodTextFormat } from "openai/helpers/zod";
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export async function useOpenAI({ model, system, user, schema }: { model: string, system: string, user: string, schema: z.ZodSchema<any> }): Promise<any> {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORG_ID,
    });

    try {
        const response = await client.responses.parse({
            model: model,
            input: [
                {
                    role: "system",
                    content: system
                },
                {
                    role: "user",
                    content: user,
                }
            ],
            text: {
                format: zodTextFormat(schema, "schema"),
            }
        });

        const journeyIndex = response.output_parsed;

        if (!journeyIndex) {
            throw new Error('Failed to parse response');
        }

        return journeyIndex;

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