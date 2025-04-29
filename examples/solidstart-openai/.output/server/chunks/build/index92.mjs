import { t as to, p as pt } from './index-Cq4QIKmz.mjs';
import './index-B97T_aK9.mjs';
import 'zod';

const g = async (s) => {
  const { messages: t } = await s.request.json();
  return to({ model: pt("gpt-4-turbo"), messages: t, async onFinish({ text: r, toolCalls: n, toolResults: i, usage: m, finishReason: l }) {
  } }).toDataStreamResponse();
};

export { g as POST };
//# sourceMappingURL=index92.mjs.map
