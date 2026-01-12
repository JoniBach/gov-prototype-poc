import { z } from 'zod';
import { useOpenAI } from '../src/lib/ai/openai.ts';

const schema = z.object({
  title: z.string(),
  bullets: z.array(z.string()).length(3),
}).strict();

type SchemaType = z.infer<typeof schema>;

async function main() {
  const result: SchemaType = await useOpenAI({
    schema,
    model: 'gpt-4o-mini',
    user: "What are the benefits of structured output?",
    system: "You are an AI assistant that generates structured content."
  });

  console.log("Structured output from OpenAI:");
  console.log(result);
}

main().catch(console.error);

// npx tsx ./example/ai.ts