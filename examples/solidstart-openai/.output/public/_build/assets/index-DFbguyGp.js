import {
  q as s,
  D as r,
  y as i,
  j as u,
  F as m,
  d as S,
  z as _,
  t as o,
  p as z,
  G as D,
  S as p,
  H as y,
} from './web-BFUmgCsR.js';
import { u as G } from './index-DK6TMCeg.js';
const M = o('<div>Loading...'),
  P = o(
    '<div class="mt-4 text-gray-500"><!$><!/><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Stop',
  ),
  B = o(
    '<div class=mt-4><div class=text-red-500>An error occurred.</div><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Retry',
  ),
  J = o(
    '<div class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!$><!/><!$><!/><!$><!/><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"placeholder="Say something...">',
  ),
  K = o('<div class=whitespace-pre-wrap><!$><!/><!$><!/>');
function T() {
  const {
    error: v,
    input: w,
    status: a,
    handleInputChange: C,
    handleSubmit: E,
    messages: k,
    reload: F,
    stop: R,
  } = G({
    onFinish(n, { usage: $, finishReason: d }) {
      console.log('Usage', $), console.log('FinishReason', d);
    },
  });
  return (() => {
    const n = s(J),
      $ = n.firstChild,
      [d, A] = r($.nextSibling),
      H = d.nextSibling,
      [x, I] = r(H.nextSibling),
      L = x.nextSibling,
      [h, N] = r(L.nextSibling),
      f = h.nextSibling,
      b = f.firstChild;
    return (
      i(
        n,
        u(D, {
          get each() {
            return k();
          },
          children: e =>
            (() => {
              const t = s(K),
                l = t.firstChild,
                [c, g] = r(l.nextSibling),
                U = c.nextSibling,
                [j, q] = r(U.nextSibling);
              return (
                i(t, () => (e.role === 'user' ? 'User: ' : 'AI: '), c, g),
                i(t, () => e.content, j, q),
                t
              );
            })(),
        }),
        d,
        A,
      ),
      i(
        n,
        u(p, {
          get when() {
            return a() === 'submitted' || a() === 'streaming';
          },
          get children() {
            const e = s(P),
              t = e.firstChild,
              [l, c] = r(t.nextSibling),
              g = l.nextSibling;
            return (
              i(
                e,
                u(p, {
                  get when() {
                    return a() === 'submitted';
                  },
                  get children() {
                    return s(M);
                  },
                }),
                l,
                c,
              ),
              m(g, 'click', R, !0),
              _(),
              e
            );
          },
        }),
        x,
        I,
      ),
      i(
        n,
        u(p, {
          get when() {
            return v();
          },
          get children() {
            const e = s(B),
              t = e.firstChild,
              l = t.nextSibling;
            return (l.$$click = () => F()), _(), e;
          },
        }),
        h,
        N,
      ),
      m(f, 'submit', E),
      m(b, 'input', C, !0),
      S(() => y(b, 'disabled', a() !== 'ready')),
      S(() => y(b, 'value', w())),
      _(),
      n
    );
  })();
}
z(['click', 'input']);
export { T as default };
