import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  bullets: z.array(z.string()).length(3),
})//.strict();

type SchemaType = z.infer<typeof schema>;

const goodData: SchemaType = {
  title: "Title",
  bullets: ["Bullet 1", "Bullet 2", "Bullet 3"],
  jelly: "!== jam"
}

const result = schema.parse(goodData) // or safeParse

console.log(result);

// npx tsx ./example/basic.ts