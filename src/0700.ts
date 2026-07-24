// 700. Search in a Binary Search Tree

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
 * T: O(h); S: O(h);
 */
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) return null

  if (val === root.val) {
    return root
  } else if (val < root.val) {
    return searchBST(root.left, val)
  } else {
    return searchBST(root.right, val)
  }
};

/**
 * Iteration
 * T: O(h); S: O(1);
 */
function searchBST2(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) return null

  let curr: TreeNode | null = root
  while (curr !== null && curr.val !== val) {
    curr = curr.val > val ? curr.left : curr.right
  }

  return curr
};

/**
 * Test Runner
 * @param solutionFn - The function to test (searchBST)
 */
function runTests(solutionFn: (root: TreeNode | null, val: number) => TreeNode | null) {
  const testCases = [
    {
      name: 'Standard Search',
      tree: [4, 2, 7, 1, 3],
      target: 2,
      expected: [2, 1, 3]
    },
    {
      name: 'Target Not Found',
      tree: [4, 2, 7, 1, 3],
      target: 5,
      expected: null
    },
    {
      name: 'Search Root',
      tree: [4, 2, 7],
      target: 4,
      expected: [4, 2, 7]
    }
  ]

  /**
   * Helper to construct tree from array (level order)
   */
  function buildTree(arr: (number | null)[]): TreeNode | null {
    if (!arr.length) return null
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
   * Helper to compare result tree with expected structure
   */
  function checkResult(node: TreeNode | null, expected: number[] | null): boolean {
    if (!node && !expected) return true
    if (!node || !expected) return false

    // In-order traversal to verify tree structure/values
    const traverse = (n: TreeNode | null, res: number[]) => {
      if (!n) return
      traverse(n.left, res)
      res.push(n.val)
      traverse(n.right, res)
    }

    const resultArr: number[] = []
    traverse(node, resultArr)

    return JSON.stringify(resultArr.sort()) === JSON.stringify([...expected].sort())
  }

  console.log('--- Starting Tests ---')

  testCases.forEach(({ name, tree, target, expected }) => {
    const root = buildTree(tree)
    const result = solutionFn(root, target)

    // Simple equality check logic
    const passed = checkResult(result, expected)

    console.log(`Test: ${name}`)
    console.log(`Result: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) console.log(`  Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`)
  })
}

runTests(searchBST2)
