// 705. Design HashSet

/**
 * Boolean Array
 */
class MyHashSet {
  BUCKET_SIZE = 10 ** 6 + 1
  buckets: Array<boolean>

  constructor() {
    this.buckets = new Array(this.BUCKET_SIZE).fill(false)
  }

  add(key: number): void {
    this.buckets[key] = true
  }

  remove(key: number): void {
    this.buckets[key] = false
  }

  contains(key: number): boolean {
    return this.buckets[key]
  }
}

/**
 * Linked List
 */
class ListNode {
  key: number
  next: ListNode | null
  constructor(key: number) {
    this.key = key
    this.next = null
  }
}
class MyHashSet2 {
  buckets: ListNode[]
  BUCKET_SIZE = 10 ** 4

  constructor() {
    // Each bucket with a dummy ListNode
    this.buckets = Array.from({ length: this.BUCKET_SIZE }, () => new ListNode(0))
  }

  add(key: number): void {
    let curr = this.buckets[this._hash(key)]
    while (curr.next) {
      if (curr.next.key === key) {
        return
      }
      curr = curr.next
    }
    curr.next = new ListNode(key)
  }

  remove(key: number): void {
    let curr = this.buckets[this._hash(key)]
    while (curr.next) {
      if (curr.next.key === key) {
        // Remove curr.next
        curr.next = curr.next.next
        return
      }
      curr = curr.next
    }
  }

  contains(key: number): boolean {
    let curr = this.buckets[this._hash(key)]
    while (curr.next) {
      if (curr.next.key === key) {
        return true
      }
      curr = curr.next
    }
    return false
  }

  _hash(key: number): number {
    return key % this.BUCKET_SIZE
  }
}

/**
 * Binary Search Tree Node
 */
class BSTNode {
  key: number
  left: BSTNode | null
  right: BSTNode | null
  constructor(key: number) {
    this.key = key
    this.left = null
    this.right = null
  }
}
class BST {
  root: BSTNode | null

  constructor() {
    this.root = null
  }

  add(key: number): void {
    this.root = this._insertNode(this.root, key)
  }

  _insertNode(node: BSTNode | null, key: number): BSTNode {
    if (node === null) return new BSTNode(key)

    if (key < node.key) {
      node.left = this._insertNode(node.left, key)
    } else if (key > node.key) {
      node.right = this._insertNode(node.right, key)
    }

    return node
  }

  remove(key: number): void {
    this.root = this._deleteNode(this.root, key)
  }

  _deleteNode(node: BSTNode | null, key: number): BSTNode | null {
    if (node === null) return null

    if (key < node.key) {
      node.left = this._deleteNode(node.left, key)
    } else if (key > node.key) {
      node.right = this._deleteNode(node.right, key)
    } else { // Found the target node
      // Case 1: no child
      // Case 2: one child
      if (node.left === null) {
        return node.right
      }
      if (node.right === null) {
        return node.left
      }

      // Case 3: both children (need to find the in-order successor)
      const successor = this._getSuccessor(node)
      node.key = successor.key
      node.right = this._deleteNode(node.right, successor.key)
    }

    return node
  }

  _getSuccessor(node: BSTNode): BSTNode {
    // Get the smallest node in the right subtree
    node = node.right!
    while (node.left) {
      node = node.left
    }
    return node
  }

  contains(key: number): boolean {
    return this._searchNode(this.root, key)
  }

  _searchNode(node: BSTNode | null, key: number): boolean {
    if (node === null) return false
    if (key === node.key) return true
    if (key < node.key) {
      return this._searchNode(node.left, key)
    } else {
      return this._searchNode(node.right, key)
    }
  }
}
class MyHashSet3 {
  BUCKET_SIZE = 10 ** 4
  buckets: Array<BST>

  constructor() {
    this.buckets = Array.from({ length: this.BUCKET_SIZE }, () => new BST())
  }

  add(key: number) {
    const idx = this._hash(key)
    if (!this.buckets[idx].contains(key)) {
      this.buckets[idx].add(key)
    }
  }

  remove(key: number) {
    const idx = this._hash(key)
    this.buckets[idx].remove(key)
  }

  contains(key: number) {
    const idx = this._hash(key)
    return this.buckets[idx].contains(key)
  }

  _hash(key: number): number {
    return key % this.BUCKET_SIZE
  }
}

/**
 * Bit Manipulation
 */
class MyHashSet4 {
  buckets: Int32Array

  constructor() {
    // 1,000,001 bits -> 1,000,001 / 32 = 31,251 integers
    this.buckets = new Int32Array(31251)
  }

  add(key: number) {
    const bucketIdx = this._getBucketIndex(key)
    const bitIdx = this._getBitIndex(key)
    this.buckets[bucketIdx] |= (1 << bitIdx)
  }

  remove(key: number) {
    const bucketIdx = this._getBucketIndex(key)
    const bitIdx = this._getBitIndex(key)
    this.buckets[bucketIdx] &= ~(1 << bitIdx)
  }

  contains(key: number): boolean {
    const bucketIdx = this._getBucketIndex(key)
    const bitIdx = this._getBitIndex(key)
    return (this.buckets[bucketIdx] & (1 << bitIdx)) !== 0
  }

  _getBucketIndex(key: number): number {
    // key / 32
    // example:
    // - 0 through 31 -> buckets[0]
    // - 32 through 63 -> buckets[1]
    return key >> 5
  }

  _getBitIndex(key: number) {
    // key % 32
    // example:
    // 35 % 32 = 3 -> 3rd bit inside buckets[1]
    return key & 31
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */

interface IMyHashSet {
  add(key: number): void
  remove(key: number): void
  contains(key: number): boolean
}

type HashSetConstructor = new () => IMyHashSet

interface TestCase {
  operations: string[]
  args: number[][]
  expected: (boolean | null)[]
}

function runTests(MyHashSet: HashSetConstructor): void {
  const testCases: TestCase[] = [
    {
      operations: ['MyHashSet', 'add', 'add', 'contains', 'contains', 'add', 'contains', 'remove', 'contains'],
      args: [[], [1], [2], [1], [3], [2], [2], [2], [2]],
      expected: [null, null, null, true, false, null, true, null, false]
    },
    {
      operations: ['MyHashSet', 'add', 'contains', 'remove', 'contains'],
      args: [[], [10], [10], [10], [10]],
      expected: [null, null, true, null, false]
    },
    {
      operations: ['MyHashSet', 'contains', 'remove', 'contains'],
      args: [[], [5], [5], [5]],
      expected: [null, false, null, false]
    }
  ]

  testCases.forEach((tc, index) => {
    let setInstance: IMyHashSet | null = null
    const results: (boolean | null)[] = []
    let passed = true

    for (let i = 0; i < tc.operations.length; i++) {
      const op = tc.operations[i]
      const arg = tc.args[i]

      if (op === 'MyHashSet') {
        setInstance = new MyHashSet()
        results.push(null)
      } else if (setInstance) {
        if (op === 'add') {
          setInstance.add(arg[0])
          results.push(null)
        } else if (op === 'remove') {
          setInstance.remove(arg[0])
          results.push(null)
        } else if (op === 'contains') {
          const res = setInstance.contains(arg[0])
          results.push(res)
        }
      }
    }

    // Verify outputs against expected results
    for (let i = 0; i < results.length; i++) {
      if (results[i] !== tc.expected[i]) {
        passed = false
        break
      }
    }

    if (passed) {
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log('  Operations:', tc.operations)
      console.log('  Expected:  ', tc.expected)
      console.log('  Received:  ', results)
    }
  })
}

runTests(MyHashSet4)
