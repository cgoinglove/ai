import { t as to, p as pt } from './index-Cq4QIKmz.mjs';
import './index-B97T_aK9.mjs';
import 'zod';

const i = async (t) => {
  const { prompt: o } = await t.request.json();
  return to({ model: pt("gpt-4o"), prompt: o }).toDataStreamResponse();
};

export { i as POST };
//# sourceMappingURL=index102.mjs.map
