// 200. Number of Islands

import { Queue } from '@datastructures-js/queue'

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

/**
 * DFS
 * T: O(m * n); S: O(m * n);
 */
function numIslands(grid: string[][]): number {
  // DFS traversal
  // Mark visited with "0" to prevent recount

  if (!grid || grid.length === 0 || grid[0].length === 0) return 0

  const m = grid.length
  const n = grid[0].length

  const dfs = (r: number, c: number) => {
    // Boundary check
    if (
      r < 0 ||
      r >= m ||
      c < 0 ||
      c >= n ||
      grid[r][c] === '0'
    ) {
      return
    }

    grid[r][c] = '0'

    dfs(r + 1, c)
    dfs(r - 1, c)
    dfs(r, c + 1)
    dfs(r, c - 1)
  }

  let count = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        dfs(i, j)
        count++
      }
    }
  }

  return count
};

/**
 * BFS
 * T: O(m * n); S: O(m * n);
 */
function numIslands2(grid: string[][]): number {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0

  const m = grid.length
  const n = grid[0].length
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  const bfs = (i: number, j: number) => {
    grid[i][j] = '0'

    const q = new Queue<[number, number]>([[i, j]])

    while (!q.isEmpty()) {
      const [r, c] = q.pop()!

      for (const [dr, dc] of directions) {
        const nr = r + dr
        const nc = c + dc

        if (
          nr >= 0 &&
          nr < m &&
          nc >= 0 &&
          nc < n &&
          grid[nr][nc] === '1'
        ) {
          q.push([nr, nc])
          grid[nr][nc] = '0'
        }
      }
    }
  }

  let count = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        bfs(i, j)
        count++
      }
    }
  }

  return count
};

/**
 * Disjoint Set Union
 * T: O(m * n); S: O(m * n);
 */
function numIslands3(grid: string[][]): number {
  // Map 2-D cell index to 1-D index:
  // (i, j) -> i + j * m
  // 3x3 grid -> index 0 to 8
  // (0, 0) -> 0
  // (1, 0) -> 1
  // (2, 0) -> 2
  // (0, 1) -> 3
  // (1, 1) -> 4
  // ...
  // (2, 2) -> 8

  // Put every cell into Disjoint Set.
  // Join two connected cell by union.

  if (!grid || grid.length === 0 || grid[0].length === 0) return 0

  const m = grid.length
  const n = grid[0].length

  // Standard UnionFind class
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

      if (rootX !== rootY) {
        if (this.rank[rootX] > this.rank[rootY]) {
          this.root[rootY] = rootX
        } else if (this.rank[rootX] < this.rank[rootY]) {
          this.root[rootX] = rootY
        } else {
          this.root[rootY] = rootX
          this.rank[rootY]++
        }
      }
    }

    connected(x: number, y: number) {
      return this.find(x) === this.find(y)
    }
  }

  const getIndex = (i: number, j: number) => {
    return i * n + j
    // Or (i + j * m)
  }

  const uf = new UnionFind(m * n)
  // Directions for down and right (no need for up and left)
  const directions = [[1, 0], [0, 1]]
  let count = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++

        const cellIndex = getIndex(i, j)

        // Visit adjacent cells
        for (const [dr, dc] of directions) {
          const nr = i + dr
          const nc = j + dc

          // Check valid island
          if (
            nr >= 0 &&
            nr < m &&
            nc >= 0 &&
            nc < n &&
            grid[nr][nc] === '1'
          ) {
            const newCellIndex = getIndex(nr, nc)

            // If not connected, connect them and decrement count
            if (!uf.connected(cellIndex, newCellIndex)) {
              uf.union(cellIndex, newCellIndex)
              count--
            }
          }
        }
      }
    }
  }

  return count
}

function runTests(solution: (grid: string[][]) => number): void {
  // Define test cases with the input grid and expected output
  const testCases: { grid: string[][], expected: number, description: string }[] = [
    {
      description: 'Example 1: Multiple islands with water boundaries',
      grid: [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
      ],
      expected: 1
    },
    {
      description: 'Example 2: Scattered islands',
      grid: [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1']
      ],
      expected: 3
    },
    {
      description: 'Edge Case: All water',
      grid: [
        ['0', '0', '0'],
        ['0', '0', '0']
      ],
      expected: 0
    },
    {
      description: 'Edge Case: All land',
      grid: [
        ['1', '1'],
        ['1', '1']
      ],
      expected: 1
    },
    {
      description: 'Edge Case: Single cell land',
      grid: [['1']],
      expected: 1
    },
    {
      description: 'Edge Case: Single cell water',
      grid: [['0']],
      expected: 0
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 200 Tests ===\n')

  testCases.forEach((test, index) => {
    // Create a deep copy of the grid to prevent mutations by the solution function
    const gridCopy = test.grid.map(row => [...row])

    const startTime = performance.now()
    const result = solution(gridCopy)
    const endTime = performance.now()

    const passed = result === test.expected
    if (passed) {
      passedCount++
    }

    console.log(`Test ${index + 1}: ${test.description}`)
    console.log(`- Expected: ${test.expected}`)
    console.log(`- Received: ${result}`)
    console.log(`- Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`- Time:     ${(endTime - startTime).toFixed(4)} ms`)
    console.log('--------------------------------------------------')
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(numIslands3)
