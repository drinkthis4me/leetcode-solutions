// 210. Course Schedule II

import { Queue } from '@datastructures-js/queue'

// Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,2,1,3] or [0,1,2,3]

/**
 * DFS
 * T: O(V + E); S: O(V + E);
 * where V is the number of courses; E is the length of prerequisites
 */
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const preMap = new Map<number, number[]>()
  for (const [course, pre] of prerequisites) {
    if (!preMap.has(course)) {
      preMap.set(course, [])
    }
    preMap.get(course)!.push(pre)
  }

  // Hash set for visited node to prevent repeated work
  const visited = Array(numCourses).fill(false)
  // Hash set for cycle detection
  const cycle = Array(numCourses).fill(false)
  const res: number[] = []

  const dfs = (i: number) => {
    if (cycle[i]) return false

    if (visited[i]) return true

    cycle[i] = true

    for (const pre of preMap.get(i) || []) {
      if (!dfs(pre)) return false
    }

    // Backtrack
    cycle[i] = false
    // Pruning
    visited[i] = true

    res.push(i)

    return true
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      return []
    }
  }

  return res
};

/**
 * BFS (Topological Sort w/ Kahn's Algorithm)
 * T: O(V + E); S: O(V + E);
 */
function findOrder2(numCourses: number, prerequisites: number[][]): number[] {
  // Works forward from sources to sinks
  // Need to know the in-degrees of every node upfront

  const inDegree: number[] = Array(numCourses).fill(0)
  // Map of (course -> {pres})
  const adj: number[][] = Array.from({ length: numCourses }, () => [])
  for (const [course, pre] of prerequisites) {
    inDegree[pre]++
    adj[course].push(pre)
  }

  const q = new Queue<number>()
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      q.push(i)
    }
  }

  const res: number[] = Array(numCourses)
  // Track finished course for cycle detection
  let finishedCount = 0
  while (!q.isEmpty()) {
    const curr = q.pop()!

    // Populate "sink vertex" (vertex without out-going edge) from right to left
    res[numCourses - finishedCount - 1] = curr
    finishedCount++

    for (const pre of adj[curr]) {
      inDegree[pre]--
      if (inDegree[pre] === 0) {
        q.push(pre)
      }
    }
  }

  return finishedCount === numCourses ? res : []
};

/**
 * DFS (Topological Sort)
 * T: O(V + E); S: O(V + E);
 */
function findOrder3(numCourses: number, prerequisites: number[][]): number[] {
  // Works backward from sinks to sources (with post-order traversal)

  // Map of (pre -> {courses})
  const adj: number[][] = Array.from({ length: numCourses }, () => [])
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course)
  }

  // 0: unvisited; 1: visiting (on the stack); 2: visited
  const state: number[] = Array(numCourses).fill(0)
  const res: number[] = []

  const dfs = (i: number) => {
    state[i] = 1

    for (const neighbor of adj[i]) {
      // Cycle detection
      if (state[neighbor] === 1) return false

      if (state[neighbor] === 0) {
        if (!dfs(neighbor)) return false
      }
    }

    state[i] = 2
    res.push(i) // Post-order. Need to reverse to get the right order.

    return true
  }

  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0) {
      if (!dfs(i)) return []
    }
  }

  return res.reverse()
};

/**
 * Test Runner
 */
interface TestCase {
  id: number
  numCourses: number
  prerequisites: number[][]
}

function runTests(solution: (numCourses: number, prerequisites: number[][]) => number[]): void {
  function isValidTopologicalSort(numCourses: number, prerequisites: number[][], result: number[]): boolean {
    // If it's empty, it's only valid if it's impossible to finish courses (e.g., cycle exists)
    if (result.length === 0) {
      // Simple cycle check to see if an empty array was indeed correct
      return !isPossible(numCourses, prerequisites)
    }

    if (result.length !== numCourses) return false

    const pos = new Map<number, number>()
    for (let i = 0; i < result.length; i++) {
      pos.set(result[i], i)
    }

    // Check if all prerequisites are satisfied
    for (const [course, prereq] of prerequisites) {
      if (!pos.has(course) || !pos.has(prereq)) return false
      if (pos.get(prereq)! >= pos.get(course)!) {
        return false // Prereq must come before course
      }
    }

    return true
  }

  // Helper to check if a valid topological sort actually exists
  function isPossible(numCourses: number, prerequisites: number[][]): boolean {
    const inDegree = new Array(numCourses).fill(0)
    const adj: number[][] = Array.from({ length: numCourses }, () => [])

    for (const [course, prereq] of prerequisites) {
      adj[prereq].push(course)
      inDegree[course]++
    }

    const queue: number[] = []
    for (let i = 0; i < numCourses; i++) {
      if (inDegree[i] === 0) queue.push(i)
    }

    let count = 0
    while (queue.length > 0) {
      const curr = queue.shift()!
      count++
      for (const next of adj[curr]) {
        inDegree[next]--
        if (inDegree[next] === 0) {
          queue.push(next)
        }
      }
    }

    return count === numCourses
  }

  const testCases: TestCase[] = [
    {
      id: 1,
      numCourses: 2,
      prerequisites: [[1, 0]]
    },
    {
      id: 2,
      numCourses: 4,
      prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]]
    },
    {
      id: 3,
      numCourses: 1,
      prerequisites: []
    },
    {
      id: 4,
      numCourses: 2,
      prerequisites: [[1, 0], [0, 1]] // Cycle, should return []
    },
    {
      id: 5,
      numCourses: 3,
      prerequisites: [[0, 1], [0, 2], [1, 2]]
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 210 Tests ===')
  for (const tc of testCases) {
    const start = performance.now()
    let userResult: number[] = []
    let error: string | null = null

    try {
      userResult = solution(tc.numCourses, tc.prerequisites)
    } catch (e: any) {
      error = e.message
    }

    const end = performance.now()
    const duration = (end - start).toFixed(3)

    const passed = error === null && isValidTopologicalSort(tc.numCourses, tc.prerequisites, userResult)

    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${tc.id} (${duration} ms)`)
    } else {
      console.log(`[FAIL] Test Case ${tc.id} (${duration} ms)`)
      console.log(`  Input: numCourses = ${tc.numCourses}, prerequisites = ${JSON.stringify(tc.prerequisites)}`)
      console.log(`  Output: ${JSON.stringify(userResult)}`)
      if (error) console.log(`  Error: ${error}`)
    }
  }

  console.log('==================================')
  console.log(`Passed: ${passedCount}/${testCases.length} test cases.`)
}

runTests(findOrder3)
