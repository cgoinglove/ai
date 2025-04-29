var wr = 'vercel.ai.error',
  On = Symbol.for(wr),
  xr,
  Nn = class Tr extends Error {
    constructor({ name: e, message: r, cause: n }) {
      super(r), (this[xr] = !0), (this.name = e), (this.cause = n);
    }
    static isInstance(e) {
      return Tr.hasMarker(e, wr);
    }
    static hasMarker(e, r) {
      const n = Symbol.for(r);
      return (
        e != null &&
        typeof e == 'object' &&
        n in e &&
        typeof e[n] == 'boolean' &&
        e[n] === !0
      );
    }
  };
xr = On;
var Pe = Nn;
function Er(t) {
  return t == null
    ? 'unknown error'
    : typeof t == 'string'
      ? t
      : t instanceof Error
        ? t.message
        : JSON.stringify(t);
}
var Sr = 'AI_InvalidArgumentError',
  Ir = `vercel.ai.error.${Sr}`,
  Cn = Symbol.for(Ir),
  Ar,
  Rn = class extends Pe {
    constructor({ message: t, cause: e, argument: r }) {
      super({ name: Sr, message: t, cause: e }),
        (this[Ar] = !0),
        (this.argument = r);
    }
    static isInstance(t) {
      return Pe.hasMarker(t, Ir);
    }
  };
Ar = Cn;
var Or = 'AI_JSONParseError',
  Nr = `vercel.ai.error.${Or}`,
  Pn = Symbol.for(Nr),
  Cr,
  ir = class extends Pe {
    constructor({ text: t, cause: e }) {
      super({
        name: Or,
        message: `JSON parsing failed: Text: ${t}.
Error message: ${Er(e)}`,
        cause: e,
      }),
        (this[Cr] = !0),
        (this.text = t);
    }
    static isInstance(t) {
      return Pe.hasMarker(t, Nr);
    }
  };
Cr = Pn;
var Rr = 'AI_TypeValidationError',
  Pr = `vercel.ai.error.${Rr}`,
  Zn = Symbol.for(Pr),
  Zr,
  jn = class Lt extends Pe {
    constructor({ value: e, cause: r }) {
      super({
        name: Rr,
        message: `Type validation failed: Value: ${JSON.stringify(e)}.
Error message: ${Er(r)}`,
        cause: r,
      }),
        (this[Zr] = !0),
        (this.value = e);
    }
    static isInstance(e) {
      return Pe.hasMarker(e, Pr);
    }
    static wrap({ value: e, cause: r }) {
      return Lt.isInstance(r) && r.value === e
        ? r
        : new Lt({ value: e, cause: r });
    }
  };
Zr = Zn;
var or = jn;
let Dn =
  (t, e = 21) =>
  (r = e) => {
    let n = '',
      a = r | 0;
    for (; a--; ) n += t[(Math.random() * t.length) | 0];
    return n;
  };
function Mn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
    ? t.default
    : t;
}
var $e = { exports: {} };
const $n = typeof Buffer < 'u',
  cr =
    /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,
  lr =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function jr(t, e, r) {
  r == null && e !== null && typeof e == 'object' && ((r = e), (e = void 0)),
    $n && Buffer.isBuffer(t) && (t = t.toString()),
    t && t.charCodeAt(0) === 65279 && (t = t.slice(1));
  const n = JSON.parse(t, e);
  if (n === null || typeof n != 'object') return n;
  const a = (r && r.protoAction) || 'error',
    s = (r && r.constructorAction) || 'error';
  if (a === 'ignore' && s === 'ignore') return n;
  if (a !== 'ignore' && s !== 'ignore') {
    if (cr.test(t) === !1 && lr.test(t) === !1) return n;
  } else if (a !== 'ignore' && s === 'ignore') {
    if (cr.test(t) === !1) return n;
  } else if (lr.test(t) === !1) return n;
  return Dr(n, { protoAction: a, constructorAction: s, safe: r && r.safe });
}
function Dr(
  t,
  { protoAction: e = 'error', constructorAction: r = 'error', safe: n } = {},
) {
  let a = [t];
  for (; a.length; ) {
    const s = a;
    a = [];
    for (const i of s) {
      if (
        e !== 'ignore' &&
        Object.prototype.hasOwnProperty.call(i, '__proto__')
      ) {
        if (n === !0) return null;
        if (e === 'error')
          throw new SyntaxError('Object contains forbidden prototype property');
        delete i.__proto__;
      }
      if (
        r !== 'ignore' &&
        Object.prototype.hasOwnProperty.call(i, 'constructor') &&
        Object.prototype.hasOwnProperty.call(i.constructor, 'prototype')
      ) {
        if (n === !0) return null;
        if (r === 'error')
          throw new SyntaxError('Object contains forbidden prototype property');
        delete i.constructor;
      }
      for (const o in i) {
        const c = i[o];
        c && typeof c == 'object' && a.push(c);
      }
    }
  }
  return t;
}
function Kt(t, e, r) {
  const n = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return jr(t, e, r);
  } finally {
    Error.stackTraceLimit = n;
  }
}
function Ln(t, e) {
  const r = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return jr(t, e, { safe: !0 });
  } catch {
    return null;
  } finally {
    Error.stackTraceLimit = r;
  }
}
$e.exports = Kt;
$e.exports.default = Kt;
$e.exports.parse = Kt;
$e.exports.safeParse = Ln;
$e.exports.scan = Dr;
var Vn = $e.exports;
const Un = Mn(Vn);
function Mi(t) {
  return new ReadableStream({
    async pull(e) {
      try {
        const { value: r, done: n } = await t.next();
        n ? e.close() : e.enqueue(r);
      } catch (r) {
        e.error(r);
      }
    },
    cancel() {},
  });
}
var zn = ({
    prefix: t,
    size: e = 16,
    alphabet:
      r = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    separator: n = '-',
  } = {}) => {
    const a = Dn(r, e);
    if (t == null) return a;
    if (r.includes(n))
      throw new Rn({
        argument: 'separator',
        message: `The separator "${n}" must not be part of the alphabet "${r}".`,
      });
    return s => `${t}${n}${a(s)}`;
  },
  Gt = zn();
function Fn(t) {
  return (
    t instanceof Error && (t.name === 'AbortError' || t.name === 'TimeoutError')
  );
}
var ht = Symbol.for('vercel.ai.validator');
function Bn(t) {
  return { [ht]: !0, validate: t };
}
function Jn(t) {
  return (
    typeof t == 'object' &&
    t !== null &&
    ht in t &&
    t[ht] === !0 &&
    'validate' in t
  );
}
function Wn(t) {
  return Jn(t) ? t : qn(t);
}
function qn(t) {
  return Bn(e => {
    const r = t.safeParse(e);
    return r.success
      ? { success: !0, value: r.data }
      : { success: !1, error: r.error };
  });
}
function Mr({ value: t, schema: e }) {
  const r = Wn(e);
  try {
    if (r.validate == null) return { success: !0, value: t };
    const n = r.validate(t);
    return n.success
      ? n
      : { success: !1, error: or.wrap({ value: t, cause: n.error }) };
  } catch (n) {
    return { success: !1, error: or.wrap({ value: t, cause: n }) };
  }
}
function ur({ text: t, schema: e }) {
  try {
    const r = Un.parse(t);
    if (e == null) return { success: !0, value: r, rawValue: r };
    const n = Mr({ value: r, schema: e });
    return n.success ? { ...n, rawValue: r } : n;
  } catch (r) {
    return {
      success: !1,
      error: ir.isInstance(r) ? r : new ir({ text: t, cause: r }),
    };
  }
}
const Yn = Symbol('Let zodToJsonSchema decide on which parser to use'),
  dr = {
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
  Kn = t => (typeof t == 'string' ? { ...dr, name: t } : { ...dr, ...t }),
  Gn = t => {
    const e = Kn(t),
      r =
        e.name !== void 0
          ? [...e.basePath, e.definitionPath, e.name]
          : e.basePath;
    return {
      ...e,
      currentPath: r,
      propertyPath: void 0,
      seen: new Map(
        Object.entries(e.definitions).map(([n, a]) => [
          a._def,
          {
            def: a._def,
            path: [...e.basePath, e.definitionPath, n],
            jsonSchema: void 0,
          },
        ]),
      ),
    };
  };
function $r(t, e, r, n) {
  n?.errorMessages && r && (t.errorMessage = { ...t.errorMessage, [e]: r });
}
function j(t, e, r, n, a) {
  (t[e] = r), $r(t, e, n, a);
}
var O;
(function (t) {
  t.assertEqual = a => a;
  function e(a) {}
  t.assertIs = e;
  function r(a) {
    throw new Error();
  }
  (t.assertNever = r),
    (t.arrayToEnum = a => {
      const s = {};
      for (const i of a) s[i] = i;
      return s;
    }),
    (t.getValidEnumValues = a => {
      const s = t.objectKeys(a).filter(o => typeof a[a[o]] != 'number'),
        i = {};
      for (const o of s) i[o] = a[o];
      return t.objectValues(i);
    }),
    (t.objectValues = a =>
      t.objectKeys(a).map(function (s) {
        return a[s];
      })),
    (t.objectKeys =
      typeof Object.keys == 'function'
        ? a => Object.keys(a)
        : a => {
            const s = [];
            for (const i in a)
              Object.prototype.hasOwnProperty.call(a, i) && s.push(i);
            return s;
          }),
    (t.find = (a, s) => {
      for (const i of a) if (s(i)) return i;
    }),
    (t.isInteger =
      typeof Number.isInteger == 'function'
        ? a => Number.isInteger(a)
        : a => typeof a == 'number' && isFinite(a) && Math.floor(a) === a);
  function n(a, s = ' | ') {
    return a.map(i => (typeof i == 'string' ? `'${i}'` : i)).join(s);
  }
  (t.joinValues = n),
    (t.jsonStringifyReplacer = (a, s) =>
      typeof s == 'bigint' ? s.toString() : s);
})(O || (O = {}));
var Vt;
(function (t) {
  t.mergeShapes = (e, r) => ({ ...e, ...r });
})(Vt || (Vt = {}));
const g = O.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set',
  ]),
  pe = t => {
    switch (typeof t) {
      case 'undefined':
        return g.undefined;
      case 'string':
        return g.string;
      case 'number':
        return isNaN(t) ? g.nan : g.number;
      case 'boolean':
        return g.boolean;
      case 'function':
        return g.function;
      case 'bigint':
        return g.bigint;
      case 'symbol':
        return g.symbol;
      case 'object':
        return Array.isArray(t)
          ? g.array
          : t === null
            ? g.null
            : t.then &&
                typeof t.then == 'function' &&
                t.catch &&
                typeof t.catch == 'function'
              ? g.promise
              : typeof Map < 'u' && t instanceof Map
                ? g.map
                : typeof Set < 'u' && t instanceof Set
                  ? g.set
                  : typeof Date < 'u' && t instanceof Date
                    ? g.date
                    : g.object;
      default:
        return g.unknown;
    }
  },
  d = O.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite',
  ]),
  Hn = t => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, '$1:');
class K extends Error {
  constructor(e) {
    super(),
      (this.issues = []),
      (this.addIssue = n => {
        this.issues = [...this.issues, n];
      }),
      (this.addIssues = (n = []) => {
        this.issues = [...this.issues, ...n];
      });
    const r = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, r)
      : (this.__proto__ = r),
      (this.name = 'ZodError'),
      (this.issues = e);
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const r =
        e ||
        function (s) {
          return s.message;
        },
      n = { _errors: [] },
      a = s => {
        for (const i of s.issues)
          if (i.code === 'invalid_union') i.unionErrors.map(a);
          else if (i.code === 'invalid_return_type') a(i.returnTypeError);
          else if (i.code === 'invalid_arguments') a(i.argumentsError);
          else if (i.path.length === 0) n._errors.push(r(i));
          else {
            let o = n,
              c = 0;
            for (; c < i.path.length; ) {
              const l = i.path[c];
              c === i.path.length - 1
                ? ((o[l] = o[l] || { _errors: [] }), o[l]._errors.push(r(i)))
                : (o[l] = o[l] || { _errors: [] }),
                (o = o[l]),
                c++;
            }
          }
      };
    return a(this), n;
  }
  static assert(e) {
    if (!(e instanceof K)) throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, O.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = r => r.message) {
    const r = {},
      n = [];
    for (const a of this.issues)
      a.path.length > 0
        ? ((r[a.path[0]] = r[a.path[0]] || []), r[a.path[0]].push(e(a)))
        : n.push(e(a));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
K.create = t => new K(t);
const Ze = (t, e) => {
  let r;
  switch (t.code) {
    case d.invalid_type:
      t.received === g.undefined
        ? (r = 'Required')
        : (r = `Expected ${t.expected}, received ${t.received}`);
      break;
    case d.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, O.jsonStringifyReplacer)}`;
      break;
    case d.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${O.joinValues(t.keys, ', ')}`;
      break;
    case d.invalid_union:
      r = 'Invalid input';
      break;
    case d.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${O.joinValues(t.options)}`;
      break;
    case d.invalid_enum_value:
      r = `Invalid enum value. Expected ${O.joinValues(t.options)}, received '${t.received}'`;
      break;
    case d.invalid_arguments:
      r = 'Invalid function arguments';
      break;
    case d.invalid_return_type:
      r = 'Invalid function return type';
      break;
    case d.invalid_date:
      r = 'Invalid date';
      break;
    case d.invalid_string:
      typeof t.validation == 'object'
        ? 'includes' in t.validation
          ? ((r = `Invalid input: must include "${t.validation.includes}"`),
            typeof t.validation.position == 'number' &&
              (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`))
          : 'startsWith' in t.validation
            ? (r = `Invalid input: must start with "${t.validation.startsWith}"`)
            : 'endsWith' in t.validation
              ? (r = `Invalid input: must end with "${t.validation.endsWith}"`)
              : O.assertNever(t.validation)
        : t.validation !== 'regex'
          ? (r = `Invalid ${t.validation}`)
          : (r = 'Invalid');
      break;
    case d.too_small:
      t.type === 'array'
        ? (r = `Array must contain ${t.exact ? 'exactly' : t.inclusive ? 'at least' : 'more than'} ${t.minimum} element(s)`)
        : t.type === 'string'
          ? (r = `String must contain ${t.exact ? 'exactly' : t.inclusive ? 'at least' : 'over'} ${t.minimum} character(s)`)
          : t.type === 'number'
            ? (r = `Number must be ${t.exact ? 'exactly equal to ' : t.inclusive ? 'greater than or equal to ' : 'greater than '}${t.minimum}`)
            : t.type === 'date'
              ? (r = `Date must be ${t.exact ? 'exactly equal to ' : t.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(t.minimum))}`)
              : (r = 'Invalid input');
      break;
    case d.too_big:
      t.type === 'array'
        ? (r = `Array must contain ${t.exact ? 'exactly' : t.inclusive ? 'at most' : 'less than'} ${t.maximum} element(s)`)
        : t.type === 'string'
          ? (r = `String must contain ${t.exact ? 'exactly' : t.inclusive ? 'at most' : 'under'} ${t.maximum} character(s)`)
          : t.type === 'number'
            ? (r = `Number must be ${t.exact ? 'exactly' : t.inclusive ? 'less than or equal to' : 'less than'} ${t.maximum}`)
            : t.type === 'bigint'
              ? (r = `BigInt must be ${t.exact ? 'exactly' : t.inclusive ? 'less than or equal to' : 'less than'} ${t.maximum}`)
              : t.type === 'date'
                ? (r = `Date must be ${t.exact ? 'exactly' : t.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(t.maximum))}`)
                : (r = 'Invalid input');
      break;
    case d.custom:
      r = 'Invalid input';
      break;
    case d.invalid_intersection_types:
      r = 'Intersection results could not be merged';
      break;
    case d.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case d.not_finite:
      r = 'Number must be finite';
      break;
    default:
      (r = e.defaultError), O.assertNever(t);
  }
  return { message: r };
};
let Lr = Ze;
function Xn(t) {
  Lr = t;
}
function mt() {
  return Lr;
}
const gt = t => {
    const { data: e, path: r, errorMaps: n, issueData: a } = t,
      s = [...r, ...(a.path || [])],
      i = { ...a, path: s };
    if (a.message !== void 0) return { ...a, path: s, message: a.message };
    let o = '';
    const c = n
      .filter(l => !!l)
      .slice()
      .reverse();
    for (const l of c) o = l(i, { data: e, defaultError: o }).message;
    return { ...a, path: s, message: o };
  },
  Qn = [];
function h(t, e) {
  const r = mt(),
    n = gt({
      issueData: e,
      data: t.data,
      path: t.path,
      errorMaps: [
        t.common.contextualErrorMap,
        t.schemaErrorMap,
        r,
        r === Ze ? void 0 : Ze,
      ].filter(a => !!a),
    });
  t.common.issues.push(n);
}
class B {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    this.value === 'valid' && (this.value = 'dirty');
  }
  abort() {
    this.value !== 'aborted' && (this.value = 'aborted');
  }
  static mergeArray(e, r) {
    const n = [];
    for (const a of r) {
      if (a.status === 'aborted') return v;
      a.status === 'dirty' && e.dirty(), n.push(a.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, r) {
    const n = [];
    for (const a of r) {
      const s = await a.key,
        i = await a.value;
      n.push({ key: s, value: i });
    }
    return B.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const a of r) {
      const { key: s, value: i } = a;
      if (s.status === 'aborted' || i.status === 'aborted') return v;
      s.status === 'dirty' && e.dirty(),
        i.status === 'dirty' && e.dirty(),
        s.value !== '__proto__' &&
          (typeof i.value < 'u' || a.alwaysSet) &&
          (n[s.value] = i.value);
    }
    return { status: e.value, value: n };
  }
}
const v = Object.freeze({ status: 'aborted' }),
  Ne = t => ({ status: 'dirty', value: t }),
  W = t => ({ status: 'valid', value: t }),
  Ut = t => t.status === 'aborted',
  zt = t => t.status === 'dirty',
  ze = t => t.status === 'valid',
  Fe = t => typeof Promise < 'u' && t instanceof Promise;
function yt(t, e, r, n) {
  if (typeof e == 'function' ? t !== e || !0 : !e.has(t))
    throw new TypeError(
      'Cannot read private member from an object whose class did not declare it',
    );
  return e.get(t);
}
function Vr(t, e, r, n, a) {
  if (typeof e == 'function' ? t !== e || !0 : !e.has(t))
    throw new TypeError(
      'Cannot write private member to an object whose class did not declare it',
    );
  return e.set(t, r), r;
}
var y;
(function (t) {
  (t.errToObj = e => (typeof e == 'string' ? { message: e } : e || {})),
    (t.toString = e => (typeof e == 'string' ? e : e?.message));
})(y || (y = {}));
var Le, Ve;
class ae {
  constructor(e, r, n, a) {
    (this._cachedPath = []),
      (this.parent = e),
      (this.data = r),
      (this._path = n),
      (this._key = a);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const fr = (t, e) => {
  if (ze(e)) return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error('Validation failed but no issues detected.');
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const r = new K(t.common.issues);
      return (this._error = r), this._error;
    },
  };
};
function k(t) {
  if (!t) return {};
  const {
    errorMap: e,
    invalid_type_error: r,
    required_error: n,
    description: a,
  } = t;
  if (e && (r || n))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return e
    ? { errorMap: e, description: a }
    : {
        errorMap: (i, o) => {
          var c, l;
          const { message: u } = t;
          return i.code === 'invalid_enum_value'
            ? { message: u ?? o.defaultError }
            : typeof o.data > 'u'
              ? {
                  message:
                    (c = u ?? n) !== null && c !== void 0 ? c : o.defaultError,
                }
              : i.code !== 'invalid_type'
                ? { message: o.defaultError }
                : {
                    message:
                      (l = u ?? r) !== null && l !== void 0
                        ? l
                        : o.defaultError,
                  };
        },
        description: a,
      };
}
class x {
  constructor(e) {
    (this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this));
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return pe(e.data);
  }
  _getOrReturnCtx(e, r) {
    return (
      r || {
        common: e.parent.common,
        data: e.data,
        parsedType: pe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new B(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: pe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (Fe(r)) throw new Error('Synchronous parse encountered promise.');
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const n = this.safeParse(e, r);
    if (n.success) return n.data;
    throw n.error;
  }
  safeParse(e, r) {
    var n;
    const a = {
        common: {
          issues: [],
          async: (n = r?.async) !== null && n !== void 0 ? n : !1,
          contextualErrorMap: r?.errorMap,
        },
        path: r?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: pe(e),
      },
      s = this._parseSync({ data: e, path: a.path, parent: a });
    return fr(a, s);
  }
  async parseAsync(e, r) {
    const n = await this.safeParseAsync(e, r);
    if (n.success) return n.data;
    throw n.error;
  }
  async safeParseAsync(e, r) {
    const n = {
        common: { issues: [], contextualErrorMap: r?.errorMap, async: !0 },
        path: r?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: pe(e),
      },
      a = this._parse({ data: e, path: n.path, parent: n }),
      s = await (Fe(a) ? a : Promise.resolve(a));
    return fr(n, s);
  }
  refine(e, r) {
    const n = a =>
      typeof r == 'string' || typeof r > 'u'
        ? { message: r }
        : typeof r == 'function'
          ? r(a)
          : r;
    return this._refinement((a, s) => {
      const i = e(a),
        o = () => s.addIssue({ code: d.custom, ...n(a) });
      return typeof Promise < 'u' && i instanceof Promise
        ? i.then(c => (c ? !0 : (o(), !1)))
        : i
          ? !0
          : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, a) =>
      e(n) ? !0 : (a.addIssue(typeof r == 'function' ? r(n, a) : r), !1),
    );
  }
  _refinement(e) {
    return new ne({
      schema: this,
      typeName: f.ZodEffects,
      effect: { type: 'refinement', refinement: e },
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return re.create(this, this._def);
  }
  nullable() {
    return ye.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return te.create(this, this._def);
  }
  promise() {
    return De.create(this, this._def);
  }
  or(e) {
    return qe.create([this, e], this._def);
  }
  and(e) {
    return Ye.create(this, e, this._def);
  }
  transform(e) {
    return new ne({
      ...k(this._def),
      schema: this,
      typeName: f.ZodEffects,
      effect: { type: 'transform', transform: e },
    });
  }
  default(e) {
    const r = typeof e == 'function' ? e : () => e;
    return new Qe({
      ...k(this._def),
      innerType: this,
      defaultValue: r,
      typeName: f.ZodDefault,
    });
  }
  brand() {
    return new Ht({ typeName: f.ZodBranded, type: this, ...k(this._def) });
  }
  catch(e) {
    const r = typeof e == 'function' ? e : () => e;
    return new et({
      ...k(this._def),
      innerType: this,
      catchValue: r,
      typeName: f.ZodCatch,
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({ ...this._def, description: e });
  }
  pipe(e) {
    return ct.create(this, e);
  }
  readonly() {
    return tt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const ea = /^c[^\s-]{8,}$/i,
  ta = /^[0-9a-z]+$/,
  ra = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  na =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  aa = /^[a-z0-9_-]{21}$/i,
  sa =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  ia =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  oa = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$';
let jt;
const ca =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  la =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ua = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Ur =
    '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
  da = new RegExp(`^${Ur}$`);
function zr(t) {
  let e = '([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d';
  return (
    t.precision
      ? (e = `${e}\\.\\d{${t.precision}}`)
      : t.precision == null && (e = `${e}(\\.\\d+)?`),
    e
  );
}
function fa(t) {
  return new RegExp(`^${zr(t)}$`);
}
function Fr(t) {
  let e = `${Ur}T${zr(t)}`;
  const r = [];
  return (
    r.push(t.local ? 'Z?' : 'Z'),
    t.offset && r.push('([+-]\\d{2}:?\\d{2})'),
    (e = `${e}(${r.join('|')})`),
    new RegExp(`^${e}$`)
  );
}
function pa(t, e) {
  return !!(
    ((e === 'v4' || !e) && ca.test(t)) ||
    ((e === 'v6' || !e) && la.test(t))
  );
}
class ee extends x {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = String(e.data)),
      this._getType(e) !== g.string)
    ) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: d.invalid_type,
          expected: g.string,
          received: s.parsedType,
        }),
        v
      );
    }
    const n = new B();
    let a;
    for (const s of this._def.checks)
      if (s.kind === 'min')
        e.data.length < s.value &&
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            code: d.too_small,
            minimum: s.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'max')
        e.data.length > s.value &&
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            code: d.too_big,
            maximum: s.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'length') {
        const i = e.data.length > s.value,
          o = e.data.length < s.value;
        (i || o) &&
          ((a = this._getOrReturnCtx(e, a)),
          i
            ? h(a, {
                code: d.too_big,
                maximum: s.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: s.message,
              })
            : o &&
              h(a, {
                code: d.too_small,
                minimum: s.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: s.message,
              }),
          n.dirty());
      } else if (s.kind === 'email')
        ia.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            validation: 'email',
            code: d.invalid_string,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'emoji')
        jt || (jt = new RegExp(oa, 'u')),
          jt.test(e.data) ||
            ((a = this._getOrReturnCtx(e, a)),
            h(a, {
              validation: 'emoji',
              code: d.invalid_string,
              message: s.message,
            }),
            n.dirty());
      else if (s.kind === 'uuid')
        na.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            validation: 'uuid',
            code: d.invalid_string,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'nanoid')
        aa.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            validation: 'nanoid',
            code: d.invalid_string,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'cuid')
        ea.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            validation: 'cuid',
            code: d.invalid_string,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'cuid2')
        ta.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            validation: 'cuid2',
            code: d.invalid_string,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'ulid')
        ra.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            validation: 'ulid',
            code: d.invalid_string,
            message: s.message,
          }),
          n.dirty());
      else if (s.kind === 'url')
        try {
          new URL(e.data);
        } catch {
          (a = this._getOrReturnCtx(e, a)),
            h(a, {
              validation: 'url',
              code: d.invalid_string,
              message: s.message,
            }),
            n.dirty();
        }
      else
        s.kind === 'regex'
          ? ((s.regex.lastIndex = 0),
            s.regex.test(e.data) ||
              ((a = this._getOrReturnCtx(e, a)),
              h(a, {
                validation: 'regex',
                code: d.invalid_string,
                message: s.message,
              }),
              n.dirty()))
          : s.kind === 'trim'
            ? (e.data = e.data.trim())
            : s.kind === 'includes'
              ? e.data.includes(s.value, s.position) ||
                ((a = this._getOrReturnCtx(e, a)),
                h(a, {
                  code: d.invalid_string,
                  validation: { includes: s.value, position: s.position },
                  message: s.message,
                }),
                n.dirty())
              : s.kind === 'toLowerCase'
                ? (e.data = e.data.toLowerCase())
                : s.kind === 'toUpperCase'
                  ? (e.data = e.data.toUpperCase())
                  : s.kind === 'startsWith'
                    ? e.data.startsWith(s.value) ||
                      ((a = this._getOrReturnCtx(e, a)),
                      h(a, {
                        code: d.invalid_string,
                        validation: { startsWith: s.value },
                        message: s.message,
                      }),
                      n.dirty())
                    : s.kind === 'endsWith'
                      ? e.data.endsWith(s.value) ||
                        ((a = this._getOrReturnCtx(e, a)),
                        h(a, {
                          code: d.invalid_string,
                          validation: { endsWith: s.value },
                          message: s.message,
                        }),
                        n.dirty())
                      : s.kind === 'datetime'
                        ? Fr(s).test(e.data) ||
                          ((a = this._getOrReturnCtx(e, a)),
                          h(a, {
                            code: d.invalid_string,
                            validation: 'datetime',
                            message: s.message,
                          }),
                          n.dirty())
                        : s.kind === 'date'
                          ? da.test(e.data) ||
                            ((a = this._getOrReturnCtx(e, a)),
                            h(a, {
                              code: d.invalid_string,
                              validation: 'date',
                              message: s.message,
                            }),
                            n.dirty())
                          : s.kind === 'time'
                            ? fa(s).test(e.data) ||
                              ((a = this._getOrReturnCtx(e, a)),
                              h(a, {
                                code: d.invalid_string,
                                validation: 'time',
                                message: s.message,
                              }),
                              n.dirty())
                            : s.kind === 'duration'
                              ? sa.test(e.data) ||
                                ((a = this._getOrReturnCtx(e, a)),
                                h(a, {
                                  validation: 'duration',
                                  code: d.invalid_string,
                                  message: s.message,
                                }),
                                n.dirty())
                              : s.kind === 'ip'
                                ? pa(e.data, s.version) ||
                                  ((a = this._getOrReturnCtx(e, a)),
                                  h(a, {
                                    validation: 'ip',
                                    code: d.invalid_string,
                                    message: s.message,
                                  }),
                                  n.dirty())
                                : s.kind === 'base64'
                                  ? ua.test(e.data) ||
                                    ((a = this._getOrReturnCtx(e, a)),
                                    h(a, {
                                      validation: 'base64',
                                      code: d.invalid_string,
                                      message: s.message,
                                    }),
                                    n.dirty())
                                  : O.assertNever(s);
    return { status: n.value, value: e.data };
  }
  _regex(e, r, n) {
    return this.refinement(a => e.test(a), {
      validation: r,
      code: d.invalid_string,
      ...y.errToObj(n),
    });
  }
  _addCheck(e) {
    return new ee({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: 'email', ...y.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: 'url', ...y.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: 'emoji', ...y.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: 'uuid', ...y.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: 'nanoid', ...y.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: 'cuid', ...y.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: 'cuid2', ...y.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: 'ulid', ...y.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: 'base64', ...y.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: 'ip', ...y.errToObj(e) });
  }
  datetime(e) {
    var r, n;
    return typeof e == 'string'
      ? this._addCheck({
          kind: 'datetime',
          precision: null,
          offset: !1,
          local: !1,
          message: e,
        })
      : this._addCheck({
          kind: 'datetime',
          precision: typeof e?.precision > 'u' ? null : e?.precision,
          offset: (r = e?.offset) !== null && r !== void 0 ? r : !1,
          local: (n = e?.local) !== null && n !== void 0 ? n : !1,
          ...y.errToObj(e?.message),
        });
  }
  date(e) {
    return this._addCheck({ kind: 'date', message: e });
  }
  time(e) {
    return typeof e == 'string'
      ? this._addCheck({ kind: 'time', precision: null, message: e })
      : this._addCheck({
          kind: 'time',
          precision: typeof e?.precision > 'u' ? null : e?.precision,
          ...y.errToObj(e?.message),
        });
  }
  duration(e) {
    return this._addCheck({ kind: 'duration', ...y.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({ kind: 'regex', regex: e, ...y.errToObj(r) });
  }
  includes(e, r) {
    return this._addCheck({
      kind: 'includes',
      value: e,
      position: r?.position,
      ...y.errToObj(r?.message),
    });
  }
  startsWith(e, r) {
    return this._addCheck({ kind: 'startsWith', value: e, ...y.errToObj(r) });
  }
  endsWith(e, r) {
    return this._addCheck({ kind: 'endsWith', value: e, ...y.errToObj(r) });
  }
  min(e, r) {
    return this._addCheck({ kind: 'min', value: e, ...y.errToObj(r) });
  }
  max(e, r) {
    return this._addCheck({ kind: 'max', value: e, ...y.errToObj(r) });
  }
  length(e, r) {
    return this._addCheck({ kind: 'length', value: e, ...y.errToObj(r) });
  }
  nonempty(e) {
    return this.min(1, y.errToObj(e));
  }
  trim() {
    return new ee({
      ...this._def,
      checks: [...this._def.checks, { kind: 'trim' }],
    });
  }
  toLowerCase() {
    return new ee({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toLowerCase' }],
    });
  }
  toUpperCase() {
    return new ee({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toUpperCase' }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find(e => e.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find(e => e.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find(e => e.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find(e => e.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find(e => e.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find(e => e.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find(e => e.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find(e => e.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find(e => e.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find(e => e.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find(e => e.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find(e => e.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find(e => e.kind === 'ip');
  }
  get isBase64() {
    return !!this._def.checks.find(e => e.kind === 'base64');
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
ee.create = t => {
  var e;
  return new ee({
    checks: [],
    typeName: f.ZodString,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...k(t),
  });
};
function ha(t, e) {
  const r = (t.toString().split('.')[1] || '').length,
    n = (e.toString().split('.')[1] || '').length,
    a = r > n ? r : n,
    s = parseInt(t.toFixed(a).replace('.', '')),
    i = parseInt(e.toFixed(a).replace('.', ''));
  return (s % i) / Math.pow(10, a);
}
class he extends x {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = Number(e.data)),
      this._getType(e) !== g.number)
    ) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: d.invalid_type,
          expected: g.number,
          received: s.parsedType,
        }),
        v
      );
    }
    let n;
    const a = new B();
    for (const s of this._def.checks)
      s.kind === 'int'
        ? O.isInteger(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            code: d.invalid_type,
            expected: 'integer',
            received: 'float',
            message: s.message,
          }),
          a.dirty())
        : s.kind === 'min'
          ? (s.inclusive ? e.data < s.value : e.data <= s.value) &&
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              code: d.too_small,
              minimum: s.value,
              type: 'number',
              inclusive: s.inclusive,
              exact: !1,
              message: s.message,
            }),
            a.dirty())
          : s.kind === 'max'
            ? (s.inclusive ? e.data > s.value : e.data >= s.value) &&
              ((n = this._getOrReturnCtx(e, n)),
              h(n, {
                code: d.too_big,
                maximum: s.value,
                type: 'number',
                inclusive: s.inclusive,
                exact: !1,
                message: s.message,
              }),
              a.dirty())
            : s.kind === 'multipleOf'
              ? ha(e.data, s.value) !== 0 &&
                ((n = this._getOrReturnCtx(e, n)),
                h(n, {
                  code: d.not_multiple_of,
                  multipleOf: s.value,
                  message: s.message,
                }),
                a.dirty())
              : s.kind === 'finite'
                ? Number.isFinite(e.data) ||
                  ((n = this._getOrReturnCtx(e, n)),
                  h(n, { code: d.not_finite, message: s.message }),
                  a.dirty())
                : O.assertNever(s);
    return { status: a.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit('min', e, !0, y.toString(r));
  }
  gt(e, r) {
    return this.setLimit('min', e, !1, y.toString(r));
  }
  lte(e, r) {
    return this.setLimit('max', e, !0, y.toString(r));
  }
  lt(e, r) {
    return this.setLimit('max', e, !1, y.toString(r));
  }
  setLimit(e, r, n, a) {
    return new he({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: r, inclusive: n, message: y.toString(a) },
      ],
    });
  }
  _addCheck(e) {
    return new he({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: 'int', message: y.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !1,
      message: y.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !1,
      message: y.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !0,
      message: y.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !0,
      message: y.toString(e),
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: y.toString(r),
    });
  }
  finite(e) {
    return this._addCheck({ kind: 'finite', message: y.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: 'min',
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: y.toString(e),
    })._addCheck({
      kind: 'max',
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: y.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      e =>
        e.kind === 'int' || (e.kind === 'multipleOf' && O.isInteger(e.value)),
    );
  }
  get isFinite() {
    let e = null,
      r = null;
    for (const n of this._def.checks) {
      if (n.kind === 'finite' || n.kind === 'int' || n.kind === 'multipleOf')
        return !0;
      n.kind === 'min'
        ? (r === null || n.value > r) && (r = n.value)
        : n.kind === 'max' && (e === null || n.value < e) && (e = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
he.create = t =>
  new he({
    checks: [],
    typeName: f.ZodNumber,
    coerce: t?.coerce || !1,
    ...k(t),
  });
class me extends x {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = BigInt(e.data)),
      this._getType(e) !== g.bigint)
    ) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: d.invalid_type,
          expected: g.bigint,
          received: s.parsedType,
        }),
        v
      );
    }
    let n;
    const a = new B();
    for (const s of this._def.checks)
      s.kind === 'min'
        ? (s.inclusive ? e.data < s.value : e.data <= s.value) &&
          ((n = this._getOrReturnCtx(e, n)),
          h(n, {
            code: d.too_small,
            type: 'bigint',
            minimum: s.value,
            inclusive: s.inclusive,
            message: s.message,
          }),
          a.dirty())
        : s.kind === 'max'
          ? (s.inclusive ? e.data > s.value : e.data >= s.value) &&
            ((n = this._getOrReturnCtx(e, n)),
            h(n, {
              code: d.too_big,
              type: 'bigint',
              maximum: s.value,
              inclusive: s.inclusive,
              message: s.message,
            }),
            a.dirty())
          : s.kind === 'multipleOf'
            ? e.data % s.value !== BigInt(0) &&
              ((n = this._getOrReturnCtx(e, n)),
              h(n, {
                code: d.not_multiple_of,
                multipleOf: s.value,
                message: s.message,
              }),
              a.dirty())
            : O.assertNever(s);
    return { status: a.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit('min', e, !0, y.toString(r));
  }
  gt(e, r) {
    return this.setLimit('min', e, !1, y.toString(r));
  }
  lte(e, r) {
    return this.setLimit('max', e, !0, y.toString(r));
  }
  lt(e, r) {
    return this.setLimit('max', e, !1, y.toString(r));
  }
  setLimit(e, r, n, a) {
    return new me({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: r, inclusive: n, message: y.toString(a) },
      ],
    });
  }
  _addCheck(e) {
    return new me({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e),
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: y.toString(r),
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
me.create = t => {
  var e;
  return new me({
    checks: [],
    typeName: f.ZodBigInt,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...k(t),
  });
};
class Be extends x {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = !!e.data), this._getType(e) !== g.boolean)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        h(n, {
          code: d.invalid_type,
          expected: g.boolean,
          received: n.parsedType,
        }),
        v
      );
    }
    return W(e.data);
  }
}
Be.create = t =>
  new Be({ typeName: f.ZodBoolean, coerce: t?.coerce || !1, ...k(t) });
class we extends x {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = new Date(e.data)),
      this._getType(e) !== g.date)
    ) {
      const s = this._getOrReturnCtx(e);
      return (
        h(s, {
          code: d.invalid_type,
          expected: g.date,
          received: s.parsedType,
        }),
        v
      );
    }
    if (isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return h(s, { code: d.invalid_date }), v;
    }
    const n = new B();
    let a;
    for (const s of this._def.checks)
      s.kind === 'min'
        ? e.data.getTime() < s.value &&
          ((a = this._getOrReturnCtx(e, a)),
          h(a, {
            code: d.too_small,
            message: s.message,
            inclusive: !0,
            exact: !1,
            minimum: s.value,
            type: 'date',
          }),
          n.dirty())
        : s.kind === 'max'
          ? e.data.getTime() > s.value &&
            ((a = this._getOrReturnCtx(e, a)),
            h(a, {
              code: d.too_big,
              message: s.message,
              inclusive: !0,
              exact: !1,
              maximum: s.value,
              type: 'date',
            }),
            n.dirty())
          : O.assertNever(s);
    return { status: n.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new we({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, r) {
    return this._addCheck({
      kind: 'min',
      value: e.getTime(),
      message: y.toString(r),
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: 'max',
      value: e.getTime(),
      message: y.toString(r),
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
we.create = t =>
  new we({ checks: [], coerce: t?.coerce || !1, typeName: f.ZodDate, ...k(t) });
class _t extends x {
  _parse(e) {
    if (this._getType(e) !== g.symbol) {
      const n = this._getOrReturnCtx(e);
      return (
        h(n, {
          code: d.invalid_type,
          expected: g.symbol,
          received: n.parsedType,
        }),
        v
      );
    }
    return W(e.data);
  }
}
_t.create = t => new _t({ typeName: f.ZodSymbol, ...k(t) });
class Je extends x {
  _parse(e) {
    if (this._getType(e) !== g.undefined) {
      const n = this._getOrReturnCtx(e);
      return (
        h(n, {
          code: d.invalid_type,
          expected: g.undefined,
          received: n.parsedType,
        }),
        v
      );
    }
    return W(e.data);
  }
}
Je.create = t => new Je({ typeName: f.ZodUndefined, ...k(t) });
class We extends x {
  _parse(e) {
    if (this._getType(e) !== g.null) {
      const n = this._getOrReturnCtx(e);
      return (
        h(n, {
          code: d.invalid_type,
          expected: g.null,
          received: n.parsedType,
        }),
        v
      );
    }
    return W(e.data);
  }
}
We.create = t => new We({ typeName: f.ZodNull, ...k(t) });
class je extends x {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(e) {
    return W(e.data);
  }
}
je.create = t => new je({ typeName: f.ZodAny, ...k(t) });
class ke extends x {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(e) {
    return W(e.data);
  }
}
ke.create = t => new ke({ typeName: f.ZodUnknown, ...k(t) });
class de extends x {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return (
      h(r, { code: d.invalid_type, expected: g.never, received: r.parsedType }),
      v
    );
  }
}
de.create = t => new de({ typeName: f.ZodNever, ...k(t) });
class vt extends x {
  _parse(e) {
    if (this._getType(e) !== g.undefined) {
      const n = this._getOrReturnCtx(e);
      return (
        h(n, {
          code: d.invalid_type,
          expected: g.void,
          received: n.parsedType,
        }),
        v
      );
    }
    return W(e.data);
  }
}
vt.create = t => new vt({ typeName: f.ZodVoid, ...k(t) });
class te extends x {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e),
      a = this._def;
    if (r.parsedType !== g.array)
      return (
        h(r, {
          code: d.invalid_type,
          expected: g.array,
          received: r.parsedType,
        }),
        v
      );
    if (a.exactLength !== null) {
      const i = r.data.length > a.exactLength.value,
        o = r.data.length < a.exactLength.value;
      (i || o) &&
        (h(r, {
          code: i ? d.too_big : d.too_small,
          minimum: o ? a.exactLength.value : void 0,
          maximum: i ? a.exactLength.value : void 0,
          type: 'array',
          inclusive: !0,
          exact: !0,
          message: a.exactLength.message,
        }),
        n.dirty());
    }
    if (
      (a.minLength !== null &&
        r.data.length < a.minLength.value &&
        (h(r, {
          code: d.too_small,
          minimum: a.minLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.minLength.message,
        }),
        n.dirty()),
      a.maxLength !== null &&
        r.data.length > a.maxLength.value &&
        (h(r, {
          code: d.too_big,
          maximum: a.maxLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.maxLength.message,
        }),
        n.dirty()),
      r.common.async)
    )
      return Promise.all(
        [...r.data].map((i, o) => a.type._parseAsync(new ae(r, i, r.path, o))),
      ).then(i => B.mergeArray(n, i));
    const s = [...r.data].map((i, o) =>
      a.type._parseSync(new ae(r, i, r.path, o)),
    );
    return B.mergeArray(n, s);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new te({
      ...this._def,
      minLength: { value: e, message: y.toString(r) },
    });
  }
  max(e, r) {
    return new te({
      ...this._def,
      maxLength: { value: e, message: y.toString(r) },
    });
  }
  length(e, r) {
    return new te({
      ...this._def,
      exactLength: { value: e, message: y.toString(r) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
te.create = (t, e) =>
  new te({
    type: t,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: f.ZodArray,
    ...k(e),
  });
function Ae(t) {
  if (t instanceof $) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = re.create(Ae(n));
    }
    return new $({ ...t._def, shape: () => e });
  } else
    return t instanceof te
      ? new te({ ...t._def, type: Ae(t.element) })
      : t instanceof re
        ? re.create(Ae(t.unwrap()))
        : t instanceof ye
          ? ye.create(Ae(t.unwrap()))
          : t instanceof se
            ? se.create(t.items.map(e => Ae(e)))
            : t;
}
class $ extends x {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const e = this._def.shape(),
      r = O.objectKeys(e);
    return (this._cached = { shape: e, keys: r });
  }
  _parse(e) {
    if (this._getType(e) !== g.object) {
      const l = this._getOrReturnCtx(e);
      return (
        h(l, {
          code: d.invalid_type,
          expected: g.object,
          received: l.parsedType,
        }),
        v
      );
    }
    const { status: n, ctx: a } = this._processInputParams(e),
      { shape: s, keys: i } = this._getCached(),
      o = [];
    if (
      !(this._def.catchall instanceof de && this._def.unknownKeys === 'strip')
    )
      for (const l in a.data) i.includes(l) || o.push(l);
    const c = [];
    for (const l of i) {
      const u = s[l],
        p = a.data[l];
      c.push({
        key: { status: 'valid', value: l },
        value: u._parse(new ae(a, p, a.path, l)),
        alwaysSet: l in a.data,
      });
    }
    if (this._def.catchall instanceof de) {
      const l = this._def.unknownKeys;
      if (l === 'passthrough')
        for (const u of o)
          c.push({
            key: { status: 'valid', value: u },
            value: { status: 'valid', value: a.data[u] },
          });
      else if (l === 'strict')
        o.length > 0 &&
          (h(a, { code: d.unrecognized_keys, keys: o }), n.dirty());
      else if (l !== 'strip')
        throw new Error('Internal ZodObject error: invalid unknownKeys value.');
    } else {
      const l = this._def.catchall;
      for (const u of o) {
        const p = a.data[u];
        c.push({
          key: { status: 'valid', value: u },
          value: l._parse(new ae(a, p, a.path, u)),
          alwaysSet: u in a.data,
        });
      }
    }
    return a.common.async
      ? Promise.resolve()
          .then(async () => {
            const l = [];
            for (const u of c) {
              const p = await u.key,
                T = await u.value;
              l.push({ key: p, value: T, alwaysSet: u.alwaysSet });
            }
            return l;
          })
          .then(l => B.mergeObjectSync(n, l))
      : B.mergeObjectSync(n, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      y.errToObj,
      new $({
        ...this._def,
        unknownKeys: 'strict',
        ...(e !== void 0
          ? {
              errorMap: (r, n) => {
                var a, s, i, o;
                const c =
                  (i =
                    (s = (a = this._def).errorMap) === null || s === void 0
                      ? void 0
                      : s.call(a, r, n).message) !== null && i !== void 0
                    ? i
                    : n.defaultError;
                return r.code === 'unrecognized_keys'
                  ? {
                      message:
                        (o = y.errToObj(e).message) !== null && o !== void 0
                          ? o
                          : c,
                    }
                  : { message: c };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new $({ ...this._def, unknownKeys: 'strip' });
  }
  passthrough() {
    return new $({ ...this._def, unknownKeys: 'passthrough' });
  }
  extend(e) {
    return new $({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new $({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: f.ZodObject,
    });
  }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  catchall(e) {
    return new $({ ...this._def, catchall: e });
  }
  pick(e) {
    const r = {};
    return (
      O.objectKeys(e).forEach(n => {
        e[n] && this.shape[n] && (r[n] = this.shape[n]);
      }),
      new $({ ...this._def, shape: () => r })
    );
  }
  omit(e) {
    const r = {};
    return (
      O.objectKeys(this.shape).forEach(n => {
        e[n] || (r[n] = this.shape[n]);
      }),
      new $({ ...this._def, shape: () => r })
    );
  }
  deepPartial() {
    return Ae(this);
  }
  partial(e) {
    const r = {};
    return (
      O.objectKeys(this.shape).forEach(n => {
        const a = this.shape[n];
        e && !e[n] ? (r[n] = a) : (r[n] = a.optional());
      }),
      new $({ ...this._def, shape: () => r })
    );
  }
  required(e) {
    const r = {};
    return (
      O.objectKeys(this.shape).forEach(n => {
        if (e && !e[n]) r[n] = this.shape[n];
        else {
          let s = this.shape[n];
          for (; s instanceof re; ) s = s._def.innerType;
          r[n] = s;
        }
      }),
      new $({ ...this._def, shape: () => r })
    );
  }
  keyof() {
    return Br(O.objectKeys(this.shape));
  }
}
$.create = (t, e) =>
  new $({
    shape: () => t,
    unknownKeys: 'strip',
    catchall: de.create(),
    typeName: f.ZodObject,
    ...k(e),
  });
$.strictCreate = (t, e) =>
  new $({
    shape: () => t,
    unknownKeys: 'strict',
    catchall: de.create(),
    typeName: f.ZodObject,
    ...k(e),
  });
$.lazycreate = (t, e) =>
  new $({
    shape: t,
    unknownKeys: 'strip',
    catchall: de.create(),
    typeName: f.ZodObject,
    ...k(e),
  });
class qe extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e),
      n = this._def.options;
    function a(s) {
      for (const o of s) if (o.result.status === 'valid') return o.result;
      for (const o of s)
        if (o.result.status === 'dirty')
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const i = s.map(o => new K(o.ctx.common.issues));
      return h(r, { code: d.invalid_union, unionErrors: i }), v;
    }
    if (r.common.async)
      return Promise.all(
        n.map(async s => {
          const i = { ...r, common: { ...r.common, issues: [] }, parent: null };
          return {
            result: await s._parseAsync({
              data: r.data,
              path: r.path,
              parent: i,
            }),
            ctx: i,
          };
        }),
      ).then(a);
    {
      let s;
      const i = [];
      for (const c of n) {
        const l = { ...r, common: { ...r.common, issues: [] }, parent: null },
          u = c._parseSync({ data: r.data, path: r.path, parent: l });
        if (u.status === 'valid') return u;
        u.status === 'dirty' && !s && (s = { result: u, ctx: l }),
          l.common.issues.length && i.push(l.common.issues);
      }
      if (s) return r.common.issues.push(...s.ctx.common.issues), s.result;
      const o = i.map(c => new K(c));
      return h(r, { code: d.invalid_union, unionErrors: o }), v;
    }
  }
  get options() {
    return this._def.options;
  }
}
qe.create = (t, e) => new qe({ options: t, typeName: f.ZodUnion, ...k(e) });
const ce = t =>
  t instanceof Ge
    ? ce(t.schema)
    : t instanceof ne
      ? ce(t.innerType())
      : t instanceof He
        ? [t.value]
        : t instanceof ge
          ? t.options
          : t instanceof Xe
            ? O.objectValues(t.enum)
            : t instanceof Qe
              ? ce(t._def.innerType)
              : t instanceof Je
                ? [void 0]
                : t instanceof We
                  ? [null]
                  : t instanceof re
                    ? [void 0, ...ce(t.unwrap())]
                    : t instanceof ye
                      ? [null, ...ce(t.unwrap())]
                      : t instanceof Ht || t instanceof tt
                        ? ce(t.unwrap())
                        : t instanceof et
                          ? ce(t._def.innerType)
                          : [];
class Ot extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.object)
      return (
        h(r, {
          code: d.invalid_type,
          expected: g.object,
          received: r.parsedType,
        }),
        v
      );
    const n = this.discriminator,
      a = r.data[n],
      s = this.optionsMap.get(a);
    return s
      ? r.common.async
        ? s._parseAsync({ data: r.data, path: r.path, parent: r })
        : s._parseSync({ data: r.data, path: r.path, parent: r })
      : (h(r, {
          code: d.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [n],
        }),
        v);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(e, r, n) {
    const a = new Map();
    for (const s of r) {
      const i = ce(s.shape[e]);
      if (!i.length)
        throw new Error(
          `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
        );
      for (const o of i) {
        if (a.has(o))
          throw new Error(
            `Discriminator property ${String(e)} has duplicate value ${String(o)}`,
          );
        a.set(o, s);
      }
    }
    return new Ot({
      typeName: f.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: a,
      ...k(n),
    });
  }
}
function Ft(t, e) {
  const r = pe(t),
    n = pe(e);
  if (t === e) return { valid: !0, data: t };
  if (r === g.object && n === g.object) {
    const a = O.objectKeys(e),
      s = O.objectKeys(t).filter(o => a.indexOf(o) !== -1),
      i = { ...t, ...e };
    for (const o of s) {
      const c = Ft(t[o], e[o]);
      if (!c.valid) return { valid: !1 };
      i[o] = c.data;
    }
    return { valid: !0, data: i };
  } else if (r === g.array && n === g.array) {
    if (t.length !== e.length) return { valid: !1 };
    const a = [];
    for (let s = 0; s < t.length; s++) {
      const i = t[s],
        o = e[s],
        c = Ft(i, o);
      if (!c.valid) return { valid: !1 };
      a.push(c.data);
    }
    return { valid: !0, data: a };
  } else
    return r === g.date && n === g.date && +t == +e
      ? { valid: !0, data: t }
      : { valid: !1 };
}
class Ye extends x {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e),
      a = (s, i) => {
        if (Ut(s) || Ut(i)) return v;
        const o = Ft(s.value, i.value);
        return o.valid
          ? ((zt(s) || zt(i)) && r.dirty(), { status: r.value, value: o.data })
          : (h(n, { code: d.invalid_intersection_types }), v);
      };
    return n.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseAsync({
            data: n.data,
            path: n.path,
            parent: n,
          }),
        ]).then(([s, i]) => a(s, i))
      : a(
          this._def.left._parseSync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseSync({ data: n.data, path: n.path, parent: n }),
        );
  }
}
Ye.create = (t, e, r) =>
  new Ye({ left: t, right: e, typeName: f.ZodIntersection, ...k(r) });
class se extends x {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== g.array)
      return (
        h(n, {
          code: d.invalid_type,
          expected: g.array,
          received: n.parsedType,
        }),
        v
      );
    if (n.data.length < this._def.items.length)
      return (
        h(n, {
          code: d.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: 'array',
        }),
        v
      );
    !this._def.rest &&
      n.data.length > this._def.items.length &&
      (h(n, {
        code: d.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: 'array',
      }),
      r.dirty());
    const s = [...n.data]
      .map((i, o) => {
        const c = this._def.items[o] || this._def.rest;
        return c ? c._parse(new ae(n, i, n.path, o)) : null;
      })
      .filter(i => !!i);
    return n.common.async
      ? Promise.all(s).then(i => B.mergeArray(r, i))
      : B.mergeArray(r, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new se({ ...this._def, rest: e });
  }
}
se.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new se({ items: t, typeName: f.ZodTuple, rest: null, ...k(e) });
};
class Ke extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== g.object)
      return (
        h(n, {
          code: d.invalid_type,
          expected: g.object,
          received: n.parsedType,
        }),
        v
      );
    const a = [],
      s = this._def.keyType,
      i = this._def.valueType;
    for (const o in n.data)
      a.push({
        key: s._parse(new ae(n, o, n.path, o)),
        value: i._parse(new ae(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data,
      });
    return n.common.async ? B.mergeObjectAsync(r, a) : B.mergeObjectSync(r, a);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, n) {
    return r instanceof x
      ? new Ke({ keyType: e, valueType: r, typeName: f.ZodRecord, ...k(n) })
      : new Ke({
          keyType: ee.create(),
          valueType: e,
          typeName: f.ZodRecord,
          ...k(r),
        });
  }
}
class bt extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== g.map)
      return (
        h(n, { code: d.invalid_type, expected: g.map, received: n.parsedType }),
        v
      );
    const a = this._def.keyType,
      s = this._def.valueType,
      i = [...n.data.entries()].map(([o, c], l) => ({
        key: a._parse(new ae(n, o, n.path, [l, 'key'])),
        value: s._parse(new ae(n, c, n.path, [l, 'value'])),
      }));
    if (n.common.async) {
      const o = new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const l = await c.key,
            u = await c.value;
          if (l.status === 'aborted' || u.status === 'aborted') return v;
          (l.status === 'dirty' || u.status === 'dirty') && r.dirty(),
            o.set(l.value, u.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = new Map();
      for (const c of i) {
        const l = c.key,
          u = c.value;
        if (l.status === 'aborted' || u.status === 'aborted') return v;
        (l.status === 'dirty' || u.status === 'dirty') && r.dirty(),
          o.set(l.value, u.value);
      }
      return { status: r.value, value: o };
    }
  }
}
bt.create = (t, e, r) =>
  new bt({ valueType: e, keyType: t, typeName: f.ZodMap, ...k(r) });
class xe extends x {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== g.set)
      return (
        h(n, { code: d.invalid_type, expected: g.set, received: n.parsedType }),
        v
      );
    const a = this._def;
    a.minSize !== null &&
      n.data.size < a.minSize.value &&
      (h(n, {
        code: d.too_small,
        minimum: a.minSize.value,
        type: 'set',
        inclusive: !0,
        exact: !1,
        message: a.minSize.message,
      }),
      r.dirty()),
      a.maxSize !== null &&
        n.data.size > a.maxSize.value &&
        (h(n, {
          code: d.too_big,
          maximum: a.maxSize.value,
          type: 'set',
          inclusive: !0,
          exact: !1,
          message: a.maxSize.message,
        }),
        r.dirty());
    const s = this._def.valueType;
    function i(c) {
      const l = new Set();
      for (const u of c) {
        if (u.status === 'aborted') return v;
        u.status === 'dirty' && r.dirty(), l.add(u.value);
      }
      return { status: r.value, value: l };
    }
    const o = [...n.data.values()].map((c, l) =>
      s._parse(new ae(n, c, n.path, l)),
    );
    return n.common.async ? Promise.all(o).then(c => i(c)) : i(o);
  }
  min(e, r) {
    return new xe({
      ...this._def,
      minSize: { value: e, message: y.toString(r) },
    });
  }
  max(e, r) {
    return new xe({
      ...this._def,
      maxSize: { value: e, message: y.toString(r) },
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
xe.create = (t, e) =>
  new xe({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: f.ZodSet,
    ...k(e),
  });
class Ce extends x {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.function)
      return (
        h(r, {
          code: d.invalid_type,
          expected: g.function,
          received: r.parsedType,
        }),
        v
      );
    function n(o, c) {
      return gt({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          mt(),
          Ze,
        ].filter(l => !!l),
        issueData: { code: d.invalid_arguments, argumentsError: c },
      });
    }
    function a(o, c) {
      return gt({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          mt(),
          Ze,
        ].filter(l => !!l),
        issueData: { code: d.invalid_return_type, returnTypeError: c },
      });
    }
    const s = { errorMap: r.common.contextualErrorMap },
      i = r.data;
    if (this._def.returns instanceof De) {
      const o = this;
      return W(async function (...c) {
        const l = new K([]),
          u = await o._def.args.parseAsync(c, s).catch(_ => {
            throw (l.addIssue(n(c, _)), l);
          }),
          p = await Reflect.apply(i, this, u);
        return await o._def.returns._def.type.parseAsync(p, s).catch(_ => {
          throw (l.addIssue(a(p, _)), l);
        });
      });
    } else {
      const o = this;
      return W(function (...c) {
        const l = o._def.args.safeParse(c, s);
        if (!l.success) throw new K([n(c, l.error)]);
        const u = Reflect.apply(i, this, l.data),
          p = o._def.returns.safeParse(u, s);
        if (!p.success) throw new K([a(u, p.error)]);
        return p.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Ce({ ...this._def, args: se.create(e).rest(ke.create()) });
  }
  returns(e) {
    return new Ce({ ...this._def, returns: e });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, r, n) {
    return new Ce({
      args: e || se.create([]).rest(ke.create()),
      returns: r || ke.create(),
      typeName: f.ZodFunction,
      ...k(n),
    });
  }
}
class Ge extends x {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Ge.create = (t, e) => new Ge({ getter: t, typeName: f.ZodLazy, ...k(e) });
class He extends x {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return (
        h(r, {
          received: r.data,
          code: d.invalid_literal,
          expected: this._def.value,
        }),
        v
      );
    }
    return { status: 'valid', value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
He.create = (t, e) => new He({ value: t, typeName: f.ZodLiteral, ...k(e) });
function Br(t, e) {
  return new ge({ values: t, typeName: f.ZodEnum, ...k(e) });
}
class ge extends x {
  constructor() {
    super(...arguments), Le.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != 'string') {
      const r = this._getOrReturnCtx(e),
        n = this._def.values;
      return (
        h(r, {
          expected: O.joinValues(n),
          received: r.parsedType,
          code: d.invalid_type,
        }),
        v
      );
    }
    if (
      (yt(this, Le) || Vr(this, Le, new Set(this._def.values)),
      !yt(this, Le).has(e.data))
    ) {
      const r = this._getOrReturnCtx(e),
        n = this._def.values;
      return (
        h(r, { received: r.data, code: d.invalid_enum_value, options: n }), v
      );
    }
    return W(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values) e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values) e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values) e[r] = r;
    return e;
  }
  extract(e, r = this._def) {
    return ge.create(e, { ...this._def, ...r });
  }
  exclude(e, r = this._def) {
    return ge.create(
      this.options.filter(n => !e.includes(n)),
      { ...this._def, ...r },
    );
  }
}
Le = new WeakMap();
ge.create = Br;
class Xe extends x {
  constructor() {
    super(...arguments), Ve.set(this, void 0);
  }
  _parse(e) {
    const r = O.getValidEnumValues(this._def.values),
      n = this._getOrReturnCtx(e);
    if (n.parsedType !== g.string && n.parsedType !== g.number) {
      const a = O.objectValues(r);
      return (
        h(n, {
          expected: O.joinValues(a),
          received: n.parsedType,
          code: d.invalid_type,
        }),
        v
      );
    }
    if (
      (yt(this, Ve) ||
        Vr(this, Ve, new Set(O.getValidEnumValues(this._def.values))),
      !yt(this, Ve).has(e.data))
    ) {
      const a = O.objectValues(r);
      return (
        h(n, { received: n.data, code: d.invalid_enum_value, options: a }), v
      );
    }
    return W(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Ve = new WeakMap();
Xe.create = (t, e) => new Xe({ values: t, typeName: f.ZodNativeEnum, ...k(e) });
class De extends x {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.promise && r.common.async === !1)
      return (
        h(r, {
          code: d.invalid_type,
          expected: g.promise,
          received: r.parsedType,
        }),
        v
      );
    const n = r.parsedType === g.promise ? r.data : Promise.resolve(r.data);
    return W(
      n.then(a =>
        this._def.type.parseAsync(a, {
          path: r.path,
          errorMap: r.common.contextualErrorMap,
        }),
      ),
    );
  }
}
De.create = (t, e) => new De({ type: t, typeName: f.ZodPromise, ...k(e) });
class ne extends x {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === f.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e),
      a = this._def.effect || null,
      s = {
        addIssue: i => {
          h(n, i), i.fatal ? r.abort() : r.dirty();
        },
        get path() {
          return n.path;
        },
      };
    if (((s.addIssue = s.addIssue.bind(s)), a.type === 'preprocess')) {
      const i = a.transform(n.data, s);
      if (n.common.async)
        return Promise.resolve(i).then(async o => {
          if (r.value === 'aborted') return v;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: n.path,
            parent: n,
          });
          return c.status === 'aborted'
            ? v
            : c.status === 'dirty' || r.value === 'dirty'
              ? Ne(c.value)
              : c;
        });
      {
        if (r.value === 'aborted') return v;
        const o = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n,
        });
        return o.status === 'aborted'
          ? v
          : o.status === 'dirty' || r.value === 'dirty'
            ? Ne(o.value)
            : o;
      }
    }
    if (a.type === 'refinement') {
      const i = o => {
        const c = a.refinement(o, s);
        if (n.common.async) return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.',
          );
        return o;
      };
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return o.status === 'aborted'
          ? v
          : (o.status === 'dirty' && r.dirty(),
            i(o.value),
            { status: r.value, value: o.value });
      } else
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then(o =>
            o.status === 'aborted'
              ? v
              : (o.status === 'dirty' && r.dirty(),
                i(o.value).then(() => ({ status: r.value, value: o.value }))),
          );
    }
    if (a.type === 'transform')
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        if (!ze(i)) return i;
        const o = a.transform(i.value, s);
        if (o instanceof Promise)
          throw new Error(
            'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.',
          );
        return { status: r.value, value: o };
      } else
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then(i =>
            ze(i)
              ? Promise.resolve(a.transform(i.value, s)).then(o => ({
                  status: r.value,
                  value: o,
                }))
              : i,
          );
    O.assertNever(a);
  }
}
ne.create = (t, e, r) =>
  new ne({ schema: t, typeName: f.ZodEffects, effect: e, ...k(r) });
ne.createWithPreprocess = (t, e, r) =>
  new ne({
    schema: e,
    effect: { type: 'preprocess', transform: t },
    typeName: f.ZodEffects,
    ...k(r),
  });
class re extends x {
  _parse(e) {
    return this._getType(e) === g.undefined
      ? W(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
re.create = (t, e) =>
  new re({ innerType: t, typeName: f.ZodOptional, ...k(e) });
class ye extends x {
  _parse(e) {
    return this._getType(e) === g.null
      ? W(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ye.create = (t, e) =>
  new ye({ innerType: t, typeName: f.ZodNullable, ...k(e) });
class Qe extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return (
      r.parsedType === g.undefined && (n = this._def.defaultValue()),
      this._def.innerType._parse({ data: n, path: r.path, parent: r })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Qe.create = (t, e) =>
  new Qe({
    innerType: t,
    typeName: f.ZodDefault,
    defaultValue: typeof e.default == 'function' ? e.default : () => e.default,
    ...k(e),
  });
class et extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e),
      n = { ...r, common: { ...r.common, issues: [] } },
      a = this._def.innerType._parse({
        data: n.data,
        path: n.path,
        parent: { ...n },
      });
    return Fe(a)
      ? a.then(s => ({
          status: 'valid',
          value:
            s.status === 'valid'
              ? s.value
              : this._def.catchValue({
                  get error() {
                    return new K(n.common.issues);
                  },
                  input: n.data,
                }),
        }))
      : {
          status: 'valid',
          value:
            a.status === 'valid'
              ? a.value
              : this._def.catchValue({
                  get error() {
                    return new K(n.common.issues);
                  },
                  input: n.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
et.create = (t, e) =>
  new et({
    innerType: t,
    typeName: f.ZodCatch,
    catchValue: typeof e.catch == 'function' ? e.catch : () => e.catch,
    ...k(e),
  });
class kt extends x {
  _parse(e) {
    if (this._getType(e) !== g.nan) {
      const n = this._getOrReturnCtx(e);
      return (
        h(n, { code: d.invalid_type, expected: g.nan, received: n.parsedType }),
        v
      );
    }
    return { status: 'valid', value: e.data };
  }
}
kt.create = t => new kt({ typeName: f.ZodNaN, ...k(t) });
const ma = Symbol('zod_brand');
class Ht extends x {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e),
      n = r.data;
    return this._def.type._parse({ data: n, path: r.path, parent: r });
  }
  unwrap() {
    return this._def.type;
  }
}
class ct extends x {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return s.status === 'aborted'
          ? v
          : s.status === 'dirty'
            ? (r.dirty(), Ne(s.value))
            : this._def.out._parseAsync({
                data: s.value,
                path: n.path,
                parent: n,
              });
      })();
    {
      const a = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n,
      });
      return a.status === 'aborted'
        ? v
        : a.status === 'dirty'
          ? (r.dirty(), { status: 'dirty', value: a.value })
          : this._def.out._parseSync({
              data: a.value,
              path: n.path,
              parent: n,
            });
    }
  }
  static create(e, r) {
    return new ct({ in: e, out: r, typeName: f.ZodPipeline });
  }
}
class tt extends x {
  _parse(e) {
    const r = this._def.innerType._parse(e),
      n = a => (ze(a) && (a.value = Object.freeze(a.value)), a);
    return Fe(r) ? r.then(a => n(a)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
tt.create = (t, e) =>
  new tt({ innerType: t, typeName: f.ZodReadonly, ...k(e) });
function Jr(t, e = {}, r) {
  return t
    ? je.create().superRefine((n, a) => {
        var s, i;
        if (!t(n)) {
          const o =
              typeof e == 'function'
                ? e(n)
                : typeof e == 'string'
                  ? { message: e }
                  : e,
            c =
              (i = (s = o.fatal) !== null && s !== void 0 ? s : r) !== null &&
              i !== void 0
                ? i
                : !0,
            l = typeof o == 'string' ? { message: o } : o;
          a.addIssue({ code: 'custom', ...l, fatal: c });
        }
      })
    : je.create();
}
const ga = { object: $.lazycreate };
var f;
(function (t) {
  (t.ZodString = 'ZodString'),
    (t.ZodNumber = 'ZodNumber'),
    (t.ZodNaN = 'ZodNaN'),
    (t.ZodBigInt = 'ZodBigInt'),
    (t.ZodBoolean = 'ZodBoolean'),
    (t.ZodDate = 'ZodDate'),
    (t.ZodSymbol = 'ZodSymbol'),
    (t.ZodUndefined = 'ZodUndefined'),
    (t.ZodNull = 'ZodNull'),
    (t.ZodAny = 'ZodAny'),
    (t.ZodUnknown = 'ZodUnknown'),
    (t.ZodNever = 'ZodNever'),
    (t.ZodVoid = 'ZodVoid'),
    (t.ZodArray = 'ZodArray'),
    (t.ZodObject = 'ZodObject'),
    (t.ZodUnion = 'ZodUnion'),
    (t.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
    (t.ZodIntersection = 'ZodIntersection'),
    (t.ZodTuple = 'ZodTuple'),
    (t.ZodRecord = 'ZodRecord'),
    (t.ZodMap = 'ZodMap'),
    (t.ZodSet = 'ZodSet'),
    (t.ZodFunction = 'ZodFunction'),
    (t.ZodLazy = 'ZodLazy'),
    (t.ZodLiteral = 'ZodLiteral'),
    (t.ZodEnum = 'ZodEnum'),
    (t.ZodEffects = 'ZodEffects'),
    (t.ZodNativeEnum = 'ZodNativeEnum'),
    (t.ZodOptional = 'ZodOptional'),
    (t.ZodNullable = 'ZodNullable'),
    (t.ZodDefault = 'ZodDefault'),
    (t.ZodCatch = 'ZodCatch'),
    (t.ZodPromise = 'ZodPromise'),
    (t.ZodBranded = 'ZodBranded'),
    (t.ZodPipeline = 'ZodPipeline'),
    (t.ZodReadonly = 'ZodReadonly');
})(f || (f = {}));
const ya = (t, e = { message: `Input not instance of ${t.name}` }) =>
    Jr(r => r instanceof t, e),
  Wr = ee.create,
  qr = he.create,
  _a = kt.create,
  va = me.create,
  Yr = Be.create,
  ba = we.create,
  ka = _t.create,
  wa = Je.create,
  xa = We.create,
  Ta = je.create,
  Ea = ke.create,
  Sa = de.create,
  Ia = vt.create,
  Aa = te.create,
  Oa = $.create,
  Na = $.strictCreate,
  Ca = qe.create,
  Ra = Ot.create,
  Pa = Ye.create,
  Za = se.create,
  ja = Ke.create,
  Da = bt.create,
  Ma = xe.create,
  $a = Ce.create,
  La = Ge.create,
  Va = He.create,
  Ua = ge.create,
  za = Xe.create,
  Fa = De.create,
  pr = ne.create,
  Ba = re.create,
  Ja = ye.create,
  Wa = ne.createWithPreprocess,
  qa = ct.create,
  Ya = () => Wr().optional(),
  Ka = () => qr().optional(),
  Ga = () => Yr().optional(),
  Ha = {
    string: t => ee.create({ ...t, coerce: !0 }),
    number: t => he.create({ ...t, coerce: !0 }),
    boolean: t => Be.create({ ...t, coerce: !0 }),
    bigint: t => me.create({ ...t, coerce: !0 }),
    date: t => we.create({ ...t, coerce: !0 }),
  },
  Xa = v;
var $i = Object.freeze({
  __proto__: null,
  defaultErrorMap: Ze,
  setErrorMap: Xn,
  getErrorMap: mt,
  makeIssue: gt,
  EMPTY_PATH: Qn,
  addIssueToContext: h,
  ParseStatus: B,
  INVALID: v,
  DIRTY: Ne,
  OK: W,
  isAborted: Ut,
  isDirty: zt,
  isValid: ze,
  isAsync: Fe,
  get util() {
    return O;
  },
  get objectUtil() {
    return Vt;
  },
  ZodParsedType: g,
  getParsedType: pe,
  ZodType: x,
  datetimeRegex: Fr,
  ZodString: ee,
  ZodNumber: he,
  ZodBigInt: me,
  ZodBoolean: Be,
  ZodDate: we,
  ZodSymbol: _t,
  ZodUndefined: Je,
  ZodNull: We,
  ZodAny: je,
  ZodUnknown: ke,
  ZodNever: de,
  ZodVoid: vt,
  ZodArray: te,
  ZodObject: $,
  ZodUnion: qe,
  ZodDiscriminatedUnion: Ot,
  ZodIntersection: Ye,
  ZodTuple: se,
  ZodRecord: Ke,
  ZodMap: bt,
  ZodSet: xe,
  ZodFunction: Ce,
  ZodLazy: Ge,
  ZodLiteral: He,
  ZodEnum: ge,
  ZodNativeEnum: Xe,
  ZodPromise: De,
  ZodEffects: ne,
  ZodTransformer: ne,
  ZodOptional: re,
  ZodNullable: ye,
  ZodDefault: Qe,
  ZodCatch: et,
  ZodNaN: kt,
  BRAND: ma,
  ZodBranded: Ht,
  ZodPipeline: ct,
  ZodReadonly: tt,
  custom: Jr,
  Schema: x,
  ZodSchema: x,
  late: ga,
  get ZodFirstPartyTypeKind() {
    return f;
  },
  coerce: Ha,
  any: Ta,
  array: Aa,
  bigint: va,
  boolean: Yr,
  date: ba,
  discriminatedUnion: Ra,
  effect: pr,
  enum: Ua,
  function: $a,
  instanceof: ya,
  intersection: Pa,
  lazy: La,
  literal: Va,
  map: Da,
  nan: _a,
  nativeEnum: za,
  never: Sa,
  null: xa,
  nullable: Ja,
  number: qr,
  object: Oa,
  oboolean: Ga,
  onumber: Ka,
  optional: Ba,
  ostring: Ya,
  pipeline: qa,
  preprocess: Wa,
  promise: Fa,
  record: ja,
  set: Ma,
  strictObject: Na,
  string: Wr,
  symbol: ka,
  transformer: pr,
  tuple: Za,
  undefined: wa,
  union: Ca,
  unknown: Ea,
  void: Ia,
  NEVER: Xa,
  ZodIssueCode: d,
  quotelessJson: Hn,
  ZodError: K,
});
function Qa() {
  return {};
}
function es(t, e) {
  const r = { type: 'array' };
  return (
    t.type?._def &&
      t.type?._def?.typeName !== f.ZodAny &&
      (r.items = R(t.type._def, {
        ...e,
        currentPath: [...e.currentPath, 'items'],
      })),
    t.minLength && j(r, 'minItems', t.minLength.value, t.minLength.message, e),
    t.maxLength && j(r, 'maxItems', t.maxLength.value, t.maxLength.message, e),
    t.exactLength &&
      (j(r, 'minItems', t.exactLength.value, t.exactLength.message, e),
      j(r, 'maxItems', t.exactLength.value, t.exactLength.message, e)),
    r
  );
}
function ts(t, e) {
  const r = { type: 'integer', format: 'int64' };
  if (!t.checks) return r;
  for (const n of t.checks)
    switch (n.kind) {
      case 'min':
        e.target === 'jsonSchema7'
          ? n.inclusive
            ? j(r, 'minimum', n.value, n.message, e)
            : j(r, 'exclusiveMinimum', n.value, n.message, e)
          : (n.inclusive || (r.exclusiveMinimum = !0),
            j(r, 'minimum', n.value, n.message, e));
        break;
      case 'max':
        e.target === 'jsonSchema7'
          ? n.inclusive
            ? j(r, 'maximum', n.value, n.message, e)
            : j(r, 'exclusiveMaximum', n.value, n.message, e)
          : (n.inclusive || (r.exclusiveMaximum = !0),
            j(r, 'maximum', n.value, n.message, e));
        break;
      case 'multipleOf':
        j(r, 'multipleOf', n.value, n.message, e);
        break;
    }
  return r;
}
function rs() {
  return { type: 'boolean' };
}
function Kr(t, e) {
  return R(t.type._def, e);
}
const ns = (t, e) => R(t.innerType._def, e);
function Gr(t, e, r) {
  const n = r ?? e.dateStrategy;
  if (Array.isArray(n)) return { anyOf: n.map((a, s) => Gr(t, e, a)) };
  switch (n) {
    case 'string':
    case 'format:date-time':
      return { type: 'string', format: 'date-time' };
    case 'format:date':
      return { type: 'string', format: 'date' };
    case 'integer':
      return as(t, e);
  }
}
const as = (t, e) => {
  const r = { type: 'integer', format: 'unix-time' };
  if (e.target === 'openApi3') return r;
  for (const n of t.checks)
    switch (n.kind) {
      case 'min':
        j(r, 'minimum', n.value, n.message, e);
        break;
      case 'max':
        j(r, 'maximum', n.value, n.message, e);
        break;
    }
  return r;
};
function ss(t, e) {
  return { ...R(t.innerType._def, e), default: t.defaultValue() };
}
function is(t, e) {
  return e.effectStrategy === 'input' ? R(t.schema._def, e) : {};
}
function os(t) {
  return { type: 'string', enum: Array.from(t.values) };
}
const cs = t => ('type' in t && t.type === 'string' ? !1 : 'allOf' in t);
function ls(t, e) {
  const r = [
    R(t.left._def, { ...e, currentPath: [...e.currentPath, 'allOf', '0'] }),
    R(t.right._def, { ...e, currentPath: [...e.currentPath, 'allOf', '1'] }),
  ].filter(s => !!s);
  let n =
    e.target === 'jsonSchema2019-09' ? { unevaluatedProperties: !1 } : void 0;
  const a = [];
  return (
    r.forEach(s => {
      if (cs(s))
        a.push(...s.allOf), s.unevaluatedProperties === void 0 && (n = void 0);
      else {
        let i = s;
        if ('additionalProperties' in s && s.additionalProperties === !1) {
          const { additionalProperties: o, ...c } = s;
          i = c;
        } else n = void 0;
        a.push(i);
      }
    }),
    a.length ? { allOf: a, ...n } : void 0
  );
}
function us(t, e) {
  const r = typeof t.value;
  return r !== 'bigint' && r !== 'number' && r !== 'boolean' && r !== 'string'
    ? { type: Array.isArray(t.value) ? 'array' : 'object' }
    : e.target === 'openApi3'
      ? { type: r === 'bigint' ? 'integer' : r, enum: [t.value] }
      : { type: r === 'bigint' ? 'integer' : r, const: t.value };
}
let Dt;
const X = {
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  email:
    /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  emoji: () => (
    Dt === void 0 &&
      (Dt = RegExp(
        '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$',
        'u',
      )),
    Dt
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
function Hr(t, e) {
  const r = { type: 'string' };
  if (t.checks)
    for (const n of t.checks)
      switch (n.kind) {
        case 'min':
          j(
            r,
            'minLength',
            typeof r.minLength == 'number'
              ? Math.max(r.minLength, n.value)
              : n.value,
            n.message,
            e,
          );
          break;
        case 'max':
          j(
            r,
            'maxLength',
            typeof r.maxLength == 'number'
              ? Math.min(r.maxLength, n.value)
              : n.value,
            n.message,
            e,
          );
          break;
        case 'email':
          switch (e.emailStrategy) {
            case 'format:email':
              Q(r, 'email', n.message, e);
              break;
            case 'format:idn-email':
              Q(r, 'idn-email', n.message, e);
              break;
            case 'pattern:zod':
              J(r, X.email, n.message, e);
              break;
          }
          break;
        case 'url':
          Q(r, 'uri', n.message, e);
          break;
        case 'uuid':
          Q(r, 'uuid', n.message, e);
          break;
        case 'regex':
          J(r, n.regex, n.message, e);
          break;
        case 'cuid':
          J(r, X.cuid, n.message, e);
          break;
        case 'cuid2':
          J(r, X.cuid2, n.message, e);
          break;
        case 'startsWith':
          J(r, RegExp(`^${Mt(n.value, e)}`), n.message, e);
          break;
        case 'endsWith':
          J(r, RegExp(`${Mt(n.value, e)}$`), n.message, e);
          break;
        case 'datetime':
          Q(r, 'date-time', n.message, e);
          break;
        case 'date':
          Q(r, 'date', n.message, e);
          break;
        case 'time':
          Q(r, 'time', n.message, e);
          break;
        case 'duration':
          Q(r, 'duration', n.message, e);
          break;
        case 'length':
          j(
            r,
            'minLength',
            typeof r.minLength == 'number'
              ? Math.max(r.minLength, n.value)
              : n.value,
            n.message,
            e,
          ),
            j(
              r,
              'maxLength',
              typeof r.maxLength == 'number'
                ? Math.min(r.maxLength, n.value)
                : n.value,
              n.message,
              e,
            );
          break;
        case 'includes': {
          J(r, RegExp(Mt(n.value, e)), n.message, e);
          break;
        }
        case 'ip': {
          n.version !== 'v6' && Q(r, 'ipv4', n.message, e),
            n.version !== 'v4' && Q(r, 'ipv6', n.message, e);
          break;
        }
        case 'base64url':
          J(r, X.base64url, n.message, e);
          break;
        case 'jwt':
          J(r, X.jwt, n.message, e);
          break;
        case 'cidr': {
          n.version !== 'v6' && J(r, X.ipv4Cidr, n.message, e),
            n.version !== 'v4' && J(r, X.ipv6Cidr, n.message, e);
          break;
        }
        case 'emoji':
          J(r, X.emoji(), n.message, e);
          break;
        case 'ulid': {
          J(r, X.ulid, n.message, e);
          break;
        }
        case 'base64': {
          switch (e.base64Strategy) {
            case 'format:binary': {
              Q(r, 'binary', n.message, e);
              break;
            }
            case 'contentEncoding:base64': {
              j(r, 'contentEncoding', 'base64', n.message, e);
              break;
            }
            case 'pattern:zod': {
              J(r, X.base64, n.message, e);
              break;
            }
          }
          break;
        }
        case 'nanoid':
          J(r, X.nanoid, n.message, e);
      }
  return r;
}
function Mt(t, e) {
  return e.patternStrategy === 'escape' ? fs(t) : t;
}
const ds = new Set(
  'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789',
);
function fs(t) {
  let e = '';
  for (let r = 0; r < t.length; r++) ds.has(t[r]) || (e += '\\'), (e += t[r]);
  return e;
}
function Q(t, e, r, n) {
  t.format || t.anyOf?.some(a => a.format)
    ? (t.anyOf || (t.anyOf = []),
      t.format &&
        (t.anyOf.push({
          format: t.format,
          ...(t.errorMessage &&
            n.errorMessages && {
              errorMessage: { format: t.errorMessage.format },
            }),
        }),
        delete t.format,
        t.errorMessage &&
          (delete t.errorMessage.format,
          Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)),
      t.anyOf.push({
        format: e,
        ...(r && n.errorMessages && { errorMessage: { format: r } }),
      }))
    : j(t, 'format', e, r, n);
}
function J(t, e, r, n) {
  t.pattern || t.allOf?.some(a => a.pattern)
    ? (t.allOf || (t.allOf = []),
      t.pattern &&
        (t.allOf.push({
          pattern: t.pattern,
          ...(t.errorMessage &&
            n.errorMessages && {
              errorMessage: { pattern: t.errorMessage.pattern },
            }),
        }),
        delete t.pattern,
        t.errorMessage &&
          (delete t.errorMessage.pattern,
          Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)),
      t.allOf.push({
        pattern: hr(e, n),
        ...(r && n.errorMessages && { errorMessage: { pattern: r } }),
      }))
    : j(t, 'pattern', hr(e, n), r, n);
}
function hr(t, e) {
  if (!e.applyRegexFlags || !t.flags) return t.source;
  const r = {
      i: t.flags.includes('i'),
      m: t.flags.includes('m'),
      s: t.flags.includes('s'),
    },
    n = r.i ? t.source.toLowerCase() : t.source;
  let a = '',
    s = !1,
    i = !1,
    o = !1;
  for (let c = 0; c < n.length; c++) {
    if (s) {
      (a += n[c]), (s = !1);
      continue;
    }
    if (r.i) {
      if (i) {
        if (n[c].match(/[a-z]/)) {
          o
            ? ((a += n[c]),
              (a += `${n[c - 2]}-${n[c]}`.toUpperCase()),
              (o = !1))
            : n[c + 1] === '-' && n[c + 2]?.match(/[a-z]/)
              ? ((a += n[c]), (o = !0))
              : (a += `${n[c]}${n[c].toUpperCase()}`);
          continue;
        }
      } else if (n[c].match(/[a-z]/)) {
        a += `[${n[c]}${n[c].toUpperCase()}]`;
        continue;
      }
    }
    if (r.m) {
      if (n[c] === '^') {
        a += `(^|(?<=[\r
]))`;
        continue;
      } else if (n[c] === '$') {
        a += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (r.s && n[c] === '.') {
      a += i
        ? `${n[c]}\r
`
        : `[${n[c]}\r
]`;
      continue;
    }
    (a += n[c]),
      n[c] === '\\'
        ? (s = !0)
        : i && n[c] === ']'
          ? (i = !1)
          : !i && n[c] === '[' && (i = !0);
  }
  try {
    new RegExp(a);
  } catch {
    return (
      console.warn(
        `Could not convert regex pattern at ${e.currentPath.join('/')} to a flag-independent form! Falling back to the flag-ignorant source`,
      ),
      t.source
    );
  }
  return a;
}
function Xr(t, e) {
  if (
    (e.target === 'openAi' &&
      console.warn(
        'Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.',
      ),
    e.target === 'openApi3' && t.keyType?._def.typeName === f.ZodEnum)
  )
    return {
      type: 'object',
      required: t.keyType._def.values,
      properties: t.keyType._def.values.reduce(
        (n, a) => ({
          ...n,
          [a]:
            R(t.valueType._def, {
              ...e,
              currentPath: [...e.currentPath, 'properties', a],
            }) ?? {},
        }),
        {},
      ),
      additionalProperties: !1,
    };
  const r = {
    type: 'object',
    additionalProperties:
      R(t.valueType._def, {
        ...e,
        currentPath: [...e.currentPath, 'additionalProperties'],
      }) ?? {},
  };
  if (e.target === 'openApi3') return r;
  if (
    t.keyType?._def.typeName === f.ZodString &&
    t.keyType._def.checks?.length
  ) {
    const { type: n, ...a } = Hr(t.keyType._def, e);
    return { ...r, propertyNames: a };
  } else {
    if (t.keyType?._def.typeName === f.ZodEnum)
      return { ...r, propertyNames: { enum: t.keyType._def.values } };
    if (
      t.keyType?._def.typeName === f.ZodBranded &&
      t.keyType._def.type._def.typeName === f.ZodString &&
      t.keyType._def.type._def.checks?.length
    ) {
      const { type: n, ...a } = Kr(t.keyType._def, e);
      return { ...r, propertyNames: a };
    }
  }
  return r;
}
function ps(t, e) {
  if (e.mapStrategy === 'record') return Xr(t, e);
  const r =
      R(t.keyType._def, {
        ...e,
        currentPath: [...e.currentPath, 'items', 'items', '0'],
      }) || {},
    n =
      R(t.valueType._def, {
        ...e,
        currentPath: [...e.currentPath, 'items', 'items', '1'],
      }) || {};
  return {
    type: 'array',
    maxItems: 125,
    items: { type: 'array', items: [r, n], minItems: 2, maxItems: 2 },
  };
}
function hs(t) {
  const e = t.values,
    n = Object.keys(t.values)
      .filter(s => typeof e[e[s]] != 'number')
      .map(s => e[s]),
    a = Array.from(new Set(n.map(s => typeof s)));
  return {
    type:
      a.length === 1
        ? a[0] === 'string'
          ? 'string'
          : 'number'
        : ['string', 'number'],
    enum: n,
  };
}
function ms() {
  return { not: {} };
}
function gs(t) {
  return t.target === 'openApi3'
    ? { enum: ['null'], nullable: !0 }
    : { type: 'null' };
}
const wt = {
  ZodString: 'string',
  ZodNumber: 'number',
  ZodBigInt: 'integer',
  ZodBoolean: 'boolean',
  ZodNull: 'null',
};
function ys(t, e) {
  if (e.target === 'openApi3') return mr(t, e);
  const r =
    t.options instanceof Map ? Array.from(t.options.values()) : t.options;
  if (
    r.every(
      n => n._def.typeName in wt && (!n._def.checks || !n._def.checks.length),
    )
  ) {
    const n = r.reduce((a, s) => {
      const i = wt[s._def.typeName];
      return i && !a.includes(i) ? [...a, i] : a;
    }, []);
    return { type: n.length > 1 ? n : n[0] };
  } else if (r.every(n => n._def.typeName === 'ZodLiteral' && !n.description)) {
    const n = r.reduce((a, s) => {
      const i = typeof s._def.value;
      switch (i) {
        case 'string':
        case 'number':
        case 'boolean':
          return [...a, i];
        case 'bigint':
          return [...a, 'integer'];
        case 'object':
          if (s._def.value === null) return [...a, 'null'];
        case 'symbol':
        case 'undefined':
        case 'function':
        default:
          return a;
      }
    }, []);
    if (n.length === r.length) {
      const a = n.filter((s, i, o) => o.indexOf(s) === i);
      return {
        type: a.length > 1 ? a : a[0],
        enum: r.reduce(
          (s, i) => (s.includes(i._def.value) ? s : [...s, i._def.value]),
          [],
        ),
      };
    }
  } else if (r.every(n => n._def.typeName === 'ZodEnum'))
    return {
      type: 'string',
      enum: r.reduce(
        (n, a) => [...n, ...a._def.values.filter(s => !n.includes(s))],
        [],
      ),
    };
  return mr(t, e);
}
const mr = (t, e) => {
  const r = (
    t.options instanceof Map ? Array.from(t.options.values()) : t.options
  )
    .map((n, a) =>
      R(n._def, { ...e, currentPath: [...e.currentPath, 'anyOf', `${a}`] }),
    )
    .filter(
      n =>
        !!n &&
        (!e.strictUnions ||
          (typeof n == 'object' && Object.keys(n).length > 0)),
    );
  return r.length ? { anyOf: r } : void 0;
};
function _s(t, e) {
  if (
    ['ZodString', 'ZodNumber', 'ZodBigInt', 'ZodBoolean', 'ZodNull'].includes(
      t.innerType._def.typeName,
    ) &&
    (!t.innerType._def.checks || !t.innerType._def.checks.length)
  )
    return e.target === 'openApi3'
      ? { type: wt[t.innerType._def.typeName], nullable: !0 }
      : { type: [wt[t.innerType._def.typeName], 'null'] };
  if (e.target === 'openApi3') {
    const n = R(t.innerType._def, { ...e, currentPath: [...e.currentPath] });
    return n && '$ref' in n
      ? { allOf: [n], nullable: !0 }
      : n && { ...n, nullable: !0 };
  }
  const r = R(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, 'anyOf', '0'],
  });
  return r && { anyOf: [r, { type: 'null' }] };
}
function vs(t, e) {
  const r = { type: 'number' };
  if (!t.checks) return r;
  for (const n of t.checks)
    switch (n.kind) {
      case 'int':
        (r.type = 'integer'), $r(r, 'type', n.message, e);
        break;
      case 'min':
        e.target === 'jsonSchema7'
          ? n.inclusive
            ? j(r, 'minimum', n.value, n.message, e)
            : j(r, 'exclusiveMinimum', n.value, n.message, e)
          : (n.inclusive || (r.exclusiveMinimum = !0),
            j(r, 'minimum', n.value, n.message, e));
        break;
      case 'max':
        e.target === 'jsonSchema7'
          ? n.inclusive
            ? j(r, 'maximum', n.value, n.message, e)
            : j(r, 'exclusiveMaximum', n.value, n.message, e)
          : (n.inclusive || (r.exclusiveMaximum = !0),
            j(r, 'maximum', n.value, n.message, e));
        break;
      case 'multipleOf':
        j(r, 'multipleOf', n.value, n.message, e);
        break;
    }
  return r;
}
function bs(t, e) {
  return e.removeAdditionalStrategy === 'strict'
    ? t.catchall._def.typeName === 'ZodNever'
      ? t.unknownKeys !== 'strict'
      : (R(t.catchall._def, {
          ...e,
          currentPath: [...e.currentPath, 'additionalProperties'],
        }) ?? !0)
    : t.catchall._def.typeName === 'ZodNever'
      ? t.unknownKeys === 'passthrough'
      : (R(t.catchall._def, {
          ...e,
          currentPath: [...e.currentPath, 'additionalProperties'],
        }) ?? !0);
}
function ks(t, e) {
  const r = e.target === 'openAi',
    n = {
      type: 'object',
      ...Object.entries(t.shape()).reduce(
        (a, [s, i]) => {
          if (i === void 0 || i._def === void 0) return a;
          let o = i.isOptional();
          o &&
            r &&
            (i instanceof re && (i = i._def.innerType),
            i.isNullable() || (i = i.nullable()),
            (o = !1));
          const c = R(i._def, {
            ...e,
            currentPath: [...e.currentPath, 'properties', s],
            propertyPath: [...e.currentPath, 'properties', s],
          });
          return c === void 0
            ? a
            : {
                properties: { ...a.properties, [s]: c },
                required: o ? a.required : [...a.required, s],
              };
        },
        { properties: {}, required: [] },
      ),
      additionalProperties: bs(t, e),
    };
  return n.required.length || delete n.required, n;
}
const ws = (t, e) => {
    if (e.currentPath.toString() === e.propertyPath?.toString())
      return R(t.innerType._def, e);
    const r = R(t.innerType._def, {
      ...e,
      currentPath: [...e.currentPath, 'anyOf', '1'],
    });
    return r ? { anyOf: [{ not: {} }, r] } : {};
  },
  xs = (t, e) => {
    if (e.pipeStrategy === 'input') return R(t.in._def, e);
    if (e.pipeStrategy === 'output') return R(t.out._def, e);
    const r = R(t.in._def, {
        ...e,
        currentPath: [...e.currentPath, 'allOf', '0'],
      }),
      n = R(t.out._def, {
        ...e,
        currentPath: [...e.currentPath, 'allOf', r ? '1' : '0'],
      });
    return { allOf: [r, n].filter(a => a !== void 0) };
  };
function Ts(t, e) {
  return R(t.type._def, e);
}
function Es(t, e) {
  const n = {
    type: 'array',
    uniqueItems: !0,
    items: R(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, 'items'],
    }),
  };
  return (
    t.minSize && j(n, 'minItems', t.minSize.value, t.minSize.message, e),
    t.maxSize && j(n, 'maxItems', t.maxSize.value, t.maxSize.message, e),
    n
  );
}
function Ss(t, e) {
  return t.rest
    ? {
        type: 'array',
        minItems: t.items.length,
        items: t.items
          .map((r, n) =>
            R(r._def, {
              ...e,
              currentPath: [...e.currentPath, 'items', `${n}`],
            }),
          )
          .reduce((r, n) => (n === void 0 ? r : [...r, n]), []),
        additionalItems: R(t.rest._def, {
          ...e,
          currentPath: [...e.currentPath, 'additionalItems'],
        }),
      }
    : {
        type: 'array',
        minItems: t.items.length,
        maxItems: t.items.length,
        items: t.items
          .map((r, n) =>
            R(r._def, {
              ...e,
              currentPath: [...e.currentPath, 'items', `${n}`],
            }),
          )
          .reduce((r, n) => (n === void 0 ? r : [...r, n]), []),
      };
}
function Is() {
  return { not: {} };
}
function As() {
  return {};
}
const Os = (t, e) => R(t.innerType._def, e);
function R(t, e, r = !1) {
  const n = e.seen.get(t);
  if (e.override) {
    const i = e.override?.(t, e, n, r);
    if (i !== Yn) return i;
  }
  if (n && !r) {
    const i = Ns(n, e);
    if (i !== void 0) return i;
  }
  const a = { def: t, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(t, a);
  const s = Rs(t, t.typeName, e);
  return s && Ps(t, e, s), (a.jsonSchema = s), s;
}
const Ns = (t, e) => {
    switch (e.$refStrategy) {
      case 'root':
        return { $ref: t.path.join('/') };
      case 'relative':
        return { $ref: Cs(e.currentPath, t.path) };
      case 'none':
      case 'seen':
        return t.path.length < e.currentPath.length &&
          t.path.every((r, n) => e.currentPath[n] === r)
          ? (console.warn(
              `Recursive reference detected at ${e.currentPath.join('/')}! Defaulting to any`,
            ),
            {})
          : e.$refStrategy === 'seen'
            ? {}
            : void 0;
    }
  },
  Cs = (t, e) => {
    let r = 0;
    for (; r < t.length && r < e.length && t[r] === e[r]; r++);
    return [(t.length - r).toString(), ...e.slice(r)].join('/');
  },
  Rs = (t, e, r) => {
    switch (e) {
      case f.ZodString:
        return Hr(t, r);
      case f.ZodNumber:
        return vs(t, r);
      case f.ZodObject:
        return ks(t, r);
      case f.ZodBigInt:
        return ts(t, r);
      case f.ZodBoolean:
        return rs();
      case f.ZodDate:
        return Gr(t, r);
      case f.ZodUndefined:
        return Is();
      case f.ZodNull:
        return gs(r);
      case f.ZodArray:
        return es(t, r);
      case f.ZodUnion:
      case f.ZodDiscriminatedUnion:
        return ys(t, r);
      case f.ZodIntersection:
        return ls(t, r);
      case f.ZodTuple:
        return Ss(t, r);
      case f.ZodRecord:
        return Xr(t, r);
      case f.ZodLiteral:
        return us(t, r);
      case f.ZodEnum:
        return os(t);
      case f.ZodNativeEnum:
        return hs(t);
      case f.ZodNullable:
        return _s(t, r);
      case f.ZodOptional:
        return ws(t, r);
      case f.ZodMap:
        return ps(t, r);
      case f.ZodSet:
        return Es(t, r);
      case f.ZodLazy:
        return R(t.getter()._def, r);
      case f.ZodPromise:
        return Ts(t, r);
      case f.ZodNaN:
      case f.ZodNever:
        return ms();
      case f.ZodEffects:
        return is(t, r);
      case f.ZodAny:
        return Qa();
      case f.ZodUnknown:
        return As();
      case f.ZodDefault:
        return ss(t, r);
      case f.ZodBranded:
        return Kr(t, r);
      case f.ZodReadonly:
        return Os(t, r);
      case f.ZodCatch:
        return ns(t, r);
      case f.ZodPipeline:
        return xs(t, r);
      case f.ZodFunction:
      case f.ZodVoid:
      case f.ZodSymbol:
        return;
      default:
        return (n => {})();
    }
  },
  Ps = (t, e, r) => (
    t.description &&
      ((r.description = t.description),
      e.markdownDescription && (r.markdownDescription = t.description)),
    r
  ),
  Zs = (t, e) => {
    const r = Gn(e),
      n =
        typeof e == 'object' && e.definitions
          ? Object.entries(e.definitions).reduce(
              (c, [l, u]) => ({
                ...c,
                [l]:
                  R(
                    u._def,
                    { ...r, currentPath: [...r.basePath, r.definitionPath, l] },
                    !0,
                  ) ?? {},
              }),
              {},
            )
          : void 0,
      a =
        typeof e == 'string'
          ? e
          : e?.nameStrategy === 'title'
            ? void 0
            : e?.name,
      s =
        R(
          t._def,
          a === void 0
            ? r
            : { ...r, currentPath: [...r.basePath, r.definitionPath, a] },
          !1,
        ) ?? {},
      i =
        typeof e == 'object' && e.name !== void 0 && e.nameStrategy === 'title'
          ? e.name
          : void 0;
    i !== void 0 && (s.title = i);
    const o =
      a === void 0
        ? n
          ? { ...s, [r.definitionPath]: n }
          : s
        : {
            $ref: [
              ...(r.$refStrategy === 'relative' ? [] : r.basePath),
              r.definitionPath,
              a,
            ].join('/'),
            [r.definitionPath]: { ...n, [a]: s },
          };
    return (
      r.target === 'jsonSchema7'
        ? (o.$schema = 'http://json-schema.org/draft-07/schema#')
        : (r.target === 'jsonSchema2019-09' || r.target === 'openAi') &&
          (o.$schema = 'https://json-schema.org/draft/2019-09/schema#'),
      r.target === 'openAi' &&
        ('anyOf' in o ||
          'oneOf' in o ||
          'allOf' in o ||
          ('type' in o && Array.isArray(o.type))) &&
        console.warn(
          'Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.',
        ),
      o
    );
  };
var rt = {
    code: '0',
    name: 'text',
    parse: t => {
      if (typeof t != 'string')
        throw new Error('"text" parts expect a string value.');
      return { type: 'text', value: t };
    },
  },
  nt = {
    code: '3',
    name: 'error',
    parse: t => {
      if (typeof t != 'string')
        throw new Error('"error" parts expect a string value.');
      return { type: 'error', value: t };
    },
  },
  at = {
    code: '4',
    name: 'assistant_message',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('id' in t) ||
        !('role' in t) ||
        !('content' in t) ||
        typeof t.id != 'string' ||
        typeof t.role != 'string' ||
        t.role !== 'assistant' ||
        !Array.isArray(t.content) ||
        !t.content.every(
          e =>
            e != null &&
            typeof e == 'object' &&
            'type' in e &&
            e.type === 'text' &&
            'text' in e &&
            e.text != null &&
            typeof e.text == 'object' &&
            'value' in e.text &&
            typeof e.text.value == 'string',
        )
      )
        throw new Error(
          '"assistant_message" parts expect an object with an "id", "role", and "content" property.',
        );
      return { type: 'assistant_message', value: t };
    },
  },
  st = {
    code: '5',
    name: 'assistant_control_data',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('threadId' in t) ||
        !('messageId' in t) ||
        typeof t.threadId != 'string' ||
        typeof t.messageId != 'string'
      )
        throw new Error(
          '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.',
        );
      return {
        type: 'assistant_control_data',
        value: { threadId: t.threadId, messageId: t.messageId },
      };
    },
  },
  it = {
    code: '6',
    name: 'data_message',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('role' in t) ||
        !('data' in t) ||
        typeof t.role != 'string' ||
        t.role !== 'data'
      )
        throw new Error(
          '"data_message" parts expect an object with a "role" and "data" property.',
        );
      return { type: 'data_message', value: t };
    },
  },
  js = [rt, nt, at, st, it];
rt.code + '', nt.code + '', at.code + '', st.code + '', it.code + '';
rt.name + '',
  rt.code,
  nt.name + '',
  nt.code,
  at.name + '',
  at.code,
  st.name + '',
  st.code,
  it.name + '',
  it.code;
js.map(t => t.code);
function Ds({ promptTokens: t, completionTokens: e }) {
  return { promptTokens: t, completionTokens: e, totalTokens: t + e };
}
function Ms(t) {
  const e = ['ROOT'];
  let r = -1,
    n = null;
  function a(c, l, u) {
    switch (c) {
      case '"': {
        (r = l), e.pop(), e.push(u), e.push('INSIDE_STRING');
        break;
      }
      case 'f':
      case 't':
      case 'n': {
        (r = l), (n = l), e.pop(), e.push(u), e.push('INSIDE_LITERAL');
        break;
      }
      case '-': {
        e.pop(), e.push(u), e.push('INSIDE_NUMBER');
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
        (r = l), e.pop(), e.push(u), e.push('INSIDE_NUMBER');
        break;
      }
      case '{': {
        (r = l), e.pop(), e.push(u), e.push('INSIDE_OBJECT_START');
        break;
      }
      case '[': {
        (r = l), e.pop(), e.push(u), e.push('INSIDE_ARRAY_START');
        break;
      }
    }
  }
  function s(c, l) {
    switch (c) {
      case ',': {
        e.pop(), e.push('INSIDE_OBJECT_AFTER_COMMA');
        break;
      }
      case '}': {
        (r = l), e.pop();
        break;
      }
    }
  }
  function i(c, l) {
    switch (c) {
      case ',': {
        e.pop(), e.push('INSIDE_ARRAY_AFTER_COMMA');
        break;
      }
      case ']': {
        (r = l), e.pop();
        break;
      }
    }
  }
  for (let c = 0; c < t.length; c++) {
    const l = t[c];
    switch (e[e.length - 1]) {
      case 'ROOT':
        a(l, c, 'FINISH');
        break;
      case 'INSIDE_OBJECT_START': {
        switch (l) {
          case '"': {
            e.pop(), e.push('INSIDE_OBJECT_KEY');
            break;
          }
          case '}': {
            (r = c), e.pop();
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_AFTER_COMMA': {
        switch (l) {
          case '"': {
            e.pop(), e.push('INSIDE_OBJECT_KEY');
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_KEY': {
        switch (l) {
          case '"': {
            e.pop(), e.push('INSIDE_OBJECT_AFTER_KEY');
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_AFTER_KEY': {
        switch (l) {
          case ':': {
            e.pop(), e.push('INSIDE_OBJECT_BEFORE_VALUE');
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_BEFORE_VALUE': {
        a(l, c, 'INSIDE_OBJECT_AFTER_VALUE');
        break;
      }
      case 'INSIDE_OBJECT_AFTER_VALUE': {
        s(l, c);
        break;
      }
      case 'INSIDE_STRING': {
        switch (l) {
          case '"': {
            e.pop(), (r = c);
            break;
          }
          case '\\': {
            e.push('INSIDE_STRING_ESCAPE');
            break;
          }
          default:
            r = c;
        }
        break;
      }
      case 'INSIDE_ARRAY_START': {
        switch (l) {
          case ']': {
            (r = c), e.pop();
            break;
          }
          default: {
            (r = c), a(l, c, 'INSIDE_ARRAY_AFTER_VALUE');
            break;
          }
        }
        break;
      }
      case 'INSIDE_ARRAY_AFTER_VALUE': {
        switch (l) {
          case ',': {
            e.pop(), e.push('INSIDE_ARRAY_AFTER_COMMA');
            break;
          }
          case ']': {
            (r = c), e.pop();
            break;
          }
          default: {
            r = c;
            break;
          }
        }
        break;
      }
      case 'INSIDE_ARRAY_AFTER_COMMA': {
        a(l, c, 'INSIDE_ARRAY_AFTER_VALUE');
        break;
      }
      case 'INSIDE_STRING_ESCAPE': {
        e.pop(), (r = c);
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
            r = c;
            break;
          }
          case 'e':
          case 'E':
          case '-':
          case '.':
            break;
          case ',': {
            e.pop(),
              e[e.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(l, c),
              e[e.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE' && s(l, c);
            break;
          }
          case '}': {
            e.pop(), e[e.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE' && s(l, c);
            break;
          }
          case ']': {
            e.pop(), e[e.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(l, c);
            break;
          }
          default: {
            e.pop();
            break;
          }
        }
        break;
      }
      case 'INSIDE_LITERAL': {
        const p = t.substring(n, c + 1);
        !'false'.startsWith(p) && !'true'.startsWith(p) && !'null'.startsWith(p)
          ? (e.pop(),
            e[e.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE'
              ? s(l, c)
              : e[e.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(l, c))
          : (r = c);
        break;
      }
    }
  }
  let o = t.slice(0, r + 1);
  for (let c = e.length - 1; c >= 0; c--)
    switch (e[c]) {
      case 'INSIDE_STRING': {
        o += '"';
        break;
      }
      case 'INSIDE_OBJECT_KEY':
      case 'INSIDE_OBJECT_AFTER_KEY':
      case 'INSIDE_OBJECT_AFTER_COMMA':
      case 'INSIDE_OBJECT_START':
      case 'INSIDE_OBJECT_BEFORE_VALUE':
      case 'INSIDE_OBJECT_AFTER_VALUE': {
        o += '}';
        break;
      }
      case 'INSIDE_ARRAY_START':
      case 'INSIDE_ARRAY_AFTER_COMMA':
      case 'INSIDE_ARRAY_AFTER_VALUE': {
        o += ']';
        break;
      }
      case 'INSIDE_LITERAL': {
        const u = t.substring(n, t.length);
        'true'.startsWith(u)
          ? (o += 'true'.slice(u.length))
          : 'false'.startsWith(u)
            ? (o += 'false'.slice(u.length))
            : 'null'.startsWith(u) && (o += 'null'.slice(u.length));
      }
    }
  return o;
}
function Qr(t) {
  if (t === void 0) return { value: void 0, state: 'undefined-input' };
  let e = ur({ text: t });
  return e.success
    ? { value: e.value, state: 'successful-parse' }
    : ((e = ur({ text: Ms(t) })),
      e.success
        ? { value: e.value, state: 'repaired-parse' }
        : { value: void 0, state: 'failed-parse' });
}
var $s = {
    code: '0',
    name: 'text',
    parse: t => {
      if (typeof t != 'string')
        throw new Error('"text" parts expect a string value.');
      return { type: 'text', value: t };
    },
  },
  Ls = {
    code: '2',
    name: 'data',
    parse: t => {
      if (!Array.isArray(t))
        throw new Error('"data" parts expect an array value.');
      return { type: 'data', value: t };
    },
  },
  Vs = {
    code: '3',
    name: 'error',
    parse: t => {
      if (typeof t != 'string')
        throw new Error('"error" parts expect a string value.');
      return { type: 'error', value: t };
    },
  },
  Us = {
    code: '8',
    name: 'message_annotations',
    parse: t => {
      if (!Array.isArray(t))
        throw new Error('"message_annotations" parts expect an array value.');
      return { type: 'message_annotations', value: t };
    },
  },
  zs = {
    code: '9',
    name: 'tool_call',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('toolCallId' in t) ||
        typeof t.toolCallId != 'string' ||
        !('toolName' in t) ||
        typeof t.toolName != 'string' ||
        !('args' in t) ||
        typeof t.args != 'object'
      )
        throw new Error(
          '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.',
        );
      return { type: 'tool_call', value: t };
    },
  },
  Fs = {
    code: 'a',
    name: 'tool_result',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('toolCallId' in t) ||
        typeof t.toolCallId != 'string' ||
        !('result' in t)
      )
        throw new Error(
          '"tool_result" parts expect an object with a "toolCallId" and a "result" property.',
        );
      return { type: 'tool_result', value: t };
    },
  },
  Bs = {
    code: 'b',
    name: 'tool_call_streaming_start',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('toolCallId' in t) ||
        typeof t.toolCallId != 'string' ||
        !('toolName' in t) ||
        typeof t.toolName != 'string'
      )
        throw new Error(
          '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.',
        );
      return { type: 'tool_call_streaming_start', value: t };
    },
  },
  Js = {
    code: 'c',
    name: 'tool_call_delta',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('toolCallId' in t) ||
        typeof t.toolCallId != 'string' ||
        !('argsTextDelta' in t) ||
        typeof t.argsTextDelta != 'string'
      )
        throw new Error(
          '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.',
        );
      return { type: 'tool_call_delta', value: t };
    },
  },
  Ws = {
    code: 'd',
    name: 'finish_message',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('finishReason' in t) ||
        typeof t.finishReason != 'string'
      )
        throw new Error(
          '"finish_message" parts expect an object with a "finishReason" property.',
        );
      const e = { finishReason: t.finishReason };
      return (
        'usage' in t &&
          t.usage != null &&
          typeof t.usage == 'object' &&
          'promptTokens' in t.usage &&
          'completionTokens' in t.usage &&
          (e.usage = {
            promptTokens:
              typeof t.usage.promptTokens == 'number'
                ? t.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof t.usage.completionTokens == 'number'
                ? t.usage.completionTokens
                : Number.NaN,
          }),
        { type: 'finish_message', value: e }
      );
    },
  },
  qs = {
    code: 'e',
    name: 'finish_step',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('finishReason' in t) ||
        typeof t.finishReason != 'string'
      )
        throw new Error(
          '"finish_step" parts expect an object with a "finishReason" property.',
        );
      const e = { finishReason: t.finishReason, isContinued: !1 };
      return (
        'usage' in t &&
          t.usage != null &&
          typeof t.usage == 'object' &&
          'promptTokens' in t.usage &&
          'completionTokens' in t.usage &&
          (e.usage = {
            promptTokens:
              typeof t.usage.promptTokens == 'number'
                ? t.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof t.usage.completionTokens == 'number'
                ? t.usage.completionTokens
                : Number.NaN,
          }),
        'isContinued' in t &&
          typeof t.isContinued == 'boolean' &&
          (e.isContinued = t.isContinued),
        { type: 'finish_step', value: e }
      );
    },
  },
  Ys = {
    code: 'f',
    name: 'start_step',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('messageId' in t) ||
        typeof t.messageId != 'string'
      )
        throw new Error(
          '"start_step" parts expect an object with an "id" property.',
        );
      return { type: 'start_step', value: { messageId: t.messageId } };
    },
  },
  Ks = {
    code: 'g',
    name: 'reasoning',
    parse: t => {
      if (typeof t != 'string')
        throw new Error('"reasoning" parts expect a string value.');
      return { type: 'reasoning', value: t };
    },
  },
  Gs = {
    code: 'h',
    name: 'source',
    parse: t => {
      if (t == null || typeof t != 'object')
        throw new Error('"source" parts expect a Source object.');
      return { type: 'source', value: t };
    },
  },
  Hs = {
    code: 'i',
    name: 'redacted_reasoning',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('data' in t) ||
        typeof t.data != 'string'
      )
        throw new Error(
          '"redacted_reasoning" parts expect an object with a "data" property.',
        );
      return { type: 'redacted_reasoning', value: { data: t.data } };
    },
  },
  Xs = {
    code: 'j',
    name: 'reasoning_signature',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('signature' in t) ||
        typeof t.signature != 'string'
      )
        throw new Error(
          '"reasoning_signature" parts expect an object with a "signature" property.',
        );
      return { type: 'reasoning_signature', value: { signature: t.signature } };
    },
  },
  Qs = {
    code: 'k',
    name: 'file',
    parse: t => {
      if (
        t == null ||
        typeof t != 'object' ||
        !('data' in t) ||
        typeof t.data != 'string' ||
        !('mimeType' in t) ||
        typeof t.mimeType != 'string'
      )
        throw new Error(
          '"file" parts expect an object with a "data" and "mimeType" property.',
        );
      return { type: 'file', value: t };
    },
  },
  Nt = [$s, Ls, Vs, Us, zs, Fs, Bs, Js, Ws, qs, Ys, Ks, Gs, Hs, Xs, Qs],
  ei = Object.fromEntries(Nt.map(t => [t.code, t]));
Object.fromEntries(Nt.map(t => [t.name, t.code]));
var ti = Nt.map(t => t.code),
  ri = t => {
    const e = t.indexOf(':');
    if (e === -1)
      throw new Error('Failed to parse stream string. No separator found.');
    const r = t.slice(0, e);
    if (!ti.includes(r))
      throw new Error(`Failed to parse stream string. Invalid code ${r}.`);
    const n = r,
      a = t.slice(e + 1),
      s = JSON.parse(a);
    return ei[n].parse(s);
  };
function Li(t, e) {
  const r = Nt.find(n => n.name === t);
  if (!r) throw new Error(`Invalid stream part type: ${t}`);
  return `${r.code}:${JSON.stringify(e)}
`;
}
var ni = 10;
function ai(t, e) {
  const r = new Uint8Array(e);
  let n = 0;
  for (const a of t) r.set(a, n), (n += a.length);
  return (t.length = 0), r;
}
async function en({
  stream: t,
  onTextPart: e,
  onReasoningPart: r,
  onReasoningSignaturePart: n,
  onRedactedReasoningPart: a,
  onSourcePart: s,
  onFilePart: i,
  onDataPart: o,
  onErrorPart: c,
  onToolCallStreamingStartPart: l,
  onToolCallDeltaPart: u,
  onToolCallPart: p,
  onToolResultPart: T,
  onMessageAnnotationsPart: _,
  onFinishMessagePart: P,
  onFinishStepPart: N,
  onStartStepPart: I,
}) {
  const S = t.getReader(),
    E = new TextDecoder(),
    b = [];
  let Z = 0;
  for (;;) {
    const { value: D } = await S.read();
    if (D && (b.push(D), (Z += D.length), D[D.length - 1] !== ni)) continue;
    if (b.length === 0) break;
    const m = ai(b, Z);
    Z = 0;
    const w = E.decode(m, { stream: !0 })
      .split(
        `
`,
      )
      .filter(M => M !== '')
      .map(ri);
    for (const { type: M, value: C } of w)
      switch (M) {
        case 'text':
          await e?.(C);
          break;
        case 'reasoning':
          await r?.(C);
          break;
        case 'reasoning_signature':
          await n?.(C);
          break;
        case 'redacted_reasoning':
          await a?.(C);
          break;
        case 'file':
          await i?.(C);
          break;
        case 'source':
          await s?.(C);
          break;
        case 'data':
          await o?.(C);
          break;
        case 'error':
          await c?.(C);
          break;
        case 'message_annotations':
          await _?.(C);
          break;
        case 'tool_call_streaming_start':
          await l?.(C);
          break;
        case 'tool_call_delta':
          await u?.(C);
          break;
        case 'tool_call':
          await p?.(C);
          break;
        case 'tool_result':
          await T?.(C);
          break;
        case 'finish_message':
          await P?.(C);
          break;
        case 'finish_step':
          await N?.(C);
          break;
        case 'start_step':
          await I?.(C);
          break;
        default: {
          const ve = M;
          throw new Error(`Unknown stream part type: ${ve}`);
        }
      }
  }
}
async function si({
  stream: t,
  update: e,
  onToolCall: r,
  onFinish: n,
  generateId: a = Gt,
  getCurrentDate: s = () => new Date(),
  lastMessage: i,
}) {
  var o, c;
  const l = i?.role === 'assistant';
  let u = l
    ? 1 +
      ((c =
        (o = i.toolInvocations) == null
          ? void 0
          : o.reduce((m, w) => {
              var M;
              return Math.max(m, (M = w.step) != null ? M : 0);
            }, 0)) != null
        ? c
        : 0)
    : 0;
  const p = l
    ? structuredClone(i)
    : { id: a(), createdAt: s(), role: 'assistant', content: '', parts: [] };
  let T, _, P;
  function N(m, w) {
    const M = p.parts.find(
      C => C.type === 'tool-invocation' && C.toolInvocation.toolCallId === m,
    );
    M != null
      ? (M.toolInvocation = w)
      : p.parts.push({ type: 'tool-invocation', toolInvocation: w });
  }
  const I = [];
  let S = l ? i?.annotations : void 0;
  const E = {};
  let b = { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
    Z = 'unknown';
  function D() {
    const m = [...I];
    S?.length && (p.annotations = S);
    const w = { ...structuredClone(p), revisionId: a() };
    e({ message: w, data: m, replaceLastMessage: l });
  }
  await en({
    stream: t,
    onTextPart(m) {
      T == null
        ? ((T = { type: 'text', text: m }), p.parts.push(T))
        : (T.text += m),
        (p.content += m),
        D();
    },
    onReasoningPart(m) {
      var w;
      P == null
        ? ((P = { type: 'text', text: m }), _?.details.push(P))
        : (P.text += m),
        _ == null
          ? ((_ = { type: 'reasoning', reasoning: m, details: [P] }),
            p.parts.push(_))
          : (_.reasoning += m),
        (p.reasoning = ((w = p.reasoning) != null ? w : '') + m),
        D();
    },
    onReasoningSignaturePart(m) {
      P != null && (P.signature = m.signature);
    },
    onRedactedReasoningPart(m) {
      _ == null &&
        ((_ = { type: 'reasoning', reasoning: '', details: [] }),
        p.parts.push(_)),
        _.details.push({ type: 'redacted', data: m.data }),
        (P = void 0),
        D();
    },
    onFilePart(m) {
      p.parts.push({ type: 'file', mimeType: m.mimeType, data: m.data }), D();
    },
    onSourcePart(m) {
      p.parts.push({ type: 'source', source: m }), D();
    },
    onToolCallStreamingStartPart(m) {
      p.toolInvocations == null && (p.toolInvocations = []),
        (E[m.toolCallId] = {
          text: '',
          step: u,
          toolName: m.toolName,
          index: p.toolInvocations.length,
        });
      const w = {
        state: 'partial-call',
        step: u,
        toolCallId: m.toolCallId,
        toolName: m.toolName,
        args: void 0,
      };
      p.toolInvocations.push(w), N(m.toolCallId, w), D();
    },
    onToolCallDeltaPart(m) {
      const w = E[m.toolCallId];
      w.text += m.argsTextDelta;
      const { value: M } = Qr(w.text),
        C = {
          state: 'partial-call',
          step: w.step,
          toolCallId: m.toolCallId,
          toolName: w.toolName,
          args: M,
        };
      (p.toolInvocations[w.index] = C), N(m.toolCallId, C), D();
    },
    async onToolCallPart(m) {
      const w = { state: 'call', step: u, ...m };
      if (
        (E[m.toolCallId] != null
          ? (p.toolInvocations[E[m.toolCallId].index] = w)
          : (p.toolInvocations == null && (p.toolInvocations = []),
            p.toolInvocations.push(w)),
        N(m.toolCallId, w),
        D(),
        r)
      ) {
        const M = await r({ toolCall: m });
        if (M != null) {
          const C = { state: 'result', step: u, ...m, result: M };
          (p.toolInvocations[p.toolInvocations.length - 1] = C),
            N(m.toolCallId, C),
            D();
        }
      }
    },
    onToolResultPart(m) {
      const w = p.toolInvocations;
      if (w == null)
        throw new Error('tool_result must be preceded by a tool_call');
      const M = w.findIndex(ve => ve.toolCallId === m.toolCallId);
      if (M === -1)
        throw new Error(
          'tool_result must be preceded by a tool_call with the same toolCallId',
        );
      const C = { ...w[M], state: 'result', ...m };
      (w[M] = C), N(m.toolCallId, C), D();
    },
    onDataPart(m) {
      I.push(...m), D();
    },
    onMessageAnnotationsPart(m) {
      S == null ? (S = [...m]) : S.push(...m), D();
    },
    onFinishStepPart(m) {
      (u += 1), (T = m.isContinued ? T : void 0), (_ = void 0), (P = void 0);
    },
    onStartStepPart(m) {
      l || (p.id = m.messageId), p.parts.push({ type: 'step-start' }), D();
    },
    onFinishMessagePart(m) {
      (Z = m.finishReason), m.usage != null && (b = Ds(m.usage));
    },
    onErrorPart(m) {
      throw new Error(m);
    },
  }),
    n?.({ message: p, finishReason: Z, usage: b });
}
async function tn({ stream: t, onTextPart: e }) {
  const r = t.pipeThrough(new TextDecoderStream()).getReader();
  for (;;) {
    const { done: n, value: a } = await r.read();
    if (n) break;
    await e(a);
  }
}
async function ii({
  stream: t,
  update: e,
  onFinish: r,
  getCurrentDate: n = () => new Date(),
  generateId: a = Gt,
}) {
  const s = { type: 'text', text: '' },
    i = { id: a(), createdAt: n(), role: 'assistant', content: '', parts: [s] };
  await tn({
    stream: t,
    onTextPart: o => {
      (i.content += o),
        (s.text += o),
        e({ message: { ...i }, data: [], replaceLastMessage: !1 });
    },
  }),
    r?.(i, {
      usage: { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
      finishReason: 'unknown',
    });
}
var oi = () => fetch;
async function ci({
  api: t,
  body: e,
  streamProtocol: r = 'data',
  credentials: n,
  headers: a,
  abortController: s,
  restoreMessagesOnFailure: i,
  onResponse: o,
  onUpdate: c,
  onFinish: l,
  onToolCall: u,
  generateId: p,
  fetch: T = oi(),
  lastMessage: _,
  requestType: P = 'generate',
}) {
  var N, I, S;
  const b = await (
    P === 'resume'
      ? T(`${t}?chatId=${e.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', ...a },
          signal: (N = s?.()) == null ? void 0 : N.signal,
          credentials: n,
        })
      : T(t, {
          method: 'POST',
          body: JSON.stringify(e),
          headers: { 'Content-Type': 'application/json', ...a },
          signal: (I = s?.()) == null ? void 0 : I.signal,
          credentials: n,
        })
  ).catch(Z => {
    throw (i(), Z);
  });
  if (o)
    try {
      await o(b);
    } catch (Z) {
      throw Z;
    }
  if (!b.ok)
    throw (
      (i(),
      new Error(
        (S = await b.text()) != null ? S : 'Failed to fetch the chat response.',
      ))
    );
  if (!b.body) throw new Error('The response body is empty.');
  switch (r) {
    case 'text': {
      await ii({ stream: b.body, update: c, onFinish: l, generateId: p });
      return;
    }
    case 'data': {
      await si({
        stream: b.body,
        update: c,
        lastMessage: _,
        onToolCall: u,
        onFinish({ message: Z, finishReason: D, usage: m }) {
          l && Z != null && l(Z, { usage: m, finishReason: D });
        },
        generateId: p,
      });
      return;
    }
    default: {
      const Z = r;
      throw new Error(`Unknown stream protocol: ${Z}`);
    }
  }
}
var li = () => fetch;
async function ui({
  api: t,
  prompt: e,
  credentials: r,
  headers: n,
  body: a,
  streamProtocol: s = 'data',
  setCompletion: i,
  setLoading: o,
  setError: c,
  setAbortController: l,
  onResponse: u,
  onFinish: p,
  onError: T,
  onData: _,
  fetch: P = li(),
}) {
  var N;
  try {
    o(!0), c(void 0);
    const I = new AbortController();
    l(I), i('');
    const S = await P(t, {
      method: 'POST',
      body: JSON.stringify({ prompt: e, ...a }),
      credentials: r,
      headers: { 'Content-Type': 'application/json', ...n },
      signal: I.signal,
    }).catch(b => {
      throw b;
    });
    if (u)
      try {
        await u(S);
      } catch (b) {
        throw b;
      }
    if (!S.ok)
      throw new Error(
        (N = await S.text()) != null ? N : 'Failed to fetch the chat response.',
      );
    if (!S.body) throw new Error('The response body is empty.');
    let E = '';
    switch (s) {
      case 'text': {
        await tn({
          stream: S.body,
          onTextPart: b => {
            (E += b), i(E);
          },
        });
        break;
      }
      case 'data': {
        await en({
          stream: S.body,
          onTextPart(b) {
            (E += b), i(E);
          },
          onDataPart(b) {
            _?.(b);
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
    return p && p(e, E), l(null), E;
  } catch (I) {
    if (I.name === 'AbortError') return l(null), null;
    I instanceof Error && T && T(I), c(I);
  } finally {
    o(!1);
  }
}
function Vi(t) {
  const [e, r] = t.split(',');
  if (e.split(';')[0].split(':')[1] == null || r == null)
    throw new Error('Invalid data URL format');
  try {
    return window.atob(r);
  } catch {
    throw new Error('Error decoding data URL');
  }
}
function Bt(t) {
  return t?.reduce((e, r) => {
    var n;
    return Math.max(e, (n = r.step) != null ? n : 0);
  }, 0);
}
function rn(t) {
  var e;
  return (e = t.parts) != null
    ? e
    : [
        ...(t.toolInvocations
          ? t.toolInvocations.map(r => ({
              type: 'tool-invocation',
              toolInvocation: r,
            }))
          : []),
        ...(t.reasoning
          ? [
              {
                type: 'reasoning',
                reasoning: t.reasoning,
                details: [{ type: 'text', text: t.reasoning }],
              },
            ]
          : []),
        ...(t.content ? [{ type: 'text', text: t.content }] : []),
      ];
}
function Ie(t) {
  return t.map(e => ({ ...e, parts: rn(e) }));
}
function Jt(t, e) {
  if (t === e) return !0;
  if (t == null || e == null) return !1;
  if (typeof t != 'object' && typeof e != 'object') return t === e;
  if (t.constructor !== e.constructor) return !1;
  if (t instanceof Date && e instanceof Date)
    return t.getTime() === e.getTime();
  if (Array.isArray(t)) {
    if (t.length !== e.length) return !1;
    for (let a = 0; a < t.length; a++) if (!Jt(t[a], e[a])) return !1;
    return !0;
  }
  const r = Object.keys(t),
    n = Object.keys(e);
  if (r.length !== n.length) return !1;
  for (const a of r) if (!n.includes(a) || !Jt(t[a], e[a])) return !1;
  return !0;
}
async function gr(t) {
  if (!t) return [];
  if (t instanceof FileList)
    return Promise.all(
      Array.from(t).map(async e => {
        const { name: r, type: n } = e,
          a = await new Promise((s, i) => {
            const o = new FileReader();
            (o.onload = c => {
              var l;
              s((l = c.target) == null ? void 0 : l.result);
            }),
              (o.onerror = c => i(c)),
              o.readAsDataURL(e);
          });
        return { name: r, contentType: n, url: a };
      }),
    );
  if (Array.isArray(t)) return t;
  throw new Error('Invalid attachments type');
}
function di(t, e) {
  var r;
  const n = (r = void 0) != null ? r : !1;
  return fi(
    Zs(t, { $refStrategy: n ? 'root' : 'none', target: 'jsonSchema7' }),
    {
      validate: a => {
        const s = t.safeParse(a);
        return s.success
          ? { success: !0, value: s.data }
          : { success: !1, error: s.error };
      },
    },
  );
}
var Wt = Symbol.for('vercel.ai.schema');
function fi(t, { validate: e } = {}) {
  return { [Wt]: !0, _type: void 0, [ht]: !0, jsonSchema: t, validate: e };
}
function pi(t) {
  return (
    typeof t == 'object' &&
    t !== null &&
    Wt in t &&
    t[Wt] === !0 &&
    'jsonSchema' in t &&
    'validate' in t
  );
}
function hi(t) {
  return pi(t) ? t : di(t);
}
function mi({
  originalMaxToolInvocationStep: t,
  originalMessageCount: e,
  maxSteps: r,
  messages: n,
}) {
  var a;
  const s = n[n.length - 1];
  return (
    r > 1 &&
    s != null &&
    (n.length > e || Bt(s.toolInvocations) !== t) &&
    nn(s) &&
    ((a = Bt(s.toolInvocations)) != null ? a : 0) < r
  );
}
function nn(t) {
  if (t.role !== 'assistant') return !1;
  const e = t.parts.reduce((n, a, s) => (a.type === 'step-start' ? s : n), -1),
    r = t.parts.slice(e + 1).filter(n => n.type === 'tool-invocation');
  return r.length > 0 && r.every(n => 'result' in n.toolInvocation);
}
function gi({ messages: t, toolCallId: e, toolResult: r }) {
  var n;
  const a = t[t.length - 1],
    s = a.parts.find(
      o => o.type === 'tool-invocation' && o.toolInvocation.toolCallId === e,
    );
  if (s == null) return;
  const i = { ...s.toolInvocation, state: 'result', result: r };
  (s.toolInvocation = i),
    (a.toolInvocations =
      (n = a.toolInvocations) == null
        ? void 0
        : n.map(o => (o.toolCallId === e ? i : o)));
}
const yi = { context: void 0 },
  _i = (t, e) => t === e,
  Te = Symbol('solid-proxy'),
  yr = Symbol('solid-track'),
  xt = { equals: _i };
let an = ln;
const Ee = 1,
  Tt = 2,
  vi = {};
var z = null;
let $t = null,
  L = null,
  F = null,
  ue = null,
  Ct = 0;
function Y(t, e) {
  e = e ? Object.assign({}, xt, e) : xt;
  const r = {
      value: t,
      observers: null,
      observerSlots: null,
      comparator: e.equals || void 0,
    },
    n = a => (typeof a == 'function' && (a = a(r.value)), on(r, a));
  return [sn.bind(r), n];
}
function ft(t, e, r) {
  an = Ti;
  const n = cn(t, e, !1, Ee);
  (n.user = !0), ue ? ue.push(n) : Rt(n);
}
function V(t, e, r) {
  r = r ? Object.assign({}, xt, r) : xt;
  const n = cn(t, e, !0, 0);
  return (
    (n.observers = null),
    (n.observerSlots = null),
    (n.comparator = r.equals || void 0),
    Rt(n),
    sn.bind(n)
  );
}
function pt(t) {
  return lt(t);
}
function bi(t) {
  if (L === null) return t();
  const e = L;
  L = null;
  try {
    return t();
  } finally {
    L = e;
  }
}
function ki(t) {
  return (
    z === null ||
      (z.cleanups === null ? (z.cleanups = [t]) : z.cleanups.push(t)),
    t
  );
}
function Et() {
  return L;
}
function sn() {
  if (this.sources && this.state)
    if (this.state === Ee) Rt(this);
    else {
      const t = F;
      (F = null), lt(() => It(this)), (F = t);
    }
  if (L) {
    const t = this.observers ? this.observers.length : 0;
    L.sources
      ? (L.sources.push(this), L.sourceSlots.push(t))
      : ((L.sources = [this]), (L.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(L),
          this.observerSlots.push(L.sources.length - 1))
        : ((this.observers = [L]),
          (this.observerSlots = [L.sources.length - 1]));
  }
  return this.value;
}
function on(t, e, r) {
  let n = t.value;
  return (
    (!t.comparator || !t.comparator(n, e)) &&
      ((t.value = e),
      t.observers &&
        t.observers.length &&
        lt(() => {
          for (let a = 0; a < t.observers.length; a += 1) {
            const s = t.observers[a],
              i = $t && $t.running;
            i && $t.disposed.has(s),
              (i ? !s.tState : !s.state) &&
                (s.pure ? F.push(s) : ue.push(s), s.observers && un(s)),
              i || (s.state = Ee);
          }
          if (F.length > 1e6) throw ((F = []), new Error());
        })),
    e
  );
}
function Rt(t) {
  if (!t.fn) return;
  Xt(t);
  const e = Ct;
  wi(t, t.value, e);
}
function wi(t, e, r) {
  let n;
  const a = z,
    s = L;
  L = z = t;
  try {
    n = t.fn(e);
  } catch (i) {
    return (
      t.pure &&
        ((t.state = Ee), t.owned && t.owned.forEach(Xt), (t.owned = null)),
      (t.updatedAt = r + 1),
      dn(i)
    );
  } finally {
    (L = s), (z = a);
  }
  (!t.updatedAt || t.updatedAt <= r) &&
    (t.updatedAt != null && 'observers' in t ? on(t, n) : (t.value = n),
    (t.updatedAt = r));
}
function cn(t, e, r, n = Ee, a) {
  const s = {
    fn: t,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: z,
    context: z ? z.context : null,
    pure: r,
  };
  return (
    z === null || (z !== vi && (z.owned ? z.owned.push(s) : (z.owned = [s]))), s
  );
}
function St(t) {
  if (t.state === 0) return;
  if (t.state === Tt) return It(t);
  if (t.suspense && bi(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const e = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < Ct); )
    t.state && e.push(t);
  for (let r = e.length - 1; r >= 0; r--)
    if (((t = e[r]), t.state === Ee)) Rt(t);
    else if (t.state === Tt) {
      const n = F;
      (F = null), lt(() => It(t, e[0])), (F = n);
    }
}
function lt(t, e) {
  if (F) return t();
  let r = !1;
  (F = []), ue ? (r = !0) : (ue = []), Ct++;
  try {
    const n = t();
    return xi(r), n;
  } catch (n) {
    r || (ue = null), (F = null), dn(n);
  }
}
function xi(t) {
  if ((F && (ln(F), (F = null)), t)) return;
  const e = ue;
  (ue = null), e.length && lt(() => an(e));
}
function ln(t) {
  for (let e = 0; e < t.length; e++) St(t[e]);
}
function Ti(t) {
  let e,
    r = 0;
  for (e = 0; e < t.length; e++) {
    const n = t[e];
    n.user ? (t[r++] = n) : St(n);
  }
  for (e = 0; e < r; e++) St(t[e]);
}
function It(t, e) {
  t.state = 0;
  for (let r = 0; r < t.sources.length; r += 1) {
    const n = t.sources[r];
    if (n.sources) {
      const a = n.state;
      a === Ee
        ? n !== e && (!n.updatedAt || n.updatedAt < Ct) && St(n)
        : a === Tt && It(n, e);
    }
  }
}
function un(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const r = t.observers[e];
    r.state ||
      ((r.state = Tt), r.pure ? F.push(r) : ue.push(r), r.observers && un(r));
  }
}
function Xt(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const r = t.sources.pop(),
        n = t.sourceSlots.pop(),
        a = r.observers;
      if (a && a.length) {
        const s = a.pop(),
          i = r.observerSlots.pop();
        n < a.length &&
          ((s.sourceSlots[i] = n), (a[n] = s), (r.observerSlots[n] = i));
      }
    }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--) Xt(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--) t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0;
}
function Ei(t) {
  return t instanceof Error
    ? t
    : new Error(typeof t == 'string' ? t : 'Unknown error', { cause: t });
}
function dn(t, e = z) {
  throw Ei(t);
}
let Si = 0;
function fn() {
  const t = yi.context;
  return t ? `${t.id}${t.count++}` : `cl-${Si++}`;
}
const qt = Symbol('store-raw'),
  Re = Symbol('store-node'),
  le = Symbol('store-has'),
  pn = Symbol('store-self');
function hn(t) {
  let e = t[Te];
  if (
    !e &&
    (Object.defineProperty(t, Te, { value: (e = new Proxy(t, Oi)) }),
    !Array.isArray(t))
  ) {
    const r = Object.keys(t),
      n = Object.getOwnPropertyDescriptors(t);
    for (let a = 0, s = r.length; a < s; a++) {
      const i = r[a];
      n[i].get &&
        Object.defineProperty(t, i, {
          enumerable: n[i].enumerable,
          get: n[i].get.bind(e),
        });
    }
  }
  return e;
}
function _e(t) {
  let e;
  return (
    t != null &&
    typeof t == 'object' &&
    (t[Te] ||
      !(e = Object.getPrototypeOf(t)) ||
      e === Object.prototype ||
      Array.isArray(t))
  );
}
function Me(t, e = new Set()) {
  let r, n, a, s;
  if ((r = t != null && t[qt])) return r;
  if (!_e(t) || e.has(t)) return t;
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? (t = t.slice(0)) : e.add(t);
    for (let i = 0, o = t.length; i < o; i++)
      (a = t[i]), (n = Me(a, e)) !== a && (t[i] = n);
  } else {
    Object.isFrozen(t) ? (t = Object.assign({}, t)) : e.add(t);
    const i = Object.keys(t),
      o = Object.getOwnPropertyDescriptors(t);
    for (let c = 0, l = i.length; c < l; c++)
      (s = i[c]), !o[s].get && ((a = t[s]), (n = Me(a, e)) !== a && (t[s] = n));
  }
  return t;
}
function At(t, e) {
  let r = t[e];
  return (
    r || Object.defineProperty(t, e, { value: (r = Object.create(null)) }), r
  );
}
function ot(t, e, r) {
  if (t[e]) return t[e];
  const [n, a] = Y(r, { equals: !1, internal: !0 });
  return (n.$ = a), (t[e] = n);
}
function Ii(t, e) {
  const r = Reflect.getOwnPropertyDescriptor(t, e);
  return (
    !r ||
      r.get ||
      !r.configurable ||
      e === Te ||
      e === Re ||
      (delete r.value, delete r.writable, (r.get = () => t[Te][e])),
    r
  );
}
function mn(t) {
  Et() && ot(At(t, Re), pn)();
}
function Ai(t) {
  return mn(t), Reflect.ownKeys(t);
}
const Oi = {
  get(t, e, r) {
    if (e === qt) return t;
    if (e === Te) return r;
    if (e === yr) return mn(t), r;
    const n = At(t, Re),
      a = n[e];
    let s = a ? a() : t[e];
    if (e === Re || e === le || e === '__proto__') return s;
    if (!a) {
      const i = Object.getOwnPropertyDescriptor(t, e);
      Et() &&
        (typeof s != 'function' || t.hasOwnProperty(e)) &&
        !(i && i.get) &&
        (s = ot(n, e, s)());
    }
    return _e(s) ? hn(s) : s;
  },
  has(t, e) {
    return e === qt ||
      e === Te ||
      e === yr ||
      e === Re ||
      e === le ||
      e === '__proto__'
      ? !0
      : (Et() && ot(At(t, le), e)(), e in t);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Ai,
  getOwnPropertyDescriptor: Ii,
};
function G(t, e, r, n = !1) {
  if (!n && t[e] === r) return;
  const a = t[e],
    s = t.length;
  r === void 0
    ? (delete t[e], t[le] && t[le][e] && a !== void 0 && t[le][e].$())
    : ((t[e] = r), t[le] && t[le][e] && a === void 0 && t[le][e].$());
  let i = At(t, Re),
    o;
  if (((o = ot(i, e, a)) && o.$(() => r), Array.isArray(t) && t.length !== s)) {
    for (let c = t.length; c < s; c++) (o = i[c]) && o.$();
    (o = ot(i, 'length', s)) && o.$(t.length);
  }
  (o = i[pn]) && o.$();
}
function gn(t, e) {
  const r = Object.keys(e);
  for (let n = 0; n < r.length; n += 1) {
    const a = r[n];
    G(t, a, e[a]);
  }
}
function Ni(t, e) {
  if ((typeof e == 'function' && (e = e(t)), (e = Me(e)), Array.isArray(e))) {
    if (t === e) return;
    let r = 0,
      n = e.length;
    for (; r < n; r++) {
      const a = e[r];
      t[r] !== a && G(t, r, a);
    }
    G(t, 'length', n);
  } else gn(t, e);
}
function Ue(t, e, r = []) {
  let n,
    a = t;
  if (e.length > 1) {
    n = e.shift();
    const i = typeof n,
      o = Array.isArray(t);
    if (Array.isArray(n)) {
      for (let c = 0; c < n.length; c++) Ue(t, [n[c]].concat(e), r);
      return;
    } else if (o && i === 'function') {
      for (let c = 0; c < t.length; c++) n(t[c], c) && Ue(t, [c].concat(e), r);
      return;
    } else if (o && i === 'object') {
      const { from: c = 0, to: l = t.length - 1, by: u = 1 } = n;
      for (let p = c; p <= l; p += u) Ue(t, [p].concat(e), r);
      return;
    } else if (e.length > 1) {
      Ue(t[n], e, [n].concat(r));
      return;
    }
    (a = t[n]), (r = [n].concat(r));
  }
  let s = e[0];
  (typeof s == 'function' && ((s = s(a, r)), s === a)) ||
    (n === void 0 && s == null) ||
    ((s = Me(s)),
    n === void 0 || (_e(a) && _e(s) && !Array.isArray(s))
      ? gn(a, s)
      : G(t, n, s));
}
function Ci(...[t, e]) {
  const r = Me(t || {}),
    n = Array.isArray(r),
    a = hn(r);
  function s(...i) {
    pt(() => {
      n && i.length === 1 ? Ni(r, i[0]) : Ue(r, i);
    });
  }
  return [a, s];
}
const Yt = Symbol('store-root');
function Oe(t, e, r, n, a) {
  const s = e[r];
  if (t === s) return;
  if (r !== Yt && (!_e(t) || !_e(s) || (a && t[a] !== s[a]))) {
    G(e, r, t);
    return;
  }
  if (Array.isArray(t)) {
    if (t.length && s.length && (!n || (a && t[0] && t[0][a] != null))) {
      let c, l, u, p, T, _, P, N;
      for (
        u = 0, p = Math.min(s.length, t.length);
        u < p && (s[u] === t[u] || (a && s[u] && t[u] && s[u][a] === t[u][a]));
        u++
      )
        Oe(t[u], s, u, n, a);
      const I = new Array(t.length),
        S = new Map();
      for (
        p = s.length - 1, T = t.length - 1;
        p >= u &&
        T >= u &&
        (s[p] === t[T] || (a && s[u] && t[u] && s[p][a] === t[T][a]));
        p--, T--
      )
        I[T] = s[p];
      if (u > T || u > p) {
        for (l = u; l <= T; l++) G(s, l, t[l]);
        for (; l < t.length; l++) G(s, l, I[l]), Oe(t[l], s, l, n, a);
        s.length > t.length && G(s, 'length', t.length);
        return;
      }
      for (P = new Array(T + 1), l = T; l >= u; l--)
        (_ = t[l]),
          (N = a && _ ? _[a] : _),
          (c = S.get(N)),
          (P[l] = c === void 0 ? -1 : c),
          S.set(N, l);
      for (c = u; c <= p; c++)
        (_ = s[c]),
          (N = a && _ ? _[a] : _),
          (l = S.get(N)),
          l !== void 0 && l !== -1 && ((I[l] = s[c]), (l = P[l]), S.set(N, l));
      for (l = u; l < t.length; l++)
        l in I ? (G(s, l, I[l]), Oe(t[l], s, l, n, a)) : G(s, l, t[l]);
    } else for (let c = 0, l = t.length; c < l; c++) Oe(t[c], s, c, n, a);
    s.length > t.length && G(s, 'length', t.length);
    return;
  }
  const i = Object.keys(t);
  for (let c = 0, l = i.length; c < l; c++) Oe(t[i[c]], s, i[c], n, a);
  const o = Object.keys(s);
  for (let c = 0, l = o.length; c < l; c++)
    t[o[c]] === void 0 && G(s, o[c], void 0);
}
function Ri(t, e = {}) {
  const { merge: r, key: n = 'id' } = e,
    a = Me(t);
  return s => {
    if (!_e(s) || !_e(a)) return a;
    const i = Oe(a, { [Yt]: s }, Yt, r, n);
    return i === void 0 ? s : i;
  };
}
var Pi = { equals: !1 },
  Zi = Pi,
  _r = class {
    #e;
    constructor(t = Map) {
      this.#e = new t();
    }
    dirty(t) {
      this.#e.get(t)?.$$();
    }
    dirtyAll() {
      for (const t of this.#e.values()) t.$$();
    }
    track(t) {
      if (!Et()) return;
      let e = this.#e.get(t);
      if (e) e.n++;
      else {
        const [r, n] = Y(void 0, Zi);
        this.#e.set(t, (e = { $: r, $$: n, n: 1 }));
      }
      ki(() => {
        e.n-- === 1 && queueMicrotask(() => e.n === 0 && this.#e.delete(t));
      }),
        e.$();
    }
  };
function Qt(t) {
  const e = typeof t == 'function' ? t() : t;
  return Object.entries(e).reduce((r, [n, a]) => ((r[n] = V(() => a)), r), {});
}
var fe = Symbol('track-keys'),
  er = class extends Map {
    #e = new _r();
    #r = new _r();
    #a;
    #t = [];
    constructor(t = 10, e) {
      if ((super(), (this.#a = t), e)) for (const [r, n] of e) this.set(r, n);
    }
    #n(t) {
      const e = this.#t.indexOf(t);
      if (
        (e > -1 && this.#t.splice(e, 1),
        this.#t.push(t),
        this.#t.length > this.#a)
      ) {
        const r = this.#t.shift();
        this.delete(r);
      }
    }
    has(t) {
      this.#e.track(t);
      const e = super.has(t);
      return e && this.#n(t), e;
    }
    get(t) {
      this.#r.track(t);
      const e = super.get(t);
      return e !== void 0 && this.#n(t), e;
    }
    get size() {
      return this.#e.track(fe), super.size;
    }
    *keys() {
      for (const t of super.keys()) this.#e.track(t), yield t;
      this.#e.track(fe);
    }
    *values() {
      for (const [t, e] of super.entries()) this.#r.track(t), yield e;
      this.#e.track(fe);
    }
    *entries() {
      for (const t of super.entries()) this.#r.track(t[0]), yield t;
      this.#e.track(fe);
    }
    set(t, e) {
      return (
        pt(() => {
          if (super.has(t)) {
            if (super.get(t) === e) {
              this.#n(t);
              return;
            }
          } else this.#e.dirty(t), this.#e.dirty(fe);
          this.#r.dirty(t), super.set(t, e), this.#n(t);
        }),
        this
      );
    }
    delete(t) {
      const e = super.delete(t);
      return (
        e &&
          pt(() => {
            this.#e.dirty(t), this.#e.dirty(fe), this.#r.dirty(t);
            const r = this.#t.indexOf(t);
            r > -1 && this.#t.splice(r, 1);
          }),
        e
      );
    }
    clear() {
      super.size &&
        pt(() => {
          for (const t of super.keys()) this.#e.dirty(t), this.#r.dirty(t);
          super.clear(), (this.#t = []), this.#e.dirty(fe);
        });
    }
    forEach(t) {
      this.#e.track(fe);
      for (const [e, r] of super.entries())
        this.#r.track(e), this.#n(e), t(r, e, this);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  },
  vr = new er();
function Ui(t = {}) {
  const e = V(() => Qt(t)),
    r = V(() => e().experimental_prepareRequestBody?.()),
    n = V(() => ({ ...e(), experimental_prepareRequestBody: r })),
    a = V(() => n().api?.() ?? '/api/chat'),
    s = V(() => n().generateId?.() ?? Gt),
    i = V(() => n().id?.() ?? s()()),
    o = V(() => `${a()}|${i()}|messages`),
    c = V(() => vr.get(o()) ?? n().initialMessages?.() ?? []),
    [l, u] = Ci(Ie(c()));
  ft(() => {
    u(Ri(Ie(c()), { merge: !0 }));
  });
  const p = A => {
      vr.set(o(), A);
    },
    [T, _] = Y(void 0),
    [P, N] = Y(void 0),
    [I, S] = Y('ready');
  let E = Ie(c()) || [];
  ft(() => {
    E = Ie(c()) || [];
  });
  let b = null,
    Z = {
      credentials: n().credentials?.(),
      headers: n().headers?.(),
      body: n().body?.(),
    };
  ft(() => {
    Z = {
      credentials: n().credentials?.(),
      headers: n().headers?.(),
      body: n().body?.(),
    };
  });
  const D = async A => {
      _(void 0), S('submitted');
      const U = E.length,
        q = Bt(A.messages[A.messages.length - 1]?.toolInvocations);
      try {
        b = new AbortController();
        const ie = n().streamProtocol?.() ?? 'data',
          Se = n().onFinish?.(),
          kn = n().onResponse?.(),
          wn = n().onToolCall?.(),
          xn = n().sendExtraMessageFields?.(),
          Tn = n().keepLastMessageOnError?.() ?? !0,
          En = n().experimental_prepareRequestBody?.(),
          Sn = E,
          oe = Ie(A.messages);
        p(oe);
        const In = P() ?? [],
          An = xn
            ? oe
            : oe.map(
                ({
                  role: Zt,
                  content: ut,
                  experimental_attachments: dt,
                  data: rr,
                  annotations: nr,
                  toolInvocations: ar,
                  parts: sr,
                }) => ({
                  role: Zt,
                  content: ut,
                  ...(dt !== void 0 && { experimental_attachments: dt }),
                  ...(rr !== void 0 && { data: rr }),
                  ...(nr !== void 0 && { annotations: nr }),
                  ...(ar !== void 0 && { toolInvocations: ar }),
                  ...(sr !== void 0 && { parts: sr }),
                }),
              );
        await ci({
          api: a(),
          body: En?.({
            id: i(),
            messages: oe,
            requestData: A.data,
            requestBody: A.body,
          }) ?? { id: i(), messages: An, data: A.data, ...Z.body, ...A.body },
          streamProtocol: ie,
          credentials: Z.credentials,
          headers: { ...Z.headers, ...A.headers },
          abortController: () => b,
          restoreMessagesOnFailure() {
            Tn || p(Sn);
          },
          onResponse: kn,
          onUpdate({ message: Zt, data: ut, replaceLastMessage: dt }) {
            S('streaming'),
              p([...(dt ? oe.slice(0, oe.length - 1) : oe), Zt]),
              ut?.length && N([...In, ...ut]);
          },
          onToolCall: wn,
          onFinish: Se,
          generateId: s(),
          fetch: n().fetch?.(),
          lastMessage: oe[oe.length - 1],
        }),
          (b = null),
          S('ready');
      } catch (ie) {
        if (ie.name === 'AbortError') return (b = null), S('ready'), null;
        const Se = n().onError?.();
        Se && ie instanceof Error && Se(ie), _(ie), S('error');
      }
      const H = n().maxSteps?.() ?? 1,
        be = E;
      mi({
        originalMaxToolInvocationStep: q,
        originalMessageCount: U,
        maxSteps: H,
        messages: be,
      }) && (await D({ messages: be }));
    },
    m = async (
      A,
      { data: U, headers: q, body: H, experimental_attachments: be } = {},
    ) => {
      const ie = await gr(be),
        Se = E.concat({
          ...A,
          id: A.id ?? s()(),
          createdAt: A.createdAt ?? new Date(),
          experimental_attachments: ie.length > 0 ? ie : void 0,
          parts: rn(A),
        });
      return D({ messages: Se, headers: q, body: H, data: U });
    },
    w = async ({ data: A, headers: U, body: q } = {}) => {
      if (E.length === 0) return null;
      const H = E[E.length - 1];
      return D({
        messages: H.role === 'assistant' ? E.slice(0, -1) : E,
        headers: U,
        body: q,
        data: A,
      });
    },
    M = () => {
      b && (b.abort(), (b = null));
    },
    C = A => {
      typeof A == 'function' && (A = A(E));
      const U = Ie(A);
      p(U), (E = U);
    },
    ve = A => {
      typeof A == 'function' && (A = A(P())), N(A);
    },
    [tr, Pt] = Y(n().initialInput?.() || ''),
    yn = async (A, U = {}, q) => {
      A?.preventDefault?.();
      const H = tr();
      if (!H && !U.allowEmptySubmit) return;
      const be = await gr(U.experimental_attachments);
      q && (Z = { ...Z, ...q }),
        D({
          messages: E.concat({
            id: s()(),
            role: 'user',
            content: H,
            createdAt: new Date(),
            experimental_attachments: be.length > 0 ? be : void 0,
            parts: [{ type: 'text', text: H }],
          }),
          headers: U.headers,
          body: U.body,
          data: U.data,
        }),
        Pt('');
    },
    _n = A => {
      Pt(A.target.value);
    },
    vn = ({ toolCallId: A, result: U }) => {
      const q = E ?? [];
      if (
        (gi({ messages: q, toolCallId: A, toolResult: U }),
        p(q),
        I() === 'submitted' || I() === 'streaming')
      )
        return;
      const H = q[q.length - 1];
      nn(H) && D({ messages: q });
    },
    bn = V(() => I() === 'submitted' || I() === 'streaming');
  return {
    messages: () => l,
    id: i(),
    append: m,
    error: T,
    reload: w,
    stop: M,
    setMessages: C,
    input: tr,
    setInput: Pt,
    handleInputChange: _n,
    handleSubmit: yn,
    isLoading: bn,
    status: I,
    data: P,
    setData: ve,
    addToolResult: vn,
  };
}
var br = new er();
function zi(t = {}) {
  const e = V(() => Qt(t)),
    r = V(() => e().api?.() ?? '/api/completion'),
    n = V(() => e().id?.() ?? `completion-${fn()}`),
    a = V(() => `${r()}|${n()}|completion`),
    s = V(() => br.get(a()) ?? e().initialCompletion?.() ?? ''),
    i = w => {
      br.set(a(), w);
    },
    [o, c] = Y(void 0),
    [l, u] = Y(void 0),
    [p, T] = Y(!1),
    [_, P] = Y(null);
  let N = {
    credentials: e().credentials?.(),
    headers: e().headers?.(),
    body: e().body?.(),
  };
  ft(() => {
    N = {
      credentials: e().credentials?.(),
      headers: e().headers?.(),
      body: e().body?.(),
    };
  });
  const I = async (w, M) => {
      const C = l() ?? [];
      return ui({
        api: r(),
        prompt: w,
        credentials: e().credentials?.(),
        headers: { ...N.headers, ...M?.headers },
        body: { ...N.body, ...M?.body },
        streamProtocol: e().streamProtocol?.(),
        setCompletion: i,
        setLoading: T,
        setError: c,
        setAbortController: P,
        onResponse: e().onResponse?.(),
        onFinish: e().onFinish?.(),
        onError: e().onError?.(),
        onData: ve => {
          u([...C, ...(ve ?? [])]);
        },
        fetch: e().fetch?.(),
      });
    },
    S = () => {
      _() && _().abort();
    },
    E = w => {
      i(w);
    },
    [b, Z] = Y(e().initialInput?.() ?? '');
  return {
    completion: s,
    complete: I,
    error: o,
    stop: S,
    setCompletion: E,
    input: b,
    setInput: Z,
    handleInputChange: w => {
      Z(w.target.value);
    },
    handleSubmit: w => {
      w?.preventDefault?.();
      const M = b();
      return M ? I(M) : void 0;
    },
    isLoading: p,
    data: l,
  };
}
var ji = () => fetch,
  kr = new er();
function Di(t) {
  const e = V(() => Qt(t)),
    r = V(() => e().id?.() ?? `object-${fn()}`),
    n = V(() => kr.get(r()) ?? e().initialValue?.()),
    a = T => {
      kr.set(r(), T);
    },
    [s, i] = Y(),
    [o, c] = Y(!1);
  let l = null;
  return {
    submit: async T => {
      try {
        a(void 0), c(!0), i(void 0);
        const _ = new AbortController();
        l = _;
        const N = await (fetch ?? ji())(e().api(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...e().headers?.() },
          credentials: e().credentials?.(),
          signal: _.signal,
          body: JSON.stringify(T),
        });
        if (!N.ok)
          throw new Error((await N.text()) ?? 'Failed to fetch the response.');
        if (N.body == null) throw new Error('The response body is empty.');
        let I = '',
          S;
        await N.body.pipeThrough(new TextDecoderStream()).pipeTo(
          new WritableStream({
            write(E) {
              I += E;
              const { value: b } = Qr(I),
                Z = b;
              Jt(S, Z) || ((S = Z), a(Z));
            },
            close() {
              c(!1), (l = null);
              const E = e().onFinish?.();
              if (E != null) {
                const b = Mr({ value: S, schema: hi(e().schema()) });
                E(
                  b.success
                    ? { object: b.value, error: void 0 }
                    : { object: void 0, error: b.error },
                );
              }
            },
          }),
        );
      } catch (_) {
        if (Fn(_)) return;
        const P = e().onError?.();
        P && _ instanceof Error && P(_),
          c(!1),
          i(_ instanceof Error ? _ : new Error(String(_)));
      }
    },
    object: n,
    error: s,
    isLoading: o,
    stop: () => {
      try {
        l?.abort();
      } catch {
      } finally {
        c(!1), (l = null);
      }
    },
  };
}
var Fi = Di;
export {
  Pe as A,
  zi as a,
  hi as b,
  zn as c,
  Mr as d,
  Mi as e,
  Li as f,
  Vi as g,
  Fi as h,
  Qr as p,
  ur as s,
  Ui as u,
  $i as z,
};
