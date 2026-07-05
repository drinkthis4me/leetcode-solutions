// 105. Construct Binary Tree from Preorder and Inorder Traversal

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
 * DFS Brute Force
 * T: O(n ^ 2); S: O(n);
 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0 || inorder.length === 0) return null

  // preorder: [1, 2, 3, 4]
  // inorder: [2, 1, 3, 4]


  // First node in pre-order is always the root
  // [root, (left subtree), (right subtree)]
  const root = new TreeNode(preorder[0])
  // Index of root in inorder is the partition point
  // [(left subtree), root, (right subtree)]
  const mid = inorder.indexOf(preorder[0]!)

  root.left = buildTree(
    preorder.slice(1, mid + 1),
    inorder.slice(0, mid),
  )
  root.right = buildTree(
    preorder.slice(mid + 1),
    inorder.slice(mid + 1),
  )

  return root
};

/**
 * DFS + Hash Map
 * T: O(n); S: O(n);
 */
function buildTree2(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0 || inorder.length === 0) return null

  // Current root index in preorder
  let currentRootIdx = 0
  // Inorder map of value-index pairs
  const map = new Map<number, number>()
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i]!, i)
  }

  // DFS for inorder in range [l, r]
  const dfs = (l: number, r: number): TreeNode | null => {
    // Base case
    if (l > r) return null

    // Find the current root and partition point
    const rootVal = preorder[currentRootIdx++]!
    const root = new TreeNode(rootVal)
    const mid = map.get(rootVal)!

    // Recursively construct left/right subtrees
    root.left = dfs(l, mid - 1)
    root.right = dfs(mid + 1, r)

    return root
  }

  return dfs(0, inorder.length - 1)
};

/**
 * DFS w/ Pointers
 * T: O(n); S: O(n);
 */
function buildTree3(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0 || inorder.length === 0) return null

  // Instead using a map, use pointers and boundaries
  // to check where to cut and when to stop.

  // Index for current root
  let preIdx = 0
  // Index of the current left subtree
  let inIdx = 0

  // DFS through `inorder` with boundary value as `limit`
  const dfs = (limit: number): TreeNode | null => {
    if (preIdx >= preorder.length) {
      // No more nodes
      return null
    }
    if (inorder[inIdx] === limit) {
      // Current subtree complete
      // Increment index to skip the current root
      inIdx++
      return null
    }

    const root = new TreeNode(preorder[preIdx++])
    // For the left subtree, boundary is at current root.
    root.left = dfs(root.val)
    // For the right subtree, no boundary (or inroder.length + 1)
    root.right = dfs(limit)

    return root
  }

  return dfs(Infinity)
};

// --- Helper: Convert Tree to Array (Level Order) for verification ---
function treeToArray(root: TreeNode | null): (number | null)[] {
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
  // Trim trailing nulls
  while (result[result.length - 1] === null) result.pop()
  return result
}

// --- Test Runner --- 
function runTest() {
  const testCases = [
    {
      preorder: [1, 2, 3, 4],
      inorder: [2, 1, 3, 4],
      expected: [1, 2, 3, null, null, null, 4]
    },
    {
      preorder: [3, 9, 20, 15, 7],
      inorder: [9, 3, 15, 20, 7],
      expected: [3, 9, 20, null, null, 15, 7]
    },
    {
      preorder: [-1],
      inorder: [-1],
      expected: [-1],
    },
  ]

  testCases.forEach(({ preorder, inorder, expected }, index) => {
    const root = buildTree3(preorder, inorder)
    const result = treeToArray(root)
    const passed = JSON.stringify(result) === JSON.stringify(expected)

    if (passed) {
      console.log('✅ Test case 1 passed')
    } else {
      console.log(`❌ Test Case ${index + 1} failed`)
      console.log(`Pre=[${preorder}], In=[${inorder}]`)
      console.log(`Result:   ${JSON.stringify(result)}`)
      console.log(`Expected: ${JSON.stringify(expected)}`)
    }

    console.log('---')

  })
}

// --- Test Cases ---
runTest()
