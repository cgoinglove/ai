import { z } from 'zod';

const i=z.object({notifications:z.array(z.object({name:z.string().describe("Name of a fictional person."),message:z.string().describe("Message. Do not use emojis or links."),minutesAgo:z.number()}))});

export { i };
//# sourceMappingURL=schema.mjs.map
