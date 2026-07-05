// 1448. Count Good Nodes in Binary Tree

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
 * DFS
 * T: O(n); S: O(n);
 */
function goodNodes(root: TreeNode | null): number {
  if (root === null) return 0

  // A 'maxSoFar' count need to passed down to children per depth
  // so that the current node can compare with all its ancestors

  const check = (node: TreeNode | null, maxSoFar: number): number => {
    if (node === null) return 0

    let res = node.val >= maxSoFar ? 1 : 0
    maxSoFar = Math.max(maxSoFar, node.val)

    res += check(node.left, maxSoFar)
    res += check(node.right, maxSoFar)

    return res
  }

  return check(root, root.val)
};

/**
 * BFS
 * T: O(n); S: O(n);
 */
function goodNodes2(root: TreeNode | null): number {
  if (root === null) return 0

  // BFS w/ Queue
  // A queue that stores [(node), (maxSoFar)] pair
  const q = new Queue<[TreeNode, number]>([[root, -Infinity]])
  let count = 0

  while (!q.isEmpty()) {
    const [node, maxSoFar] = q.pop()!

    if (node.val >= maxSoFar) count++

    const newMaxSoFar = Math.max(maxSoFar, node.val)

    if (node.left !== null) {
      q.push([node.left, newMaxSoFar])
    }
    if (node.right !== null) {
      q.push([node.right, newMaxSoFar])
    }
  }

  return count
};

/**
 * Helper to build a binary tree from LeetCode array format
 */
function buildTree(nodes: (number | null)[]): TreeNode | null {
  if (nodes.length === 0) return null
  const root = new TreeNode(nodes[0]!)
  const queue: TreeNode[] = [root]
  let i = 1
  while (i < nodes.length) {
    const curr = queue.shift()!
    if (nodes[i] !== null) {
      curr.left = new TreeNode(nodes[i]!)
      queue.push(curr.left)
    }
    i++
    if (i < nodes.length && nodes[i] !== null) {
      curr.right = new TreeNode(nodes[i]!)
      queue.push(curr.right)
    }
    i++
  }
  return root
}

// --- TESTER ---
function runTests() {
  const testCases = [
    { input: [3, 1, 4, 3, null, 1, 5], expected: 4 },
    { input: [3, 3, null, 4, 2], expected: 3 },
    { input: [1], expected: 1 },
    { input: [9, null, 3, 6], expected: 1 }
  ]

  testCases.forEach(({ input, expected }, index) => {
    const root = buildTree(input)
    const result = goodNodes2(root)
    console.log(`Test ${index + 1}: ${result === expected ? 'PASSED' : 'FAILED'}`)
    if (result !== expected) {
      console.log(`   Expected ${expected}, but got ${result}`)
    }
  })
}

runTests()