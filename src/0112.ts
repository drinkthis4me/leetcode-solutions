// 112. Path Sum

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
 * T:O (n); S: O(n)
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // Accumulate current sum to match the target
  const dfs = (node: TreeNode | null, sum: number): boolean => {
    if (node === null) return false

    const newSum = sum + node.val

    // Check if current at leaf node
    if (node.left === null && node.right === null) {
      return newSum === targetSum
    }

    return dfs(node.left, newSum) || dfs(node.right, newSum)
  }

  return dfs(root, 0)
}

/**
 * DFS
 * T:O (n); S: O(n)
 */
function hasPathSum2(root: TreeNode | null, targetSum: number): boolean {
  // Decrement targetSum until it reaches 0

  if (root === null) return false

  targetSum -= root.val

  return (
    (targetSum === 0 && root.left === null && root.right === null) ||
    hasPathSum2(root.left, targetSum) ||
    hasPathSum2(root.right, targetSum)
  )
}

/**
 * Iterative DFS
 * T:O (n); S: O(n)
 */
function hasPathSum3(root: TreeNode | null, targetSum: number): boolean {
  // Use explicit stack to prevent recursion stack

  if (root === null) return false

  const stack: [TreeNode, number][] = [[root, targetSum - root.val]]

  while (stack.length > 0) {
    const [node, sum] = stack.pop()!

    if (node.left === null && node.right === null && sum === 0) {
      return true
    }

    if (node.left !== null) {
      stack.push([node.left, sum - node.left.val])
    }
    if (node.right !== null) {
      stack.push([node.right, sum - node.right.val])
    }
  }

  return false
}

/**
 * BFS
 * T:O (n); S: O(n)
 */
function hasPathSum4(root: TreeNode | null, targetSum: number): boolean {
  // BFS to check all paths

  if (root === null) return false

  const q = new Queue<[TreeNode, number]>([[root, targetSum - root.val]])

  while (!q.isEmpty()) {
    const [node, sum] = q.pop()!

    if (node.left === null && node.right === null && sum === 0) {
      return true
    }

    if (node.left !== null) {
      q.push([node.left, sum - node.left.val])
    }
    if (node.right !== null) {
      q.push([node.right, sum - node.right.val])
    }
  }

  return false
}

type SolutionFn = (root: TreeNode | null, targetSum: number) => boolean

/**
 * Test runner for LeetCode 112
 */
function runTests(solution: SolutionFn): void {
  const testCases = [
    {
      name: 'Standard tree with target sum',
      root: new TreeNode(5,
        new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
        new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
      ),
      target: 22,
      expected: true
    },
    {
      name: 'Single node matching target',
      root: new TreeNode(1),
      target: 1,
      expected: true
    },
    {
      name: 'Single node not matching target',
      root: new TreeNode(1),
      target: 2,
      expected: false
    },
    {
      name: 'Empty tree',
      root: null,
      target: 0,
      expected: false
    },
    {
      name: 'Path exists but sum doesn\'t match',
      root: new TreeNode(1, new TreeNode(2)),
      target: 1,
      expected: false
    }
  ]

  console.log('--- Running Tests for LeetCode 112 ---')

  testCases.forEach((tc, index) => {
    const result = solution(tc.root, tc.target)
    const passed = result === tc.expected

    console.log(`${passed ? '✅' : '❌'} Test ${index + 1}: ${tc.name}`)
    if (!passed) {
      console.log(`   Expected: ${tc.expected}, Got: ${result}`)
    }
  })
}

runTests(hasPathSum2)
