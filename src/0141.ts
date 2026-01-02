// 141. Linked List Cycle

/**
 * Definition for singly-linked list.
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
 * Floyd's Cycle Detection
 * T: O(n); S: O(1)
 */
function hasCycle(head: ListNode | null): boolean {
  let slow = head
  let fast = head

  while (fast?.next?.next) {
    // Advance pointers
    slow = slow!.next
    fast = fast.next.next

    if (slow === fast) {
      return true
    }
  }

  return false
};

/**
 * Helper to create a linked list with an optional cycle.
 * @param arr - The values for the nodes.
 * @param pos - The index to which the last node points (cycle). -1 means no cycle.
 */
function createLinkedList(arr: number[], pos: number): ListNode | null {
  if (arr.length === 0) return null;

  const nodes = arr.map(val => new ListNode(val));

  // Connect nodes
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i]!.next = nodes[i + 1]!;
  }

  // Create cycle if pos is valid
  if (pos !== -1 && pos < nodes.length) {
    nodes[nodes.length - 1]!.next = nodes[pos]!;
  }

  return nodes[0] as ListNode | null;
}

/**
 * Test Runner
 */
function runTests() {
  const testCases = [
    { arr: [3, 2, 0, -4], pos: 1, expected: true },
    { arr: [1, 2], pos: 0, expected: true },
    { arr: [1], pos: -1, expected: false },
    { arr: [], pos: -1, expected: false }
  ];

  testCases.forEach((test, index) => {
    const head = createLinkedList(test.arr, test.pos);
    const result = hasCycle(head);
    const passed = result === test.expected;

    console.log(`Test Case #${index + 1}: ${passed ? "✅ PASSED" : "❌ FAILED"}`);
    console.log(`   Input: arr=${JSON.stringify(test.arr)}, pos=${test.pos}`);
    console.log(`   Output: ${result} | Expected: ${test.expected}\n`);
  });
}

runTests();