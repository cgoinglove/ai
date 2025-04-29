const a = {
  context: void 0,
  registry: void 0,
  effects: void 0,
  done: !1,
  getContextId() {
    return he(this.context.count);
  },
  getNextContextId() {
    return he(this.context.count++);
  },
};
function he(e) {
  const t = String(e),
    n = t.length - 1;
  return a.context.id + (n ? String.fromCharCode(96 + n) : '') + t;
}
function j(e) {
  a.context = e;
}
function Ve() {
  return { ...a.context, id: a.getNextContextId(), count: 0 };
}
const _e = (e, t) => e === t,
  le = Symbol('solid-proxy'),
  qe = typeof Proxy == 'function',
  Me = Symbol('solid-track'),
  z = { equals: _e };
let D = null,
  Fe = Ie;
const v = 1,
  K = 2,
  Te = { owned: null, cleanups: null, context: null, owner: null },
  ie = {};
var g = null;
let u = null,
  Be = null,
  y = null,
  T = null,
  E = null,
  ee = 0;
function Y(e, t) {
  const n = y,
    s = g,
    i = e.length === 0,
    r = t === void 0 ? s : t,
    o = i
      ? Te
      : {
          owned: null,
          cleanups: null,
          context: r ? r.context : null,
          owner: r,
        },
    l = i ? e : () => e(() => O(() => q(o)));
  (g = o), (y = null);
  try {
    return $(l, !0);
  } finally {
    (y = n), (g = s);
  }
}
function H(e, t) {
  t = t ? Object.assign({}, z, t) : z;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    s = i => (
      typeof i == 'function' &&
        (u && u.running && u.sources.has(n)
          ? (i = i(n.tValue))
          : (i = i(n.value))),
      Ne(n, i)
    );
  return [$e.bind(n), s];
}
function ge(e, t, n) {
  const s = te(e, t, !0, v);
  W(s);
}
function F(e, t, n) {
  const s = te(e, t, !1, v);
  W(s);
}
function L(e, t, n) {
  n = n ? Object.assign({}, z, n) : z;
  const s = te(e, t, !0, 0);
  return (
    (s.observers = null),
    (s.observerSlots = null),
    (s.comparator = n.equals || void 0),
    W(s),
    $e.bind(s)
  );
}
function Re(e) {
  return e && typeof e == 'object' && 'then' in e;
}
function Ue(e, t, n) {
  let s, i, r;
  arguments.length === 1
    ? ((s = !0), (i = e), (r = {}))
    : ((s = e), (i = t), (r = {}));
  let o = null,
    l = ie,
    f = null,
    d = !1,
    h = !1,
    c = 'initialValue' in r,
    w = typeof s == 'function' && L(s);
  const p = new Set(),
    [m, A] = (r.storage || H)(r.initialValue),
    [N, P] = H(void 0),
    [C, k] = H(void 0, { equals: !1 }),
    [I, V] = H(c ? 'ready' : 'unresolved');
  a.context &&
    ((f = a.getNextContextId()),
    r.ssrLoadFrom === 'initial'
      ? (l = r.initialValue)
      : a.load && a.has(f) && (l = a.load(f)));
  function _(b, x, S, B) {
    return (
      o === b &&
        ((o = null),
        B !== void 0 && (c = !0),
        (b === l || x === l) &&
          r.onHydrated &&
          queueMicrotask(() => r.onHydrated(B, { value: x })),
        (l = ie),
        u && b && d
          ? (u.promises.delete(b),
            (d = !1),
            $(() => {
              (u.running = !0), de(x, S);
            }, !1))
          : de(x, S)),
      x
    );
  }
  function de(b, x) {
    $(() => {
      x === void 0 && A(() => b),
        V(x !== void 0 ? 'errored' : c ? 'ready' : 'unresolved'),
        P(x);
      for (const S of p.keys()) S.decrement();
      p.clear();
    }, !1);
  }
  function ne() {
    const b = G && Oe(G),
      x = m(),
      S = N();
    if (S !== void 0 && !o) throw S;
    return (
      y &&
        !y.user &&
        b &&
        ge(() => {
          C(),
            o &&
              (b.resolved && u && d
                ? u.promises.add(o)
                : p.has(b) || (b.increment(), p.add(b)));
        }),
      x
    );
  }
  function se(b = !0) {
    if (b !== !1 && h) return;
    h = !1;
    const x = w ? w() : s;
    if (((d = u && u.running), x == null || x === !1)) {
      _(o, O(m));
      return;
    }
    u && o && u.promises.delete(o);
    const S = l !== ie ? l : O(() => i(x, { value: m(), refetching: b }));
    return Re(S)
      ? ((o = S),
        'value' in S
          ? (S.status === 'success'
              ? _(o, S.value, void 0, x)
              : _(o, void 0, oe(S.value), x),
            S)
          : ((h = !0),
            queueMicrotask(() => (h = !1)),
            $(() => {
              V(c ? 'refreshing' : 'pending'), k();
            }, !1),
            S.then(
              B => _(S, B, void 0, x),
              B => _(S, void 0, oe(B), x),
            )))
      : (_(o, S, void 0, x), S);
  }
  return (
    Object.defineProperties(ne, {
      state: { get: () => I() },
      error: { get: () => N() },
      loading: {
        get() {
          const b = I();
          return b === 'pending' || b === 'refreshing';
        },
      },
      latest: {
        get() {
          if (!c) return ne();
          const b = N();
          if (b && !o) throw b;
          return m();
        },
      },
    }),
    w ? ge(() => se(!1)) : se(!1),
    [ne, { refetch: se, mutate: A }]
  );
}
function Tt(e) {
  return $(e, !1);
}
function O(e) {
  if (y === null) return e();
  const t = y;
  y = null;
  try {
    return e();
  } finally {
    y = t;
  }
}
function kt(e, t, n) {
  const s = Array.isArray(e);
  let i,
    r = n && n.defer;
  return o => {
    let l;
    if (s) {
      l = Array(e.length);
      for (let d = 0; d < e.length; d++) l[d] = e[d]();
    } else l = e();
    if (r) return (r = !1), o;
    const f = O(() => t(l, i, o));
    return (i = l), f;
  };
}
function ae(e) {
  return (
    g === null ||
      (g.cleanups === null ? (g.cleanups = [e]) : g.cleanups.push(e)),
    e
  );
}
function De(e, t) {
  D || (D = Symbol('error')),
    (g = te(void 0, void 0, !0)),
    (g.context = { ...g.context, [D]: [t] }),
    u && u.running && u.sources.add(g);
  try {
    return e();
  } catch (n) {
    J(n);
  } finally {
    g = g.owner;
  }
}
function Ye() {
  return g;
}
function Ot(e, t) {
  const n = g,
    s = y;
  (g = e), (y = null);
  try {
    return $(t, !0);
  } catch (i) {
    J(i);
  } finally {
    (g = n), (y = s);
  }
}
function $t(e) {
  if (u && u.running) return e(), u.done;
  const t = y,
    n = g;
  return Promise.resolve().then(() => {
    (y = t), (g = n);
    let s;
    return (
      G &&
        ((s =
          u ||
          (u = {
            sources: new Set(),
            effects: [],
            promises: new Set(),
            disposed: new Set(),
            queue: new Set(),
            running: !0,
          })),
        s.done || (s.done = new Promise(i => (s.resolve = i))),
        (s.running = !0)),
      $(e, !1),
      (y = g = null),
      s ? s.done : void 0
    );
  });
}
const [Nt, ye] = H(!1);
function Ke(e) {
  E.push.apply(E, e), (e.length = 0);
}
function ke(e, t) {
  const n = Symbol('context');
  return { id: n, Provider: Je(n), defaultValue: e };
}
function Oe(e) {
  let t;
  return g && g.context && (t = g.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function Ge(e) {
  const t = L(e),
    n = L(() => fe(t()));
  return (
    (n.toArray = () => {
      const s = n();
      return Array.isArray(s) ? s : s != null ? [s] : [];
    }),
    n
  );
}
let G;
function Xe() {
  return G || (G = ke());
}
function $e() {
  const e = u && u.running;
  if (this.sources && (e ? this.tState : this.state))
    if ((e ? this.tState : this.state) === v) W(this);
    else {
      const t = T;
      (T = null), $(() => Z(this), !1), (T = t);
    }
  if (y) {
    const t = this.observers ? this.observers.length : 0;
    y.sources
      ? (y.sources.push(this), y.sourceSlots.push(t))
      : ((y.sources = [this]), (y.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(y),
          this.observerSlots.push(y.sources.length - 1))
        : ((this.observers = [y]),
          (this.observerSlots = [y.sources.length - 1]));
  }
  return e && u.sources.has(this) ? this.tValue : this.value;
}
function Ne(e, t, n) {
  let s = u && u.running && u.sources.has(e) ? e.tValue : e.value;
  if (!e.comparator || !e.comparator(s, t)) {
    if (u) {
      const i = u.running;
      (i || (!n && u.sources.has(e))) && (u.sources.add(e), (e.tValue = t)),
        i || (e.value = t);
    } else e.value = t;
    e.observers &&
      e.observers.length &&
      $(() => {
        for (let i = 0; i < e.observers.length; i += 1) {
          const r = e.observers[i],
            o = u && u.running;
          (o && u.disposed.has(r)) ||
            ((o ? !r.tState : !r.state) &&
              (r.pure ? T.push(r) : E.push(r), r.observers && Le(r)),
            o ? (r.tState = v) : (r.state = v));
        }
        if (T.length > 1e6) throw ((T = []), new Error());
      }, !1);
  }
  return t;
}
function W(e) {
  if (!e.fn) return;
  q(e);
  const t = ee;
  we(e, u && u.running && u.sources.has(e) ? e.tValue : e.value, t),
    u &&
      !u.running &&
      u.sources.has(e) &&
      queueMicrotask(() => {
        $(() => {
          u && (u.running = !0),
            (y = g = e),
            we(e, e.tValue, t),
            (y = g = null);
        }, !1);
      });
}
function we(e, t, n) {
  let s;
  const i = g,
    r = y;
  y = g = e;
  try {
    s = e.fn(t);
  } catch (o) {
    return (
      e.pure &&
        (u && u.running
          ? ((e.tState = v),
            e.tOwned && e.tOwned.forEach(q),
            (e.tOwned = void 0))
          : ((e.state = v), e.owned && e.owned.forEach(q), (e.owned = null))),
      (e.updatedAt = n + 1),
      J(o)
    );
  } finally {
    (y = r), (g = i);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && 'observers' in e
      ? Ne(e, s, !0)
      : u && u.running && e.pure
        ? (u.sources.add(e), (e.tValue = s))
        : (e.value = s),
    (e.updatedAt = n));
}
function te(e, t, n, s = v, i) {
  const r = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: g,
    context: g ? g.context : null,
    pure: n,
  };
  return (
    u && u.running && ((r.state = 0), (r.tState = s)),
    g === null ||
      (g !== Te &&
        (u && u.running && g.pure
          ? g.tOwned
            ? g.tOwned.push(r)
            : (g.tOwned = [r])
          : g.owned
            ? g.owned.push(r)
            : (g.owned = [r]))),
    r
  );
}
function Pe(e) {
  const t = u && u.running;
  if ((t ? e.tState : e.state) === 0) return;
  if ((t ? e.tState : e.state) === K) return Z(e);
  if (e.suspense && O(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ee); ) {
    if (t && u.disposed.has(e)) return;
    (t ? e.tState : e.state) && n.push(e);
  }
  for (let s = n.length - 1; s >= 0; s--) {
    if (((e = n[s]), t)) {
      let i = e,
        r = n[s + 1];
      for (; (i = i.owner) && i !== r; ) if (u.disposed.has(i)) return;
    }
    if ((t ? e.tState : e.state) === v) W(e);
    else if ((t ? e.tState : e.state) === K) {
      const i = T;
      (T = null), $(() => Z(e, n[0]), !1), (T = i);
    }
  }
}
function $(e, t) {
  if (T) return e();
  let n = !1;
  t || (T = []), E ? (n = !0) : (E = []), ee++;
  try {
    const s = e();
    return We(n), s;
  } catch (s) {
    n || (E = null), (T = null), J(s);
  }
}
function We(e) {
  if ((T && (Ie(T), (T = null)), e)) return;
  let t;
  if (u) {
    if (!u.promises.size && !u.queue.size) {
      const s = u.sources,
        i = u.disposed;
      E.push.apply(E, u.effects), (t = u.resolve);
      for (const r of E) 'tState' in r && (r.state = r.tState), delete r.tState;
      (u = null),
        $(() => {
          for (const r of i) q(r);
          for (const r of s) {
            if (((r.value = r.tValue), r.owned))
              for (let o = 0, l = r.owned.length; o < l; o++) q(r.owned[o]);
            r.tOwned && (r.owned = r.tOwned),
              delete r.tValue,
              delete r.tOwned,
              (r.tState = 0);
          }
          ye(!1);
        }, !1);
    } else if (u.running) {
      (u.running = !1), u.effects.push.apply(u.effects, E), (E = null), ye(!0);
      return;
    }
  }
  const n = E;
  (E = null), n.length && $(() => Fe(n), !1), t && t();
}
function Ie(e) {
  for (let t = 0; t < e.length; t++) Pe(e[t]);
}
function Z(e, t) {
  const n = u && u.running;
  n ? (e.tState = 0) : (e.state = 0);
  for (let s = 0; s < e.sources.length; s += 1) {
    const i = e.sources[s];
    if (i.sources) {
      const r = n ? i.tState : i.state;
      r === v
        ? i !== t && (!i.updatedAt || i.updatedAt < ee) && Pe(i)
        : r === K && Z(i, t);
    }
  }
}
function Le(e) {
  const t = u && u.running;
  for (let n = 0; n < e.observers.length; n += 1) {
    const s = e.observers[n];
    (t ? !s.tState : !s.state) &&
      (t ? (s.tState = K) : (s.state = K),
      s.pure ? T.push(s) : E.push(s),
      s.observers && Le(s));
  }
}
function q(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        s = e.sourceSlots.pop(),
        i = n.observers;
      if (i && i.length) {
        const r = i.pop(),
          o = n.observerSlots.pop();
        s < i.length &&
          ((r.sourceSlots[o] = s), (i[s] = r), (n.observerSlots[s] = o));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) q(e.tOwned[t]);
    delete e.tOwned;
  }
  if (u && u.running && e.pure) ve(e, !0);
  else if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) q(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  u && u.running ? (e.tState = 0) : (e.state = 0);
}
function ve(e, t) {
  if ((t || ((e.tState = 0), u.disposed.add(e)), e.owned))
    for (let n = 0; n < e.owned.length; n++) ve(e.owned[n]);
}
function oe(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == 'string' ? e : 'Unknown error', { cause: e });
}
function pe(e, t, n) {
  try {
    for (const s of t) s(e);
  } catch (s) {
    J(s, (n && n.owner) || null);
  }
}
function J(e, t = g) {
  const n = D && t && t.context && t.context[D],
    s = oe(e);
  if (!n) throw s;
  E
    ? E.push({
        fn() {
          pe(s, n, t);
        },
        state: v,
      })
    : pe(s, n, t);
}
function fe(e) {
  if (typeof e == 'function' && !e.length) return fe(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const s = fe(e[n]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}
function Je(e, t) {
  return function (s) {
    let i;
    return (
      F(
        () =>
          (i = O(
            () => (
              (g.context = { ...g.context, [e]: s.value }), Ge(() => s.children)
            ),
          )),
        void 0,
      ),
      i
    );
  };
}
const Qe = Symbol('fallback');
function be(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function ze(e, t, n = {}) {
  let s = [],
    i = [],
    r = [],
    o = 0,
    l = t.length > 1 ? [] : null;
  return (
    ae(() => be(r)),
    () => {
      let f = e() || [],
        d = f.length,
        h,
        c;
      return (
        f[Me],
        O(() => {
          let p, m, A, N, P, C, k, I, V;
          if (d === 0)
            o !== 0 &&
              (be(r), (r = []), (s = []), (i = []), (o = 0), l && (l = [])),
              n.fallback &&
                ((s = [Qe]),
                (i[0] = Y(_ => ((r[0] = _), n.fallback()))),
                (o = 1));
          else if (o === 0) {
            for (i = new Array(d), c = 0; c < d; c++)
              (s[c] = f[c]), (i[c] = Y(w));
            o = d;
          } else {
            for (
              A = new Array(d),
                N = new Array(d),
                l && (P = new Array(d)),
                C = 0,
                k = Math.min(o, d);
              C < k && s[C] === f[C];
              C++
            );
            for (
              k = o - 1, I = d - 1;
              k >= C && I >= C && s[k] === f[I];
              k--, I--
            )
              (A[I] = i[k]), (N[I] = r[k]), l && (P[I] = l[k]);
            for (p = new Map(), m = new Array(I + 1), c = I; c >= C; c--)
              (V = f[c]),
                (h = p.get(V)),
                (m[c] = h === void 0 ? -1 : h),
                p.set(V, c);
            for (h = C; h <= k; h++)
              (V = s[h]),
                (c = p.get(V)),
                c !== void 0 && c !== -1
                  ? ((A[c] = i[h]),
                    (N[c] = r[h]),
                    l && (P[c] = l[h]),
                    (c = m[c]),
                    p.set(V, c))
                  : r[h]();
            for (c = C; c < d; c++)
              c in A
                ? ((i[c] = A[c]), (r[c] = N[c]), l && ((l[c] = P[c]), l[c](c)))
                : (i[c] = Y(w));
            (i = i.slice(0, (o = d))), (s = f.slice(0));
          }
          return i;
        })
      );
      function w(p) {
        if (((r[c] = p), l)) {
          const [m, A] = H(c);
          return (l[c] = A), t(f[c], m);
        }
        return t(f[c]);
      }
    }
  );
}
let je = !1;
function Ze() {
  je = !0;
}
function et(e, t) {
  if (je && a.context) {
    const n = a.context;
    j(Ve());
    const s = O(() => e(t || {}));
    return j(n), s;
  }
  return O(() => e(t || {}));
}
function Q() {
  return !0;
}
const tt = {
  get(e, t, n) {
    return t === le ? n : e.get(t);
  },
  has(e, t) {
    return t === le ? !0 : e.has(t);
  },
  set: Q,
  deleteProperty: Q,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Q,
      deleteProperty: Q,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function re(e) {
  return (e = typeof e == 'function' ? e() : e) ? e : {};
}
function nt() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function Pt(...e) {
  let t = !1;
  for (let o = 0; o < e.length; o++) {
    const l = e[o];
    (t = t || (!!l && le in l)),
      (e[o] = typeof l == 'function' ? ((t = !0), L(l)) : l);
  }
  if (qe && t)
    return new Proxy(
      {
        get(o) {
          for (let l = e.length - 1; l >= 0; l--) {
            const f = re(e[l])[o];
            if (f !== void 0) return f;
          }
        },
        has(o) {
          for (let l = e.length - 1; l >= 0; l--) if (o in re(e[l])) return !0;
          return !1;
        },
        keys() {
          const o = [];
          for (let l = 0; l < e.length; l++) o.push(...Object.keys(re(e[l])));
          return [...new Set(o)];
        },
      },
      tt,
    );
  const n = {},
    s = Object.create(null);
  for (let o = e.length - 1; o >= 0; o--) {
    const l = e[o];
    if (!l) continue;
    const f = Object.getOwnPropertyNames(l);
    for (let d = f.length - 1; d >= 0; d--) {
      const h = f[d];
      if (h === '__proto__' || h === 'constructor') continue;
      const c = Object.getOwnPropertyDescriptor(l, h);
      if (!s[h])
        s[h] = c.get
          ? {
              enumerable: !0,
              configurable: !0,
              get: nt.bind((n[h] = [c.get.bind(l)])),
            }
          : c.value !== void 0
            ? c
            : void 0;
      else {
        const w = n[h];
        w &&
          (c.get
            ? w.push(c.get.bind(l))
            : c.value !== void 0 && w.push(() => c.value));
      }
    }
  }
  const i = {},
    r = Object.keys(s);
  for (let o = r.length - 1; o >= 0; o--) {
    const l = r[o],
      f = s[l];
    f && f.get ? Object.defineProperty(i, l, f) : (i[l] = f ? f.value : void 0);
  }
  return i;
}
function It(e) {
  let t, n;
  const s = i => {
    const r = a.context;
    if (r) {
      const [l, f] = H();
      a.count || (a.count = 0),
        a.count++,
        (n || (n = e())).then(d => {
          !a.done && j(r), a.count--, f(() => d.default), j();
        }),
        (t = l);
    } else if (!t) {
      const [l] = Ue(() => (n || (n = e())).then(f => f.default));
      t = l;
    }
    let o;
    return L(() =>
      (o = t())
        ? O(() => {
            if (!r || a.done) return o(i);
            const l = a.context;
            j(r);
            const f = o(i);
            return j(l), f;
          })
        : '',
    );
  };
  return (
    (s.preload = () => n || ((n = e()).then(i => (t = () => i.default)), n)), s
  );
}
const st = e => `Stale read from <${e}>.`;
function Lt(e) {
  const t = 'fallback' in e && { fallback: () => e.fallback };
  return L(ze(() => e.each, e.children, t || void 0));
}
function vt(e) {
  const t = e.keyed,
    n = L(() => e.when, void 0, { equals: (s, i) => (t ? s === i : !s == !i) });
  return L(
    () => {
      const s = n();
      if (s) {
        const i = e.children;
        return typeof i == 'function' && i.length > 0
          ? O(() =>
              i(
                t
                  ? s
                  : () => {
                      if (!O(n)) throw st('Show');
                      return e.when;
                    },
              ),
            )
          : i;
      }
      return e.fallback;
    },
    void 0,
    void 0,
  );
}
let U;
function jt() {
  U && [...U].forEach(e => e());
}
function Ht(e) {
  let t;
  a.context && a.load && (t = a.load(a.getContextId()));
  const [n, s] = H(t, void 0);
  return (
    U || (U = new Set()),
    U.add(s),
    ae(() => U.delete(s)),
    L(
      () => {
        let i;
        if ((i = n())) {
          const r = e.fallback;
          return typeof r == 'function' && r.length
            ? O(() => r(i, () => s()))
            : r;
        }
        return De(() => e.children, s);
      },
      void 0,
      void 0,
    )
  );
}
const it = ke();
function Vt(e) {
  let t = 0,
    n,
    s,
    i,
    r,
    o;
  const [l, f] = H(!1),
    d = Xe(),
    h = {
      increment: () => {
        ++t === 1 && f(!0);
      },
      decrement: () => {
        --t === 0 && f(!1);
      },
      inFallback: l,
      effects: [],
      resolved: !1,
    },
    c = Ye();
  if (a.context && a.load) {
    const m = a.getContextId();
    let A = a.load(m);
    if (
      (A &&
        (typeof A != 'object' || A.status !== 'success'
          ? (i = A)
          : a.gather(m)),
      i && i !== '$$f')
    ) {
      const [N, P] = H(void 0, { equals: !1 });
      (r = N),
        i.then(
          () => {
            if (a.done) return P();
            a.gather(m), j(s), P(), j();
          },
          C => {
            (o = C), P();
          },
        );
    }
  }
  const w = Oe(it);
  w && (n = w.register(h.inFallback));
  let p;
  return (
    ae(() => p && p()),
    et(d.Provider, {
      value: h,
      get children() {
        return L(() => {
          if (o) throw o;
          if (((s = a.context), r)) return r(), (r = void 0);
          s && i === '$$f' && j();
          const m = L(() => e.children);
          return L(A => {
            const N = h.inFallback(),
              { showContent: P = !0, showFallback: C = !0 } = n ? n() : {};
            if ((!N || (i && i !== '$$f')) && P)
              return (
                (h.resolved = !0),
                p && p(),
                (p = s = i = void 0),
                Ke(h.effects),
                m()
              );
            if (C)
              return p
                ? A
                : Y(
                    k => (
                      (p = k),
                      s && (j({ id: s.id + 'F', count: 0 }), (s = void 0)),
                      e.fallback
                    ),
                    c,
                  );
          });
        });
      },
    })
  );
}
const rt = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'disabled',
    'formnovalidate',
    'hidden',
    'indeterminate',
    'inert',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'seamless',
    'selected',
  ],
  lt = new Set([
    'className',
    'value',
    'readOnly',
    'formNoValidate',
    'isMap',
    'noModule',
    'playsInline',
    ...rt,
  ]),
  ot = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
  ft = Object.assign(Object.create(null), {
    className: 'class',
    htmlFor: 'for',
  }),
  ut = Object.assign(Object.create(null), {
    class: 'className',
    formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
    ismap: { $: 'isMap', IMG: 1 },
    nomodule: { $: 'noModule', SCRIPT: 1 },
    playsinline: { $: 'playsInline', VIDEO: 1 },
    readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 },
  });
function ct(e, t) {
  const n = ut[e];
  return typeof n == 'object' ? (n[t] ? n.$ : void 0) : n;
}
const at = new Set([
  'beforeinput',
  'click',
  'dblclick',
  'contextmenu',
  'focusin',
  'focusout',
  'input',
  'keydown',
  'keyup',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pointerdown',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'touchend',
  'touchmove',
  'touchstart',
]);
function dt(e, t, n) {
  let s = n.length,
    i = t.length,
    r = s,
    o = 0,
    l = 0,
    f = t[i - 1].nextSibling,
    d = null;
  for (; o < i || l < r; ) {
    if (t[o] === n[l]) {
      o++, l++;
      continue;
    }
    for (; t[i - 1] === n[r - 1]; ) i--, r--;
    if (i === o) {
      const h = r < s ? (l ? n[l - 1].nextSibling : n[r - l]) : f;
      for (; l < r; ) e.insertBefore(n[l++], h);
    } else if (r === l)
      for (; o < i; ) (!d || !d.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[r - 1] && n[l] === t[i - 1]) {
      const h = t[--i].nextSibling;
      e.insertBefore(n[l++], t[o++].nextSibling),
        e.insertBefore(n[--r], h),
        (t[i] = n[r]);
    } else {
      if (!d) {
        d = new Map();
        let c = l;
        for (; c < r; ) d.set(n[c], c++);
      }
      const h = d.get(t[o]);
      if (h != null)
        if (l < h && h < r) {
          let c = o,
            w = 1,
            p;
          for (
            ;
            ++c < i && c < r && !((p = d.get(t[c])) == null || p !== h + w);

          )
            w++;
          if (w > h - l) {
            const m = t[o];
            for (; l < h; ) e.insertBefore(n[l++], m);
          } else e.replaceChild(n[l++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
const me = '_$DX_DELEGATE';
function xe(e, t, n, s = {}) {
  let i;
  return (
    Y(r => {
      (i = r),
        t === document ? e() : xt(t, e(), t.firstChild ? null : void 0, n);
    }, s.owner),
    () => {
      i(), (t.textContent = '');
    }
  );
}
function _t(e, t, n) {
  let s;
  const i = () => {
      const o = document.createElement('template');
      return (o.innerHTML = e), o.content.firstChild;
    },
    r = () => (s || (s = i())).cloneNode(!0);
  return (r.cloneNode = r), r;
}
function ht(e, t = window.document) {
  const n = t[me] || (t[me] = new Set());
  for (let s = 0, i = e.length; s < i; s++) {
    const r = e[s];
    n.has(r) || (n.add(r), t.addEventListener(r, He));
  }
}
function qt(e, t, n) {
  M(e) || (e[t] = n);
}
function ue(e, t, n) {
  M(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function gt(e, t, n) {
  M(e) || (n ? e.setAttribute(t, '') : e.removeAttribute(t));
}
function yt(e, t) {
  M(e) || (t == null ? e.removeAttribute('class') : (e.className = t));
}
function wt(e, t, n, s) {
  if (s)
    Array.isArray(n)
      ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
      : (e[`$$${t}`] = n);
  else if (Array.isArray(n)) {
    const i = n[0];
    e.addEventListener(t, (n[0] = r => i.call(e, n[1], r)));
  } else e.addEventListener(t, n, typeof n != 'function' && n);
}
function pt(e, t, n = {}) {
  const s = Object.keys(t || {}),
    i = Object.keys(n);
  let r, o;
  for (r = 0, o = i.length; r < o; r++) {
    const l = i[r];
    !l || l === 'undefined' || t[l] || (Se(e, l, !1), delete n[l]);
  }
  for (r = 0, o = s.length; r < o; r++) {
    const l = s[r],
      f = !!t[l];
    !l || l === 'undefined' || n[l] === f || !f || (Se(e, l, !0), (n[l] = f));
  }
  return n;
}
function bt(e, t, n) {
  if (!t) return n ? ue(e, 'style') : t;
  const s = e.style;
  if (typeof t == 'string') return (s.cssText = t);
  typeof n == 'string' && (s.cssText = n = void 0),
    n || (n = {}),
    t || (t = {});
  let i, r;
  for (r in n) t[r] == null && s.removeProperty(r), delete n[r];
  for (r in t) (i = t[r]), i !== n[r] && (s.setProperty(r, i), (n[r] = i));
  return n;
}
function Mt(e, t = {}, n, s) {
  const i = {};
  return (
    s || F(() => (i.children = X(e, t.children, i.children))),
    F(() => typeof t.ref == 'function' && mt(t.ref, e)),
    F(() => St(e, t, n, !0, i, !0)),
    i
  );
}
function mt(e, t, n) {
  return O(() => e(t, n));
}
function xt(e, t, n, s) {
  if ((n !== void 0 && !s && (s = []), typeof t != 'function'))
    return X(e, t, s, n);
  F(i => X(e, t(), i, n), s);
}
function St(e, t, n, s, i = {}, r = !1) {
  t || (t = {});
  for (const o in i)
    if (!(o in t)) {
      if (o === 'children') continue;
      i[o] = Ae(e, o, null, i[o], n, r, t);
    }
  for (const o in t) {
    if (o === 'children') continue;
    const l = t[o];
    i[o] = Ae(e, o, l, i[o], n, r, t);
  }
}
function At(e, t, n = {}) {
  if (globalThis._$HY.done) return xe(e, t, [...t.childNodes], n);
  (a.completed = globalThis._$HY.completed),
    (a.events = globalThis._$HY.events),
    (a.load = s => globalThis._$HY.r[s]),
    (a.has = s => s in globalThis._$HY.r),
    (a.gather = s => Ee(t, s)),
    (a.registry = new Map()),
    (a.context = { id: n.renderId || '', count: 0 });
  try {
    return Ee(t, n.renderId), xe(e, t, [...t.childNodes], n);
  } finally {
    a.context = null;
  }
}
function Ft(e) {
  let t, n;
  return !M() || !(t = a.registry.get((n = Et())))
    ? e()
    : (a.completed && a.completed.add(t), a.registry.delete(n), t);
}
function Bt(e) {
  let t = e,
    n = 0,
    s = [];
  if (M(e))
    for (; t; ) {
      if (t.nodeType === 8) {
        const i = t.nodeValue;
        if (i === '$') n++;
        else if (i === '/') {
          if (n === 0) return [t, s];
          n--;
        }
      }
      s.push(t), (t = t.nextSibling);
    }
  return [t, s];
}
function Rt() {
  a.events &&
    !a.events.queued &&
    (queueMicrotask(() => {
      const { completed: e, events: t } = a;
      if (t) {
        for (t.queued = !1; t.length; ) {
          const [n, s] = t[0];
          if (!e.has(n)) return;
          t.shift(), He(s);
        }
        a.done &&
          ((a.events = _$HY.events = null),
          (a.completed = _$HY.completed = null));
      }
    }),
    (a.events.queued = !0));
}
function M(e) {
  return !!a.context && !a.done && (!e || e.isConnected);
}
function Ct(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Se(e, t, n) {
  const s = t.trim().split(/\s+/);
  for (let i = 0, r = s.length; i < r; i++) e.classList.toggle(s[i], n);
}
function Ae(e, t, n, s, i, r, o) {
  let l, f, d, h, c;
  if (t === 'style') return bt(e, n, s);
  if (t === 'classList') return pt(e, n, s);
  if (n === s) return s;
  if (t === 'ref') r || n(e);
  else if (t.slice(0, 3) === 'on:') {
    const w = t.slice(3);
    s && e.removeEventListener(w, s, typeof s != 'function' && s),
      n && e.addEventListener(w, n, typeof n != 'function' && n);
  } else if (t.slice(0, 10) === 'oncapture:') {
    const w = t.slice(10);
    s && e.removeEventListener(w, s, !0), n && e.addEventListener(w, n, !0);
  } else if (t.slice(0, 2) === 'on') {
    const w = t.slice(2).toLowerCase(),
      p = at.has(w);
    if (!p && s) {
      const m = Array.isArray(s) ? s[0] : s;
      e.removeEventListener(w, m);
    }
    (p || n) && (wt(e, w, n, p), p && ht([w]));
  } else if (t.slice(0, 5) === 'attr:') ue(e, t.slice(5), n);
  else if (t.slice(0, 5) === 'bool:') gt(e, t.slice(5), n);
  else if (
    (c = t.slice(0, 5) === 'prop:') ||
    (d = ot.has(t)) ||
    (h = ct(t, e.tagName)) ||
    (f = lt.has(t)) ||
    (l = e.nodeName.includes('-') || 'is' in o)
  ) {
    if (c) (t = t.slice(5)), (f = !0);
    else if (M(e)) return n;
    t === 'class' || t === 'className'
      ? yt(e, n)
      : l && !f && !d
        ? (e[Ct(t)] = n)
        : (e[h || t] = n);
  } else ue(e, ft[t] || t, n);
  return n;
}
function He(e) {
  if (a.registry && a.events && a.events.find(([f, d]) => d === e)) return;
  let t = e.target;
  const n = `$$${e.type}`,
    s = e.target,
    i = e.currentTarget,
    r = f => Object.defineProperty(e, 'target', { configurable: !0, value: f }),
    o = () => {
      const f = t[n];
      if (f && !t.disabled) {
        const d = t[`${n}Data`];
        if ((d !== void 0 ? f.call(t, d, e) : f.call(t, e), e.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != 'string' &&
          !t.host._$host &&
          t.contains(e.target) &&
          r(t.host),
        !0
      );
    },
    l = () => {
      for (; o() && (t = t._$host || t.parentNode || t.host); );
    };
  if (
    (Object.defineProperty(e, 'currentTarget', {
      configurable: !0,
      get() {
        return t || document;
      },
    }),
    a.registry && !a.done && (a.done = _$HY.done = !0),
    e.composedPath)
  ) {
    const f = e.composedPath();
    r(f[0]);
    for (let d = 0; d < f.length - 2 && ((t = f[d]), !!o()); d++) {
      if (t._$host) {
        (t = t._$host), l();
        break;
      }
      if (t.parentNode === i) break;
    }
  } else l();
  r(s);
}
function X(e, t, n, s, i) {
  const r = M(e);
  if (r) {
    !n && (n = [...e.childNodes]);
    let f = [];
    for (let d = 0; d < n.length; d++) {
      const h = n[d];
      h.nodeType === 8 && h.data.slice(0, 2) === '!$' ? h.remove() : f.push(h);
    }
    n = f;
  }
  for (; typeof n == 'function'; ) n = n();
  if (t === n) return n;
  const o = typeof t,
    l = s !== void 0;
  if (
    ((e = (l && n[0] && n[0].parentNode) || e),
    o === 'string' || o === 'number')
  ) {
    if (r || (o === 'number' && ((t = t.toString()), t === n))) return n;
    if (l) {
      let f = n[0];
      f && f.nodeType === 3
        ? f.data !== t && (f.data = t)
        : (f = document.createTextNode(t)),
        (n = R(e, n, s, f));
    } else
      n !== '' && typeof n == 'string'
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || o === 'boolean') {
    if (r) return n;
    n = R(e, n, s);
  } else {
    if (o === 'function')
      return (
        F(() => {
          let f = t();
          for (; typeof f == 'function'; ) f = f();
          n = X(e, f, n, s);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const f = [],
        d = n && Array.isArray(n);
      if (ce(f, t, n, i)) return F(() => (n = X(e, f, n, s, !0))), () => n;
      if (r) {
        if (!f.length) return n;
        if (s === void 0) return (n = [...e.childNodes]);
        let h = f[0];
        if (h.parentNode !== e) return n;
        const c = [h];
        for (; (h = h.nextSibling) !== s; ) c.push(h);
        return (n = c);
      }
      if (f.length === 0) {
        if (((n = R(e, n, s)), l)) return n;
      } else
        d
          ? n.length === 0
            ? Ce(e, f, s)
            : dt(e, n, f)
          : (n && R(e), Ce(e, f));
      n = f;
    } else if (t.nodeType) {
      if (r && t.parentNode) return (n = l ? [t] : t);
      if (Array.isArray(n)) {
        if (l) return (n = R(e, n, s, t));
        R(e, n, null, t);
      } else
        n == null || n === '' || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function ce(e, t, n, s) {
  let i = !1;
  for (let r = 0, o = t.length; r < o; r++) {
    let l = t[r],
      f = n && n[e.length],
      d;
    if (!(l == null || l === !0 || l === !1))
      if ((d = typeof l) == 'object' && l.nodeType) e.push(l);
      else if (Array.isArray(l)) i = ce(e, l, f) || i;
      else if (d === 'function')
        if (s) {
          for (; typeof l == 'function'; ) l = l();
          i =
            ce(e, Array.isArray(l) ? l : [l], Array.isArray(f) ? f : [f]) || i;
        } else e.push(l), (i = !0);
      else {
        const h = String(l);
        f && f.nodeType === 3 && f.data === h
          ? e.push(f)
          : e.push(document.createTextNode(h));
      }
  }
  return i;
}
function Ce(e, t, n = null) {
  for (let s = 0, i = t.length; s < i; s++) e.insertBefore(t[s], n);
}
function R(e, t, n, s) {
  if (n === void 0) return (e.textContent = '');
  const i = s || document.createTextNode('');
  if (t.length) {
    let r = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (i !== l) {
        const f = l.parentNode === e;
        !r && !o
          ? f
            ? e.replaceChild(i, l)
            : e.insertBefore(i, n)
          : f && l.remove();
      } else r = !0;
    }
  } else e.insertBefore(i, n);
  return [i];
}
function Ee(e, t) {
  const n = e.querySelectorAll('*[data-hk]');
  for (let s = 0; s < n.length; s++) {
    const i = n[s],
      r = i.getAttribute('data-hk');
    (!t || r.startsWith(t)) && !a.registry.has(r) && a.registry.set(r, i);
  }
}
function Et() {
  return a.getNextContextId();
}
const Ut = () => {},
  Dt = !1,
  Yt = (...e) => (Ze(), At(...e));
export {
  It as A,
  Vt as B,
  Yt as C,
  Bt as D,
  Ht as E,
  wt as F,
  Lt as G,
  qt as H,
  mt as I,
  ue as J,
  vt as S,
  ke as a,
  H as b,
  L as c,
  F as d,
  O as e,
  Tt as f,
  Ye as g,
  jt as h,
  Dt as i,
  et as j,
  Ge as k,
  Y as l,
  ae as m,
  a as n,
  kt as o,
  ht as p,
  Ft as q,
  Ot as r,
  $t as s,
  _t as t,
  Oe as u,
  Ut as v,
  Mt as w,
  Pt as x,
  xt as y,
  Rt as z,
};
