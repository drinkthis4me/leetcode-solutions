// 106. Construct Binary Tree from Inorder and Postorder Traversal

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

// inorder = [9,3,15,20,7]
// postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]

/**
 * Brute Force
 * T: O(n ^ 2); S: O(n);
 */
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  if (inorder.length === 0 || postorder.length === 0) return null

  // Last number in posorder is the root
  // Last to second is the root of right subtree. And so
  const root = new TreeNode(postorder.pop())
  // Index of root in inorder is the partition point
  // [(9), 3, (15, 20, 7)]
  const mid = inorder.indexOf(root.val)

  // Build right subtree first to insure right node is correctly popped from postorder
  root.right = buildTree(
    inorder.slice(mid + 1),
    postorder
  )
  root.left = buildTree(
    inorder.slice(0, mid),
    postorder
  )

  return root
};

/**
 * DFS & Hash Map
 * T: O(n); S: O(n);
 */
function buildTree2(inorder: number[], postorder: number[]): TreeNode | null {
  // Use pointer to avoid slicing array

  if (inorder.length === 0 || postorder.length === 0) return null

  // Pre-compute the inorder index in a hash map
  const inorderMap = new Map<number, number>()
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i)
  }

  // Postorder pointer to the root node
  let postIdx = postorder.length - 1

  // Helper fn for inorder with left and right boundary
  const dfs = (l: number, r: number): TreeNode | null => {
    // Base case
    if (l > r) return null

    const root = new TreeNode(postorder[postIdx--])
    const rootIdx = inorderMap.get(root.val)!

    root.right = dfs(rootIdx + 1, r)
    root.left = dfs(l, rootIdx - 1)

    return root
  }

  return dfs(0, inorder.length - 1)
};

/**
 * The Test Runner
 */
function runTests(solution: (inorder: number[], postorder: number[]) => TreeNode | null) {
  const testCases = [
    {
      inorder: [9, 3, 15, 20, 7],
      postorder: [9, 15, 7, 20, 3],
      expected: [3, 9, 20, null, null, 15, 7]
    },
    {
      inorder: [-1],
      postorder: [-1],
      expected: [-1]
    },
    {
      inorder: [1, 2],
      postorder: [2, 1],
      expected: [1, null, 2]
    }
  ]

  /**
 * Helper: Serializes tree to an array (level-order) for easy comparison.
 */
  function serialize(root: TreeNode | null): (number | null)[] {
    if (!root) return []
    const result: (number | null)[] = []
    const queue: (TreeNode | null)[] = [root]
    while (queue.length > 0) {
      const node = queue.shift()
      if (node) {
        result.push(node.val)
        queue.push(node.left)
        queue.push(node.right)
      } else {
        result.push(null)
      }
    }
    // Remove trailing nulls
    while (result[result.length - 1] === null) result.pop()
    return result
  }

  console.log('Starting tests...')

  testCases.forEach((tc, index) => {
    const result = solution(tc.inorder, tc.postorder)
    const serializedResult = serialize(result)

    const passed = JSON.stringify(serializedResult) === JSON.stringify(tc.expected)

    console.log(`Test Case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`   Expected: ${JSON.stringify(tc.expected)}`)
      console.log(`   Got:      ${JSON.stringify(serializedResult)}`)
    }
  })
}

runTests(buildTree2)
