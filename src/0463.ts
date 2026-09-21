// 463. Island Perimeter

import { Queue } from '@datastructures-js/queue'

// Input: grid = [
//   [0, 1, 0, 0],
//   [1, 1, 1, 0],
//   [0, 1, 0, 0],
//   [1, 1, 0, 0]
// ]
// Output: 16

/**
 * DFS
 * T: O(m * n); S: O(m * n);
 */
function islandPerimeter(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length

  const visited: boolean[][] = Array.from({ length: m }, () =>
    Array(n).fill(false)
  )

  const dfs = (r: number, c: number): number => {
    // Increase the perimeter count by 1 when next cell is out-out-bound/water
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) {
      return 1
    }

    // Return 0 for already visited island cell
    if (visited[r][c]) return 0

    visited[r][c] = true

    return dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        return dfs(i, j)
      }
    }
  }

  // No island
  return 0
}

/**
 * BFS
 * T: O(m * n); S: O(m * n);
 */
function islandPerimeter2(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length

  const visited: boolean[][] = Array.from({ length: m }, () =>
    Array(n).fill(false)
  )
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ]

  const bfs = (r: number, c: number): number => {
    const q = new Queue<[number, number]>([[r, c]])
    visited[r][c] = true
    let perimeter = 0

    while (!q.isEmpty()) {
      const [x, y] = q.pop()!

      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy

        if (nx < 0 || nx >= m || ny < 0 || ny >= n || grid[nx][ny] === 0) {
          perimeter++
        } else if (!visited[nx][ny]) {
          visited[nx][ny] = true
          q.push([nx, ny])
        }
      }
    }

    return perimeter
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        return bfs(i, j)
      }
    }
  }

  // No island
  return 0
}

/**
 * Iteration w/ Math
 * T: O(m * n); S: O(1);
 */
function islandPerimeter3(grid: number[][]): number {
  // Math:
  // perimeter = 4 * island_count - 2 * neighbor_count

  const m = grid.length
  const n = grid[0].length

  let islandCount = 0
  let neighborCount = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        islandCount++

        // Check down neighbor
        if (i < m - 1 && grid[i + 1][j] === 1) neighborCount++
        // Check right neighbor
        if (j < n - 1 && grid[i][j + 1] === 1) neighborCount++
      }
    }
  }

  return 4 * islandCount - 2 * neighborCount
}

type IslandPerimeterFunction = (grid: number[][]) => number

interface TestCase {
  input: number[][]
  expected: number
}

function runTests(solution: IslandPerimeterFunction): void {
  const testCases: TestCase[] = [
    {
      input: [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0]
      ],
      expected: 16
    },
    {
      input: [[1]],
      expected: 4
    },
    {
      input: [[1, 0]],
      expected: 4
    },
    {
      input: [
        [1, 1],
        [1, 1]
      ],
      expected: 8
    },
    {
      input: [
        [0, 0],
        [0, 0]
      ],
      expected: 0
    }
  ]

  let passedCount = 0

  console.log('Running LeetCode 463 Tests...\n')

  testCases.forEach((test, index) => {
    const result = solution(test.input)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`❌ Test Case ${index + 1}: FAILED`)
      console.log(`   Input:    ${JSON.stringify(test.input)}`)
      console.log(`   Expected: ${test.expected}`)
      console.log(`   Received: ${result}\n`)
    }
  })

  console.log(
    `\nSummary: ${passedCount}/${testCases.length} test cases passed.`
  )
}

runTests(islandPerimeter3)
