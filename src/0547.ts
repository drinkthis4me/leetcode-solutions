// 547. Number of Provinces

import { Queue } from '@datastructures-js/queue'

// Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// Output: 2

/**
 * DFS
 * T: O(n^2); S: O(n);
 */
function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length
  const visited = new Array(n).fill(false)
  let res = 0

  const dfs = (i: number) => {
    // Mark curr node as visited
    visited[i] = true

    for (let j = 0; j < n; j++) {
      // Got to next connected and unvisited node
      if (isConnected[i][j] === 1 && !visited[j]) {
        dfs(j)
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i)
      res++
    }
  }

  return res
};

/**
 * BFS
 * T: O(n^2); S: O(n);
 */
function findCircleNum2(isConnected: number[][]): number {
  const n = isConnected.length
  const visited = new Array(n).fill(false)
  let res = 0

  const bfs = (i: number) => {
    visited[i] = true

    const q = new Queue<number>([i])

    while (!q.isEmpty()) {
      const node = q.pop()!

      for (let j = 0; j < n; j++) {
        if (isConnected[node][j] === 1 && !visited[j]) {
          q.push(j)
          visited[j] = true
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      bfs(i)
      res++
    }
  }

  return res
};

/**
 * Disjoint Set
 * T: O(n^2); S: O(n);
 */
function findCircleNum3(isConnected: number[][]): number {
  class UnionFind {
    root: Array<number>
    // Rank for height of each vertex
    rank: Array<number>

    constructor(size: number) {
      this.root = Array.from({ length: size }, (_v, idx) => idx)
      this.rank = new Array(size).fill(1)
    }

    find(x: number): number {
      if (x === this.root[x]) {
        return x
      }
      // Path compression to reduce recursion
      return this.root[x] = this.find(this.root[x])
    }

    union(x: number, y: number) {
      const rootX = this.find(x)
      const rootY = this.find(y)

      // Union by rank to reduce height
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

    connected(x: number, y: number): boolean {
      return this.find(x) === this.find(y)
    }
  }

  const n = isConnected.length
  const uf = new UnionFind(n)
  // Default to all independent nodes.
  let res = n

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && isConnected[i][j] === 1 && !uf.connected(i, j)) {
        uf.union(i, j)
        // When union two nodes, decrement the provence count
        res--
      }
    }
  }

  return res
};

/**
 *  LeetCode 547: Number of Provinces - Tester
 */
function runTests(solution: (isConnected: number[][]) => number): void {
  const testCases: { input: number[][], expected: number, description: string }[] = [
    {
      input: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 1]
      ],
      expected: 2,
      description: 'Standard case with 2 provinces'
    },
    {
      input: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ],
      expected: 3,
      description: 'All cities are separate provinces'
    },
    {
      input: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ],
      expected: 1,
      description: 'All cities connected in a single province'
    },
    {
      input: [
        [1, 0],
        [0, 1]
      ],
      expected: 2,
      description: 'Two independent cities'
    },
    {
      input: [
        [1]
      ],
      expected: 1,
      description: 'Single city edge case'
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 547 Tests ===')

  testCases.forEach((test, index) => {
    // Deep copy input in case the solution mutates it
    const inputCopy = test.input.map(row => [...row])
    const startTime = performance.now()
    const result = solution(inputCopy)
    const endTime = performance.now()

    const passed = result === test.expected
    if (passed) passedCount++

    console.log(`\nTest Case ${index + 1}: ${test.description}`)
    console.log(`  Input:    ${JSON.stringify(test.input)}`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Received: ${result}`)
    console.log(`  Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`  Time:     ${(endTime - startTime).toFixed(3)} ms`)
  })

  console.log('\n==================================')
  console.log(`Result: ${passedCount}/${testCases.length} test cases passed.`)
  console.log('==================================')
}

runTests(findCircleNum2)
