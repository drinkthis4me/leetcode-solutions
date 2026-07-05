import { MinPriorityQueue } from '@datastructures-js/priority-queue'

// 23. Merge k Sorted Lists

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

/**
 * Merge One by One
 * T:O(n * k); S: O(1)
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const n = lists.length

  // Edge Case
  if (!lists || n === 0) return null
  if (n === 1) return lists[0]!

  const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
    // Edge case
    if (!list1 && !list2) return null
    if (!list1 || !list2) return list1 ?? list2

    const dummy = new ListNode()
    let curr = dummy
    while (list1 && list2) {
      if (list1.val <= list2.val) {
        curr.next = list1
        list1 = list1.next
      } else {
        curr.next = list2
        list2 = list2.next
      }
      curr = curr.next
    }

    if (list1) {
      curr.next = list1
    }
    if (list2) {
      curr.next = list2
    }

    return dummy.next
  }

  const dummy = new ListNode()
  dummy.next = lists[0]!
  for (let i = 1; i < n; i++) {
    dummy.next = mergeTwoLists(dummy.next, lists[i]!)
  }

  return dummy.next
};

/**
 * Min Heap
 * T:O(n log k); S: O(n)
 */
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
  // Edge case
  if (!lists || lists.length === 0) return null

  const minHeap = new MinPriorityQueue<ListNode>(node => node.val)

  // Add first nodes to the heap
  for (const list of lists) {
    if (list) {
      minHeap.enqueue(list)
    }
  }

  // Process nodes
  const dummy = new ListNode()
  let curr = dummy
  while (!minHeap.isEmpty()) {
    const min = minHeap.dequeue()!

    curr.next = min
    curr = curr.next

    if (min.next) {
      minHeap.enqueue(min.next)
    }
  }

  return dummy.next
};

/**
 * Divide And Conquer
 * T:O(n log k); S: O(n)
 */
function mergeKLists3(lists: Array<ListNode | null>): ListNode | null {
  // Edge case
  if (!lists || lists.length === 0) return null

  // [L1, L2, L3, L4, L5]
  // [L12, L34, L5]
  // [L1234, L5]
  // [L12345]

  const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
    // Edge case
    if (!list1 && !list2) return null
    if (!list1 || !list2) return list1 ?? list2

    const dummy = new ListNode()
    let curr = dummy
    while (list1 && list2) {
      if (list1.val <= list2.val) {
        curr.next = list1
        list1 = list1.next
      } else {
        curr.next = list2
        list2 = list2.next
      }
      curr = curr.next
    }

    if (list1) {
      curr.next = list1
    }
    if (list2) {
      curr.next = list2
    }

    return dummy.next
  }

  while (lists.length > 1) {
    const temp: Array<ListNode | null> = []

    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i]!
      // Boundary check for l2
      const l2 = (i + 1) < lists.length ? lists[i + 1]! : null
      temp.push(mergeTwoLists(l1, l2))
    }

    lists = temp
  }

  return lists[0]!
};

// Test Helper
// Convert an array to a linked list
function arrayToList(arr: number[]): ListNode | null {
  const dummy = new ListNode()
  let curr = dummy
  for (const val of arr) {
    curr.next = new ListNode(val)
    curr = curr.next
  }
  return dummy.next
}

// Convert a linked list back to an array for easy comparison
function listToArray(node: ListNode | null): number[] {
  const result: number[] = []
  while (node) {
    result.push(node.val)
    node = node.next
  }
  return result
}

// Tester
function runTests() {
  const testCases = [
    {
      name: 'Standard case',
      input: [[1, 4, 5], [1, 3, 4], [2, 6]],
      expected: [1, 1, 2, 3, 4, 4, 5, 6]
    },
    {
      name: 'Empty lists',
      input: [],
      expected: []
    },
    {
      name: 'Lists with empty/null',
      input: [[], [1]],
      expected: [1]
    },
    {
      name: 'Single list',
      input: [[1, 2, 3]],
      expected: [1, 2, 3]
    }
  ]

  testCases.forEach(({ name, input, expected }) => {
    // Transform arrays into linked list nodes
    const lists = input.map(arr => arrayToList(arr))

    // Execute your function (Assuming it's imported or defined in scope)
    const resultNode = mergeKLists3(lists)
    const resultArr = listToArray(resultNode)

    // Compare
    const passed = JSON.stringify(resultArr) === JSON.stringify(expected)
    console.log(`${passed ? '✅' : '❌'} ${name}`)
    if (!passed) {
      console.log(`   Expected: ${JSON.stringify(expected)}`)
      console.log(`   Got:      ${JSON.stringify(resultArr)}`)
    }
  })
}

// Run the suite
runTests()