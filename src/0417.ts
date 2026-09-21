// 417. Pacific Atlantic Water Flow

import { Queue } from '@datastructures-js/queue'

// Input: heights = [
//   [1,2,2,3,5],
//   [3,2,3,4,4],
//   [2,4,5,3,1],
//   [6,7,1,4,5],
//   [5,1,1,2,4]
// ]
// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

/**
 * DFS
 * T: O(m * n); S: O(m * n);
 */
function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length
  const n = heights[0].length

  const pacific: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false))
  const atlantic: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false))

  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]

  const dfs = (r: number, c: number, ocean: boolean[][]) => {
    ocean[r][c] = true

    for (const [dr, dc] of directions) {
      const nr = dr + r
      const nc = dc + c

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < m &&
        nc < n &&
        !ocean[nr][nc] &&
        heights[nr][nc] >= heights[r][c]
      ) {
        dfs(nr, nc, ocean)
      }
    }
  }

  // DFS from Atlantic borders
  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacific)
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j, pacific)
  }

  // DFS from Pacific borders
  for (let i = 0; i < m; i++) {
    dfs(i, n - 1, atlantic)
  }
  for (let j = 0; j < n; j++) {
    dfs(m - 1, j, atlantic)
  }

  // Find cells that can reach both oceans
  const res: number[][] = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        res.push([i, j])
      }
    }
  }

  return res
}

/**
 * BFS
 * T: O(m * n); S: O(m * n);
 */
function pacificAtlantic2(heights: number[][]): number[][] {
  // Starting from all sea-bordered cells
  // Queue A: pacific-bordered cells
  // Queue B: atlantic-bordered cells
  // Climb the mountains
  // Record visited cells of Queue A
  // Record visited cells of Queue B
  // Check if they met

  const m = heights.length
  const n = heights[0].length

  const pacific: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false))
  const atlantic: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false))

  const pacificQueue = new Queue<[number, number]>()
  const atlanticQueue = new Queue<[number, number]>()

  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]

  const bfs = (queue: Queue<[number, number]>, ocean: boolean[][]) => {
    while (!queue.isEmpty()) {
      const [row, col] = queue.pop()!

      for (const [dr, dc] of directions) {
        const nr = dr + row
        const nc = dc + col

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < m &&
          nc < n &&
          !ocean[nr][nc] &&
          heights[nr][nc] >= heights[row][col]
        ) {
          queue.push([nr, nc])
          ocean[nr][nc] = true
        }
      }
    }
  }

  // Initialize queues with ocean borders
  for (let i = 0; i < m; i++) {
    pacific[i][0] = true
    pacificQueue.push([i, 0])

    atlantic[i][n - 1] = true
    atlanticQueue.push([i, n - 1])
  }
  for (let j = 0; j < n; j++) {
    pacific[0][j] = true
    pacificQueue.push([0, j])

    atlantic[m - 1][j] = true
    atlanticQueue.push([m - 1, j])
  }

  // Run BFS for both oceans
  bfs(pacificQueue, pacific)
  bfs(atlanticQueue, atlantic)

  // Find cells that can reach both
  const res: number[][] = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        res.push([i, j])
      }
    }
  }

  return res
};

function runTests(solution: (heights: number[][]) => number[][]): void {
  const testCases: { heights: number[][], expected: number[][] }[] = [
    {
      heights: [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4]
      ],
      expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
    },
    {
      heights: [
        [2, 1],
        [1, 2]
      ],
      expected: [[0, 0], [0, 1], [1, 0], [1, 1]]
    },
    {
      heights: [[1]],
      expected: [[0, 0]]
    }
  ]

  // Helper function to serialize coordinate arrays for easy comparison
  const normalize = (coords: number[][]): string[] => {
    return coords.map(c => `${c[0]},${c[1]}`).sort()
  }

  let passedCount = 0

  testCases.forEach((test, index) => {
    try {
      const result = solution(test.heights)
      const normalizedResult = normalize(result)
      const normalizedExpected = normalize(test.expected)

      const isPassed =
        normalizedResult.length === normalizedExpected.length &&
        normalizedResult.every((val, idx) => val === normalizedExpected[idx])

      if (isPassed) {
        passedCount++
        console.log(`Test Case ${index + 1}: PASSED`)
      } else {
        console.log(`Test Case ${index + 1}: FAILED`)
        console.log(`  Expected: ${JSON.stringify(test.expected)}`)
        console.log(`  Received: ${JSON.stringify(result)}`)
      }
    } catch (error) {
      console.log(`Test Case ${index + 1}: ERROR`)
      console.log('  Thrown:', error)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(pacificAtlantic)
