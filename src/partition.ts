/** Split items into [pass, fail] by a predicate. */
export function partition<T>(items: readonly T[], pred: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of items) (pred(item) ? pass : fail).push(item);
  return [pass, fail];
}
