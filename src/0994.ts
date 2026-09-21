// 994. Rotting Oranges
/*
You are given an m x n grid where each cell can have one of three values:

    0 representing an empty cell,
    1 representing a fresh orange, or
    2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
*/

import { Queue } from '@datastructures-js/queue'

/**
 * Multi-Source BFS
 * T: O(m * n); S: O(m * n);
 */
function orangesRotting(grid: number[][]): number {
  // - No fruit -> 0
  // - No rotten -> set(rotten).size == 0, return -1
  // - All rotten/No fresh -> set(rotten).size == 0, return 0
  // - Some rotten -> BFS from all rotten at the same time
  //     then check set(fresh).size and elapsed time

  const m = grid.length
  const n = grid[0].length
  let freshCount = 0
  const rotten: [number, number][] = []

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        freshCount++
      }
      if (grid[i][j] === 2) {
        rotten.push([i, j])
      }
    }
  }

  // Edge case: No fruit
  if (rotten.length === 0 && freshCount === 0) return 0
  // Edge case: No rotten exist
  if (rotten.length === 0) return -1
  // Edge case: No fresh exist
  if (freshCount === 0) return 0

  const q = new Queue<[number, number]>(rotten)
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  let time = 0

  while (!q.isEmpty()) {
    const size = q.size()

    for (let i = 0; i < size; i++) {
      const [row, col] = q.pop()!

      for (const [dr, dc] of directions) {
        const nr = row + dr
        const nc = col + dc

        if (
          nr >= 0 &&
          nr < m &&
          nc >= 0 &&
          nc < n &&
          grid[nr][nc] === 1
        ) {
          grid[nr][nc] = 2
          q.push([nr, nc])
          freshCount--
        }
      }
    }

    time++

    if (freshCount === 0) break
  }

  return (freshCount === 0) ? time : -1
};

interface TestCase {
  name: string
  input: number[][]
  expected: number
}

function runTests(solution: (grid: number[][]) => number): void {
  const testCases: TestCase[] = [
    {
      name: 'Example 1: Standard rotting propagation',
      input: [
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1]
      ],
      expected: 4
    },
    {
      name: 'Example 2: Unreachable fresh orange',
      input: [
        [2, 1, 1],
        [0, 1, 1],
        [1, 0, 1]
      ],
      expected: -1
    },
    {
      name: 'Example 3: Already zero fresh oranges',
      input: [
        [0, 2]
      ],
      expected: 0
    },
    {
      name: 'Edge Case: Only fresh oranges, no rotten ones',
      input: [
        [1, 1],
        [1, 1]
      ],
      expected: -1
    },
    {
      name: 'Edge Case: Only empty cells and rotten ones',
      input: [
        [0, 2, 0],
        [2, 0, 2]
      ],
      expected: 0
    },
    {
      name: 'Edge Case: Only empty cells',
      input: [
        [0]
      ],
      expected: 0
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 994 Tests ===')

  testCases.forEach((test, index) => {
    // Create a deep copy of the input grid to prevent solutions from mutating test cases
    const inputCopy = test.input.map(row => [...row])

    const startTime = performance.now()
    const result = solution(inputCopy)
    const endTime = performance.now()

    const passed = result === test.expected
    if (passed) {
      passedCount++
      console.log(`\n[PASS] Test ${index + 1}: ${test.name}`)
    } else {
      console.log(`\n[FAIL] Test ${index + 1}: ${test.name}`)
      console.log(`  Input:    ${JSON.stringify(test.input)}`)
      console.log(`  Expected: ${test.expected}`)
      console.log(`  Received: ${result}`)
    }
    console.log(`  Time:     ${(endTime - startTime).toFixed(3)} ms`)
  })

  console.log('\n=== Summary ===')
  console.log(`Passed: ${passedCount} / ${testCases.length}`)
}

runTests(orangesRotting)
