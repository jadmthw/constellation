/** Run `fn` for side effects and return the original value. */
export function tap<T>(value: T, fn: (value: T) => void): T {
  fn(value);
  return value;
}
