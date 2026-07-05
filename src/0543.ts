// 543. Diameter of Binary Tree

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
 * DFS & Recursion
 * T: O(n); S: O(height);
 */
function diameterOfBinaryTree(root: TreeNode | null): number {
  // Diameter of given node = max( (Max height of left subtree), (Max height of right subtree) )
  // DFS to find each tree height.
  // Update the global max diameter along the way.

  if (root === null) return 0

  // Passing an object/array allows all recursive frames to point to the exact same reference in memory,
  // mimicking a global variable without polluting the global scope.
  const res = [0]

  const dfs = (node: TreeNode | null, res: number[]): number => {
    if (node === null) return 0

    const leftHeight = dfs(node.left, res)
    const rightHeight = dfs(node.right, res)
    res[0] = Math.max(res[0]!, leftHeight + rightHeight)

    return Math.max(leftHeight, rightHeight) + 1
  }

  dfs(root, res)

  return res[0]!
};

/**
 * DFS & Stack
 * T: O(n); S: O(n);
 */
function diameterOfBinaryTree2(root: TreeNode | null): number {
  // Post-order traversal (left-right-root).
  // This make sure children is process before calculate max height.

  // h = max(maxLeftHeight, maxRightHeight) + 1
  // diameter = max((maxLeftHeight + maxRightHeight), leftDiameter, rightDiameter)

  let res = 0

  if (root === null) return res

  const stack: TreeNode[] = [root]
  // Map to track node and height
  // This acts as our return value cache. In recursion, a function returns its height up to the parent.
  // Here, the parent looks down at its children inside the depths map to grab those numbers.
  const map = new Map<TreeNode | null, number>()
  map.set(root, 0)

  while (stack.length > 0) {
    // Peak the top. Only pop when both children are processed.
    let node = stack.at(-1)!

    // Traverse left
    if (node.left !== null && !map.has(node.left)) {
      stack.push(node.left)
    }
    // Traverse right
    else if (node.right !== null && !map.has(node.right)) {
      stack.push(node.right)
    }
    // Both children processed. Pop and calculate max height.
    else {
      node = stack.pop()!

      const leftHeight = map.get(node.left) || 0
      const rightHeight = map.get(node.right) || 0

      // Store max height for parent
      const height = Math.max(leftHeight, rightHeight) + 1
      map.set(node, height)

      // Update diameter
      res = Math.max(res, leftHeight + rightHeight)
    }
  }

  return res
};

// --- TESTER UTILITIES ---

/**
 * Builds a binary tree from a LeetCode array representation (level-order).
 */
function buildTree(arr: (number | null)[]): TreeNode | null {
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

interface TestCase {
  input: (number | null)[];
  expected: number;
  description: string;
}

// --- TEST SUITE ---
const testCases: TestCase[] = [
  {
    input: [1, 2, 3, 4, 5],
    expected: 3,
    description: 'Standard tree (Diameter passes through root)'
  },
  {
    input: [1, 2],
    expected: 1,
    description: 'Simple two-node tree'
  },
  {
    input: [1],
    expected: 0,
    description: 'Single node tree'
  },
  {
    input: [],
    expected: 0,
    description: 'Empty tree'
  },
  {
    input: [1, 2, null, 3, null, 4, null, 5],
    expected: 4,
    description: 'Skewed left tree (linear path)'
  },
  {
    input: [1, 2, 3, 4, null, null, 5, 6, null, null, 7],
    expected: 6,
    description: 'Longest path does NOT pass through the root node'
  }
]

function runTests() {
  console.log('=== Running LeetCode 543 Tester ===\n')
  let passedCount = 0

  testCases.forEach((tc, index) => {
    const tree = buildTree(tc.input)
    const result = diameterOfBinaryTree(tree)
    const passed = result === tc.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test ${index + 1} Passed: ${tc.description}`)
    } else {
      console.log(`❌ Test ${index + 1} Failed: ${tc.description}`)
      console.log(`   Input array:  ${JSON.stringify(tc.input)}`)
      console.log(`   Expected:     ${tc.expected}`)
      console.log(`   Got:          ${result}\n`)
    }
  })

  console.log(`\n=== Results: ${passedCount}/${testCases.length} Passed ===`)
}

// Execute the tests
runTests()