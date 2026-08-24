/** Memoize a unary function by its first argument. */
export function memo<K, V>(fn: (key: K) => V): (key: K) => V {
  const cache = new Map<K, V>();
  return (key: K) => {
    if (cache.has(key)) return cache.get(key) as V;
    const value = fn(key);
    cache.set(key, value);
    return value;
  };
}

export function memoClear<K, V>(fn: (key: K) => V & { cache?: Map<K, V> }): void {
  const cache = (fn as { cache?: Map<K, V> }).cache;
  cache?.clear();
}
