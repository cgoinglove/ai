import {
  a as be,
  f as k,
  u as ve,
  i as Ce,
  p as Z,
  b as xe,
  d as Me,
  s as Se,
  e as Ee,
  h as we,
  j as Oe,
  k as Te,
  l as De,
  m as Fe,
  n as Ie,
} from './index-B97T_aK9.js';
import {
  getListener as $e,
  createSignal as h,
  onCleanup as Re,
  DEV as oe,
  createMemo as n,
  createEffect as A,
  createUniqueId as ae,
  batch as U,
} from 'solid-js';
import { createStore as je, reconcile as ke } from 'solid-js/store';
import { isServer as _ } from 'solid-js/web';
var Le = !_ && oe ? { equals: !1, name: 'trigger' } : { equals: !1 },
  Pe = !_ && oe ? { equals: !1, internal: !0 } : Le,
  ee = class {
    #e;
    constructor(t = Map) {
      this.#e = new t();
    }
    dirty(t) {
      _ || this.#e.get(t)?.$$();
    }
    dirtyAll() {
      if (!_) for (const t of this.#e.values()) t.$$();
    }
    track(t) {
      if (!$e()) return;
      let e = this.#e.get(t);
      if (e) e.n++;
      else {
        const [o, r] = h(void 0, Pe);
        this.#e.set(t, (e = { $: o, $$: r, n: 1 }));
      }
      Re(() => {
        e.n-- === 1 && queueMicrotask(() => e.n === 0 && this.#e.delete(t));
      }),
        e.$();
    }
  };
function W(t) {
  const e = typeof t == 'function' ? t() : t;
  return Object.entries(e).reduce((o, [r, v]) => ((o[r] = n(() => v)), o), {});
}
var D = Symbol('track-keys'),
  J = class extends Map {
    #e = new ee();
    #s = new ee();
    #o;
    #t = [];
    constructor(t = 10, e) {
      if ((super(), (this.#o = t), e)) for (const [o, r] of e) this.set(o, r);
    }
    #r(t) {
      const e = this.#t.indexOf(t);
      if (
        (e > -1 && this.#t.splice(e, 1),
        this.#t.push(t),
        this.#t.length > this.#o)
      ) {
        const o = this.#t.shift();
        this.delete(o);
      }
    }
    has(t) {
      this.#e.track(t);
      const e = super.has(t);
      return e && this.#r(t), e;
    }
    get(t) {
      this.#s.track(t);
      const e = super.get(t);
      return e !== void 0 && this.#r(t), e;
    }
    get size() {
      return this.#e.track(D), super.size;
    }
    *keys() {
      for (const t of super.keys()) this.#e.track(t), yield t;
      this.#e.track(D);
    }
    *values() {
      for (const [t, e] of super.entries()) this.#s.track(t), yield e;
      this.#e.track(D);
    }
    *entries() {
      for (const t of super.entries()) this.#s.track(t[0]), yield t;
      this.#e.track(D);
    }
    set(t, e) {
      return (
        U(() => {
          if (super.has(t)) {
            if (super.get(t) === e) {
              this.#r(t);
              return;
            }
          } else this.#e.dirty(t), this.#e.dirty(D);
          this.#s.dirty(t), super.set(t, e), this.#r(t);
        }),
        this
      );
    }
    delete(t) {
      const e = super.delete(t);
      return (
        e &&
          U(() => {
            this.#e.dirty(t), this.#e.dirty(D), this.#s.dirty(t);
            const o = this.#t.indexOf(t);
            o > -1 && this.#t.splice(o, 1);
          }),
        e
      );
    }
    clear() {
      super.size &&
        U(() => {
          for (const t of super.keys()) this.#e.dirty(t), this.#s.dirty(t);
          super.clear(), (this.#t = []), this.#e.dirty(D);
        });
    }
    forEach(t) {
      this.#e.track(D);
      for (const [e, o] of super.entries())
        this.#s.track(e), this.#r(e), t(o, e, this);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  },
  te = new J();
function ze(t = {}) {
  const e = n(() => W(t)),
    o = n(() => e().experimental_prepareRequestBody?.()),
    r = n(() => ({ ...e(), experimental_prepareRequestBody: o })),
    v = n(() => r().api?.() ?? '/api/chat'),
    w = n(() => r().generateId?.() ?? be),
    C = n(() => r().id?.() ?? w()()),
    $ = n(() => `${v()}|${C()}|messages`),
    p = n(() => te.get($()) ?? r().initialMessages?.() ?? []),
    [x, L] = je(k(p()));
  A(() => {
    L(ke(k(p()), { merge: !0 }));
  });
  const O = s => {
      te.set($(), s);
    },
    [T, l] = h(void 0),
    [M, g] = h(void 0),
    [f, m] = h('ready');
  let a = k(p()) || [];
  A(() => {
    a = k(p()) || [];
  });
  let i = null,
    u = {
      credentials: r().credentials?.(),
      headers: r().headers?.(),
      body: r().body?.(),
    };
  A(() => {
    u = {
      credentials: r().credentials?.(),
      headers: r().headers?.(),
      body: r().body?.(),
    };
  });
  const R = async s => {
      l(void 0), m('submitted');
      const c = a.length,
        d = De(s.messages[s.messages.length - 1]?.toolInvocations);
      try {
        i = new AbortController();
        const S = r().streamProtocol?.() ?? 'data',
          j = r().onFinish?.(),
          de = r().onResponse?.(),
          ue = r().onToolCall?.(),
          he = r().sendExtraMessageFields?.(),
          pe = r().keepLastMessageOnError?.() ?? !0,
          ge = r().experimental_prepareRequestBody?.(),
          fe = a,
          E = k(s.messages);
        O(E);
        const me = M() ?? [],
          ye = he
            ? E
            : E.map(
                ({
                  role: z,
                  content: P,
                  experimental_attachments: q,
                  data: G,
                  annotations: H,
                  toolInvocations: Q,
                  parts: X,
                }) => ({
                  role: z,
                  content: P,
                  ...(q !== void 0 && { experimental_attachments: q }),
                  ...(G !== void 0 && { data: G }),
                  ...(H !== void 0 && { annotations: H }),
                  ...(Q !== void 0 && { toolInvocations: Q }),
                  ...(X !== void 0 && { parts: X }),
                }),
              );
        await Fe({
          api: v(),
          body: ge?.({
            id: C(),
            messages: E,
            requestData: s.data,
            requestBody: s.body,
          }) ?? { id: C(), messages: ye, data: s.data, ...u.body, ...s.body },
          streamProtocol: S,
          credentials: u.credentials,
          headers: { ...u.headers, ...s.headers },
          abortController: () => i,
          restoreMessagesOnFailure() {
            pe || O(fe);
          },
          onResponse: de,
          onUpdate({ message: z, data: P, replaceLastMessage: q }) {
            m('streaming'),
              O([...(q ? E.slice(0, E.length - 1) : E), z]),
              P?.length && g([...me, ...P]);
          },
          onToolCall: ue,
          onFinish: j,
          generateId: w(),
          fetch: r().fetch?.(),
          lastMessage: E[E.length - 1],
        }),
          (i = null),
          m('ready');
      } catch (S) {
        if (S.name === 'AbortError') return (i = null), m('ready'), null;
        const j = r().onError?.();
        j && S instanceof Error && j(S), l(S), m('error');
      }
      const b = r().maxSteps?.() ?? 1,
        I = a;
      Ie({
        originalMaxToolInvocationStep: d,
        originalMessageCount: c,
        maxSteps: b,
        messages: I,
      }) && (await R({ messages: I }));
    },
    N = async (
      s,
      { data: c, headers: d, body: b, experimental_attachments: I } = {},
    ) => {
      const S = await Z(I),
        j = a.concat({
          ...s,
          id: s.id ?? w()(),
          createdAt: s.createdAt ?? new Date(),
          experimental_attachments: S.length > 0 ? S : void 0,
          parts: xe(s),
        });
      return R({ messages: j, headers: d, body: b, data: c });
    },
    y = async ({ data: s, headers: c, body: d } = {}) => {
      if (a.length === 0) return null;
      const b = a[a.length - 1];
      return R({
        messages: b.role === 'assistant' ? a.slice(0, -1) : a,
        headers: c,
        body: d,
        data: s,
      });
    },
    F = () => {
      i && (i.abort(), (i = null));
    },
    B = s => {
      typeof s == 'function' && (s = s(a));
      const c = k(s);
      O(c), (a = c);
    },
    K = s => {
      typeof s == 'function' && (s = s(M())), g(s);
    },
    [Y, V] = h(r().initialInput?.() || ''),
    ne = async (s, c = {}, d) => {
      s?.preventDefault?.();
      const b = Y();
      if (!b && !c.allowEmptySubmit) return;
      const I = await Z(c.experimental_attachments);
      d && (u = { ...u, ...d }),
        R({
          messages: a.concat({
            id: w()(),
            role: 'user',
            content: b,
            createdAt: new Date(),
            experimental_attachments: I.length > 0 ? I : void 0,
            parts: [{ type: 'text', text: b }],
          }),
          headers: c.headers,
          body: c.body,
          data: c.data,
        }),
        V('');
    },
    ie = s => {
      V(s.target.value);
    },
    ce = ({ toolCallId: s, result: c }) => {
      const d = a ?? [];
      if (
        (ve({ messages: d, toolCallId: s, toolResult: c }),
        O(d),
        f() === 'submitted' || f() === 'streaming')
      )
        return;
      const b = d[d.length - 1];
      Ce(b) && R({ messages: d });
    },
    le = n(() => f() === 'submitted' || f() === 'streaming');
  return {
    messages: () => x,
    id: C(),
    append: N,
    error: T,
    reload: y,
    stop: F,
    setMessages: B,
    input: Y,
    setInput: V,
    handleInputChange: ie,
    handleSubmit: ne,
    isLoading: le,
    status: f,
    data: M,
    setData: K,
    addToolResult: ce,
  };
}
var se = new J();
function Ue(t = {}) {
  const e = n(() => W(t)),
    o = n(() => e().api?.() ?? '/api/completion'),
    r = n(() => e().id?.() ?? `completion-${ae()}`),
    v = n(() => `${o()}|${r()}|completion`),
    w = n(() => se.get(v()) ?? e().initialCompletion?.() ?? ''),
    C = y => {
      se.set(v(), y);
    },
    [$, p] = h(void 0),
    [x, L] = h(void 0),
    [O, T] = h(!1),
    [l, M] = h(null);
  let g = {
    credentials: e().credentials?.(),
    headers: e().headers?.(),
    body: e().body?.(),
  };
  A(() => {
    g = {
      credentials: e().credentials?.(),
      headers: e().headers?.(),
      body: e().body?.(),
    };
  });
  const f = async (y, F) => {
      const B = x() ?? [];
      return Me({
        api: o(),
        prompt: y,
        credentials: e().credentials?.(),
        headers: { ...g.headers, ...F?.headers },
        body: { ...g.body, ...F?.body },
        streamProtocol: e().streamProtocol?.(),
        setCompletion: C,
        setLoading: T,
        setError: p,
        setAbortController: M,
        onResponse: e().onResponse?.(),
        onFinish: e().onFinish?.(),
        onError: e().onError?.(),
        onData: K => {
          L([...B, ...(K ?? [])]);
        },
        fetch: e().fetch?.(),
      });
    },
    m = () => {
      l() && l().abort();
    },
    a = y => {
      C(y);
    },
    [i, u] = h(e().initialInput?.() ?? '');
  return {
    completion: w,
    complete: f,
    error: $,
    stop: m,
    setCompletion: a,
    input: i,
    setInput: u,
    handleInputChange: y => {
      u(y.target.value);
    },
    handleSubmit: y => {
      y?.preventDefault?.();
      const F = i();
      return F ? f(F) : void 0;
    },
    isLoading: O,
    data: x,
  };
}
var qe = () => fetch,
  re = new J();
function Ae(t) {
  const e = n(() => W(t)),
    o = n(() => e().id?.() ?? `object-${ae()}`),
    r = n(() => re.get(o()) ?? e().initialValue?.()),
    v = T => {
      re.set(o(), T);
    },
    [w, C] = h(),
    [$, p] = h(!1);
  let x = null;
  return {
    submit: async T => {
      try {
        v(void 0), p(!0), C(void 0);
        const l = new AbortController();
        x = l;
        const g = await (fetch ?? qe())(e().api(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...e().headers?.() },
          credentials: e().credentials?.(),
          signal: l.signal,
          body: JSON.stringify(T),
        });
        if (!g.ok)
          throw new Error((await g.text()) ?? 'Failed to fetch the response.');
        if (g.body == null) throw new Error('The response body is empty.');
        let f = '',
          m;
        await g.body.pipeThrough(new TextDecoderStream()).pipeTo(
          new WritableStream({
            write(a) {
              f += a;
              const { value: i } = we(f),
                u = i;
              Oe(m, u) || ((m = u), v(u));
            },
            close() {
              p(!1), (x = null);
              const a = e().onFinish?.();
              if (a != null) {
                const i = Se({ value: m, schema: Ee(e().schema()) });
                a(
                  i.success
                    ? { object: i.value, error: void 0 }
                    : { object: void 0, error: i.error },
                );
              }
            },
          }),
        );
      } catch (l) {
        if (Te(l)) return;
        const M = e().onError?.();
        M && l instanceof Error && M(l),
          p(!1),
          C(l instanceof Error ? l : new Error(String(l)));
      }
    },
    object: r,
    error: w,
    isLoading: $,
    stop: () => {
      try {
        x?.abort();
      } catch {
      } finally {
        p(!1), (x = null);
      }
    },
  };
}
var We = Ae;
export { Ue as a, We as e, ze as u };
