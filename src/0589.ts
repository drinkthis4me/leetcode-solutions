// 589. N-ary Tree Preorder Traversal

/**
 * Definition for _Node.
 */
class _Node {
  val: number
  children: _Node[]

  constructor(val?: number, children?: _Node[]) {
    this.val = (val === undefined ? 0 : val)
    this.children = (children === undefined ? [] : children)
  }
}

// Input: root = [1,null,3,2,4,null,5,6]
// Output: [1,3,5,6,2,4]

/**
 * DFS w/ Recursion
 * T: O(n); S: O(height)
 */
function preorder(root: _Node | null): number[] {
  if (root === null) return []

  const res: number[] = []

  const dfs = (node: _Node | null) => {
    if (node === null) return

    res.push(node.val)
    for (const child of node.children) {
      dfs(child)
    }
  }

  dfs(root)

  return res
}

/**
 * Stack
 * T: O(n); S: O(n)
 */
function preorder2(root: _Node | null): number[] {
  if (root === null) return []

  const res: number[] = []
  const stack: _Node[] = [root]

  while (stack.length > 0) {
    const parent = stack.pop()!
    res.push(parent.val)

    // Pushing children right to left
    // so that it can pop from the stack with correct left to right order
    for (let i = parent.children.length - 1; i >= 0; i--) {
      stack.push(parent.children[i])
    }
  }

  return res
}

// Type definition for the solution function
type SolutionFunction = (root: _Node | null) => number[]

/**
 * Runs a set of test cases against the provided LeetCode 589 solution function.
 * @param solve - The N-ary Tree Preorder Traversal function to test.
 */
function runTests(solve: SolutionFunction): void {
  // Helper function to build a tree from LeetCode's level-order array representation with null separators
  function buildTree(arr: (number | null)[]): _Node | null {
    if (!arr || arr.length === 0 || arr[0] === null) return null

    const root = new _Node(arr[0] as number)
    const queue: _Node[] = [root]
    let i = 2 // Skip root (index 0) and the first null separator (index 1)

    while (i < arr.length && queue.length > 0) {
      const parent = queue.shift()!

      while (i < arr.length) {
        const val = arr[i++]
        if (val === null) {
          break // End of children group for current parent
        }
        const child = new _Node(val)
        parent.children.push(child)
        queue.push(child)
      }
    }

    return root
  }
  // Define test cases: [input array representation, expected output array]
  const testCases: { input: (number | null)[], expected: number[] }[] = [
    {
      input: [1, null, 3, 2, 4, null, 5, 6],
      expected: [1, 3, 5, 6, 2, 4]
    },
    {
      input: [1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14],
      expected: [1, 2, 3, 6, 7, 11, 14, 4, 8, 12, 5, 9, 13, 10]
    },
    {
      input: [],
      expected: []
    },
    {
      input: [42],
      expected: [42]
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 589 Tests ===')

  testCases.forEach((test, index) => {
    const root = buildTree(test.input)
    const result = solve(root)

    const passed = JSON.stringify(result) === JSON.stringify(test.expected)

    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${index + 1}`)
    } else {
      console.log(`[FAIL] Test Case ${index + 1}`)
      console.log(`  Input:    ${JSON.stringify(test.input)}`)
      console.log(`  Expected: ${JSON.stringify(test.expected)}`)
      console.log(`  Received: ${JSON.stringify(result)}`)
    }
  })

  console.log('==================================')
  console.log(`Result: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(preorder2)
