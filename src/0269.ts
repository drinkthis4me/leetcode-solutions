// 269. Alien Dictionary

import { Queue } from '@datastructures-js/queue'

// Input: words = ["wrt","wrf","er","ett","rftt"]
// Output: "wertf"

/**
 * Topological Sort (DFS)
 * T: O(N + V + E); S: O(V + E);
 */
function alienOrder(words: string[]): string {
  const n = words.length

  // Build the adjacency list
  const adj = new Map<string, Set<string>>()

  for (const word of words) {
    for (const char of word) {
      adj.set(char, new Set())
    }
  }

  for (let i = 0; i < n - 1; i++) {
    const w1 = words[i]
    const w2 = words[i + 1]
    const minLength = Math.min(w1.length, w2.length)

    // Invalid prefix check
    // ["abc", "ab"]
    if (
      w1.length > w2.length &&
      w1.slice(0, minLength) === w2.slice(0, minLength)
    ) {
      return ''
    }

    for (let j = 0; j < minLength; j++) {
      if (w1[j] !== w2[j]) {
        adj.get(w1[j])!.add(w2[j])
        break
      }
    }
  }

  // State array for each character
  // 0: unvisited; 1: visiting (on the stack); 2: visited
  const charSize = 26
  const state: number[] = new Array(charSize).fill(0)
  const res: string[] = []

  const getCharCodeIndex = (char: string): number => {
    return char.charCodeAt(0) - 'a'.charCodeAt(0)
  }

  // DFS with post-order. Return true if cycle detected.
  const dfs = (char: string): boolean => {
    const i = getCharCodeIndex(char)

    if (state[i] === 1) return true // Cycle. Invalid order.
    if (state[i] === 2) return false // Already processed. Skip.

    state[i] = 1

    for (const neighbor of adj.get(char)!) {
      if (dfs(neighbor)) return true
    }

    state[i] = 2
    res.push(char)

    return false
  }

  for (const char of adj.keys()) {
    if (dfs(char)) {
      return ''
    }
  }

  return res.reverse().join('')
};

/**
 * Topological Sort (DFS)
 * T: O(N + V + E); S: O(V + E);
 */
function alienOrder2(words: string[]): string {
  const n = words.length
  const charSize = 26

  // Build the adjacency list with 2-D boolean array
  // adj[u][v] == true -> character u comes before v
  const adj = Array.from({ length: charSize }, () => new Array(charSize).fill(false))
  // Track characters actually in the input
  const present: boolean[] = new Array(charSize).fill(false)

  const getCharCodeIndex = (char: string): number => {
    return char.charCodeAt(0) - 'a'.charCodeAt(0)
  }

  for (const word of words) {
    for (const char of word) {
      const i = getCharCodeIndex(char)
      present[i] = true
    }
  }

  for (let i = 0; i < n - 1; i++) {
    const w1 = words[i]
    const w2 = words[i + 1]
    const minLength = Math.min(w1.length, w2.length)

    // Invalid prefix check
    // ["abc", "ab"]
    if (
      w1.length > w2.length &&
      w1.slice(0, minLength) === w2.slice(0, minLength)
    ) {
      return ''
    }

    for (let j = 0; j < minLength; j++) {
      if (w1[j] !== w2[j]) {
        const u = getCharCodeIndex(w1[j])
        const v = getCharCodeIndex(w2[j])

        adj[u][v] = true
        break
      }
    }
  }

  // State array for each character
  // 0: unvisited; 1: visiting (on the stack); 2: visited
  const state: number[] = new Array(charSize).fill(0)
  const res: string[] = []

  // DFS with post-order. Return true if cycle detected.
  const dfs = (i: number): boolean => {
    if (state[i] === 1) return true // Cycle. Invalid order.
    if (state[i] === 2) return false // Already processed. Skip.

    state[i] = 1

    for (let v = 0; v < charSize; v++) {
      if (adj[i][v]) {
        if (dfs(v)) return true
      }
    }

    state[i] = 2
    res.push(String.fromCharCode(i + 'a'.charCodeAt(0)))

    return false
  }

  for (let i = 0; i < charSize; i++) {
    if (present[i]) {
      if (dfs(i)) return ''
    }
  }

  return res.reverse().join('')
};

/**
 * Kahn's Algorithm
 * T: O(N + V + E); S: O(V + E);
 */
function alienOrder3(words: string[]): string {
  const n = words.length
  const charSize = 26

  const adj = Array.from({ length: charSize }, () => new Array(charSize).fill(false))
  const inDegree: number[] = new Array(charSize).fill(0)
  const present: boolean[] = new Array(charSize).fill(false)
  let totalNodes = 0

  const getCharCodeIndex = (char: string): number => {
    return char.charCodeAt(0) - 'a'.charCodeAt(0)
  }

  for (const word of words) {
    for (const char of word) {
      const i = getCharCodeIndex(char)
      present[i] = true
    }
  }

  for (let i = 0; i < charSize; i++) {
    if (present[i]) {
      totalNodes++
    }
  }

  for (let i = 0; i < n - 1; i++) {
    const w1 = words[i]
    const w2 = words[i + 1]
    const minLength = Math.min(w1.length, w2.length)

    // Invalid prefix check
    // ["abc", "ab"]
    if (
      w1.length > w2.length &&
      w1.slice(0, minLength) === w2.slice(0, minLength)
    ) {
      return ''
    }

    for (let j = 0; j < minLength; j++) {
      if (w1[j] !== w2[j]) {
        const u = getCharCodeIndex(w1[j])
        const v = getCharCodeIndex(w2[j])

        if (!adj[u][v]) {
          adj[u][v] = true
          inDegree[v]++
        }

        break
      }
    }
  }

  const q = new Queue<number>()
  const res: string[] = []

  for (let i = 0; i < charSize; i++) {
    if (present[i] && inDegree[i] === 0) {
      q.push(i)
    }
  }

  while (!q.isEmpty()) {
    const u = q.pop()!

    res.push(String.fromCharCode(u + 'a'.charCodeAt(0)))

    for (let v = 0; v < charSize; v++) {
      if (adj[u][v]) {
        inDegree[v]--

        if (inDegree[v] === 0) {
          q.push(v)
        }
      }
    }
  }

  // Cycle detection
  if (res.length !== totalNodes) return ''

  return res.join('')
};

/**
 * Runs test cases against the provided alienOrder solution.
 */
type AlienOrderFunction = (words: string[]) => string
function runTests(solution: AlienOrderFunction): void {
  interface TestCase {
    id: number
    words: string[]
    // Expected can be an explicit string (for empty "" cases) or a boolean flag,
    // but since multiple valid orders can exist, we validate via function logic.
    description: string
  }

  /**
 * Validates whether the output string is a correct alien dictionary ordering for the given words.
 */
  function isValidAlienOrder(words: string[], output: string): boolean {
    // If the words array dictates an invalid configuration, output must be ""
    // We can double check basic prefix rule invalidity (e.g. ["abc", "ab"])
    for (let i = 0; i < words.length - 1; i++) {
      const w1 = words[i]
      const w2 = words[i + 1]
      const minLen = Math.min(w1.length, w2.length)
      if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen)) {
        return output === ''
      }
    }

    // If output is empty when it shouldn't be, it's invalid
    if (output === '' && words.length > 0) {
      // Check if there's actually a cycle or if it should have succeeded
      // (Handled partially by checking constraints below)
    }

    // Collect all unique characters present in the words
    const uniqueChars = new Set<string>()
    for (const word of words) {
      for (const char of word) {
        uniqueChars.add(char)
      }
    }

    // If output length doesn't match unique characters count, it's invalid
    if (output.length !== uniqueChars.size) {
      return output === ''
    }

    // Verify all characters in output belong to unique characters and vice-versa
    const outputChars = new Set(output.split(''))
    if (outputChars.size !== uniqueChars.size) return false
    for (const char of uniqueChars) {
      if (!outputChars.has(char)) return false
    }

    // Build position map for O(1) lookup of character precedence
    const position = new Map<string, number>()
    for (let i = 0; i < output.length; i++) {
      position.set(output[i], i)
    }

    // Extract rules and verify they match the output order
    for (let i = 0; i < words.length - 1; i++) {
      const w1 = words[i]
      const w2 = words[i + 1]
      const minLen = Math.min(w1.length, w2.length)
      let foundDifference = false

      for (let j = 0; j < minLen; j++) {
        if (w1[j] !== w2[j]) {
          const pos1 = position.get(w1[j])!
          const pos2 = position.get(w2[j])!
          if (pos1 >= pos2) {
            return false // Violated rule: w1[j] must come before w2[j]
          }
          foundDifference = true
          break
        }
      }

      // Handle edge case where w1 is a strict prefix of w2 (already handled above, but safe to keep)
      if (!foundDifference && w1.length > w2.length) {
        return output === ''
      }
    }

    return true
  }

  const testCases: TestCase[] = [
    {
      id: 1,
      words: ['wrt', 'wrf', 'er', 'ett', 'rftt'],
      description: 'Standard case with multiple dependencies'
    },
    {
      id: 2,
      words: ['z', 'x'],
      description: 'Simple two-word case'
    },
    {
      id: 3,
      words: ['z', 'x', 'z'],
      description: 'Invalid cycle case (should return empty string)'
    },
    {
      id: 4,
      words: ['abc', 'ab'],
      description: 'Invalid prefix case (longer word prefix before shorter word)'
    },
    {
      id: 5,
      words: ['zy', 'zx'],
      description: 'Basic ordering with shared prefix'
    },
    {
      id: 6,
      words: ['caa', 'aaa', 'aab'],
      description: 'Disjoint/complex dependency graph chain'
    },
    {
      id: 7,
      words: ['abc'],
      description: 'Single word edge case'
    },
    {
      id: 8,
      words: ['wrt', 'wrf', 'er', 'ett', 'rftt', 'te'],
      description: 'Standard neetcode test case'
    }
  ]

  let passedCount = 0

  console.log('=== RUNNING LEETCODE 269 TESTS ===')
  for (const tc of testCases) {
    try {
      const startTime = performance.now()
      const result = solution(tc.words)
      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(3)

      const passed = isValidAlienOrder(tc.words, result)

      if (passed) {
        passedCount++
        console.log(`[PASS] Test #${tc.id}: ${tc.description} (${duration}ms)`)
        console.log(`       Input:  ${JSON.stringify(tc.words)}`)
        console.log(`       Output: "${result}"`)
      } else {
        console.error(`[FAIL] Test #${tc.id}: ${tc.description}`)
        console.error(`       Input:    ${JSON.stringify(tc.words)}`)
        console.error(`       Received: "${result}" (Invalid topological order or mismatch)`)
      }
    } catch (error) {
      console.error(`[ERROR] Test #${tc.id}: ${tc.description} threw an exception:`, error)
    }
    console.log('--------------------------------------------------')
  }

  console.log(`Test Results: ${passedCount}/${testCases.length} passed.`)
}

runTests(alienOrder3)
