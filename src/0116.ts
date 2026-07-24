// 116. Populating Next Right Pointers in Each _Node

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

// [1,2,3]
// [1,#,2,3,#]

/**
 * BFS w/ Queue
 * T: O(n); S: O(n);
 */
function connect(root: _Node | null): _Node | null {
  if (root === null) return root

  const q = new Queue<_Node>([root])

  while (!q.isEmpty()) {
    const size = q.size()

    for (let i = 0; i < size; i++) {
      const node = q.pop()!

      // Assign this level's next
      if (i < size - 1) {
        node.next = q.front()
      }

      // Enqueue children
      if (node.left !== null && node.right !== null) {
        q.push(node.left)
        q.push(node.right)
      }
    }
  }

  return root
};

/**
 * DFS w/ Recursion
 * T: O(n); S: O(log n)
 */
function connect2(root: _Node | null): _Node | null {
  /**
   *              1
   *            /    \
   *          2        3
   *         / \      /  \
   *       4    5    6    7
   *
   * 4.next = 2.right (2 -> 5)
   *
   * 5.next = 2.next.left (2 -> 3 -> 6)
   */

  if (root === null) return root

  const L = root.left
  const R = root.right
  const N = root.next

  if (L !== null && R !== null) {
    // Assign left's next
    // root -> left -> next == root -> right
    L.next = R

    // Assign right's next
    // root -> right -> next == root -> next -> left
    if (N !== null) {
      R.next = N.left
    }

    connect2(L)
    connect2(R)
  }

  return root
};

/**
 * BFS (Optimized)
 * T: O(n); S: O(1);
 */
function connect3(root: _Node | null): _Node | null {
  if (root === null) return root

  let curr: _Node | null = root

  while (curr.left !== null) {
    // Treat current level as a linked list
    // Walk from start to end. Connect children's next along the way.
    let head: _Node | null = curr
    while (head !== null) {
      // Assign left's next
      head.left!.next = head.right

      // Assign right's next
      if (head.next !== null) {
        head.right!.next = head.next.left
      }

      // Move to the neighboring node in the same level
      head = head.next
    }

    // Move to the next level
    curr = curr.left
  }

  return root
}

/**
 * Tester function for LeetCode 116
 */
function runTests(connect: (root: _Node | null) => _Node | null) {
  const testCases = [
    {
      name: 'Full Binary Tree (3 levels)',
      root: new _Node(1,
        new _Node(2, new _Node(4), new _Node(5)),
        new _Node(3, new _Node(6), new _Node(7))
      )
    },
    {
      name: 'Empty Tree',
      root: null
    }
  ]

  function verifyConnections(root: _Node | null): boolean {
    if (!root) return true

    let levelHead: _Node | null = root
    while (levelHead) {
      let curr: _Node | null = levelHead
      while (curr) {
        // Verify next pointer logic:
        // If curr has a right child, it should point to curr.next.left
        if (curr.left && curr.right) {
          if (curr.left.next !== curr.right) return false
        }
        if (curr.right && curr.next) {
          if (curr.right.next !== curr.next.left) return false
        }
        curr = curr.next
      }
      levelHead = levelHead.left
    }
    return true
  }

  testCases.forEach(({ name, root }) => {
    console.log(`Running: ${name}`)

    // Execute the solution
    const result = connect(root)

    // Verification: Check level-by-level using the 'next' pointers
    const passed = verifyConnections(result)

    console.log(`Result: ${passed ? 'PASSED' : 'FAILED'}`)
    console.log('---')
  })
}

runTests(connect3)
