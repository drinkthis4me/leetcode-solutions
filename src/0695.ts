// 695. Max Area of Island

import { Queue } from '@datastructures-js/queue'

/**
 * DFS
 * T: O(m * n); S: O(m * n);
 */
function maxAreaOfIsland(grid: number[][]): number {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0

  const m = grid.length
  const n = grid[0].length
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  /**
   * DFS at cell (i, j)
   * @returns Island area
   */
  const dfs = (i: number, j: number): number => {
    if (
      i < 0 ||
      j < 0 ||
      i >= m ||
      j >= n ||
      grid[i][j] === 0
    ) {
      return 0
    }

    grid[i][j] = 0

    let area = 1

    for (const [dr, dc] of directions) {
      const nr = i + dr
      const nc = j + dc

      area += dfs(nr, nc)
    }

    return area
  }

  let maxArea = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        maxArea = Math.max(maxArea, dfs(i, j))
      }
    }
  }

  return maxArea
};

/**
 * BFS
 * T: O(m * n); S: O(m * n);
 */
function maxAreaOfIsland2(grid: number[][]): number {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0

  const m = grid.length
  const n = grid[0].length
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  /**
   * BFS at cell (i, j)
   * @returns Island area
   */
  const bfs = (i: number, j: number): number => {
    grid[i][j] = 0

    const q = new Queue<[number, number]>([[i, j]])
    let area = 1

    while (!q.isEmpty()) {
      const [r, c] = q.pop()!

      for (const [dr, dc] of directions) {
        const nr = r + dr
        const nc = c + dc

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < m &&
          nc < n &&
          grid[nr][nc] === 1
        ) {
          area++

          grid[nr][nc] = 0

          q.push([nr, nc])
        }
      }
    }

    return area
  }

  let maxArea = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        maxArea = Math.max(maxArea, bfs(i, j))
      }
    }
  }

  return maxArea
}

/**
 * Disjoint Set Union
 * @param grid
 */
function maxAreaOfIsland3(grid: number[][]): number {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0

  const m = grid.length
  const n = grid[0].length

  class UnionFind {
    root: number[] // Root node
    rank: number[] // Height as rank
    area: number[] // Number of nodes in subtree as area

    constructor(size: number) {
      this.root = Array.from({ length: size }, (_v, idx) => idx)
      this.rank = Array(size).fill(1)
      this.area = Array(size).fill(1) // No connection. Default to 1
    }

    find(x: number): number {
      if (this.root[x] === x) {
        return this.root[x]
      }

      return this.root[x] = this.find(this.root[x])
    }

    union(x: number, y: number): void {
      const rootX = this.find(x)
      const rootY = this.find(y)

      if (rootX !== rootY) {
        if (this.rank[rootX] > this.rank[rootY]) {
          this.root[rootY] = rootX
          this.area[rootX] += this.area[rootY]
        } else if (this.rank[rootX] < this.rank[rootY]) {
          this.root[rootX] = rootY
          this.area[rootY] += this.area[rootX]
        } else {
          this.root[rootY] = rootX
          this.area[rootX] += this.area[rootY]
          this.rank[rootX]++
        }
      }
    }

    connected(x: number, y: number): boolean {
      return this.find(x) === this.find(y)
    }

    getArea(x: number): number {
      // Find root's total area
      return this.area[this.find(x)]
    }
  }

  const getIndex = (i: number, j: number) => i * n + j

  const uf = new UnionFind(m * n)
  const directions = [[1, 0], [0, 1]]
  let maxArea = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        const cellIndex = getIndex(i, j)

        maxArea = Math.max(maxArea, 1)

        for (const [dr, dc] of directions) {
          const nr = i + dr
          const nc = j + dc

          if (nr < m && nc < n && grid[nr][nc] === 1) {
            const nextCellIndex = getIndex(nr, nc)
            uf.union(cellIndex, nextCellIndex)
          }
        }

        maxArea = Math.max(maxArea, uf.getArea(cellIndex))
      }
    }
  }

  return maxArea
}

function runTests(solution: (grid: number[][]) => number): void {
  const testCases: { grid: number[][], expected: number }[] = [
    {
      grid: [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
      ],
      expected: 6
    },
    {
      grid: [
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      expected: 0
    },
    {
      grid: [
        [1, 1],
        [1, 1]
      ],
      expected: 4
    },
    {
      grid: [
        [1]
      ],
      expected: 1
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Create a deep copy of the grid to prevent mutations by the solution function
    const gridCopy = test.grid.map(row => [...row])
    const result = solution(gridCopy)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log(`  Input:    ${JSON.stringify(test.grid)}`)
      console.log(`  Expected: ${test.expected}`)
      console.log(`  Received: ${result}`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(maxAreaOfIsland3)
