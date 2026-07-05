// 138. Copy List with Random Pointer

/**
 * Definition for _Node.
 */
class _Node {
  val: number
  next: _Node | null
  random: _Node | null
  constructor(val?: number, next?: _Node | null, random?: _Node) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
    this.random = (random === undefined ? null : random)
  }
}

type NodeOrNull = _Node | null

/**
 * Hash Map (Two passes)
 * T: O(n); S: O(n);
 */
function copyRandomList(head: _Node | null): _Node | null {
  const map = new Map<NodeOrNull, NodeOrNull>()
  map.set(null, null)

  // First pass: Gather all the nodes
  let curr = head
  while (curr) {
    const copy = new _Node(curr.val)
    map.set(curr, copy)
    curr = curr.next
  }

  // Second pass: Assign next/random pointer
  curr = head
  while (curr) {
    const copy = map.get(curr)!
    copy.next = map.get(curr.next)!
    copy.random = map.get(curr.random)!
    curr = curr.next
  }

  return map.get(head)!
};

/**
 * Hash Map (One passes)
 * T: O(n); S: O(n);
 */
function copyRandomList2(head: _Node | null): _Node | null {
  const map = new Map<NodeOrNull, NodeOrNull>()
  map.set(null, null)

  let curr = head
  while (curr) {
    // 1. Assign val (Create if not exists)
    if (!map.has(curr)) {
      map.set(curr, new _Node())
    }
    map.get(curr)!.val = curr.val

    // 2. Assign next (Create if not exists)
    if (!map.has(curr.next)) {
      map.set(curr.next, new _Node())
    }
    map.get(curr)!.next = map.get(curr.next)!

    // 3. Assign random (Create if not exists)
    if (!map.has(curr.random)) {
      map.set(curr.random, new _Node())
    }
    map.get(curr)!.random = map.get(curr.random)!

    // Move to the next node
    curr = curr.next
  }

  return map.get(head)!
};

/**
 * Interleaving Copies
 * T: O(n); S: O(1);
 */
function copyRandomList3(head: _Node | null): _Node | null {
  // A -> A' -> B -> B' -> C -> C'
  // A'.random = A.random.next

  // Edge case
  if (head === null) return null

  // Interleave list
  let curr: _Node | null = head
  while (curr) {
    const copy: _Node = new _Node(curr.val, curr.next)
    curr.next = copy
    curr = copy.next
  }

  const newHead = head.next

  // Assign random pointer
  curr = head
  while (curr) {
    if (curr.random) {
      curr.next!.random = curr.random.next
    }

    curr = curr.next!.next
  }

  // Separate the list
  // A -> A' -> B -> B'
  curr = head
  while (curr) {
    // A -> B
    const copy = curr.next as _Node
    curr.next = copy.next

    // A' -> B'
    if (copy.next) {
      copy.next = copy.next.next
    }

    curr = curr.next
  }

  return newHead
};

/**
 * Interleaving Copies 2
 * T: O(n); S: O(1);
 */
function copyRandomList4(head: _Node | null): _Node | null {
  // A -> B
  //   -> A' -> A.random
  // Temporary use node.random to store the copy
  // A.random = A'
  // A'.next = A.random

  // Edge case
  if (head === null) return null

  // Create copies
  let curr: _Node | null = head
  while (curr) {
    const copy: _Node = new _Node(curr.val, curr.random)
    curr.random = copy
    curr = curr.next
  }

  const newHead = head.random

  // Fix random pointers of copies
  curr = head
  while (curr) {
    const copy = curr.random as _Node
    copy.random = copy.next?.random ?? null
    curr = curr.next
  }

  // Separate lists
  curr = head
  while (curr) {
    const copy = curr.random as _Node
    curr.random = copy.next
    copy.next = curr.next?.random ?? null
    curr = curr.next
  }

  return newHead
};

/**
 * Helper to build the list from LeetCode array format: [[val, random_index], ...]
 */
function buildList(data: [number, number | null][]): _Node | null {
  if (data.length === 0) return null

  const nodes: _Node[] = data.map(([val]) => new _Node(val))

  // for (let i = 0; i < data.length; i++) {
  //   const [_, randomIndex] = data[i]!;
  //   nodes[i]!.next = nodes[i + 1] || null;
  //   nodes[i]!.random = randomIndex !== null ? nodes[randomIndex] : null;
  // }
  for (const [i, [_val, randomIndex]] of data.entries()) {
    nodes[i]!.next = nodes[i + 1] || null
    nodes[i]!.random = randomIndex !== null ? nodes[randomIndex]! : null
  }

  return nodes[0] ?? null
}

/**
 * Deep copy validator
 */
function validateCopy(original: _Node | null, copy: _Node | null): boolean {
  let currOld = original
  let currNew = copy

  const oldNodes: _Node[] = []
  const newNodes: _Node[] = []

  // 1. Check structure and collect nodes for reference check
  while (currOld !== null && currNew !== null) {
    if (currOld === currNew) {
      console.error('Failure: Node reference is identical (not a deep copy).')
      return false
    }
    if (currOld.val !== currNew.val) {
      console.error(`Failure: Value mismatch. Expected ${currOld.val}, got ${currNew.val}`)
      return false
    }
    oldNodes.push(currOld)
    newNodes.push(currNew)
    currOld = currOld.next
    currNew = currNew.next
  }

  if (currOld !== currNew) {
    console.error('Failure: Lists have different lengths.')
    return false
  }

  // 2. Check random pointers
  for (let i = 0; i < oldNodes.length; i++) {
    const oldRandom = oldNodes[i]!.random
    const newRandom = newNodes[i]!.random

    if (oldRandom === null) {
      if (newRandom !== null) return false
    } else {
      const randomIndex = oldNodes.indexOf(oldRandom)
      if (newNodes[randomIndex] !== newRandom) {
        console.error(`Failure: Random pointer at index ${i} points to wrong node.`)
        return false
      }
    }
  }

  return true
}

/**
 * Test Runner
 */
function runTest(testCase: [number, number | null][]) {
  const head = buildList(testCase)
  // Replace 'copyRandomList' with your function name
  const result = copyRandomList4(head)

  const isValid = validateCopy(head, result)
  console.log(isValid ? '✅ Passed' : '❌ Failed')
}

const testData: [number, number | null][][] = [
  [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
  [[1, 1], [2, 1]],
  [[3, null], [3, 0], [3, null]],
  []
]

testData.forEach((data, i) => {
  console.log(`Running Test Case ${i + 1}...`)
  runTest(data)
})