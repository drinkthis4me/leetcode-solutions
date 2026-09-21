// 684. Redundant Connection

import { Queue } from '@datastructures-js/queue'

// Input: edges = [[1,2],[1,3],[2,3]]
// Output: [2,3]

/**
 * DFS
 * T: O(n^2); S: O(n);
 */
function findRedundantConnection(edges: number[][]): number[] {
  // Connect nodes with DFS and find the cycle along the way

  const n = edges.length
  const adj: number[][] = Array.from({ length: n + 1 }, () => [])

  const hasPath = (source: number, target: number): boolean => {
    const visited = new Set<number>()
    const stack: number[] = [source]

    while (stack.length > 0) {
      const curr = stack.pop()!

      if (curr === target) return true

      visited.add(curr)

      for (const neighbor of adj[curr]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor)
        }
      }
    }

    return false
  }

  for (const [u, v] of edges) {
    if (hasPath(u, v)) {
      return [u, v]
    }

    adj[u].push(v)
    adj[v].push(u)
  }

  // Not reachable
  return []
}

/**
 * DFS (Optimized)
 * T: O(n); S: O(n);
 */
function findRedundantConnection2(edges: number[][]): number[] {
  // Pre-map the adjacency list
  // Single DFS to find the cycle
  // Iterate edges backward to find the last edge that appears in the cycle set

  const n = edges.length

  const adj: number[][] = Array.from({ length: n + 1 }, () => [])
  for (const [u, v] of edges) {
    adj[u].push(v)
    adj[v].push(u)
  }

  const visited = Array(n + 1).fill(false)
  const cycle = new Set<number>()
  let cycleStart = -1

  // DFS to find the cycle. Return true if found.
  const dfs = (node: number, parent: number): boolean => {
    if (visited[node]) {
      cycleStart = node
      return true
    }

    visited[node] = true

    for (const neighbor of adj[node]) {
      if (neighbor === parent) continue

      if (dfs(neighbor, node)) {
        if (cycleStart !== -1) {
          cycle.add(node)
        }
        if (node === cycleStart) {
          // Reached the beginning of the cycle
          cycleStart = -1
        }
        return true
      }
    }

    return false
  }

  dfs(1, -1)

  for (let i = n - 1; i >= 0; i--) {
    const [u, v] = edges[i]

    if (cycle.has(u) && cycle.has(v)) {
      return [u, v]
    }
  }

  return []
}

/**
 * Topological Sort (Kahn's Algorithm)
 * T: O(V + E); S: O(V + E);
 */
function findRedundantConnection3(edges: number[][]): number[] {
  // Nodes in cycle have in-degree >= 2
  // Remove all the leaf node (in-degree == 1) and what's left are nodes in cycle.

  const n = edges.length
  const adj: number[][] = Array.from({ length: n + 1 }, () => [])
  const inDegree: number[] = Array(n + 1).fill(0)

  for (const [u, v] of edges) {
    adj[u].push(v)
    adj[v].push(u)
    inDegree[u]++
    inDegree[v]++
  }

  // Queue for holding leaf nodes with in-degree of 1
  const q = new Queue<number>()
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 1) {
      q.push(i)
    }
  }

  // Peel away the leaf nodes
  const visited = Array(n + 1).fill(false)
  while (!q.isEmpty()) {
    const curr = q.pop()!

    visited[curr] = true

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--

      if (inDegree[neighbor] === 1) {
        q.push(neighbor)
      }
    }
  }

  // Find both not visited nodes in reverse order
  for (let i = n - 1; i >= 0; i--) {
    const [u, v] = edges[i]
    if (!visited[u] && !visited[v]) {
      return [u, v]
    }
  }

  return []
}

/**
 * Disjoint Set Union
 * T: O(V + E); S: O(V);
 */
function findRedundantConnection4(edges: number[][]): number[] {
  class UnionFind {
    root: number[] = []
    rank: number[] = []

    constructor(size: number) {
      this.root = Array.from({ length: size }, (_v, i) => i)
      this.rank = Array(size).fill(1)
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

      if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootY] = rootX
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootX] = rootY
      } else {
        this.root[rootY] = rootX
        this.rank[rootY]++
      }

      return true
    }

    connected(x: number, y: number): boolean {
      return this.find(x) === this.find(y)
    }
  }

  const uf = new UnionFind(edges.length)
  let res: number[] = []

  for (const [a, b] of edges) {
    if (!uf.union(a, b)) {
      res = [a, b]
    }
  }

  return res
};

/**
 * Tester for LeetCode 684: Redundant Connection
 * @param solutionFn - The function that solves LeetCode 684, taking number[][] and returning number[]
 */
function runTests(solutionFn: (edges: number[][]) => number[]): void {
  const testCases = [
    {
      id: 1,
      edges: [[1, 2], [1, 3], [2, 3]],
      expected: [2, 3]
    },
    {
      id: 2,
      edges: [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]],
      expected: [1, 4]
    },
    {
      id: 3,
      edges: [[1, 2], [2, 3], [3, 4], [1, 3]],
      expected: [1, 3]
    }
  ]

  let passedCount = 0

  console.log('=== Running Tests for LeetCode 684: Redundant Connection ===\n')

  for (const test of testCases) {
    const startTime = performance.now()
    const result = solutionFn(test.edges)
    const endTime = performance.now()

    // Compare arrays (order matters for the specific edge, e.g., [2, 3] vs [3, 2] usually matches the input format)
    const passed =
      result.length === test.expected.length &&
      result[0] === test.expected[0] &&
      result[1] === test.expected[1]

    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${test.id}`)
    } else {
      console.log(`[FAIL] Test Case ${test.id}`)
      console.log(`  Input:    ${JSON.stringify(test.edges)}`)
      console.log(`  Expected: ${JSON.stringify(test.expected)}`)
      console.log(`  Received: ${JSON.stringify(result)}`)
    }
    console.log(`  Time:     ${(endTime - startTime).toFixed(3)} ms\n`)
  }

  console.log('=== Test Summary ===')
  console.log(`Passed: ${passedCount}/${testCases.length} (${((passedCount / testCases.length) * 100).toFixed(1)}%)`)
}

runTests(findRedundantConnection3)
