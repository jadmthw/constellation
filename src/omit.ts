/** Drop a subset of keys from an object. */
export function omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
  const drop = new Set<PropertyKey>(keys);
  const out = {} as Omit<T, K>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (!drop.has(key)) (out as T)[key] = obj[key];
  }
  return out;
}
