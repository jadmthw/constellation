/**
 * Prefix tree (trie) for efficient string prefix lookups and autocomplete.
 */

interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
}

/**
 * A simple trie supporting insertion, exact search, and prefix matching.
 */
export class Trie {
  private root: TrieNode = { children: new Map(), isEnd: false };

  /**
   * Inserts a word into the trie.
   * @param word - Non-empty string to insert.
   */
  insert(word: string): void {
    if (!word) return;
    let node = this.root;
    for (const char of word) {
      let child = node.children.get(char);
      if (!child) {
        child = { children: new Map(), isEnd: false };
        node.children.set(char, child);
      }
      node = child;
    }
    node.isEnd = true;
  }

  /**
   * Checks whether the exact word exists in the trie.
   * @param word - Word to look up.
   * @returns true if the word was previously inserted.
   */
  search(word: string): boolean {
    const node = this.walk(word);
    return node !== null && node.isEnd;
  }

  /**
   * Checks whether any word in the trie starts with the given prefix.
   * @param prefix - Prefix string.
   * @returns true if at least one word shares the prefix.
   */
  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null;
  }

  /**
   * Collects all words that start with the given prefix.
   * @param prefix - Prefix to match.
   * @returns Array of matching words (may be empty).
   */
  wordsWithPrefix(prefix: string): string[] {
    const node = this.walk(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collect(node, prefix, results);
    return results;
  }

  private walk(s: string): TrieNode | null {
    let node: TrieNode = this.root;
    for (const char of s) {
      const child = node.children.get(char);
      if (!child) return null;
      node = child;
    }
    return node;
  }

  private collect(node: TrieNode, path: string, out: string[]): void {
    if (node.isEnd) out.push(path);
    for (const [char, child] of node.children) {
      this.collect(child, path + char, out);
    }
  }
}
