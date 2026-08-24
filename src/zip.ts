/** Pair items from two arrays until the shorter one ends. */
export function zip<A, B>(a: readonly A[], b: readonly B[]): Array<[A, B]> {
  const n = Math.min(a.length, b.length);
  const out: Array<[A, B]> = [];
  for (let i = 0; i < n; i++) out.push([a[i]!, b[i]!]);
  return out;
}

export function unzip<A, B>(pairs: ReadonlyArray<[A, B]>): [A[], B[]] {
  const left: A[] = [];
  const right: B[] = [];
  for (const [a, b] of pairs) {
    left.push(a);
    right.push(b);
  }
  return [left, right];
}
