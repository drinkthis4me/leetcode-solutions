// 450. Delete Node in a BST

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
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  // Recursively find the target node
  if (root === null) {
    return null
  }
  if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  } else {
    // Base case: root.val === key
    // Case 1: No/One child
    if (root.left === null) {
      return root.right
    } else if (root.right === null) {
      return root.left
    }

    // Case 2: two children
    // Find the in-order successor (left-most child in right subtree)
    let succ: TreeNode = root.right
    while (succ.left !== null) {
      succ = succ.left
    }
    // Delete node
    root.val = succ.val
    root.right = deleteNode(root.right, succ.val)
  }

  return root
}

/**
 * Iteration
 * T: O(h); S: O(1);
 */
function deleteNode2(root: TreeNode | null, key: number): TreeNode | null {
  // Maintain target and parent pointer manually

  if (root === null) return null

  // Find the target node
  let parent: TreeNode | null = null
  let curr: TreeNode | null = root
  while (curr !== null && curr.val !== key) {
    parent = curr
    if (curr.val > key) {
      curr = curr.left
    } else {
      curr = curr.right
    }
  }

  // Edge case: target not found
  if (curr === null) return root

  if (curr.left === null || curr.right === null) {
    // One/No child
    const child = curr.left || curr.right

    if (parent === null) return child

    if (parent.left === curr) {
      parent.left = child
    } else {
      parent.right = child
    }
  } else {
    // Two children
    // Find the in-order successor
    let succParent: TreeNode | null = curr
    let succ: TreeNode | null = curr.right
    while (succ.left !== null) {
      succParent = succ
      succ = succ.left
    }

    // Delete node
    curr.val = succ.val
    if (succParent.left === succ) {
      succParent.left = succ.right
    } else {
      succParent.right = succ.left
    }
  }

  return root
};

type SolutionFn = (root: TreeNode | null, key: number) => TreeNode | null

/**
 * Tester for LeetCode 450: Delete Node in a BST
 * * Target function signature:
 * (root: TreeNode | null, key: number) => TreeNode | null
 */
function runTests(solution: SolutionFn) {
// --- Utils ---
  /** Converts array representation to BST root (Level order) */
  function arrayToBST(arr: (number | null)[]): TreeNode | null {
    if (arr.length === 0 || arr[0] === null) return null
    const root = new TreeNode(arr[0])
    const queue: TreeNode[] = [root]
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

  /** Converts BST to array representation (Level order) */
  function bstToArray(root: TreeNode | null): (number | null)[] {
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
    while (result[result.length - 1] === null) result.pop()
    return result
  }

  /** Simple array comparison */
  function isEqual(a: any[], b: any[]): boolean {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  // --- Tester Engine ---

  interface TestCase {
    inputRoot: (number | null)[]
    key: number
    expected: (number | null)[]
  }

  const testCases: TestCase[] = [
    { inputRoot: [5, 3, 6, 2, 4, null, 7], key: 3, expected: [5, 4, 6, 2, null, null, 7] },
    { inputRoot: [5, 3, 6, 2, 4, null, 7], key: 0, expected: [5, 3, 6, 2, 4, null, 7] },
    { inputRoot: [], key: 0, expected: [] },
    { inputRoot: [1], key: 1, expected: [] }
  ]

  console.log(`--- Testing Solution: ${solution.name} ---`)
  let passed = 0

  testCases.forEach((tc, index) => {
    const root = arrayToBST(tc.inputRoot)
    const result = solution(root, tc.key)
    const outputArr = bstToArray(result)

    const success = isEqual(outputArr, tc.expected)
    if (success) passed++

    console.log(`Test Case ${index + 1}: ${success ? 'PASSED' : 'FAILED'}`)
    if (!success) {
      console.log(`  Expected: ${JSON.stringify(tc.expected)}`)
      console.log(`  Got:      ${JSON.stringify(outputArr)}`)
    }
  })

  console.log(`Summary: ${passed}/${testCases.length} passed.\n`)
}

runTests(deleteNode2)
