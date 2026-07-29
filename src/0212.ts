// 212. Word Search II

// Input: board = [["o","a","a","n"],
//                 ["e","t","a","e"],
//                 ["i","h","k","r"],
//                 ["i","f","l","v"]],
//        words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]

/**
 * Backtrack
 * T: O(W * S * 4 * 3^(L-1)); S: O(L + W * L);
 * where W = Number of words
 * L = Max length of a word in words
 * M = Number of rows
 * N = Number of columns
 * S = M * N
 */
function findWords(board: string[][], words: string[]): string[] {
  const m = board.length
  const n = board[0].length

  const res: string[] = []
  const visited = new Set<string>()

  const getKey = (i: number, j: number): string => {
    return `${i}-${j}`
  }

  const backtrack = (r: number, c: number, word: string, i: number): boolean => {
    // Base case: all chars found
    if (i >= word.length) return true

    // Edge case: out of bound / not matching / already visited
    if (
      r < 0 ||
      r >= m ||
      c < 0 ||
      c >= n ||
      board[r][c] !== word[i] ||
      visited.has(getKey(r, c))
    ) {
      return false
    }

    // Mark current cell as visited
    visited.add(getKey(r, c))

    // Move four directions to find the next char
    const result =
      backtrack(r + 1, c, word, i + 1) ||
      backtrack(r - 1, c, word, i + 1) ||
      backtrack(r, c + 1, word, i + 1) ||
      backtrack(r, c - 1, word, i + 1)

    // Unmark visited for the next starting cell
    visited.delete(getKey(r, c))

    return result
  }

  for (const word of words) {
    visited.clear()
    let found = false

    // Find starting cell
    for (let i = 0; i < m; i++) {
      if (found) break
      for (let j = 0; j < n; j++) {
        if (board[i][j] === word[0] && backtrack(i, j, word, 0)) {
          res.push(word)
          found = true
          break
        }
      }
    }
  }

  return res
}

/**
 * Trie
 * T: O(M * N * 4 * 3^(L-1)); S: O(L + W * L);
 */
function findWords2(board: string[][], words: string[]): string[] {
  // Trie to store all words as dictionary.
  // For each cell, find the prefix in trie.
  // Return found word at leaf node.
  // Mark/Unmark visited cell with '#' for space efficiency.

  class TrieNode {
    children: Array<null | TrieNode>
    word: string | null

    constructor() {
      this.children = new Array(26).fill(null)
      this.word = null
    }
  }

  class Trie {
    root: TrieNode

    constructor() {
      this.root = new TrieNode()
    }

    insert(word: string): void {
      let curr = this.root
      for (let i = 0; i < word.length; i++) {
        const idx = Trie.getIndex(word[i])
        if (curr.children[idx] === null) {
          curr.children[idx] = new TrieNode()
        }
        curr = curr.children[idx]
      }
      curr.word = word
    }

    static getIndex(char: string): number {
      return char.charCodeAt(0) - 'a'.charCodeAt(0)
    }

    // No need for "search" method.
    // We will manually traverse nodes in dfs.
  }

  const m = board.length
  const n = board[0].length
  const res: string[] = []

  const dfs = (r: number, c: number, node: TrieNode | null) => {
    if (
      r < 0 ||
      r >= m ||
      c < 0 ||
      c >= n ||
      board[r][c] === '#' ||
      node === null ||
      node.children[Trie.getIndex(board[r][c])] === null
    ) {
      return
    }

    const nextNode = node.children[Trie.getIndex(board[r][c])]!

    if (nextNode.word) {
      res.push(nextNode.word)
      // Prevent duplicate found from other cell
      nextNode.word = null
    }

    // Got to the next character and then backtrack
    const char = board[r][c]
    board[r][c] = '#'
    dfs(r + 1, c, nextNode)
    dfs(r - 1, c, nextNode)
    dfs(r, c + 1, nextNode)
    dfs(r, c - 1, nextNode)
    board[r][c] = char

    // (Optimization) Pruning: If nextNode has no word and no children left, remove it from the parent
    if (
      nextNode.word === null &&
      nextNode.children.every(node => node === null)
    ) {
      node.children[Trie.getIndex(board[r][c])] = null
    }
  }

  const trie = new Trie()
  for (const word of words) {
    trie.insert(word)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Start at cell (i, j), build word from Trie node.
      dfs(i, j, trie.root)
    }
  }

  return res
}

/**
 * Test runner for LeetCode 212: Word Search II
 *
 * @param solutionFn - The function implementing the Word Search II algorithm.
 *                     Signature: (board: string[][], words: string[]) => string[]
 */
function runTests(solutionFn: (board: string[][], words: string[]) => string[]): void {
  // Define the structure of a test case
  interface TestCase {
    name: string
    board: string[][]
    words: string[]
    expected: string[]
  }

  const testCases: TestCase[] = [
    {
      name: 'Example 1 from LeetCode',
      board: [
        ['o', 'a', 'a', 'n'],
        ['e', 't', 'a', 'e'],
        ['i', 'h', 'k', 'r'],
        ['i', 'f', 'l', 'v']
      ],
      words: ['oath', 'pea', 'eat', 'rain'],
      expected: ['eat', 'oath']
    },
    {
      name: 'Example 2 from LeetCode',
      board: [
        ['a', 'b'],
        ['c', 'd']
      ],
      words: ['abcb'],
      expected: []
    },
    {
      name: 'Single letter board and word match',
      board: [
        ['a']
      ],
      words: ['a'],
      expected: ['a']
    },
    {
      name: 'No words match',
      board: [
        ['a', 'b'],
        ['c', 'd']
      ],
      words: ['xyz', 'pq'],
      expected: []
    },
    {
      name: 'Duplicate words in input list',
      board: [
        ['a', 'b'],
        ['c', 'd']
      ],
      words: ['ab', 'cd'],
      expected: ['ab', 'cd']
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 212 Tests ===\n')

  testCases.forEach((test, index) => {
    try {
      // Execute the solution function
      const result = solutionFn(test.board, test.words)

      // Normalize results by sorting to ensure order independence in comparison
      const normalizedResult = [...result].sort()
      const normalizedExpected = [...test.expected].sort()

      // Check equality (simple JSON comparison after sorting)
      const passed = JSON.stringify(normalizedResult) === JSON.stringify(normalizedExpected)

      if (passed) {
        passedCount++
        console.log(`[PASS] Test ${index + 1}: ${test.name}`)
      } else {
        console.log(`[FAIL] Test ${index + 1}: ${test.name}`)
        console.log('  Board:    ', JSON.stringify(test.board))
        console.log('  Words:    ', JSON.stringify(test.words))
        console.log('  Expected: ', JSON.stringify(normalizedExpected))
        console.log('  Received: ', JSON.stringify(normalizedResult))
      }
    } catch (error) {
      console.log(`[ERROR] Test ${index + 1}: ${test.name}`)
      console.log('  Threw an error:', error)
    }
  })

  console.log('\n=== Test Summary ===')
  console.log(`Passed: ${passedCount} / ${testCases.length}`)
}

runTests(findWords2)
