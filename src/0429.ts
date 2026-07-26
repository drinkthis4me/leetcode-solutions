// 429. N-ary Tree Level Order Traversal

import { Queue } from '@datastructures-js/queue'

/**
 * Definition for _Node.
 *
 */
class _Node {
  val: number
  children: _Node[]

  constructor(val?: number, children?: _Node[]) {
    this.val = (val === undefined ? 0 : val)
    this.children = (children === undefined ? [] : children)
  }
}

/**
 * BFS w/ Queue
 * T:O(n); S: O(n);
 */
function levelOrder(root: _Node | null): number[][] {
  if (root === null) return []

  const res: number[][] = []

  const q = new Queue<_Node>([root])

  while (!q.isEmpty()) {
    const size = q.size()
    const level: number[] = []

    for (let i = 0; i < size; i++) {
      const curr = q.pop()!
      level.push(curr.val)

      for (const child of curr.children) {
        q.push(child)
      }
    }

    res.push(level)
  }

  return res
};

/**
 * DFS
 * T:O(n); S: O(h);
 */
function levelOrder2(root: _Node | null): number[][] {
  if (root === null) return []

  const res: number[][] = []

  const dfs = (node: _Node | null, idx: number) => {
    if (node === null) return

    // Result doesn't have current level array. Create a new one.
    if (idx === res.length) {
      res.push([])
    }

    res[idx].push(node.val)

    for (const child of node.children) {
      dfs(child, idx + 1)
    }
  }

  dfs(root, 0)

  return res
};

/**
 * Runs a set of test cases against the provided LeetCode 429 solution function.
 * @param solve - The N-ary Tree Level Traversal function to test.
 */
function runTests(solution: (root: _Node | null) => number[][]) {
  // Helper function to build an N-ary tree from LeetCode's level order serialization array (with null separators)
  function buildNaryTree(arr: (number | null)[]): _Node | null {
    if (!arr || arr.length === 0 || arr[0] === null) return null

    const root = new _Node(arr[0] as number)
    const queue: _Node[] = [root]
    let i = 2 // Index 0 is root, index 1 is null separator

    while (i < arr.length && queue.length > 0) {
      const parent = queue.shift()!

      // Read children until we hit a null or run out of elements
      while (i < arr.length && arr[i] !== null) {
        const childNode = new _Node(arr[i] as number)
        parent.children.push(childNode)
        queue.push(childNode)
        i++
      }

      // Skip the null separator between groups of children
      i++
    }

    return root
  }

  // Helper function to compare two arrays of arrays for test validation
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

  const testCases: { input: (number | null)[], expected: number[][] }[] = [
    {
      input: [1, null, 3, 2, 4, null, 5, 6],
      expected: [[1], [3, 2, 4], [5, 6]]
    },
    {
      input: [1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14],
      expected: [[1], [2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13], [14]]
    },
    {
      input: [],
      expected: []
    },
    {
      input: [42],
      expected: [[42]]
    }
  ]

  let passedCount = 0

  testCases.forEach((tc, index) => {
    const root = buildNaryTree(tc.input)
    const result = solution(root)
    const isPassed = arraysEqual(result, tc.expected)

    if (isPassed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log('  Input Serialization:', tc.input)
      console.log('  Expected:', JSON.stringify(tc.expected))
      console.log('  Received:', JSON.stringify(result))
    }
  })

  console.log(`\nSummary: ${passedCount} / ${testCases.length} test cases passed.`)
}

runTests(levelOrder2)
