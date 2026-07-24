// 173. Binary Search Tree Iterator

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

interface IBSTIterator {
  next(): number
  hasNext(): boolean
}

/**
 * Stack
 */
class BSTIterator implements IBSTIterator {
  stack: TreeNode[] = []

  constructor(root: TreeNode | null) {
    // Got as left as possible
    this._pushAllLeft(root)
  }

  /**
   * T: O(1); S: O(h);
   */
  next(): number {
    const curr = this.stack.pop()!

    // store curr.right and its left children
    this._pushAllLeft(curr.right)

    return curr.val
  }

  /**
   * T: O(1); S: O(h);
   */
  hasNext(): boolean {
    return this.stack.length !== 0
  }

  /**
   * T: O(h); S: O(h);
   */
  _pushAllLeft(node: TreeNode | null) {
    while (node !== null) {
      this.stack.push(node)
      node = node.left
    }
  }
}

/**
 * Tester for LeetCode 173: Binary Search Tree Iterator
 * * @param BSTIteratorClass - The class to be tested.
 */
function testBSTIterator(BSTIteratorClass: new (root: TreeNode | null) => IBSTIterator) {
  interface TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
  }

  const createNode = (val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode => ({
    val, left, right
  })

  const testCases = [
    {
      name: 'Standard Case (Example 1)',
      // Tree:    7
      //         / \
      //        3   15
      //           /  \
      //          9    20
      root: createNode(7, createNode(3), createNode(15, createNode(9), createNode(20))),
      operations: ['next', 'next', 'hasNext', 'next', 'hasNext', 'next', 'hasNext', 'next', 'hasNext'],
      expected: [3, 7, true, 9, true, 15, true, 20, false]
    },
    {
      name: 'Single Node',
      root: createNode(1),
      operations: ['next', 'hasNext'],
      expected: [1, false]
    }
  ]

  testCases.forEach((tc, index) => {
    console.log(`--- Running Test Case ${index + 1}: ${tc.name} ---`)
    const iterator = new BSTIteratorClass(tc.root)
    let passed = true

    for (let i = 0; i < tc.operations.length; i++) {
      const op = tc.operations[i]
      const expected = tc.expected[i]
      let result: any

      if (op === 'next') {
        result = iterator.next()
      } else if (op === 'hasNext') {
        result = iterator.hasNext()
      }

      if (result !== expected) {
        console.error(`  [FAIL] Op ${i} (${op}): Expected ${expected}, got ${result}`)
        passed = false
      }
    }

    if (passed) {
      console.log('  [PASS] All operations correct.')
    }
  })
}

testBSTIterator(BSTIterator)
