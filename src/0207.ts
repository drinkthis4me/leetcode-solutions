// 207. Course Schedule

import { Queue } from '@datastructures-js/queue'

/**
 * DFS & Cycle Detection
 * T: O(V + E); S: O(V + E);
 * where V is the number of courses; E is the length of prerequisites
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // If cannot finish, a loop exist. (1->0; 0->1)
  // Plot the relationship in a Hash Map.
  // DFS on every course to find cycle.

  // Map of (course, prerequisiteCourses) pair
  const preMap = new Map<number, number[]>()
  for (let i = 0; i < numCourses; i++) {
    preMap.set(i, [])
  }
  for (const [a, b] of prerequisites) {
    preMap.get(a)!.push(b)
  }

  // DFS to finish courses. False if cycle detected.
  const visited = new Set<number>()
  const dfs = (i: number): boolean => {
    if (visited.has(i)) return false

    const pres = preMap.get(i)!

    if (pres.length === 0) return true

    visited.add(i)

    for (const pre of pres) {
      if (!dfs(pre)) {
        return false
      }
    }

    // Backtrack
    visited.delete(i)
    // Pruning
    preMap.set(i, [])

    return true
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      return false
    }
  }

  return true
};

/**
 * BFS (Kahn's Algorithm)
 * T: O(V + E); S: O(V + E);
 */
function canFinish2(numCourses: number, prerequisites: number[][]): boolean {
  // Kahn's Algorithm
  // - Calculate in-degree and build the graph.
  // - A queue acts as a holding area for nodes that have
  //   an in-degree of zero (no prerequisites).
  // - Process the queue:
  //   Count the node as successfully processed.
  //   Release its neighbors by decreasing their in-degree
  //   Push neighbors with in-degree of zero to queue.
  // - Check cycle:
  //   If processed nodes equals to total nodes. No cycle.
  //   Else, some nodes were left behind and their in-degree
  //   never hit zero.

  const adj: number[][] = Array.from({ length: numCourses }, () => [])
  const inDegree: number[] = new Array(numCourses).fill(0)
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course) // Pre must be taken before courses
    inDegree[course]++    // Course has one or more pre
  }

  const q = new Queue<number>()
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      q.push(i)
    }
  }

  let completedCount = 0
  while (!q.isEmpty()) {
    const curr = q.pop()!
    completedCount++

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--

      if (inDegree[neighbor] === 0) {
        q.push(neighbor)
      }
    }
  }

  return completedCount === numCourses
};

/**
 * Tester for LeetCode 207: Course Schedule
 *
 * @param solutionFn - The function implementing the course schedule logic
 */
function runTests(solutionFn: (numCourses: number, prerequisites: number[][]) => boolean): void {
  type TestCase = {
    id: number
    numCourses: number
    prerequisites: number[][]
    expected: boolean
  }

  const testCases: TestCase[] = [
    {
      id: 1,
      numCourses: 2,
      prerequisites: [[1, 0]],
      expected: true
    },
    {
      id: 2,
      numCourses: 2,
      prerequisites: [[1, 0], [0, 1]],
      expected: false
    },
    {
      id: 3,
      numCourses: 4,
      prerequisites: [[1, 0], [2, 1], [3, 2]],
      expected: true
    },
    {
      id: 4,
      numCourses: 3,
      prerequisites: [[0, 1], [0, 2], [1, 2]],
      expected: true
    },
    {
      id: 5,
      numCourses: 3,
      prerequisites: [[0, 1], [1, 2], [2, 0]],
      expected: false
    },
    {
      id: 6,
      numCourses: 1,
      prerequisites: [],
      expected: true
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 207 Tests ===\n')

  for (const test of testCases) {
    const { id, numCourses, prerequisites, expected } = test

    try {
      const actual = solutionFn(numCourses, prerequisites)
      const passed = actual === expected

      if (passed) {
        passedCount++
        console.log(`[PASS] Test Case ${id}`)
      } else {
        console.log(`[FAIL] Test Case ${id}`)
        console.log(`  - Input: numCourses = ${numCourses}, prerequisites = ${JSON.stringify(prerequisites)}`)
        console.log(`  - Expected: ${expected}`)
        console.log(`  - Actual:   ${actual}`)
      }
    } catch (error) {
      console.log(`[ERROR] Test Case ${id} threw an exception:`, error)
    }
  }

  console.log('\n-----------------------------------')
  console.log(`Results: ${passedCount}/${testCases.length} test cases passed.`)
  console.log('===================================')
}

runTests(canFinish2)
