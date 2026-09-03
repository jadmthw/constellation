/**
 * Minimal binary heap (min-heap by default) implementation.
 * Supports custom comparators for max-heap or priority queues.
 */

export type Comparator<T> = (a: T, b: T) => number;

/**
 * A binary heap that keeps the smallest (or highest priority) element at the root.
 *
 * @typeParam T - Element type stored in the heap.
 */
export class Heap<T> {
  private data: T[] = [];
  private readonly compare: Comparator<T>;

  /**
   * Creates a new heap.
   * @param compare - Optional comparator. Defaults to numeric ascending order.
   */
  constructor(compare?: Comparator<T>) {
    this.compare =
      compare ??
      ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
  }

  /** Number of elements currently in the heap. */
  get size(): number {
    return this.data.length;
  }

  /** Whether the heap contains no elements. */
  get isEmpty(): boolean {
    return this.data.length === 0;
  }

  /**
   * Inserts a value into the heap while preserving the heap property.
   * @param value - Element to insert.
   */
  push(value: T): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  /**
   * Removes and returns the root element (smallest by default).
   * @returns The root element, or undefined if the heap is empty.
   */
  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    const root = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return root;
  }

  /**
   * Returns the root element without removing it.
   * @returns The root element, or undefined if the heap is empty.
   */
  peek(): T | undefined {
    return this.data[0];
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.compare(this.data[index], this.data[parent]) >= 0) break;
      [this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.data.length;
    while (true) {
      const left = (index << 1) + 1;
      const right = left + 1;
      let smallest = index;

      if (left < length && this.compare(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.compare(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
      index = smallest;
    }
  }
}
