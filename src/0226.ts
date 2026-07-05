// 226. Invert Binary Tree

import { Queue } from '@datastructures-js/queue'

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

/**
 * BFS w/ Queue
 * T: O(n); S: O(n);
 */
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null

  const q = new Queue<TreeNode>([root])

  while (!q.isEmpty()) {
    const top = q.pop()!

    const temp = top.left
    top.left = top.right
    top.right = temp

    if (top.left !== null) {
      q.push(top.left)
    }
    if (top.right !== null) {
      q.push(top.right)
    }
  }

  return root
};

/**
 * DFS w/ Recursion
 * T: O(n); S: O(n);
 */
function invertTree2(root: TreeNode | null): TreeNode | null {
  if (root === null) return null

  const temp = root.left
  root.left = root.right
  root.right = temp

  invertTree(root.left)
  invertTree(root.right)

  return root
};

/**
 * DFS w/ Stack
 * T: O(n); S: O(n);
 */
function invertTree3(root: TreeNode | null): TreeNode | null {
  if (root === null) return null

  const stack: (TreeNode | null)[] = [root]

  while (stack.length > 0) {
    const top = stack.pop()!

    const temp = top.left
    top.left = top.right
    top.right = temp

    if (top.left !== null) {
      stack.push(top.left)
    }
    if (top.right !== null) {
      stack.push(top.right)
    }
  }

  return root
};

// ==========================================
// TESTER UTILITIES
// ==========================================

/**
 * Builds a binary tree from a LeetCode-style level-order array.
 * e.g., [4, 2, 7, 1, 3, 6, 9]
 */
function arrayToTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null

  const root = new TreeNode(arr[0])
  const queue: TreeNode[] = [root]
  let i = 1

  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift()!

    // Left child
    if (i < arr.length && arr[i] !== null) {
      curr.left = new TreeNode(arr[i]!)
      queue.push(curr.left)
    }
    i++

    // Right child
    if (i < arr.length && arr[i] !== null) {
      curr.right = new TreeNode(arr[i]!)
      queue.push(curr.right)
    }
    i++
  }

  return root
}

/**
 * Converts a binary tree back into a level-order array for easy comparison.
 */
function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return []

  const result: (number | null)[] = []
  const queue: (TreeNode | null)[] = [root]

  while (queue.length > 0) {
    const curr = queue.shift()

    if (curr) {
      result.push(curr.val)
      queue.push(curr.left)
      queue.push(curr.right)
    } else {
      result.push(null)
    }
  }

  // Trim trailing nulls to match LeetCode standard output format
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop()
  }

  return result
}

// ==========================================
// RUNNING THE TEST CASES
// ==========================================

interface TestCase {
  input: (number | null)[];
  expected: (number | null)[];
  description: string;
}

const testCases: TestCase[] = [
  {
    description: 'Standard full binary tree',
    input: [4, 2, 7, 1, 3, 6, 9],
    expected: [4, 7, 2, 9, 6, 3, 1]
  },
  {
    description: 'Small binary tree',
    input: [2, 1, 3],
    expected: [2, 3, 1]
  },
  {
    description: 'Empty tree',
    input: [],
    expected: []
  },
  {
    description: 'Asymmetric tree',
    input: [1, 2, null, 3],
    expected: [1, null, 2, null, 3]
  }
]

function runTests() {
  console.log('--- Running LeetCode 226 Tests ---\n')

  testCases.forEach((test, index) => {
    const root = arrayToTree(test.input)
    const invertedRoot = invertTree3(root)
    const actual = treeToArray(invertedRoot)

    const passed = JSON.stringify(actual) === JSON.stringify(test.expected)

    console.log(`Test #${index + 1}: ${test.description}`)
    console.log('Input:    ', JSON.stringify(test.input))
    console.log('Expected: ', JSON.stringify(test.expected))
    console.log('Actual:   ', JSON.stringify(actual))
    console.log(passed ? '✅ PASSED' : '❌ FAILED')
    console.log('-----------------------------------\n')
  })
}

runTests()