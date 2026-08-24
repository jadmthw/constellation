/** Clamp `n` into the closed interval [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  if (min > max) throw new RangeError("clamp: min > max");
  return Math.min(max, Math.max(min, n));
}

export function clamp01(n: number): number {
  return clamp(n, 0, 1);
}
