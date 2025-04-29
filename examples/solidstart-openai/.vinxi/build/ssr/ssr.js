import {
  isServer as C,
  getRequestEvent as N,
  createComponent as v,
  delegateEvents as Qe,
  ssrElement as z,
  escape as $,
  mergeProps as Ze,
  ssr as P,
  ssrHydrationKey as O,
  useAssets as et,
  NoHydration as Se,
  Hydration as tt,
  ssrAttribute as G,
  HydrationScript as rt,
  renderToString as nt,
  renderToStream as st,
} from 'solid-js/web';
import {
  getOwner as Ee,
  runWithOwner as $e,
  createMemo as A,
  createContext as Pe,
  createSignal as F,
  createRenderEffect as ot,
  on as se,
  useContext as at,
  startTransition as it,
  resetErrorBoundaries as ct,
  batch as lt,
  untrack as Ae,
  createComponent as Ce,
  children as ut,
  Show as Te,
  createRoot as dt,
  onCleanup as oe,
  sharedConfig as j,
  lazy as pt,
  Suspense as ht,
  catchError as ft,
  ErrorBoundary as mt,
} from 'solid-js';
import { provideRequestEvent as gt } from 'solid-js/web/storage';
import {
  H3Event as Z,
  setResponseStatus as yt,
  setHeader as wt,
  getRequestIP as vt,
  getResponseStatus as Rt,
  getResponseStatusText as bt,
  getResponseHeader as xt,
  setResponseHeader as St,
  removeResponseHeader as Et,
  appendResponseHeader as $t,
  getResponseHeaders as Pt,
  getRequestURL as At,
  getRequestWebStream as Ct,
  sendRedirect as Tt,
  getCookie as Lt,
  setCookie as kt,
  eventHandler as Ot,
} from 'h3';
import { AsyncLocalStorage as Nt } from 'node:async_hooks';
function Le() {
  let e = new Set();
  function t(n) {
    return e.add(n), () => e.delete(n);
  }
  let r = !1;
  function s(n, a) {
    if (r) return !(r = !1);
    const o = {
      to: n,
      options: a,
      defaultPrevented: !1,
      preventDefault: () => (o.defaultPrevented = !0),
    };
    for (const i of e)
      i.listener({
        ...o,
        from: i.location,
        retry: l => {
          l && (r = !0), i.navigate(n, { ...a, resolve: !1 });
        },
      });
    return !o.defaultPrevented;
  }
  return { subscribe: t, confirm: s };
}
let ee;
function ae() {
  (!window.history.state || window.history.state._depth == null) &&
    window.history.replaceState(
      { ...window.history.state, _depth: window.history.length - 1 },
      '',
    ),
    (ee = window.history.state._depth);
}
C || ae();
function _t(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function qt(e, t) {
  let r = !1;
  return () => {
    const s = ee;
    ae();
    const n = s == null ? null : ee - s;
    if (r) {
      r = !1;
      return;
    }
    n && t(n) ? ((r = !0), window.history.go(-n)) : e();
  };
}
const Ht = /^(?:[a-z0-9]+:)?\/\//i,
  jt = /^\/+|(\/)\/+$/g,
  ke = 'http://sr';
function D(e, t = !1) {
  const r = e.replace(jt, '$1');
  return r ? (t || /^[?#]/.test(r) ? r : '/' + r) : '';
}
function V(e, t, r) {
  if (Ht.test(t)) return;
  const s = D(e),
    n = r && D(r);
  let a = '';
  return (
    !n || t.startsWith('/')
      ? (a = s)
      : n.toLowerCase().indexOf(s.toLowerCase()) !== 0
        ? (a = s + n)
        : (a = n),
    (a || '/') + D(t, !a)
  );
}
function Ut(e, t) {
  return D(e).replace(/\/*(\*.*)?$/g, '') + D(t);
}
function Oe(e) {
  const t = {};
  return (
    e.searchParams.forEach((r, s) => {
      s in t
        ? Array.isArray(t[s])
          ? t[s].push(r)
          : (t[s] = [t[s], r])
        : (t[s] = r);
    }),
    t
  );
}
function It(e, t, r) {
  const [s, n] = e.split('/*', 2),
    a = s.split('/').filter(Boolean),
    o = a.length;
  return i => {
    const l = i.split('/').filter(Boolean),
      c = l.length - o;
    if (c < 0 || (c > 0 && n === void 0 && !t)) return null;
    const u = { path: o ? '' : '/', params: {} },
      g = d => (r === void 0 ? void 0 : r[d]);
    for (let d = 0; d < o; d++) {
      const h = a[d],
        b = h[0] === ':',
        p = b ? l[d] : l[d].toLowerCase(),
        f = b ? h.slice(1) : h.toLowerCase();
      if (b && X(p, g(f))) u.params[f] = p;
      else if (b || !X(p, f)) return null;
      u.path += `/${p}`;
    }
    if (n) {
      const d = c ? l.slice(-c).join('/') : '';
      if (X(d, g(n))) u.params[n] = d;
      else return null;
    }
    return u;
  };
}
function X(e, t) {
  const r = s => s === e;
  return t === void 0
    ? !0
    : typeof t == 'string'
      ? r(t)
      : typeof t == 'function'
        ? t(e)
        : Array.isArray(t)
          ? t.some(r)
          : t instanceof RegExp
            ? t.test(e)
            : !1;
}
function Ft(e) {
  const [t, r] = e.pattern.split('/*', 2),
    s = t.split('/').filter(Boolean);
  return s.reduce(
    (n, a) => n + (a.startsWith(':') ? 2 : 3),
    s.length - (r === void 0 ? 0 : 1),
  );
}
function Ne(e) {
  const t = new Map(),
    r = Ee();
  return new Proxy(
    {},
    {
      get(s, n) {
        return (
          t.has(n) ||
            $e(r, () =>
              t.set(
                n,
                A(() => e()[n]),
              ),
            ),
          t.get(n)()
        );
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      },
      ownKeys() {
        return Reflect.ownKeys(e());
      },
    },
  );
}
function _e(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let r = e.slice(0, t.index),
    s = e.slice(t.index + t[0].length);
  const n = [r, (r += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(s)); )
    n.push((r += t[1])), (s = s.slice(t[0].length));
  return _e(s).reduce((a, o) => [...a, ...n.map(i => i + o)], []);
}
const Dt = 100,
  Mt = Pe(),
  qe = Pe();
function Wt(e, t = '') {
  const { component: r, preload: s, load: n, children: a, info: o } = e,
    i = !a || (Array.isArray(a) && !a.length),
    l = { key: e, component: r, preload: s || n, info: o };
  return He(e.path).reduce((c, u) => {
    for (const g of _e(u)) {
      const d = Ut(t, g);
      let h = i ? d : d.split('/*', 1)[0];
      (h = h
        .split('/')
        .map(b =>
          b.startsWith(':') || b.startsWith('*') ? b : encodeURIComponent(b),
        )
        .join('/')),
        c.push({
          ...l,
          originalPath: u,
          pattern: h,
          matcher: It(h, !i, e.matchFilters),
        });
    }
    return c;
  }, []);
}
function Bt(e, t = 0) {
  return {
    routes: e,
    score: Ft(e[e.length - 1]) * 1e4 - t,
    matcher(r) {
      const s = [];
      for (let n = e.length - 1; n >= 0; n--) {
        const a = e[n],
          o = a.matcher(r);
        if (!o) return null;
        s.unshift({ ...o, route: a });
      }
      return s;
    },
  };
}
function He(e) {
  return Array.isArray(e) ? e : [e];
}
function je(e, t = '', r = [], s = []) {
  const n = He(e);
  for (let a = 0, o = n.length; a < o; a++) {
    const i = n[a];
    if (i && typeof i == 'object') {
      i.hasOwnProperty('path') || (i.path = '');
      const l = Wt(i, t);
      for (const c of l) {
        r.push(c);
        const u = Array.isArray(i.children) && i.children.length === 0;
        if (i.children && !u) je(i.children, c.pattern, r, s);
        else {
          const g = Bt([...r], s.length);
          s.push(g);
        }
        r.pop();
      }
    }
  }
  return r.length ? s : s.sort((a, o) => o.score - a.score);
}
function M(e, t) {
  for (let r = 0, s = e.length; r < s; r++) {
    const n = e[r].matcher(t);
    if (n) return n;
  }
  return [];
}
function Kt(e, t, r) {
  const s = new URL(ke),
    n = A(
      u => {
        const g = e();
        try {
          return new URL(g, s);
        } catch {
          return console.error(`Invalid path ${g}`), u;
        }
      },
      s,
      { equals: (u, g) => u.href === g.href },
    ),
    a = A(() => n().pathname),
    o = A(() => n().search, !0),
    i = A(() => n().hash),
    l = () => '',
    c = se(o, () => Oe(n()));
  return {
    get pathname() {
      return a();
    },
    get search() {
      return o();
    },
    get hash() {
      return i();
    },
    get state() {
      return t();
    },
    get key() {
      return l();
    },
    query: r ? r(c) : Ne(c),
  };
}
let k;
function zt() {
  return k;
}
function Gt(e, t, r, s = {}) {
  const {
      signal: [n, a],
      utils: o = {},
    } = e,
    i = o.parsePath || (m => m),
    l = o.renderPath || (m => m),
    c = o.beforeLeave || Le(),
    u = V('', s.base || '');
  if (u === void 0) throw new Error(`${u} is not a valid base path`);
  u && !n().value && a({ value: u, replace: !0, scroll: !1 });
  const [g, d] = F(!1);
  let h;
  const b = (m, y) => {
      (y.value === p() && y.state === R()) ||
        (h === void 0 && d(!0),
        (k = m),
        (h = y),
        it(() => {
          h === y && (f(h.value), w(h.state), ct(), C || L[1]([]));
        }).finally(() => {
          h === y &&
            lt(() => {
              (k = void 0), m === 'navigate' && Ve(h), d(!1), (h = void 0);
            });
        }));
    },
    [p, f] = F(n().value),
    [R, w] = F(n().state),
    T = Kt(p, R, o.queryWrapper),
    E = [],
    L = F(C ? Xe() : []),
    I = A(() =>
      typeof s.transformUrl == 'function'
        ? M(t(), s.transformUrl(T.pathname))
        : M(t(), T.pathname),
    ),
    ie = () => {
      const m = I(),
        y = {};
      for (let S = 0; S < m.length; S++) Object.assign(y, m[S].params);
      return y;
    },
    ze = o.paramsWrapper ? o.paramsWrapper(ie, t) : Ne(ie),
    ce = {
      pattern: u,
      path: () => u,
      outlet: () => null,
      resolvePath(m) {
        return V(u, m);
      },
    };
  return (
    ot(se(n, m => b('native', m), { defer: !0 })),
    {
      base: ce,
      location: T,
      params: ze,
      isRouting: g,
      renderPath: l,
      parsePath: i,
      navigatorFactory: Je,
      matches: I,
      beforeLeave: c,
      preloadRoute: Ye,
      singleFlight: s.singleFlight === void 0 ? !0 : s.singleFlight,
      submissions: L,
    }
  );
  function Ge(m, y, S) {
    Ae(() => {
      if (typeof y == 'number') {
        y &&
          (o.go
            ? o.go(y)
            : console.warn(
                'Router integration does not support relative routing',
              ));
        return;
      }
      const W = !y || y[0] === '?',
        {
          replace: B,
          resolve: _,
          scroll: K,
          state: q,
        } = { replace: !1, resolve: !W, scroll: !0, ...S },
        H = _ ? m.resolvePath(y) : V((W && T.pathname) || '', y);
      if (H === void 0) throw new Error(`Path '${y}' is not a routable path`);
      if (E.length >= Dt) throw new Error('Too many redirects');
      const le = p();
      if (H !== le || q !== R())
        if (C) {
          const ue = N();
          ue &&
            (ue.response = {
              status: 302,
              headers: new Headers({ Location: H }),
            }),
            a({ value: H, replace: B, scroll: K, state: q });
        } else
          c.confirm(H, S) &&
            (E.push({ value: le, replace: B, scroll: K, state: R() }),
            b('navigate', { value: H, state: q }));
    });
  }
  function Je(m) {
    return (m = m || at(qe) || ce), (y, S) => Ge(m, y, S);
  }
  function Ve(m) {
    const y = E[0];
    y && (a({ ...m, replace: y.replace, scroll: y.scroll }), (E.length = 0));
  }
  function Ye(m, y) {
    const S = M(t(), m.pathname),
      W = k;
    k = 'preload';
    for (let B in S) {
      const { route: _, params: K } = S[B];
      _.component && _.component.preload && _.component.preload();
      const { preload: q } = _;
      y &&
        q &&
        $e(r(), () =>
          q({
            params: K,
            location: {
              pathname: m.pathname,
              search: m.search,
              hash: m.hash,
              query: Oe(m),
              state: null,
              key: '',
            },
            intent: 'preload',
          }),
        );
    }
    k = W;
  }
  function Xe() {
    const m = N();
    return m && m.router && m.router.submission ? [m.router.submission] : [];
  }
}
function Jt(e, t, r, s) {
  const { base: n, location: a, params: o } = e,
    { pattern: i, component: l, preload: c } = s().route,
    u = A(() => s().path);
  l && l.preload && l.preload();
  const g = c ? c({ params: o, location: a, intent: k || 'initial' }) : void 0;
  return {
    parent: t,
    pattern: i,
    path: u,
    outlet: () =>
      l
        ? Ce(l, {
            params: o,
            location: a,
            data: g,
            get children() {
              return r();
            },
          })
        : r(),
    resolvePath(h) {
      return V(n.path(), h, u());
    },
  };
}
const Ue = e => t => {
  const { base: r } = t,
    s = ut(() => t.children),
    n = A(() => je(s(), t.base || ''));
  let a;
  const o = Gt(e, n, () => a, {
    base: r,
    singleFlight: t.singleFlight,
    transformUrl: t.transformUrl,
  });
  return (
    e.create && e.create(o),
    v(Mt.Provider, {
      value: o,
      get children() {
        return v(Vt, {
          routerState: o,
          get root() {
            return t.root;
          },
          get preload() {
            return t.rootPreload || t.rootLoad;
          },
          get children() {
            return [
              (a = Ee()) && null,
              v(Yt, {
                routerState: o,
                get branches() {
                  return n();
                },
              }),
            ];
          },
        });
      },
    })
  );
};
function Vt(e) {
  const t = e.routerState.location,
    r = e.routerState.params,
    s = A(
      () =>
        e.preload &&
        Ae(() => {
          e.preload({ params: r, location: t, intent: zt() || 'initial' });
        }),
    );
  return v(Te, {
    get when() {
      return e.root;
    },
    keyed: !0,
    get fallback() {
      return e.children;
    },
    children: n =>
      v(n, {
        params: r,
        location: t,
        get data() {
          return s();
        },
        get children() {
          return e.children;
        },
      }),
  });
}
function Yt(e) {
  if (C) {
    const n = N();
    if (n && n.router && n.router.dataOnly) {
      Xt(n, e.routerState, e.branches);
      return;
    }
    n &&
      ((n.router || (n.router = {})).matches ||
        (n.router.matches = e.routerState
          .matches()
          .map(({ route: a, path: o, params: i }) => ({
            path: a.originalPath,
            pattern: a.pattern,
            match: o,
            params: i,
            info: a.info,
          }))));
  }
  const t = [];
  let r;
  const s = A(
    se(e.routerState.matches, (n, a, o) => {
      let i = a && n.length === a.length;
      const l = [];
      for (let c = 0, u = n.length; c < u; c++) {
        const g = a && a[c],
          d = n[c];
        o && g && d.route.key === g.route.key
          ? (l[c] = o[c])
          : ((i = !1),
            t[c] && t[c](),
            dt(h => {
              (t[c] = h),
                (l[c] = Jt(
                  e.routerState,
                  l[c - 1] || e.routerState.base,
                  de(() => s()[c + 1]),
                  () => e.routerState.matches()[c],
                ));
            }));
      }
      return t.splice(n.length).forEach(c => c()), o && i ? o : ((r = l[0]), l);
    }),
  );
  return de(() => s() && r)();
}
const de = e => () =>
  v(Te, {
    get when() {
      return e();
    },
    keyed: !0,
    children: t =>
      v(qe.Provider, {
        value: t,
        get children() {
          return t.outlet();
        },
      }),
  });
function Xt(e, t, r) {
  const s = new URL(e.request.url),
    n = M(r, new URL(e.router.previousUrl || e.request.url).pathname),
    a = M(r, s.pathname);
  for (let o = 0; o < a.length; o++) {
    (!n[o] || a[o].route !== n[o].route) && (e.router.dataOnly = !0);
    const { route: i, params: l } = a[o];
    i.preload &&
      i.preload({ params: l, location: t.location, intent: 'preload' });
  }
}
function Qt([e, t], r, s) {
  return [e, s ? n => t(s(n)) : t];
}
function Zt(e) {
  let t = !1;
  const r = n => (typeof n == 'string' ? { value: n } : n),
    s = Qt(
      F(r(e.get()), {
        equals: (n, a) => n.value === a.value && n.state === a.state,
      }),
      void 0,
      n => (!t && e.set(n), j.registry && !j.done && (j.done = !0), n),
    );
  return (
    e.init &&
      oe(
        e.init((n = e.get()) => {
          (t = !0), s[1](r(n)), (t = !1);
        }),
      ),
    Ue({ signal: s, create: e.create, utils: e.utils })
  );
}
function er(e, t, r) {
  return e.addEventListener(t, r), () => e.removeEventListener(t, r);
}
function tr(e, t) {
  const r = e && document.getElementById(e);
  r ? r.scrollIntoView() : t && window.scrollTo(0, 0);
}
function rr(e) {
  const t = new URL(e);
  return t.pathname + t.search;
}
function nr(e) {
  let t;
  const r = { value: e.url || ((t = N()) && rr(t.request.url)) || '' };
  return Ue({ signal: [() => r, s => Object.assign(r, s)] })(e);
}
const sr = new Map();
function or(e = !0, t = !1, r = '/_server', s) {
  return n => {
    const a = n.base.path(),
      o = n.navigatorFactory(n.base);
    let i, l;
    function c(p) {
      return p.namespaceURI === 'http://www.w3.org/2000/svg';
    }
    function u(p) {
      if (
        p.defaultPrevented ||
        p.button !== 0 ||
        p.metaKey ||
        p.altKey ||
        p.ctrlKey ||
        p.shiftKey
      )
        return;
      const f = p
        .composedPath()
        .find(I => I instanceof Node && I.nodeName.toUpperCase() === 'A');
      if (!f || (t && !f.hasAttribute('link'))) return;
      const R = c(f),
        w = R ? f.href.baseVal : f.href;
      if ((R ? f.target.baseVal : f.target) || (!w && !f.hasAttribute('state')))
        return;
      const E = (f.getAttribute('rel') || '').split(/\s+/);
      if (f.hasAttribute('download') || (E && E.includes('external'))) return;
      const L = R ? new URL(w, document.baseURI) : new URL(w);
      if (
        !(
          L.origin !== window.location.origin ||
          (a &&
            L.pathname &&
            !L.pathname.toLowerCase().startsWith(a.toLowerCase()))
        )
      )
        return [f, L];
    }
    function g(p) {
      const f = u(p);
      if (!f) return;
      const [R, w] = f,
        T = n.parsePath(w.pathname + w.search + w.hash),
        E = R.getAttribute('state');
      p.preventDefault(),
        o(T, {
          resolve: !1,
          replace: R.hasAttribute('replace'),
          scroll: !R.hasAttribute('noscroll'),
          state: E ? JSON.parse(E) : void 0,
        });
    }
    function d(p) {
      const f = u(p);
      if (!f) return;
      const [R, w] = f;
      s && (w.pathname = s(w.pathname)),
        n.preloadRoute(w, R.getAttribute('preload') !== 'false');
    }
    function h(p) {
      clearTimeout(i);
      const f = u(p);
      if (!f) return (l = null);
      const [R, w] = f;
      l !== R &&
        (s && (w.pathname = s(w.pathname)),
        (i = setTimeout(() => {
          n.preloadRoute(w, R.getAttribute('preload') !== 'false'), (l = R);
        }, 20)));
    }
    function b(p) {
      if (p.defaultPrevented) return;
      let f =
        p.submitter && p.submitter.hasAttribute('formaction')
          ? p.submitter.getAttribute('formaction')
          : p.target.getAttribute('action');
      if (!f) return;
      if (!f.startsWith('https://action/')) {
        const w = new URL(f, ke);
        if (((f = n.parsePath(w.pathname + w.search)), !f.startsWith(r)))
          return;
      }
      if (p.target.method.toUpperCase() !== 'POST')
        throw new Error('Only POST forms are supported for Actions');
      const R = sr.get(f);
      if (R) {
        p.preventDefault();
        const w = new FormData(p.target, p.submitter);
        R.call(
          { r: n, f: p.target },
          p.target.enctype === 'multipart/form-data'
            ? w
            : new URLSearchParams(w),
        );
      }
    }
    Qe(['click', 'submit']),
      document.addEventListener('click', g),
      e &&
        (document.addEventListener('mousemove', h, { passive: !0 }),
        document.addEventListener('focusin', d, { passive: !0 }),
        document.addEventListener('touchstart', d, { passive: !0 })),
      document.addEventListener('submit', b),
      oe(() => {
        document.removeEventListener('click', g),
          e &&
            (document.removeEventListener('mousemove', h),
            document.removeEventListener('focusin', d),
            document.removeEventListener('touchstart', d)),
          document.removeEventListener('submit', b);
      });
  };
}
function ar(e) {
  if (C) return nr(e);
  const t = () => {
      const s =
          window.location.pathname.replace(/^\/+/, '/') +
          window.location.search,
        n =
          window.history.state &&
          window.history.state._depth &&
          Object.keys(window.history.state).length === 1
            ? void 0
            : window.history.state;
      return { value: s + window.location.hash, state: n };
    },
    r = Le();
  return Zt({
    get: t,
    set({ value: s, replace: n, scroll: a, state: o }) {
      n
        ? window.history.replaceState(_t(o), '', s)
        : window.history.pushState(o, '', s),
        tr(decodeURIComponent(window.location.hash.slice(1)), a),
        ae();
    },
    init: s =>
      er(
        window,
        'popstate',
        qt(s, n => {
          if (n && n < 0) return !r.confirm(n);
          {
            const a = t();
            return !r.confirm(a.value, { state: a.state });
          }
        }),
      ),
    create: or(e.preload, e.explicitLinks, e.actionBase, e.transformUrl),
    utils: { go: s => window.history.go(s), beforeLeave: r },
  })(e);
}
function ir(e) {
  e.forEach(t => {
    if (!t.attrs.href) return;
    let r = document.head.querySelector(`link[href="${t.attrs.href}"]`);
    r ||
      ((r = document.createElement('link')),
      r.setAttribute('rel', 'preload'),
      r.setAttribute('as', 'style'),
      r.setAttribute('href', t.attrs.href),
      document.head.appendChild(r));
  });
}
const cr = ' ',
  lr = {
    style: e => z('style', e.attrs, () => $(e.children), !0),
    link: e => z('link', e.attrs, void 0, !0),
    script: e =>
      e.attrs.src
        ? z(
            'script',
            Ze(() => e.attrs, {
              get id() {
                return e.key;
              },
            }),
            () => P(cr),
            !0,
          )
        : null,
    noscript: e => z('noscript', e.attrs, () => $(e.children), !0),
  };
function te(e, t) {
  let { tag: r, attrs: { key: s, ...n } = { key: void 0 }, children: a } = e;
  return lr[r]({ attrs: { ...n, nonce: t }, key: s, children: a });
}
function ur(e, t, r, s = 'default') {
  return pt(async () => {
    {
      const a = (await e.import())[s],
        i = (await t.inputs?.[e.src].assets()).filter(
          c => c.tag === 'style' || c.attrs.rel === 'stylesheet',
        );
      return (
        typeof window < 'u' && ir(i),
        { default: c => [...i.map(u => te(u)), Ce(a, c)] }
      );
    }
  });
}
const U = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function dr(e = {}) {
  const t = { options: e, rootNode: Ie(), staticRoutesMap: {} },
    r = s => (e.strictTrailingSlash ? s : s.replace(/\/$/, '') || '/');
  if (e.routes) for (const s in e.routes) pe(t, r(s), e.routes[s]);
  return {
    ctx: t,
    lookup: s => pr(t, r(s)),
    insert: (s, n) => pe(t, r(s), n),
    remove: s => hr(t, r(s)),
  };
}
function pr(e, t) {
  const r = e.staticRoutesMap[t];
  if (r) return r.data;
  const s = t.split('/'),
    n = {};
  let a = !1,
    o = null,
    i = e.rootNode,
    l = null;
  for (let c = 0; c < s.length; c++) {
    const u = s[c];
    i.wildcardChildNode !== null &&
      ((o = i.wildcardChildNode), (l = s.slice(c).join('/')));
    const g = i.children.get(u);
    if (g === void 0) {
      if (i && i.placeholderChildren.length > 1) {
        const d = s.length - c;
        i = i.placeholderChildren.find(h => h.maxDepth === d) || null;
      } else i = i.placeholderChildren[0] || null;
      if (!i) break;
      i.paramName && (n[i.paramName] = u), (a = !0);
    } else i = g;
  }
  return (
    (i === null || i.data === null) &&
      o !== null &&
      ((i = o), (n[i.paramName || '_'] = l), (a = !0)),
    i ? (a ? { ...i.data, params: a ? n : void 0 } : i.data) : null
  );
}
function pe(e, t, r) {
  let s = !0;
  const n = t.split('/');
  let a = e.rootNode,
    o = 0;
  const i = [a];
  for (const l of n) {
    let c;
    if ((c = a.children.get(l))) a = c;
    else {
      const u = fr(l);
      (c = Ie({ type: u, parent: a })),
        a.children.set(l, c),
        u === U.PLACEHOLDER
          ? ((c.paramName = l === '*' ? `_${o++}` : l.slice(1)),
            a.placeholderChildren.push(c),
            (s = !1))
          : u === U.WILDCARD &&
            ((a.wildcardChildNode = c),
            (c.paramName = l.slice(3) || '_'),
            (s = !1)),
        i.push(c),
        (a = c);
    }
  }
  for (const [l, c] of i.entries())
    c.maxDepth = Math.max(i.length - l, c.maxDepth || 0);
  return (a.data = r), s === !0 && (e.staticRoutesMap[t] = a), a;
}
function hr(e, t) {
  let r = !1;
  const s = t.split('/');
  let n = e.rootNode;
  for (const a of s) if (((n = n.children.get(a)), !n)) return r;
  if (n.data) {
    const a = s.at(-1) || '';
    (n.data = null),
      Object.keys(n.children).length === 0 &&
        n.parent &&
        (n.parent.children.delete(a),
        (n.parent.wildcardChildNode = null),
        (n.parent.placeholderChildren = [])),
      (r = !0);
  }
  return r;
}
function Ie(e = {}) {
  return {
    type: e.type || U.NORMAL,
    maxDepth: 0,
    parent: e.parent || null,
    children: new Map(),
    data: e.data || null,
    paramName: e.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: [],
  };
}
function fr(e) {
  return e.startsWith('**')
    ? U.WILDCARD
    : e[0] === ':' || e === '*'
      ? U.PLACEHOLDER
      : U.NORMAL;
}
const Fe = [
    {
      page: !0,
      $component: {
        src: 'src/routes/index.tsx?pick=default&pick=$css',
        build: () => import('./index.js'),
        import: () => import('./index.js'),
      },
      path: '/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/completion/index.tsx?pick=default&pick=$css',
        build: () => import('./index2.js'),
        import: () => import('./index2.js'),
      },
      path: '/completion/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/completion/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-attachments/index.tsx?pick=default&pick=$css',
        build: () => import('./index3.js'),
        import: () => import('./index3.js'),
      },
      path: '/use-chat-attachments/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-attachments/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-request/index.tsx?pick=default&pick=$css',
        build: () => import('./index4.js'),
        import: () => import('./index4.js'),
      },
      path: '/use-chat-request/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-request/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-streamdata/index.tsx?pick=default&pick=$css',
        build: () => import('./index5.js'),
        import: () => import('./index5.js'),
      },
      path: '/use-chat-streamdata/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-streamdata/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-tools/index.tsx?pick=default&pick=$css',
        build: () => import('./index6.js'),
        import: () => import('./index6.js'),
      },
      path: '/use-chat-tools/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-tools/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-vision/index.tsx?pick=default&pick=$css',
        build: () => import('./index7.js'),
        import: () => import('./index7.js'),
      },
      path: '/use-chat-vision/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-vision/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-object/index.tsx?pick=default&pick=$css',
        build: () => import('./index8.js'),
        import: () => import('./index8.js'),
      },
      path: '/use-object/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-object/index.tsx',
    },
    {
      page: !1,
      $POST: {
        src: 'src/routes/api/chat/index.ts?pick=POST',
        build: () => import('./index9.js'),
        import: () => import('./index9.js'),
      },
      path: '/api/chat/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/api/chat/index.ts',
    },
    {
      page: !1,
      $POST: {
        src: 'src/routes/api/completion/index.ts?pick=POST',
        build: () => import('./index10.js'),
        import: () => import('./index10.js'),
      },
      path: '/api/completion/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/api/completion/index.ts',
    },
    {
      page: !1,
      $POST: {
        src: 'src/routes/api/use-chat-request/index.ts?pick=POST',
        build: () => import('./index11.js'),
        import: () => import('./index11.js'),
      },
      path: '/api/use-chat-request/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/api/use-chat-request/index.ts',
    },
    {
      page: !1,
      $POST: {
        src: 'src/routes/api/use-chat-streamdata/index.ts?pick=POST',
        build: () => import('./index12.js'),
        import: () => import('./index12.js'),
      },
      path: '/api/use-chat-streamdata/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/api/use-chat-streamdata/index.ts',
    },
    {
      page: !1,
      $POST: {
        src: 'src/routes/api/use-chat-tools/index.ts?pick=POST',
        build: () => import('./index13.js'),
        import: () => import('./index13.js'),
      },
      path: '/api/use-chat-tools/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/api/use-chat-tools/index.ts',
    },
    {
      page: !1,
      $POST: {
        src: 'src/routes/api/use-chat-vision/index.ts?pick=POST',
        build: () => import('./index14.js'),
        import: () => import('./index14.js'),
      },
      path: '/api/use-chat-vision/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/api/use-chat-vision/index.ts',
    },
    {
      page: !1,
      $POST: {
        src: 'src/routes/api/use-object/index.ts?pick=POST',
        build: () => import('./index15.js'),
        import: () => import('./index15.js'),
      },
      path: '/api/use-object/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/api/use-object/index.ts',
    },
  ],
  mr = gr(Fe.filter(e => e.page));
function gr(e) {
  function t(r, s, n, a) {
    const o = Object.values(r).find(i => n.startsWith(i.id + '/'));
    return o
      ? (t(o.children || (o.children = []), s, n.slice(o.id.length)), r)
      : (r.push({
          ...s,
          id: n,
          path: n.replace(/\/\([^)/]+\)/g, '').replace(/\([^)/]+\)/g, ''),
        }),
        r);
  }
  return e
    .sort((r, s) => r.path.length - s.path.length)
    .reduce((r, s) => t(r, s, s.path, s.path), []);
}
function yr(e, t) {
  const r = vr.lookup(e);
  if (r && r.route) {
    const s = t === 'HEAD' ? r.route.$HEAD || r.route.$GET : r.route[`$${t}`];
    return s === void 0 ? void 0 : { handler: s, params: r.params };
  }
}
function wr(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
const vr = dr({
  routes: Fe.reduce((e, t) => {
    if (!wr(t)) return e;
    let r = t.path
      .replace(/\/\([^)/]+\)/g, '')
      .replace(/\([^)/]+\)/g, '')
      .replace(/\*([^/]*)/g, (s, n) => `**:${n}`)
      .split('/')
      .map(s =>
        s.startsWith(':') || s.startsWith('*') ? s : encodeURIComponent(s),
      )
      .join('/');
    if (/:[^/]*\?/g.test(r))
      throw new Error(
        `Optional parameters are not supported in API routes: ${r}`,
      );
    if (e[r])
      throw new Error(
        `Duplicate API routes for "${r}" found at "${e[r].route.path}" and "${t.path}"`,
      );
    return (e[r] = { route: t }), e;
  }, {}),
});
function De() {
  function e(r) {
    return {
      ...r,
      ...(r.$$route ? r.$$route.require().route : void 0),
      info: {
        ...(r.$$route ? r.$$route.require().route.info : {}),
        filesystem: !0,
      },
      component:
        r.$component &&
        ur(r.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr),
      children: r.children ? r.children.map(e) : void 0,
    };
  }
  return mr.map(e);
}
let he;
const Rr = C ? () => N().routes : () => he || (he = De());
function br() {
  return v(ar, {
    root: e =>
      v(ht, {
        get children() {
          return e.children;
        },
      }),
    get children() {
      return v(Rr, {});
    },
  });
}
const Me = C
    ? e => {
        const t = N();
        return (
          (t.response.status = e.code),
          (t.response.statusText = e.text),
          oe(
            () =>
              !t.nativeEvent.handled &&
              !t.complete &&
              (t.response.status = 200),
          ),
          null
        );
      }
    : e => null,
  xr = [
    '<span',
    ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">',
    '</span>',
  ],
  Sr = [
    '<span',
    ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">500 | Internal Server Error</span>',
  ],
  Er = e => {
    const t = C
      ? '500 | Internal Server Error'
      : 'Error | Uncaught Client Exception';
    return v(mt, {
      fallback: r => (
        console.error(r), [P(xr, O(), $(t)), v(Me, { code: 500 })]
      ),
      get children() {
        return e.children;
      },
    });
  },
  $r = e => {
    let t = !1;
    const r = ft(
      () => e.children,
      s => {
        console.error(s), (t = !!s);
      },
    );
    return t ? [P(Sr, O()), v(Me, { code: 500 })] : r;
  },
  fe = ['<script', '>', '<\/script>'],
  Pr = ['<script', ' type="module"', ' async', '><\/script>'],
  Ar = ['<script', ' type="module" async', '><\/script>'],
  Cr = P('<!DOCTYPE html>');
function We(e, t, r = []) {
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    if (n.path !== e[0].path) continue;
    let a = [...r, n];
    if (n.children) {
      const o = e.slice(1);
      if (o.length === 0 || ((a = We(o, n.children, a)), !a)) continue;
    }
    return a;
  }
}
function Tr(e) {
  const t = N(),
    r = t.nonce;
  let s = [];
  return (
    Promise.resolve().then(async () => {
      let n = [];
      if (t.router && t.router.matches) {
        const a = [...t.router.matches];
        for (; a.length && (!a[0].info || !a[0].info.filesystem); ) a.shift();
        const o = a.length && We(a, t.routes);
        if (o) {
          const i = globalThis.MANIFEST.client.inputs;
          for (let l = 0; l < o.length; l++) {
            const c = o[l],
              u = i[c.$component.src];
            n.push(u.assets());
          }
        }
      }
      s = await Promise.all(n).then(a =>
        [...new Map(a.flat().map(o => [o.attrs.key, o])).values()].filter(
          o =>
            o.attrs.rel === 'modulepreload' &&
            !t.assets.find(i => i.attrs.key === o.attrs.key),
        ),
      );
    }),
    et(() => (s.length ? s.map(n => te(n)) : void 0)),
    v(Se, {
      get children() {
        return [
          Cr,
          v($r, {
            get children() {
              return v(e.document, {
                get assets() {
                  return [v(rt, {}), t.assets.map(n => te(n, r))];
                },
                get scripts() {
                  return r
                    ? [
                        P(
                          fe,
                          O() + G('nonce', $(r, !0), !1),
                          `window.manifest = ${JSON.stringify(t.manifest)}`,
                        ),
                        P(
                          Pr,
                          O(),
                          G('nonce', $(r, !0), !1),
                          G(
                            'src',
                            $(
                              globalThis.MANIFEST.client.inputs[
                                globalThis.MANIFEST.client.handler
                              ].output.path,
                              !0,
                            ),
                            !1,
                          ),
                        ),
                      ]
                    : [
                        P(
                          fe,
                          O(),
                          `window.manifest = ${JSON.stringify(t.manifest)}`,
                        ),
                        P(
                          Ar,
                          O(),
                          G(
                            'src',
                            $(
                              globalThis.MANIFEST.client.inputs[
                                globalThis.MANIFEST.client.handler
                              ].output.path,
                              !0,
                            ),
                            !1,
                          ),
                        ),
                      ];
                },
                get children() {
                  return v(tt, {
                    get children() {
                      return v(Er, {
                        get children() {
                          return v(br, {});
                        },
                      });
                    },
                  });
                },
              });
            },
          }),
        ];
      },
    })
  );
}
function Lr(e = {}) {
  let t,
    r = !1;
  const s = o => {
    if (t && t !== o) throw new Error('Context conflict');
  };
  let n;
  if (e.asyncContext) {
    const o = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    o
      ? (n = new o())
      : console.warn('[unctx] `AsyncLocalStorage` is not provided.');
  }
  const a = () => {
    if (n && t === void 0) {
      const o = n.getStore();
      if (o !== void 0) return o;
    }
    return t;
  };
  return {
    use: () => {
      const o = a();
      if (o === void 0) throw new Error('Context is not available');
      return o;
    },
    tryUse: () => a(),
    set: (o, i) => {
      i || s(o), (t = o), (r = !0);
    },
    unset: () => {
      (t = void 0), (r = !1);
    },
    call: (o, i) => {
      s(o), (t = o);
      try {
        return n ? n.run(o, i) : i();
      } finally {
        r || (t = void 0);
      }
    },
    async callAsync(o, i) {
      t = o;
      const l = () => {
          t = o;
        },
        c = () => (t === o ? l : void 0);
      ye.add(c);
      try {
        const u = n ? n.run(o, i) : i();
        return r || (t = void 0), await u;
      } finally {
        ye.delete(c);
      }
    },
  };
}
function kr(e = {}) {
  const t = {};
  return {
    get(r, s = {}) {
      return t[r] || (t[r] = Lr({ ...e, ...s })), t[r], t[r];
    },
  };
}
const Y =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof global < 'u'
          ? global
          : typeof window < 'u'
            ? window
            : {},
  me = '__unctx__',
  Or = Y[me] || (Y[me] = kr()),
  Nr = (e, t = {}) => Or.get(e, t),
  ge = '__unctx_async_handlers__',
  ye = Y[ge] || (Y[ge] = new Set());
function _r(e) {
  let t;
  const r = Ke(e),
    s = { duplex: 'half', method: e.method, headers: e.headers };
  return e.node.req.body instanceof ArrayBuffer
    ? new Request(r, { ...s, body: e.node.req.body })
    : new Request(r, {
        ...s,
        get body() {
          return t || ((t = Kr(e)), t);
        },
      });
}
function qr(e) {
  return (e.web ??= { request: _r(e), url: Ke(e) }), e.web.request;
}
function Hr() {
  return Vr();
}
const Be = Symbol('$HTTPEvent');
function jr(e) {
  return (
    typeof e == 'object' &&
    (e instanceof Z || e?.[Be] instanceof Z || e?.__is_event__ === !0)
  );
}
function x(e) {
  return function (...t) {
    let r = t[0];
    if (jr(r)) t[0] = r instanceof Z || r.__is_event__ ? r : r[Be];
    else {
      if (!globalThis.app.config.server.experimental?.asyncContext)
        throw new Error(
          'AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.',
        );
      if (((r = Hr()), !r))
        throw new Error(
          'No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.',
        );
      t.unshift(r);
    }
    return e(...t);
  };
}
const Ke = x(At),
  Ur = x(vt),
  re = x(yt),
  we = x(Rt),
  Ir = x(bt),
  J = x(Pt),
  ve = x(xt),
  Fr = x(St),
  Dr = x($t),
  Re = x(Tt),
  Mr = x(Lt),
  Wr = x(kt),
  Br = x(wt),
  Kr = x(Ct),
  zr = x(Et),
  Gr = x(qr);
function Jr() {
  return Nr('nitro-app', {
    asyncContext: !!globalThis.app.config.server.experimental?.asyncContext,
    AsyncLocalStorage: Nt,
  });
}
function Vr() {
  return Jr().use().event;
}
const Q = 'solidFetchEvent';
function Yr(e) {
  return {
    request: Gr(e),
    response: Zr(e),
    clientAddress: Ur(e),
    locals: {},
    nativeEvent: e,
  };
}
function Xr(e) {
  if (!e.context[Q]) {
    const t = Yr(e);
    e.context[Q] = t;
  }
  return e.context[Q];
}
class Qr {
  event;
  constructor(t) {
    this.event = t;
  }
  get(t) {
    const r = ve(this.event, t);
    return Array.isArray(r) ? r.join(', ') : r || null;
  }
  has(t) {
    return this.get(t) !== void 0;
  }
  set(t, r) {
    return Fr(this.event, t, r);
  }
  delete(t) {
    return zr(this.event, t);
  }
  append(t, r) {
    Dr(this.event, t, r);
  }
  getSetCookie() {
    const t = ve(this.event, 'Set-Cookie');
    return Array.isArray(t) ? t : [t];
  }
  forEach(t) {
    return Object.entries(J(this.event)).forEach(([r, s]) =>
      t(Array.isArray(s) ? s.join(', ') : s, r, this),
    );
  }
  entries() {
    return Object.entries(J(this.event))
      .map(([t, r]) => [t, Array.isArray(r) ? r.join(', ') : r])
      [Symbol.iterator]();
  }
  keys() {
    return Object.keys(J(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(J(this.event))
      .map(t => (Array.isArray(t) ? t.join(', ') : t))
      [Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
}
function Zr(e) {
  return {
    get status() {
      return we(e);
    },
    set status(t) {
      re(e, t);
    },
    get statusText() {
      return Ir(e);
    },
    set statusText(t) {
      re(e, we(e), t);
    },
    headers: new Qr(e),
  };
}
function en(e) {
  const t = Mr(e.nativeEvent, 'flash');
  if (t)
    try {
      let r = JSON.parse(t);
      if (!r || !r.result) return;
      const s = [...r.input.slice(0, -1), new Map(r.input[r.input.length - 1])],
        n = r.error ? new Error(r.result) : r.result;
      return {
        input: s,
        url: r.url,
        pending: !1,
        result: r.thrown ? void 0 : n,
        error: r.thrown ? n : void 0,
      };
    } catch (r) {
      console.error(r);
    } finally {
      Wr(e.nativeEvent, 'flash', '', { maxAge: 0 });
    }
}
async function tn(e) {
  const t = globalThis.MANIFEST.client;
  return (
    globalThis.MANIFEST.ssr,
    e.response.headers.set('Content-Type', 'text/html'),
    Object.assign(e, {
      manifest: await t.json(),
      assets: [...(await t.inputs[t.handler].assets())],
      router: { submission: en(e) },
      routes: De(),
      complete: !1,
      $islands: new Set(),
    })
  );
}
const rn = new Set([301, 302, 303, 307, 308]);
function ne(e) {
  return e.status && rn.has(e.status) ? e.status : 302;
}
function nn(e, t, r = {}) {
  return Ot({
    handler: s => {
      const n = Xr(s);
      return gt(n, async () => {
        const a = yr(new URL(n.request.url).pathname, n.request.method);
        if (a) {
          const d = await a.handler.import(),
            h =
              n.request.method === 'HEAD'
                ? d.HEAD || d.GET
                : d[n.request.method];
          (n.params = a.params || {}), (j.context = { event: n });
          const b = await h(n);
          if (b !== void 0) return b;
          if (n.request.method !== 'GET')
            throw new Error(
              `API handler for ${n.request.method} "${n.request.url}" did not return a response.`,
            );
        }
        const o = await t(n),
          i = typeof r == 'function' ? await r(o) : { ...r },
          l = i.mode || 'stream';
        if ((i.nonce && (o.nonce = i.nonce), l === 'sync')) {
          const d = nt(() => ((j.context.event = o), e(o)), i);
          if (
            ((o.complete = !0),
            o.response && o.response.headers.get('Location'))
          ) {
            const h = ne(o.response);
            return Re(s, o.response.headers.get('Location'), h);
          }
          return d;
        }
        if (i.onCompleteAll) {
          const d = i.onCompleteAll;
          i.onCompleteAll = h => {
            xe(o)(h), d(h);
          };
        } else i.onCompleteAll = xe(o);
        if (i.onCompleteShell) {
          const d = i.onCompleteShell;
          i.onCompleteShell = h => {
            be(o, s)(), d(h);
          };
        } else i.onCompleteShell = be(o, s);
        const c = st(() => ((j.context.event = o), e(o)), i);
        if (o.response && o.response.headers.get('Location')) {
          const d = ne(o.response);
          return Re(s, o.response.headers.get('Location'), d);
        }
        if (l === 'async') return c;
        const { writable: u, readable: g } = new TransformStream();
        return c.pipeTo(u), g;
      });
    },
  });
}
function be(e, t) {
  return () => {
    if (e.response && e.response.headers.get('Location')) {
      const r = ne(e.response);
      re(t, r), Br(t, 'Location', e.response.headers.get('Location'));
    }
  };
}
function xe(e) {
  return ({ write: t }) => {
    e.complete = !0;
    const r = e.response && e.response.headers.get('Location');
    r && t(`<script>window.location="${r}"<\/script>`);
  };
}
function sn(e, t) {
  return nn(e, tn, t);
}
const on = [
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/favicon.ico">',
    '</head>',
  ],
  an = [
    '<html',
    ' lang="en">',
    '<body><div id="app">',
    '</div><!--$-->',
    '<!--/--></body></html>',
  ],
  hn = sn(() =>
    v(Tr, {
      document: ({ assets: e, children: t, scripts: r }) =>
        P(
          an,
          O(),
          v(Se, {
            get children() {
              return P(on, $(e));
            },
          }),
          $(t),
          $(r),
        ),
    }),
  );
export { hn as default };
