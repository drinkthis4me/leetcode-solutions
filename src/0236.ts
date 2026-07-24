// 236. Lowest Common Ancestor of a Binary Tree

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
 * S: O(n); T: O(n);
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // Map all node-parent from top to bottom (stop early when p and q found)
  // Retrace ancestor line from p to root
  // Retrace ancestor line from q to root
  // LCA is at lines met; or null

  // Edge case
  if (root === null || p === null || q === null) return root

  // map of node-parent
  const parentMap = new Map<TreeNode, TreeNode | null>()
  // Queue for BFS
  const queue = new Queue<TreeNode>([root])
  parentMap.set(root, null)

  while (!parentMap.has(p) || !parentMap.has(q)) {
    const node = queue.pop()!

    if (node.left) {
      parentMap.set(node.left, node)
      queue.push(node.left)
    }

    if (node.right) {
      parentMap.set(node.right, node)
      queue.push(node.right)
    }
  }

  const ancestors = new Set<TreeNode>()
  let curr: TreeNode | null = p

  // Trace p to root
  while (curr !== null) {
    ancestors.add(curr)
    curr = parentMap.get(curr)!
  }

  // Trace q to root
  curr = q
  while (curr !== null) {
    if (ancestors.has(curr)) return curr

    curr = parentMap.get(curr)!
  }

  return null
};

/**
 * DFS
 * S: O(n); T: O(n);
 */
function lowestCommonAncestor2(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // Edge case: root is null
  // Base case: root is p or q
  if (root === null || root === p || root === q) return root

  // DFS
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)

  if (left !== null && right !== null) {
    return root
  } else {
    return left || right
  }
};

/**
 * Test Runner
 */
function runTests(solution: (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null) => TreeNode | null) {
  const testCases = [
    { tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 1, expected: 3 },
    { tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 4, expected: 5 },
    { tree: [1, 2], p: 1, q: 2, expected: 1 }
  ]

  /**
 * Helper to build tree from array (Level order traversal)
 */
  function buildTree(arr: (number | null)[]): TreeNode | null {
    if (!arr.length || arr[0] === null) return null
    const root = new TreeNode(arr[0] as number)
    const queue = [root]
    let i = 1
    while (i < arr.length) {
      const curr = queue.shift()!
      if (arr[i] !== null) {
        curr.left = new TreeNode(arr[i] as number)
        queue.push(curr.left)
      }
      i++
      if (i < arr.length && arr[i] !== null) {
        curr.right = new TreeNode(arr[i] as number)
        queue.push(curr.right)
      }
      i++
    }
    return root
  }

  /**
 * Helper to find a specific node by value
 */
  function findNode(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) return null
    if (root.val === val) return root
    return findNode(root.left, val) || findNode(root.right, val)
  }

  testCases.forEach((tc, index) => {
    const root = buildTree(tc.tree)
    const p = findNode(root, tc.p)
    const q = findNode(root, tc.q)

    const result = solution(root, p, q)
    const passed = result?.val === tc.expected

    console.log(`Test Case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`   Expected: ${tc.expected}, Got: ${result?.val}`)
    }
  })
}

runTests(lowestCommonAncestor2)
