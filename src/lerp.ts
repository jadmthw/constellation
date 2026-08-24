/** Linear interpolate from `a` to `b` by `t` in [0, 1]. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function invLerp(a: number, b: number, v: number): number {
  if (a === b) return 0;
  return (v - a) / (b - a);
}
