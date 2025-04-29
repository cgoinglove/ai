import {
  q as r,
  D as s,
  y as l,
  c as p,
  F as E,
  d as N,
  t as a,
  H as I,
} from './web-BFUmgCsR.js';
import { a as L } from './index-DK6TMCeg.js';
const M = a(
    '<div class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!$><!/><!$><!/><!$><!/><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"placeholder="Say something...">',
  ),
  k = a('<pre class="p-4 text-sm bg-gray-100">'),
  q = a(
    '<div class="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">',
  );
function H() {
  const {
      completion: x,
      input: _,
      setInput: f,
      handleSubmit: g,
      error: i,
      data: o,
    } = L(),
    b = e => {
      f(e.target.value);
    };
  return (() => {
    const e = r(M),
      h = e.firstChild,
      [c, S] = s(h.nextSibling),
      w = c.nextSibling,
      [d, y] = s(w.nextSibling),
      v = d.nextSibling,
      [m, C] = s(v.nextSibling),
      u = m.nextSibling,
      $ = u.firstChild;
    return (
      l(
        e,
        (() => {
          const n = p(() => !!o());
          return () =>
            n() &&
            (() => {
              const t = r(k);
              return l(t, () => JSON.stringify(o(), null, 2)), t;
            })();
        })(),
        c,
        S,
      ),
      l(
        e,
        (() => {
          const n = p(() => !!i());
          return () =>
            n() &&
            (() => {
              const t = r(q);
              return l(t, () => i()?.message), t;
            })();
        })(),
        d,
        y,
      ),
      l(e, x, m, C),
      E(u, 'submit', g),
      $.addEventListener('change', b),
      N(() => I($, 'value', _())),
      e
    );
  })();
}
export { H as default };
