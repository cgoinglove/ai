import {
  q as n,
  D as s,
  y as t,
  j as a,
  F as b,
  d as K,
  z as d,
  t as l,
  p as Q,
  S as u,
  G as T,
  H as U,
} from './web-BFUmgCsR.js';
import { u as V } from './index-DK6TMCeg.js';
const v = l('<pre class="p-4 text-sm bg-gray-100">'),
  W = l(
    '<button class="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Clear Data',
  ),
  X = l('<div>Loading...'),
  Y = l(
    '<div class="mt-4 text-gray-500"><!$><!/><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Stop',
  ),
  Z = l(
    '<div class=mt-4><div class=text-red-500>An error occurred.</div><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Retry',
  ),
  ee = l(
    '<div class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!$><!/><!$><!/><!$><!/><!$><!/><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"placeholder="Say something...">',
  ),
  te = l('<strong>Annotations:'),
  ne = l(
    '<div class=whitespace-pre-wrap><strong></strong><!$><!/><br><!$><!/><br><br>',
  );
function ie() {
  const {
    messages: C,
    input: k,
    handleInputChange: E,
    handleSubmit: N,
    data: _,
    setData: D,
    status: $,
    error: A,
    stop: F,
    reload: H,
  } = V({ api: '/api/use-chat-streamdata' });
  return (() => {
    const o = n(ee),
      J = o.firstChild,
      [p, L] = s(J.nextSibling),
      O = p.nextSibling,
      [m, R] = s(O.nextSibling),
      j = m.nextSibling,
      [x, q] = s(j.nextSibling),
      z = x.nextSibling,
      [h, G] = s(z.nextSibling),
      S = h.nextSibling,
      f = S.firstChild;
    return (
      t(
        o,
        a(u, {
          get when() {
            return _();
          },
          get children() {
            return [
              (() => {
                const e = n(v);
                return t(e, () => JSON.stringify(_(), null, 2)), e;
              })(),
              (() => {
                const e = n(W);
                return (e.$$click = () => D(void 0)), d(), e;
              })(),
            ];
          },
        }),
        p,
        L,
      ),
      t(
        o,
        a(T, {
          get each() {
            return C();
          },
          children: e =>
            (() => {
              const r = n(ne),
                i = r.firstChild,
                g = i.nextSibling,
                [c, I] = s(g.nextSibling),
                M = c.nextSibling,
                P = M.nextSibling,
                [y, B] = s(P.nextSibling);
              return (
                y.nextSibling,
                t(i, () => `${e.role}: `),
                t(r, () => e.content, c, I),
                t(
                  r,
                  a(u, {
                    get when() {
                      return e.annotations;
                    },
                    get children() {
                      return [
                        n(te),
                        (() => {
                          const w = n(v);
                          return (
                            t(w, () => JSON.stringify(e.annotations, null, 2)),
                            w
                          );
                        })(),
                      ];
                    },
                  }),
                  y,
                  B,
                ),
                r
              );
            })(),
        }),
        m,
        R,
      ),
      t(
        o,
        a(u, {
          get when() {
            return $() === 'submitted' || $() === 'streaming';
          },
          get children() {
            const e = n(Y),
              r = e.firstChild,
              [i, g] = s(r.nextSibling),
              c = i.nextSibling;
            return (
              t(
                e,
                a(u, {
                  get when() {
                    return $() === 'submitted';
                  },
                  get children() {
                    return n(X);
                  },
                }),
                i,
                g,
              ),
              b(c, 'click', F, !0),
              d(),
              e
            );
          },
        }),
        x,
        q,
      ),
      t(
        o,
        a(u, {
          get when() {
            return A();
          },
          get children() {
            const e = n(Z),
              r = e.firstChild,
              i = r.nextSibling;
            return (i.$$click = () => H()), d(), e;
          },
        }),
        h,
        G,
      ),
      b(S, 'submit', N),
      b(f, 'input', E, !0),
      K(() => U(f, 'value', k())),
      d(),
      o
    );
  })();
}
Q(['click', 'input']);
export { ie as default };
