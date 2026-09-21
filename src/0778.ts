// 778. Swim in Rising Water

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

// Input: grid = [[0,2],[1,3]]
// Output: 3
// Input: grid = [
//   [0,1,2,3,4],
//   [24,23,22,21,5],
//   [12,13,14,15,16],
//   [11,17,18,19,20],
//   [10,9,8,7,6]
// ]
// Output: 16

/**
 * DFS + Binary Search
 * T: O(n^2 log n); S: O(n^2);
 */
function swimInWater(grid: number[][]): number {
  // Find the min height (minH) and max height (maxH) of the grid
  // Gradually increasing water level from minH to maxH
  // At each level, DFS to find if we can reach target from source
  // Return the min water level

  // Improvement: Binary search on water level.

  const n = grid.length
  const visited = new Set<number>()
  const getVisitedIndex = (r: number, c: number) => r * n + c

  let minH = grid[0][0]
  let maxH = grid[0][0]
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      minH = Math.min(minH, grid[r][c])
      maxH = Math.max(maxH, grid[r][c])
    }
  }

  // DFS to reach target
  // At (r, c). With t as current water level.
  const dfs = (t: number, r: number, c: number, visited: Set<number>): boolean => {
    const index = getVisitedIndex(r, c)

    if (
      r < 0 || // Boundary check
      c < 0 ||
      r >= n ||
      c >= n ||
      visited.has(index) || // Visited check
      grid[r][c] > t // Water level check
    ) {
      return false
    }

    if (r === n - 1 && c === n - 1) return true

    visited.add(index)

    return (
      dfs(t, r + 1, c, visited) ||
      dfs(t, r - 1, c, visited) ||
      dfs(t, r, c + 1, visited) ||
      dfs(t, r, c - 1, visited)
    )
  }

  let l = minH
  let r = maxH
  while (l < r) {
    const m = l + Math.floor((r - l) / 2)

    if (dfs(m, 0, 0, visited)) {
      r = m
    } else {
      l = m + 1
    }

    visited.clear()
  }

  return r
}

/**
 * Dijkstra's Algorithm
 * T: O(n^2 log n); S: O(n^2);
 */
function swimInWater2(grid: number[][]): number {
  const n = grid.length

  const visited = new Set<number>()
  const getIndex = (r: number, c: number) => r * n + c
  // Min Priority Queue for [subtotal_time, row_index, col_index]
  const minHeap = new MinPriorityQueue<[number, number, number]>(e => e[0])
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

  // Visit the first cell
  minHeap.push([grid[0][0], 0, 0])
  visited.add(getIndex(0, 0))

  while (!minHeap.isEmpty()) {
    const [t, r, c] = minHeap.pop()!

    // Check if target reached
    if (r === n - 1 && c === n - 1) {
      return t
    }

    // Visit four neighbors
    for (const [dr, dc] of directions) {
      const nr = dr + r
      const nc = dc + c
      const index = getIndex(nr, nc)

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= n ||
        nc >= n ||
        visited.has(index)
      ) {
        continue
      }

      visited.add(index)
      // New time is the longer time between current and next
      const newTime = Math.max(t, grid[nr][nc])
      minHeap.push([newTime, nr, nc])
    }
  }

  // Not reachable
  return -1
};

/**
 * Kruskal's Algorithm
 * T: O(n^2 log n); S: O(n^2);
 */
function swimInWater3(grid: number[][]): number {
  // Treat each cell as node
  // Sort nodes by cell value (height)
  // Gradually connect nodes with Disjoint Set Union from lowest to highest value (Simulate water rising)
  // At each step's end, check if source (0, 0) and target (n-1, n-1) is connected

  class UnionFind {
    root: number[]
    size: number[]

    constructor(nodeCount: number) {
      this.root = Array.from({ length: nodeCount }, (_v, i) => i)
      this.size = Array(nodeCount).fill(1)
    }

    find(x: number): number {
      if (this.root[x] === x) {
        return this.root[x]
      }

      return this.root[x] = this.find(this.root[x])
    }

    union(x: number, y: number): boolean {
      let rootX = this.find(x)
      let rootY = this.find(y)

      if (rootX === rootY) return false

      if (this.size[rootY] > this.size[rootX]) {
        [rootX, rootY] = [rootY, rootX]
      }
      this.root[rootY] = rootX
      this.size[rootX] += this.root[rootY]

      return true
    }

    connected(x: number, y: number): boolean {
      return this.find(x) === this.find(y)
    }
  }

  const n = grid.length

  const uf = new UnionFind(n * n)

  // [height, rowIdx, colIdx]
  const cells: [number, number, number][] = []
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      cells.push([grid[r][c], r, c])
    }
  }
  cells.sort((a, b) => a[0] - b[0])

  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

  for (const [t, r, c] of cells) {
    // Visit and connect neighbors
    for (const [dr, dc] of directions) {
      const nr = dr + r
      const nc = dc + c

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < n &&
        nc < n &&
        grid[nr][nc] <= t // Neighbor's heigh <= New water level
      ) {
        const currIdx = r * n + c
        const neighborIdx = nr * n + nc
        uf.union(currIdx, neighborIdx)
      }
    }

    // Check if target and source is connected
    if (uf.connected(0, n * n - 1)) {
      return t
    }
  }

  // Not reachable
  return -1
}

/**
 * Runs test cases for LeetCode 778: Swim in Rising Water
 * @param swimInWaterFn The solution function to test
 */
function runTests(swimInWaterFn: (grid: number[][]) => number): void {
  interface TestCase {
    id: number
    grid: number[][]
    expected: number
  }

  const testCases: TestCase[] = [
    {
      id: 1,
      grid: [
        [0, 2],
        [1, 3]
      ],
      expected: 3
    },
    {
      id: 2,
      grid: [
        [0, 1, 2, 3, 4],
        [24, 23, 22, 21, 5],
        [12, 13, 14, 15, 16],
        [11, 17, 18, 19, 20],
        [10, 9, 8, 7, 6]
      ],
      expected: 16
    },
    {
      id: 3,
      grid: [[0]],
      expected: 0
    },
    {
      id: 4,
      grid: [
        [0, 12, 32, 21, 19],
        [1, 13, 33, 22, 18],
        [2, 14, 34, 23, 17],
        [3, 15, 35, 24, 16],
        [4, 5, 6, 7, 8]
      ],
      expected: 8
    },
    {
      id: 5,
      grid: [
        [0, 1, 2, 10],
        [9, 14, 4, 13],
        [12, 3, 8, 15],
        [11, 5, 7, 6]
      ],
      expected: 8
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 778 Tests ===')

  for (const test of testCases) {
    // Deep copy grid to ensure solution doesn't mutate test inputs
    const gridCopy = test.grid.map(row => [...row])

    const startTime = performance.now()
    let actual: number
    let error: string | null = null

    try {
      actual = swimInWaterFn(gridCopy)
    } catch (e: any) {
      error = e.message
      actual = -1
    }

    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(2)

    const passed = error === null && actual === test.expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${test.id} (${duration} ms)`)
    } else {
      console.error(`[FAIL] Test Case ${test.id} (${duration} ms)`)
      console.error('  - Grid:', JSON.stringify(test.grid))
      console.error(`  - Expected: ${test.expected}`)
      console.error(`  - Actual:   ${error ? `Error: ${error}` : actual}`)
    }
  }

  console.log('==================================')
  console.log(`Result: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(swimInWater)
