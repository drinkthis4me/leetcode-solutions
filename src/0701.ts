// 701. Insert into a Binary Search Tree

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
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) {
    return new TreeNode(val)
  }

  if (root.val > val) {
    root.left = insertIntoBST(root.left, val)
  } else {
    root.right = insertIntoBST(root.right, val)
  }

  return root
}

/**
 * Iteration
 * T: O(h); S: O(1);
 */
function insertIntoBST2(root: TreeNode | null, val: number): TreeNode | null {
  const newNode = new TreeNode(val)

  if (root === null) {
    return newNode
  }

  let curr: TreeNode | null = root

  while (curr !== null) {
    if (curr.val > val) {
      if (curr.left === null) {
        curr.left = newNode
        break
      }
      curr = curr.left
    } else {
      if (curr.right === null) {
        curr.right = newNode
        break
      }
      curr = curr.right
    }
  }

  return root
}

/**
 * Tester Function
 * @param solutionFn The function to test
 */
function runTests(solutionFn: (root: TreeNode | null, val: number) => TreeNode | null) {
  const testCases = [
    { root: [4, 2, 7, 1, 3], val: 5, expected: [4, 2, 7, 1, 3, 5] },
    { root: [40, 20, 60, 10, 30, 50, 70], val: 25, expected: [40, 20, 60, 10, 30, 50, 70, null, null, 25] },
    { root: [4, 2, 7, 1, 3, null, null, null, null, null, null], val: 5, expected: [4, 2, 7, 1, 3, 5] },
    { root: [], val: 5, expected: [5] }
  ]

  // Helper to convert array to Tree (Level Order)
  function buildTree(arr: (number | null)[]): TreeNode | null {
    if (arr.length === 0) return null
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

  // Helper to serialize tree to array for verification
  function treeToArray(root: TreeNode | null): (number | null)[] {
    if (!root) return []
    const res: (number | null)[] = []
    const queue: (TreeNode | null)[] = [root]
    while (queue.length > 0) {
      const node = queue.shift()
      if (node) {
        res.push(node.val)
        queue.push(node.left)
        queue.push(node.right)
      } else {
        res.push(null)
      }
    }
    while (res[res.length - 1] === null) res.pop()
    return res
  }

  console.log(`Running tests for: ${solutionFn.name || 'Anonymous Solution'}`)

  testCases.forEach((tc, index) => {
    const root = buildTree(tc.root)
    const result = solutionFn(root, tc.val)
    const resultArr = treeToArray(result)

    // Simple comparison check
    const passed = JSON.stringify(resultArr) === JSON.stringify(tc.expected)

    console.log(`Test ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`   Expected: ${JSON.stringify(tc.expected)}`)
      console.log(`   Got:      ${JSON.stringify(resultArr)}`)
    }
  })
  console.log('---')
}

runTests(insertIntoBST2)
