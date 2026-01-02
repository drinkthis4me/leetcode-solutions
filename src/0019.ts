// 19. Remove Nth Node From End of List

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
 * Two Pointers
 * T: O(n); S: O(1);
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Maintain two pointers and update one with a delay of n steps

  // 1, 2, 3, (4), 5
  // s
  //       f
  const dummy = new ListNode(0, head)
  let slow: ListNode | null = dummy
  let fast: ListNode | null = dummy

  // Establish `n` step gap
  for (let i = 0; i <= n; i++) {
    // Edge Case
    // `n` is greater than list length
    if (fast === null) return head

    fast = fast.next
  }

  // Move both pointer until fast reaches the end
  while (fast) {
    slow = slow!.next
    fast = fast.next
  }

  // Remove target node at `slow`
  if (slow?.next) {
    slow.next = slow.next.next
  }

  return dummy.next
};

/**
 * Two Passes
 * T: O(n); S: O(1);
 */
function removeNthFromEnd2(head: ListNode | null, n: number): ListNode | null {
  // First iteration:
  // Count list length
  // (Remove index) = (List length) - n 

  // Second iteration:
  // Traverse until (Remove index) - 1
  // Remove target node by skipping it

  if (!head) return null

  let length = 0
  let curr: ListNode | null = head
  while (curr) {
    curr = curr.next
    length++
  }

  const removeIndex = length - n

  // Special case: remove first node
  if (removeIndex === 0) {
    return head.next
  }

  curr = head
  for (let i = 0; i < length - 1; i++) {
    // Find target node's prev
    if (i + 1 === removeIndex) {
      curr!.next = curr!.next!.next
      break
    }

    curr = curr!.next
  }

  return head
};

// --- Test Utilities ---

// Helper to convert Array to Linked List
function arrayToList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper to convert Linked List back to Array for easy comparison
function listToArray(head: ListNode | null): number[] {
  let result: number[] = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

function runTests(removeNthFromEnd: (head: ListNode | null, n: number) => ListNode | null) {
  const testCases = [
    { input: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5] },
    { input: [1], n: 1, expected: [] },
    { input: [1, 2], n: 1, expected: [1] },
    { input: [1, 2], n: 2, expected: [2] }, // Removing the head
  ];

  testCases.forEach(({ input, n, expected }, index) => {
    const head = arrayToList(input);
    const resultList = removeNthFromEnd(head, n);
    const resultArr = listToArray(resultList);

    const passed = JSON.stringify(resultArr) === JSON.stringify(expected);

    console.log(`Test Case ${index + 1}: ${passed ? "✅ PASSED" : "❌ FAILED"}`);
    if (!passed) {
      console.log(`   Input: ${input}, n: ${n}`);
      console.log(`   Expected: ${expected}`);
      console.log(`   Actual:   ${resultArr}`);
    }
  });
}

runTests(removeNthFromEnd2);