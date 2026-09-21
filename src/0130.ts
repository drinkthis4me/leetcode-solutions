// 130. Surrounded Regions

import { Queue } from '@datastructures-js/queue'

/**
 Do not return anything, modify board in-place instead.
 */

// Input: board = [
//   ["X","X","X","X"],
//   ["X","O","O","X"],
//   ["X","X","O","X"],
//   ["X","O","X","X"]
// ]

// Output: [
//   ["X","X","X","X"],
//   ["X","X","X","X"],
//   ["X","X","X","X"],
//   ["X","O","X","X"]
// ]

/**
 * DFS
 * T: O(m * n); S: O(m * n);
 */
function solve(board: string[][]): void {
  // Starting from bordered 'O', mark their group with 'S' (as safe)
  // Leftover 'O' are surrounded and should be captured (turn into 'X').
  // Revert 'S' back to 'O'.

  //   ["X","X","X","X"],
  //   ["X","O","O","X"],
  //   ["X","X","O","X"],
  //   ["X","S","X","X"]

  const m = board.length
  const n = board[0].length

  const dfs = (r: number, c: number) => {
    if (
      r < 0 ||
      r >= m ||
      c < 0 ||
      c >= n ||
      board[r][c] !== 'O'
    ) {
      return
    }

    board[r][c] = 'S'

    dfs(r + 1, c)
    dfs(r - 1, c)
    dfs(r, c + 1)
    dfs(r, c - 1)
  }

  // Mark bordered group as safe
  for (let i = 0; i < m; i++) {
    dfs(i, 0)
    dfs(i, n - 1)
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j)
    dfs(m - 1, j)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        // Capture: Turn not safe 'O' into 'X'
        board[i][j] = 'X'
      } else if (board[i][j] === 'S') {
        // Revert safe cells back to 'O'
        board[i][j] = 'O'
      }
    }
  }
};

/**
 * BFS
 * T: O(m * n); S: O(m * n);
 */
function solve2(board: string[][]): void {
  const m = board.length
  const n = board[0].length

  const q = new Queue<[number, number]>()
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  const bfs = () => {
    while (!q.isEmpty()) {
      const [r, c] = q.pop()!

      board[r][c] = 'S'

      for (const [dr, dc] of directions) {
        const nr = r + dr
        const nc = c + dc

        if (
          nr >= 0 &&
          nr < m &&
          nc >= 0 &&
          nc < n &&
          board[nr][nc] === 'O'
        ) {
          q.push([nr, nc])
        }
      }
    }
  }

  // Mark bordered group as safe
  for (let i = 0; i < m; i++) {
    if (board[i][0] === 'O') {
      q.push([i, 0])
    }
    if (board[i][n - 1] === 'O') {
      q.push([i, n - 1])
    }
  }
  for (let j = 0; j < n; j++) {
    if (board[0][j] === 'O') {
      q.push([0, j])
    }
    if (board[m - 1][j] === 'O') {
      q.push([m - 1, j])
    }
  }
  bfs()

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        // Capture: Turn not safe 'O' into 'X'
        board[i][j] = 'X'
      } else if (board[i][j] === 'S') {
        // Revert safe cells back to 'O'
        board[i][j] = 'O'
      }
    }
  }
};

/**
 * Disjoint Union Set
 * T: O(m * n); S: O(m * n);
 */
function solve3(board: string[][]): void {
  const m = board.length
  const n = board[0].length

  class UnionFind {
    root: number[]
    rank: number[]

    constructor(size: number) {
      this.root = Array.from({ length: size }, (_v, idx) => idx)
      this.rank = Array(size).fill(1)
    }

    find(x: number): number {
      if (this.root[x] === x) {
        return x
      }
      return this.root[x] = this.find(this.root[x])
    }

    union(x: number, y: number): void {
      const rootX = this.find(x)
      const rootY = this.find(y)

      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY
      } else {
        this.root[rootY] = rootX
        this.rank[rootY]++
      }
    }

    connected(x: number, y: number): boolean {
      return this.find(x) === this.find(y)
    }
  }

  const getIndex = (i: number, j: number) => i * n + j

  // Init UnionFind class with extra one dummy node
  // The dummy node will be the root of all safe cells
  const uf = new UnionFind(m * n + 1)
  const dummy = m * n

  // Connect all safe cells with dummy
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        if (i === 0 || j === 0 || i === m - 1 || j === n - 1) {
          // Case 1: bordered 'O'. Connect to dummy.
          uf.union(dummy, getIndex(i, j))
        } else {
          // Case2: inner 'O'. Connect to neighboring 'O'.
          for (const [dr, dc] of directions) {
            const nr = i + dr
            const nc = j + dc
            if (
              nr >= 0 &&
              nr < m &&
              nc >= 0 &&
              nc < n &&
              board[nr][nc] === 'O'
            ) {
              uf.union(getIndex(i, j), getIndex(nr, nc))
            }
          }
        }
      }
    }
  }

  // Check cells not connected to dummy and capture
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!uf.connected(dummy, getIndex(i, j))) {
        board[i][j] = 'X'
      }
    }
  }
};

/**
 * Test Runner
 */
function runTests(solution: (board: string[][]) => void): void {
  // Helper function to compare 2D arrays
  function arraysEqual(a: string[][], b: string[][]): boolean {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i].length !== b[i].length) return false
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] !== b[i][j]) return false
      }
    }
    return true
  }

  // Helper function to format board output
  function printBoard(board: string[][]): void {
    board.forEach(row => console.log(`    [${row.map(val => `"${val}"`).join(', ')}]`))
  }

  // Test cases for LeetCode 130: Surrounded Regions
  const testCases: { input: string[][], expected: string[][] }[] = [
    {
      input: [
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'X'],
        ['X', 'O', 'X', 'X']
      ],
      expected: [
        ['X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'X', 'X']
      ]
    },
    {
      input: [
        ['X']
      ],
      expected: [
        ['X']
      ]
    },
    {
      input: [
        ['O', 'O'],
        ['O', 'O']
      ],
      expected: [
        ['O', 'O'],
        ['O', 'O']
      ]
    },
    {
      input: [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['X', 'O', 'X']
      ],
      expected: [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['X', 'O', 'X']
      ]
    },
    {
      input: [['O', 'X', 'X', 'O', 'X'], ['X', 'O', 'O', 'X', 'O'], ['X', 'O', 'X', 'O', 'X'], ['O', 'X', 'O', 'O', 'O'], ['X', 'X', 'O', 'X', 'O']],
      expected: [['O', 'X', 'X', 'O', 'X'], ['X', 'X', 'X', 'X', 'O'], ['X', 'X', 'X', 'O', 'X'], ['O', 'X', 'O', 'O', 'O'], ['X', 'X', 'O', 'X', 'O']]
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Deep copy the input board so the solution mutates a fresh copy
    const boardCopy = test.input.map(row => [...row])

    // Execute the solution (LeetCode 130 modifies the board in-place)
    solution(boardCopy)

    // Compare result with expected
    const isPassed = arraysEqual(boardCopy, test.expected)

    if (isPassed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log('  Input:')
      printBoard(test.input)
      console.log('  Expected:')
      printBoard(test.expected)
      console.log('  Got:')
      printBoard(boardCopy)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(solve3)
