// 2. Add Two Numbers

/**
 * Definition for ListNode.
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode()
  let curr = dummy
  let carryover = 0

  while (l1 || l2 || carryover) {
    // Calculate sum
    const val1 = l1?.val ?? 0
    const val2 = l2?.val ?? 0
    const sum = val1 + val2 + carryover

    // Calculate carryover
    const val = sum % 10
    carryover = Math.floor(sum / 10)
    curr.next = new ListNode(val)

    // Move pointers
    curr = curr.next
    l1 = l1?.next ?? null
    l2 = l2?.next ?? null
  }

  return dummy.next
};

function arrayToList(arr: number[]): ListNode | null {
  const dummy = new ListNode(0)
  let curr = dummy
  for (const val of arr) {
    curr.next = new ListNode(val)
    curr = curr.next
  }
  return dummy.next
}

function listToArray(node: ListNode | null): number[] {
  const result: number[] = []
  while (node) {
    result.push(node.val)
    node = node.next
  }
  return result
}

function runTest(arr1: number[], arr2: number[], expected: number[]) {
  const l1 = arrayToList(arr1)
  const l2 = arrayToList(arr2)
  const result = addTwoNumbers(l1, l2)
  const resultArr = listToArray(result)

  const passed = JSON.stringify(resultArr) === JSON.stringify(expected)
  console.log(`${passed ? '✅ PASSED' : '❌ FAILED'}`)
  console.log(`   Input: ${JSON.stringify(arr1)} + ${JSON.stringify(arr2)}`)
  console.log(`   Expected: ${JSON.stringify(expected)} | Got: ${JSON.stringify(resultArr)}\n`)
}

// --- Execution ---

console.log('Running LeetCode 2 Tests...\n')

runTest([2, 4, 3], [5, 6, 4], [7, 0, 8]) // 342 + 465 = 807
runTest([0], [0], [0])
runTest([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9], [8, 9, 9, 9, 0, 0, 0, 1])
