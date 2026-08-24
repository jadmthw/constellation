/** Inclusive-start exclusive-end integer range. */
export function range(start: number, end: number, step = 1): number[] {
  if (step === 0) throw new RangeError("step cannot be 0");
  const out: number[] = [];
  if (step > 0) for (let n = start; n < end; n += step) out.push(n);
  else for (let n = start; n > end; n += step) out.push(n);
  return out;
}
