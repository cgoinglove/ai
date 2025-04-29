import { t as to, p as pt } from './index-Cq4QIKmz.mjs';
import './index-B97T_aK9.mjs';
import 'zod';

const l = async (s) => {
  const { messages: t, data: o } = await s.request.json(), a = t.slice(0, -1), e = t[t.length - 1];
  return to({ model: pt("gpt-4o-mini"), messages: [...a, { ...e, content: [{ type: "text", text: e.content }, { type: "image", image: new URL(o.imageUrl) }] }] }).toDataStreamResponse();
};

export { l as POST };
//# sourceMappingURL=index142.mjs.map
