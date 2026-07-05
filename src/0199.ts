// 199. Binary Tree Right Side View

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
 * BFS
 * T: O(n); S: O(n);
 */
function rightSideView(root: TreeNode | null): number[] {
  if (root === null) return []

  const res: number[] = []
  const q = new Queue<TreeNode>([root])

  while (!q.isEmpty()) {
    const n = q.size()

    for (let i = 0; i < n; i++) {
      const node = q.pop()!

      // Take the last node of this level
      if (i === n - 1) {
        res.push(node.val)
      }

      if (node.left !== null) {
        q.push(node.left)
      }
      if (node.right !== null) {
        q.push(node.right)
      }
    }

  }

  return res
};

/**
 * DFS
 * T: O(n); S: O(n);
 */
function rightSideView2(root: TreeNode | null): number[] {
  const res: number[] = []

  const dfs = (node: TreeNode | null, depth: number): void => {
    if (node === null) return

    // First node in this depth
    if (res.length === depth) {
      res.push(node.val)
    }

    // Recursively visit right child first
    dfs(node.right, depth + 1)
    // Then left child
    dfs(node.left, depth + 1)
  }

  dfs(root, 0)

  return res
};

/**
 * Helper to build tree from array (Level-Order)
 */
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null
  const root = new TreeNode(arr[0])
  const queue = [root]
  let i = 1
  while (i < arr.length) {
    const node = queue.shift()!
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i] as number)
      queue.push(node.left)
    }
    i++
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i] as number)
      queue.push(node.right)
    }
    i++
  }
  return root
}

/**
 * Test Runner
 */
function runTests() {
  const testCases = [
    { input: [1, 2, 3, null, 5, null, 4], expected: [1, 3, 4] },
    { input: [1, null, 3], expected: [1, 3] },
    { input: [], expected: [] },
    { input: [1, 2, 3, 4], expected: [1, 3, 4] }
  ]

  testCases.forEach(({ input, expected }, index) => {
    const root = buildTree(input)
    const result = rightSideView(root)
    const passed = JSON.stringify(result) === JSON.stringify(expected)
    console.log(`Test Case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`   Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`)
    }
  })
}

runTests()