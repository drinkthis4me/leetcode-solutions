// 145. Binary Tree Postorder Traversal

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
 * T: O(n); S: O(height)
 */
function postorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = []

  const postorder = (node: TreeNode | null): void => {
    if (node === null) return

    // left-right-root
    postorder(node.left)
    postorder(node.right)
    res.push(node.val)
  }

  postorder(root)

  return res
};

/**
 * Stack (Reversed)
 * T: O(n); S: O(n)
 */
function postorderTraversal2(root: TreeNode | null): number[] {
  const res: number[] = []

  if (root === null) return res

  const stack: TreeNode[] = []
  let curr: TreeNode | null = root

  // Traverse in reverse: root-right-left
  while (stack.length !== 0 || curr !== null) {
    if (curr !== null) {
      res.push(curr.val)
      stack.push(curr)
      // Move to the right child
      curr = curr.right
    } else {
      // Pop the node from stack
      curr = stack.pop()!
      // Move to the left child
      curr = curr.left
    }
  }

  // Return reversed result to get left-right-root
  return res.reverse()
};

/**
 * Stack
 * T: O(n); S: O(n)
 */
function postorderTraversal3(root: TreeNode | null): number[] {
  const res: number[] = []

  if (root === null) return res

  const stack: TreeNode[] = []
  let curr: TreeNode | null = root
  let lastVisited: TreeNode | null = null
  // We will visit root twice: 1. left child to root. 2. right child to root

  while (stack.length !== 0 || curr !== null) {
    // Traverse to the leftmost node
    if (curr !== null) {
      stack.push(curr)
      curr = curr.left
    } else {
      // Peak top
      curr = stack.at(-1)!

      // If not right child or right child was already visited
      // Add value and save as visited
      if (curr.right === null || curr.right === lastVisited) {
        res.push(curr.val)
        stack.pop()
        lastVisited = curr
        curr = null
      } else {
        // Move to the right child
        curr = curr.right
      }
    }
  }

  return res
};

// Helper function to build a tree from a LeetCode-style array (Level Order)
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null

  const root = new TreeNode(arr[0])
  const queue: TreeNode[] = [root]
  let i = 1

  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift()!

    // Process left child
    if (i < arr.length && arr[i] !== null) {
      current.left = new TreeNode(arr[i]!)
      queue.push(current.left)
    }
    i++

    // Process right child
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]!)
      queue.push(current.right)
    }
    i++
  }

  return root
}

// Helper function to run and log test cases
function runTests() {
  const testCases = [
    {
      name: 'LeetCode Example 1',
      input: [1, null, 2, 3],
      expected: [3, 2, 1]
    },
    {
      name: 'Empty Tree (Your original edge case)',
      input: [],
      expected: []
    },
    {
      name: 'Single Node Tree',
      input: [1],
      expected: [1]
    },
    {
      name: 'Perfect Binary Tree',
      input: [1, 2, 3],
      expected: [2, 3, 1]
    },
    {
      name: 'Perfect Binary Tree',
      input: [1, 2, null, 3],
      expected: [3, 2, 1]
    }
  ]

  console.log('--- Running Preorder Traversal Tests ---\n')

  testCases.forEach(({ name, input, expected }) => {
    const tree = buildTree(input)
    const result = postorderTraversal3(tree)

    const passed = JSON.stringify(result) === JSON.stringify(expected)

    console.log(`Test: ${name}`)
    console.log(`Input Array:  ${JSON.stringify(input)}`)
    console.log(`Expected:     ${JSON.stringify(expected)}`)
    console.log(`Got:          ${JSON.stringify(result)}`)
    console.log(passed ? '✅ PASSED' : '❌ FAILED')
    console.log('---------------------------------------')
  })
}

// Execute the tester
runTests()