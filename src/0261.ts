// 261. Graph Valid Tree

import { Queue } from '@datastructures-js/queue'

/**
 * DFS & Cycle Detection
 * T: O(V + E); S: O(V + E);
 */
function validTree(n: number, edges: number[][]): boolean {
  // Edge case: n node must have (n-1) edges
  if (edges.length !== n - 1) return false

  const map: number[][] = Array.from({ length: n }, () => [])
  for (const [a, b] of edges) {
    map[a].push(b)
    map[b].push(a)
  }

  const visited = new Set<number>()

  const dfs = (i: number, parent: number): boolean => {
    if (visited.has(i)) return false

    visited.add(i)

    for (const neighbor of map[i]) {
      if (neighbor === parent) continue

      if (!dfs(neighbor, i)) return false
    }

    return true
  }

  // Pick a node as root with parent -1.
  // Whichever is fine because edges are undirected.
  return dfs(0, -1) && visited.size === n
}

/**
 * BFS & Cycle Detection
 * T: O(V + E); S: O(V + E);
 */
function validTree2(n: number, edges: number[][]): boolean {
  // Edge case: n node must have (n-1) edges
  if (edges.length !== n - 1) return false

  const map: number[][] = Array.from({ length: n }, () => [])
  for (const [a, b] of edges) {
    map[a].push(b)
    map[b].push(a)
  }

  // Queue of [node, parentNode]
  // Starting with [0, -1]
  const q = new Queue<[number, number]>([[0, -1]])
  const visited = new Set<number>([0])
  let nodeCount = 0

  while (!q.isEmpty()) {
    const [curr, parent] = q.pop()!

    nodeCount++

    for (const neighbor of map[curr]) {
      if (neighbor === parent) continue
      if (visited.has(neighbor)) return false

      visited.add(neighbor)
      q.push([neighbor, curr])
    }
  }

  return nodeCount === n
}

/**
 * Disjoint Set Union
 * T: O(V + E); S: O(V);
 */
function validTree3(n: number, edges: number[][]): boolean {
  // Put all nodes in Disjoint Set Union.
  // Cycle detection:
  //    If two nodes have the same node as root, connecting them will alter the root.
  //    root <- A; root <- B;
  //    A <- B will make A the new root.
  // Valid tree:
  //    Every node is in the same union.

  // Edge case: n node must have (n-1) edges
  if (edges.length !== n - 1) return false

  class UnionFind {
    root: number[]
    rank: number[]
    count: number

    constructor(size: number) {
      this.root = Array.from({ length: size }, (_v, idx) => idx)
      this.rank = Array(size).fill(1)
      this.count = size
    }

    find(x: number): number {
      if (this.root[x] === x) return x

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

    getGroupCount(): number {
      return this.count
    }
  }

  const uf = new UnionFind(n)
  for (const [a, b] of edges) {
    if (!uf.union(a, b)) return false
  }

  // Valid: All n-1 edges are account for. And no cycle found.
  // uf.getGroupCount() === 1
  return uf.getGroupCount() === 1
}

/**
 * Runs test cases against the provided LeetCode 261 solution function.
 * @param solutionFn - A function matching the signature (n: number, edges: number[][]) => boolean
 */
function runTests(solutionFn: (n: number, edges: number[][]) => boolean): void {
  interface TestCase {
    id: number
    n: number
    edges: number[][]
    expected: boolean
  }

  const testCases: TestCase[] = [
    {
      id: 1,
      n: 5,
      edges: [[0, 1], [0, 2], [0, 3], [1, 4]],
      expected: true
    },
    {
      id: 2,
      n: 5,
      edges: [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]],
      expected: false // Contains cycle & extra edges
    },
    {
      id: 3,
      n: 4,
      edges: [[0, 1], [2, 3]],
      expected: false // Disconnected graph
    },
    {
      id: 4,
      n: 1,
      edges: [],
      expected: true // Single node with no edges
    },
    {
      id: 5,
      n: 2,
      edges: [[0, 1]],
      expected: true // Simple two-node tree
    },
    {
      id: 6,
      n: 4,
      edges: [[0, 1], [1, 2], [2, 0]],
      expected: false // Triangle cycle
    },
    {
      id: 7,
      n: 4,
      edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
      expected: false // Square cycle
    }
  ]

  let passedCount = 0

  console.log('==========================================')
  console.log('Running Test Suite for LeetCode 261: Graph Valid Tree')
  console.log('==========================================\n')

  for (const test of testCases) {
    const startTime = performance.now()
    let actual: boolean
    let error: string | null = null

    try {
      // Execute the solution function passed as an argument
      actual = solutionFn(test.n, test.edges)
    } catch (err: any) {
      actual = !test.expected // Force failure state if execution throws
      error = err.message
    }

    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(3)
    const passed = actual === test.expected && error === null

    if (passed) {
      passedCount++
      console.log(`✅ Test #${test.id} PASSED (${duration} ms)`)
    } else {
      console.log(`❌ Test #${test.id} FAILED (${duration} ms)`)
      console.log(`   - Nodes (n):    ${test.n}`)
      console.log(`   - Edges:        ${JSON.stringify(test.edges)}`)
      console.log(`   - Expected:     ${test.expected}`)
      console.log(`   - Received:     ${error ? `Error: ${error}` : actual}`)
    }
    console.log('------------------------------------------')
  }

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} tests passed.`)
  if (passedCount === testCases.length) {
    console.log('🎉 All tests passed successfully!')
  } else {
    console.log('⚠️ Some tests failed. Review the logs above.')
  }
}

runTests(validTree3)
