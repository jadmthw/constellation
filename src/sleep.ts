/** Resolve after `ms` milliseconds. */
export function sleep(ms: number): Promise<void> {
  if (ms < 0) throw new RangeError("sleep ms must be >= 0");
  return new Promise((resolve) => setTimeout(resolve, ms));
}
