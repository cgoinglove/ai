import {
  q as c,
  D as d,
  y as r,
  j as n,
  F as C,
  d as b,
  t as g,
  p as J,
  G as p,
  S as o,
  J as N,
  z as R,
  H as T,
} from './web-BFUmgCsR.js';
import { u as W } from './index-DK6TMCeg.js';
const j = g(
    '<div class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!$><!/><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"placeholder="Say something...">',
  ),
  q = g('<div class=whitespace-pre-wrap><strong></strong><!$><!/><br>'),
  z = g(
    '<div class=text-gray-500><!$><!/><div class="flex gap-2"><button class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Yes</button><button class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">No',
  ),
  D = g('<div class=text-gray-500>Location access allowed: <!$><!/>'),
  O = g('<div class=text-gray-500>Getting location...'),
  P = g('<div class=text-gray-500>Location: <!$><!/>'),
  B = g('<pre>'),
  K = g('<div class=text-gray-500>Getting weather information for <!$><!/>...'),
  Q = g('<div class=text-gray-500>Weather in <!$><!/>: <!$><!/>');
function X() {
  const {
    messages: k,
    input: L,
    handleInputChange: E,
    handleSubmit: F,
    addToolResult: m,
  } = W({
    api: '/api/use-chat-tools',
    maxSteps: 5,
    async onToolCall({ toolCall: u }) {
      if (u.toolName === 'getLocation') {
        const $ = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];
        return $[Math.floor(Math.random() * $.length)];
      }
    },
  });
  return (() => {
    const u = c(j),
      $ = u.firstChild,
      [v, G] = d($.nextSibling),
      f = v.nextSibling,
      I = f.firstChild;
    return (
      r(
        u,
        n(p, {
          get each() {
            return k();
          },
          children: S =>
            (() => {
              const _ = c(q),
                w = _.firstChild,
                M = w.nextSibling,
                [y, Y] = d(M.nextSibling);
              return (
                y.nextSibling,
                r(w, () => `${S.role}: `),
                r(
                  _,
                  n(p, {
                    get each() {
                      return S.parts;
                    },
                    children: t => [
                      n(o, {
                        get when() {
                          return t.type === 'text';
                        },
                        get children() {
                          return t.text;
                        },
                      }),
                      n(o, {
                        get when() {
                          return t.type === 'tool-invocation';
                        },
                        get children() {
                          return [
                            n(o, {
                              get when() {
                                return (
                                  t.toolInvocation.toolName ===
                                  'askForConfirmation'
                                );
                              },
                              get children() {
                                return [
                                  n(o, {
                                    get when() {
                                      return t.toolInvocation.state === 'call';
                                    },
                                    get children() {
                                      const e = c(z),
                                        a = e.firstChild,
                                        [i, l] = d(a.nextSibling),
                                        s = i.nextSibling,
                                        h = s.firstChild,
                                        x = h.nextSibling;
                                      return (
                                        r(
                                          e,
                                          () => t.toolInvocation.args.message,
                                          i,
                                          l,
                                        ),
                                        (h.$$click = () =>
                                          m({
                                            toolCallId:
                                              t.toolInvocation.toolCallId,
                                            result: 'Yes, confirmed.',
                                          })),
                                        (x.$$click = () =>
                                          m({
                                            toolCallId:
                                              t.toolInvocation.toolCallId,
                                            result: 'No, denied',
                                          })),
                                        b(() =>
                                          N(
                                            e,
                                            'data-key',
                                            t.toolInvocation.toolCallId,
                                          ),
                                        ),
                                        R(),
                                        e
                                      );
                                    },
                                  }),
                                  n(o, {
                                    get when() {
                                      return (
                                        t.toolInvocation.state === 'result'
                                      );
                                    },
                                    get children() {
                                      const e = c(D),
                                        a = e.firstChild,
                                        i = a.nextSibling,
                                        [l, s] = d(i.nextSibling);
                                      return (
                                        r(
                                          e,
                                          () => t.toolInvocation.result,
                                          l,
                                          s,
                                        ),
                                        b(() =>
                                          N(
                                            e,
                                            'data-key',
                                            t.toolInvocation.toolCallId,
                                          ),
                                        ),
                                        e
                                      );
                                    },
                                  }),
                                ];
                              },
                            }),
                            n(o, {
                              get when() {
                                return (
                                  t.toolInvocation.toolName === 'getLocation'
                                );
                              },
                              get children() {
                                return [
                                  n(o, {
                                    get when() {
                                      return t.toolInvocation.state === 'call';
                                    },
                                    get children() {
                                      return c(O);
                                    },
                                  }),
                                  n(o, {
                                    get when() {
                                      return (
                                        t.toolInvocation.state === 'result' &&
                                        t.toolInvocation.result
                                      );
                                    },
                                    get children() {
                                      const e = c(P),
                                        a = e.firstChild,
                                        i = a.nextSibling,
                                        [l, s] = d(i.nextSibling);
                                      return (
                                        r(
                                          e,
                                          () => t.toolInvocation.result,
                                          l,
                                          s,
                                        ),
                                        e
                                      );
                                    },
                                  }),
                                ];
                              },
                            }),
                            n(o, {
                              get when() {
                                return (
                                  t.toolInvocation.toolName ===
                                  'getWeatherInformation'
                                );
                              },
                              get children() {
                                return [
                                  n(o, {
                                    get when() {
                                      return (
                                        t.toolInvocation.state ===
                                        'partial-call'
                                      );
                                    },
                                    get children() {
                                      const e = c(B);
                                      return (
                                        r(e, () =>
                                          JSON.stringify(
                                            t.toolInvocation,
                                            null,
                                            2,
                                          ),
                                        ),
                                        e
                                      );
                                    },
                                  }),
                                  n(o, {
                                    get when() {
                                      return t.toolInvocation.state === 'call';
                                    },
                                    get children() {
                                      const e = c(K),
                                        a = e.firstChild,
                                        i = a.nextSibling,
                                        [l, s] = d(i.nextSibling);
                                      return (
                                        l.nextSibling,
                                        r(
                                          e,
                                          () => t.toolInvocation.args.city,
                                          l,
                                          s,
                                        ),
                                        e
                                      );
                                    },
                                  }),
                                  n(o, {
                                    get when() {
                                      return (
                                        t.toolInvocation.state === 'result'
                                      );
                                    },
                                    get children() {
                                      const e = c(Q),
                                        a = e.firstChild,
                                        i = a.nextSibling,
                                        [l, s] = d(i.nextSibling),
                                        h = l.nextSibling,
                                        x = h.nextSibling,
                                        [A, H] = d(x.nextSibling);
                                      return (
                                        r(
                                          e,
                                          () => t.toolInvocation.args.city,
                                          l,
                                          s,
                                        ),
                                        r(
                                          e,
                                          () => t.toolInvocation.result,
                                          A,
                                          H,
                                        ),
                                        e
                                      );
                                    },
                                  }),
                                ];
                              },
                            }),
                          ];
                        },
                      }),
                    ],
                  }),
                  y,
                  Y,
                ),
                _
              );
            })(),
        }),
        v,
        G,
      ),
      C(f, 'submit', F),
      C(I, 'change', E),
      b(() => T(I, 'value', L())),
      u
    );
  })();
}
J(['click']);
export { X as default };
