// 787. Cheapest Flights Within K Stops

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

// Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
// Output: 700
// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
// Output: 200

/**
 * Dijkstra
 * T: (K * E * log VK); S: (V * K + E)
 */
function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  // Adjacency list from `flights`
  // Map of (from, [to, price][])
  const map = new Map<number, number[][]>()
  for (const [u, v, price] of flights) {
    if (!map.has(u)) {
      map.set(u, [])
    }

    map.get(u)!.push([v, price])
  }

  // MinHeap of [cost, node, stops]
  const minHeap = new MinPriorityQueue<number[]>(el => el[0])
  // Start at `src` with zero cost and no stops
  minHeap.push([0, src, 0])

  // Min stops for each node to enforce k stops requirement
  const minStops: number[] = new Array(n).fill(Infinity)

  while (!minHeap.isEmpty()) {
    const [cost, u, stops] = minHeap.pop()!

    if (u === dst) return cost

    // Exceed max k stops
    if (stops > k) continue

    // Already has a fewer/equal stops in other paths
    if (stops >= minStops[u]) continue

    minStops[u] = stops

    for (const [v, price] of map.get(u)!) {
      minHeap.push([cost + price, v, stops + 1])
    }
  }

  // No solution. Return -1 as requested.
  return -1
};

/**
 * Bellman-Ford
 * T: (K * E); S: (V + E)
 */
function findCheapestPrice2(n: number, flights: number[][], src: number, dst: number, k: number): number {
  // Map of costs from src to ith node
  let costs: number[] = new Array(n).fill(Infinity)
  costs[src] = 0

  // `k` stops -> (k+1) edges
  for (let i = 0; i <= k; i++) {
    // Temp costs to prevent updating multiple time within the same iteration
    const tempCosts = [...costs]

    // BFS for this layer
    for (const [u, v, price] of flights) {
      // READ from the old state
      if (costs[u] !== Infinity) {
        if (costs[u] + price < tempCosts[v]) {
          // WRITE to the current state being built
          tempCosts[v] = costs[u] + price
        }
      }
    }

    // Move to the next layer with the newly built state
    costs = tempCosts
  }

  return costs[dst] === Infinity ? -1 : costs[dst]
};

type FindCheapestPriceFn = (n: number, flights: number[][], src: number, dst: number, k: number) => number

interface TestCase {
  id: number
  n: number
  flights: number[][]
  src: number
  dst: number
  k: number
  expected: number
}

function runTests(solution: FindCheapestPriceFn): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      n: 4,
      flights: [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]],
      src: 0,
      dst: 3,
      k: 1,
      expected: 700
    },
    {
      id: 2,
      n: 3,
      flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]],
      src: 0,
      dst: 2,
      k: 1,
      expected: 200
    },
    {
      id: 3,
      n: 3,
      flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]],
      src: 0,
      dst: 2,
      k: 0,
      expected: 500
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 787 Tests ===\n')

  for (const tc of testCases) {
    const startTime = performance.now()
    const result = solution(tc.n, tc.flights, tc.src, tc.dst, tc.k)
    const duration = (performance.now() - startTime).toFixed(2)

    const passed = result === tc.expected
    if (passed) {
      passedCount++
    }

    console.log(`Test Case ${tc.id}: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`  - Parameters: n = ${tc.n}, src = ${tc.src}, dst = ${tc.dst}, k = ${tc.k}`)
    console.log(`  - Expected: ${tc.expected} | Got: ${result}`)
    console.log(`  - Execution Time: ${duration}ms\n`)
  }

  console.log('==================================')
  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(findCheapestPrice2)
