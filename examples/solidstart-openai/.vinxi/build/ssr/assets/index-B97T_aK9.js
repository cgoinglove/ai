import { ZodFirstPartyTypeKind as f, ZodOptional as at } from 'zod';
var pe = 'vercel.ai.error',
  nt = Symbol.for(pe),
  de,
  st = class fe extends Error {
    constructor({ name: t, message: r, cause: a }) {
      super(r), (this[de] = !0), (this.name = t), (this.cause = a);
    }
    static isInstance(t) {
      return fe.hasMarker(t, pe);
    }
    static hasMarker(t, r) {
      const a = Symbol.for(r);
      return (
        t != null &&
        typeof t == 'object' &&
        a in t &&
        typeof t[a] == 'boolean' &&
        t[a] === !0
      );
    }
  };
de = nt;
var E = st,
  me = 'AI_APICallError',
  ye = `vercel.ai.error.${me}`,
  ot = Symbol.for(ye),
  ge,
  C = class extends E {
    constructor({
      message: e,
      url: t,
      requestBodyValues: r,
      statusCode: a,
      responseHeaders: n,
      responseBody: s,
      cause: i,
      isRetryable: c = a != null &&
        (a === 408 || a === 409 || a === 429 || a >= 500),
      data: o,
    }) {
      super({ name: me, message: e, cause: i }),
        (this[ge] = !0),
        (this.url = t),
        (this.requestBodyValues = r),
        (this.statusCode = a),
        (this.responseHeaders = n),
        (this.responseBody = s),
        (this.isRetryable = c),
        (this.data = o);
    }
    static isInstance(e) {
      return E.hasMarker(e, ye);
    }
  };
ge = ot;
var he = 'AI_EmptyResponseBodyError',
  be = `vercel.ai.error.${he}`,
  it = Symbol.for(be),
  _e,
  ct = class extends E {
    constructor({ message: e = 'Empty response body' } = {}) {
      super({ name: he, message: e }), (this[_e] = !0);
    }
    static isInstance(e) {
      return E.hasMarker(e, be);
    }
  };
_e = it;
function ve(e) {
  return e == null
    ? 'unknown error'
    : typeof e == 'string'
      ? e
      : e instanceof Error
        ? e.message
        : JSON.stringify(e);
}
var Ie = 'AI_InvalidArgumentError',
  Ee = `vercel.ai.error.${Ie}`,
  lt = Symbol.for(Ee),
  we,
  ke = class extends E {
    constructor({ message: e, cause: t, argument: r }) {
      super({ name: Ie, message: e, cause: t }),
        (this[we] = !0),
        (this.argument = r);
    }
    static isInstance(e) {
      return E.hasMarker(e, Ee);
    }
  };
we = lt;
var Ae = 'AI_InvalidPromptError',
  Se = `vercel.ai.error.${Ae}`,
  ut = Symbol.for(Se),
  Te,
  ra = class extends E {
    constructor({ prompt: e, message: t, cause: r }) {
      super({ name: Ae, message: `Invalid prompt: ${t}`, cause: r }),
        (this[Te] = !0),
        (this.prompt = e);
    }
    static isInstance(e) {
      return E.hasMarker(e, Se);
    }
  };
Te = ut;
var Pe = 'AI_InvalidResponseDataError',
  xe = `vercel.ai.error.${Pe}`,
  pt = Symbol.for(xe),
  Ne,
  aa = class extends E {
    constructor({
      data: e,
      message: t = `Invalid response data: ${JSON.stringify(e)}.`,
    }) {
      super({ name: Pe, message: t }), (this[Ne] = !0), (this.data = e);
    }
    static isInstance(e) {
      return E.hasMarker(e, xe);
    }
  };
Ne = pt;
var Oe = 'AI_JSONParseError',
  Re = `vercel.ai.error.${Oe}`,
  dt = Symbol.for(Re),
  Ce,
  J = class extends E {
    constructor({ text: e, cause: t }) {
      super({
        name: Oe,
        message: `JSON parsing failed: Text: ${e}.
Error message: ${ve(t)}`,
        cause: t,
      }),
        (this[Ce] = !0),
        (this.text = e);
    }
    static isInstance(e) {
      return E.hasMarker(e, Re);
    }
  };
Ce = dt;
var De = 'AI_LoadAPIKeyError',
  je = `vercel.ai.error.${De}`,
  ft = Symbol.for(je),
  Me,
  B = class extends E {
    constructor({ message: e }) {
      super({ name: De, message: e }), (this[Me] = !0);
    }
    static isInstance(e) {
      return E.hasMarker(e, je);
    }
  };
Me = ft;
var $e = 'AI_TooManyEmbeddingValuesForCallError',
  Fe = `vercel.ai.error.${$e}`,
  mt = Symbol.for(Fe),
  Le,
  na = class extends E {
    constructor(e) {
      super({
        name: $e,
        message: `Too many values for a single embedding call. The ${e.provider} model "${e.modelId}" can only embed up to ${e.maxEmbeddingsPerCall} values per call, but ${e.values.length} values were provided.`,
      }),
        (this[Le] = !0),
        (this.provider = e.provider),
        (this.modelId = e.modelId),
        (this.maxEmbeddingsPerCall = e.maxEmbeddingsPerCall),
        (this.values = e.values);
    }
    static isInstance(e) {
      return E.hasMarker(e, Fe);
    }
  };
Le = mt;
var Ze = 'AI_TypeValidationError',
  Be = `vercel.ai.error.${Ze}`,
  yt = Symbol.for(Be),
  Je,
  gt = class X extends E {
    constructor({ value: t, cause: r }) {
      super({
        name: Ze,
        message: `Type validation failed: Value: ${JSON.stringify(t)}.
Error message: ${ve(r)}`,
        cause: r,
      }),
        (this[Je] = !0),
        (this.value = t);
    }
    static isInstance(t) {
      return E.hasMarker(t, Be);
    }
    static wrap({ value: t, cause: r }) {
      return X.isInstance(r) && r.value === t
        ? r
        : new X({ value: t, cause: r });
    }
  };
Je = yt;
var U = gt,
  Ue = 'AI_UnsupportedFunctionalityError',
  Ve = `vercel.ai.error.${Ue}`,
  ht = Symbol.for(Ve),
  ze,
  sa = class extends E {
    constructor({
      functionality: e,
      message: t = `'${e}' functionality not supported.`,
    }) {
      super({ name: Ue, message: t }),
        (this[ze] = !0),
        (this.functionality = e);
    }
    static isInstance(e) {
      return E.hasMarker(e, Ve);
    }
  };
ze = ht;
function V(e) {
  return e === null ||
    typeof e == 'string' ||
    typeof e == 'number' ||
    typeof e == 'boolean'
    ? !0
    : Array.isArray(e)
      ? e.every(V)
      : typeof e == 'object'
        ? Object.entries(e).every(([t, r]) => typeof t == 'string' && V(r))
        : !1;
}
function oa(e) {
  return Array.isArray(e) && e.every(V);
}
function ia(e) {
  return (
    e != null &&
    typeof e == 'object' &&
    Object.entries(e).every(([t, r]) => typeof t == 'string' && V(r))
  );
}
let bt =
  (e, t = 21) =>
  (r = t) => {
    let a = '',
      n = r | 0;
    for (; n--; ) a += e[(Math.random() * e.length) | 0];
    return a;
  };
function _t(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var D = { exports: {} };
const vt = typeof Buffer < 'u',
  ne =
    /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,
  se =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function Ye(e, t, r) {
  r == null && t !== null && typeof t == 'object' && ((r = t), (t = void 0)),
    vt && Buffer.isBuffer(e) && (e = e.toString()),
    e && e.charCodeAt(0) === 65279 && (e = e.slice(1));
  const a = JSON.parse(e, t);
  if (a === null || typeof a != 'object') return a;
  const n = (r && r.protoAction) || 'error',
    s = (r && r.constructorAction) || 'error';
  if (n === 'ignore' && s === 'ignore') return a;
  if (n !== 'ignore' && s !== 'ignore') {
    if (ne.test(e) === !1 && se.test(e) === !1) return a;
  } else if (n !== 'ignore' && s === 'ignore') {
    if (ne.test(e) === !1) return a;
  } else if (se.test(e) === !1) return a;
  return qe(a, { protoAction: n, constructorAction: s, safe: r && r.safe });
}
function qe(
  e,
  { protoAction: t = 'error', constructorAction: r = 'error', safe: a } = {},
) {
  let n = [e];
  for (; n.length; ) {
    const s = n;
    n = [];
    for (const i of s) {
      if (
        t !== 'ignore' &&
        Object.prototype.hasOwnProperty.call(i, '__proto__')
      ) {
        if (a === !0) return null;
        if (t === 'error')
          throw new SyntaxError('Object contains forbidden prototype property');
        delete i.__proto__;
      }
      if (
        r !== 'ignore' &&
        Object.prototype.hasOwnProperty.call(i, 'constructor') &&
        Object.prototype.hasOwnProperty.call(i.constructor, 'prototype')
      ) {
        if (a === !0) return null;
        if (r === 'error')
          throw new SyntaxError('Object contains forbidden prototype property');
        delete i.constructor;
      }
      for (const c in i) {
        const o = i[c];
        o && typeof o == 'object' && n.push(o);
      }
    }
  }
  return e;
}
function te(e, t, r) {
  const a = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return Ye(e, t, r);
  } finally {
    Error.stackTraceLimit = a;
  }
}
function It(e, t) {
  const r = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return Ye(e, t, { safe: !0 });
  } catch {
    return null;
  } finally {
    Error.stackTraceLimit = r;
  }
}
D.exports = te;
D.exports.default = te;
D.exports.parse = te;
D.exports.safeParse = It;
D.exports.scan = qe;
var Et = D.exports;
const re = _t(Et);
function ca(...e) {
  return e.reduce((t, r) => ({ ...t, ...(r ?? {}) }), {});
}
function la(e) {
  return new ReadableStream({
    async pull(t) {
      try {
        const { value: r, done: a } = await e.next();
        a ? t.close() : t.enqueue(r);
      } catch (r) {
        t.error(r);
      }
    },
    cancel() {},
  });
}
async function ua(e) {
  return e == null ? Promise.resolve() : new Promise(t => setTimeout(t, e));
}
function wt() {
  let e = '',
    t,
    r = [],
    a,
    n;
  function s(o, l) {
    if (o === '') {
      i(l);
      return;
    }
    if (o.startsWith(':')) return;
    const p = o.indexOf(':');
    if (p === -1) {
      c(o, '');
      return;
    }
    const d = o.slice(0, p),
      _ = p + 1,
      v = _ < o.length && o[_] === ' ' ? o.slice(_ + 1) : o.slice(_);
    c(d, v);
  }
  function i(o) {
    r.length > 0 &&
      (o.enqueue({
        event: t,
        data: r.join(`
`),
        id: a,
        retry: n,
      }),
      (r = []),
      (t = void 0),
      (n = void 0));
  }
  function c(o, l) {
    switch (o) {
      case 'event':
        t = l;
        break;
      case 'data':
        r.push(l);
        break;
      case 'id':
        a = l;
        break;
      case 'retry':
        const p = parseInt(l, 10);
        isNaN(p) || (n = p);
        break;
    }
  }
  return new TransformStream({
    transform(o, l) {
      const { lines: p, incompleteLine: d } = kt(e, o);
      e = d;
      for (let _ = 0; _ < p.length; _++) s(p[_], l);
    },
    flush(o) {
      s(e, o), i(o);
    },
  });
}
function kt(e, t) {
  const r = [];
  let a = e;
  for (let n = 0; n < t.length; ) {
    const s = t[n++];
    s ===
    `
`
      ? (r.push(a), (a = ''))
      : s === '\r'
        ? (r.push(a),
          (a = ''),
          t[n + 1] ===
            `
` && n++)
        : (a += s);
  }
  return { lines: r, incompleteLine: a };
}
function Z(e) {
  const t = {};
  return (
    e.headers.forEach((r, a) => {
      t[a] = r;
    }),
    t
  );
}
var At = ({
    prefix: e,
    size: t = 16,
    alphabet:
      r = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    separator: a = '-',
  } = {}) => {
    const n = bt(r, t);
    if (e == null) return n;
    if (r.includes(a))
      throw new ke({
        argument: 'separator',
        message: `The separator "${a}" must not be part of the alphabet "${r}".`,
      });
    return s => `${e}${a}${n(s)}`;
  },
  He = At();
function pa(e) {
  return e == null
    ? 'unknown error'
    : typeof e == 'string'
      ? e
      : e instanceof Error
        ? e.message
        : JSON.stringify(e);
}
function St(e) {
  return Object.fromEntries(Object.entries(e).filter(([t, r]) => r != null));
}
function W(e) {
  return (
    e instanceof Error && (e.name === 'AbortError' || e.name === 'TimeoutError')
  );
}
function da({
  apiKey: e,
  environmentVariableName: t,
  apiKeyParameterName: r = 'apiKey',
  description: a,
}) {
  if (typeof e == 'string') return e;
  if (e != null) throw new B({ message: `${a} API key must be a string.` });
  if (typeof process > 'u')
    throw new B({
      message: `${a} API key is missing. Pass it using the '${r}' parameter. Environment variables is not supported in this environment.`,
    });
  if (((e = process.env[t]), e == null))
    throw new B({
      message: `${a} API key is missing. Pass it using the '${r}' parameter or the ${t} environment variable.`,
    });
  if (typeof e != 'string')
    throw new B({
      message: `${a} API key must be a string. The value of the ${t} environment variable is not a string.`,
    });
  return e;
}
var z = Symbol.for('vercel.ai.validator');
function Tt(e) {
  return { [z]: !0, validate: e };
}
function Pt(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    z in e &&
    e[z] === !0 &&
    'validate' in e
  );
}
function xt(e) {
  return Pt(e) ? e : Nt(e);
}
function Nt(e) {
  return Tt(t => {
    const r = e.safeParse(t);
    return r.success
      ? { success: !0, value: r.data }
      : { success: !1, error: r.error };
  });
}
function Ot({ value: e, schema: t }) {
  const r = ae({ value: e, schema: t });
  if (!r.success) throw U.wrap({ value: e, cause: r.error });
  return r.value;
}
function ae({ value: e, schema: t }) {
  const r = xt(t);
  try {
    if (r.validate == null) return { success: !0, value: e };
    const a = r.validate(e);
    return a.success
      ? a
      : { success: !1, error: U.wrap({ value: e, cause: a.error }) };
  } catch (a) {
    return { success: !1, error: U.wrap({ value: e, cause: a }) };
  }
}
function Rt({ text: e, schema: t }) {
  try {
    const r = re.parse(e);
    return t == null ? r : Ot({ value: r, schema: t });
  } catch (r) {
    throw J.isInstance(r) || U.isInstance(r) ? r : new J({ text: e, cause: r });
  }
}
function Y({ text: e, schema: t }) {
  try {
    const r = re.parse(e);
    if (t == null) return { success: !0, value: r, rawValue: r };
    const a = ae({ value: r, schema: t });
    return a.success ? { ...a, rawValue: r } : a;
  } catch (r) {
    return {
      success: !1,
      error: J.isInstance(r) ? r : new J({ text: e, cause: r }),
    };
  }
}
function fa(e) {
  try {
    return re.parse(e), !0;
  } catch {
    return !1;
  }
}
function ma({ provider: e, providerOptions: t, schema: r }) {
  if (t?.[e] == null) return;
  const a = ae({ value: t[e], schema: r });
  if (!a.success)
    throw new ke({
      argument: 'providerOptions',
      message: `invalid ${e} provider options`,
      cause: a.error,
    });
  return a.value;
}
var Ct = () => globalThis.fetch,
  ya = async ({
    url: e,
    headers: t,
    body: r,
    failedResponseHandler: a,
    successfulResponseHandler: n,
    abortSignal: s,
    fetch: i,
  }) =>
    Ke({
      url: e,
      headers: { 'Content-Type': 'application/json', ...t },
      body: { content: JSON.stringify(r), values: r },
      failedResponseHandler: a,
      successfulResponseHandler: n,
      abortSignal: s,
      fetch: i,
    }),
  ga = async ({
    url: e,
    headers: t,
    formData: r,
    failedResponseHandler: a,
    successfulResponseHandler: n,
    abortSignal: s,
    fetch: i,
  }) =>
    Ke({
      url: e,
      headers: t,
      body: { content: r, values: Object.fromEntries(r.entries()) },
      failedResponseHandler: a,
      successfulResponseHandler: n,
      abortSignal: s,
      fetch: i,
    }),
  Ke = async ({
    url: e,
    headers: t = {},
    body: r,
    successfulResponseHandler: a,
    failedResponseHandler: n,
    abortSignal: s,
    fetch: i = Ct(),
  }) => {
    try {
      const c = await i(e, {
          method: 'POST',
          headers: St(t),
          body: r.content,
          signal: s,
        }),
        o = Z(c);
      if (!c.ok) {
        let l;
        try {
          l = await n({ response: c, url: e, requestBodyValues: r.values });
        } catch (p) {
          throw W(p) || C.isInstance(p)
            ? p
            : new C({
                message: 'Failed to process error response',
                cause: p,
                statusCode: c.status,
                url: e,
                responseHeaders: o,
                requestBodyValues: r.values,
              });
        }
        throw l.value;
      }
      try {
        return await a({ response: c, url: e, requestBodyValues: r.values });
      } catch (l) {
        throw l instanceof Error && (W(l) || C.isInstance(l))
          ? l
          : new C({
              message: 'Failed to process successful response',
              cause: l,
              statusCode: c.status,
              url: e,
              responseHeaders: o,
              requestBodyValues: r.values,
            });
      }
    } catch (c) {
      if (W(c)) throw c;
      if (c instanceof TypeError && c.message === 'fetch failed') {
        const o = c.cause;
        if (o != null)
          throw new C({
            message: `Cannot connect to API: ${o.message}`,
            cause: o,
            url: e,
            requestBodyValues: r.values,
            isRetryable: !0,
          });
      }
      throw c;
    }
  },
  ha =
    ({ errorSchema: e, errorToMessage: t, isRetryable: r }) =>
    async ({ response: a, url: n, requestBodyValues: s }) => {
      const i = await a.text(),
        c = Z(a);
      if (i.trim() === '')
        return {
          responseHeaders: c,
          value: new C({
            message: a.statusText,
            url: n,
            requestBodyValues: s,
            statusCode: a.status,
            responseHeaders: c,
            responseBody: i,
            isRetryable: r?.(a),
          }),
        };
      try {
        const o = Rt({ text: i, schema: e });
        return {
          responseHeaders: c,
          value: new C({
            message: t(o),
            url: n,
            requestBodyValues: s,
            statusCode: a.status,
            responseHeaders: c,
            responseBody: i,
            data: o,
            isRetryable: r?.(a, o),
          }),
        };
      } catch {
        return {
          responseHeaders: c,
          value: new C({
            message: a.statusText,
            url: n,
            requestBodyValues: s,
            statusCode: a.status,
            responseHeaders: c,
            responseBody: i,
            isRetryable: r?.(a),
          }),
        };
      }
    },
  ba =
    e =>
    async ({ response: t }) => {
      const r = Z(t);
      if (t.body == null) throw new ct({});
      return {
        responseHeaders: r,
        value: t.body
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(wt())
          .pipeThrough(
            new TransformStream({
              transform({ data: a }, n) {
                a !== '[DONE]' && n.enqueue(Y({ text: a, schema: e }));
              },
            }),
          ),
      };
    },
  _a =
    e =>
    async ({ response: t, url: r, requestBodyValues: a }) => {
      const n = await t.text(),
        s = Y({ text: n, schema: e }),
        i = Z(t);
      if (!s.success)
        throw new C({
          message: 'Invalid JSON response',
          cause: s.error,
          statusCode: t.status,
          responseHeaders: i,
          responseBody: n,
          url: r,
          requestBodyValues: a,
        });
      return { responseHeaders: i, value: s.value, rawValue: s.rawValue };
    },
  va =
    () =>
    async ({ response: e, url: t, requestBodyValues: r }) => {
      const a = Z(e);
      if (!e.body)
        throw new C({
          message: 'Response body is empty',
          url: t,
          requestBodyValues: r,
          statusCode: e.status,
          responseHeaders: a,
          responseBody: void 0,
        });
      try {
        const n = await e.arrayBuffer();
        return { responseHeaders: a, value: new Uint8Array(n) };
      } catch (n) {
        throw new C({
          message: 'Failed to read response as array buffer',
          url: t,
          requestBodyValues: r,
          statusCode: e.status,
          responseHeaders: a,
          responseBody: void 0,
          cause: n,
        });
      }
    },
  { btoa: Dt, atob: jt } = globalThis;
function Ia(e) {
  const t = e.replace(/-/g, '+').replace(/_/g, '/'),
    r = jt(t);
  return Uint8Array.from(r, a => a.codePointAt(0));
}
function Ea(e) {
  let t = '';
  for (let r = 0; r < e.length; r++) t += String.fromCodePoint(e[r]);
  return Dt(t);
}
function wa(e) {
  return e?.replace(/\/$/, '');
}
const Mt = Symbol('Let zodToJsonSchema decide on which parser to use'),
  oe = {
    name: void 0,
    $refStrategy: 'root',
    basePath: ['#'],
    effectStrategy: 'input',
    pipeStrategy: 'all',
    dateStrategy: 'format:date-time',
    mapStrategy: 'entries',
    removeAdditionalStrategy: 'passthrough',
    definitionPath: 'definitions',
    target: 'jsonSchema7',
    strictUnions: !1,
    definitions: {},
    errorMessages: !1,
    markdownDescription: !1,
    patternStrategy: 'escape',
    applyRegexFlags: !1,
    emailStrategy: 'format:email',
    base64Strategy: 'contentEncoding:base64',
    nameStrategy: 'ref',
  },
  $t = e => (typeof e == 'string' ? { ...oe, name: e } : { ...oe, ...e }),
  Ft = e => {
    const t = $t(e),
      r =
        t.name !== void 0
          ? [...t.basePath, t.definitionPath, t.name]
          : t.basePath;
    return {
      ...t,
      currentPath: r,
      propertyPath: void 0,
      seen: new Map(
        Object.entries(t.definitions).map(([a, n]) => [
          n._def,
          {
            def: n._def,
            path: [...t.basePath, t.definitionPath, a],
            jsonSchema: void 0,
          },
        ]),
      ),
    };
  };
function We(e, t, r, a) {
  a?.errorMessages && r && (e.errorMessage = { ...e.errorMessage, [t]: r });
}
function g(e, t, r, a, n) {
  (e[t] = r), We(e, t, a, n);
}
function Lt() {
  return {};
}
function Zt(e, t) {
  const r = { type: 'array' };
  return (
    e.type?._def &&
      e.type?._def?.typeName !== f.ZodAny &&
      (r.items = m(e.type._def, {
        ...t,
        currentPath: [...t.currentPath, 'items'],
      })),
    e.minLength && g(r, 'minItems', e.minLength.value, e.minLength.message, t),
    e.maxLength && g(r, 'maxItems', e.maxLength.value, e.maxLength.message, t),
    e.exactLength &&
      (g(r, 'minItems', e.exactLength.value, e.exactLength.message, t),
      g(r, 'maxItems', e.exactLength.value, e.exactLength.message, t)),
    r
  );
}
function Bt(e, t) {
  const r = { type: 'integer', format: 'int64' };
  if (!e.checks) return r;
  for (const a of e.checks)
    switch (a.kind) {
      case 'min':
        t.target === 'jsonSchema7'
          ? a.inclusive
            ? g(r, 'minimum', a.value, a.message, t)
            : g(r, 'exclusiveMinimum', a.value, a.message, t)
          : (a.inclusive || (r.exclusiveMinimum = !0),
            g(r, 'minimum', a.value, a.message, t));
        break;
      case 'max':
        t.target === 'jsonSchema7'
          ? a.inclusive
            ? g(r, 'maximum', a.value, a.message, t)
            : g(r, 'exclusiveMaximum', a.value, a.message, t)
          : (a.inclusive || (r.exclusiveMaximum = !0),
            g(r, 'maximum', a.value, a.message, t));
        break;
      case 'multipleOf':
        g(r, 'multipleOf', a.value, a.message, t);
        break;
    }
  return r;
}
function Jt() {
  return { type: 'boolean' };
}
function Ge(e, t) {
  return m(e.type._def, t);
}
const Ut = (e, t) => m(e.innerType._def, t);
function Qe(e, t, r) {
  const a = r ?? t.dateStrategy;
  if (Array.isArray(a)) return { anyOf: a.map((n, s) => Qe(e, t, n)) };
  switch (a) {
    case 'string':
    case 'format:date-time':
      return { type: 'string', format: 'date-time' };
    case 'format:date':
      return { type: 'string', format: 'date' };
    case 'integer':
      return Vt(e, t);
  }
}
const Vt = (e, t) => {
  const r = { type: 'integer', format: 'unix-time' };
  if (t.target === 'openApi3') return r;
  for (const a of e.checks)
    switch (a.kind) {
      case 'min':
        g(r, 'minimum', a.value, a.message, t);
        break;
      case 'max':
        g(r, 'maximum', a.value, a.message, t);
        break;
    }
  return r;
};
function zt(e, t) {
  return { ...m(e.innerType._def, t), default: e.defaultValue() };
}
function Yt(e, t) {
  return t.effectStrategy === 'input' ? m(e.schema._def, t) : {};
}
function qt(e) {
  return { type: 'string', enum: Array.from(e.values) };
}
const Ht = e => ('type' in e && e.type === 'string' ? !1 : 'allOf' in e);
function Kt(e, t) {
  const r = [
    m(e.left._def, { ...t, currentPath: [...t.currentPath, 'allOf', '0'] }),
    m(e.right._def, { ...t, currentPath: [...t.currentPath, 'allOf', '1'] }),
  ].filter(s => !!s);
  let a =
    t.target === 'jsonSchema2019-09' ? { unevaluatedProperties: !1 } : void 0;
  const n = [];
  return (
    r.forEach(s => {
      if (Ht(s))
        n.push(...s.allOf), s.unevaluatedProperties === void 0 && (a = void 0);
      else {
        let i = s;
        if ('additionalProperties' in s && s.additionalProperties === !1) {
          const { additionalProperties: c, ...o } = s;
          i = o;
        } else a = void 0;
        n.push(i);
      }
    }),
    n.length ? { allOf: n, ...a } : void 0
  );
}
function Wt(e, t) {
  const r = typeof e.value;
  return r !== 'bigint' && r !== 'number' && r !== 'boolean' && r !== 'string'
    ? { type: Array.isArray(e.value) ? 'array' : 'object' }
    : t.target === 'openApi3'
      ? { type: r === 'bigint' ? 'integer' : r, enum: [e.value] }
      : { type: r === 'bigint' ? 'integer' : r, const: e.value };
}
let G;
const O = {
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  email:
    /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  emoji: () => (
    G === void 0 &&
      (G = RegExp('^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$', 'u')),
    G
  ),
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr:
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr:
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url:
    /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
};
function Xe(e, t) {
  const r = { type: 'string' };
  if (e.checks)
    for (const a of e.checks)
      switch (a.kind) {
        case 'min':
          g(
            r,
            'minLength',
            typeof r.minLength == 'number'
              ? Math.max(r.minLength, a.value)
              : a.value,
            a.message,
            t,
          );
          break;
        case 'max':
          g(
            r,
            'maxLength',
            typeof r.maxLength == 'number'
              ? Math.min(r.maxLength, a.value)
              : a.value,
            a.message,
            t,
          );
          break;
        case 'email':
          switch (t.emailStrategy) {
            case 'format:email':
              R(r, 'email', a.message, t);
              break;
            case 'format:idn-email':
              R(r, 'idn-email', a.message, t);
              break;
            case 'pattern:zod':
              P(r, O.email, a.message, t);
              break;
          }
          break;
        case 'url':
          R(r, 'uri', a.message, t);
          break;
        case 'uuid':
          R(r, 'uuid', a.message, t);
          break;
        case 'regex':
          P(r, a.regex, a.message, t);
          break;
        case 'cuid':
          P(r, O.cuid, a.message, t);
          break;
        case 'cuid2':
          P(r, O.cuid2, a.message, t);
          break;
        case 'startsWith':
          P(r, RegExp(`^${Q(a.value, t)}`), a.message, t);
          break;
        case 'endsWith':
          P(r, RegExp(`${Q(a.value, t)}$`), a.message, t);
          break;
        case 'datetime':
          R(r, 'date-time', a.message, t);
          break;
        case 'date':
          R(r, 'date', a.message, t);
          break;
        case 'time':
          R(r, 'time', a.message, t);
          break;
        case 'duration':
          R(r, 'duration', a.message, t);
          break;
        case 'length':
          g(
            r,
            'minLength',
            typeof r.minLength == 'number'
              ? Math.max(r.minLength, a.value)
              : a.value,
            a.message,
            t,
          ),
            g(
              r,
              'maxLength',
              typeof r.maxLength == 'number'
                ? Math.min(r.maxLength, a.value)
                : a.value,
              a.message,
              t,
            );
          break;
        case 'includes': {
          P(r, RegExp(Q(a.value, t)), a.message, t);
          break;
        }
        case 'ip': {
          a.version !== 'v6' && R(r, 'ipv4', a.message, t),
            a.version !== 'v4' && R(r, 'ipv6', a.message, t);
          break;
        }
        case 'base64url':
          P(r, O.base64url, a.message, t);
          break;
        case 'jwt':
          P(r, O.jwt, a.message, t);
          break;
        case 'cidr': {
          a.version !== 'v6' && P(r, O.ipv4Cidr, a.message, t),
            a.version !== 'v4' && P(r, O.ipv6Cidr, a.message, t);
          break;
        }
        case 'emoji':
          P(r, O.emoji(), a.message, t);
          break;
        case 'ulid': {
          P(r, O.ulid, a.message, t);
          break;
        }
        case 'base64': {
          switch (t.base64Strategy) {
            case 'format:binary': {
              R(r, 'binary', a.message, t);
              break;
            }
            case 'contentEncoding:base64': {
              g(r, 'contentEncoding', 'base64', a.message, t);
              break;
            }
            case 'pattern:zod': {
              P(r, O.base64, a.message, t);
              break;
            }
          }
          break;
        }
        case 'nanoid':
          P(r, O.nanoid, a.message, t);
      }
  return r;
}
function Q(e, t) {
  return t.patternStrategy === 'escape' ? Qt(e) : e;
}
const Gt = new Set(
  'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789',
);
function Qt(e) {
  let t = '';
  for (let r = 0; r < e.length; r++) Gt.has(e[r]) || (t += '\\'), (t += e[r]);
  return t;
}
function R(e, t, r, a) {
  e.format || e.anyOf?.some(n => n.format)
    ? (e.anyOf || (e.anyOf = []),
      e.format &&
        (e.anyOf.push({
          format: e.format,
          ...(e.errorMessage &&
            a.errorMessages && {
              errorMessage: { format: e.errorMessage.format },
            }),
        }),
        delete e.format,
        e.errorMessage &&
          (delete e.errorMessage.format,
          Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)),
      e.anyOf.push({
        format: t,
        ...(r && a.errorMessages && { errorMessage: { format: r } }),
      }))
    : g(e, 'format', t, r, a);
}
function P(e, t, r, a) {
  e.pattern || e.allOf?.some(n => n.pattern)
    ? (e.allOf || (e.allOf = []),
      e.pattern &&
        (e.allOf.push({
          pattern: e.pattern,
          ...(e.errorMessage &&
            a.errorMessages && {
              errorMessage: { pattern: e.errorMessage.pattern },
            }),
        }),
        delete e.pattern,
        e.errorMessage &&
          (delete e.errorMessage.pattern,
          Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)),
      e.allOf.push({
        pattern: ie(t, a),
        ...(r && a.errorMessages && { errorMessage: { pattern: r } }),
      }))
    : g(e, 'pattern', ie(t, a), r, a);
}
function ie(e, t) {
  if (!t.applyRegexFlags || !e.flags) return e.source;
  const r = {
      i: e.flags.includes('i'),
      m: e.flags.includes('m'),
      s: e.flags.includes('s'),
    },
    a = r.i ? e.source.toLowerCase() : e.source;
  let n = '',
    s = !1,
    i = !1,
    c = !1;
  for (let o = 0; o < a.length; o++) {
    if (s) {
      (n += a[o]), (s = !1);
      continue;
    }
    if (r.i) {
      if (i) {
        if (a[o].match(/[a-z]/)) {
          c
            ? ((n += a[o]),
              (n += `${a[o - 2]}-${a[o]}`.toUpperCase()),
              (c = !1))
            : a[o + 1] === '-' && a[o + 2]?.match(/[a-z]/)
              ? ((n += a[o]), (c = !0))
              : (n += `${a[o]}${a[o].toUpperCase()}`);
          continue;
        }
      } else if (a[o].match(/[a-z]/)) {
        n += `[${a[o]}${a[o].toUpperCase()}]`;
        continue;
      }
    }
    if (r.m) {
      if (a[o] === '^') {
        n += `(^|(?<=[\r
]))`;
        continue;
      } else if (a[o] === '$') {
        n += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (r.s && a[o] === '.') {
      n += i
        ? `${a[o]}\r
`
        : `[${a[o]}\r
]`;
      continue;
    }
    (n += a[o]),
      a[o] === '\\'
        ? (s = !0)
        : i && a[o] === ']'
          ? (i = !1)
          : !i && a[o] === '[' && (i = !0);
  }
  try {
    new RegExp(n);
  } catch {
    return (
      console.warn(
        `Could not convert regex pattern at ${t.currentPath.join('/')} to a flag-independent form! Falling back to the flag-ignorant source`,
      ),
      e.source
    );
  }
  return n;
}
function et(e, t) {
  if (
    (t.target === 'openAi' &&
      console.warn(
        'Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.',
      ),
    t.target === 'openApi3' && e.keyType?._def.typeName === f.ZodEnum)
  )
    return {
      type: 'object',
      required: e.keyType._def.values,
      properties: e.keyType._def.values.reduce(
        (a, n) => ({
          ...a,
          [n]:
            m(e.valueType._def, {
              ...t,
              currentPath: [...t.currentPath, 'properties', n],
            }) ?? {},
        }),
        {},
      ),
      additionalProperties: !1,
    };
  const r = {
    type: 'object',
    additionalProperties:
      m(e.valueType._def, {
        ...t,
        currentPath: [...t.currentPath, 'additionalProperties'],
      }) ?? {},
  };
  if (t.target === 'openApi3') return r;
  if (
    e.keyType?._def.typeName === f.ZodString &&
    e.keyType._def.checks?.length
  ) {
    const { type: a, ...n } = Xe(e.keyType._def, t);
    return { ...r, propertyNames: n };
  } else {
    if (e.keyType?._def.typeName === f.ZodEnum)
      return { ...r, propertyNames: { enum: e.keyType._def.values } };
    if (
      e.keyType?._def.typeName === f.ZodBranded &&
      e.keyType._def.type._def.typeName === f.ZodString &&
      e.keyType._def.type._def.checks?.length
    ) {
      const { type: a, ...n } = Ge(e.keyType._def, t);
      return { ...r, propertyNames: n };
    }
  }
  return r;
}
function Xt(e, t) {
  if (t.mapStrategy === 'record') return et(e, t);
  const r =
      m(e.keyType._def, {
        ...t,
        currentPath: [...t.currentPath, 'items', 'items', '0'],
      }) || {},
    a =
      m(e.valueType._def, {
        ...t,
        currentPath: [...t.currentPath, 'items', 'items', '1'],
      }) || {};
  return {
    type: 'array',
    maxItems: 125,
    items: { type: 'array', items: [r, a], minItems: 2, maxItems: 2 },
  };
}
function er(e) {
  const t = e.values,
    a = Object.keys(e.values)
      .filter(s => typeof t[t[s]] != 'number')
      .map(s => t[s]),
    n = Array.from(new Set(a.map(s => typeof s)));
  return {
    type:
      n.length === 1
        ? n[0] === 'string'
          ? 'string'
          : 'number'
        : ['string', 'number'],
    enum: a,
  };
}
function tr() {
  return { not: {} };
}
function rr(e) {
  return e.target === 'openApi3'
    ? { enum: ['null'], nullable: !0 }
    : { type: 'null' };
}
const q = {
  ZodString: 'string',
  ZodNumber: 'number',
  ZodBigInt: 'integer',
  ZodBoolean: 'boolean',
  ZodNull: 'null',
};
function ar(e, t) {
  if (t.target === 'openApi3') return ce(e, t);
  const r =
    e.options instanceof Map ? Array.from(e.options.values()) : e.options;
  if (
    r.every(
      a => a._def.typeName in q && (!a._def.checks || !a._def.checks.length),
    )
  ) {
    const a = r.reduce((n, s) => {
      const i = q[s._def.typeName];
      return i && !n.includes(i) ? [...n, i] : n;
    }, []);
    return { type: a.length > 1 ? a : a[0] };
  } else if (r.every(a => a._def.typeName === 'ZodLiteral' && !a.description)) {
    const a = r.reduce((n, s) => {
      const i = typeof s._def.value;
      switch (i) {
        case 'string':
        case 'number':
        case 'boolean':
          return [...n, i];
        case 'bigint':
          return [...n, 'integer'];
        case 'object':
          if (s._def.value === null) return [...n, 'null'];
        case 'symbol':
        case 'undefined':
        case 'function':
        default:
          return n;
      }
    }, []);
    if (a.length === r.length) {
      const n = a.filter((s, i, c) => c.indexOf(s) === i);
      return {
        type: n.length > 1 ? n : n[0],
        enum: r.reduce(
          (s, i) => (s.includes(i._def.value) ? s : [...s, i._def.value]),
          [],
        ),
      };
    }
  } else if (r.every(a => a._def.typeName === 'ZodEnum'))
    return {
      type: 'string',
      enum: r.reduce(
        (a, n) => [...a, ...n._def.values.filter(s => !a.includes(s))],
        [],
      ),
    };
  return ce(e, t);
}
const ce = (e, t) => {
  const r = (
    e.options instanceof Map ? Array.from(e.options.values()) : e.options
  )
    .map((a, n) =>
      m(a._def, { ...t, currentPath: [...t.currentPath, 'anyOf', `${n}`] }),
    )
    .filter(
      a =>
        !!a &&
        (!t.strictUnions ||
          (typeof a == 'object' && Object.keys(a).length > 0)),
    );
  return r.length ? { anyOf: r } : void 0;
};
function nr(e, t) {
  if (
    ['ZodString', 'ZodNumber', 'ZodBigInt', 'ZodBoolean', 'ZodNull'].includes(
      e.innerType._def.typeName,
    ) &&
    (!e.innerType._def.checks || !e.innerType._def.checks.length)
  )
    return t.target === 'openApi3'
      ? { type: q[e.innerType._def.typeName], nullable: !0 }
      : { type: [q[e.innerType._def.typeName], 'null'] };
  if (t.target === 'openApi3') {
    const a = m(e.innerType._def, { ...t, currentPath: [...t.currentPath] });
    return a && '$ref' in a
      ? { allOf: [a], nullable: !0 }
      : a && { ...a, nullable: !0 };
  }
  const r = m(e.innerType._def, {
    ...t,
    currentPath: [...t.currentPath, 'anyOf', '0'],
  });
  return r && { anyOf: [r, { type: 'null' }] };
}
function sr(e, t) {
  const r = { type: 'number' };
  if (!e.checks) return r;
  for (const a of e.checks)
    switch (a.kind) {
      case 'int':
        (r.type = 'integer'), We(r, 'type', a.message, t);
        break;
      case 'min':
        t.target === 'jsonSchema7'
          ? a.inclusive
            ? g(r, 'minimum', a.value, a.message, t)
            : g(r, 'exclusiveMinimum', a.value, a.message, t)
          : (a.inclusive || (r.exclusiveMinimum = !0),
            g(r, 'minimum', a.value, a.message, t));
        break;
      case 'max':
        t.target === 'jsonSchema7'
          ? a.inclusive
            ? g(r, 'maximum', a.value, a.message, t)
            : g(r, 'exclusiveMaximum', a.value, a.message, t)
          : (a.inclusive || (r.exclusiveMaximum = !0),
            g(r, 'maximum', a.value, a.message, t));
        break;
      case 'multipleOf':
        g(r, 'multipleOf', a.value, a.message, t);
        break;
    }
  return r;
}
function or(e, t) {
  return t.removeAdditionalStrategy === 'strict'
    ? e.catchall._def.typeName === 'ZodNever'
      ? e.unknownKeys !== 'strict'
      : (m(e.catchall._def, {
          ...t,
          currentPath: [...t.currentPath, 'additionalProperties'],
        }) ?? !0)
    : e.catchall._def.typeName === 'ZodNever'
      ? e.unknownKeys === 'passthrough'
      : (m(e.catchall._def, {
          ...t,
          currentPath: [...t.currentPath, 'additionalProperties'],
        }) ?? !0);
}
function ir(e, t) {
  const r = t.target === 'openAi',
    a = {
      type: 'object',
      ...Object.entries(e.shape()).reduce(
        (n, [s, i]) => {
          if (i === void 0 || i._def === void 0) return n;
          let c = i.isOptional();
          c &&
            r &&
            (i instanceof at && (i = i._def.innerType),
            i.isNullable() || (i = i.nullable()),
            (c = !1));
          const o = m(i._def, {
            ...t,
            currentPath: [...t.currentPath, 'properties', s],
            propertyPath: [...t.currentPath, 'properties', s],
          });
          return o === void 0
            ? n
            : {
                properties: { ...n.properties, [s]: o },
                required: c ? n.required : [...n.required, s],
              };
        },
        { properties: {}, required: [] },
      ),
      additionalProperties: or(e, t),
    };
  return a.required.length || delete a.required, a;
}
const cr = (e, t) => {
    if (t.currentPath.toString() === t.propertyPath?.toString())
      return m(e.innerType._def, t);
    const r = m(e.innerType._def, {
      ...t,
      currentPath: [...t.currentPath, 'anyOf', '1'],
    });
    return r ? { anyOf: [{ not: {} }, r] } : {};
  },
  lr = (e, t) => {
    if (t.pipeStrategy === 'input') return m(e.in._def, t);
    if (t.pipeStrategy === 'output') return m(e.out._def, t);
    const r = m(e.in._def, {
        ...t,
        currentPath: [...t.currentPath, 'allOf', '0'],
      }),
      a = m(e.out._def, {
        ...t,
        currentPath: [...t.currentPath, 'allOf', r ? '1' : '0'],
      });
    return { allOf: [r, a].filter(n => n !== void 0) };
  };
function ur(e, t) {
  return m(e.type._def, t);
}
function pr(e, t) {
  const a = {
    type: 'array',
    uniqueItems: !0,
    items: m(e.valueType._def, {
      ...t,
      currentPath: [...t.currentPath, 'items'],
    }),
  };
  return (
    e.minSize && g(a, 'minItems', e.minSize.value, e.minSize.message, t),
    e.maxSize && g(a, 'maxItems', e.maxSize.value, e.maxSize.message, t),
    a
  );
}
function dr(e, t) {
  return e.rest
    ? {
        type: 'array',
        minItems: e.items.length,
        items: e.items
          .map((r, a) =>
            m(r._def, {
              ...t,
              currentPath: [...t.currentPath, 'items', `${a}`],
            }),
          )
          .reduce((r, a) => (a === void 0 ? r : [...r, a]), []),
        additionalItems: m(e.rest._def, {
          ...t,
          currentPath: [...t.currentPath, 'additionalItems'],
        }),
      }
    : {
        type: 'array',
        minItems: e.items.length,
        maxItems: e.items.length,
        items: e.items
          .map((r, a) =>
            m(r._def, {
              ...t,
              currentPath: [...t.currentPath, 'items', `${a}`],
            }),
          )
          .reduce((r, a) => (a === void 0 ? r : [...r, a]), []),
      };
}
function fr() {
  return { not: {} };
}
function mr() {
  return {};
}
const yr = (e, t) => m(e.innerType._def, t);
function m(e, t, r = !1) {
  const a = t.seen.get(e);
  if (t.override) {
    const i = t.override?.(e, t, a, r);
    if (i !== Mt) return i;
  }
  if (a && !r) {
    const i = gr(a, t);
    if (i !== void 0) return i;
  }
  const n = { def: e, path: t.currentPath, jsonSchema: void 0 };
  t.seen.set(e, n);
  const s = br(e, e.typeName, t);
  return s && _r(e, t, s), (n.jsonSchema = s), s;
}
const gr = (e, t) => {
    switch (t.$refStrategy) {
      case 'root':
        return { $ref: e.path.join('/') };
      case 'relative':
        return { $ref: hr(t.currentPath, e.path) };
      case 'none':
      case 'seen':
        return e.path.length < t.currentPath.length &&
          e.path.every((r, a) => t.currentPath[a] === r)
          ? (console.warn(
              `Recursive reference detected at ${t.currentPath.join('/')}! Defaulting to any`,
            ),
            {})
          : t.$refStrategy === 'seen'
            ? {}
            : void 0;
    }
  },
  hr = (e, t) => {
    let r = 0;
    for (; r < e.length && r < t.length && e[r] === t[r]; r++);
    return [(e.length - r).toString(), ...t.slice(r)].join('/');
  },
  br = (e, t, r) => {
    switch (t) {
      case f.ZodString:
        return Xe(e, r);
      case f.ZodNumber:
        return sr(e, r);
      case f.ZodObject:
        return ir(e, r);
      case f.ZodBigInt:
        return Bt(e, r);
      case f.ZodBoolean:
        return Jt();
      case f.ZodDate:
        return Qe(e, r);
      case f.ZodUndefined:
        return fr();
      case f.ZodNull:
        return rr(r);
      case f.ZodArray:
        return Zt(e, r);
      case f.ZodUnion:
      case f.ZodDiscriminatedUnion:
        return ar(e, r);
      case f.ZodIntersection:
        return Kt(e, r);
      case f.ZodTuple:
        return dr(e, r);
      case f.ZodRecord:
        return et(e, r);
      case f.ZodLiteral:
        return Wt(e, r);
      case f.ZodEnum:
        return qt(e);
      case f.ZodNativeEnum:
        return er(e);
      case f.ZodNullable:
        return nr(e, r);
      case f.ZodOptional:
        return cr(e, r);
      case f.ZodMap:
        return Xt(e, r);
      case f.ZodSet:
        return pr(e, r);
      case f.ZodLazy:
        return m(e.getter()._def, r);
      case f.ZodPromise:
        return ur(e, r);
      case f.ZodNaN:
      case f.ZodNever:
        return tr();
      case f.ZodEffects:
        return Yt(e, r);
      case f.ZodAny:
        return Lt();
      case f.ZodUnknown:
        return mr();
      case f.ZodDefault:
        return zt(e, r);
      case f.ZodBranded:
        return Ge(e, r);
      case f.ZodReadonly:
        return yr(e, r);
      case f.ZodCatch:
        return Ut(e, r);
      case f.ZodPipeline:
        return lr(e, r);
      case f.ZodFunction:
      case f.ZodVoid:
      case f.ZodSymbol:
        return;
      default:
        return (a => {})();
    }
  },
  _r = (e, t, r) => (
    e.description &&
      ((r.description = e.description),
      t.markdownDescription && (r.markdownDescription = e.description)),
    r
  ),
  vr = (e, t) => {
    const r = Ft(t),
      a =
        typeof t == 'object' && t.definitions
          ? Object.entries(t.definitions).reduce(
              (o, [l, p]) => ({
                ...o,
                [l]:
                  m(
                    p._def,
                    { ...r, currentPath: [...r.basePath, r.definitionPath, l] },
                    !0,
                  ) ?? {},
              }),
              {},
            )
          : void 0,
      n =
        typeof t == 'string'
          ? t
          : t?.nameStrategy === 'title'
            ? void 0
            : t?.name,
      s =
        m(
          e._def,
          n === void 0
            ? r
            : { ...r, currentPath: [...r.basePath, r.definitionPath, n] },
          !1,
        ) ?? {},
      i =
        typeof t == 'object' && t.name !== void 0 && t.nameStrategy === 'title'
          ? t.name
          : void 0;
    i !== void 0 && (s.title = i);
    const c =
      n === void 0
        ? a
          ? { ...s, [r.definitionPath]: a }
          : s
        : {
            $ref: [
              ...(r.$refStrategy === 'relative' ? [] : r.basePath),
              r.definitionPath,
              n,
            ].join('/'),
            [r.definitionPath]: { ...a, [n]: s },
          };
    return (
      r.target === 'jsonSchema7'
        ? (c.$schema = 'http://json-schema.org/draft-07/schema#')
        : (r.target === 'jsonSchema2019-09' || r.target === 'openAi') &&
          (c.$schema = 'https://json-schema.org/draft/2019-09/schema#'),
      r.target === 'openAi' &&
        ('anyOf' in c ||
          'oneOf' in c ||
          'allOf' in c ||
          ('type' in c && Array.isArray(c.type))) &&
        console.warn(
          'Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.',
        ),
      c
    );
  };
var j = {
    code: '0',
    name: 'text',
    parse: e => {
      if (typeof e != 'string')
        throw new Error('"text" parts expect a string value.');
      return { type: 'text', value: e };
    },
  },
  M = {
    code: '3',
    name: 'error',
    parse: e => {
      if (typeof e != 'string')
        throw new Error('"error" parts expect a string value.');
      return { type: 'error', value: e };
    },
  },
  $ = {
    code: '4',
    name: 'assistant_message',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('id' in e) ||
        !('role' in e) ||
        !('content' in e) ||
        typeof e.id != 'string' ||
        typeof e.role != 'string' ||
        e.role !== 'assistant' ||
        !Array.isArray(e.content) ||
        !e.content.every(
          t =>
            t != null &&
            typeof t == 'object' &&
            'type' in t &&
            t.type === 'text' &&
            'text' in t &&
            t.text != null &&
            typeof t.text == 'object' &&
            'value' in t.text &&
            typeof t.text.value == 'string',
        )
      )
        throw new Error(
          '"assistant_message" parts expect an object with an "id", "role", and "content" property.',
        );
      return { type: 'assistant_message', value: e };
    },
  },
  F = {
    code: '5',
    name: 'assistant_control_data',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('threadId' in e) ||
        !('messageId' in e) ||
        typeof e.threadId != 'string' ||
        typeof e.messageId != 'string'
      )
        throw new Error(
          '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.',
        );
      return {
        type: 'assistant_control_data',
        value: { threadId: e.threadId, messageId: e.messageId },
      };
    },
  },
  L = {
    code: '6',
    name: 'data_message',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('role' in e) ||
        !('data' in e) ||
        typeof e.role != 'string' ||
        e.role !== 'data'
      )
        throw new Error(
          '"data_message" parts expect an object with a "role" and "data" property.',
        );
      return { type: 'data_message', value: e };
    },
  },
  Ir = [j, M, $, F, L];
j.code + '', M.code + '', $.code + '', F.code + '', L.code + '';
j.name + '',
  j.code,
  M.name + '',
  M.code,
  $.name + '',
  $.code,
  F.name + '',
  F.code,
  L.name + '',
  L.code;
Ir.map(e => e.code);
function Er({ promptTokens: e, completionTokens: t }) {
  return { promptTokens: e, completionTokens: t, totalTokens: e + t };
}
function wr(e) {
  const t = ['ROOT'];
  let r = -1,
    a = null;
  function n(o, l, p) {
    switch (o) {
      case '"': {
        (r = l), t.pop(), t.push(p), t.push('INSIDE_STRING');
        break;
      }
      case 'f':
      case 't':
      case 'n': {
        (r = l), (a = l), t.pop(), t.push(p), t.push('INSIDE_LITERAL');
        break;
      }
      case '-': {
        t.pop(), t.push(p), t.push('INSIDE_NUMBER');
        break;
      }
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        (r = l), t.pop(), t.push(p), t.push('INSIDE_NUMBER');
        break;
      }
      case '{': {
        (r = l), t.pop(), t.push(p), t.push('INSIDE_OBJECT_START');
        break;
      }
      case '[': {
        (r = l), t.pop(), t.push(p), t.push('INSIDE_ARRAY_START');
        break;
      }
    }
  }
  function s(o, l) {
    switch (o) {
      case ',': {
        t.pop(), t.push('INSIDE_OBJECT_AFTER_COMMA');
        break;
      }
      case '}': {
        (r = l), t.pop();
        break;
      }
    }
  }
  function i(o, l) {
    switch (o) {
      case ',': {
        t.pop(), t.push('INSIDE_ARRAY_AFTER_COMMA');
        break;
      }
      case ']': {
        (r = l), t.pop();
        break;
      }
    }
  }
  for (let o = 0; o < e.length; o++) {
    const l = e[o];
    switch (t[t.length - 1]) {
      case 'ROOT':
        n(l, o, 'FINISH');
        break;
      case 'INSIDE_OBJECT_START': {
        switch (l) {
          case '"': {
            t.pop(), t.push('INSIDE_OBJECT_KEY');
            break;
          }
          case '}': {
            (r = o), t.pop();
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_AFTER_COMMA': {
        switch (l) {
          case '"': {
            t.pop(), t.push('INSIDE_OBJECT_KEY');
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_KEY': {
        switch (l) {
          case '"': {
            t.pop(), t.push('INSIDE_OBJECT_AFTER_KEY');
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_AFTER_KEY': {
        switch (l) {
          case ':': {
            t.pop(), t.push('INSIDE_OBJECT_BEFORE_VALUE');
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_BEFORE_VALUE': {
        n(l, o, 'INSIDE_OBJECT_AFTER_VALUE');
        break;
      }
      case 'INSIDE_OBJECT_AFTER_VALUE': {
        s(l, o);
        break;
      }
      case 'INSIDE_STRING': {
        switch (l) {
          case '"': {
            t.pop(), (r = o);
            break;
          }
          case '\\': {
            t.push('INSIDE_STRING_ESCAPE');
            break;
          }
          default:
            r = o;
        }
        break;
      }
      case 'INSIDE_ARRAY_START': {
        switch (l) {
          case ']': {
            (r = o), t.pop();
            break;
          }
          default: {
            (r = o), n(l, o, 'INSIDE_ARRAY_AFTER_VALUE');
            break;
          }
        }
        break;
      }
      case 'INSIDE_ARRAY_AFTER_VALUE': {
        switch (l) {
          case ',': {
            t.pop(), t.push('INSIDE_ARRAY_AFTER_COMMA');
            break;
          }
          case ']': {
            (r = o), t.pop();
            break;
          }
          default: {
            r = o;
            break;
          }
        }
        break;
      }
      case 'INSIDE_ARRAY_AFTER_COMMA': {
        n(l, o, 'INSIDE_ARRAY_AFTER_VALUE');
        break;
      }
      case 'INSIDE_STRING_ESCAPE': {
        t.pop(), (r = o);
        break;
      }
      case 'INSIDE_NUMBER': {
        switch (l) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9': {
            r = o;
            break;
          }
          case 'e':
          case 'E':
          case '-':
          case '.':
            break;
          case ',': {
            t.pop(),
              t[t.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(l, o),
              t[t.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE' && s(l, o);
            break;
          }
          case '}': {
            t.pop(), t[t.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE' && s(l, o);
            break;
          }
          case ']': {
            t.pop(), t[t.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(l, o);
            break;
          }
          default: {
            t.pop();
            break;
          }
        }
        break;
      }
      case 'INSIDE_LITERAL': {
        const d = e.substring(a, o + 1);
        !'false'.startsWith(d) && !'true'.startsWith(d) && !'null'.startsWith(d)
          ? (t.pop(),
            t[t.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE'
              ? s(l, o)
              : t[t.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(l, o))
          : (r = o);
        break;
      }
    }
  }
  let c = e.slice(0, r + 1);
  for (let o = t.length - 1; o >= 0; o--)
    switch (t[o]) {
      case 'INSIDE_STRING': {
        c += '"';
        break;
      }
      case 'INSIDE_OBJECT_KEY':
      case 'INSIDE_OBJECT_AFTER_KEY':
      case 'INSIDE_OBJECT_AFTER_COMMA':
      case 'INSIDE_OBJECT_START':
      case 'INSIDE_OBJECT_BEFORE_VALUE':
      case 'INSIDE_OBJECT_AFTER_VALUE': {
        c += '}';
        break;
      }
      case 'INSIDE_ARRAY_START':
      case 'INSIDE_ARRAY_AFTER_COMMA':
      case 'INSIDE_ARRAY_AFTER_VALUE': {
        c += ']';
        break;
      }
      case 'INSIDE_LITERAL': {
        const p = e.substring(a, e.length);
        'true'.startsWith(p)
          ? (c += 'true'.slice(p.length))
          : 'false'.startsWith(p)
            ? (c += 'false'.slice(p.length))
            : 'null'.startsWith(p) && (c += 'null'.slice(p.length));
      }
    }
  return c;
}
function kr(e) {
  if (e === void 0) return { value: void 0, state: 'undefined-input' };
  let t = Y({ text: e });
  return t.success
    ? { value: t.value, state: 'successful-parse' }
    : ((t = Y({ text: wr(e) })),
      t.success
        ? { value: t.value, state: 'repaired-parse' }
        : { value: void 0, state: 'failed-parse' });
}
var Ar = {
    code: '0',
    name: 'text',
    parse: e => {
      if (typeof e != 'string')
        throw new Error('"text" parts expect a string value.');
      return { type: 'text', value: e };
    },
  },
  Sr = {
    code: '2',
    name: 'data',
    parse: e => {
      if (!Array.isArray(e))
        throw new Error('"data" parts expect an array value.');
      return { type: 'data', value: e };
    },
  },
  Tr = {
    code: '3',
    name: 'error',
    parse: e => {
      if (typeof e != 'string')
        throw new Error('"error" parts expect a string value.');
      return { type: 'error', value: e };
    },
  },
  Pr = {
    code: '8',
    name: 'message_annotations',
    parse: e => {
      if (!Array.isArray(e))
        throw new Error('"message_annotations" parts expect an array value.');
      return { type: 'message_annotations', value: e };
    },
  },
  xr = {
    code: '9',
    name: 'tool_call',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('toolName' in e) ||
        typeof e.toolName != 'string' ||
        !('args' in e) ||
        typeof e.args != 'object'
      )
        throw new Error(
          '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.',
        );
      return { type: 'tool_call', value: e };
    },
  },
  Nr = {
    code: 'a',
    name: 'tool_result',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('result' in e)
      )
        throw new Error(
          '"tool_result" parts expect an object with a "toolCallId" and a "result" property.',
        );
      return { type: 'tool_result', value: e };
    },
  },
  Or = {
    code: 'b',
    name: 'tool_call_streaming_start',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('toolName' in e) ||
        typeof e.toolName != 'string'
      )
        throw new Error(
          '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.',
        );
      return { type: 'tool_call_streaming_start', value: e };
    },
  },
  Rr = {
    code: 'c',
    name: 'tool_call_delta',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('argsTextDelta' in e) ||
        typeof e.argsTextDelta != 'string'
      )
        throw new Error(
          '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.',
        );
      return { type: 'tool_call_delta', value: e };
    },
  },
  Cr = {
    code: 'd',
    name: 'finish_message',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('finishReason' in e) ||
        typeof e.finishReason != 'string'
      )
        throw new Error(
          '"finish_message" parts expect an object with a "finishReason" property.',
        );
      const t = { finishReason: e.finishReason };
      return (
        'usage' in e &&
          e.usage != null &&
          typeof e.usage == 'object' &&
          'promptTokens' in e.usage &&
          'completionTokens' in e.usage &&
          (t.usage = {
            promptTokens:
              typeof e.usage.promptTokens == 'number'
                ? e.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof e.usage.completionTokens == 'number'
                ? e.usage.completionTokens
                : Number.NaN,
          }),
        { type: 'finish_message', value: t }
      );
    },
  },
  Dr = {
    code: 'e',
    name: 'finish_step',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('finishReason' in e) ||
        typeof e.finishReason != 'string'
      )
        throw new Error(
          '"finish_step" parts expect an object with a "finishReason" property.',
        );
      const t = { finishReason: e.finishReason, isContinued: !1 };
      return (
        'usage' in e &&
          e.usage != null &&
          typeof e.usage == 'object' &&
          'promptTokens' in e.usage &&
          'completionTokens' in e.usage &&
          (t.usage = {
            promptTokens:
              typeof e.usage.promptTokens == 'number'
                ? e.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof e.usage.completionTokens == 'number'
                ? e.usage.completionTokens
                : Number.NaN,
          }),
        'isContinued' in e &&
          typeof e.isContinued == 'boolean' &&
          (t.isContinued = e.isContinued),
        { type: 'finish_step', value: t }
      );
    },
  },
  jr = {
    code: 'f',
    name: 'start_step',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('messageId' in e) ||
        typeof e.messageId != 'string'
      )
        throw new Error(
          '"start_step" parts expect an object with an "id" property.',
        );
      return { type: 'start_step', value: { messageId: e.messageId } };
    },
  },
  Mr = {
    code: 'g',
    name: 'reasoning',
    parse: e => {
      if (typeof e != 'string')
        throw new Error('"reasoning" parts expect a string value.');
      return { type: 'reasoning', value: e };
    },
  },
  $r = {
    code: 'h',
    name: 'source',
    parse: e => {
      if (e == null || typeof e != 'object')
        throw new Error('"source" parts expect a Source object.');
      return { type: 'source', value: e };
    },
  },
  Fr = {
    code: 'i',
    name: 'redacted_reasoning',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('data' in e) ||
        typeof e.data != 'string'
      )
        throw new Error(
          '"redacted_reasoning" parts expect an object with a "data" property.',
        );
      return { type: 'redacted_reasoning', value: { data: e.data } };
    },
  },
  Lr = {
    code: 'j',
    name: 'reasoning_signature',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('signature' in e) ||
        typeof e.signature != 'string'
      )
        throw new Error(
          '"reasoning_signature" parts expect an object with a "signature" property.',
        );
      return { type: 'reasoning_signature', value: { signature: e.signature } };
    },
  },
  Zr = {
    code: 'k',
    name: 'file',
    parse: e => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('data' in e) ||
        typeof e.data != 'string' ||
        !('mimeType' in e) ||
        typeof e.mimeType != 'string'
      )
        throw new Error(
          '"file" parts expect an object with a "data" and "mimeType" property.',
        );
      return { type: 'file', value: e };
    },
  },
  H = [Ar, Sr, Tr, Pr, xr, Nr, Or, Rr, Cr, Dr, jr, Mr, $r, Fr, Lr, Zr],
  Br = Object.fromEntries(H.map(e => [e.code, e]));
Object.fromEntries(H.map(e => [e.name, e.code]));
var Jr = H.map(e => e.code),
  Ur = e => {
    const t = e.indexOf(':');
    if (t === -1)
      throw new Error('Failed to parse stream string. No separator found.');
    const r = e.slice(0, t);
    if (!Jr.includes(r))
      throw new Error(`Failed to parse stream string. Invalid code ${r}.`);
    const a = r,
      n = e.slice(t + 1),
      s = JSON.parse(n);
    return Br[a].parse(s);
  };
function ka(e, t) {
  const r = H.find(a => a.name === e);
  if (!r) throw new Error(`Invalid stream part type: ${e}`);
  return `${r.code}:${JSON.stringify(t)}
`;
}
var Vr = 10;
function zr(e, t) {
  const r = new Uint8Array(t);
  let a = 0;
  for (const n of e) r.set(n, a), (a += n.length);
  return (e.length = 0), r;
}
async function tt({
  stream: e,
  onTextPart: t,
  onReasoningPart: r,
  onReasoningSignaturePart: a,
  onRedactedReasoningPart: n,
  onSourcePart: s,
  onFilePart: i,
  onDataPart: c,
  onErrorPart: o,
  onToolCallStreamingStartPart: l,
  onToolCallDeltaPart: p,
  onToolCallPart: d,
  onToolResultPart: _,
  onMessageAnnotationsPart: v,
  onFinishMessagePart: A,
  onFinishStepPart: x,
  onStartStepPart: S,
}) {
  const k = e.getReader(),
    N = new TextDecoder(),
    b = [];
  let T = 0;
  for (;;) {
    const { value: I } = await k.read();
    if (I && (b.push(I), (T += I.length), I[I.length - 1] !== Vr)) continue;
    if (b.length === 0) break;
    const u = zr(b, T);
    T = 0;
    const y = N.decode(u, { stream: !0 })
      .split(
        `
`,
      )
      .filter(w => w !== '')
      .map(Ur);
    for (const { type: w, value: h } of y)
      switch (w) {
        case 'text':
          await t?.(h);
          break;
        case 'reasoning':
          await r?.(h);
          break;
        case 'reasoning_signature':
          await a?.(h);
          break;
        case 'redacted_reasoning':
          await n?.(h);
          break;
        case 'file':
          await i?.(h);
          break;
        case 'source':
          await s?.(h);
          break;
        case 'data':
          await c?.(h);
          break;
        case 'error':
          await o?.(h);
          break;
        case 'message_annotations':
          await v?.(h);
          break;
        case 'tool_call_streaming_start':
          await l?.(h);
          break;
        case 'tool_call_delta':
          await p?.(h);
          break;
        case 'tool_call':
          await d?.(h);
          break;
        case 'tool_result':
          await _?.(h);
          break;
        case 'finish_message':
          await A?.(h);
          break;
        case 'finish_step':
          await x?.(h);
          break;
        case 'start_step':
          await S?.(h);
          break;
        default: {
          const K = w;
          throw new Error(`Unknown stream part type: ${K}`);
        }
      }
  }
}
async function Yr({
  stream: e,
  update: t,
  onToolCall: r,
  onFinish: a,
  generateId: n = He,
  getCurrentDate: s = () => new Date(),
  lastMessage: i,
}) {
  var c, o;
  const l = i?.role === 'assistant';
  let p = l
    ? 1 +
      ((o =
        (c = i.toolInvocations) == null
          ? void 0
          : c.reduce((u, y) => {
              var w;
              return Math.max(u, (w = y.step) != null ? w : 0);
            }, 0)) != null
        ? o
        : 0)
    : 0;
  const d = l
    ? structuredClone(i)
    : { id: n(), createdAt: s(), role: 'assistant', content: '', parts: [] };
  let _, v, A;
  function x(u, y) {
    const w = d.parts.find(
      h => h.type === 'tool-invocation' && h.toolInvocation.toolCallId === u,
    );
    w != null
      ? (w.toolInvocation = y)
      : d.parts.push({ type: 'tool-invocation', toolInvocation: y });
  }
  const S = [];
  let k = l ? i?.annotations : void 0;
  const N = {};
  let b = { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
    T = 'unknown';
  function I() {
    const u = [...S];
    k?.length && (d.annotations = k);
    const y = { ...structuredClone(d), revisionId: n() };
    t({ message: y, data: u, replaceLastMessage: l });
  }
  await tt({
    stream: e,
    onTextPart(u) {
      _ == null
        ? ((_ = { type: 'text', text: u }), d.parts.push(_))
        : (_.text += u),
        (d.content += u),
        I();
    },
    onReasoningPart(u) {
      var y;
      A == null
        ? ((A = { type: 'text', text: u }), v?.details.push(A))
        : (A.text += u),
        v == null
          ? ((v = { type: 'reasoning', reasoning: u, details: [A] }),
            d.parts.push(v))
          : (v.reasoning += u),
        (d.reasoning = ((y = d.reasoning) != null ? y : '') + u),
        I();
    },
    onReasoningSignaturePart(u) {
      A != null && (A.signature = u.signature);
    },
    onRedactedReasoningPart(u) {
      v == null &&
        ((v = { type: 'reasoning', reasoning: '', details: [] }),
        d.parts.push(v)),
        v.details.push({ type: 'redacted', data: u.data }),
        (A = void 0),
        I();
    },
    onFilePart(u) {
      d.parts.push({ type: 'file', mimeType: u.mimeType, data: u.data }), I();
    },
    onSourcePart(u) {
      d.parts.push({ type: 'source', source: u }), I();
    },
    onToolCallStreamingStartPart(u) {
      d.toolInvocations == null && (d.toolInvocations = []),
        (N[u.toolCallId] = {
          text: '',
          step: p,
          toolName: u.toolName,
          index: d.toolInvocations.length,
        });
      const y = {
        state: 'partial-call',
        step: p,
        toolCallId: u.toolCallId,
        toolName: u.toolName,
        args: void 0,
      };
      d.toolInvocations.push(y), x(u.toolCallId, y), I();
    },
    onToolCallDeltaPart(u) {
      const y = N[u.toolCallId];
      y.text += u.argsTextDelta;
      const { value: w } = kr(y.text),
        h = {
          state: 'partial-call',
          step: y.step,
          toolCallId: u.toolCallId,
          toolName: y.toolName,
          args: w,
        };
      (d.toolInvocations[y.index] = h), x(u.toolCallId, h), I();
    },
    async onToolCallPart(u) {
      const y = { state: 'call', step: p, ...u };
      if (
        (N[u.toolCallId] != null
          ? (d.toolInvocations[N[u.toolCallId].index] = y)
          : (d.toolInvocations == null && (d.toolInvocations = []),
            d.toolInvocations.push(y)),
        x(u.toolCallId, y),
        I(),
        r)
      ) {
        const w = await r({ toolCall: u });
        if (w != null) {
          const h = { state: 'result', step: p, ...u, result: w };
          (d.toolInvocations[d.toolInvocations.length - 1] = h),
            x(u.toolCallId, h),
            I();
        }
      }
    },
    onToolResultPart(u) {
      const y = d.toolInvocations;
      if (y == null)
        throw new Error('tool_result must be preceded by a tool_call');
      const w = y.findIndex(K => K.toolCallId === u.toolCallId);
      if (w === -1)
        throw new Error(
          'tool_result must be preceded by a tool_call with the same toolCallId',
        );
      const h = { ...y[w], state: 'result', ...u };
      (y[w] = h), x(u.toolCallId, h), I();
    },
    onDataPart(u) {
      S.push(...u), I();
    },
    onMessageAnnotationsPart(u) {
      k == null ? (k = [...u]) : k.push(...u), I();
    },
    onFinishStepPart(u) {
      (p += 1), (_ = u.isContinued ? _ : void 0), (v = void 0), (A = void 0);
    },
    onStartStepPart(u) {
      l || (d.id = u.messageId), d.parts.push({ type: 'step-start' }), I();
    },
    onFinishMessagePart(u) {
      (T = u.finishReason), u.usage != null && (b = Er(u.usage));
    },
    onErrorPart(u) {
      throw new Error(u);
    },
  }),
    a?.({ message: d, finishReason: T, usage: b });
}
async function rt({ stream: e, onTextPart: t }) {
  const r = e.pipeThrough(new TextDecoderStream()).getReader();
  for (;;) {
    const { done: a, value: n } = await r.read();
    if (a) break;
    await t(n);
  }
}
async function qr({
  stream: e,
  update: t,
  onFinish: r,
  getCurrentDate: a = () => new Date(),
  generateId: n = He,
}) {
  const s = { type: 'text', text: '' },
    i = { id: n(), createdAt: a(), role: 'assistant', content: '', parts: [s] };
  await rt({
    stream: e,
    onTextPart: c => {
      (i.content += c),
        (s.text += c),
        t({ message: { ...i }, data: [], replaceLastMessage: !1 });
    },
  }),
    r?.(i, {
      usage: { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
      finishReason: 'unknown',
    });
}
var Hr = () => fetch;
async function Aa({
  api: e,
  body: t,
  streamProtocol: r = 'data',
  credentials: a,
  headers: n,
  abortController: s,
  restoreMessagesOnFailure: i,
  onResponse: c,
  onUpdate: o,
  onFinish: l,
  onToolCall: p,
  generateId: d,
  fetch: _ = Hr(),
  lastMessage: v,
  requestType: A = 'generate',
}) {
  var x, S, k;
  const b = await (
    A === 'resume'
      ? _(`${e}?chatId=${t.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', ...n },
          signal: (x = s?.()) == null ? void 0 : x.signal,
          credentials: a,
        })
      : _(e, {
          method: 'POST',
          body: JSON.stringify(t),
          headers: { 'Content-Type': 'application/json', ...n },
          signal: (S = s?.()) == null ? void 0 : S.signal,
          credentials: a,
        })
  ).catch(T => {
    throw (i(), T);
  });
  if (c)
    try {
      await c(b);
    } catch (T) {
      throw T;
    }
  if (!b.ok)
    throw (
      (i(),
      new Error(
        (k = await b.text()) != null ? k : 'Failed to fetch the chat response.',
      ))
    );
  if (!b.body) throw new Error('The response body is empty.');
  switch (r) {
    case 'text': {
      await qr({ stream: b.body, update: o, onFinish: l, generateId: d });
      return;
    }
    case 'data': {
      await Yr({
        stream: b.body,
        update: o,
        lastMessage: v,
        onToolCall: p,
        onFinish({ message: T, finishReason: I, usage: u }) {
          l && T != null && l(T, { usage: u, finishReason: I });
        },
        generateId: d,
      });
      return;
    }
    default: {
      const T = r;
      throw new Error(`Unknown stream protocol: ${T}`);
    }
  }
}
var Kr = () => fetch;
async function Sa({
  api: e,
  prompt: t,
  credentials: r,
  headers: a,
  body: n,
  streamProtocol: s = 'data',
  setCompletion: i,
  setLoading: c,
  setError: o,
  setAbortController: l,
  onResponse: p,
  onFinish: d,
  onError: _,
  onData: v,
  fetch: A = Kr(),
}) {
  var x;
  try {
    c(!0), o(void 0);
    const S = new AbortController();
    l(S), i('');
    const k = await A(e, {
      method: 'POST',
      body: JSON.stringify({ prompt: t, ...n }),
      credentials: r,
      headers: { 'Content-Type': 'application/json', ...a },
      signal: S.signal,
    }).catch(b => {
      throw b;
    });
    if (p)
      try {
        await p(k);
      } catch (b) {
        throw b;
      }
    if (!k.ok)
      throw new Error(
        (x = await k.text()) != null ? x : 'Failed to fetch the chat response.',
      );
    if (!k.body) throw new Error('The response body is empty.');
    let N = '';
    switch (s) {
      case 'text': {
        await rt({
          stream: k.body,
          onTextPart: b => {
            (N += b), i(N);
          },
        });
        break;
      }
      case 'data': {
        await tt({
          stream: k.body,
          onTextPart(b) {
            (N += b), i(N);
          },
          onDataPart(b) {
            v?.(b);
          },
          onErrorPart(b) {
            throw new Error(b);
          },
        });
        break;
      }
      default: {
        const b = s;
        throw new Error(`Unknown stream protocol: ${b}`);
      }
    }
    return d && d(t, N), l(null), N;
  } catch (S) {
    if (S.name === 'AbortError') return l(null), null;
    S instanceof Error && _ && _(S), o(S);
  } finally {
    c(!1);
  }
}
function Ta(e) {
  const [t, r] = e.split(',');
  if (t.split(';')[0].split(':')[1] == null || r == null)
    throw new Error('Invalid data URL format');
  try {
    return window.atob(r);
  } catch {
    throw new Error('Error decoding data URL');
  }
}
function le(e) {
  return e?.reduce((t, r) => {
    var a;
    return Math.max(t, (a = r.step) != null ? a : 0);
  }, 0);
}
function Wr(e) {
  var t;
  return (t = e.parts) != null
    ? t
    : [
        ...(e.toolInvocations
          ? e.toolInvocations.map(r => ({
              type: 'tool-invocation',
              toolInvocation: r,
            }))
          : []),
        ...(e.reasoning
          ? [
              {
                type: 'reasoning',
                reasoning: e.reasoning,
                details: [{ type: 'text', text: e.reasoning }],
              },
            ]
          : []),
        ...(e.content ? [{ type: 'text', text: e.content }] : []),
      ];
}
function Pa(e) {
  return e.map(t => ({ ...t, parts: Wr(t) }));
}
function ue(e, t) {
  if (e === t) return !0;
  if (e == null || t == null) return !1;
  if (typeof e != 'object' && typeof t != 'object') return e === t;
  if (e.constructor !== t.constructor) return !1;
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  if (Array.isArray(e)) {
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; n++) if (!ue(e[n], t[n])) return !1;
    return !0;
  }
  const r = Object.keys(e),
    a = Object.keys(t);
  if (r.length !== a.length) return !1;
  for (const n of r) if (!a.includes(n) || !ue(e[n], t[n])) return !1;
  return !0;
}
async function xa(e) {
  if (!e) return [];
  if (e instanceof FileList)
    return Promise.all(
      Array.from(e).map(async t => {
        const { name: r, type: a } = t,
          n = await new Promise((s, i) => {
            const c = new FileReader();
            (c.onload = o => {
              var l;
              s((l = o.target) == null ? void 0 : l.result);
            }),
              (c.onerror = o => i(o)),
              c.readAsDataURL(t);
          });
        return { name: r, contentType: a, url: n };
      }),
    );
  if (Array.isArray(e)) return e;
  throw new Error('Invalid attachments type');
}
function Gr(e, t) {
  var r;
  const a = (r = void 0) != null ? r : !1;
  return Qr(
    vr(e, { $refStrategy: a ? 'root' : 'none', target: 'jsonSchema7' }),
    {
      validate: n => {
        const s = e.safeParse(n);
        return s.success
          ? { success: !0, value: s.data }
          : { success: !1, error: s.error };
      },
    },
  );
}
var ee = Symbol.for('vercel.ai.schema');
function Qr(e, { validate: t } = {}) {
  return { [ee]: !0, _type: void 0, [z]: !0, jsonSchema: e, validate: t };
}
function Xr(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    ee in e &&
    e[ee] === !0 &&
    'jsonSchema' in e &&
    'validate' in e
  );
}
function Na(e) {
  return Xr(e) ? e : Gr(e);
}
function Oa({
  originalMaxToolInvocationStep: e,
  originalMessageCount: t,
  maxSteps: r,
  messages: a,
}) {
  var n;
  const s = a[a.length - 1];
  return (
    r > 1 &&
    s != null &&
    (a.length > t || le(s.toolInvocations) !== e) &&
    ea(s) &&
    ((n = le(s.toolInvocations)) != null ? n : 0) < r
  );
}
function ea(e) {
  if (e.role !== 'assistant') return !1;
  const t = e.parts.reduce((a, n, s) => (n.type === 'step-start' ? s : a), -1),
    r = e.parts.slice(t + 1).filter(a => a.type === 'tool-invocation');
  return r.length > 0 && r.every(a => 'result' in a.toolInvocation);
}
function Ra({ messages: e, toolCallId: t, toolResult: r }) {
  var a;
  const n = e[e.length - 1],
    s = n.parts.find(
      c => c.type === 'tool-invocation' && c.toolInvocation.toolCallId === t,
    );
  if (s == null) return;
  const i = { ...s.toolInvocation, state: 'result', result: r };
  (s.toolInvocation = i),
    (n.toolInvocations =
      (a = n.toolInvocations) == null
        ? void 0
        : a.map(c => (c.toolCallId === t ? i : c)));
}
export {
  ha as A,
  ma as B,
  Ia as C,
  ga as D,
  va as E,
  E as F,
  ka as G,
  ia as H,
  aa as I,
  U as J,
  oa as K,
  pa as L,
  C as M,
  ua as N,
  ve as O,
  Y as P,
  la as Q,
  na as T,
  sa as U,
  He as a,
  Wr as b,
  At as c,
  Sa as d,
  Na as e,
  Pa as f,
  Ta as g,
  kr as h,
  ea as i,
  ue as j,
  W as k,
  le as l,
  Aa as m,
  Oa as n,
  da as o,
  xa as p,
  ya as q,
  ca as r,
  ae as s,
  fa as t,
  Ra as u,
  ra as v,
  wa as w,
  _a as x,
  ba as y,
  Ea as z,
};
