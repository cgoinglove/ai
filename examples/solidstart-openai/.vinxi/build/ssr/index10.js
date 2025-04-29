import { o as r } from './assets/index-Cq4QIKmz.js';
import { s } from './assets/index-BY2tNYgL.js';
import './assets/index-B97T_aK9.js';
import 'zod';
const i = async t => {
  const { prompt: o } = await t.request.json();
  return s({ model: r('gpt-4o'), prompt: o }).toDataStreamResponse();
};
export { i as POST };
