import {
  b as X,
  q as s,
  D as _,
  y as n,
  j as g,
  c as I,
  z,
  F as j,
  d as h,
  t as o,
  I as Y,
  p as Z,
  G as E,
  J as S,
  S as H,
  H as M,
} from './web-BFUmgCsR.js';
import { u as ee, g as te } from './index-DK6TMCeg.js';
const le = o('<div>Loading...'),
  ne = o(
    '<div class="mt-4 text-gray-500"><!$><!/><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Stop',
  ),
  ie = o(
    '<div class="flex flex-col gap-2"><div class="flex flex-col p-2 gap-2"></div><!$><!/><!$><!/><form class="flex flex-col gap-2 fixed bottom-0 p-2 w-full bg-white"><div class="flex flex-row gap-2 fixed right-2 bottom-14 items-end"></div><input type=file multiple><input placeholder="Send message..."class="bg-zinc-100 w-full p-2">',
  ),
  re = o(
    '<div class="flex flex-row gap-2"><div class="w-24 text-zinc-500 flex-shrink-0"></div><div class="flex flex-col gap-2"><!$><!/><div class="flex flex-row gap-2">',
  ),
  se = o('<img class="w-24 rounded-md">'),
  oe = o(
    '<div class="w-32 h-24 rounded-md text-xs overflow-hidden p-2 text-zinc-500 border">',
  ),
  de = o(
    '<div class=mt-4><div class=text-red-500>An error occurred.</div><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Retry',
  ),
  ae = o(
    '<div><img class="w-24 rounded-md"><span class="text-sm text-zinc-500">',
  ),
  ce = o(
    '<div class="w-24 text-zinc-500 flex-shrink-0 text-sm flex flex-col gap-1"><div class="w-16 h-20 bg-zinc-100 rounded-md"></div><!$><!/>',
  );
function _e() {
  const [y, k] = X(void 0);
  let v;
  const {
      error: N,
      input: W,
      status: f,
      handleInputChange: q,
      handleSubmit: G,
      messages: J,
      reload: O,
      stop: P,
    } = ee({
      onFinish(d, { usage: p, finishReason: w }) {
        console.log('Usage', p), console.log('FinishReason', w);
      },
    }),
    B = async d => {
      d.preventDefault(),
        G(d, { experimental_attachments: y() }),
        k(void 0),
        v && (v.value = '');
    };
  return (() => {
    const d = s(ie),
      p = d.firstChild,
      w = p.nextSibling,
      [F, K] = _(w.nextSibling),
      Q = F.nextSibling,
      [L, V] = _(Q.nextSibling),
      R = L.nextSibling,
      T = R.firstChild,
      m = T.nextSibling,
      C = m.nextSibling;
    n(
      p,
      g(E, {
        get each() {
          return J();
        },
        children: e =>
          (() => {
            const i = s(re),
              t = i.firstChild,
              l = t.nextSibling,
              a = l.firstChild,
              [r, c] = _(a.nextSibling),
              b = r.nextSibling;
            return (
              n(t, () => `${e.role}: `),
              n(l, () => e.content, r, c),
              n(
                b,
                g(E, {
                  get each() {
                    return e.experimental_attachments;
                  },
                  children: ($, ue) =>
                    $.contentType?.includes('image/')
                      ? (() => {
                          const u = s(se);
                          return (
                            h(
                              x => {
                                const A = $.url,
                                  D = $.name;
                                return (
                                  A !== x._v$ && S(u, 'src', (x._v$ = A)),
                                  D !== x._v$2 && S(u, 'alt', (x._v$2 = D)),
                                  x
                                );
                              },
                              { _v$: void 0, _v$2: void 0 },
                            ),
                            u
                          );
                        })()
                      : $.contentType?.includes('text/')
                        ? (() => {
                            const u = s(oe);
                            return n(u, () => te($.url)), u;
                          })()
                        : null,
                }),
              ),
              i
            );
          })(),
      }),
    ),
      n(
        d,
        g(H, {
          get when() {
            return f() === 'submitted' || f() === 'streaming';
          },
          get children() {
            const e = s(ne),
              i = e.firstChild,
              [t, l] = _(i.nextSibling),
              a = t.nextSibling;
            return (
              n(
                e,
                g(H, {
                  get when() {
                    return f() === 'submitted';
                  },
                  get children() {
                    return s(le);
                  },
                }),
                t,
                l,
              ),
              j(a, 'click', P, !0),
              z(),
              e
            );
          },
        }),
        F,
        K,
      ),
      n(
        d,
        (() => {
          const e = I(() => !!N());
          return () =>
            e() &&
            (() => {
              const i = s(de),
                t = i.firstChild,
                l = t.nextSibling;
              return (l.$$click = () => O()), z(), i;
            })();
        })(),
        L,
        V,
      ),
      R.addEventListener('submit', B),
      n(
        T,
        g(E, {
          get each() {
            return I(() => !!y())() ? Array.from(y()) : [];
          },
          children: e => {
            const i = e.type;
            return i.startsWith('image/')
              ? (() => {
                  const t = s(ae),
                    l = t.firstChild,
                    a = l.nextSibling;
                  return (
                    n(a, () => e.name),
                    h(
                      r => {
                        const c = URL.createObjectURL(e),
                          b = e.name;
                        return (
                          c !== r._v$3 && S(l, 'src', (r._v$3 = c)),
                          b !== r._v$4 && S(l, 'alt', (r._v$4 = b)),
                          r
                        );
                      },
                      { _v$3: void 0, _v$4: void 0 },
                    ),
                    t
                  );
                })()
              : i.startsWith('text/')
                ? (() => {
                    const t = s(ce),
                      l = t.firstChild,
                      a = l.nextSibling,
                      [r, c] = _(a.nextSibling);
                    return n(t, () => e.name, r, c), t;
                  })()
                : null;
          },
        }),
      );
    const U = v;
    return (
      typeof U == 'function' ? Y(U, m) : (v = m),
      m.addEventListener('change', e => k(e.currentTarget.files ?? void 0)),
      j(C, 'input', q, !0),
      h(() => M(C, 'disabled', f() !== 'ready')),
      h(() => M(C, 'value', W())),
      z(),
      d
    );
  })();
}
Z(['click', 'input']);
export { _e as default };
