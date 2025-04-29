import {
  q as c,
  D as l,
  y as t,
  j as b,
  d as f,
  z as h,
  t as d,
  p as L,
  S as y,
  J as O,
  G as q,
  H as F,
} from './web-BFUmgCsR.js';
import { z as n, h as J } from './index-DK6TMCeg.js';
const R = n.object({
    notifications: n.array(
      n.object({
        name: n.string().describe('Name of a fictional person.'),
        message: n.string().describe('Message. Do not use emojis or links.'),
        minutesAgo: n.number(),
      }),
    ),
  }),
  T = d(
    '<div class="mt-4 text-gray-500"><div>Loading...</div><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">STOP',
  ),
  B = d(
    '<div class="flex flex-col items-center min-h-screen p-4 m-4"><button class="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md disabled:bg-blue-200">Generate notifications</button><!$><!/><!$><!/><div class="flex flex-col gap-4 mt-4">',
  ),
  I = d('<div class="mt-4 text-red-500">An error occurred. <!$><!/>'),
  K = d(
    '<div class="flex items-start gap-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800"><div class="flex-1 space-y-1"><div class="flex items-center justify-between"><p class="font-medium dark:text-white"></p><p class="text-sm text-gray-500 dark:text-gray-400"><!$><!/><!$><!/></p></div><p class="text-gray-700 dark:text-gray-300">',
  );
function V() {
  const {
    submit: S,
    isLoading: u,
    object: v,
    stop: k,
    error: j,
  } = J({ api: '/api/use-object', schema: R });
  return (() => {
    const r = c(B),
      g = r.firstChild,
      C = g.nextSibling,
      [x, w] = l(C.nextSibling),
      A = x.nextSibling,
      [_, E] = l(A.nextSibling),
      M = _.nextSibling;
    return (
      (g.$$click = async () => {
        S('Messages during finals week.');
      }),
      t(
        r,
        b(y, {
          get when() {
            return j();
          },
          children: e =>
            (() => {
              const s = c(I),
                i = s.firstChild,
                m = i.nextSibling,
                [a, o] = l(m.nextSibling);
              return t(s, () => e()?.message, a, o), s;
            })(),
        }),
        x,
        w,
      ),
      t(
        r,
        b(y, {
          get when() {
            return u();
          },
          get children() {
            const e = c(T),
              s = e.firstChild,
              i = s.nextSibling;
            return (i.$$click = () => k()), h(), e;
          },
        }),
        _,
        E,
      ),
      t(
        M,
        b(q, {
          get each() {
            return v()?.notifications;
          },
          children: (e, s) =>
            (() => {
              const i = c(K),
                m = i.firstChild,
                a = m.firstChild,
                o = a.firstChild,
                $ = o.nextSibling,
                N = $.firstChild,
                [p, P] = l(N.nextSibling),
                z = p.nextSibling,
                [D, G] = l(z.nextSibling),
                H = a.nextSibling;
              return (
                t(o, () => e?.name),
                t($, () => e?.minutesAgo, p, P),
                t($, () => (e?.minutesAgo != null ? ' minutes ago' : ''), D, G),
                t(H, () => e?.message),
                f(() => O(i, 'data-index', s())),
                i
              );
            })(),
        }),
      ),
      f(() => F(g, 'disabled', u())),
      h(),
      r
    );
  })();
}
L(['click']);
export { V as default };
