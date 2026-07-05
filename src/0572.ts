// 572. Subtree of Another Tree

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
 * DFS /w Recursion
 * T: O(m * n); S: O(height of main tree);
 */
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Edge case
  if (root === null) return false
  if (subRoot === null) return true

  const sameTree = (p: TreeNode | null, q: TreeNode | null): boolean => {
    if (p === null && q === null) return true

    if (p === null || q === null || p.val !== q.val) return false

    return sameTree(p.left, q.left) && sameTree(p.right, q.right)
  }

  // Check "current node" vs subRoot
  if (sameTree(root, subRoot)) return true

  // Recursively check "current node's children" vs "subRoot"
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
};

/**
 * Serialization
 * T: O(n + m); S: O(n + m);
 */
function isSubtree2(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Edge case
  if (root === null) return false
  if (subRoot === null) return true

  // Serialize trees to strings using pre-order traversal. Then do pattern search.
  const serialize = (node: TreeNode | null): string => {
    // '$' as separator; '#' as null
    // ex: [1, 2, null] -> '$1$2$#$#$#'
    if (node === null) return '$#'

    return `$${node.val}` + serialize(node.left) + serialize(node.right)
  }

  const serializedRoot = serialize(root)
  const serializedSubRoot = serialize(subRoot)

  // Run pattern matching algorithm
  // See Leetcode 0028
  // Here we use build-in `String.prototype.includes()`

  return serializedRoot.includes(serializedSubRoot)
};

/**
 * Test Runner
 */
function runTests() {
  const tests = [
    {
      name: 'Standard Case: Subtree exists',
      root: new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2)), new TreeNode(5)),
      sub: new TreeNode(4, new TreeNode(1), new TreeNode(2)),
      expected: true
    },
    {
      name: 'False Case: Same values but different structure',
      root: new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2, new TreeNode(0))), new TreeNode(5)),
      sub: new TreeNode(4, new TreeNode(1), new TreeNode(2)),
      expected: false
    },
    {
      name: 'Edge Case: Empty Subtree',
      root: new TreeNode(1),
      sub: null,
      expected: true
    },
    {
      name: 'Edge Case: Root smaller than Subtree',
      root: new TreeNode(1),
      sub: new TreeNode(1, new TreeNode(2)),
      expected: false
    }
  ]

  tests.forEach(({ name, root, sub, expected }) => {
    const result = isSubtree2(root, sub)
    console.log(`[${result === expected ? 'PASS' : 'FAIL'}] ${name}`)
    if (result !== expected) {
      console.log(`   Expected ${expected}, got ${result}`)
    }
  })
}

runTests()