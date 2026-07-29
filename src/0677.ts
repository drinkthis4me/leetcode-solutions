// 677. Map Sum Pairs
/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 *
 Input
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output
[null, null, 3, null, 5]

Explanation
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
 */

/**
 * Hash Map
 */
class MapSum {
  // Map of (key, val)
  map: Map<string, number>
  // Map of (prefix, score)
  score: Map<string, number>

  constructor() {
    this.map = new Map()
    this.score = new Map()
  }

  /**
   * T: O(k^2); S:O(n)
   */
  insert(key: string, val: number): void {
    const diff = val - (this.map.get(key) || 0)

    this.map.set(key, val)

    let prefix = ''
    for (const c of key) {
      prefix += c
      const newScore = (this.score.get(prefix) || 0) + diff
      this.score.set(prefix, newScore)
    }
  }

  /**
   * T: O(1); S:O(n)
   */
  sum(prefix: string): number {
    return this.score.get(prefix) || 0
  }
}

/**
 * Trie
 */
class TrieNode {
  children: Map<string, TrieNode> = new Map()
  score: number = 0

  constructor() {}
}

class MapSum2 {
  // Map of (key, val)
  map: Map<string, number>
  // Trie for prefix
  root: TrieNode

  constructor() {
    this.map = new Map()
    this.root = new TrieNode()
  }

  /**
   * T: O(k); S:O(n)
   */
  insert(key: string, val: number): void {
    const diff = val - (this.map.get(key) || 0)

    this.map.set(key, val)

    let curr = this.root
    curr.score += diff

    for (const c of key) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new TrieNode())
      }
      curr = curr.children.get(c)!
      curr.score += diff
    }
  }

  /**
   * T: O(k); S:O(n)
   */
  sum(prefix: string): number {
    let curr = this.root
    for (const c of prefix) {
      if (!curr.children.has(c)) return 0

      curr = curr.children.get(c)!
    }

    return curr.score
  }
}

interface TestCase {
  id: number
  operations: ('insert' | 'sum')[]
  arguments: ([string, number] | [string])[]
  expected: (number | null)[]
}

// MapSum constructor type definition
interface MapSumInstance {
  insert(key: string, val: number): void
  sum(prefix: string): number
}

/**
 * Runs multiple test cases for LeetCode 677: Map Sum Pairs.
 * @param MapSumConstructor The solution class implementation.
 */
function runTests(MapSumConstructor: new () => MapSumInstance): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      operations: ['insert', 'sum', 'insert', 'sum'],
      arguments: [['apple', 3], ['ap'], ['app', 2], ['ap']],
      expected: [null, null, 3, null, 5]
    },
    {
      id: 2,
      operations: ['insert', 'sum', 'insert', 'sum'],
      arguments: [['apple', 3], ['apple'], ['apple', 5], ['apple']],
      expected: [null, null, 3, null, 5] // Testing key update/override behavior
    },
    {
      id: 3,
      operations: ['insert', 'insert', 'insert', 'sum', 'sum', 'sum'],
      arguments: [['car', 10], ['cart', 5], ['cat', 2], ['car'], ['ca'], ['dog']],
      expected: [null, null, null, null, 15, 17, 0] // Testing prefixes and missing keys
    },
    {
      id: 4,
      operations: ['insert', 'sum', 'insert', 'sum'],
      arguments: [['a', 3], ['ap'], ['b', 2], ['a']],
      expected: [null, null, 0, null, 3]
    }
  ]

  let passedCount = 0

  testCases.forEach(({ id, operations, arguments: args, expected }) => {
    const mapSum = new MapSumConstructor()
    const results: (number | null)[] = [null] // First element corresponds to constructor call

    for (let i = 0; i < operations.length; i++) {
      const op = operations[i]
      if (op === 'insert') {
        const [key, val] = args[i] as [string, number]
        mapSum.insert(key, val)
        results.push(null)
      } else if (op === 'sum') {
        const [prefix] = args[i] as [string]
        const res = mapSum.sum(prefix)
        results.push(res)
      }
    }

    // Validate results
    const isPassed = results.every((val, index) => val === expected[index])

    if (isPassed) {
      passedCount++
      console.log(`[PASS] Test Case ${id}`)
    } else {
      console.error(`[FAIL] Test Case ${id}`)
      console.error(`  Expected: ${JSON.stringify(expected)}`)
      console.error(`  Received: ${JSON.stringify(results)}`)
    }
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(MapSum2)
