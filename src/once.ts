/** Run `fn` at most once; later calls return the first result. */
export function once<T extends (...args: never[]) => unknown>(fn: T): T {
  let called = false;
  let value: ReturnType<T>;
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      value = fn(...args) as ReturnType<T>;
    }
    return value;
  }) as T;
}
