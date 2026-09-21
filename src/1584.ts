// 1584. Min Cost to Connect All Points

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

// Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
// Output: 20
// Input: points = [[3,12],[-2,5],[-4,1]]
// Output: 18
// HINT: Minimum spanning tree

/**
 * Kruskal's Algorithm (Disjoint Set Union)
 * T: O(n^2 log n); S: O(n^2);
 */
function minCostConnectPoints(points: number[][]): number {
  const n = points.length

  if (n === 1) return 0

  const getCost = (x: number[], y: number[]) => {
    return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1])
  }

  // Calculate costs of every potential edges
  const edges: number[][] = []
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const cost = getCost(points[i], points[j])
      edges.push([cost, i, j])
    }
  }
  // Sort by cost in asc order
  edges.sort((a, b) => a[0] - b[0])

  // Disjoint set union to connect nodes
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

      if (this.size[rootX] < this.size[rootY]) {
        [rootX, rootY] = [rootY, rootX]
      }
      this.size[rootX] += this.size[rootY]
      this.root[rootY] = rootX

      return true
    }

    connected(x: number, y: number): boolean {
      return this.find(x) === this.find(y)
    }
  }

  const uf = new UnionFind(n + 1)
  let totalCost = 0

  for (const [cost, u, v] of edges) {
    if (uf.union(u, v)) {
      totalCost += cost
    }
  }

  return totalCost
};

/**
 * Prim's Algorithm
 * T: O(n^2 log n); S: O(n^2);
 */
function minCostConnectPoints2(points: number[][]): number {
  // Construct a MST -> Prims's Algorithm
  // Adjacency list for each vertices
  // MinHeap to track the minimum cost

  const n = points.length

  const getCost = (x: number[], y: number[]) => {
    return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1])
  }

  // Adjacency list of (u, [cost, v])
  const adj = new Map<number, number[][]>()
  for (let i = 0; i < n; i++) {
    adj.set(i, [])
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const cost = getCost(points[i], points[j])
      adj.get(i)!.push([cost, j])
      adj.get(j)!.push([cost, i])
    }
  }

  const visited = new Set<number>()
  // MinHeap of [cost, vertex]
  const minHeap = new MinPriorityQueue<[number, number]>(e => e[0])
  let res = 0

  // Connect first node with 0 cost
  minHeap.push([0, 0])

  // BFS until all are visited
  while (visited.size < n) {
    const [cost, i] = minHeap.pop()!

    if (visited.has(i)) continue

    res += cost
    visited.add(i)

    // Add all frontiers to minHeap
    for (const [neighborCost, neighbor] of adj.get(i)!) {
      if (!visited.has(neighbor)) {
        minHeap.push([neighborCost, neighbor])
      }
    }
  }

  return res
}
/**
 * Prim's Algorithm (Optimized)
 * T: O(n^2); S: O(n);
 */
function minCostConnectPoints3(points: number[][]): number {
  // Calculate the neighbor's cost on the fly to avoid adj list

  const n = points.length
  const visited = new Set<number>()
  const minHeap = new MinPriorityQueue<[number, number]>(e => e[0])
  let res = 0

  minHeap.push([0, 0])

  while (visited.size < n) {
    const [cost, i] = minHeap.pop()!

    if (visited.has(i)) continue

    res += cost
    visited.add(i)

    const [xi, yi] = points[i]

    for (let j = 0; j < n; j++) {
      if (!visited.has(j)) {
        const [xj, yj] = points[j]
        const neighborCost = Math.abs(xi - xj) + Math.abs(yi - yj)
        minHeap.push([neighborCost, j])
      }
    }
  }

  return res
}

interface TestCase {
  id: number
  points: number[][]
  expected: number
}
function runTests(solution: (points: number[][]) => number): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      points: [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]],
      expected: 20
    },
    {
      id: 2,
      points: [[3, 12], [-2, 5], [-4, 1]],
      expected: 18
    },
    {
      id: 3,
      points: [[0, 0], [1, 1], [1, 0], [-1, 1]],
      expected: 4
    },
    {
      id: 4,
      points: [[-1000000, -1000000], [1000000, 1000000]],
      expected: 4000000
    },
    {
      id: 5,
      points: [[0, 0]],
      expected: 0
    }
  ]

  let passedCount = 0

  console.log('=== Running Test Suite: LeetCode 1584 ===')

  for (const test of testCases) {
    const startTime = performance.now()
    let actual: number | undefined
    let error: string | null = null

    try {
      // Deep copy points array to ensure solutions don't mutate input test data
      const inputCopy = test.points.map(p => [...p])
      actual = solution(inputCopy)
    } catch (err: any) {
      error = err.message
    }

    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(3)

    const passed = error === null && actual === test.expected
    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case #${test.id} (${duration} ms)`)
    } else {
      console.error(`[FAIL] Test Case #${test.id} (${duration} ms)`)
      console.error(`  - Input:    ${JSON.stringify(test.points)}`)
      console.error(`  - Expected: ${test.expected}`)
      console.error(`  - Actual:   ${error ? `Error: ${error}` : actual}`)
    }
  }

  console.log('----------------------------------------')
  console.log(`Results: ${passedCount}/${testCases.length} test cases passed.`)
  console.log('========================================')
}

runTests(minCostConnectPoints3)
