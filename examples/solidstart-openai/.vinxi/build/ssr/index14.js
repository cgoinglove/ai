import { o as n } from './assets/index-Cq4QIKmz.js';
import { s as r } from './assets/index-BY2tNYgL.js';
import './assets/index-B97T_aK9.js';
import 'zod';
const l = async s => {
  const { messages: t, data: o } = await s.request.json(),
    a = t.slice(0, -1),
    e = t[t.length - 1];
  return r({
    model: n('gpt-4o-mini'),
    messages: [
      ...a,
      {
        ...e,
        content: [
          { type: 'text', text: e.content },
          { type: 'image', image: new URL(o.imageUrl) },
        ],
      },
    ],
  }).toDataStreamResponse();
};
export { l as POST };
