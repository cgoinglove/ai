import { o as e } from './assets/index-Cq4QIKmz.js';
import { a as s } from './assets/index-BY2tNYgL.js';
import { n as a } from './assets/schema-BRl9Xhnh.js';
import './assets/index-B97T_aK9.js';
import 'zod';
const f = async ({ request: t }) => {
  const o = await t.json();
  return s({
    model: e('gpt-4o'),
    prompt: `Generate 3 notifications for a messages app in this context: ${o}`,
    schema: a,
  }).toTextStreamResponse();
};
export { f as POST };
