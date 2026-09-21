// 743. Network Delay Time

import { MinPriorityQueue } from '@datastructures-js/priority-queue'
import { Queue } from '@datastructures-js/queue'

// Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
// Output: 2
// Input: times = [[1,2,1]], n = 2, k = 2
// Output: -1

/**
 * DFS
 * T: O(V + E); S: O(V + E);
 */
function networkDelayTime(times: number[][], n: number, k: number): number {
  // Map of (source, [target, time])
  const adj = new Map<number, [number, number][]>()
  for (const [u, v, w] of times) {
    if (!adj.has(u)) {
      adj.set(u, [])
    }
    adj.get(u)!.push([v, w])
  }

  const dist: number[] = Array(n + 1).fill(Infinity)

  const dfs = (node: number, totalTime: number) => {
    if (totalTime >= dist[node]) return

    dist[node] = totalTime

    for (const [neighbor, w] of (adj.get(node) || [])) {
      dfs(neighbor, totalTime + w)
    }
  }

  dfs(k, 0)

  const res = Math.max(...dist.slice(1))

  return res === Infinity ? -1 : res
};

/**
 * Bellman Ford Algorithm
 * T: O(V * E); S: O(V);
 */
function networkDelayTime2(times: number[][], n: number, k: number): number {
  const dist = new Array(n + 1).fill(Infinity)
  dist[k] = 0

  // Relaxes all edges (V - 1) times
  for (let i = 0; i < n - 1; i++) {
    let updated = false

    for (const [u, v, w] of times) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w
        updated = true
      }
    }

    if (!updated) break
  }

  let maxTime = 0
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) {
      return -1
    }
    maxTime = Math.max(maxTime, dist[i])
  }

  return maxTime
}

/**
 * Shortest Path Faster Algorithm
 * T: O(V * E); S: O(V);
 */
function networkDelayTime3(times: number[][], n: number, k: number): number {
  // Optimization of the Bellman-Ford algorithm
  // Queue to keep track of nodes whose distances have actually relaxed

  const graph = new Map<number, [number, number][]>()
  for (const [u, v, w] of times) {
    if (!graph.has(u)) {
      graph.set(u, [])
    }
    graph.get(u)!.push([v, w])
  }

  const dist = new Array(n + 1).fill(Infinity)
  const q = new Queue<number>()
  const inQueue = new Array(n + 1).fill(false)

  dist[k] = 0
  q.push(k)
  inQueue[k] = true

  while (!q.isEmpty()) {
    const u = q.pop()!
    inQueue[u] = false

    for (const [v, w] of graph.get(u) || []) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w

        if (!inQueue[v]) {
          q.push(v)
        }
      }
    }
  }

  let maxTime = 0
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) {
      return -1
    }
    maxTime = Math.max(maxTime, dist[i])
  }

  return maxTime
}

/**
 * Dijkstra's Algorithm
 * T: O(E log V); S: O(V + E);
 */
function networkDelayTime4(times: number[][], n: number, k: number): number {
  const graph = new Map<number, [number, number][]>()
  for (const [u, v, w] of times) {
    if (!graph.has(u)) {
      graph.set(u, [])
    }
    graph.get(u)!.push([v, w])
  }

  // Min Heap for (subtotal_time, node)
  // This makes sure we always visit the neighbor with the shortest time
  const minHeap = new MinPriorityQueue<[number, number]>(e => e[0])
  // Map of (node, total_time_to_node)
  // Also functions as visited set
  const timeMap = new Map<number, number>()

  minHeap.enqueue([0, k])

  while (!minHeap.isEmpty()) {
    const [w1, u1] = minHeap.dequeue()!

    // Shortest time is locked-in upon the first pop
    if (timeMap.has(u1)) continue

    timeMap.set(u1, w1)

    for (const [u2, w2] of (graph.get(u1) || [])) {
      if (!timeMap.has(u2)) {
        minHeap.enqueue([w1 + w2, u2])
      }
    }
  }

  if (timeMap.size === n) {
    let time = 0
    for (const t of timeMap.values()) {
      time = Math.max(time, t)
    }
    return time
  } else {
    return -1
  }
}

/**
 * Test runner function for LeetCode 743: Network Delay Time
 * @param solutionFn The function implementing the networkDelayTime logic
*/
interface TestCase {
  id: number
  times: number[][]
  n: number
  k: number
  expected: number
}
function runTests(solutionFn: (times: number[][], n: number, k: number) => number): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]],
      n: 4,
      k: 2,
      expected: 2
    },
    {
      id: 2,
      times: [[1, 2, 1]],
      n: 2,
      k: 1,
      expected: 1
    },
    {
      id: 3,
      times: [[1, 2, 1]],
      n: 2,
      k: 2,
      expected: -1
    },
    {
      id: 4,
      times: [[1, 2, 1], [2, 3, 2], [1, 3, 4]],
      n: 3,
      k: 1,
      expected: 3
    },
    {
      id: 5,
      times: [[1, 2, 1], [2, 3, 2]],
      n: 4,
      k: 1,
      expected: -1 // Node 4 is completely disconnected
    }
  ]

  let passedCount = 0

  console.log('--- Running Test Cases for LeetCode 743: Network Delay Time ---')

  for (const test of testCases) {
    const startTime = performance.now()
    const result = solutionFn(test.times, test.n, test.k)
    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(3)

    const passed = result === test.expected
    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${test.id} (${duration} ms)`)
    } else {
      console.error(`[FAIL] Test Case ${test.id} (${duration} ms)`)
      console.error(`  Input:    n = ${test.n}, k = ${test.k}, times = ${JSON.stringify(test.times)}`)
      console.error(`  Expected: ${test.expected}`)
      console.error(`  Received: ${result}`)
    }
  }

  console.log('-------------------------------------------------------------')
  console.log(`Test Results: ${passedCount} / ${testCases.length} passed.`)
}

runTests(networkDelayTime4)
