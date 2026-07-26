// 590. N-ary Tree Postorder Traversal

/**
 * Definition for _Node.
 *
 */
class _Node {
  val: number
  children: _Node[]

  constructor(val?: number, children?: _Node[]) {
    this.val = (val === undefined ? 0 : val)
    this.children = (children === undefined ? [] : children)
  }
}

/**
 * DFS w/ Recursion
 * T: O(n); S: O(h);
 */
function postorder(root: _Node | null): number[] {
  if (root === null) return []

  const res: number[] = []

  const dfs = (node: _Node | null) => {
    if (node === null) return

    for (const child of node.children) {
      dfs(child)
    }

    res.push(node.val)
  }

  dfs(root)

  return res
};

/**
 * Stack
 * T: O(n); S: O(h);
 */
function postorder2(root: _Node | null): number[] {
  if (root === null) return []

  const res: number[] = []
  const stack: _Node[] = [root]

  // Iterate in reverse: root-left-right
  while (stack.length > 0) {
    const parent = stack.pop()!
    res.push(parent.val)

    for (const child of parent.children) {
      stack.push(child)
    }
  }

  // Reverse to become right-left-root
  return res.reverse()
};

/**
 * Stack (without reverse)
 * T: O(n); S: O(h);
 */
function postorder3(root: _Node | null): number[] {
  if (root === null) return []

  const res: number[] = []
  // Stack of {node, visited}
  const stack: { node: _Node, visited: boolean }[] = [{ node: root, visited: false }]

  while (stack.length > 0) {
    // Peek only
    const curr = stack[stack.length - 1]

    if (curr.visited) {
      // Children have been processed. Can process curr now.
      stack.pop()
      res.push(curr.node.val)
    } else {
      // Mark visited and push all children
      curr.visited = true
      for (let i = curr.node.children.length - 1; i >= 0; i--) {
        stack.push({
          node: curr.node.children[i],
          visited: false
        })
      }
    }
  }

  return res
};

/**
 * Runs a set of test cases against the provided LeetCode 590 solution function.
 * @param solve - The N-ary Tree Postorder Traversal function to test.
 */
function runTests(solutionFn: (root: _Node | null) => number[]): void {
// Helper function to deserialize LeetCode's level-order array notation into an N-ary Tree root
  function createNaryTree(arr: (number | null)[]): _Node | null {
    if (!arr || arr.length === 0 || arr[0] === null) return null

    const root = new _Node(arr[0] as number)
    const queue: _Node[] = [root]
    let i = 2 // Index in array, start after root and its null separator

    while (queue.length > 0 && i < arr.length) {
      const parent = queue.shift()!

      while (i < arr.length && arr[i] !== null) {
        const childVal = arr[i] as number
        const childNode = new _Node(childVal)
        parent.children.push(childNode)
        queue.push(childNode)
        i++
      }
      i++ // Skip the null separator
    }

    return root
  }

  // Helper to compare two arrays for equality
  function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }
  const testCases: { input: (number | null)[], expected: number[] }[] = [
    {
      input: [1, null, 3, 2, 4, null, 5, 6],
      expected: [5, 6, 3, 2, 4, 1]
    },
    {
      input: [1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14],
      expected: [2, 6, 14, 11, 7, 3, 12, 8, 4, 13, 9, 10, 5, 1]
    },
    {
      input: [],
      expected: []
    },
    {
      input: [10, null],
      expected: [10]
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    const root = createNaryTree(test.input)
    const result = solutionFn(root)
    const isPassed = arraysEqual(result, test.expected)

    if (isPassed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log('  Input (Serialized):', test.input)
      console.log('  Expected:', test.expected)
      console.log('  Received:', result)
    }
  })

  console.log(`\nSummary: ${passedCount} / ${testCases.length} test cases passed.`)
}

runTests(postorder3)
