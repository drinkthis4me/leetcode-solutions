// 108. Convert Sorted Array to Binary Search Tree

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
 * Recursion
 * T:O (n); S: O(log n)
 */
function sortedArrayToBST(nums: number[]): TreeNode | null {
  // Recursively find number at half length as tree root
  // Calculate middle index based on current boundary [l,r]
  // [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  //               [0,14]->7
  //    [0,(7-1)]->3           [(7+1),14]->12
  // ...

  const n = nums.length

  // Edge case
  if (n === 0) return null

  const buildTree = (l: number, r: number): TreeNode | null => {
    if (l > r) return null

    const m = Math.floor((l + r) / 2)

    const root = new TreeNode(nums[m])
    root.left = buildTree(l, m - 1)
    root.right = buildTree(m + 1, r)

    return root
  }

  return buildTree(0, n - 1)
};

/**
 * Tester function
 * @param solutionFn The function to test: (nums: number[]) => TreeNode | null
 */
function runTests(solutionFn: (nums: number[]) => TreeNode | null) {
  const testCases = [
    { nums: [-10, -3, 0, 5, 9] },
    { nums: [1, 3] },
    { nums: [] },
    { nums: [0, 1, 2, 3, 4, 5, 6] }
  ]

  /**
 * Validation helper functions
 */
  function isBST(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true
    if (node.val <= min || node.val >= max) return false
    return isBST(node.left, min, node.val) && isBST(node.right, node.val, max)
  }

  function getBalanceAndHeight(node: TreeNode | null): { balanced: boolean, height: number } {
    if (!node) return { balanced: true, height: 0 }

    const left = getBalanceAndHeight(node.left)
    const right = getBalanceAndHeight(node.right)

    const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1
    return { balanced, height: Math.max(left.height, right.height) + 1 }
  }

  testCases.forEach((t, index) => {
    const root = solutionFn(t.nums)

    // 1. Verify BST property
    const bstCheck = isBST(root, -Infinity, Infinity)

    // 2. Verify Height-Balance property
    const balanceCheck = getBalanceAndHeight(root)

    const passed = bstCheck && balanceCheck.balanced

    console.log(`Test Case ${index + 1}: ${JSON.stringify(t.nums)}`)
    console.log(`  Result: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`  BST Valid: ${bstCheck}`)
      console.log(`  Balanced: ${balanceCheck.balanced}`)
    }
    console.log('--------------------------')
  })
}

runTests(sortedArrayToBST)
