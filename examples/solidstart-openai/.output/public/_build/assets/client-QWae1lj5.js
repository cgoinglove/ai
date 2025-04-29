const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/index-DFbguyGp.js',
      'assets/web-BFUmgCsR.js',
      'assets/index-DK6TMCeg.js',
      'assets/index-fVrQ-dxf.js',
      'assets/index-6o46ChXI.js',
      'assets/index-DXNtvkB6.js',
      'assets/index-DiEt-g6Z.js',
      'assets/index-DMG48wzN.js',
      'assets/index-DLIbet0G.js',
      'assets/index-VvGVp-tG.js',
    ]),
) => i.map(i => d[i]);
import {
  r as ue,
  c as R,
  g as de,
  a as he,
  b as I,
  d as Te,
  o as Q,
  u as Ie,
  e as fe,
  i as Ne,
  s as Oe,
  f as De,
  h as Ue,
  j as v,
  k as je,
  S as pe,
  l as Fe,
  m as me,
  n as V,
  p as Me,
  q as N,
  t as D,
  w as F,
  x as M,
  y as X,
  z as W,
  A as We,
  B as qe,
  E as Be,
  C as ze,
} from './web-BFUmgCsR.js';
const H = 'Invariant Violation',
  {
    setPrototypeOf: Ve = function (e, t) {
      return (e.__proto__ = t), e;
    },
  } = Object;
class ee extends Error {
  framesToPop = 1;
  name = H;
  constructor(t = H) {
    super(
      typeof t == 'number'
        ? `${H}: ${t} (see https://github.com/apollographql/invariant-packages)`
        : t,
    ),
      Ve(this, ee.prototype);
  }
}
function K(e, t) {
  if (!e) throw new ee(t);
}
const He = /^[A-Za-z]:\//;
function Ke(e = '') {
  return e && e.replace(/\\/g, '/').replace(He, t => t.toUpperCase());
}
const Ze = /^[/\\]{2}/,
  Ge = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,
  Xe = /^[A-Za-z]:$/,
  Je = function (e) {
    if (e.length === 0) return '.';
    e = Ke(e);
    const t = e.match(Ze),
      n = J(e),
      r = e[e.length - 1] === '/';
    return (
      (e = Ye(e, !n)),
      e.length === 0
        ? n
          ? '/'
          : r
            ? './'
            : '.'
        : (r && (e += '/'),
          Xe.test(e) && (e += '/'),
          t ? (n ? `//${e}` : `//./${e}`) : n && !J(e) ? `/${e}` : e)
    );
  },
  ge = function (...e) {
    if (e.length === 0) return '.';
    let t;
    for (const n of e)
      n && n.length > 0 && (t === void 0 ? (t = n) : (t += `/${n}`));
    return t === void 0 ? '.' : Je(t.replace(/\/\/+/g, '/'));
  };
function Ye(e, t) {
  let n = '',
    r = 0,
    s = -1,
    o = 0,
    i = null;
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) i = e[a];
    else {
      if (i === '/') break;
      i = '/';
    }
    if (i === '/') {
      if (!(s === a - 1 || o === 1))
        if (o === 2) {
          if (
            n.length < 2 ||
            r !== 2 ||
            n[n.length - 1] !== '.' ||
            n[n.length - 2] !== '.'
          ) {
            if (n.length > 2) {
              const l = n.lastIndexOf('/');
              l === -1
                ? ((n = ''), (r = 0))
                : ((n = n.slice(0, l)),
                  (r = n.length - 1 - n.lastIndexOf('/'))),
                (s = a),
                (o = 0);
              continue;
            } else if (n.length > 0) {
              (n = ''), (r = 0), (s = a), (o = 0);
              continue;
            }
          }
          t && ((n += n.length > 0 ? '/..' : '..'), (r = 2));
        } else
          n.length > 0
            ? (n += `/${e.slice(s + 1, a)}`)
            : (n = e.slice(s + 1, a)),
            (r = a - s - 1);
      (s = a), (o = 0);
    } else i === '.' && o !== -1 ? ++o : (o = -1);
  }
  return n;
}
const J = function (e) {
  return Ge.test(e);
};
function Qe(e) {
  return `virtual:${e}`;
}
function et(e) {
  return e.handler?.endsWith('.html')
    ? J(e.handler)
      ? e.handler
      : ge(e.root, e.handler)
    : `$vinxi/handler/${e.name}`;
}
const tt = new Proxy(
  {},
  {
    get(e, t) {
      return (
        K(typeof t == 'string', 'Bundler name should be a string'),
        {
          name: t,
          type: 'client',
          handler: Qe(et({ name: t })),
          baseURL: '/_build',
          chunks: new Proxy(
            {},
            {
              get(n, r) {
                K(typeof r == 'string', 'Chunk expected');
                let s = ge('/_build', r + '.mjs');
                return {
                  import() {
                    return import(s);
                  },
                  output: { path: s },
                };
              },
            },
          ),
          inputs: new Proxy(
            {},
            {
              get(n, r) {
                K(typeof r == 'string', 'Input must be string');
                let s = window.manifest[r].output;
                return {
                  async import() {
                    return import(s);
                  },
                  async assets() {
                    return window.manifest[r].assets;
                  },
                  output: { path: s },
                };
              },
            },
          ),
        }
      );
    },
  },
);
globalThis.MANIFEST = tt;
function we() {
  let e = new Set();
  function t(s) {
    return e.add(s), () => e.delete(s);
  }
  let n = !1;
  function r(s, o) {
    if (n) return !(n = !1);
    const i = {
      to: s,
      options: o,
      defaultPrevented: !1,
      preventDefault: () => (i.defaultPrevented = !0),
    };
    for (const a of e)
      a.listener({
        ...i,
        from: a.location,
        retry: l => {
          l && (n = !0), a.navigate(s, { ...o, resolve: !1 });
        },
      });
    return !i.defaultPrevented;
  }
  return { subscribe: t, confirm: r };
}
let Y;
function te() {
  (!window.history.state || window.history.state._depth == null) &&
    window.history.replaceState(
      { ...window.history.state, _depth: window.history.length - 1 },
      '',
    ),
    (Y = window.history.state._depth);
}
te();
function nt(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function rt(e, t) {
  let n = !1;
  return () => {
    const r = Y;
    te();
    const s = r == null ? null : Y - r;
    if (n) {
      n = !1;
      return;
    }
    s && t(s) ? ((n = !0), window.history.go(-s)) : e();
  };
}
const st = /^(?:[a-z0-9]+:)?\/\//i,
  ot = /^\/+|(\/)\/+$/g,
  ye = 'http://sr';
function O(e, t = !1) {
  const n = e.replace(ot, '$1');
  return n ? (t || /^[?#]/.test(n) ? n : '/' + n) : '';
}
function q(e, t, n) {
  if (st.test(t)) return;
  const r = O(e),
    s = n && O(n);
  let o = '';
  return (
    !s || t.startsWith('/')
      ? (o = r)
      : s.toLowerCase().indexOf(r.toLowerCase()) !== 0
        ? (o = r + s)
        : (o = s),
    (o || '/') + O(t, !o)
  );
}
function at(e, t) {
  return O(e).replace(/\/*(\*.*)?$/g, '') + O(t);
}
function Ee(e) {
  const t = {};
  return (
    e.searchParams.forEach((n, r) => {
      r in t
        ? Array.isArray(t[r])
          ? t[r].push(n)
          : (t[r] = [t[r], n])
        : (t[r] = n);
    }),
    t
  );
}
function it(e, t, n) {
  const [r, s] = e.split('/*', 2),
    o = r.split('/').filter(Boolean),
    i = o.length;
  return a => {
    const l = a.split('/').filter(Boolean),
      c = l.length - i;
    if (c < 0 || (c > 0 && s === void 0 && !t)) return null;
    const u = { path: i ? '' : '/', params: {} },
      h = p => (n === void 0 ? void 0 : n[p]);
    for (let p = 0; p < i; p++) {
      const m = o[p],
        x = m[0] === ':',
        d = x ? l[p] : l[p].toLowerCase(),
        f = x ? m.slice(1) : m.toLowerCase();
      if (x && Z(d, h(f))) u.params[f] = d;
      else if (x || !Z(d, f)) return null;
      u.path += `/${d}`;
    }
    if (s) {
      const p = c ? l.slice(-c).join('/') : '';
      if (Z(p, h(s))) u.params[s] = p;
      else return null;
    }
    return u;
  };
}
function Z(e, t) {
  const n = r => r === e;
  return t === void 0
    ? !0
    : typeof t == 'string'
      ? n(t)
      : typeof t == 'function'
        ? t(e)
        : Array.isArray(t)
          ? t.some(n)
          : t instanceof RegExp
            ? t.test(e)
            : !1;
}
function ct(e) {
  const [t, n] = e.pattern.split('/*', 2),
    r = t.split('/').filter(Boolean);
  return r.reduce(
    (s, o) => s + (o.startsWith(':') ? 2 : 3),
    r.length - (n === void 0 ? 0 : 1),
  );
}
function ve(e) {
  const t = new Map(),
    n = de();
  return new Proxy(
    {},
    {
      get(r, s) {
        return (
          t.has(s) ||
            ue(n, () =>
              t.set(
                s,
                R(() => e()[s]),
              ),
            ),
          t.get(s)()
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
function xe(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index),
    r = e.slice(t.index + t[0].length);
  const s = [n, (n += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(r)); )
    s.push((n += t[1])), (r = r.slice(t[0].length));
  return xe(r).reduce((o, i) => [...o, ...s.map(a => a + i)], []);
}
const lt = 100,
  ut = he(),
  be = he();
function dt(e, t = '') {
  const { component: n, preload: r, load: s, children: o, info: i } = e,
    a = !o || (Array.isArray(o) && !o.length),
    l = { key: e, component: n, preload: r || s, info: i };
  return Re(e.path).reduce((c, u) => {
    for (const h of xe(u)) {
      const p = at(t, h);
      let m = a ? p : p.split('/*', 1)[0];
      (m = m
        .split('/')
        .map(x =>
          x.startsWith(':') || x.startsWith('*') ? x : encodeURIComponent(x),
        )
        .join('/')),
        c.push({
          ...l,
          originalPath: u,
          pattern: m,
          matcher: it(m, !a, e.matchFilters),
        });
    }
    return c;
  }, []);
}
function ht(e, t = 0) {
  return {
    routes: e,
    score: ct(e[e.length - 1]) * 1e4 - t,
    matcher(n) {
      const r = [];
      for (let s = e.length - 1; s >= 0; s--) {
        const o = e[s],
          i = o.matcher(n);
        if (!i) return null;
        r.unshift({ ...i, route: o });
      }
      return r;
    },
  };
}
function Re(e) {
  return Array.isArray(e) ? e : [e];
}
function _e(e, t = '', n = [], r = []) {
  const s = Re(e);
  for (let o = 0, i = s.length; o < i; o++) {
    const a = s[o];
    if (a && typeof a == 'object') {
      a.hasOwnProperty('path') || (a.path = '');
      const l = dt(a, t);
      for (const c of l) {
        n.push(c);
        const u = Array.isArray(a.children) && a.children.length === 0;
        if (a.children && !u) _e(a.children, c.pattern, n, r);
        else {
          const h = ht([...n], r.length);
          r.push(h);
        }
        n.pop();
      }
    }
  }
  return n.length ? r : r.sort((o, i) => i.score - o.score);
}
function G(e, t) {
  for (let n = 0, r = e.length; n < r; n++) {
    const s = e[n].matcher(t);
    if (s) return s;
  }
  return [];
}
function ft(e, t, n) {
  const r = new URL(ye),
    s = R(
      u => {
        const h = e();
        try {
          return new URL(h, r);
        } catch {
          return console.error(`Invalid path ${h}`), u;
        }
      },
      r,
      { equals: (u, h) => u.href === h.href },
    ),
    o = R(() => s().pathname),
    i = R(() => s().search, !0),
    a = R(() => s().hash),
    l = () => '',
    c = Q(i, () => Ee(s()));
  return {
    get pathname() {
      return o();
    },
    get search() {
      return i();
    },
    get hash() {
      return a();
    },
    get state() {
      return t();
    },
    get key() {
      return l();
    },
    query: n ? n(c) : ve(c),
  };
}
let S;
function pt() {
  return S;
}
function mt(e, t, n, r = {}) {
  const {
      signal: [s, o],
      utils: i = {},
    } = e,
    a = i.parsePath || (g => g),
    l = i.renderPath || (g => g),
    c = i.beforeLeave || we(),
    u = q('', r.base || '');
  if (u === void 0) throw new Error(`${u} is not a valid base path`);
  u && !s().value && o({ value: u, replace: !0, scroll: !1 });
  const [h, p] = I(!1);
  let m;
  const x = (g, w) => {
      (w.value === d() && w.state === E()) ||
        (m === void 0 && p(!0),
        (S = g),
        (m = w),
        Oe(() => {
          m === w && (f(m.value), y(m.state), Ue(), A[1]([]));
        }).finally(() => {
          m === w &&
            De(() => {
              (S = void 0), g === 'navigate' && Le(m), p(!1), (m = void 0);
            });
        }));
    },
    [d, f] = I(s().value),
    [E, y] = I(s().state),
    $ = ft(d, E, i.queryWrapper),
    _ = [],
    A = I([]),
    C = R(() =>
      typeof r.transformUrl == 'function'
        ? G(t(), r.transformUrl($.pathname))
        : G(t(), $.pathname),
    ),
    ne = () => {
      const g = C(),
        w = {};
      for (let b = 0; b < g.length; b++) Object.assign(w, g[b].params);
      return w;
    },
    Ae = i.paramsWrapper ? i.paramsWrapper(ne, t) : ve(ne),
    re = {
      pattern: u,
      path: () => u,
      outlet: () => null,
      resolvePath(g) {
        return q(u, g);
      },
    };
  return (
    Te(Q(s, g => x('native', g), { defer: !0 })),
    {
      base: re,
      location: $,
      params: Ae,
      isRouting: h,
      renderPath: l,
      parsePath: a,
      navigatorFactory: ke,
      matches: C,
      beforeLeave: c,
      preloadRoute: Ce,
      singleFlight: r.singleFlight === void 0 ? !0 : r.singleFlight,
      submissions: A,
    }
  );
  function Se(g, w, b) {
    fe(() => {
      if (typeof w == 'number') {
        w &&
          (i.go
            ? i.go(w)
            : console.warn(
                'Router integration does not support relative routing',
              ));
        return;
      }
      const U = !w || w[0] === '?',
        {
          replace: B,
          resolve: k,
          scroll: z,
          state: T,
        } = { replace: !1, resolve: !U, scroll: !0, ...b },
        j = k ? g.resolvePath(w) : q((U && $.pathname) || '', w);
      if (j === void 0) throw new Error(`Path '${w}' is not a routable path`);
      if (_.length >= lt) throw new Error('Too many redirects');
      const se = d();
      (j !== se || T !== E()) &&
        (Ne ||
          (c.confirm(j, b) &&
            (_.push({ value: se, replace: B, scroll: z, state: E() }),
            x('navigate', { value: j, state: T }))));
    });
  }
  function ke(g) {
    return (g = g || Ie(be) || re), (w, b) => Se(g, w, b);
  }
  function Le(g) {
    const w = _[0];
    w && (o({ ...g, replace: w.replace, scroll: w.scroll }), (_.length = 0));
  }
  function Ce(g, w) {
    const b = G(t(), g.pathname),
      U = S;
    S = 'preload';
    for (let B in b) {
      const { route: k, params: z } = b[B];
      k.component && k.component.preload && k.component.preload();
      const { preload: T } = k;
      w &&
        T &&
        ue(n(), () =>
          T({
            params: z,
            location: {
              pathname: g.pathname,
              search: g.search,
              hash: g.hash,
              query: Ee(g),
              state: null,
              key: '',
            },
            intent: 'preload',
          }),
        );
    }
    S = U;
  }
}
function gt(e, t, n, r) {
  const { base: s, location: o, params: i } = e,
    { pattern: a, component: l, preload: c } = r().route,
    u = R(() => r().path);
  l && l.preload && l.preload();
  const h = c ? c({ params: i, location: o, intent: S || 'initial' }) : void 0;
  return {
    parent: t,
    pattern: a,
    path: u,
    outlet: () =>
      l
        ? v(l, {
            params: i,
            location: o,
            data: h,
            get children() {
              return n();
            },
          })
        : n(),
    resolvePath(m) {
      return q(s.path(), m, u());
    },
  };
}
const wt = e => t => {
  const { base: n } = t,
    r = je(() => t.children),
    s = R(() => _e(r(), t.base || ''));
  let o;
  const i = mt(e, s, () => o, {
    base: n,
    singleFlight: t.singleFlight,
    transformUrl: t.transformUrl,
  });
  return (
    e.create && e.create(i),
    v(ut.Provider, {
      value: i,
      get children() {
        return v(yt, {
          routerState: i,
          get root() {
            return t.root;
          },
          get preload() {
            return t.rootPreload || t.rootLoad;
          },
          get children() {
            return [
              R(() => (o = de()) && null),
              v(Et, {
                routerState: i,
                get branches() {
                  return s();
                },
              }),
            ];
          },
        });
      },
    })
  );
};
function yt(e) {
  const t = e.routerState.location,
    n = e.routerState.params,
    r = R(
      () =>
        e.preload &&
        fe(() => {
          e.preload({ params: n, location: t, intent: pt() || 'initial' });
        }),
    );
  return v(pe, {
    get when() {
      return e.root;
    },
    keyed: !0,
    get fallback() {
      return e.children;
    },
    children: s =>
      v(s, {
        params: n,
        location: t,
        get data() {
          return r();
        },
        get children() {
          return e.children;
        },
      }),
  });
}
function Et(e) {
  const t = [];
  let n;
  const r = R(
    Q(e.routerState.matches, (s, o, i) => {
      let a = o && s.length === o.length;
      const l = [];
      for (let c = 0, u = s.length; c < u; c++) {
        const h = o && o[c],
          p = s[c];
        i && h && p.route.key === h.route.key
          ? (l[c] = i[c])
          : ((a = !1),
            t[c] && t[c](),
            Fe(m => {
              (t[c] = m),
                (l[c] = gt(
                  e.routerState,
                  l[c - 1] || e.routerState.base,
                  oe(() => r()[c + 1]),
                  () => e.routerState.matches()[c],
                ));
            }));
      }
      return t.splice(s.length).forEach(c => c()), i && a ? i : ((n = l[0]), l);
    }),
  );
  return oe(() => r() && n)();
}
const oe = e => () =>
  v(pe, {
    get when() {
      return e();
    },
    keyed: !0,
    children: t =>
      v(be.Provider, {
        value: t,
        get children() {
          return t.outlet();
        },
      }),
  });
function vt([e, t], n, r) {
  return [e, r ? s => t(r(s)) : t];
}
function xt(e) {
  let t = !1;
  const n = s => (typeof s == 'string' ? { value: s } : s),
    r = vt(
      I(n(e.get()), {
        equals: (s, o) => s.value === o.value && s.state === o.state,
      }),
      void 0,
      s => (!t && e.set(s), V.registry && !V.done && (V.done = !0), s),
    );
  return (
    e.init &&
      me(
        e.init((s = e.get()) => {
          (t = !0), r[1](n(s)), (t = !1);
        }),
      ),
    wt({ signal: r, create: e.create, utils: e.utils })
  );
}
function bt(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function Rt(e, t) {
  const n = e && document.getElementById(e);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
const _t = new Map();
function Pt(e = !0, t = !1, n = '/_server', r) {
  return s => {
    const o = s.base.path(),
      i = s.navigatorFactory(s.base);
    let a, l;
    function c(d) {
      return d.namespaceURI === 'http://www.w3.org/2000/svg';
    }
    function u(d) {
      if (
        d.defaultPrevented ||
        d.button !== 0 ||
        d.metaKey ||
        d.altKey ||
        d.ctrlKey ||
        d.shiftKey
      )
        return;
      const f = d
        .composedPath()
        .find(C => C instanceof Node && C.nodeName.toUpperCase() === 'A');
      if (!f || (t && !f.hasAttribute('link'))) return;
      const E = c(f),
        y = E ? f.href.baseVal : f.href;
      if ((E ? f.target.baseVal : f.target) || (!y && !f.hasAttribute('state')))
        return;
      const _ = (f.getAttribute('rel') || '').split(/\s+/);
      if (f.hasAttribute('download') || (_ && _.includes('external'))) return;
      const A = E ? new URL(y, document.baseURI) : new URL(y);
      if (
        !(
          A.origin !== window.location.origin ||
          (o &&
            A.pathname &&
            !A.pathname.toLowerCase().startsWith(o.toLowerCase()))
        )
      )
        return [f, A];
    }
    function h(d) {
      const f = u(d);
      if (!f) return;
      const [E, y] = f,
        $ = s.parsePath(y.pathname + y.search + y.hash),
        _ = E.getAttribute('state');
      d.preventDefault(),
        i($, {
          resolve: !1,
          replace: E.hasAttribute('replace'),
          scroll: !E.hasAttribute('noscroll'),
          state: _ ? JSON.parse(_) : void 0,
        });
    }
    function p(d) {
      const f = u(d);
      if (!f) return;
      const [E, y] = f;
      r && (y.pathname = r(y.pathname)),
        s.preloadRoute(y, E.getAttribute('preload') !== 'false');
    }
    function m(d) {
      clearTimeout(a);
      const f = u(d);
      if (!f) return (l = null);
      const [E, y] = f;
      l !== E &&
        (r && (y.pathname = r(y.pathname)),
        (a = setTimeout(() => {
          s.preloadRoute(y, E.getAttribute('preload') !== 'false'), (l = E);
        }, 20)));
    }
    function x(d) {
      if (d.defaultPrevented) return;
      let f =
        d.submitter && d.submitter.hasAttribute('formaction')
          ? d.submitter.getAttribute('formaction')
          : d.target.getAttribute('action');
      if (!f) return;
      if (!f.startsWith('https://action/')) {
        const y = new URL(f, ye);
        if (((f = s.parsePath(y.pathname + y.search)), !f.startsWith(n)))
          return;
      }
      if (d.target.method.toUpperCase() !== 'POST')
        throw new Error('Only POST forms are supported for Actions');
      const E = _t.get(f);
      if (E) {
        d.preventDefault();
        const y = new FormData(d.target, d.submitter);
        E.call(
          { r: s, f: d.target },
          d.target.enctype === 'multipart/form-data'
            ? y
            : new URLSearchParams(y),
        );
      }
    }
    Me(['click', 'submit']),
      document.addEventListener('click', h),
      e &&
        (document.addEventListener('mousemove', m, { passive: !0 }),
        document.addEventListener('focusin', p, { passive: !0 }),
        document.addEventListener('touchstart', p, { passive: !0 })),
      document.addEventListener('submit', x),
      me(() => {
        document.removeEventListener('click', h),
          e &&
            (document.removeEventListener('mousemove', m),
            document.removeEventListener('focusin', p),
            document.removeEventListener('touchstart', p)),
          document.removeEventListener('submit', x);
      });
  };
}
function $t(e) {
  const t = () => {
      const r =
          window.location.pathname.replace(/^\/+/, '/') +
          window.location.search,
        s =
          window.history.state &&
          window.history.state._depth &&
          Object.keys(window.history.state).length === 1
            ? void 0
            : window.history.state;
      return { value: r + window.location.hash, state: s };
    },
    n = we();
  return xt({
    get: t,
    set({ value: r, replace: s, scroll: o, state: i }) {
      s
        ? window.history.replaceState(nt(i), '', r)
        : window.history.pushState(i, '', r),
        Rt(decodeURIComponent(window.location.hash.slice(1)), o),
        te();
    },
    init: r =>
      bt(
        window,
        'popstate',
        rt(r, s => {
          if (s && s < 0) return !n.confirm(s);
          {
            const o = t();
            return !n.confirm(o.value, { state: o.state });
          }
        }),
      ),
    create: Pt(e.preload, e.explicitLinks, e.actionBase, e.transformUrl),
    utils: { go: r => window.history.go(r), beforeLeave: n },
  })(e);
}
function At(e) {
  e.forEach(t => {
    if (!t.attrs.href) return;
    let n = document.head.querySelector(`link[href="${t.attrs.href}"]`);
    n ||
      ((n = document.createElement('link')),
      n.setAttribute('rel', 'preload'),
      n.setAttribute('as', 'style'),
      n.setAttribute('href', t.attrs.href),
      document.head.appendChild(n));
  });
}
const St = D('<style>'),
  kt = D('<link>'),
  Lt = D('<script> '),
  Ct = D('<noscript>'),
  Tt = {
    style: e =>
      (() => {
        const t = N(St);
        return (
          F(
            t,
            M(() => e.attrs),
            !1,
            !0,
          ),
          X(t, () => e.children),
          W(),
          t
        );
      })(),
    link: e =>
      (() => {
        const t = N(kt);
        return (
          F(
            t,
            M(() => e.attrs),
            !1,
            !1,
          ),
          W(),
          t
        );
      })(),
    script: e =>
      e.attrs.src
        ? (() => {
            const t = N(Lt);
            return (
              F(
                t,
                M(() => e.attrs, {
                  get id() {
                    return e.key;
                  },
                }),
                !1,
                !0,
              ),
              W(),
              t
            );
          })()
        : null,
    noscript: e =>
      (() => {
        const t = N(Ct);
        return (
          F(
            t,
            M(() => e.attrs),
            !1,
            !0,
          ),
          X(t, () => e.children),
          W(),
          t
        );
      })(),
  };
function It(e, t) {
  let { tag: n, attrs: { key: r, ...s } = { key: void 0 }, children: o } = e;
  return Tt[n]({ attrs: { ...s, nonce: t }, key: r, children: o });
}
function Nt(e, t, n, r = 'default') {
  return We(async () => {
    {
      const o = (await e.import())[r],
        a = (await t.inputs?.[e.src].assets()).filter(
          c => c.tag === 'style' || c.attrs.rel === 'stylesheet',
        );
      return (
        typeof window < 'u' && At(a),
        { default: c => [...a.map(u => It(u)), v(o, c)] }
      );
    }
  });
}
const L = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function Ot(e = {}) {
  const t = { options: e, rootNode: Pe(), staticRoutesMap: {} },
    n = r => (e.strictTrailingSlash ? r : r.replace(/\/$/, '') || '/');
  if (e.routes) for (const r in e.routes) ae(t, n(r), e.routes[r]);
  return {
    ctx: t,
    lookup: r => Dt(t, n(r)),
    insert: (r, s) => ae(t, n(r), s),
    remove: r => Ut(t, n(r)),
  };
}
function Dt(e, t) {
  const n = e.staticRoutesMap[t];
  if (n) return n.data;
  const r = t.split('/'),
    s = {};
  let o = !1,
    i = null,
    a = e.rootNode,
    l = null;
  for (let c = 0; c < r.length; c++) {
    const u = r[c];
    a.wildcardChildNode !== null &&
      ((i = a.wildcardChildNode), (l = r.slice(c).join('/')));
    const h = a.children.get(u);
    if (h === void 0) {
      if (a && a.placeholderChildren.length > 1) {
        const p = r.length - c;
        a = a.placeholderChildren.find(m => m.maxDepth === p) || null;
      } else a = a.placeholderChildren[0] || null;
      if (!a) break;
      a.paramName && (s[a.paramName] = u), (o = !0);
    } else a = h;
  }
  return (
    (a === null || a.data === null) &&
      i !== null &&
      ((a = i), (s[a.paramName || '_'] = l), (o = !0)),
    a ? (o ? { ...a.data, params: o ? s : void 0 } : a.data) : null
  );
}
function ae(e, t, n) {
  let r = !0;
  const s = t.split('/');
  let o = e.rootNode,
    i = 0;
  const a = [o];
  for (const l of s) {
    let c;
    if ((c = o.children.get(l))) o = c;
    else {
      const u = jt(l);
      (c = Pe({ type: u, parent: o })),
        o.children.set(l, c),
        u === L.PLACEHOLDER
          ? ((c.paramName = l === '*' ? `_${i++}` : l.slice(1)),
            o.placeholderChildren.push(c),
            (r = !1))
          : u === L.WILDCARD &&
            ((o.wildcardChildNode = c),
            (c.paramName = l.slice(3) || '_'),
            (r = !1)),
        a.push(c),
        (o = c);
    }
  }
  for (const [l, c] of a.entries())
    c.maxDepth = Math.max(a.length - l, c.maxDepth || 0);
  return (o.data = n), r === !0 && (e.staticRoutesMap[t] = o), o;
}
function Ut(e, t) {
  let n = !1;
  const r = t.split('/');
  let s = e.rootNode;
  for (const o of r) if (((s = s.children.get(o)), !s)) return n;
  if (s.data) {
    const o = r.at(-1) || '';
    (s.data = null),
      Object.keys(s.children).length === 0 &&
        s.parent &&
        (s.parent.children.delete(o),
        (s.parent.wildcardChildNode = null),
        (s.parent.placeholderChildren = [])),
      (n = !0);
  }
  return n;
}
function Pe(e = {}) {
  return {
    type: e.type || L.NORMAL,
    maxDepth: 0,
    parent: e.parent || null,
    children: new Map(),
    data: e.data || null,
    paramName: e.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: [],
  };
}
function jt(e) {
  return e.startsWith('**')
    ? L.WILDCARD
    : e[0] === ':' || e === '*'
      ? L.PLACEHOLDER
      : L.NORMAL;
}
const Ft = 'modulepreload',
  Mt = function (e) {
    return '/_build/' + e;
  },
  ie = {},
  P = function (t, n, r) {
    let s = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName('link');
      const i = document.querySelector('meta[property=csp-nonce]'),
        a = i?.nonce || i?.getAttribute('nonce');
      s = Promise.allSettled(
        n.map(l => {
          if (((l = Mt(l)), l in ie)) return;
          ie[l] = !0;
          const c = l.endsWith('.css'),
            u = c ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${l}"]${u}`)) return;
          const h = document.createElement('link');
          if (
            ((h.rel = c ? 'stylesheet' : Ft),
            c || (h.as = 'script'),
            (h.crossOrigin = ''),
            (h.href = l),
            a && h.setAttribute('nonce', a),
            document.head.appendChild(h),
            c)
          )
            return new Promise((p, m) => {
              h.addEventListener('load', p),
                h.addEventListener('error', () =>
                  m(new Error(`Unable to preload CSS for ${l}`)),
                );
            });
        }),
      );
    }
    function o(i) {
      const a = new Event('vite:preloadError', { cancelable: !0 });
      if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
        throw i;
    }
    return s.then(i => {
      for (const a of i || []) a.status === 'rejected' && o(a.reason);
      return t().catch(o);
    });
  },
  $e = [
    {
      page: !0,
      $component: {
        src: 'src/routes/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-DFbguyGp.js'), __vite__mapDeps([0, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/completion/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-fVrQ-dxf.js'), __vite__mapDeps([3, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/completion/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/completion/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/completion/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-attachments/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-6o46ChXI.js'), __vite__mapDeps([4, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/use-chat-attachments/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/use-chat-attachments/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-attachments/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-request/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-DXNtvkB6.js'), __vite__mapDeps([5, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/use-chat-request/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/use-chat-request/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-request/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-streamdata/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-DiEt-g6Z.js'), __vite__mapDeps([6, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/use-chat-streamdata/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/use-chat-streamdata/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-streamdata/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-tools/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-DMG48wzN.js'), __vite__mapDeps([7, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/use-chat-tools/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/use-chat-tools/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-tools/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-chat-vision/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-DLIbet0G.js'), __vite__mapDeps([8, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/use-chat-vision/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/use-chat-vision/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-chat-vision/index.tsx',
    },
    {
      page: !0,
      $component: {
        src: 'src/routes/use-object/index.tsx?pick=default&pick=$css',
        build: () =>
          P(() => import('./index-VvGVp-tG.js'), __vite__mapDeps([9, 1, 2])),
        import: () =>
          import(
            globalThis.MANIFEST.client.inputs[
              'src/routes/use-object/index.tsx?pick=default&pick=$css'
            ].output.path
          ),
      },
      path: '/use-object/',
      filePath:
        '/Users/jrmy/Repositories/vercel/ai/examples/solidstart-openai/src/routes/use-object/index.tsx',
    },
  ],
  Wt = qt($e.filter(e => e.page));
function qt(e) {
  function t(n, r, s, o) {
    const i = Object.values(n).find(a => s.startsWith(a.id + '/'));
    return i
      ? (t(i.children || (i.children = []), r, s.slice(i.id.length)), n)
      : (n.push({
          ...r,
          id: s,
          path: s.replace(/\/\([^)/]+\)/g, '').replace(/\([^)/]+\)/g, ''),
        }),
        n);
  }
  return e
    .sort((n, r) => n.path.length - r.path.length)
    .reduce((n, r) => t(n, r, r.path, r.path), []);
}
function Bt(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
Ot({
  routes: $e.reduce((e, t) => {
    if (!Bt(t)) return e;
    let n = t.path
      .replace(/\/\([^)/]+\)/g, '')
      .replace(/\([^)/]+\)/g, '')
      .replace(/\*([^/]*)/g, (r, s) => `**:${s}`)
      .split('/')
      .map(r =>
        r.startsWith(':') || r.startsWith('*') ? r : encodeURIComponent(r),
      )
      .join('/');
    if (/:[^/]*\?/g.test(n))
      throw new Error(
        `Optional parameters are not supported in API routes: ${n}`,
      );
    if (e[n])
      throw new Error(
        `Duplicate API routes for "${n}" found at "${e[n].route.path}" and "${t.path}"`,
      );
    return (e[n] = { route: t }), e;
  }, {}),
});
function zt() {
  function e(n) {
    return {
      ...n,
      ...(n.$$route ? n.$$route.require().route : void 0),
      info: {
        ...(n.$$route ? n.$$route.require().route.info : {}),
        filesystem: !0,
      },
      component:
        n.$component &&
        Nt(n.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr),
      children: n.children ? n.children.map(e) : void 0,
    };
  }
  return Wt.map(e);
}
let ce;
const Vt = () => ce || (ce = zt());
function Ht() {
  return v($t, {
    root: e =>
      v(qe, {
        get children() {
          return e.children;
        },
      }),
    get children() {
      return v(Vt, {});
    },
  });
}
const Kt = e => null,
  Zt = D(
    '<span style=font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;>',
  ),
  Gt = e => {
    const t = 'Error | Uncaught Client Exception';
    return v(Be, {
      fallback: n => (
        console.error(n),
        [
          (() => {
            const r = N(Zt);
            return X(r, t), r;
          })(),
          v(Kt, { code: 500 }),
        ]
      ),
      get children() {
        return e.children;
      },
    });
  };
function Xt(e, t) {
  return ze(e, t);
}
function le(e) {
  return e.children;
}
function Jt() {
  return v(le, {
    get children() {
      return v(le, {
        get children() {
          return v(Gt, {
            get children() {
              return v(Ht, {});
            },
          });
        },
      });
    },
  });
}
Xt(() => v(Jt, {}), document.getElementById('app'));
const en = void 0;
export { en as default };
