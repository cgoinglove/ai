import { o } from './assets/index-Cq4QIKmz.js';
import { s as e } from './assets/index-BY2tNYgL.js';
import './assets/index-B97T_aK9.js';
import 'zod';
const g = async s => {
  const { messages: t } = await s.request.json();
  return e({
    model: o('gpt-4-turbo'),
    messages: t,
    async onFinish({
      text: r,
      toolCalls: n,
      toolResults: i,
      usage: m,
      finishReason: l,
    }) {},
  }).toDataStreamResponse();
};
export { g as POST };
