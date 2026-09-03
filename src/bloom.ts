/**
 * Space-efficient probabilistic set membership filter (Bloom filter).
 * False positives are possible; false negatives are not.
 */

/**
 * A Bloom filter that answers "might contain" queries with a tunable
 * false-positive rate.
 */
export class BloomFilter {
  private readonly bits: Uint8Array;
  private readonly size: number;
  private readonly hashCount: number;

  /**
   * Creates a Bloom filter.
   * @param expectedItems - Approximate number of items that will be inserted.
   * @param falsePositiveRate - Desired maximum false-positive probability (0 < rate < 1).
   */
  constructor(expectedItems: number, falsePositiveRate = 0.01) {
    if (expectedItems <= 0) throw new Error("expectedItems must be positive");
    if (falsePositiveRate <= 0 || falsePositiveRate >= 1) {
      throw new Error("falsePositiveRate must be between 0 and 1");
    }

    const ln2 = Math.LN2;
    this.size = Math.ceil(
      (-expectedItems * Math.log(falsePositiveRate)) / (ln2 * ln2)
    );
    this.hashCount = Math.max(1, Math.round((this.size / expectedItems) * ln2));
    this.bits = new Uint8Array(Math.ceil(this.size / 8));
  }

  /**
   * Adds an item to the filter.
   * @param item - String or number to insert.
   */
  add(item: string | number): void {
    const key = String(item);
    for (let i = 0; i < this.hashCount; i++) {
      const idx = this.hash(key, i) % this.size;
      this.bits[idx >> 3] |= 1 << (idx & 7);
    }
  }

  /**
   * Tests whether an item might be present.
   * @param item - String or number to test.
   * @returns true if the item is possibly in the set; false if definitely absent.
   */
  mightContain(item: string | number): boolean {
    const key = String(item);
    for (let i = 0; i < this.hashCount; i++) {
      const idx = this.hash(key, i) % this.size;
      if ((this.bits[idx >> 3] & (1 << (idx & 7))) === 0) return false;
    }
    return true;
  }

  /** Number of bits allocated for the filter. */
  get bitCount(): number {
    return this.size;
  }

  /** Number of independent hash functions used. */
  get hashes(): number {
    return this.hashCount;
  }

  /** Simple double-hashing scheme based on FNV-1a style mixing. */
  private hash(key: string, seed: number): number {
    let h = 2166136261 ^ seed;
    for (let i = 0; i < key.length; i++) {
      h ^= key.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
}
