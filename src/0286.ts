// 286. Walls and Gates

/**
You are given a m x n 2D grid initialized with these three possible values.

    -1 - A wall or an obstacle.
    0 - A gate.
    INF - Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

For example, given the 2D grid:

INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF

After running your function, the 2D grid should be:

3  -1   0   1
2   2   1  -1
1  -1   2  -1
0  -1   3   4
*/

import { Queue } from '@datastructures-js/queue'

/**
 * DFS (per room)
 * T: O(m * n * 4^mn); T: O(m * n);
 */
function wallsAndGates(rooms: number[][]): void {
  const INF = 2147483647
  const VISITED = -2
  const m = rooms.length
  const n = rooms[0].length
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  const dfs = (i: number, j: number): number => {
    if (
      i < 0 ||
      j < 0 ||
      i >= m ||
      j >= n ||
      rooms[i][j] === VISITED ||
      rooms[i][j] === -1
    ) {
      return INF
    }

    if (rooms[i][j] === 0) return 0

    // Visit four directions and backtrack
    const temp = rooms[i][j]
    rooms[i][j] = VISITED

    let min = INF
    for (const [dr, dc] of directions) {
      const nr = dr + i
      const nc = dc + j
      min = Math.min(min, 1 + dfs(nr, nc))
    }

    rooms[i][j] = temp

    return min
  }

  // For each empty room (INF), find distance to closest gate (0)
  //  "(i, j) with INF" - 2
  //        |
  //        3
  //  => update distance to 2 + 1 = 3
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === INF) {
        rooms[i][j] = dfs(i, j)
      }
    }
  }
};

/**
 * DFS (from gate)
 * T: O(m * n * 4^mn); T: O(m * n);
 */
function wallsAndGates2(rooms: number[][]): void {
  const m = rooms.length
  const n = rooms[0].length

  const dfs = (i: number, j: number, distance: number): void => {
    if (
      i < 0 ||
      j < 0 ||
      i >= m ||
      j >= n ||
      rooms[i][j] === -1 ||
      rooms[i][j] < distance // Has a shorter path to another gate
    ) {
      return
    }

    rooms[i][j] = distance

    distance++

    dfs(i + 1, j, distance)
    dfs(i - 1, j, distance)
    dfs(i, j + 1, distance)
    dfs(i, j - 1, distance)
  }

  // For each gate (0), update its neighbors' distances
  // 1 - 0 - 1 - 2 ...
  //     |
  //     1
  //     |
  //     2
  //    ...
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === 0) {
        dfs(i, j, 0)
      }
    }
  }
};

/**
 * BFS (per room)
 * T: O((mn)^2); T: O(m * n);
 */
function wallsAndGates3(rooms: number[][]): void {
  const INF = 2147483647
  const m = rooms.length
  const n = rooms[0].length
  let visited = Array.from({ length: m }, () => Array(n).fill(false))
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  const bfs = (r: number, c: number): number => {
    const q = new Queue<[number, number]>([[r, c]])
    let distance = 0

    // Must reset the visited rooms for each BFS
    visited = Array.from({ length: m }, () => Array(n).fill(false))

    while (!q.isEmpty()) {
      const size = q.size()

      for (let i = 0; i < size; i++) {
        const [row, col] = q.pop()!

        // If gate found, return distance immediately
        if (rooms[row][col] === 0) return distance

        for (const [dr, dc] of directions) {
          const nr = dr + row
          const nc = dc + col

          if (
            nr >= 0 &&
            nc >= 0 &&
            nr < m &&
            nc < n &&
            !visited[nr][nc] &&
            rooms[nr][nc] !== -1
          ) {
            visited[nr][nc] = true
            q.push([nr, nc])
          }
        }
      }

      distance++
    }

    // No gate found
    return INF
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === INF) {
        rooms[i][j] = bfs(i, j)
      }
    }
  }
};

/**
 * Multi-Source BFS (Optimal)
 * T: O(m * n); T: O(m * n);
 */
function wallsAndGates4(rooms: number[][]): void {
  // Run BFS from every gate (0) at the same time.
  // [0] --- [1] --- [2] --- ... --- [2] --- [1] --- [0]
  //  |       |                       |       |
  // [1] --- [2]                     [3] --- [2]
  //  |                                       |
  // [2]                                     [3]

  const INF = 2147483647
  const m = rooms.length
  const n = rooms[0].length
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  const q = new Queue<[number, number]>()

  // Enqueue every gate
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === 0) {
        q.push([i, j])
      }
    }
  }

  while (!q.isEmpty()) {
    const size = q.size()

    for (let i = 0; i < size; i++) {
      const [r, c] = q.pop()!

      for (const [dr, dc] of directions) {
        const nr = dr + r
        const nc = dc + c

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < m &&
          nc < n &&
          rooms[nr][nc] === INF
        ) {
          q.push([nr, nc])
          rooms[nr][nc] = rooms[r][c] + 1
        }
      }
    }
  }
};

function runTests(solution: (rooms: number[][]) => void): void {
  const INF = 2147483647

  function arraysEqual(a: number[][], b: number[][]): boolean {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i].length !== b[i].length) return false
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] !== b[i][j]) return false
      }
    }
    return true
  }

  interface TestCase {
    input: number[][]
    expected: number[][]
  }
  const testCases: TestCase[] = [
    {
      input: [
        [INF, -1, 0, INF],
        [INF, INF, INF, -1],
        [INF, -1, INF, -1],
        [0, -1, INF, INF]
      ],
      expected: [
        [3, -1, 0, 1],
        [2, 2, 1, -1],
        [1, -1, 2, -1],
        [0, -1, 3, 4]
      ]
    },
    {
      input: [
        [0, -1],
        [INF, INF]
      ],
      expected: [
        [0, -1],
        [1, 2]
      ]
    },
    {
      input: [
        [-1]
      ],
      expected: [
        [-1]
      ]
    },
    {
      input: [
        [INF]
      ],
      expected: [
        [INF]
      ]
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Deep copy the input matrix since LeetCode 286 modifies the grid in-place
    const roomsCopy = test.input.map(row => [...row])

    try {
      solution(roomsCopy)
      const passed = arraysEqual(roomsCopy, test.expected)

      if (passed) {
        console.log(`Test Case ${index + 1}: PASSED`)
        passedCount++
      } else {
        console.log(`Test Case ${index + 1}: FAILED`)
        console.log('  Input:   ', JSON.stringify(test.input))
        console.log('  Expected:', JSON.stringify(test.expected))
        console.log('  Received:', JSON.stringify(roomsCopy))
      }
    } catch (error) {
      console.log(`Test Case ${index + 1}: ERROR`)
      console.error(error)
    }
  })

  console.log(`\nSummary: ${passedCount} / ${testCases.length} tests passed.`)
}

runTests(wallsAndGates4)
