import { o as n } from './assets/index-Cq4QIKmz.js';
import { c as s, s as r } from './assets/index-BY2tNYgL.js';
import { a as i } from './assets/index-B97T_aK9.js';
import 'zod';
const g = async t => {
  const { messages: o } = await t.request.json();
  return s({
    execute: e => {
      e.writeData('initialized call'),
        r({
          model: n('gpt-4o'),
          messages: o,
          onChunk() {
            e.writeMessageAnnotation({ chunk: '123' });
          },
          onFinish() {
            e.writeMessageAnnotation({ id: i(), other: 'information' }),
              e.writeData('call completed');
          },
        }).mergeIntoDataStream(e);
    },
    onError: e => (e instanceof Error ? e.message : String(e)),
  });
};
export { g as POST };
