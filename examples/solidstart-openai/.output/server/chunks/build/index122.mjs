import { Z as Zs, t as to, p as pt } from './index-Cq4QIKmz.mjs';
import { H as He } from './index-B97T_aK9.mjs';
import 'zod';

const g = async (t) => {
  const { messages: o } = await t.request.json();
  return Zs({ execute: (e) => {
    e.writeData("initialized call"), to({ model: pt("gpt-4o"), messages: o, onChunk() {
      e.writeMessageAnnotation({ chunk: "123" });
    }, onFinish() {
      e.writeMessageAnnotation({ id: He(), other: "information" }), e.writeData("call completed");
    } }).mergeIntoDataStream(e);
  }, onError: (e) => e instanceof Error ? e.message : String(e) });
};

export { g as POST };
//# sourceMappingURL=index122.mjs.map
