import { e as eo, p as pt } from './index19.mjs';
import { i } from './schema.mjs';
import './index17.mjs';
import 'zod';

const f=async({request:t})=>{const o=await t.json();return eo({model:pt("gpt-4o"),prompt:`Generate 3 notifications for a messages app in this context: ${o}`,schema:i}).toTextStreamResponse()};

export { f as POST };
//# sourceMappingURL=index15.mjs.map
