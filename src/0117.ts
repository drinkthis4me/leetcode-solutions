// 117. Populating Next Right Pointers in Each _Node II

import { Queue } from '@datastructures-js/queue'

/**
 * Definition for _Node.
 */
class _Node {
  val: number
  left: _Node | null
  right: _Node | null
  next: _Node | null
  constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
    this.next = (next === undefined ? null : next)
  }
}

/**
 * BFS /w Queue
 * T: O(n); S: O(n);
 */
function connect(root: _Node | null): _Node | null {
  if (root === null) return null

  const q = new Queue<_Node>([root])

  while (!q.isEmpty()) {
    const size = q.size()
    for (let i = 0; i < size; i++) {
      const node = q.pop()!

      if (i < size - 1) {
        node.next = q.front()
      }

      if (node.left !== null) {
        q.push(node.left)
      }
      if (node.right !== null) {
        q.push(node.right)
      }
    }
  }

  return root
};

/**
 * BFS (Optimized)
 * T: O(n); S: O(1);
 */
function connect2(root: _Node | null): _Node | null {
  /**
   *                    1
   *                  /   \
   *          D --> 2  --> 3
   *              /   \      \
   *     D -->  4  -->  5  --> 7
   *
   *  In each level, create a dummy node that connect all nodes from left to right.
   *
   *  When moving to the next level, simply move current root to dummy.next,
   *  as it will be the leftmost node of the next level.
   */

  if (root === null) return null

  let curr: _Node | null = root

  while (curr !== null) {
    // Connect this level
    const dummy = new _Node()
    let currChild: _Node | null = dummy
    while (curr !== null) {
      // Connect left child
      if (curr.left !== null) {
        currChild.next = curr.left
        currChild = currChild.next
      }

      // Connect right child
      if (curr.right !== null) {
        currChild.next = curr.right
        currChild = currChild.next
      }

      // Move right to help extending dummy
      curr = curr.next
    }

    // Move on to the next level
    curr = dummy.next
  }

  return root
}

/**
 * The Tester Function
 */
function runTests(solution: (root: _Node | null) => _Node | null) {
  const testCases = [
    {
      name: 'Example 1',
      input: new _Node(1, new _Node(2, new _Node(4), new _Node(5)), new _Node(3, undefined, new _Node(7))),
      expected: [1, '#', 2, 3, '#', 4, 5, 7, '#']
    },
    {
      name: 'Empty Tree',
      input: null,
      expected: []
    },
    {
      name: 'Single _Node',
      input: new _Node(1),
      expected: [1, '#']
    }
  ]

  /**
 * Helper to serialize the tree with next pointers for verification.
 * Format: [1, #, 2, 3, #, 4, 5, 7, #]
 */
  function serializeNext(root: _Node | null): (number | string)[] {
    if (!root) return []
    const result: (number | string)[] = []
    let currLevel: _Node | null = root

    while (currLevel) {
      const dummy = new _Node(0)
      let tail = dummy
      let head = currLevel

      while (head) {
        result.push(head.val)
        if (head.left) {
          tail.next = head.left
          tail = tail.next
        }
        if (head.right) {
          tail.next = head.right
          tail = tail.next
        }
        head = head.next!
      }
      result.push('#')
      currLevel = dummy.next
    }
    return result
  }

  testCases.forEach(({ name, input, expected }) => {
    const resultRoot = solution(input)
    const actual = serializeNext(resultRoot)

    const passed = JSON.stringify(actual) === JSON.stringify(expected)

    console.log(`--- Test: ${name} ---`)
    console.log(`Status: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`Expected: ${JSON.stringify(expected)}`)
      console.log(`Actual:   ${JSON.stringify(actual)}`)
    }
  })
}

runTests(connect2)
