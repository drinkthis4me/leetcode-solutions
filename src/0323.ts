// 323. Number of Connected Components in an Undirected Graph

import { Queue } from '@datastructures-js/queue'

// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2

/**
 * DFS
 * T: O(V + E); S: O(V + E)
 */
function countComponents(n: number, edges: number[][]): number {
  const adj: number[][] = Array.from({ length: n }, () => [])
  for (const [a, b] of edges) {
    adj[a].push(b)
    adj[b].push(a)
  }

  const visited: boolean[] = Array(n).fill(false)

  const dfs = (i: number): number => {
    if (visited[i]) return 0

    visited[i] = true

    for (const neighbor of adj[i]) {
      // Same component. Does not contribute to the component count.
      dfs(neighbor)
    }

    return 1
  }

  let count = 0
  for (let i = 0; i < n; i++) {
    count += dfs(i)
  }

  return count
}

/**
 * BFS
 * T: O(V + E); S: O(V + E)
 */
function countComponents2(n: number, edges: number[][]): number {
  const adj: number[][] = Array.from({ length: n }, () => [])
  for (const [a, b] of edges) {
    adj[a].push(b)
    adj[b].push(a)
  }

  const visited: boolean[] = Array(n).fill(false)

  const bfs = (i: number): number => {
    if (visited[i]) return 0

    const q = new Queue<number>([i])

    while (!q.isEmpty()) {
      const curr = q.pop()!

      for (const neighbor of adj[curr]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          q.push(neighbor)
        }
      }
    }

    return 1
  }

  let count = 0
  for (let i = 0; i < n; i++) {
    count += bfs(i)
  }

  return count
}

/**
 * Disjoint Set Union
 * T: O(V + E); S: O(V);
 */
function countComponents3(n: number, edges: number[][]): number {
  class UnionFind {
    root: number[]
    rank: number[]
    count: number

    constructor(size: number) {
      this.root = Array.from({ length: size }, (_v, i) => i)
      this.rank = Array(size).fill(1)
      this.count = size
    }

    find(x: number): number {
      if (this.root[x] === x) {
        return this.root[x]
      }

      return this.root[x] = this.find(this.root[x])
    }

    union(x: number, y: number): boolean {
      const rootX = this.find(x)
      const rootY = this.find(y)

      if (rootX === rootY) return false

      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY
      } else {
        this.root[rootY] = rootX
        this.rank[rootY]++
      }

      this.count--

      return true
    }

    connected(x: number, y: number): boolean {
      return this.find(x) === this.find(y)
    }

    getComponentCount(): number {
      return this.count
    }
  }

  const uf = new UnionFind(n)
  for (const [a, b] of edges) {
    uf.union(a, b)
  }

  return uf.getComponentCount()
}

/**
 * LeetCode 323: Number of Connected Components in an Undirected Graph
 * Tester function
 */

type SolutionFunction = (n: number, edges: number[][]) => number

interface TestCase {
  id: number
  n: number
  edges: number[][]
  expected: number
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      n: 5,
      edges: [[0, 1], [1, 2], [3, 4]],
      expected: 2
    },
    {
      id: 2,
      n: 5,
      edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
      expected: 1
    },
    {
      id: 3,
      n: 4,
      edges: [[0, 1], [2, 3]],
      expected: 2
    },
    {
      id: 4,
      n: 3,
      edges: [],
      expected: 3
    },
    {
      id: 5,
      n: 1,
      edges: [],
      expected: 1
    }
  ]

  let passedCount = 0

  console.log('=== Running Tests for LeetCode 323 ===\n')

  for (const test of testCases) {
    const start = performance.now()
    const result = solution(test.n, test.edges)
    const end = performance.now()
    const duration = (end - start).toFixed(3)

    const passed = result === test.expected
    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${test.id} (${duration} ms)`)
    } else {
      console.log(`[FAIL] Test Case ${test.id} (${duration} ms)`)
      console.log(`       Input:    n = ${test.n}, edges = ${JSON.stringify(test.edges)}`)
      console.log(`       Expected: ${test.expected}`)
      console.log(`       Received: ${result}`)
    }
  }

  console.log('\n=======================================')
  console.log(`Passed: ${passedCount} / ${testCases.length} test cases.`)
  console.log('=======================================')
}

runTests(countComponents2)
