import { t as to, p as pt } from './index-Cq4QIKmz.mjs';
import './index-B97T_aK9.mjs';
import 'zod';

const R = async (s) => {
  const { message: e } = await s.request.json(), o = [...[], e];
  return to({ model: pt("gpt-4o-mini"), messages: o, async onFinish({ text: i, toolCalls: m, toolResults: p, usage: l, finishReason: u }) {
  } }).toDataStreamResponse();
};

export { R as POST };
//# sourceMappingURL=index112.mjs.map
