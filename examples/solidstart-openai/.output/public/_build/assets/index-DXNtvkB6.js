import {
  q as y,
  D as _,
  y as v,
  j as O,
  c as se,
  z as I,
  F as E,
  d as J,
  t as w,
  p as ie,
  G as le,
  S as U,
  H as z,
} from './web-BFUmgCsR.js';
import {
  z as e,
  c as h,
  b as ue,
  s as pe,
  d as ce,
  p as de,
  A as k,
  f as L,
  e as me,
  u as he,
} from './index-DK6TMCeg.js';
var ge = Object.defineProperty,
  P = (t, a) => {
    for (var n in a) ge(t, n, { get: a[n], enumerable: !0 });
  };
function V(t, { contentType: a, dataStreamVersion: n }) {
  const r = new Headers(t ?? {});
  return (
    r.has('Content-Type') || r.set('Content-Type', a),
    r.set('X-Vercel-AI-Data-Stream', n),
    r
  );
}
var G = 'AI_NoObjectGeneratedError',
  X = `vercel.ai.error.${G}`,
  fe = Symbol.for(X),
  Y,
  B = class extends k {
    constructor({
      message: t = 'No object generated.',
      cause: a,
      text: n,
      response: r,
      usage: o,
      finishReason: s,
    }) {
      super({ name: G, message: t, cause: a }),
        (this[Y] = !0),
        (this.text = n),
        (this.response = r),
        (this.usage = o),
        (this.finishReason = s);
    }
    static isInstance(t) {
      return k.hasMarker(t, X);
    }
  };
Y = fe;
var K = e.union([
    e.string(),
    e.instanceof(Uint8Array),
    e.instanceof(ArrayBuffer),
    e.custom(
      t => {
        var a, n;
        return (n = (a = globalThis.Buffer) == null ? void 0 : a.isBuffer(t)) !=
          null
          ? n
          : !1;
      },
      { message: 'Must be a Buffer' },
    ),
  ]),
  M = e.lazy(() =>
    e.union([
      e.null(),
      e.string(),
      e.number(),
      e.boolean(),
      e.record(e.string(), M),
      e.array(M),
    ]),
  ),
  i = e.record(e.string(), e.record(e.string(), M)),
  Se = e.array(
    e.union([
      e.object({ type: e.literal('text'), text: e.string() }),
      e.object({
        type: e.literal('image'),
        data: e.string(),
        mimeType: e.string().optional(),
      }),
    ]),
  ),
  Q = e.object({
    type: e.literal('text'),
    text: e.string(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  ve = e.object({
    type: e.literal('image'),
    image: e.union([K, e.instanceof(URL)]),
    mimeType: e.string().optional(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  W = e.object({
    type: e.literal('file'),
    data: e.union([K, e.instanceof(URL)]),
    filename: e.string().optional(),
    mimeType: e.string(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  be = e.object({
    type: e.literal('reasoning'),
    text: e.string(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  xe = e.object({
    type: e.literal('redacted-reasoning'),
    data: e.string(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  ye = e.object({
    type: e.literal('tool-call'),
    toolCallId: e.string(),
    toolName: e.string(),
    args: e.unknown(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  _e = e.object({
    type: e.literal('tool-result'),
    toolCallId: e.string(),
    toolName: e.string(),
    result: e.unknown(),
    content: Se.optional(),
    isError: e.boolean().optional(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  je = e.object({
    role: e.literal('system'),
    content: e.string(),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  we = e.object({
    role: e.literal('user'),
    content: e.union([e.string(), e.array(e.union([Q, ve, W]))]),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  Te = e.object({
    role: e.literal('assistant'),
    content: e.union([e.string(), e.array(e.union([Q, W, be, xe, ye]))]),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  }),
  Re = e.object({
    role: e.literal('tool'),
    content: e.array(_e),
    providerOptions: i.optional(),
    experimental_providerMetadata: i.optional(),
  });
e.union([je, we, Te, Re]);
var Ce = 'JSON schema:',
  $e = 'You MUST answer with a JSON object that matches the JSON schema above.',
  Oe = 'You MUST answer with JSON.';
function Ie({
  prompt: t,
  schema: a,
  schemaPrefix: n = a != null ? Ce : void 0,
  schemaSuffix: r = a != null ? $e : Oe,
}) {
  return [
    t != null && t.length > 0 ? t : void 0,
    t != null && t.length > 0 ? '' : void 0,
    n,
    a != null ? JSON.stringify(a) : void 0,
    r,
  ].filter(o => o != null).join(`
`);
}
h({ prefix: 'aiobj', size: 24 });
h({ prefix: 'aiobj', size: 24 });
h({ prefix: 'aitxt', size: 24 });
h({ prefix: 'msg', size: 24 });
var Ee = {};
P(Ee, { object: () => Pe, text: () => Me });
var Me = () => ({
    type: 'text',
    responseFormat: () => ({ type: 'text' }),
    injectIntoSystemPrompt({ system: t }) {
      return t;
    },
    parsePartial({ text: t }) {
      return { partial: t };
    },
    parseOutput({ text: t }) {
      return t;
    },
  }),
  Pe = ({ schema: t }) => {
    const a = ue(t);
    return {
      type: 'object',
      responseFormat: ({ model: n }) => ({
        type: 'json',
        schema: n.supportsStructuredOutputs ? a.jsonSchema : void 0,
      }),
      injectIntoSystemPrompt({ system: n, model: r }) {
        return r.supportsStructuredOutputs
          ? n
          : Ie({ prompt: n, schema: a.jsonSchema });
      },
      parsePartial({ text: n }) {
        const r = de(n);
        switch (r.state) {
          case 'failed-parse':
          case 'undefined-input':
            return;
          case 'repaired-parse':
          case 'successful-parse':
            return { partial: r.value };
          default: {
            const o = r.state;
            throw new Error(`Unsupported parse state: ${o}`);
          }
        }
      },
      parseOutput({ text: n }, r) {
        const o = pe({ text: n });
        if (!o.success)
          throw new B({
            message: 'No object generated: could not parse the response.',
            cause: o.error,
            text: n,
            response: r.response,
            usage: r.usage,
            finishReason: r.finishReason,
          });
        const s = ce({ value: o.value, schema: a });
        if (!s.success)
          throw new B({
            message: 'No object generated: response did not match schema.',
            cause: s.error,
            text: n,
            response: r.response,
            usage: r.usage,
            finishReason: r.finishReason,
          });
        return s.value;
      },
    };
  };
function Z(t, a) {
  const n = t.getReader(),
    r = a.getReader();
  let o,
    s,
    c = !1,
    g = !1;
  async function p(u) {
    try {
      o == null && (o = n.read());
      const l = await o;
      (o = void 0), l.done ? u.close() : u.enqueue(l.value);
    } catch (l) {
      u.error(l);
    }
  }
  async function b(u) {
    try {
      s == null && (s = r.read());
      const l = await s;
      (s = void 0), l.done ? u.close() : u.enqueue(l.value);
    } catch (l) {
      u.error(l);
    }
  }
  return new ReadableStream({
    async pull(u) {
      try {
        if (c) {
          await b(u);
          return;
        }
        if (g) {
          await p(u);
          return;
        }
        o == null && (o = n.read()), s == null && (s = r.read());
        const { result: l, reader: R } = await Promise.race([
          o.then(x => ({ result: x, reader: n })),
          s.then(x => ({ result: x, reader: r })),
        ]);
        l.done || u.enqueue(l.value),
          R === n
            ? ((o = void 0), l.done && (await b(u), (c = !0)))
            : ((s = void 0), l.done && ((g = !0), await p(u)));
      } catch (l) {
        u.error(l);
      }
    },
    cancel() {
      n.cancel(), r.cancel();
    },
  });
}
h({ prefix: 'aitxt', size: 24 });
h({ prefix: 'msg', size: 24 });
var De = e.object({ name: e.string(), version: e.string() }).passthrough(),
  D = e.object({ _meta: e.optional(e.object({}).passthrough()) }).passthrough(),
  j = D,
  Ne = e.object({ method: e.string(), params: e.optional(D) }),
  Ae = e
    .object({
      experimental: e.optional(e.object({}).passthrough()),
      logging: e.optional(e.object({}).passthrough()),
      prompts: e.optional(
        e.object({ listChanged: e.optional(e.boolean()) }).passthrough(),
      ),
      resources: e.optional(
        e
          .object({
            subscribe: e.optional(e.boolean()),
            listChanged: e.optional(e.boolean()),
          })
          .passthrough(),
      ),
      tools: e.optional(
        e.object({ listChanged: e.optional(e.boolean()) }).passthrough(),
      ),
    })
    .passthrough();
j.extend({
  protocolVersion: e.string(),
  capabilities: Ae,
  serverInfo: De,
  instructions: e.optional(e.string()),
});
var qe = j.extend({ nextCursor: e.optional(e.string()) }),
  Fe = e
    .object({
      name: e.string(),
      description: e.optional(e.string()),
      inputSchema: e
        .object({
          type: e.literal('object'),
          properties: e.optional(e.object({}).passthrough()),
        })
        .passthrough(),
    })
    .passthrough();
qe.extend({ tools: e.array(Fe) });
var Je = e.object({ type: e.literal('text'), text: e.string() }).passthrough(),
  Ue = e
    .object({
      type: e.literal('image'),
      data: e.string().base64(),
      mimeType: e.string(),
    })
    .passthrough(),
  ee = e
    .object({ uri: e.string(), mimeType: e.optional(e.string()) })
    .passthrough(),
  ze = ee.extend({ text: e.string() }),
  ke = ee.extend({ blob: e.string().base64() }),
  Be = e
    .object({ type: e.literal('resource'), resource: e.union([ze, ke]) })
    .passthrough();
j.extend({
  content: e.array(e.union([Je, Ue, Be])),
  isError: e.boolean().default(!1).optional(),
}).or(j.extend({ toolResult: e.unknown() }));
var T = '2.0',
  He = e
    .object({
      jsonrpc: e.literal(T),
      id: e.union([e.string(), e.number().int()]),
    })
    .merge(Ne)
    .strict(),
  Le = e
    .object({
      jsonrpc: e.literal(T),
      id: e.union([e.string(), e.number().int()]),
      result: j,
    })
    .strict(),
  Ve = e
    .object({
      jsonrpc: e.literal(T),
      id: e.union([e.string(), e.number().int()]),
      error: e.object({
        code: e.number().int(),
        message: e.string(),
        data: e.optional(e.unknown()),
      }),
    })
    .strict(),
  Ge = e
    .object({ jsonrpc: e.literal(T) })
    .merge(e.object({ method: e.string(), params: e.optional(D) }))
    .strict();
e.union([He, Ge, Le, Ve]);
var Xe = {};
P(Xe, {
  mergeIntoDataStream: () => Qe,
  toDataStream: () => Ye,
  toDataStreamResponse: () => Ke,
});
function te(t = {}) {
  const a = new TextEncoder();
  let n = '';
  return new TransformStream({
    async start() {
      t.onStart && (await t.onStart());
    },
    async transform(r, o) {
      o.enqueue(a.encode(r)),
        (n += r),
        t.onToken && (await t.onToken(r)),
        t.onText && typeof r == 'string' && (await t.onText(r));
    },
    async flush() {
      t.onCompletion && (await t.onCompletion(n)),
        t.onFinal && (await t.onFinal(n));
    },
  });
}
function N(t, a) {
  return t
    .pipeThrough(
      new TransformStream({
        transform: async (n, r) => {
          var o;
          if (typeof n == 'string') {
            r.enqueue(n);
            return;
          }
          if ('event' in n) {
            n.event === 'on_chat_model_stream' &&
              H((o = n.data) == null ? void 0 : o.chunk, r);
            return;
          }
          H(n, r);
        },
      }),
    )
    .pipeThrough(te(a))
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(
      new TransformStream({
        transform: async (n, r) => {
          r.enqueue(L('text', n));
        },
      }),
    );
}
function Ye(t, a) {
  return N(t, a).pipeThrough(new TextEncoderStream());
}
function Ke(t, a) {
  var n;
  const r = N(t, a?.callbacks).pipeThrough(new TextEncoderStream()),
    o = a?.data,
    s = a?.init,
    c = o ? Z(o.stream, r) : r;
  return new Response(c, {
    status: (n = s?.status) != null ? n : 200,
    statusText: s?.statusText,
    headers: V(s?.headers, {
      contentType: 'text/plain; charset=utf-8',
      dataStreamVersion: 'v1',
    }),
  });
}
function Qe(t, a) {
  a.dataStream.merge(N(t, a.callbacks));
}
function H(t, a) {
  if (typeof t.content == 'string') a.enqueue(t.content);
  else {
    const n = t.content;
    for (const r of n) r.type === 'text' && a.enqueue(r.text);
  }
}
var We = {};
P(We, {
  mergeIntoDataStream: () => tt,
  toDataStream: () => Ze,
  toDataStreamResponse: () => et,
});
function A(t, a) {
  const n = rt();
  return me(t[Symbol.asyncIterator]())
    .pipeThrough(
      new TransformStream({
        async transform(r, o) {
          o.enqueue(n(r.delta));
        },
      }),
    )
    .pipeThrough(te(a))
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(
      new TransformStream({
        transform: async (r, o) => {
          o.enqueue(L('text', r));
        },
      }),
    );
}
function Ze(t, a) {
  return A(t, a).pipeThrough(new TextEncoderStream());
}
function et(t, a = {}) {
  var n;
  const { init: r, data: o, callbacks: s } = a,
    c = A(t, s).pipeThrough(new TextEncoderStream()),
    g = o ? Z(o.stream, c) : c;
  return new Response(g, {
    status: (n = r?.status) != null ? n : 200,
    statusText: r?.statusText,
    headers: V(r?.headers, {
      contentType: 'text/plain; charset=utf-8',
      dataStreamVersion: 'v1',
    }),
  });
}
function tt(t, a) {
  a.dataStream.merge(A(t, a.callbacks));
}
function rt() {
  let t = !0;
  return a => (t && ((a = a.trimStart()), a && (t = !1)), a);
}
const at = w('<div>Loading...'),
  nt = w(
    '<div class="mt-4 text-gray-500"><!$><!/><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Stop',
  ),
  ot = w(
    '<div class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><div class="flex flex-col gap-2 p-2"></div><!$><!/><!$><!/><form class="fixed bottom-0 w-full max-w-md p-2"><input class="w-full p-2 mb-8 border border-gray-300 rounded shadow-xl"placeholder="Say something...">',
  ),
  st = w('<div class=whitespace-pre-wrap><!$><!/><!$><!/>'),
  it = w(
    '<div class=mt-4><div class=text-red-500>An error occurred.</div><button type=button class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Retry',
  );
function pt() {
  const {
    input: t,
    messages: a,
    handleInputChange: n,
    handleSubmit: r,
    status: o,
    error: s,
    stop: c,
    reload: g,
  } = he({
    api: '/api/use-chat-request',
    sendExtraMessageFields: !0,
    generateId: h({ prefix: 'msgc', size: 16 }),
    experimental_prepareRequestBody({ messages: p }) {
      return { message: p[p.length - 1] };
    },
  });
  return (() => {
    const p = y(ot),
      b = p.firstChild,
      u = b.nextSibling,
      [l, R] = _(u.nextSibling),
      x = l.nextSibling,
      [q, re] = _(x.nextSibling),
      F = q.nextSibling,
      C = F.firstChild;
    return (
      v(
        b,
        O(le, {
          get each() {
            return a();
          },
          children: m =>
            (() => {
              const d = y(st),
                f = d.firstChild,
                [S, $] = _(f.nextSibling),
                ae = S.nextSibling,
                [ne, oe] = _(ae.nextSibling);
              return (
                v(d, () => (m.role === 'user' ? 'User: ' : 'AI: '), S, $),
                v(d, () => m.content, ne, oe),
                d
              );
            })(),
        }),
      ),
      v(
        p,
        O(U, {
          get when() {
            return o() === 'submitted' || o() === 'streaming';
          },
          get children() {
            const m = y(nt),
              d = m.firstChild,
              [f, S] = _(d.nextSibling),
              $ = f.nextSibling;
            return (
              v(
                m,
                O(U, {
                  get when() {
                    return o() === 'submitted';
                  },
                  get children() {
                    return y(at);
                  },
                }),
                f,
                S,
              ),
              E($, 'click', c, !0),
              I(),
              m
            );
          },
        }),
        l,
        R,
      ),
      v(
        p,
        (() => {
          const m = se(() => !!s());
          return () =>
            m() &&
            (() => {
              const d = y(it),
                f = d.firstChild,
                S = f.nextSibling;
              return (S.$$click = () => g()), I(), d;
            })();
        })(),
        q,
        re,
      ),
      E(F, 'submit', r),
      E(C, 'input', n, !0),
      J(() => z(C, 'disabled', o() !== 'ready')),
      J(() => z(C, 'value', t())),
      I(),
      p
    );
  })();
}
ie(['click', 'input']);
export { pt as default };
