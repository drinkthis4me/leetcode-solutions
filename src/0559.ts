// 559. Maximum Depth of N-ary Tree

import { Queue } from '@datastructures-js/queue'

/**
 * Definition for _Node.
 */
class _Node {
  val: number
  children: _Node[]

  constructor(val?: number, children?: _Node[]) {
    this.val = (val === undefined ? 0 : val)
    this.children = (children === undefined ? [] : children)
  }
}

// Input: root = [1,null,3,2,4,null,5,6]
// Output: 3

/**
 * Recursion (Top-down)
 * T: O(n); S: O(height);
 */
function maxDepth(root: _Node | null): number {
  const dfs = (node: _Node | null, depth: number): number => {
    if (node === null) return depth

    let currDepth = depth + 1

    for (const child of node.children) {
      currDepth = Math.max(currDepth, dfs(child, depth + 1))
    }

    return currDepth
  }

  return dfs(root, 0)
};

/**
 * Recursion (Bottom-up)
 * T: O(n); S: O(height);
 */
function maxDepth2(root: _Node | null): number {
  if (root === null) return 0

  let maxChildDepth = 0

  for (const child of root.children) {
    maxChildDepth = Math.max(maxChildDepth, maxDepth2(child))
  }

  return maxChildDepth + 1
};

interface TestCase {
  input: (number | null)[]
  expected: number
}

/**
 * BFS w/ Queue
 * T: O(n); S: O(height);
 */
function maxDepth3(root: _Node | null): number {
  if (root === null) return 0

  const q = new Queue<_Node>([root])
  let depth = 0

  while (!q.isEmpty()) {
    depth++
    const size = q.size()

    for (let i = 0; i < size; i++) {
      const node = q.pop()!
      for (const child of node.children) {
        q.push(child)
      }
    }
  }

  return depth
};

/**
 * DFS w/ Stack
 * T: O(n); S: O(height);
 */
function maxDepth4(root: _Node | null): number {
  if (root === null) return 0

  // Stack for (node, depth) pair
  const stack: [_Node, number][] = [[root, 1]]
  let max = 0

  while (stack.length > 0) {
    const [node, depth] = stack.pop()!

    max = Math.max(max, depth)

    for (const child of node.children) {
      stack.push([child, depth + 1])
    }
  }

  return max
};

interface TestCase {
  input: (number | null)[]
  expected: number
}

/**
 * Runs test cases for LeetCode 559: Maximum Depth of N-ary Tree
 * @param solutionFn - Function that takes the root of an N-ary tree and returns its maximum depth
 */
function runTests(solutionFn: (root: _Node | null) => number): void {
  // Helper function to deserialize LeetCode's level-order array representation into an N-ary tree
  function createNaryTree(arr: (number | null)[]): _Node | null {
    if (!arr || arr.length === 0 || arr[0] === null) return null

    const root = new _Node(arr[0])
    const queue: _Node[] = [root]
    let i = 2 // Index 0 is root, index 1 is null delimiter

    while (i < arr.length && queue.length > 0) {
      const parent = queue.shift()!

      while (i < arr.length && arr[i] !== null) {
        const child = new _Node(arr[i] as number)
        parent.children.push(child)
        queue.push(child)
        i++
      }

      // Skip the null delimiter
      i++
    }

    return root
  }

  const testCases: TestCase[] = [
    {
      input: [1, null, 3, 2, 4, null, 5, 6],
      expected: 3
    },
    {
      input: [1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14],
      expected: 5
    },
    {
      input: [],
      expected: 0
    },
    {
      input: [1, null],
      expected: 1
    },
    {
      input: [1, null, 2, null, 3, null, 4],
      expected: 4
    }
  ]

  let passedCount = 0

  console.log('Running tests for LeetCode 559: Maximum Depth of N-ary Tree...\n')

  testCases.forEach((test, index) => {
    const root = createNaryTree(test.input)
    const result = solutionFn(root)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log(`  Input:    ${JSON.stringify(test.input)}`)
      console.log(`  Expected: ${test.expected}`)
      console.log(`  Received: ${result}`)
    }
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(maxDepth4)
