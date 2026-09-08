type PlainObject = Record<string, unknown>;

export function isPlainObject(value: unknown): value is PlainObject {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Deep-merges `source` into `target`, returning a new object. Arrays and non-plain objects are
 * replaced, not merged. `undefined` values in `source` are ignored so partial overrides can be
 * spread safely.
 */
export function deepMerge<T extends object>(target: T, source: unknown): T {
  if (!isPlainObject(source)) {
    return target;
  }

  const result: PlainObject = { ...(target as PlainObject) };

  for (const key of Object.keys(source)) {
    const incoming = source[key];
    if (incoming === undefined) {
      continue;
    }
    const current = result[key];
    if (isPlainObject(current) && isPlainObject(incoming)) {
      result[key] = deepMerge(current, incoming);
    } else {
      result[key] = incoming;
    }
  }

  return result as T;
}

/**
 * Returns the subset of `value` whose leaves differ from `reference`.
 * Used to preserve intentional component-token overrides when re-deriving a theme.
 */
export function deepDiff(value: unknown, reference: unknown): PlainObject | undefined {
  if (!isPlainObject(value) || !isPlainObject(reference)) {
    return undefined;
  }

  const diff: PlainObject = {};

  for (const key of Object.keys(value)) {
    const a = value[key];
    const b = reference[key];
    if (isPlainObject(a) && isPlainObject(b)) {
      const nested = deepDiff(a, b);
      if (nested && Object.keys(nested).length > 0) {
        diff[key] = nested;
      }
    } else if (a !== b) {
      diff[key] = a;
    }
  }

  return diff;
}
