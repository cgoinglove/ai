import { o as t } from './assets/index-Cq4QIKmz.js';
import { s as a } from './assets/index-BY2tNYgL.js';
import './assets/index-B97T_aK9.js';
import 'zod';
const R = async s => {
  const { message: e } = await s.request.json(),
    o = [...[], e];
  return a({
    model: t('gpt-4o-mini'),
    messages: o,
    async onFinish({
      text: i,
      toolCalls: m,
      toolResults: p,
      usage: l,
      finishReason: u,
    }) {},
  }).toDataStreamResponse();
};
export { R as POST };
