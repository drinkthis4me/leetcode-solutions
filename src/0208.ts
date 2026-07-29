// 208. Implement Trie (Prefix Tree)

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/**
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
*/

// Define the interface for the Trie structure expected by the tests
interface ITrie {
  insert(word: string): void
  search(word: string): boolean
  startsWith(prefix: string): boolean
}

/**
 * Array as Trie Node
 */
class TrieNodeArray {
  children: Array<TrieNodeArray | null>
  isEnd: boolean

  constructor() {
    this.children = new Array(26).fill(null)
    this.isEnd = false
  }
}

class Trie implements ITrie {
  root: TrieNodeArray

  constructor() {
    this.root = new TrieNodeArray()
  }

  insert(word: string): void {
    let curr: TrieNodeArray = this.root

    for (const char of word) {
      const idx = this.getCharCodeIdx(char)

      if (curr.children[idx] === null) {
        curr.children[idx] = new TrieNodeArray()
      }
      curr = curr.children[idx]
    }

    curr.isEnd = true
  }

  search(word: string): boolean {
    let curr = this.root

    for (const char of word) {
      const idx = this.getCharCodeIdx(char)

      if (curr.children[idx] === null) return false

      curr = curr.children[idx]
    }

    return curr.isEnd
  }

  startsWith(prefix: string): boolean {
    let curr = this.root

    for (const char of prefix) {
      const idx = this.getCharCodeIdx(char)

      if (curr.children[idx] === null) return false

      curr = curr.children[idx]
    }

    return true
  }

  getCharCodeIdx(char: string): number {
    return char.charCodeAt(0) - 'a'.charCodeAt(0)
  }
}

/**
 * Hash Map as Trie Node
 */
class TrieNodeMap {
  children: Map<string, TrieNodeMap>
  isEnd: boolean

  constructor() {
    this.children = new Map()
    this.isEnd = false
  }
}

class Trie2 implements ITrie {
  root: TrieNodeMap

  constructor() {
    this.root = new TrieNodeMap()
  }

  insert(word: string): void {
    let curr: TrieNodeMap = this.root

    for (const c of word) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new TrieNodeMap())
      }
      curr = curr.children.get(c)!
    }

    curr.isEnd = true
  }

  search(word: string): boolean {
    let curr = this.root

    for (const c of word) {
      if (!curr.children.has(c)) return false

      curr = curr.children.get(c)!
    }

    return curr.isEnd
  }

  startsWith(prefix: string): boolean {
    let curr = this.root

    for (const c of prefix) {
      if (!curr.children.has(c)) return false

      curr = curr.children.get(c)!
    }

    return true
  }
}

/**
 * Test Runner
 */
type TrieConstructor = new () => ITrie

function runTests(TrieSolution: TrieConstructor): void {
  let passedCount = 0
  let failedCount = 0

  interface TestCase {
    name: string
    operations: string[]
    arguments: (string[])[]
    expected: (boolean | null)[]
  }

  const testCases: TestCase[] = [
    {
      name: 'LeetCode Example 1',
      operations: ['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'],
      arguments: [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']],
      expected: [null, null, true, false, true, null, true]
    },
    {
      name: 'Empty Trie Checks',
      operations: ['Trie', 'search', 'startsWith'],
      arguments: [[], ['a'], ['a']],
      expected: [null, false, false]
    },
    {
      name: 'Duplicate Insertions and Prefixes',
      operations: ['Trie', 'insert', 'insert', 'search', 'search', 'startsWith', 'startsWith'],
      arguments: [[], ['cat'], ['cats'], ['cat'], ['cater'], ['cat'], ['bat']],
      expected: [null, null, null, true, false, true, false]
    }
  ]

  console.log('--- Test for class: ' + TrieSolution.name + '---\n')

  testCases.forEach((tc, index) => {
    try {
      let trie: ITrie | null = null
      const results: (boolean | null)[] = []

      for (let i = 0; i < tc.operations.length; i++) {
        const op = tc.operations[i]
        const args = tc.arguments[i]

        if (op === 'Trie') {
          trie = new TrieSolution()
          results.push(null)
        } else if (trie) {
          if (op === 'insert') {
            trie.insert(args[0])
            results.push(null)
          } else if (op === 'search') {
            results.push(trie.search(args[0]))
          } else if (op === 'startsWith') {
            results.push(trie.startsWith(args[0]))
          }
        }
      }

      // Compare results with expected output
      const isMatch = JSON.stringify(results) === JSON.stringify(tc.expected)

      if (isMatch) {
        console.log(`[PASS] Test Case ${index + 1}: ${tc.name}`)
        passedCount++
      } else {
        console.error(`[FAIL] Test Case ${index + 1}: ${tc.name}`)
        console.error('  Expected:', tc.expected)
        console.error('  Received:', results)
        failedCount++
      }
    } catch (error) {
      console.error(`[ERROR] Test Case ${index + 1}: ${tc.name} threw an exception:`, error)
      failedCount++
    }
  })

  console.log('\n--- Test Complete ---')
}

runTests(Trie2)
