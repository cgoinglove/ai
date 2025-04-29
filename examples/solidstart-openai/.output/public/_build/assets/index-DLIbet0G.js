import {
  q as d,
  D as r,
  y as i,
  j as C,
  F as S,
  d as v,
  t as p,
  G as y,
  H as E,
} from './web-BFUmgCsR.js';
import { u as F } from './index-DK6TMCeg.js';
const j = p(
    '<div class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!$><!/><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"placeholder="Say something...">',
  ),
  k = p('<div class=whitespace-pre-wrap><!$><!/><!$><!/>');
function L() {
  const {
    messages: c,
    input: m,
    handleInputChange: _,
    handleSubmit: u,
  } = F(() => ({ api: '/api/use-chat-vision' }));
  return (() => {
    const a = d(j),
      h = a.firstChild,
      [l, $] = r(h.nextSibling),
      n = l.nextSibling,
      s = n.firstChild;
    return (
      i(
        a,
        C(y, {
          get each() {
            return c();
          },
          children: e =>
            (() => {
              const t = d(k),
                g = t.firstChild,
                [o, x] = r(g.nextSibling),
                f = o.nextSibling,
                [b, w] = r(f.nextSibling);
              return (
                i(t, () => (e.role === 'user' ? 'User: ' : 'AI: '), o, x),
                i(t, () => e.content, b, w),
                t
              );
            })(),
        }),
        l,
        $,
      ),
      n.addEventListener('submit', e =>
        u(e, {
          data: {
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Field_sparrow_in_CP_%2841484%29_%28cropped%29.jpg/733px-Field_sparrow_in_CP_%2841484%29_%28cropped%29.jpg',
          },
        }),
      ),
      S(s, 'change', _),
      v(() => E(s, 'value', m())),
      a
    );
  })();
}
export { L as default };
