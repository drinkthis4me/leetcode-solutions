// 98. Validate Binary Search Tree

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
function isValidBST(root: TreeNode | null): boolean {

  // A per-level dynamic check is needed.
  // Start value boundary of root: [-Infinity, Infinity]
  // For a left node, update upper boundary:
  //    (-Infinity) < val < (root.val)
  // For a right node, update lower boundary:
  //    (root.val) < val < (Infinity)

  const check = (node: TreeNode | null, lower: number, upper: number): boolean => {
    // Edge case: empty BST
    // Base case: child is null
    if (node === null) return true

    // Base case: current node value is outside of the boundary
    if (!(lower < node.val && node.val < upper)) return false

    return (
      check(node.left, lower, node.val) &&
      check(node.right, node.val, upper)
    )
  }

  return check(root, -Infinity, Infinity)
};

// --- Test Runner ---
function runTests() {
  const tests = [
    {
      name: 'Example 1: Valid BST',
      root: new TreeNode(2, new TreeNode(1), new TreeNode(3)),
      expected: true
    },
    {
      name: 'Example 2: Invalid BST',
      root: new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6))),
      expected: false
    },
    {
      name: 'Empty Tree: Valid',
      root: null,
      expected: true
    },
    {
      name: 'Single Node: Valid',
      root: new TreeNode(1),
      expected: true
    },
    {
      name: 'Invalid BST with Duplicate Values',
      root: new TreeNode(1, new TreeNode(1)),
      expected: false
    }
  ]

  tests.forEach(({ name, root, expected }) => {
    const result = isValidBST(root)
    console.log(`${result === expected ? '✅' : '❌'} ${name}`)
    if (result !== expected) {
      console.log(`   Expected: ${expected}, Got: ${result}`)
    }
  })
}

runTests()